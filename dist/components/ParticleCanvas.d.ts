import { ReactNode, CSSProperties } from 'react';
export interface ParticleCanvasProps {
    children?: ReactNode;
    width?: string | number;
    height?: string | number;
    backgroundColor?: string;
    className?: string;
    style?: CSSProperties;
}
export default function ParticleCanvas({ children, width, height, backgroundColor, className, style, }: ParticleCanvasProps): import("react/jsx-runtime").JSX.Element;
