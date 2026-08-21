import { WARM_SEC, COOL_SEC, WORK_SEC, REST_SEC } from '../data/programs.js';
import { EXERCISES } from '../data/exercises.js';

export function buildSequence(program, skipWarmup, workSec = WORK_SEC, restSec = REST_SEC) {
  const seq = skipWarmup ? [] : [{ type: 'warmup', duration: WARM_SEC }];
  for (let r = 1; r <= program.rounds; r++) {
    program.exercises.forEach((exId, i) => {
      seq.push({ type: 'work', exerciseId: exId, duration: workSec, round: r });
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

export function estimateProgramKcal(program, weightKg, skipWarmup, workSec = WORK_SEC, restSec = REST_SEC) {
  let kcal = skipWarmup ? 0 : kcalForSeconds(3.0, weightKg, WARM_SEC) + kcalForSeconds(3.0, weightKg, COOL_SEC);
  program.exercises.forEach(id => {
    const ex = EXERCISES[id];
    for (let r = 0; r < program.rounds; r++) {
      kcal += kcalForSeconds(ex.met, weightKg, workSec);
      kcal += kcalForSeconds(2.0, weightKg, restSec);
    }
  });
  return kcal;
}

export function totalSeqSeconds(program, skipWarmup, workSec = WORK_SEC, restSec = REST_SEC) {
  return buildSequence(program, skipWarmup, workSec, restSec).reduce((a, p) => a + p.duration, 0);
}
