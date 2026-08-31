# Huawei Secret — Guida Passo-Passo DOVE LOGGARSI (locale, no live)

> **Branch:** `feature/huawei-cloud` — NON live — File creato 29 Ago 2026
> Obiettivo: ottenere `HUAWEI_CLIENT_ID` + `HUAWEI_CLIENT_SECRET` + `HUAWEI_REDIRECT_URI` e metterli dove servono, senza pubblicare nulla.

---

## Cosa ti serve prima di iniziare (5 min)

1.  Un **Huawei ID** — se non lo hai: https://id5.cloud.huawei.com/CAS/portal/register (email qualsiasi, anche Gmail, non serve telefono Huawei).
2.  iPhone con app **Huawei Health** (App Store → Huawei Device Co., Ltd.) loggata con lo STESSO Huawei ID — serve per testare il sync dopo (bastano i passi del telefono, non serve Watch).
3.  Accesso a **Plesk mikweb.eu** (solo quando vorrai testare su `https://mikweb.eu`, per ora basta test locale).

---

## PASSO 1 — Loggati nel posto giusto (qui si prendono i secret)

**URL esatto dove loggarti:**

```
https://developer.huawei.com/consumer/en/console
```

1. Apri quell'URL → clicca **Sign In** in alto a destra → inserisci **Huawei ID** + password.
2. Al primo accesso accetta **Developer Agreement** → scegli **Individual** (NON Enterprise) → compila nome/indirizzo (puoi mettere Italia, non serve verifica identità per test dev).
3. Se ti ridirige in cinese (`/cn/console`), cambia lingua in alto a destra su **English**.

> **Sei dentro:** `developer.huawei.com` → **Console** → a sinistra vedi **AppGallery Connect** (icona "A" arancione). È LI che si creano i secret, non su `health-api.cloud.huawei.com` (quella è solo API, non ha login).

---

## PASSO 2 — Crea progetto + App Web (2 min)

1. In Console → clicca a sinistra **AppGallery Connect** → si apre:
   ```
   https://developer.huawei.com/consumer/en/service/josp/agc/index.html
   ```
2. In alto clicca **My projects** → **Add project** → Nome: `operator40` → **Create and continue**.
3. Dentro il progetto → **Add app** →
   - **Platform:** `Web`  ← IMPORTANTE: scegli Web, NON Android/iOS (così non ti chiedono SHA256/APK e puoi usare OAuth da PWA)
   - **App name:** `Operator40 PWA`
   - **Package name:** inventa tipo `com.operator40.pwa` (non deve esistere davvero, è solo identificativo)
   - **Confirm.**

> **Sei dentro:** `AppGallery Connect → My projects → operator40 → App → Operator40 PWA`

---

## PASSO 3 — Abilita Health Kit (dove vivi i dati)

1. Sempre dentro progetto `operator40`, menu a sinistra → **Build → Health Kit** (se non lo vedi: cerca "Health Kit" nella barra ricerca in alto, oppure **Grow → Health Kit**).
2. Clicca **Enable / Use now** → accetta termini.
3. Ti chiede quali **scope** abilitare — per iniziare spunta SOLO questi 2 (meno scope = approvazione più veloce, gli altri li aggiungi dopo):
   - `https://www.huawei.com/healthkit/step.read`
   - `https://www.huawei.com/healthkit/heartrate.read`
   - (poi aggiungerai `sleep.read`, `activity.read`, `weight.read`)
4. **Save.**

> **Sei dentro:** `AppGallery Connect → operator40 → Health Kit → Data types` — qui vedi gli scope attivi.

---

## PASSO 4 — COPIA i secret (il punto cruciale)

### 4a — Trova CLIENT_ID

1. Sempre nel progetto → in alto a destra clicca **Project settings** (icona ingranaggio) → tab **General information**.
2. Scorri fino a **App information** → vedi:
   - **Client ID** → tipo `10xxxxxx` (10 cifre) → **COPIALO** → questo è `HUAWEI_CLIENT_ID` (è pubblico, può stare in PWA).
   - **App ID** è DIVERSO, non copiarlo.

### 4b — Trova CLIENT_SECRET

1. Stessa pagina, sotto Client ID → cerca **Client Secret** → clicca **View** (ti chiederà verifica email/SMS) → copia stringa lunga esadecimale → questo è `HUAWEI_CLIENT_SECRET`.

2. **Se NON vedi Client Secret** (per app Web a volte è nascosto):
   - Vai su **Project settings → API → OAuth 2.0**  oppure  **Users and permissions → OAuth 2.0**
   - Clicca **Create OAuth Client** → tipo `Web` → inserisci Redirect URI del Passo 5 → **Create** → ora vedi ID + Secret.

> **ATTENZIONE:** `HUAWEI_CLIENT_SECRET` non va MAI committato, MAI messo in JS pubblico, MAI in `public/` — solo su server (vedi Passo 6).

**Cosa hai copiato:**
```
HUAWEI_CLIENT_ID     = 10xxxxxx  (10 cifre, pubblico)
HUAWEI_CLIENT_SECRET = a1b2c3... (lungo, segreto, solo server)
```

---

## PASSO 5 — Registra Redirect URI (obbligatorio, deve essere IDENTICO)

1. Sempre in **Project settings → OAuth 2.0 → Authorized redirect URIs** → **Add redirect URI** → incolla ESATTAMENTE:
   ```
   https://mikweb.eu/operator40/api/huawei/callback.php
   ```
   Per test locale aggiungi anche:
   ```
   http://localhost:8000/api/huawei/callback.php
   ```
   (serve per `php -S localhost:8000 -t public` — vedi Passo 6A)

2. **Save.** Huawei controlla carattere per carattere: `https` vs `http`, slash finale NO, path identico a quello che userà la PWA.

> **Sei dentro:** `Project settings → OAuth 2.0 → Authorized redirect URIs`

Se sbagli un carattere, al login vedrai `redirect_uri_mismatch` — torna qui e correggi.

---

## PASSO 6 — DOVE mettere i secret (senza committare)

### Opzione A — Test locale (consigliata per iniziare, 0 Plesk)

Crea file **fuori** da `public/` e **non committato**, poi lancia server PHP:

```bash
cd /Users/daniele/Downloads/Documents/operator40

# genera chiave cifratura
openssl rand -hex 32
# → copia output, è HUAWEI_ENCRYPT_KEY

# lancia con env (sostituisci xxx)
HUAWEI_CLIENT_ID="10xxxxxx" \
HUAWEI_CLIENT_SECRET="tuo_secret_lungo" \
HUAWEI_REDIRECT_URI="http://localhost:8000/api/huawei/callback.php" \
HUAWEI_ENCRYPT_KEY="chiave_hex_da_openssl" \
php -S localhost:8000 -t public
```

Testa:
```bash
curl http://localhost:8000/api/huawei/status.php
# atteso se env ok: {"connected":false,"configured":true}
# se vedi {"configured":false} → env non passato
```

> MAI creare `public/api/huawei/.env` con secret dentro `public/` — sarebbe scaricabile via web!

### Opzione B — Plesk mikweb.eu (quando vuoi testare su https)

1. Loggati su **Plesk** (URL che usi per mikweb.eu, es. `https://plesk.mikweb.eu` o pannello del provider) → **Websites & Domains → mikweb.eu → operator40 → PHP → Environment variables** (oppure `Apache & nginx → Environment variables`).
2. Aggiungi 4 variabili:
   ```
   HUAWEI_CLIENT_ID     = 10xxxxxx
   HUAWEI_CLIENT_SECRET = tuo_secret_lungo
   HUAWEI_REDIRECT_URI  = https://mikweb.eu/operator40/api/huawei/callback.php
   HUAWEI_ENCRYPT_KEY   = output di: openssl rand -hex 32
   ```
3. **Save** → Plesk riavvia PHP.

Verifica su server:
```
https://mikweb.eu/operator40/api/huawei/status.php
→ {"connected":false,"configured":true} se ok
```

---

## PASSO 7 — Testa il redirect senza scrivere codice (solo browser)

1. Su questo branch (`feature/huawei-cloud`) lancia:
   ```bash
   VITE_HUAWEI_CLOUD=1 npm run dev
   # apri http://localhost:5173 → Setup → in fondo vedi "Huawei Cloud (beta) · OAuth"
   ```
2. Clicca **Connetti Huawei Cloud** → vieni ridirigito a:
   ```
   https://oauth-login.cloud.huawei.com/oauth2/v3/authorize?client_id=...&redirect_uri=...&response_type=code&scope=...
   ```
   → login Huawei ID → **Consenti** → redirect a `http://localhost:8000/api/huawei/callback.php?code=...`

3. Cosa vedi:
   - `501 Not configured` ma con `code` in URL → **PERFETTO**, il redirect funziona, manca solo token exchange (Fase 2, lo implemento io quando mi dici).
   - `missing_code` o `state_mismatch` → redirect URI registrata non identica → torna al Passo 5.
   - `redirect_uri_mismatch` → URI non registrata su Huawei → torna al Passo 5.

---

## PASSO 8 — Quando andare in produzione (NON ora)

Solo quando il flusso locale funziona, per produzione serve approvazione Huawei:

1. In **AppGallery Connect → Health Kit → Scope management** → per ogni scope → **Apply for production** → descrizione tipo "Mostriamo passi giornalieri in Statistiche per motivare l'utente" + screenshot `docs/screenshots/05-statistiche.png`.
2. Review **3-7 giorni**. In dev puoi già testare con account del team senza approvazione.

In `src/` aggiungere `VITE_HUAWEI_CLOUD=1` in build live solo dopo approvazione — per ora resta `0` (nascosto in live).

---

## Checklist finale — "ho fatto tutto?"

- [ ] Login su `https://developer.huawei.com/consumer/en/console` OK
- [ ] Progetto `operator40` + app **Web** creata
- [ ] Health Kit abilitato con `step.read` + `heartrate.read`
- [ ] `CLIENT_ID` (10 cifre) copiato
- [ ] `CLIENT_SECRET` (lungo) copiato con verifica email/SMS
- [ ] Redirect `https://mikweb.eu/operator40/api/huawei/callback.php` registrata (e `http://localhost:8000/...` per locale)
- [ ] Env impostato locale (`php -S`) e/o Plesk — **non committato**
- [ ] `VITE_HUAWEI_CLOUD=1 npm run dev` → bottone "Connetti" visibile in Setup
- [ ] Click "Connetti" → redirect Huawei → callback riceve `code` (anche se risponde 501, flusso OK)

---

## DOVE NON loggarti / errori comuni

- **NON** su `health-api.cloud.huawei.com` — è solo API REST, non ha UI login.
- **NON** cercare "HMS SDK per iOS" — non esiste, su iOS si usa solo REST OAuth come sopra.
- **NON** committare `HUAWEI_CLIENT_SECRET` su GitHub o in `public/` — va solo in env server.
- **NON** confondere `App ID` con `Client ID` — serve `Client ID` (10 cifre sotto App information, non App ID).
- Se vedi login cinese → cambia lingua in alto a destra su **English** (`/consumer/cn/console` → `/consumer/en/console`).

---

## File in repo (branch feature/huawei-cloud)

- `docs/HUAWEI_PLAN.md` — architettura completa (quando/come implementare)
- `docs/HUAWEI_SETUP_GUIDA.md` — versione precedente (questa la sostituisce come più precisa)
- `docs/GUIDA_HUAWEI_SECRET_PASSO_PASSO.md` — **questo file** (il più preciso, tieni questo)
- `public/api/huawei/*.php` — stub 501 (pronti per Fase 2)
- `src/screens/SetupScreen.jsx` — UI flag-gated `VITE_HUAWEI_CLOUD`

**Quando hai fatto Passi 1-5, dimmi "fatto" e implemento il token exchange reale in `callback.php` (sempre su branch, senza andare live finché non dici tu).**
