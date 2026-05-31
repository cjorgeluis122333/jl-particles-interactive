import { default as React } from 'react';
import { Particle } from '../components/Particle';
declare function getPixelsForText(text: string, width: number, height: number): {
    x: number;
    y: number;
}[];
export declare function useTextParticles(text: string, particlesRef: React.MutableRefObject<Particle[]>, containerRef: React.RefObject<HTMLElement | null>): {
    getPixelsForText: typeof getPixelsForText;
    updateTextTargets: (char: string, w?: number, h?: number) => void;
    textRef: React.RefObject<string>;
};
export {};
