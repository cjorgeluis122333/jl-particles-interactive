import React, { ReactNode } from 'react';

interface ParticleCanvasProps {
  children?: ReactNode;
  width?: string | number;
  height?: string | number;
  backgroundColor?: string;
  className?: string;
}

export default function ParticleCanvas({ 
  children, 
  width = '100%',
  height = '60vh',
  backgroundColor = '#050505',
  className = "relative border border-white/10 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 ease-out" 
}: ParticleCanvasProps) {
  return (
    <div 
      className={className}
      style={{ width, height, backgroundColor }}
    >
      {children}
    </div>
  );
}
