/**
 * Operator40 — AI Fitness Engine — Public barrel
 * Import from '@/engine' for types + engine.
 */
export * from './types';
export * from './math';
export * from './stateMachine';
export * from './FitnessEngine';
export * from './PoseLandmarkerManager';
export * from './filters/OneEuroFilter';
export * from './filters/LandmarkSmoother';
export * from './exercises/definitions';
export * from './coach/SpeechCoach';
export * from './overlay/poseConnections';

export { FitnessEngine as default } from './FitnessEngine';
