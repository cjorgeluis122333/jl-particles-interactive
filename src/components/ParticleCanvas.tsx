import React, { ReactNode, CSSProperties } from 'react';
import { BackgroundCanvas } from '../types/background';
import BackgroundParticleEngine from './background/BackgroundParticleEngine';
import NetParticleEngine from './background/NetParticleEngine';
import JellyfishParticleEngine from './background/JellyfishParticleEngine';

export interface ParticleCanvasProps {
  children?: ReactNode;
  width?: string | number;
  height?: string | number;
  backgroundColor?: string;
  className?: string;
  style?: CSSProperties;
  background?: BackgroundCanvas;
}

const baseStyle: CSSProperties = {
  position: 'relative',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '1rem',
  overflow: 'hidden',
  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  transition: 'all 300ms ease-out',
};

export default function ParticleCanvas({
  children,
  width = '100%',
  height = '60vh',
  backgroundColor = '#050505',
  className = '',
  style,
  background = { name: 'NONE' },
}: ParticleCanvasProps) {
  return (
    <div
      className={className}
      style={{ ...baseStyle, width, height, backgroundColor, ...style }}
    >
      {background.name === 'FOLLOW_POINTER' && (
        <BackgroundParticleEngine config={background} backgroundColor={backgroundColor} />
      )}
      {background.name === 'NET' && (
        <NetParticleEngine config={background} backgroundColor={backgroundColor} />
      )}
      {background.name === 'JELLYFISH' && (
        <JellyfishParticleEngine config={background} backgroundColor={backgroundColor} />
      )}
      <div style={{ position: 'relative', zIndex: 10, width: '100%', height: '100%' }}>
        {children}
      </div>
    </div>
  );
}
