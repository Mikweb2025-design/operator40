/* ================= Operator 40 — i18n (it / en / de) =================
   Language is auto-detected from the browser (navigator.language) and can
   be overridden in the Settings / Setup screen (persisted in profile.lang).
   Unknown languages fall back to English (the neutral default). */

export const LANGS = ['it', 'en', 'de'];
export const LOCALES = { it: 'it-IT', en: 'en-US', de: 'de-DE' };

export function detectLang() {
  try {
    const raw = (typeof navigator !== 'undefined' && navigator.language) || 'it';
    const base = raw.split('-')[0].toLowerCase();
    return LANGS.includes(base) ? base : 'en';
  } catch (e) {
    return 'it';
  }
}

/* tr: pick the localized value from a { it, en, de } object (falls back to it) */
export function tr(x, lang) {
  if (x && typeof x === 'object' && !Array.isArray(x)) {
    if (lang && x[lang]) return x[lang];
    return x.it;
  }
  return x;
}

/* translate: look up a key in the I18N dictionary, pick the language and
   substitute {var} placeholders. Unknown keys render as the key itself. */
export function translate(key, lang, vars) {
  let v = I18N[key];
  if (v && typeof v === 'object' && !Array.isArray(v)) v = tr(v, lang);
  if (v == null) v = key;
  if (vars) {
    for (const k in vars) {
      v = String(v).split(`{${k}}`).join(String(vars[k]));
    }
  }
  return v;
}

export const I18N = {
  /* ---- app shell / loading ---- */
  'app.loading': { it: 'CARICAMENTO', en: 'LOADING', de: 'LADEN' },
  'app.loading.operativo': { it: 'OPERATIVO', en: 'OPERATIVE', de: 'OPERATIV' },
  'app.back': { it: 'Indietro', en: 'Back', de: 'Zurück' },

  /* ---- bottom navigation ---- */
  'nav.home': { it: 'Base', en: 'Home', de: 'Basis' },
  'nav.library': { it: 'Libreria', en: 'Library', de: 'Übungen' },
  'nav.history': { it: 'Statistiche', en: 'Stats', de: 'Statistik' },
  'nav.setup': { it: 'Impostazioni', en: 'Settings', de: 'Einstellungen' },

  /* ---- countdown ---- */
  'countdown.go': { it: 'VIA!', en: 'GO!', de: 'LOS!' },
  'countdown.prepare': { it: 'Preparati…', en: 'Get ready…', de: 'Mach dich bereit…' },

  /* ---- setup screen ---- */
  'setup.title': { it: 'SCHEDA OPERATORE', en: 'OPERATOR CARD', de: 'OPERATOR-PROFIL' },
  'setup.intro': {
    it: 'Obiettivo del Campo: <b style="color:#EDE8D8">dimagrire e tonificare la pancia</b> con 15 min al giorno. I dati servono solo per calcolare calorie e zone di frequenza cardiaca. Restano su questo dispositivo.',
    en: 'Camp objective: <b style="color:#EDE8D8">slim down and tone your belly</b> in 15 minutes a day. Your data is only used to estimate calories and heart-rate zones. It stays on this device.',
    de: 'Camp-Ziel: <b style="color:#EDE8D8">Bauchfett abbauen und den Bauch straffen</b> in 15 Minuten pro Tag. Deine Daten dienen nur zur Berechnung von Kalorien und Herzfrequenzzonen. Sie bleiben auf diesem Gerät.',
  },
  'setup.language': { it: 'Lingua', en: 'Language', de: 'Sprache' },
  'setup.name': { it: 'Nominativo (opzionale)', en: 'Name (optional)', de: 'Name (optional)' },
  'setup.name.ph': { it: 'es. Danny', en: 'e.g. Danny', de: 'z. B. Danny' },
  'setup.age': { it: 'Età', en: 'Age', de: 'Alter' },
  'setup.weight': { it: 'Peso (kg)', en: 'Weight (kg)', de: 'Gewicht (kg)' },
  'setup.waist': { it: 'Girovita (cm) — la misura della pancia', en: 'Waist (cm) — the belly measurement', de: 'Bauchumfang (cm) — die Bauchmessung' },
  'setup.waist.ph': { it: 'es. 98', en: 'e.g. 98', de: 'z. B. 98' },
  'setup.sounds': { it: 'Suoni', en: 'Sounds', de: 'Töne' },
  'setup.vibration': { it: 'Vibrazione', en: 'Vibration', de: 'Vibration' },
  'setup.skip': { it: 'Salta riscaldamento/defaticamento', en: 'Skip warm-up/cooldown', de: 'Aufwärmen/Abkühlen überspringen' },
  'setup.music': { it: 'Musica motivazionale', en: 'Motivational music', de: 'Motivationsmusik' },
  'setup.music.pick': { it: 'Scegli la colonna sonora del tuo allenamento:', en: 'Choose the soundtrack for your workout:', de: 'Wähle den Soundtrack für dein Training:' },
  'setup.music.playing': { it: 'IN SUONO', en: 'PLAYING', de: 'LÄUFT' },
  'setup.music.listen': { it: 'ASCOLTA', en: 'LISTEN', de: 'HÖREN' },
  'setup.music.note': {
    it: 'Musica royalty-free: NEFFEX · CC BY 3.0 · Marce e inni IT/DE: pubblico dominio · Bella ciao: CC BY-SA 4.0. File locali: funziona offline e non lascia mai il telefono.',
    en: 'Royalty-free music: NEFFEX · CC BY 3.0 · IT/DE marches & anthems: public domain · Bella ciao: CC BY-SA 4.0. Local files: works offline and never leaves your phone.',
    de: 'Lizenzfreie Musik: NEFFEX · CC BY 3.0 · IT/DE-Märsche & Hymnen: Public Domain · Bella ciao: CC BY-SA 4.0. Lokale Dateien: funktioniert offline und verlässt nie dein Handy.',
  },
  'setup.level': { it: 'Livello di difficoltà', en: 'Difficulty level', de: 'Schwierigkeitsgrad' },
  'setup.level.hint': {
    it: 'Più sali, più aumenta il ritmo lavoro/recupero: la progressione è ciò che garantisce i risultati.',
    en: 'The higher you go, the faster the work/rest rhythm: progression is what guarantees results.',
    de: 'Je höher, desto schneller der Arbeits-/Pausentakt: Progression garantiert die Ergebnisse.',
  },
  'setup.health': { it: 'Importa da Apple Health', en: 'Import from Apple Health', de: 'Von Apple Health importieren' },
  'setup.health.body': {
    it: 'Non posso collegarmi in diretta ad Apple Health (nessuna API web esiste per HealthKit). Puoi però esportare i tuoi dati dall\'app Salute (foto profilo → Esporta tutti i dati sanitari) e caricare qui il file <strong>export.xml</strong>: viene letto ed elaborato interamente su questo dispositivo, non lascia mai il telefono. Importo allenamenti di forza/core/HIIT e l\'ultimo peso registrato.',
    en: 'I can\'t connect directly to Apple Health (no web API exists for HealthKit). But you can export your data from the Health app (profile photo → Export All Health Data) and upload the export.xml file here: it\'s read and processed entirely on this device and never leaves your phone. I import strength/core/HIIT workouts and your latest recorded weight.',
    de: 'Eine direkte Verbindung zu Apple Health ist nicht möglich (für HealthKit gibt es keine Web-API). Du kannst deine Daten aber in der Health-App exportieren (Profilbild → Alle Gesundheitsdaten exportieren) und hier die Datei export.xml hochladen: Sie wird vollständig auf diesem Gerät gelesen und verarbeitet und verlässt nie dein Handy. Ich importiere Kraft-/Core-/HIIT-Workouts und das zuletzt erfasste Gewicht.',
  },
  'setup.health.processing': { it: 'ELABORAZIONE…', en: 'PROCESSING…', de: 'VERARBEITE…' },
  'setup.health.upload': { it: 'CARICA export.xml', en: 'UPLOAD export.xml', de: 'export.xml HOCHLADEN' },
  'setup.health.error': {
    it: 'File non riconosciuto: assicurati di caricare export.xml (non lo zip).',
    en: 'Unrecognized file: make sure you upload export.xml (not the zip).',
    de: 'Datei nicht erkannt: lade export.xml hoch (nicht die ZIP-Datei).',
  },
  'setup.health.weight': { it: 'Peso più recente in Apple Health:', en: 'Most recent weight in Apple Health:', de: 'Neuestes Gewicht in Apple Health:' },
  'setup.health.apply': { it: 'Aggiorna', en: 'Update', de: 'Aktualisieren' },
  'setup.tech.note': {
    it: 'Nota tecnica: dal browser non posso collegarmi direttamente al tuo Huawei Watch (niente accesso Bluetooth/API Huawei Health nell\'app). Dopo ogni sessione ti chiederò di leggere il picco battito dal Watch e inserirlo qui a mano — richiede 5 secondi e tengo lo storico.',
    en: 'Technical note: from the browser I can\'t connect directly to your Huawei Watch (no Bluetooth/Huawei Health API access in the app). After each session I\'ll ask you to read the peak heart rate from the Watch and enter it here by hand — it takes 5 seconds and I keep the history.',
    de: 'Technischer Hinweis: Vom Browser aus kann ich keine direkte Verbindung zu deiner Huawei Watch herstellen (kein Bluetooth-/Huawei-Health-API-Zugriff in der App). Nach jeder Session wirst du gebeten, die Spitzen-Herzfrequenz von der Watch abzulesen und hier manuell einzutragen — das dauert 5 Sekunden und ich speichere den Verlauf.',
  },
  'setup.enlist': { it: 'ARRUOLATI', en: 'ENLIST', de: 'EINRÜCKEN' },

  /* ---- home screen ---- */
  'home.towards': { it: 'verso', en: 'toward', de: 'bis zu' },
  'home.day': { it: 'GIORNO', en: 'DAY', de: 'TAG' },
  'home.min15': { it: '15 MIN AL GIORNO', en: '15 MIN A DAY', de: '15 MIN PRO TAG' },
  'home.mission': { it: 'MISSIONE', en: 'MISSION', de: 'MISSION' },
  'home.intro': {
    it: 'Obiettivo: <b>dimagrire e tonificare la pancia</b>. Il Campo di 30 giorni ti dà una missione da 15 min ogni giorno: costanza e progressione sono il risultato garantito. Misura il <b>girovita</b> ogni settimana nel riepilogo.',
    en: 'Goal: <b>slim down and tone your belly</b>. The 30-day Camp gives you a 15-minute mission every day: consistency and progression are the guaranteed result. Measure your <b>waist</b> every week in the summary.',
    de: 'Ziel: <b>Bauchfett abbauen und den Bauch straffen</b>. Das 30-Tage-Camp gibt dir jeden Tag eine 15-Minuten-Mission: Konstanz und Progression sind das garantierte Ergebnis. Miss deinen <b>Bauchumfang</b> jede Woche in der Zusammenfassung.',
  },
  'home.intro.close': { it: 'Chiudi', en: 'Close', de: 'Schließen' },

  /* ---- dog tags ---- */
  'dt.streak': { it: 'Serie', en: 'Streak', de: 'Serie' },
  'dt.sessions': { it: 'Sessioni', en: 'Sessions', de: 'Sessions' },
  'dt.kcal': { it: 'Kcal', en: 'kcal', de: 'kcal' },
  'dt.day': { it: 'giorno', en: 'day', de: 'Tag' },
  'dt.days': { it: 'giorni', en: 'days', de: 'Tage' },
  'dt.total': { it: 'totali', en: 'total', de: 'gesamt' },
  'dt.7d': { it: '7 giorni', en: '7 days', de: '7 Tage' },
  'dt.duration': { it: 'Durata', en: 'Duration', de: 'Dauer' },
  'dt.estkcal': { it: 'Kcal stimate', en: 'Est. kcal', de: 'Gesch. kcal' },
  'dt.rounds': { it: 'Round', en: 'Rounds', de: 'Runden' },
  'dt.record': { it: 'Record', en: 'Best', de: 'Rekord' },
  'dt.beststreak': { it: 'miglior serie', en: 'best streak', de: 'beste Serie' },
  'dt.minutes': { it: 'Minuti', en: 'Minutes', de: 'Minuten' },
  'dt.trained': { it: 'allenati', en: 'trained', de: 'trainiert' },
  'dt.avgkcal': { it: 'Media kcal', en: 'Avg kcal', de: 'Ø kcal' },
  'dt.permission': { it: 'a missione', en: 'per mission', de: 'pro Mission' },
  'dt.weeks': { it: 'Settimane', en: 'Weeks', de: 'Wochen' },
  'dt.perweek': { it: 'sess./sett. media', en: 'sessions/week avg', de: 'Sessionen/Woche Ø' },

  /* ---- ticker ---- */
  'ticker.streak': { it: 'SERIE', en: 'STREAK', de: 'SERIE' },
  'ticker.sessions': { it: 'SESSIONI', en: 'SESSIONS', de: 'SESSIONS' },
  'ticker.kcal': { it: 'KCAL', en: 'KCAL', de: 'KCAL' },
  'ticker.week7': { it: '7G', en: '7D', de: '7T' },
  'ticker.level': { it: 'LIVELLO', en: 'LEVEL', de: 'LEVEL' },
  'ticker.mission': { it: 'MISSIONE', en: 'MISSION', de: 'MISSION' },
  'ticker.goal': { it: 'OBIETTIVO', en: 'GOAL', de: 'ZIEL' },
  'ticker.week': { it: 'SETTIMANA', en: 'WEEK', de: 'WOCHE' },
  'ticker.rank': { it: 'RANGO', en: 'RANK', de: 'RANG' },

  /* ---- home cards ---- */
  'home.waist.title': { it: 'GIROVITA', en: 'WAIST', de: 'BAUCHUMFANG' },
  'home.waist.sub': { it: '(pancia)', en: '(belly)', de: '(Bauch)' },
  'home.waist.last': { it: 'Ultima misura: {v} cm', en: 'Last measurement: {v} cm', de: 'Letzte Messung: {v} cm' },
  'home.waist.delta': { it: '{v} cm dalla prima', en: '{v} cm from the first', de: '{v} cm seit der ersten' },
  'home.waist.empty': {
    it: 'Misuralo nel riepilogo: è l\'indicatore più affidabile del dimagrimento',
    en: 'Measure it in the summary: it\'s the most reliable fat-loss indicator',
    de: 'Miss ihn in der Zusammenfassung: Der zuverlässigste Abnehm-Indikator',
  },
  'home.weight.title': { it: 'PESO', en: 'WEIGHT', de: 'GEWICHT' },
  'home.weight.sub': { it: '(media settimanale)', en: '(weekly average)', de: '(Wochendurchschnitt)' },
  'home.weight.last': { it: 'Ultima rilevazione: {v} kg', en: 'Last reading: {v} kg', de: 'Letzte Messung: {v} kg' },
  'home.weight.delta': { it: '{v} kg dalla prima', en: '{v} kg from the first', de: '{v} kg seit der ersten' },
  'home.weight.empty': {
    it: 'Registralo nel riepilogo dopo l\'allenamento',
    en: 'Log it in the summary after your workout',
    de: 'Trage es nach dem Training in der Zusammenfassung ein',
  },
  'home.trendok': { it: 'TREND OK', en: 'TREND OK', de: 'TREND OK' },
  'home.start': { it: 'INIZIA', en: 'START', de: 'START' },
  'home.promote.title': { it: 'PRONTO PER {lvl}', en: 'READY FOR {lvl}', de: 'BEREIT FÜR {lvl}' },
  'home.promote.body': {
    it: 'Ultime sessioni facili: aumenta il ritmo, i risultati crescono con la progressione.',
    en: 'Recent sessions were easy: increase the pace, results grow with progression.',
    de: 'Die letzten Sessions waren leicht: Erhöhe das Tempo, Ergebnisse wachsen durch Progression.',
  },
  'home.promote.btn': { it: 'PROMUOVI', en: 'PROMOTE', de: 'BEFÖRDERN' },
  'home.goal.title': { it: 'Obiettivo settimanale', en: 'Weekly goal', de: 'Wochenziel' },
  'home.next.title': { it: 'Prossimo traguardo: ancora {n} {unit}', en: 'Next milestone: {n} {unit} to go', de: 'Nächstes Ziel: noch {n} {unit}' },
  'home.unit.streak1': { it: 'giorno di serie', en: 'day of streak', de: 'Tag in Serie' },
  'home.unit.streakN': { it: 'giorni di serie', en: 'days of streak', de: 'Tage in Serie' },
  'home.unit.session1': { it: 'sessione', en: 'session', de: 'Session' },
  'home.unit.sessionN': { it: 'sessioni', en: 'sessions', de: 'Sessions' },
  'home.mission.title': { it: 'Missione di oggi', en: 'Today\'s mission', de: 'Mission von heute' },
  'home.mission.tag': { it: 'MISSIONE {id}', en: 'MISSION {id}', de: 'MISSION {id}' },
  'home.mission.adaptive': {
    it: 'Sessione precedente intensa → oggi si punta su core e mobilità',
    en: 'Previous session intense → today focuses on core and mobility',
    de: 'Vorherige Session intensiv → heute Fokus auf Core und Mobilität',
  },
  'home.mission.min': { it: '~15 min', en: '~15 min', de: '~15 min' },
  'home.mission.noequip': { it: 'Senza attrezzi', en: 'No equipment', de: 'Ohne Geräte' },
  'home.mission.ex': { it: '{n} esercizi', en: '{n} exercises', de: '{n} Übungen' },
  'home.mission.see': { it: 'VEDI MISSIONE', en: 'VIEW MISSION', de: 'MISSION ANSEHEN' },
  'home.repeat': { it: 'RIPETI L\'ULTIMA: {name}', en: 'REPEAT LAST: {name}', de: 'LETZTE WIEDERHOLEN: {name}' },
  'home.quick.min': { it: '~5 min', en: '~5 min', de: '~5 min' },
  'home.other': { it: 'Altre missioni', en: 'Other missions', de: 'Andere Missionen' },
  'home.yours': { it: 'Le tue missioni', en: 'Your missions', de: 'Deine Missionen' },
  'home.custom.ex': { it: '{n} esercizi', en: '{n} exercises', de: '{n} Übungen' },
  'home.custom.create': { it: 'CREA MISSIONE PERSONALIZZATA', en: 'CREATE CUSTOM MISSION', de: 'EIGENE MISSION ERSTELLEN' },
  'home.custom.delete': { it: 'Elimina missione', en: 'Delete mission', de: 'Mission löschen' },

  /* ---- library ---- */
  'lib.title': { it: 'LIBRERIA', en: 'LIBRARY', de: 'ÜBUNGEN' },
  'lib.sub': {
    it: 'Tutti gli esercizi, con note tecniche per over 40',
    en: 'All exercises, with over-40 technical notes',
    de: 'Alle Übungen, mit technischen Hinweisen für Ü40',
  },
  'lib.all': { it: 'Tutti', en: 'All', de: 'Alle' },
  'lib.standing': { it: 'In piedi', en: 'Standing', de: 'Im Stehen' },
  'lib.ground': { it: 'A terra', en: 'On the floor', de: 'Am Boden' },
  'lib.core': { it: 'Addome', en: 'Core', de: 'Bauch' },

  /* ---- builder ---- */
  'bld.title': { it: 'CREA MISSIONE', en: 'CREATE MISSION', de: 'MISSION ERSTELLEN' },
  'bld.name': { it: 'Nome missione (opzionale)', en: 'Mission name (optional)', de: 'Missionsname (optional)' },
  'bld.name.ph': { it: 'es. Gambe e cuore', en: 'e.g. Legs & cardio', de: 'z. B. Beine & Herz' },
  'bld.rounds': { it: 'Round', en: 'Rounds', de: 'Runden' },
  'bld.exercises': { it: 'Esercizi ({sel}/10, minimo 3)', en: 'Exercises ({sel}/10, min 3)', de: 'Übungen ({sel}/10, mind. 3)' },
  'bld.min': { it: '~{m} min', en: '~{m} min', de: '~{m} min' },
  'bld.kcal': { it: '~{k} kcal', en: '~{k} kcal', de: '~{k} kcal' },
  'bld.create.go': { it: 'CREA E VAI', en: 'CREATE & GO', de: 'ERSTELLEN & LOS' },
  'bld.hint': { it: 'Seleziona almeno 3 esercizi per continuare', en: 'Select at least 3 exercises to continue', de: 'Wähle mindestens 3 Übungen zum Fortfahren' },
  'bld.draft.name': { it: 'Missione personalizzata', en: 'Custom mission', de: 'Eigene Mission' },
  'bld.draft.tagline': { it: 'Creata da te', en: 'Made by you', de: 'Von dir erstellt' },

  /* ---- preview ---- */
  'prev.title': { it: 'MISSIONE {id}', en: 'MISSION {id}', de: 'MISSION {id}' },
  'prev.sub': {
    it: '{n} esercizi · {r} round · {p} · tocca per ingrandire, l\'icona per sostituire',
    en: '{n} exercises · {r} rounds · {p} · tap to enlarge, the icon to swap',
    de: '{n} Übungen · {r} Runden · {p} · tippen zum Vergrößern, das Symbol zum Ersetzen',
  },
  'prev.swapped': { it: 'sostituito', en: 'swapped', de: 'ersetzt' },
  'prev.restore': { it: 'ripristina {name}', en: 'restore {name}', de: '{name} wiederherstellen' },
  'prev.swap': { it: 'Sostituisci esercizio', en: 'Swap exercise', de: 'Übung ersetzen' },
  'prev.go': { it: 'VIA!', en: 'GO!', de: 'LOS!' },

  /* ---- session ---- */
  'ses.warmup': { it: 'RISCALDAMENTO', en: 'WARM-UP', de: 'AUFWÄRMEN' },
  'ses.cooldown': { it: 'DEFATICAMENTO', en: 'COOLDOWN', de: 'ABKÜHLEN' },
  'ses.rest': { it: 'RECUPERO', en: 'REST', de: 'PAUSE' },
  'ses.round': { it: 'ROUND {r} · {name}', en: 'ROUND {r} · {name}', de: 'RUNDE {r} · {name}' },
  'ses.elapsed': { it: 'TRASCORSO {t}', en: 'ELAPSED {t}', de: 'VERGANGEN {t}' },
  'ses.ex': { it: 'ESERCIZIO {a}/{b}', en: 'EXERCISE {a}/{b}', de: 'ÜBUNG {a}/{b}' },
  'ses.next': { it: 'Prossimo: {name}', en: 'Next: {name}', de: 'Als Nächstes: {name}' },
  'ses.next.rest': { it: 'Recupero', en: 'Rest', de: 'Pause' },
  'ses.next.cooldown': { it: 'Defaticamento', en: 'Cooldown', de: 'Abkühlen' },
  'ses.last': { it: 'Ultima fase', en: 'Last phase', de: 'Letzte Phase' },
  'ses.music': { it: 'Musica', en: 'Music', de: 'Musik' },
  'ses.resume': { it: 'Riprendi', en: 'Resume', de: 'Fortsetzen' },
  'ses.pause': { it: 'Pausa', en: 'Pause', de: 'Pause' },
  'ses.quit.title': { it: 'ABBANDONARE LA MISSIONE?', en: 'ABANDON THE MISSION?', de: 'MISSION ABBRECHEN?' },
  'ses.quit.body': {
    it: 'I progressi di questa sessione non verranno salvati.',
    en: 'This session\'s progress won\'t be saved.',
    de: 'Der Fortschritt dieser Session wird nicht gespeichert.',
  },
  'ses.quit.continue': { it: 'Continua', en: 'Continue', de: 'Fortsetzen' },
  'ses.quit.exit': { it: 'Esci', en: 'Exit', de: 'Beenden' },

  /* ---- summary ---- */
  'sum.title': { it: 'MISSIONE COMPIUTA', en: 'MISSION COMPLETE', de: 'MISSION ABGESCHLOSSEN' },
  'sum.share': {
    it: 'Missione compiuta su Operator 40: {name} — {min} min, {kcal} kcal 💪',
    en: 'Mission complete on Operator 40: {name} — {min} min, {kcal} kcal 💪',
    de: 'Mission auf Operator 40 abgeschlossen: {name} — {min} min, {kcal} kcal 💪',
  },
  'sum.copied': { it: 'COPIATO ✓', en: 'COPIED ✓', de: 'KOPIERT ✓' },
  'sum.sharebtn': { it: 'CONDIVIDI', en: 'SHARE', de: 'TEILEN' },
  'sum.rpe.title': { it: 'Come è andata?', en: 'How did it go?', de: 'Wie war es?' },
  'sum.notes.title': { it: 'Note (opzionale)', en: 'Notes (optional)', de: 'Notizen (optional)' },
  'sum.notes.ph': { it: 'es. ginocchio destro un po\' rigido oggi', en: 'e.g. right knee a bit stiff today', de: 'z. B. rechtes Knie heute etwas steif' },
  'sum.waist.title': { it: 'Girovita oggi (cm)', en: 'Waist today (cm)', de: 'Bauchumfang heute (cm)' },
  'sum.waist.body': {
    it: 'La misura della pancia è il dato più affidabile: registrala 1 volta a settimana (stessa ora, a stomaco vuoto). La diminuzione qui è il tuo "risultato sicuro".',
    en: 'The belly measurement is the most reliable metric: log it once a week (same time, on an empty stomach). The decrease here is your "guaranteed result".',
    de: 'Der Bauchumfang ist die zuverlässigste Messung: Trage ihn 1× pro Woche ein (gleiche Uhrzeit, nüchtern). Der Rückgang hier ist dein „sicheres Ergebnis“.',
  },
  'sum.waist.ph': { it: 'es. 96', en: 'e.g. 96', de: 'z. B. 96' },
  'sum.weight.title': { it: 'Peso oggi (kg)', en: 'Weight today (kg)', de: 'Gewicht heute (kg)' },
  'sum.weight.body': {
    it: 'Pesati alla stessa ora (al mattino, a digiuno): la media settimanale è più utile del singolo valore.',
    en: 'Weigh yourself at the same time (in the morning, fasting): the weekly average is more useful than a single value.',
    de: 'Wiege dich zur gleichen Zeit (morgens, nüchtern): Der Wochenmittelwert ist aussagekräftiger als ein einzelner Wert.',
  },
  'sum.weight.ph': { it: 'es. 80.5', en: 'e.g. 80.5', de: 'z. B. 80.5' },
  'sum.weight.ph.dynamic': { it: 'es. {v}', en: 'e.g. {v}', de: 'z. B. {v}' },
  'sum.hr.title': { it: 'Battito di picco (Huawei Watch)', en: 'Peak heart rate (Huawei Watch)', de: 'Spitzen-Herzfrequenz (Huawei Watch)' },
  'sum.hr.remind': { it: 'RICORDA', en: 'REMEMBER', de: 'ERINNERN' },
  'sum.hr.body': {
    it: 'Apri l\'app Huawei Health e leggi il valore massimo registrato durante l\'allenamento, poi inseriscilo qui.',
    en: 'Open the Huawei Health app, read the maximum value recorded during your workout, then enter it here.',
    de: 'Öffne die Huawei-Health-App, lies den während des Trainings erfassten Maximalwert und trage ihn hier ein.',
  },
  'sum.hr.ph': { it: 'es. 142', en: 'e.g. 142', de: 'z. B. 142' },
  'sum.zone': { it: 'Zona: {label}', en: 'Zone: {label}', de: 'Zone: {label}' },
  'sum.save': { it: 'SALVA E TORNA ALLA BASE', en: 'SAVE & RETURN TO BASE', de: 'SPEICHERN & ZURÜCK ZUR BASIS' },

  /* ---- history ---- */
  'hist.title': { it: 'STATISTICHE', en: 'STATISTICS', de: 'STATISTIK' },
  'hist.avgint': { it: 'Intensità media (RPE)', en: 'Average intensity (RPE)', de: 'Durchschnittliche Intensität (RPE)' },
  'hist.bestweek.title': { it: 'MIGLIORE SETTIMANA', en: 'BEST WEEK', de: 'BESTE WOCHE' },
  'hist.bestweek.sub': { it: 'Il picco più alto di kcal in 7 giorni', en: 'Highest kcal peak over 7 days', de: 'Höchster kcal-Wert in 7 Tagen' },
  'hist.kcal.unit': { it: 'kcal', en: 'kcal', de: 'kcal' },
  'hist.goal.title': { it: 'Obiettivo settimanale', en: 'Weekly goal', de: 'Wochenziel' },
  'hist.goal.label': { it: 'Missioni a settimana', en: 'Missions per week', de: 'Missionen pro Woche' },
  'hist.35d': { it: 'Ultimi 35 giorni', en: 'Last 35 days', de: 'Letzte 35 Tage' },
  'hist.milestones': { it: 'Traguardi', en: 'Milestones', de: 'Meilensteine' },
  'hist.miles.streak': { it: '{n}gg serie', en: '{n}d streak', de: '{n} Tage Serie' },
  'hist.miles.sessions': { it: '{n} sessioni', en: '{n} sessions', de: '{n} Sessions' },
  'hist.kcal7': { it: 'Kcal, ultimi 7 giorni', en: 'kcal, last 7 days', de: 'kcal, letzte 7 Tage' },
  'hist.vsweek': { it: '{p}% vs sett. scorsa', en: '{p}% vs last week', de: '{p}% ggü. letzter Woche' },
  'hist.fav': { it: 'Missioni preferite', en: 'Favorite missions', de: 'Beliebteste Missionen' },
  'hist.hr': { it: 'Battito di picco nel tempo', en: 'Peak heart rate over time', de: 'Spitzen-Herzfrequenz im Verlauf' },
  'hist.waist': { it: 'Girovita nel tempo (cm)', en: 'Waist over time (cm)', de: 'Bauchumfang im Verlauf (cm)' },
  'hist.waist.total': { it: '{v} cm totali', en: '{v} cm total', de: '{v} cm gesamt' },
  'hist.weight': { it: 'Peso nel tempo (kg)', en: 'Weight over time (kg)', de: 'Gewicht im Verlauf (kg)' },
  'hist.weight.total': { it: '{v} kg totali', en: '{v} kg total', de: '{v} kg gesamt' },
  'hist.rpe': { it: 'Intensità percepita nel tempo (RPE)', en: 'Perceived intensity over time (RPE)', de: 'Gefühlte Intensität im Verlauf (RPE)' },
  'hist.sessions.title': { it: 'Sessioni', en: 'Sessions', de: 'Sessions' },
  'hist.empty': { it: 'Nessuna missione ancora completata. Si parte quando vuoi.', en: 'No mission completed yet. Start whenever you like.', de: 'Noch keine Mission abgeschlossen. Starte, wann du willst.' },
  'hist.export': { it: 'ESPORTA DATI', en: 'EXPORT DATA', de: 'DATEN EXPORTIEREN' },
  'hist.clear': { it: 'CANCELLA', en: 'CLEAR', de: 'LÖSCHEN' },
  'hist.clear.title': { it: 'CANCELLARE TUTTO?', en: 'DELETE EVERYTHING?', de: 'ALLES LÖSCHEN?' },
  'hist.clear.body': {
    it: 'Tutte le sessioni salvate andranno perse. Esporta prima un backup se vuoi conservarle.',
    en: 'All saved sessions will be lost. Export a backup first if you want to keep them.',
    de: 'Alle gespeicherten Sessions gehen verloren. Exportiere zuerst ein Backup, wenn du sie behalten willst.',
  },
  'hist.clear.cancel': { it: 'Annulla', en: 'Cancel', de: 'Abbrechen' },
  'hist.clear.confirm': { it: 'Cancella', en: 'Delete', de: 'Löschen' },
  'hist.delete': { it: 'Elimina sessione', en: 'Delete session', de: 'Session löschen' },

  /* ---- toasts ---- */
  'toast.level.up': { it: 'Livello promosso: {label}', en: 'Level promoted: {label}', de: 'Level befördert: {label}' },
  'toast.promoted': { it: 'Promosso a {rank}', en: 'Promoted to {rank}', de: 'Befördert zu {rank}' },
  'toast.milestone.streak': { it: 'Traguardo sbloccato: {n} giorni di serie', en: 'Milestone unlocked: {n}-day streak', de: 'Meilenstein freigeschaltet: {n} Tage in Serie' },
  'toast.milestone.sessions': { it: 'Traguardo sbloccato: {n} sessioni', en: 'Milestone unlocked: {n} sessions', de: 'Meilenstein freigeschaltet: {n} Sessions' },
  'toast.goal': { it: 'Obiettivo settimanale raggiunto', en: 'Weekly goal reached', de: 'Wochenziel erreicht' },
  'toast.saved': { it: 'Missione salvata', en: 'Mission saved', de: 'Mission gespeichert' },
  'toast.history': { it: 'Cronologia cancellata', en: 'History cleared', de: 'Verlauf gelöscht' },
  'toast.removed': { it: 'Sessione rimossa', en: 'Session removed', de: 'Session entfernt' },
  'toast.created': { it: 'Missione creata', en: 'Mission created', de: 'Mission erstellt' },
  'toast.imported': { it: 'Importati {n} allenamenti da Apple Health', en: 'Imported {n} workouts from Apple Health', de: '{n} Workouts von Apple Health importiert' },
  'toast.imported.none': { it: 'Nessun nuovo allenamento trovato', en: 'No new workouts found', de: 'Keine neuen Workouts gefunden' },
  'toast.import.fail': { it: 'Import non riuscito: file non valido', en: 'Import failed: invalid file', de: 'Import fehlgeschlagen: ungültige Datei' },
  'toast.weight': { it: 'Peso aggiornato', en: 'Weight updated', de: 'Gewicht aktualisiert' },

  /* ---- new features ---- */
  'notif.body': { it: 'La tua missione di 15 min ti aspetta. Andiamo!', en: 'Your 15-min mission is ready. Let’s go!', de: 'Deine 15-Min-Mission wartet. Los geht’s!' },
  'notif.test.body': { it: 'Le notifiche funzionano. A domani per la missione!', en: 'Notifications work. See you tomorrow!', de: 'Benachrichtigungen funktionieren. Bis morgen!' },
  'notif.setup.title': { it: 'Promemoria giornaliero', en: 'Daily reminder', de: 'Tägliche Erinnerung' },
  'notif.setup.body': { it: 'Ti avviso ogni giorno all’ora scelta (serve il permesso).', en: 'I’ll remind you daily at the chosen time (permission required).', de: 'Ich erinnere dich täglich zur gewählten Zeit (Erlaubnis erforderlich).' },
  'notif.enable': { it: 'ATTIVA NOTIFICHE', en: 'ENABLE NOTIFICATIONS', de: 'BENACHRICHTIGUNGEN AKTIVIEREN' },
  'notif.disable': { it: 'DISATTIVA', en: 'DISABLE', de: 'DEAKTIVIEREN' },
  'notif.test': { it: 'TEST', en: 'TEST', de: 'TEST' },
  'share.session.title': { it: 'Missione compiuta — Operator 40', en: 'Mission complete — Operator 40', de: 'Mission abgeschlossen — Operator 40' },
  'share.session.text': { it: '{name} — {min} min, {kcal} kcal 💪', en: '{name} — {min} min, {kcal} kcal 💪', de: '{name} — {min} min, {kcal} kcal 💪' },
  'share.copied': { it: 'Link copiato', en: 'Link copied', de: 'Link kopiert' },
  'export.csv': { it: 'ESPORTA CSV', en: 'EXPORT CSV', de: 'CSV EXPORTIEREN' },
  'export.calendar': { it: 'Calendario', en: 'Calendar', de: 'Kalender' },
  'setup.height': { it: 'Altezza (cm)', en: 'Height (cm)', de: 'Größe (cm)' },
  'setup.height.ph': { it: 'es. 175', en: 'e.g. 175', de: 'z. B. 175' },
  'bmi.title': { it: 'BMI', en: 'BMI', de: 'BMI' },
  'bmi.under': { it: 'Sottopeso', en: 'Underweight', de: 'Untergewicht' },
  'bmi.ok': { it: 'Normale', en: 'Normal', de: 'Normal' },
  'bmi.over': { it: 'Sovrappeso', en: 'Overweight', de: 'Übergewicht' },
  'bmi.obese': { it: 'Obesità', en: 'Obesity', de: 'Adipositas' },
  'bmi.tdee': { it: 'TDEE stimato: {v} kcal/giorno', en: 'Est. TDEE: {v} kcal/day', de: 'Gesch. TDEE: {v} kcal/Tag' },
  'setup.custom': { it: 'Timer custom (sec)', en: 'Custom timer (sec)', de: 'Custom Timer (Sek)' },
  'setup.custom.work': { it: 'Lavoro', en: 'Work', de: 'Arbeit' },
  'setup.custom.rest': { it: 'Recupero', en: 'Rest', de: 'Pause' },
};