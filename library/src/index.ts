// Components
export { default as ParticleCanvas } from './components/ParticleCanvas';
export type { ParticleCanvasProps } from './components/ParticleCanvas';

export { default as TextParticleEngine } from './components/text/TextParticleEngine';
export type { TextParticleEngineProps } from './components/text/TextParticleEngine';

export { default as ParticleBackground } from './components/background/ParticleBackground';
export type { ParticleBackgroundProps } from './components/background/ParticleBackground';

// Hooks
export { useParticleInteraction, getMagnetTarget } from './hooks/useParticleInteraction';
export type { ClickMode } from './hooks/useParticleInteraction';

export { useTextParticles } from './hooks/text/useTextParticles';

// Types
export type { ParticleShape, ColorMode } from './types';
export type { BackgroundModeName, BackgroundCanvas, ParticleOrientation } from './types/background';
