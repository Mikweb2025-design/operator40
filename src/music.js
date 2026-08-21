/* Motivational workout music.
   Tracks are royalty-free and ship as local MP3 files in /tracks — the app
   works fully offline, no streaming, no licensing issues.
   - All tracks: NEFFEX — CC BY 3.0 (attribution required) — neffexmusic.com */

export const TRACKS = [
  { id: 'hustlin', name: "Hustlin'", artist: 'NEFFEX', src: 'tracks/hustlin.mp3', tag: 'Energetica', lang: 'EN' },
  { id: 'manifest', name: 'Manifest It', artist: 'NEFFEX', src: 'tracks/manifest.mp3', tag: 'Battuta', lang: 'EN' },
  { id: 'born', name: 'Born A Rockstar', artist: 'NEFFEX', src: 'tracks/born.mp3', tag: 'Sprint', lang: 'EN' },
  { id: 'fightback', name: 'Fight Back', artist: 'NEFFEX', src: 'tracks/fightback.mp3', tag: 'Pesante', lang: 'EN' },
  { id: 'theitch', name: 'The Itch', artist: 'NEFFEX ft. Josh A', src: 'tracks/theitch.mp3', tag: 'Battuta', lang: 'EN' },
  { id: 'godown', name: 'Go Down Swinging', artist: 'NEFFEX', src: 'tracks/godown.mp3', tag: 'Energetica', lang: 'EN' },
  { id: 'addict', name: 'Addict', artist: 'NEFFEX', src: 'tracks/addict.mp3', tag: 'Sprint', lang: 'EN' },
  { id: 'tellme', name: "Tell Me That I Can't", artist: 'NEFFEX', src: 'tracks/tellme.mp3', tag: 'Pesante', lang: 'EN' },
  { id: 'grateful', name: 'Grateful', artist: 'NEFFEX', src: 'tracks/grateful.mp3', tag: 'Energetica', lang: 'EN' },
  { id: 'unstoppable', name: 'Unstoppable', artist: 'NEFFEX', src: 'tracks/unstoppable.mp3', tag: 'Sprint', lang: 'EN' },
  { id: 'comeback', name: 'Comeback', artist: 'NEFFEX', src: 'tracks/comeback.mp3', tag: 'Pesante', lang: 'EN' },
  { id: 'destiny', name: 'Destiny', artist: 'NEFFEX', src: 'tracks/destiny.mp3', tag: 'Battuta', lang: 'EN' },
];

export const DEFAULT_TRACK = TRACKS[0].id;

let audio = null;
let shouldPlay = false;
let currentTrackId = DEFAULT_TRACK;
let autoPlayNext = true;
let shuffleMode = false;
let onTrackChange = null;

function ensureAudio() {
  if (!audio) {
    audio = new Audio();
    audio.loop = false;
    audio.preload = 'auto';
    audio.addEventListener('ended', () => {
      if (!shouldPlay || !autoPlayNext) return;
      const nextId = shuffleMode ? getRandomTrackId() : getNextTrackId(currentTrackId);
      if (nextId) {
        currentTrackId = nextId;
        const nxt = TRACKS.find(t => t.id === nextId);
        if (nxt) {
          musicLoad(nxt.src);
          // notifica UI
          if (onTrackChange) try { onTrackChange(nextId); } catch {}
          musicPlay();
        }
      }
    });
  }
  return audio;
}

function getNextTrackId(id) {
  const idx = TRACKS.findIndex(t => t.id === id);
  if (idx === -1) return TRACKS[0]?.id || null;
  return TRACKS[(idx + 1) % TRACKS.length].id;
}
function getPrevTrackId(id) {
  const idx = TRACKS.findIndex(t => t.id === id);
  if (idx === -1) return TRACKS[0]?.id || null;
  return TRACKS[(idx - 1 + TRACKS.length) % TRACKS.length].id;
}
function getRandomTrackId() {
  if (TRACKS.length <= 1) return TRACKS[0]?.id || null;
  let pick;
  do { pick = TRACKS[Math.floor(Math.random() * TRACKS.length)].id; } while (pick === currentTrackId);
  return pick;
}

export function musicSetShouldPlay(v) { shouldPlay = !!v; }
export function musicIsShouldPlay() { return shouldPlay; }
export function musicSetAutoPlay(v) { autoPlayNext = !!v; }
export function musicGetAutoPlay() { return autoPlayNext; }
export function musicSetShuffle(v) { shuffleMode = !!v; }
export function musicGetShuffle() { return shuffleMode; }
export function musicSetOnTrackChange(cb) { onTrackChange = typeof cb === 'function' ? cb : null; }
export function musicGetCurrentId() { return currentTrackId; }

export function musicLoad(src) {
  const a = ensureAudio();
  // se src è un id traccia, risolvi
  let resolvedSrc = src;
  const byId = TRACKS.find(t => t.id === src);
  if (byId) {
    resolvedSrc = byId.src;
    currentTrackId = byId.id;
  } else {
    // cerca se src corrisponde a un file
    const found = TRACKS.find(t => t.src === src);
    if (found) currentTrackId = found.id;
  }
  const want = new URL(resolvedSrc, location.href).href;
  if (a.src !== want) {
    a.src = want;
    a.load();
  } else {
    // assicurati currentTrackId aggiornato anche se src uguale
    const f = TRACKS.find(t => new URL(t.src, location.href).href === want);
    if (f) currentTrackId = f.id;
  }
}

export function musicPlay() {
  const a = ensureAudio();
  if (!a.src) {
    // carica traccia corrente se vuota
    const cur = TRACKS.find(t => t.id === currentTrackId) || TRACKS[0];
    if (cur) musicLoad(cur.src);
  }
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

export function musicNext() {
  const nextId = shuffleMode ? getRandomTrackId() : getNextTrackId(currentTrackId);
  if (!nextId) return null;
  currentTrackId = nextId;
  const nxt = TRACKS.find(t => t.id === nextId);
  if (nxt) {
    musicLoad(nxt.src);
    if (shouldPlay) musicPlay();
    if (onTrackChange) try { onTrackChange(nextId); } catch {}
  }
  return nextId;
}

export function musicPrev() {
  const prevId = getPrevTrackId(currentTrackId);
  if (!prevId) return null;
  currentTrackId = prevId;
  const prv = TRACKS.find(t => t.id === prevId);
  if (prv) {
    musicLoad(prv.src);
    if (shouldPlay) musicPlay();
    if (onTrackChange) try { onTrackChange(prevId); } catch {}
  }
  return prevId;
}

export function musicGetQueue() {
  return TRACKS.map(t => ({
    ...t,
    isCurrent: t.id === currentTrackId,
    isPlaying: t.id === currentTrackId && shouldPlay && audio && !audio.paused,
  }));
}

/* iOS only starts HTMLAudio inside a user gesture: on the first tap we resume
   whenever music should be playing for the current screen. */
if (typeof window !== 'undefined') {
  ['pointerdown', 'touchend', 'keydown'].forEach(evt =>
    window.addEventListener(evt, () => { if (shouldPlay) musicPlay(); }, { passive: true })
  );
}