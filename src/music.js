/* Motivational workout music.
   Tracks are royalty-free and ship as local MP3 files in /tracks — the app
   works fully offline, no streaming, no licensing issues.
   - NEFFEX tracks: CC BY 3.0 (attribution required) — neffexmusic.com
   - La Leggenda del Piave, Alte Kameraden, Preußens Gloria: public domain
   - Bella ciao (Orchestra of Serbian Guards / Tinkes): CC BY-SA 4.0 */

export const TRACKS = [
  { id: 'hustlin', name: "Hustlin'", artist: 'NEFFEX', src: 'tracks/hustlin.mp3', tag: 'Energetica', lang: 'EN' },
  { id: 'manifest', name: 'Manifest It', artist: 'NEFFEX', src: 'tracks/manifest.mp3', tag: 'Battuta', lang: 'EN' },
  { id: 'born', name: 'Born A Rockstar', artist: 'NEFFEX', src: 'tracks/born.mp3', tag: 'Sprint', lang: 'EN' },
  { id: 'fightback', name: 'Fight Back', artist: 'NEFFEX', src: 'tracks/fightback.mp3', tag: 'Pesante', lang: 'EN' },
  { id: 'theitch', name: 'The Itch', artist: 'NEFFEX ft. Josh A', src: 'tracks/theitch.mp3', tag: 'Battuta', lang: 'EN' },
  { id: 'godown', name: 'Go Down Swinging', artist: 'NEFFEX', src: 'tracks/godown.mp3', tag: 'Energetica', lang: 'EN' },
  { id: 'addict', name: 'Addict', artist: 'NEFFEX', src: 'tracks/addict.mp3', tag: 'Sprint', lang: 'EN' },
  { id: 'tellme', name: "Tell Me That I Can't", artist: 'NEFFEX', src: 'tracks/tellme.mp3', tag: 'Pesante', lang: 'EN' },
  { id: 'piave', name: 'La Leggenda del Piave', artist: 'E. A. Mario', src: 'tracks/piave.mp3', tag: 'Marcia', lang: 'IT' },
  { id: 'bellaciao', name: 'Bella ciao', artist: 'Banda · Guardia Serba', src: 'tracks/bellaciao.mp3', tag: 'Inno', lang: 'IT' },
  { id: 'altekameraden', name: 'Alte Kameraden', artist: 'C. Teike · Anker-Orch.', src: 'tracks/alte-kameraden.mp3', tag: 'Marcia', lang: 'DE' },
  { id: 'preussensgloria', name: 'Preußens Gloria', artist: 'G. Piefke', src: 'tracks/preussens-gloria.mp3', tag: 'Marcia', lang: 'DE' },
];

export const DEFAULT_TRACK = TRACKS[0].id;

let audio = null;
let shouldPlay = false;

function ensureAudio() {
  if (!audio) {
    audio = new Audio();
    audio.loop = true;
    audio.preload = 'auto';
  }
  return audio;
}

export function musicSetShouldPlay(v) { shouldPlay = !!v; }
export function musicIsShouldPlay() { return shouldPlay; }

export function musicLoad(src) {
  const a = ensureAudio();
  const want = new URL(src, location.href).href;
  if (a.src !== want) {
    a.src = want;
    a.load();
  }
}

export function musicPlay() {
  const a = ensureAudio();
  if (!a.src) return;
  const p = a.play();
  if (p && typeof p.catch === 'function') p.catch(() => {});
}

export function musicPause() {
  if (audio && !audio.paused) audio.pause();
}

export function musicStop() {
  if (audio) { audio.pause(); audio.currentTime = 0; }
}

export function musicSetVolume(v) {
  if (audio) audio.volume = Math.max(0, Math.min(1, v));
}

/* iOS only starts HTMLAudio inside a user gesture: on the first tap we resume
   whenever music should be playing for the current screen. */
if (typeof window !== 'undefined') {
  ['pointerdown', 'touchend', 'keydown'].forEach(evt =>
    window.addEventListener(evt, () => { if (shouldPlay) musicPlay(); }, { passive: true })
  );
}