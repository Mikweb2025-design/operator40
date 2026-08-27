import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { getAnalyzer } from '../src/ai/exercises/ExerciseRegistry';
import { evaluatePoseQuality } from '../src/ai/pose/PoseQuality';

describe('fixtures', () => {
  const fixturesDir = join(__dirname, 'fixtures');
  const files = readdirSync(fixturesDir).filter((f) => f.endsWith('.json'));
  for (const file of files) {
    it(`loads and processes ${file} without crash`, () => {
      const raw = JSON.parse(readFileSync(join(fixturesDir, file), 'utf8'));
      const exercise = (
        raw.exercise || file.replace('.json', '').replace('-front', '').replace('-side', '')
      ).toLowerCase();
      const analyzer = getAnalyzer(exercise);
      expect(analyzer, `analyzer for ${exercise} from ${file}`).toBeTruthy();
      if (!raw.frames || !analyzer) return;
      let lastT = raw.frames[0]?.t ?? 0;
      for (const frame of raw.frames.slice(0, 20)) {
        if (!frame.landmarks) continue;
        const dt = frame.t - lastT || 16;
        lastT = frame.t;
        const q = evaluatePoseQuality(frame.landmarks, analyzer.requiredLandmarks);
        const res = analyzer.analyze(frame.landmarks, frame.t, dt, q);
        expect(res).toHaveProperty('phase');
        expect(res).toHaveProperty('repIncrement');
      }
    });
  }
});
