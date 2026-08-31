# Huawei Health — Guida passo-passo dove loggarsi per i secret (solo locale)

> **Branch:** `feature/huawei-cloud` — **NON live** — Doc locale 29 Ago 2026
> **Obiettivo:** ottenere `HUAWEI_CLIENT_ID` / `HUAWEI_CLIENT_SECRET` / `HUAWEI_REDIRECT_URI` per testare OAuth Health Kit su iPhone PWA senza pubblicare nulla.

---

## 0. Prerequisiti (5 min)

- Un **Huawei ID** (se non lo hai: https://id5.cloud.huawei.com/CAS/portal/register — email qualsiasi, anche Gmail, non serve telefono Huawei).
- Un **iPhone** con **Huawei Health** installata (App Store → “Huawei Health” di Huawei Device Co., Ltd.) + login con lo stesso Huawei ID — serve per testare il sync (anche senza Watch, i passi del telefono bastano).
- Accesso a **Plesk mikweb.eu** per impostare env (o `.env` locale per test).

---

## 1. Loggati su Huawei Developer Console (dove si creano i secret)

1. Vai su **https://developer.huawei.com/consumer/en/console** (oppure https://developer.huawei.com/consumer/cn/console se ti ridirige in cinese — cambia lingua in alto a destra su **English**).
2. Clicca **Sign In** in alto a destra → loggati con il tuo **Huawei ID** (quello appena creato).
3. Al primo accesso accetta **Developer Agreement** → seleziona **Individual** (non Enterprise) → completa profilo (nome, indirizzo — puoi mettere Italia, non serve verifica identità per Health Kit in dev).

> **Dove sei:** `developer.huawei.com` → Console. Qui vedi a sinistra **AppGallery Connect**.

---

## 2. Crea progetto AppGallery Connect

1. In Console, clicca a sinistra **AppGallery Connect** (icona a forma di “A” arancione) → si apre **https://developer.huawei.com/consumer/en/service/josp/agc/index.html**
2. Clicca **My projects** (in alto) → **Add project** → Nome: `operator40` → **Create and continue**.
3. Dentro il progetto, clicca **Add app** → 
   - **Platform:** `Web` (non Android/iOS — serve per PWA OAuth, così non chiedono SHA256/APK)
   - **App name:** `Operator40 PWA`
   - **Package name:** inventa tipo `com.operator40.pwa` (non deve esistere su AppGallery, è solo identificativo)
   - **Confirm.**

> **Dove sei:** `AppGallery Connect → My projects → operator40 → App → Operator40 PWA`

---

## 3. Abilita Health Kit (il servizio che espone i dati)

1. Nel progetto `operator40`, menu a sinistra → **Build** → **Health Kit** (se non lo vedi: **Grow → Health Kit** o cerca “Health Kit” nella barra di ricerca in alto).
2. Clicca **Enable** / **Use now** → accetta termini.
3. Ti chiederà di **abilitare gli scope** — seleziona per iniziare solo questi due (meno scope = review più rapida):
   - `https://www.huawei.com/healthkit/step.read`
   - `https://www.huawei.com/healthkit/heartrate.read`
   - (poi aggiungerai `sleep.read`, `activity.read`, `weight.read` quando il flusso base funziona)
4. Salva.

> **Dove sei:** `AppGallery Connect → operator40 → Health Kit → Data types`

---

## 4. Ottieni CLIENT_ID e CLIENT_SECRET (i secret veri)

1. Sempre nel progetto, vai su **Project settings** (in alto a destra, icona ingranaggio) → tab **General information**.
2. Scorri fino a **App information** → trovi:
   - **Client ID** → è tipo `10xxxxxx` (10 cifre) — **copialo**, è `HUAWEI_CLIENT_ID`
   - **Client Secret** → clicca **View** (ti chiederà verifica email/SMS) → copia il valore lungo esadecimale — è `HUAWEI_CLIENT_SECRET` (**mai committare, mai mettere in JS**)
3. Se non vedi Client Secret (per app Web a volte è sotto **OAuth 2.0 Client ID**):
   - Vai su **Users and permissions → OAuth 2.0** oppure **Project settings → API → OAuth 2.0**
   - Crea **OAuth Client** → tipo `Web` → inserisci **Redirect URI** (vedi passo 5) → dopo creazione vedrai ID + Secret.

> **Dove sei:** `Project settings → General information → Client ID / Client Secret`
> **Cosa copiare:** `HUAWEI_CLIENT_ID` (pubblico, ok in PWA) + `HUAWEI_CLIENT_SECRET` (segreto, solo server).

---

## 5. Registra Redirect URI (obbligatorio, HTTPS, esatto)

1. In **OAuth 2.0** (stessa pagina dove hai visto il secret), cerca **Authorized redirect URIs** → **Add redirect URI** →
   ```
   https://mikweb.eu/operator40/api/huawei/callback.php
   ```
   Per test locale aggiungi anche:
   ```
   http://localhost:8000/api/huawei/callback.php
   ```
   (per `php -S localhost:8000 -t public` — vedi Fase 1 del piano)
2. Salva. Huawei controllerà che la `redirect_uri` usata nella PWA sia **identica** carattere per carattere a quella registrata (incluso `https` e trailing slash NO).

> **Dove sei:** `Project settings → OAuth 2.0 → Authorized redirect URIs`

---

## 6. Dove mettere i secret in locale (senza committare)

**Opzione A — test locale con `php -S` (consigliata per iniziare, zero Plesk):**

Crea un file **NON committato** fuori httpdocs, es. `/tmp/huawei.env`:
```bash
export HUAWEI_CLIENT_ID="10xxxxxx"
export HUAWEI_CLIENT_SECRET="lungostringa..."
export HUAWEI_REDIRECT_URI="http://localhost:8000/api/huawei/callback.php"
export HUAWEI_ENCRYPT_KEY=$(openssl rand -hex 32)
```
Poi lancia:
```bash
cd /Users/daniele/Downloads/Documents/operator40
HUAWEI_CLIENT_ID=10xxxxxx HUAWEI_CLIENT_SECRET=xxx php -S localhost:8000 -t public
# apri http://localhost:8000/api/huawei/status.php → dovrebbe dare {"connected":false,"configured":true} invece di 501
```

**Opzione B — Plesk mikweb.eu (quando vuoi testare su https://mikweb.eu):**

1. Loggati su **https://plesk.mikweb.eu** (o pannello che usi per mikweb.eu) → **Websites & Domains → operator40 → PHP → Environment variables** (o **Apache & nginx → Environment variables**).
2. Aggiungi:
   - `HUAWEI_CLIENT_ID` = `10xxxxxx`
   - `HUAWEI_CLIENT_SECRET` = `xxx`
   - `HUAWEI_REDIRECT_URI` = `https://mikweb.eu/operator40/api/huawei/callback.php`
   - `HUAWEI_ENCRYPT_KEY` = `openssl rand -hex 32`
3. Salva → Plesk riavvia PHP.

> **Mai** creare `public/api/huawei/.env` con secret dentro `public/` (sarebbe scaricabile via web) — usa env Plesk o file fuori httpdocs.

---

## 7. Testa il flusso senza scrivere codice (solo browser)

1. Su **branch `feature/huawei-cloud`** (dove sei ora), lancia in locale:
   ```bash
   VITE_HUAWEI_CLOUD=1 npm run dev
   # apri http://localhost:5173 → Setup → in fondo vedrai “Huawei Cloud (beta) · OAuth”
   ```
2. Clicca **Connetti Huawei Cloud** → dovresti essere ridirigido a `https://oauth-login.cloud.huawei.com/oauth2/v3/authorize?...` → login Huawei ID → **Consenti** → redirect a `http://localhost:8000/api/huawei/callback.php?code=...`
3. Se vedi `501 Not configured` è normale in stub — significa che il redirect funziona, manca solo l’implementazione del token exchange (Fase 2 del piano). Se vedi `missing_code` o `state_mismatch`, controlla redirect URI registrata.

---

## 8. Richiesta approvazione scope (solo quando vuoi andare in produzione)

1. In **AppGallery Connect → Health Kit → Scope management** → per ogni scope clicca **Apply for production** → compila descrizione (es. “Mostriamo passi giornalieri in Statistiche per motivare l’utente”) + carica screenshot della PWA (usa `docs/screenshots/05-statistiche.png`).
2. Review Huawei **3-7 giorni** — in dev puoi testare con account del team senza approvazione.

---

## 9. Checklist “ho fatto tutto”

- [ ] Huawei ID creato e login su `developer.huawei.com` OK
- [ ] Progetto `operator40` + app Web creati
- [ ] Health Kit abilitato con `step.read` + `heartrate.read`
- [ ] `CLIENT_ID` / `CLIENT_SECRET` copiati
- [ ] Redirect URI `https://mikweb.eu/operator40/api/huawei/callback.php` registrato
- [ ] Env impostato in locale (`php -S`) e/o Plesk (non committato)
- [ ] `VITE_HUAWEI_CLOUD=1 npm run dev` → bottone “Connetti” visibile
- [ ] Test redirect → `callback.php` riceve `code` (anche se stub risponde 501, il flusso è corretto)

---

## 10. Dove NON loggarti / cosa NON fare

- **Non** loggarti su `health-api.cloud.huawei.com` direttamente — non ha UI, è solo REST.
- **Non** cercare “HMS SDK” per iOS — non esiste, è solo Android. Su iOS si usa solo REST OAuth come sopra.
- **Non** committare mai `HUAWEI_CLIENT_SECRET` in `public/` o su GitHub — solo env server.

---

**File correlati in repo (branch `feature/huawei-cloud`):**
- `docs/HUAWEI_PLAN.md` (architettura completa)
- `public/api/huawei/*.php` (stub 501, pronti per implementare Fase 2)
- `src/screens/SetupScreen.jsx` (UI flag-gated `VITE_HUAWEI_CLOUD`)

Quando hai completato i passi 1-5, dimmi e implemento il **token exchange reale** in `callback.php` (ancora su branch, senza deploy live finché non dici “metti live”).
