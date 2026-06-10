// Components
export { default as ParticleCanvas } from './components/ParticleCanvas';
export type { ParticleCanvasProps } from './components/ParticleCanvas';

export { default as TextParticleEngine } from './components/text/TextParticleEngine';
export type { TextParticleEngineProps } from './components/text/TextParticleEngine';

export { default as BackgroundParticleEngine } from './components/background/BackgroundParticleEngine';
export type { BackgroundParticleEngineProps } from './components/background/BackgroundParticleEngine';

export { default as NetParticleEngine } from './components/background/NetParticleEngine';
export type { NetParticleEngineProps } from './components/background/NetParticleEngine';

export { default as JellyfishParticleEngine } from './components/background/JellyfishParticleEngine';
export type { JellyfishParticleEngineProps } from './components/background/JellyfishParticleEngine';

// Hooks
export { useParticleInteraction, getMagnetTarget } from './hooks/useParticleInteraction';
export type { ClickMode } from './hooks/useParticleInteraction';

export { useTextParticles } from './hooks/text/useTextParticles';

// Types
export type { ParticleShape, ColorMode } from './types';
export type { BackgroundModeName, BackgroundCanvas, ParticleOrientation } from './types/background';
