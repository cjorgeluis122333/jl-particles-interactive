import { ParticleShape } from '../types';

export type BackgroundModeName = 'NONE' | 'FOLLOW_POINTER' | 'NET' | 'JELLYFISH';
export type ParticleOrientation = 'vertical' | 'horizontal' | 'diagonal';

export interface BackgroundCanvas {
  name: BackgroundModeName;
  orientation?: ParticleOrientation;
  density?: number;
  color?: string;
  colors?: string[];
  colorMode?: 'wave' | 'mixed';
  interactionRadius?: number;
  lineDistance?: number;
  shape?: ParticleShape;
  particleSpeed?: number;
  pointerTrackingSpeed?: number;
}

