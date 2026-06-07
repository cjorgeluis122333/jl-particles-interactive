import { ReactNode, CSSProperties } from 'react';
import { BackgroundCanvas } from '../types/background';
export interface ParticleCanvasProps {
    children?: ReactNode;
    width?: string | number;
    height?: string | number;
    backgroundColor?: string;
    className?: string;
    style?: CSSProperties;
    background?: BackgroundCanvas;
}
export default function ParticleCanvas({ children, width, height, backgroundColor, className, style, background, }: ParticleCanvasProps): import("react/jsx-runtime").JSX.Element;
