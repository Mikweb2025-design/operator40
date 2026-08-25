/**
 * Operator40 — LocalizationManager
 * Centralized language for AI Coach — all messages route through here.
 * language = userSelectedLanguage (profile.lang, fallback detectLang).
 * Mirrors existing i18n.js but for engine-internal coaching cues.
 */
import { detectLang, LANGS } from '../i18n.js';

export type SupportedLang = 'it' | 'en' | 'de' | 'fr';

const FALLBACK: SupportedLang = 'en';

export function normalizeLang(input?: string): SupportedLang {
  if (!input) return (detectLang() as SupportedLang) || FALLBACK;
  const base = input.split('-')[0].toLowerCase();
  if ((LANGS as string[]).includes(base)) return base as SupportedLang;
  if (['fr', 'de', 'it', 'en'].includes(base)) return base as SupportedLang;
  return FALLBACK;
}

// Central coaching dictionary — used by CoachEngine, FormAnalyzer, MotivationEngine, SpeechManager
// Every string must exist for each lang; if missing, falls back to en.
export const COACH_I18N: Record<string, Record<SupportedLang, string>> = {
  // Form corrections
  'coach.backStraight': { it: 'Tieni la schiena dritta!', en: 'Keep your back straight!', de: 'Halte deinen Rücken gerade!', fr: 'Tiens le dos droit !' },
  'coach.goLower': { it: 'Scendi ancora!', en: 'Go lower!', de: 'Geh tiefer!', fr: 'Descends plus bas !' },
  'coach.extendArms': { it: 'Braccia completamente distese!', en: 'Fully extend your arms!', de: 'Arme ganz strecken!', fr: 'Tends complètement les bras !' },
  'coach.extendLegs': { it: 'Distendi le gambe!', en: 'Fully extend your legs!', de: 'Beine ganz strecken!', fr: 'Tends complètement les jambes !' },
  'coach.control': { it: 'Controlla il movimento.', en: 'Control the movement.', de: 'Kontrolliere die Bewegung.', fr: 'Contrôle le mouvement.' },
  'coach.hipsStable': { it: 'Tieni il bacino stabile.', en: 'Keep your hips stable.', de: 'Halte die Hüften stabil.', fr: 'Garde les hanches stables.' },
  'coach.kneesOverToes': { it: 'Ginocchia sopra le punte.', en: 'Knees over toes.', de: 'Knie über den Zehen.', fr: 'Genoux au-dessus des orteils.' },
  'coach.coreTight': { it: 'Addome contratto!', en: 'Tighten your core!', de: 'Core anspannen!', fr: 'Gaine les abdos !' },
  'coach.steady': { it: 'Ritmo costante.', en: 'Steady rhythm.', de: 'Gleichmäßiges Tempo.', fr: 'Rythme régulier.' },
  'coach.slowDown': { it: 'Rallenta un po’.', en: 'Slow down.', de: 'Langsamer.', fr: 'Ralentis.' },
  'coach.breathe': { it: 'Respira!', en: 'Breathe!', de: 'Atmen!', fr: 'Respire !' },
  // Rep / quality praise
  'coach.good': { it: 'Bene!', en: 'Good!', de: 'Gut!', fr: 'Bien !' },
  'coach.perfect': { it: 'Perfetto!', en: 'Perfect!', de: 'Perfekt!', fr: 'Parfait !' },
  'coach.excellentRep': { it: 'Ripetizione eccellente!', en: 'Excellent repetition!', de: 'Ausgezeichnete Wiederholung!', fr: 'Excellente répétition !' },
  'coach.almostThere': { it: 'Ci sei quasi!', en: 'Almost there!', de: 'Fast geschafft!', fr: 'Presque arrivé !' },
  // Motivation
  'coach.greatJob': { it: 'Grande lavoro! Continua così!', en: 'Great job! Keep going!', de: 'Großartige Arbeit! Weiter so!', fr: 'Excellent travail ! Continue !' },
  'coach.threeMore': { it: 'Ancora tre!', en: 'Only three more!', de: 'Nur noch drei!', fr: 'Encore trois !' },
  'coach.twoMore': { it: 'Dai! Ancora due!', en: 'Come on! Two more!', de: 'Komm schon! Noch zwei!', fr: 'Allez ! Encore deux !' },
  'coach.oneMore': { it: 'ULTIMO! Dai tutto!', en: 'ONE MORE! Give it everything!', de: 'LETZTE! Gib alles!', fr: 'DERNIÈRE ! Donne tout !' },
  'coach.missionComplete': { it: 'Missione compiuta! Lavoro eccellente!', en: 'Mission complete! Excellent work!', de: 'Mission abgeschlossen! Ausgezeichnet!', fr: 'Mission accomplie ! Excellent travail !' },
  'coach.ready': { it: 'Pronto? Inizia quando vuoi.', en: 'Ready? Start when you are.', de: 'Bereit? Starte wenn du willst.', fr: 'Prêt ? Démarre quand tu veux.' },
  'coach.holdPosition': { it: 'Mantieni la posizione...', en: 'Hold the position...', de: 'Position halten...', fr: 'Garde la position...' },
  'coach.moveIntoFrame': { it: 'Entra nell’inquadratura.', en: 'Move into frame.', de: 'Komm ins Bild.', fr: 'Place-toi dans le cadre.' },
  // Misc
  'coach.rep': { it: 'Ripetizione', en: 'Rep', de: 'Wdh', fr: 'Rép' },
  'coach.time': { it: 'Tempo', en: 'Time', de: 'Zeit', fr: 'Temps' },
  'coach.form': { it: 'Forma', en: 'Form', de: 'Form', fr: 'Forme' },
  'coach.status.good': { it: 'Buona forma', en: 'Good form', de: 'Gute Form', fr: 'Bonne forme' },
  'coach.status.fix': { it: 'Correggi', en: 'Fix form', de: 'Korrigieren', fr: 'Corrige' },
};

export function tCoach(key: string, lang?: string): string {
  const l = normalizeLang(lang);
  const entry = COACH_I18N[key];
  if (!entry) return key;
  return entry[l] ?? entry.en ?? key;
}
