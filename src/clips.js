export const CLIP_FILES = {
  bicyclecrunch: 'clips/bicyclecrunch.mp4',
  russiantwist: 'clips/russiantwist.mp4',
  wallsit: 'clips/wallsit.mp4',
  superman: 'clips/superman.mp4',
  ponte: 'clips/ponte.mp4',
  bridge: 'clips/ponte.mp4',
  ginocchiaalte: 'clips/ginocchiaalte.mp4',
  highknees: 'clips/ginocchiaalte.mp4',
  crunch: 'clips/crunch.mp4',
  burpeetattico: 'clips/burpeetattico.mp4',
  burpee: 'clips/burpeetattico.mp4',
  sideplank: 'clips/sideplank.mp4',
  legraise: 'clips/legraise.mp4',
  flutterkick: 'clips/flutterkick.mp4',
  deadbug: 'clips/deadbug.mp4',
  flessioni: 'clips/flessioni.mp4',
  pushup: 'clips/flessioni.mp4',
  vup: 'clips/vup.mp4',
  plankjack: 'clips/plankjack.mp4',
  skater: 'clips/skater.mp4',
  heeltap: 'clips/heeltap.mp4',
  squat: 'clips/squat.mp4',
};

export function hasClip(exerciseId, pose) {
  return !!(CLIP_FILES[exerciseId] || CLIP_FILES[pose]);
}
