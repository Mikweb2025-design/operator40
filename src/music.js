/* Motivational workout music.
   Tracks are royalty-free and ship as local MP3 files in /tracks — the app
   works fully offline, no streaming, no licensing issues.
   - All tracks: NEFFEX — CC BY 3.0 (attribution required) — neffexmusic.com */

export const TRACKS = [
  {
    id: 'hustlin',
    name: "Hustlin'",
    artist: 'NEFFEX',
    src: 'tracks/hustlin.mp3',
    tag: 'Energetica',
    lang: 'EN',
  },
  {
    id: 'manifest',
    name: 'Manifest It',
    artist: 'NEFFEX',
    src: 'tracks/manifest.mp3',
    tag: 'Battuta',
    lang: 'EN',
  },
  {
    id: 'born',
    name: 'Born A Rockstar',
    artist: 'NEFFEX',
    src: 'tracks/born.mp3',
    tag: 'Sprint',
    lang: 'EN',
  },
  {
    id: 'fightback',
    name: 'Fight Back',
    artist: 'NEFFEX',
    src: 'tracks/fightback.mp3',
    tag: 'Pesante',
    lang: 'EN',
  },
  {
    id: 'theitch',
    name: 'The Itch',
    artist: 'NEFFEX ft. Josh A',
    src: 'tracks/theitch.mp3',
    tag: 'Battuta',
    lang: 'EN',
  },
  {
    id: 'godown',
    name: 'Go Down Swinging',
    artist: 'NEFFEX',
    src: 'tracks/godown.mp3',
    tag: 'Energetica',
    lang: 'EN',
  },
  {
    id: 'addict',
    name: 'Addict',
    artist: 'NEFFEX',
    src: 'tracks/addict.mp3',
    tag: 'Sprint',
    lang: 'EN',
  },
  {
    id: 'tellme',
    name: "Tell Me That I Can't",
    artist: 'NEFFEX',
    src: 'tracks/tellme.mp3',
    tag: 'Pesante',
    lang: 'EN',
  },
  {
    id: 'grateful',
    name: 'Grateful',
    artist: 'NEFFEX',
    src: 'tracks/grateful.mp3',
    tag: 'Energetica',
    lang: 'EN',
  },
  {
    id: 'unstoppable',
    name: 'Unstoppable',
    artist: 'NEFFEX',
    src: 'tracks/unstoppable.mp3',
    tag: 'Sprint',
    lang: 'EN',
  },
  {
    id: 'comeback',
    name: 'Comeback',
    artist: 'NEFFEX',
    src: 'tracks/comeback.mp3',
    tag: 'Pesante',
    lang: 'EN',
  },
  {
    id: 'destiny',
    name: 'Destiny',
    artist: 'NEFFEX',
    src: 'tracks/destiny.mp3',
    tag: 'Battuta',
    lang: 'EN',
  },
];

export const DEFAULT_TRACK = TRACKS[0].id;

let audio = null;
let audio2 = null;
let shouldPlay = false;
let currentTrackId = DEFAULT_TRACK;
let autoPlayNext = true;
let shuffleMode = false;
let onTrackChange = null;
let shuffleOrder = null;
let shuffleSeedDay = null;
let shuffleIdx = 0;
const CROSSFADE_MS = 1200;

function ensureAudio() {
  if (!audio) {
    audio = new Audio();
    audio.loop = false;
    audio.preload = 'auto';
    audio.addEventListener('ended', () => {
      if (!shouldPlay || !autoPlayNext) return;
      const nextId = shuffleMode ? getRandomTrackId() : getNextTrackId(currentTrackId);
      if (nextId) {
        const nxt = TRACKS.find((t) => t.id === nextId);
        if (nxt) {
          if (shouldPlay) crossfadeTo(nxt.src);
          else musicLoad(nxt.src);
          currentTrackId = nextId;
          if (onTrackChange) try{ onTrackChange(nextId);}catch{}
          if (!shouldPlay) {} else if (!audio2) musicPlay();
        }
      }
    });
  }
  return audio;
}

function getNextTrackId(id) {
  const idx = TRACKS.findIndex((t) => t.id === id);
  if (idx === -1) return TRACKS[0]?.id || null;
  return TRACKS[(idx + 1) % TRACKS.length].id;
}
function getPrevTrackId(id) {
  const idx = TRACKS.findIndex((t) => t.id === id);
  if (idx === -1) return TRACKS[0]?.id || null;
  return TRACKS[(idx - 1 + TRACKS.length) % TRACKS.length].id;
}
function hashDay(s) { let h=0; for(let i=0;i<s.length;i++) h=Math.imul(31,h)+s.charCodeAt(i)|0; return h >>>0; }
function mulberry32(a){ return function(){ let t=a+=0x6D2B79F5; t=Math.imul(t ^ t>>>15, t|1); t^=t+ Math.imul(t ^ t>>>7, t|61); return ((t ^ t>>>14)>>>0)/4294967296; }; }
function ensureShuffledOrder(){
  const day = new Date().toISOString().slice(0,10);
  if (shuffleOrder && shuffleSeedDay === day) return shuffleOrder;
  const seed = hashDay(day);
  const rand = mulberry32(seed);
  const arr = [...TRACKS].map(t=>t.id);
  for(let i=arr.length-1;i>0;i--){ const j=Math.floor(rand()*(i+1)); [arr[i],arr[j]]=[arr[j],arr[i]]; }
  shuffleOrder = arr; shuffleSeedDay = day; shuffleIdx = arr.indexOf(currentTrackId); if(shuffleIdx===-1) shuffleIdx=0;
  return shuffleOrder;
}
function getRandomTrackId() {
  const order = ensureShuffledOrder();
  if (order.length <=1) return order[0]||null;
  shuffleIdx = (shuffleIdx+1) % order.length;
  let pick = order[shuffleIdx];
  if (pick === currentTrackId) { shuffleIdx=(shuffleIdx+1)%order.length; pick=order[shuffleIdx]; }
  return pick;
}
function crossfadeTo(src){
  const a = ensureAudio();
  if (!audio2) { audio2 = new Audio(); audio2.preload='auto'; }
  const next = audio2;
  const prev = a;
  next.src = src; next.volume=0; next.play().catch(()=>{});
  const steps = 24; let s=0;
  const iv = setInterval(()=>{
    s++; const t=s/steps;
    try{ prev.volume=Math.max(0,1-t); next.volume=Math.min(1,t); }catch{}
    if(s>=steps){ clearInterval(iv); try{ prev.pause(); prev.volume=1; }catch{} // swap
      const tmp = audio; audio = audio2; audio2 = tmp; audio2.pause(); audio2.currentTime=0;
      const bySrc = TRACKS.find(tt=> new URL(tt.src, location.href).href===new URL(src, location.href).href);
      if(bySrc) currentTrackId=bySrc.id;
    }
  }, CROSSFADE_MS/steps);
}

export function musicSetShouldPlay(v) {
  shouldPlay = !!v;
}
export function musicIsShouldPlay() {
  return shouldPlay;
}
export function musicSetAutoPlay(v) {
  autoPlayNext = !!v;
}
export function musicGetAutoPlay() {
  return autoPlayNext;
}
export function musicSetShuffle(v) {
  shuffleMode = !!v;
}
export function musicGetShuffle() {
  return shuffleMode;
}
export function musicSetOnTrackChange(cb) {
  onTrackChange = typeof cb === 'function' ? cb : null;
}
export function musicGetCurrentId() {
  return currentTrackId;
}

export function musicLoad(src) {
  const a = ensureAudio();
  // se src è un id traccia, risolvi
  let resolvedSrc = src;
  const byId = TRACKS.find((t) => t.id === src);
  if (byId) {
    resolvedSrc = byId.src;
    currentTrackId = byId.id;
  } else {
    // cerca se src corrisponde a un file
    const found = TRACKS.find((t) => t.src === src);
    if (found) currentTrackId = found.id;
  }
  const want = new URL(resolvedSrc, location.href).href;
  if (a.src !== want) {
    a.src = want;
    a.load();
  } else {
    // assicurati currentTrackId aggiornato anche se src uguale
    const f = TRACKS.find((t) => new URL(t.src, location.href).href === want);
    if (f) currentTrackId = f.id;
  }
}

export function musicPlay() {
  const a = ensureAudio();
  if (!a.src) {
    // carica traccia corrente se vuota
    const cur = TRACKS.find((t) => t.id === currentTrackId) || TRACKS[0];
    if (cur) musicLoad(cur.src);
  }
  const p = a.play();
  if (p && typeof p.catch === 'function') p.catch(() => {});
}

export function musicPause() {
  if (audio && !audio.paused) audio.pause();
}

export function musicStop() {
  if (audio) {
    audio.pause();
    audio.currentTime = 0;
  }
}

export function musicSetVolume(v) {
  if (audio) audio.volume = Math.max(0, Math.min(1, v));
}

export function musicNext() {
  const nextId = shuffleMode ? getRandomTrackId() : getNextTrackId(currentTrackId);
  if (!nextId) return null;
  const nxt = TRACKS.find((t) => t.id === nextId);
  if (nxt) {
    if (shouldPlay) crossfadeTo(nxt.src); else musicLoad(nxt.src);
    currentTrackId = nextId;
    if (shouldPlay && !audio2) musicPlay();
    if (onTrackChange) try{ onTrackChange(nextId);}catch{}
  }
  return nextId;
}

export function musicPrev() {
  const prevId = getPrevTrackId(currentTrackId);
  if (!prevId) return null;
  const prv = TRACKS.find((t) => t.id === prevId);
  if (prv) {
    if (shouldPlay) crossfadeTo(prv.src); else musicLoad(prv.src);
    currentTrackId = prevId;
    if (shouldPlay && !audio2) musicPlay();
    if (onTrackChange) try{ onTrackChange(prevId);}catch{}
  }
  return prevId;
}

export function musicGetQueue() {
  return TRACKS.map((t) => ({
    ...t,
    isCurrent: t.id === currentTrackId,
    isPlaying: t.id === currentTrackId && shouldPlay && audio && !audio.paused,
  }));
}

/* iOS only starts HTMLAudio inside a user gesture: on the first tap we resume
   whenever music should be playing for the current screen. */
if (typeof window !== 'undefined') {
  ['pointerdown', 'touchend', 'keydown'].forEach((evt) =>
    window.addEventListener(
      evt,
      () => {
        if (shouldPlay) musicPlay();
      },
      { passive: true }
    )
  );
}
