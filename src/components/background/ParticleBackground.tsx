import React, { CSSProperties } from 'react';
import { BackgroundModeName, BackgroundCanvas } from '../../types/background';
import ParticleCanvas from '../ParticleCanvas';

export interface ParticleBackgroundProps {
  name?: BackgroundModeName;
  config?: Omit<BackgroundCanvas, 'name'>;
  width?: string | number;
  height?: string | number;
  backgroundColor?: string;
  className?: string;
  style?: CSSProperties;
}

export default function ParticleBackground({
  name = 'FOLLOW_POINTER',
  config,
  width = '100%',
  height = '60vh',
  backgroundColor = '#050505',
  className = '',
  style,
}: ParticleBackgroundProps) {
  const background: BackgroundCanvas = {
    name,
    shape: 'bean',
    orientation: 'vertical',
    ...config,
  };

  return (
    <ParticleCanvas
      width={width}
      height={height}
      backgroundColor={backgroundColor}
      className={className}
      style={style}
      background={background}
    />
  );
}
