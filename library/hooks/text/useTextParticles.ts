import React, { useEffect, useRef } from 'react';
import { Particle } from '../../components/text/Particle';
import { getPixelsForText } from '../../utils/textSampling';

export function useTextParticles(
  text: string | string[],
  particlesRef: React.MutableRefObject<Particle[]>,
  containerRef: React.RefObject<HTMLElement | null>
) {
  const textRef = useRef<string | string[]>(text);

  useEffect(() => {
    textRef.current = text;
  }, [text]);

  const updateTextTargets = (char: string | string[], w?: number, h?: number) => {
    const width = w || containerRef.current?.offsetWidth || window.innerWidth;
    const height = h || containerRef.current?.offsetHeight || window.innerHeight;

    const isEmpty = Array.isArray(char) ? char.length === 0 || char.every(c => !c) : !char;

    if (isEmpty) {
      const padding = 50;
      particlesRef.current.forEach(p => {
        const targetX = padding + Math.random() * (width - padding * 2);
        const targetY = padding + Math.random() * (height - padding * 2);

        if (Math.abs(targetX - p.x) > 20 || Math.abs(targetY - p.y) > 20) {
          p.vx += (Math.random() - 0.5) * 20;
          p.vy += (Math.random() - 0.5) * 20;
        }

        p.targetX = targetX;
        p.targetY = targetY;
      });
      return;
    }

    const points = getPixelsForText(char, width, height);

    if (points.length === 0) return;

    const noiseFactor = width * 0.15;
    const ptsWithKeys = points.map(pt => ({ pt, key: pt.x + (Math.random() - 0.5) * noiseFactor }));
    ptsWithKeys.sort((a, b) => a.key - b.key);
    const sortedPoints = ptsWithKeys.map(k => k.pt);

    const indicesWithKeys = particlesRef.current.map((p, i) => ({ i, key: p.x + (Math.random() - 0.5) * noiseFactor }));
    indicesWithKeys.sort((a, b) => a.key - b.key);
    const sortedParticleIndices = indicesWithKeys.map(k => k.i);

    const chunkSize = Math.ceil(Math.sqrt(sortedParticleIndices.length));

    for (let i = 0; i < sortedParticleIndices.length; i += chunkSize) {
      const end = Math.min(i + chunkSize, sortedParticleIndices.length);
      const pIndicesChunk = sortedParticleIndices.slice(i, end);
      const ptsChunk: { x: number; y: number }[] = [];

      for (let j = i; j < end; j++) {
        const ptIndex = Math.floor((j / sortedParticleIndices.length) * sortedPoints.length);
        ptsChunk.push(sortedPoints[ptIndex]);
      }

      pIndicesChunk.sort((a, b) => particlesRef.current[a].y - particlesRef.current[b].y);
      ptsChunk.sort((a, b) => a.y - b.y);

      for (let j = 0; j < pIndicesChunk.length; j++) {
        const particleIndex = pIndicesChunk[j];
        const p = particlesRef.current[particleIndex];
        const pt = ptsChunk[j];

        const distanceX = pt.x - p.x;
        const distanceY = pt.y - p.y;

        if (Math.abs(distanceX) > 20 || Math.abs(distanceY) > 20) {
          p.vx += (Math.random() - 0.5) * 20;
          p.vy += (Math.random() - 0.5) * 20;
          const arcStrength = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 10 + 5);
          p.vx += Math.sign(distanceY) * arcStrength;
          p.vy -= Math.sign(distanceX) * arcStrength;
        }

        p.targetX = pt.x;
        p.targetY = pt.y;
      }
    }
  };

  return { getPixelsForText, updateTextTargets, textRef };
}
