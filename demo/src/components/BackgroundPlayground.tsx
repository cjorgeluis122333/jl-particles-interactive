import { useState, useMemo } from 'react';
import { ParticleBackground } from 'jl-particle-interactive';
import type {
  ParticleShape,
  ColorMode,
  BackgroundModeName,
  ParticleOrientation,
  BackgroundCanvas,
} from 'jl-particle-interactive';
import { SINGLE_COLORS } from '../constants/colors';
import { COLOR_PALETTES } from '../constants/palettes';

function rgbStringToHex(rgb: string): string {
  const parts = rgb.split(',').map((s) => parseInt(s.trim(), 10));
  if (parts.length !== 3 || parts.some(isNaN)) return '#ffffff';
  return '#' + parts.map((v) => v.toString(16).padStart(2, '0')).join('');
}

type Mode = Exclude<BackgroundModeName, 'NONE'>;

export default function BackgroundPlayground() {
  const [mode, setMode] = useState<Mode>('FOLLOW_POINTER');
  const [colorMode, setColorMode] = useState<ColorMode>('single');
  const [singleColorRgb, setSingleColorRgb] = useState(SINGLE_COLORS[0].value);
  const [paletteValue, setPaletteValue] = useState(COLOR_PALETTES[0].value);
  const [bgColor, setBgColor] = useState('#050505');
  const [density, setDensity] = useState(1);
  const [particleSpeed, setParticleSpeed] = useState(1);
  const [pointerTrackingSpeed, setPointerTrackingSpeed] = useState(0.06);
  const [particleColorMode, setParticleColorMode] = useState<'wave' | 'mixed'>('wave');
  const [orientation, setOrientation] = useState<ParticleOrientation>('vertical');
  const [shape, setShape] = useState<ParticleShape>('circle');

  const config = useMemo<Omit<BackgroundCanvas, 'name'>>(() => {
    const base = {
      density,
      particleSpeed,
      pointerTrackingSpeed,
      orientation,
      shape,
    };

    if (colorMode === 'single') {
      return { ...base, color: rgbStringToHex(singleColorRgb) };
    }
    return {
      ...base,
      colors: paletteValue.map(rgbStringToHex),
      colorMode: particleColorMode,
    };
  }, [
    colorMode,
    singleColorRgb,
    paletteValue,
    density,
    particleSpeed,
    pointerTrackingSpeed,
    particleColorMode,
    orientation,
    shape,
  ]);

  return (
    <div className="fixed inset-0" style={{ background: bgColor }}>
      {/* Full-screen background engine */}
      <div className="absolute inset-0">
        <ParticleBackground
          name={mode}
          config={config}
          width="100%"
          height="100%"
          backgroundColor={bgColor}
          style={{ borderRadius: 0, border: 'none', boxShadow: 'none' }}
        />
      </div>

      {/* Controls panel */}
      <div className="fixed bottom-0 left-0 right-0 p-4 z-10">
        <div className="max-w-5xl mx-auto bg-[#050505]/60 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex flex-col gap-3">

          {/* Row 1 — Mode, Colors */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* Mode buttons */}
            <div className="flex bg-white/5 rounded-lg border border-white/10 overflow-hidden shrink-0">
              {(['FOLLOW_POINTER', 'NET', 'JELLYFISH'] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`px-3 py-1 text-xs font-medium transition-colors ${
                    mode === m
                      ? 'text-white bg-white/15'
                      : 'text-white/50 hover:text-white/80'
                  }`}
                >
                  {m === 'FOLLOW_POINTER' ? 'Follow' : m === 'NET' ? 'Net' : 'Jellyfish'}
                </button>
              ))}
            </div>

            {/* Solid / Palette toggle */}
            <div className="flex bg-white/5 rounded-lg border border-white/10 overflow-hidden shrink-0">
              <button
                onClick={() => {
                  setColorMode('single');
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
                      onClick={() => setSingleColorRgb(c.value)}
                      className={`w-6 h-6 rounded-full shrink-0 transition-all duration-200 ${c.bg} ${
                        singleColorRgb === c.value
                          ? 'ring-[1.5px] ring-white ring-offset-[2px] ring-offset-[#050505] scale-110 shadow-lg shadow-white/20'
                          : 'opacity-40 hover:opacity-100 hover:scale-110'
                      }`}
                      title={c.name}
                    />
                  ))
                : COLOR_PALETTES.map((p) => (
                    <button
                      key={p.name}
                      onClick={() => setPaletteValue(p.value)}
                      className={`w-6 h-6 rounded-full shrink-0 transition-all duration-200 ${p.bg} ${
                        JSON.stringify(paletteValue) === JSON.stringify(p.value)
                          ? 'ring-[1.5px] ring-white ring-offset-[2px] ring-offset-[#050505] scale-110 shadow-lg shadow-white/20'
                          : 'opacity-40 hover:opacity-100 hover:scale-110'
                      }`}
                      title={p.name}
                    />
                  ))}
            </div>

            {/* Canvas BG picker */}
            <input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="w-7 h-7 rounded cursor-pointer border border-white/20 bg-transparent shrink-0"
              title="Canvas background"
            />
          </div>

          {/* Row 2 — Shape, Orientation, Color mode */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* Shape */}
            <div className="flex bg-white/5 rounded-lg border border-white/10 overflow-hidden shrink-0">
              {(['circle', 'square', 'bean'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setShape(s)}
                  className={`px-3 py-1 text-xs font-medium transition-colors capitalize ${
                    shape === s
                      ? 'text-white bg-white/15'
                      : 'text-white/50 hover:text-white/80'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Orientation (FOLLOW_POINTER only) */}
            {mode === 'FOLLOW_POINTER' && (
              <div className="flex bg-white/5 rounded-lg border border-white/10 overflow-hidden shrink-0">
                {(['vertical', 'horizontal', 'diagonal'] as const).map((o) => (
                  <button
                    key={o}
                    onClick={() => setOrientation(o)}
                    className={`px-3 py-1 text-xs font-medium transition-colors capitalize ${
                      orientation === o
                        ? 'text-white bg-white/15'
                        : 'text-white/50 hover:text-white/80'
                    }`}
                  >
                    {o}
                  </button>
                ))}
              </div>
            )}

            {/* Color mode toggle (palette only) */}
            {colorMode === 'palette' && (
              <div className="flex bg-white/5 rounded-lg border border-white/10 overflow-hidden shrink-0">
                {(['wave', 'mixed'] as const).map((cm) => (
                  <button
                    key={cm}
                    onClick={() => setParticleColorMode(cm)}
                    className={`px-3 py-1 text-xs font-medium transition-colors capitalize ${
                      particleColorMode === cm
                        ? 'text-white bg-white/15'
                        : 'text-white/50 hover:text-white/80'
                    }`}
                  >
                    {cm}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Row 3 — Sliders */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {/* Density */}
            <div className="flex flex-col gap-1">
              <div className="flex justify-between text-[10px] text-white/50">
                <span>Density</span>
                <span>{density.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="3"
                step="0.1"
                value={density}
                onChange={(e) => setDensity(Number(e.target.value))}
                className="w-full h-1 bg-white/20 rounded-lg appearance-none accent-white"
              />
            </div>

            {/* Speed */}
            <div className="flex flex-col gap-1">
              <div className="flex justify-between text-[10px] text-white/50">
                <span>Speed</span>
                <span>{particleSpeed.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="3"
                step="0.1"
                value={particleSpeed}
                onChange={(e) => setParticleSpeed(Number(e.target.value))}
                className="w-full h-1 bg-white/20 rounded-lg appearance-none accent-white"
              />
            </div>

            {/* Tracking speed */}
            <div className="flex flex-col gap-1">
              <div className="flex justify-between text-[10px] text-white/50">
                <span>Tracking</span>
                <span>{pointerTrackingSpeed.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.01"
                max="0.20"
                step="0.01"
                value={pointerTrackingSpeed}
                onChange={(e) => setPointerTrackingSpeed(Number(e.target.value))}
                className="w-full h-1 bg-white/20 rounded-lg appearance-none accent-white"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
