/**
 * Re-export existing smoother for new ai/pose path (spec §6)
 * Low-latency One Euro per coordinate, pooled.
 */
export { LandmarkSmoother } from '../../engine/filters/LandmarkSmoother';
export { OneEuroFilter } from '../../engine/filters/OneEuroFilter';
