export const CLIP_FILES = {
  bicyclecrunch: 'clips/bicyclecrunch.mp4',
  russiantwist: 'clips/russiantwist.mp4',
  wallsit: 'clips/wallsit.mp4',
  superman: 'clips/superman.mp4',
  ponte: 'clips/ponte.mp4',
  bridge: 'clips/ponte.mp4',
  ginocchiaalte: 'clips/ginocchiaalte.mp4',
  highknees: 'clips/ginocchiaalte.mp4'
};

export function hasClip(exerciseId, pose) {
  return !!(CLIP_FILES[exerciseId] || CLIP_FILES[pose]);
}