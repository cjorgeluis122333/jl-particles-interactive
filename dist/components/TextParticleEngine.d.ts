import { ClickMode } from '../hooks/useParticleInteraction';
import { ParticleShape } from '../types';
export interface TextParticleEngineProps {
    text: string;
    particleColor?: string | string[];
    particleSize?: number;
    particleDensity?: number;
    particleEase?: number;
    isMagnet?: boolean;
    clickMode?: ClickMode;
    particleShape?: ParticleShape;
    backgroundColor?: string;
}
export default function TextParticleEngine({ text, particleColor, particleSize, particleDensity, particleEase, isMagnet, clickMode, particleShape, backgroundColor }: TextParticleEngineProps): import("react/jsx-runtime").JSX.Element;
