# Huawei Health + iPhone + PWA — Piano integrazione (senza live)

> **Stato:** pianificazione — NON live · `main @ 9ce23c8` (o40-v65dda8b5 live) · Doc creata 29 Ago 2026
> **Obiettivo:** leggere dati Huawei Health da iPhone PWA via **Health Kit Open Platform REST OAuth2** (no HMS SDK nativo, inesistente su iOS), 100% polling cloud, con piccolo backend per secret.

---

## 1. Principio chiave (già descritto — confermato)

- **No HMS SDK su iOS** — l'unica via per PWA è REST OAuth2 Health Kit / Data Open Platform.
- **Huawei Health app su iPhone** (App Store) sync → **Huawei Cloud** legato a Huawei ID.
- **AppGallery Connect** progetto → abilita **Health Kit** → `client_id` / `client_secret`.
- **OAuth2 Authorization Code** da PWA → `https://oauth-login.cloud.huawei.com/oauth2/v3/authorize?client_id=...&redirect_uri=...&response_type=code&scope=...`
- **Scambio code → access_token + refresh_token** SOLO server-side (secret mai in browser).
- **REST Data API:** `POST https://health-api.cloud.huawei.com/healthkit/v1/dataCollector/samplePoint.query` + `Authorization: Bearer {token}`.

Questo piano **resta in docs** — nessun deploy live finché non approvi.

---

## 2. Architettura target (PWA + backend minimo)

```
[iPhone: Huawei Health app] --sync--> [Huawei Cloud (Huawei ID)]
        |
[PWA Operator40 @ mikweb.eu/operator40] --OAuth redirect--> [Huawei OAuth]
        |                                                          |
        |<-- code (redirect_uri HTTPS) ---------------------------|
        |
        +-- POST /api/huawei/token (code) --> [Backend serverless: mikweb.eu/api/huawei/*]
        |                                      - scambia code→token con client_secret (mai esposto)
        |                                      - salva refresh_token cifrato (per utente, es. file JSON per HuaweiID hash)
        |                                      - ritorna solo access_token short-lived alla PWA
        |
        +-- POST /api/huawei/query (access_token) --> [Backend] --> [health-api.cloud.huawei.com]
        |                                      - proxy che aggiunge Bearer, filtra scope, logga
        |
        +-- Cron 1×/giorno (o on-demand da PWA) --> refresh_token → fetch step/sleep/HR → salva in tuo DB JSON (opzionale)
        |
[PWA] <-- legge da tuo DB (/api/huawei/summary) -- più semplice che fare tutto client-side
```

**Perché proxy/backend:** secret mai in browser, refresh automatico, niente CORS verso Huawei, log centralizzato, possibilità di caching.

---

## 3. Setup AppGallery Connect (una tantum, manuale)

1. https://developer.huawei.com → Console → AppGallery Connect → **Nuovo progetto** `operator40` → **Aggiungi app** (tipo Web, non Android/iOS).
2. **Abilita Health Kit** (Servizi → Health Kit → Attiva) → richiedi scope:
   - `https://www.huawei.com/healthkit/step.read`
   - `https://www.huawei.com/healthkit/heartrate.read`
   - `https://www.huawei.com/healthkit/sleep.read`
   - `https://www.huawei.com/healthkit/activity.read` (workout)
   - `https://www.huawei.com/healthkit/weight.read` (opzionale)
3. **Credenziali:** `Client ID` + `Client Secret` (conserva in `.env` server, mai in repo).
4. **Redirect URI:** registra `https://mikweb.eu/operator40/api/huawei/callback` (HTTPS obbligatorio, deve matchare esatto quello usato in PWA).
5. **Review Huawei:** per produzione gli scope vanno approvati (review manuale, non instant come Google Fit) — in dev puoi testare con account del team.

---

## 4. Flusso OAuth2 dettagliato (PWA)

**4.1 PWA → Huawei**
```js
const authUrl = new URL('https://oauth-login.cloud.huawei.com/oauth2/v3/authorize');
authUrl.searchParams.set('client_id', CLIENT_ID); // pubblico, ok in PWA
authUrl.searchParams.set('redirect_uri', 'https://mikweb.eu/operator40/api/huawei/callback');
authUrl.searchParams.set('response_type', 'code');
authUrl.searchParams.set('scope', 'https://www.huawei.com/healthkit/step.read https://www.huawei.com/healthkit/heartrate.read');
authUrl.searchParams.set('access_type', 'offline'); // per refresh_token
authUrl.searchParams.set('state', generatePKCEState()); // CSRF
location.href = authUrl.toString(); // redirect Safari/PWA
```
*Nota iOS:* Safari ITP può bloccare cookie 3rd party nel flow — usa `state` + `PKCE` (se Huawei lo supporta) e testa sia da Safari che da PWA standalone (iOS 16.4+).

**4.2 Callback → Backend**
```
GET /api/huawei/callback?code=...&state=...
→ Backend verifica state, poi:
POST https://oauth-login.cloud.huawei.com/oauth2/v3/token
  grant_type=authorization_code
  client_id=...
  client_secret=... (solo server)
  code=...
  redirect_uri=...
→ risponde { access_token (1h), refresh_token (30gg), expires_in }
→ Backend salva: { huaweiUserIdHash: { refresh_token (cifrato), scope, updatedAt } }
→ redirect 302 a `https://mikweb.eu/operator40/?huawei=connected` + Set-Cookie httpOnly con sessione utente (o token breve)
```

**4.3 PWA legge stato**
- `GET /api/huawei/status` → `{ connected: true, scopes: [...] }` (da cookie sessione)
- Se non connesso, mostra bottone “Connetti Huawei Health”.

---

## 5. Lettura dati (polling REST, no push realtime)

**Health Kit non ha push** come HealthKit iOS — è polling su dati già syncati su cloud.

**Esempio query step giornalieri:**
```http
POST https://health-api.cloud.huawei.com/healthkit/v1/dataCollector/samplePoint.query
Authorization: Bearer {access_token}
Content-Type: application/json
{
  "dataCollectorId": "com.huawei.continuous.steps.total",
  "startTime": 1714003200000, // ms
  "endTime": 1714089599999
}
```

**Altri collector utili:**
- `com.huawei.continuous.heartrate` (HR)
- `com.huawei.continuous.sleep` (sonno)
- `com.huawei.instantaneous.activity` (workout)
- `com.huawei.continuous.weight` (peso)

**Due pattern possibili:**

*A) On-demand da PWA (utente apre Statistiche → fetch)*
- PWA → `POST /api/huawei/query { collector, start, end }` → Backend aggiunge Bearer e inoltra → ritorna JSON → PWA renderizza.
- Pro: semplice, niente cron.
- Contro: ogni apertura fa 1-2 chiamate verso Huawei (rate limit).

*B) Cron backend 1×/giorno (consigliato per “solo lettura periodica”)*
- Cron `0 7 * * * php /api/huawei/cron.php` (dopo sync notturno Watch → Cloud)
- Per ogni utente con refresh_token: `refresh → query ieri → salva in /api/huawei/data/{hash}.json`
- PWA legge solo `GET /api/huawei/summary` (tuo DB, velocissimo, niente token Huawei esposto).

Per Operator40 (step giornalieri + HR) **consiglio B** — più semplice per PWA, niente token handling client-side.

---

## 6. Backend minimo (PHP 8.3 già su mikweb.eu)

```
public/api/huawei/
├── config.php          # CLIENT_ID/SECRET da env, non in repo (.env.example)
├── callback.php        # OAuth code → token exchange, salva refresh (cifrato con openssl_encrypt, key in env)
├── token.php           # POST { code } → scambio (alternativa a callback per SPA)
├── refresh.php         # POST { userHash } → usa refresh_token → nuovo access_token
├── query.php           # POST { collector, start, end } → proxy verso health-api (verifica sessione)
├── status.php          # GET → { connected, scopes }
├── cron.php            # CLI/cron: per ogni utente refresh + fetch + salva summary.json
├── data/               # gitignored, per-utente summary (hash HuaweiID)
└── .env.example
```

**Sicurezza:**
- `client_secret` MAI in `public/` né in JS — solo `config.php` legge da `$_ENV` (file fuori httpdocs o env Plesk).
- `refresh_token` cifrato `AES-256-GCM` con key in env, non in chiaro.
- `redirect_uri` whitelistata, `state` CSRF.
- Log solo `hash(user) + scope + timestamp`, mai dati sanitari in chiaro nei log.

**CORS:** PWA fa fetch solo verso `mikweb.eu/api/huawei/*` (stessa origine), zero CORS verso Huawei.

---

## 7. PWA wiring (senza live — solo codice locale)

**SetupScreen.jsx** già ha sezione Huawei file import + Bluetooth — aggiungeremo terza sottosezione (nascosta dietro flag `VITE_HUAWEI_CLOUD=0` di default, così non appare in live finché non abiliti):

```jsx
{import.meta.env.VITE_HUAWEI_CLOUD === '1' && (
  <div style={{ border: `1px solid ${OLIVE}`, borderRadius: 12, padding: 12 }}>
    <div className="o40-mono" style={{ color: KHAKI }}>Huawei Cloud (beta)</div>
    <button onClick={() => location.href = '/api/huawei/auth/start'}>Connetti Huawei Health</button>
    // status + disconnect
  </div>
)}
```

**Flag:** `VITE_HUAWEI_CLOUD=0` in `.env` → build non include UI cloud. Quando vuoi testare in locale: `VITE_HUAWEI_CLOUD=1 npm run dev`.

**Storage:** riusa `window.storage` già esistente (IDB/Preferences) per `huawei_connected` flag, non per token.

---

## 8. Scope & review Huawei

- Richiedi **solo** gli scope che usi (step + heartrate per iniziare) — meno scope = review più rapida.
- In console Huawei, per ogni scope devi fornire **descrizione uso + screenshot** (es. “Mostriamo passi giornalieri in Statistiche”).
- Review tipica **3-7 giorni** (non instant). In dev puoi testare con account Huawei del team senza review, ma in prod serve approvazione.

---

## 9. Punti critici PWA (già elencati — mitigazioni)

- **Secret in client:** risolto con proxy `callback.php`/`query.php`.
- **Redirect URI HTTPS:** già `https://mikweb.eu/operator40/api/huawei/callback` — registra identico in AppGallery.
- **ITP Safari:** usa `state` + `SameSite=Lax` cookie, evita `third-party cookie` per sessione — testa sia Safari che PWA standalone.
- **Nessun push realtime:** polling REST, quindi mostra “Ultimo sync: {timestamp Huawei}” e spiega che i dati arrivano dopo sync Watch → Cloud (tipicamente notturna o manuale in Huawei Health → Sincronizza).

---

## 10. Piano a fasi (senza live)

**Fase 0 — Docs (fatto qui, 0 deploy)**
- [x] Questo `docs/HUAWEI_PLAN.md` (senza live)

**Fase 1 — Backend skeleton locale (no secret, no deploy)**
- [ ] Crea `public/api/huawei/*.php` con stub che ritornano `501 Not configured` se env manca
- [ ] `config.php` legge `$_ENV['HUAWEI_CLIENT_ID/SECRET']` (non committare)
- [ ] Test locale: `php -S localhost:8000 -t public` + `curl /api/huawei/status` → 501 atteso

**Fase 2 — OAuth flow in PWA (flag off)**
- [ ] `SetupScreen` con `VITE_HUAWEI_CLOUD` flag, bottone che punta a `/api/huawei/auth/start` (stub)
- [ ] `npm run dev` con `VITE_HUAWEI_CLOUD=1` per vedere UI, senza chiamare Huawei

**Fase 3 — AppGallery Connect (manuale, fuori repo)**
- [ ] Creare progetto, abilitare Health Kit, ottenere client_id/secret, registrare redirect
- [ ] Salvare secret in env Plesk (non in repo), testare `callback.php` in staging (sottodominio staging.mikweb.eu) — NON su live

**Fase 4 — Staging test (quando approvi)**
- [ ] Deploy solo su staging, test OAuth con account Huawei del team, verifica `samplePoint.query` ritorna dati
- [ ] Solo dopo OK, pianificare deploy live con review Huawei approvata

**Checklist “pronto per live” (non ora):**
- [ ] Secret fuori repo, refresh cifrato, cron funzionante
- [ ] Review Huawei approvata per scope richiesti
- [ ] Test iOS Safari + PWA standalone (ITP)
- [ ] Informativa privacy aggiornata (dati Huawei)

---

## 11. Alternativa leggera (già esistente, resta)

Se vuoi evitare backend del tutto (come già fatto):
- **File import** (`src/utils/huawei.js` già integrato in SetupScreen) — utente esporta JSON/TCX da Huawei Health e carica file (100% locale, zero OAuth).
- **Bluetooth HR** (`src/utils/huaweiWatch.js`) — Web Bluetooth `0x180D` per HR live (Chrome/Edge, non Safari iOS).

Queste due restano funzionanti anche senza cloud — il cloud è solo per lettura periodica automatica.

---

## 12. Decisione richiesta (non live)

Dimmi:
1. Vuoi che crei lo **skeleton backend** (`public/api/huawei/*.php` stub) in locale (senza secret, senza deploy)?
2. Vuoi che aggiunga la **UI flag-gated** in `SetupScreen` (`VITE_HUAWEI_CLOUD`) già ora (nascosta in live)?
3. Oppure manteniamo solo questo doc e **nessun codice** finché non dai OK per Fase 1?

Rispondi con `1`, `2`, `1+2`, o `solo doc` — non metto live finché non confermi.
