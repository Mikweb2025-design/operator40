import { WARM_SEC, COOL_SEC, WORK_SEC, REST_SEC, HOLD_EXERCISES, getReps } from '../data/programs.js';
import { EXERCISES } from '../data/exercises.js';

export function buildSequence(program, skipWarmup, workSec = WORK_SEC, restSec = REST_SEC, mode = 'time', levelKey = 'combattente') {
  const isReps = mode === 'reps';
  const seq = skipWarmup ? [] : [{ type: 'warmup', duration: WARM_SEC }];
  for (let r = 1; r <= program.rounds; r++) {
    program.exercises.forEach((exId, i) => {
      const reps = isReps ? getReps(exId, levelKey) : null;
      if (isReps && reps) {
        seq.push({ type: 'work', exerciseId: exId, reps, duration: null, round: r, mode: 'reps' });
      } else {
        seq.push({ type: 'work', exerciseId: exId, duration: workSec, round: r, mode: 'time' });
      }
      const isLast = r === program.rounds && i === program.exercises.length - 1;
      if (!isLast) seq.push({ type: 'rest', duration: restSec });
    });
  }
  if (!skipWarmup) seq.push({ type: 'cooldown', duration: COOL_SEC });
  return seq;
}

export function kcalForSeconds(met, weightKg, seconds) {
  return (met * 3.5 * weightKg / 200) * (seconds / 60);
}

export function estimateProgramKcal(program, weightKg, skipWarmup, workSec = WORK_SEC, restSec = REST_SEC, mode = 'time', levelKey = 'combattente') {
  let kcal = skipWarmup ? 0 : kcalForSeconds(3.0, weightKg, WARM_SEC) + kcalForSeconds(3.0, weightKg, COOL_SEC);
  const isReps = mode === 'reps';
  program.exercises.forEach(id => {
    const ex = EXERCISES[id];
    for (let r = 0; r < program.rounds; r++) {
      if (isReps) {
        const reps = getReps(id, levelKey);
        const sec = reps ? reps * 3 : workSec; // 3″ a rep, hold resta a tempo
        kcal += kcalForSeconds(ex.met, weightKg, sec);
      } else {
        kcal += kcalForSeconds(ex.met, weightKg, workSec);
      }
      kcal += kcalForSeconds(2.0, weightKg, restSec);
    }
  });
  return kcal;
}

export function totalSeqSeconds(program, skipWarmup, workSec = WORK_SEC, restSec = REST_SEC, mode = 'time', levelKey = 'combattente') {
  return buildSequence(program, skipWarmup, workSec, restSec, mode, levelKey).reduce((a, p) => a + (p.duration || (p.reps ? p.reps * 3 : 0)), 0);
}
