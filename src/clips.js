export const CLIP_FILES = {
  bicyclecrunch: 'clips/bicyclecrunch.mp4',
  russiantwist: 'clips/russiantwist.mp4',
  wallsit: 'clips/wallsit.mp4'
};

export function hasClip(exerciseId, pose) {
  return !!(CLIP_FILES[exerciseId] || CLIP_FILES[pose]);
}