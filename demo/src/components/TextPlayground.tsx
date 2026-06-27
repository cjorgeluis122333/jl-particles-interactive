import { useState, useEffect, useCallback } from 'react';
import {
  ParticleCanvas,
  TextParticleEngine,
} from 'jl-particle-interactive';
import type { ParticleShape, ClickMode, ColorMode } from 'jl-particle-interactive';
import { SINGLE_COLORS } from '../constants/colors';
import { COLOR_PALETTES } from '../constants/palettes';
import { DEFAULT_WORDS } from '../constants/words';

export default function TextPlayground() {
  const [text, setText] = useState('');
  const [colorMode, setColorMode] = useState<ColorMode>('single');
  const [particleColor, setParticleColor] = useState<string | string[]>(SINGLE_COLORS[0].value);
  const [particleShape, setParticleShape] = useState<ParticleShape>('circle');
  const [particleSize, setParticleSize] = useState(1);
  const [particleDensity, setParticleDensity] = useState(1);
  const [particleEase, setParticleEase] = useState(1);
  const [isMagnet, setIsMagnet] = useState(true);
  const [clickMode, setClickMode] = useState<ClickMode>('none');
  const [canvasBg, setCanvasBg] = useState('#050505');
  const [canvasWidth, setCanvasWidth] = useState(100);
  const [canvasHeight, setCanvasHeight] = useState(60);
  const [defaultWordIndex, setDefaultWordIndex] = useState(0);
  const [showDefaultWords, setShowDefaultWords] = useState(false);

  // Word carousel
  useEffect(() => {
    if (text !== '') {
      setShowDefaultWords(false);
      return;
    }
    const delay = setTimeout(() => setShowDefaultWords(true), 3000);
    return () => clearTimeout(delay);
  }, [text]);

  useEffect(() => {
    if (!showDefaultWords) return;
    const interval = setInterval(() => {
      setDefaultWordIndex((i) => (i + 1) % DEFAULT_WORDS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [showDefaultWords]);

  // Escape clears text
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setText('');
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const displayText = text || (showDefaultWords ? DEFAULT_WORDS[defaultWordIndex] : '');

  const cycleClickMode = useCallback(() => {
    setClickMode((prev) => {
      if (prev === 'none') return 'attract';
      if (prev === 'attract') return 'repel';
      return 'none';
    });
  }, []);

  const cycleShape = useCallback(() => {
    setParticleShape((prev) => {
      if (prev === 'circle') return 'square';
      if (prev === 'square') return 'bean';
      return 'circle';
    });
  }, []);

  return (
    <div className="fixed inset-0 bg-black flex flex-col">
      {/* Canvas area */}
      <div className="flex-1 flex items-center justify-center pb-[240px] pointer-events-none p-6">
        <div
          className="pointer-events-auto"
          style={{ width: `${canvasWidth}%`, height: `${canvasHeight}vh` }}
        >
          <ParticleCanvas
            width="100%"
            height="100%"
            backgroundColor={canvasBg}
          >
            <TextParticleEngine
              text={displayText}
              particleColor={particleColor}
              particleSize={particleSize}
              particleDensity={particleDensity}
              particleEase={particleEase}
              isMagnet={isMagnet}
              clickMode={clickMode}
              particleShape={particleShape}
              backgroundColor={canvasBg}
            />
          </ParticleCanvas>
        </div>
      </div>

      {/* Controls panel */}
      <div className="fixed bottom-0 left-0 right-0 p-4">
        <div className="max-w-5xl mx-auto bg-[#050505]/60 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex flex-col gap-3">

          {/* Row 1 — Colors & Interaction */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* Canvas BG picker */}
            <input
              type="color"
              value={canvasBg}
              onChange={(e) => setCanvasBg(e.target.value)}
              className="w-7 h-7 rounded cursor-pointer border border-white/20 bg-transparent shrink-0"
              title="Canvas background"
            />

            {/* Solid / Palette toggle */}
            <div className="flex bg-white/5 rounded-lg border border-white/10 overflow-hidden shrink-0">
              <button
                onClick={() => {
                  setColorMode('single');
                  setParticleColor(SINGLE_COLORS[0].value);
                }}
                className={`px-3 py-1 text-xs font-medium transition-colors ${
                  colorMode === 'single'
                    ? 'text-white bg-white/15'
                    : 'text-white/50 hover:text-white/80'
                }`}
              >
                Solid
              </button>
              <button
                onClick={() => {
                  setColorMode('palette');
                  setParticleColor(COLOR_PALETTES[0].value);
                }}
                className={`px-3 py-1 text-xs font-medium transition-colors ${
                  colorMode === 'palette'
                    ? 'text-white bg-white/15'
                    : 'text-white/50 hover:text-white/80'
                }`}
              >
                Palette
              </button>
            </div>

            {/* Color swatches */}
            <div className="flex gap-2 overflow-x-auto custom-scrollbar flex-1 min-w-0 py-1">
              {colorMode === 'single'
                ? SINGLE_COLORS.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setParticleColor(c.value)}
                      className={`w-6 h-6 rounded-full shrink-0 transition-all duration-200 ${c.bg} ${
                        particleColor === c.value
                          ? 'ring-[1.5px] ring-white ring-offset-[2px] ring-offset-[#050505] scale-110 shadow-lg shadow-white/20'
                          : 'opacity-40 hover:opacity-100 hover:scale-110'
                      }`}
                      title={c.name}
                    />
                  ))
                : COLOR_PALETTES.map((p) => (
                    <button
                      key={p.name}
                      onClick={() => setParticleColor(p.value)}
                      className={`w-6 h-6 rounded-full shrink-0 transition-all duration-200 ${p.bg} ${
                        JSON.stringify(particleColor) === JSON.stringify(p.value)
                          ? 'ring-[1.5px] ring-white ring-offset-[2px] ring-offset-[#050505] scale-110 shadow-lg shadow-white/20'
                          : 'opacity-40 hover:opacity-100 hover:scale-110'
                      }`}
                      title={p.name}
                    />
                  ))}
            </div>

            {/* Shape */}
            <button
              onClick={cycleShape}
              className="px-3 py-1 text-xs font-medium rounded-lg border border-white/20 text-white/70 hover:text-white hover:border-white/40 transition-colors shrink-0 capitalize"
            >
              {particleShape}
            </button>

            {/* Magnet */}
            <button
              onClick={() => setIsMagnet((v) => !v)}
              className={`px-3 py-1 text-xs font-medium rounded-lg border transition-colors shrink-0 ${
                isMagnet
                  ? 'border-white/40 text-white bg-white/10'
                  : 'border-white/20 text-white/50 hover:text-white/80'
              }`}
            >
              Magnet {isMagnet ? 'ON' : 'OFF'}
            </button>

            {/* Click mode */}
            <button
              onClick={cycleClickMode}
              className={`px-3 py-1 text-xs font-medium rounded-lg border transition-colors shrink-0 uppercase ${
                clickMode !== 'none'
                  ? 'border-white/40 text-white bg-white/10'
                  : 'border-white/20 text-white/50 hover:text-white/80'
              }`}
            >
              {clickMode === 'none' ? 'Click: None' : `Click: ${clickMode}`}
            </button>
          </div>

          {/* Row 2 — Sliders */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {/* Size */}
            <div className="flex flex-col gap-1">
              <div className="flex justify-between text-[10px] text-white/50">
                <span>Size</span>
                <span>{particleSize.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="3"
                step="0.1"
                value={particleSize}
                onChange={(e) => setParticleSize(Number(e.target.value))}
                className="w-full h-1 bg-white/20 rounded-lg appearance-none accent-white"
              />
            </div>

            {/* Density */}
            <div className="flex flex-col gap-1">
              <div className="flex justify-between text-[10px] text-white/50">
                <span>Density</span>
                <span>{particleDensity.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="3"
                step="0.1"
                value={particleDensity}
                onChange={(e) => setParticleDensity(Number(e.target.value))}
                className="w-full h-1 bg-white/20 rounded-lg appearance-none accent-white"
              />
            </div>

            {/* Speed */}
            <div className="flex flex-col gap-1">
              <div className="flex justify-between text-[10px] text-white/50">
                <span>Speed</span>
                <span>{particleEase.toFixed(2)}x</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="3"
                step="0.01"
                value={particleEase}
                onChange={(e) => setParticleEase(Number(e.target.value))}
                className="w-full h-1 bg-white/20 rounded-lg appearance-none accent-white"
              />
            </div>

            {/* Width */}
            <div className="flex flex-col gap-1">
              <div className="flex justify-between text-[10px] text-white/50">
                <span>Width</span>
                <span>{canvasWidth}%</span>
              </div>
              <input
                type="range"
                min="20"
                max="100"
                step="1"
                value={canvasWidth}
                onChange={(e) => setCanvasWidth(Number(e.target.value))}
                className="w-full h-1 bg-white/20 rounded-lg appearance-none accent-white"
              />
            </div>

            {/* Height */}
            <div className="flex flex-col gap-1">
              <div className="flex justify-between text-[10px] text-white/50">
                <span>Height</span>
                <span>{canvasHeight}vh</span>
              </div>
              <input
                type="range"
                min="20"
                max="100"
                step="1"
                value={canvasHeight}
                onChange={(e) => setCanvasHeight(Number(e.target.value))}
                className="w-full h-1 bg-white/20 rounded-lg appearance-none accent-white"
              />
            </div>
          </div>

          {/* Row 3 — Text input */}
          <div className="flex justify-center">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value.toUpperCase().slice(0, 40))}
              placeholder="ENTER TEXT"
              autoFocus
              className="w-full max-w-md bg-transparent border-b border-white/20 focus:border-white text-center text-white text-[20px] uppercase tracking-[0.2em] outline-none placeholder:text-white/20 transition-colors py-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
