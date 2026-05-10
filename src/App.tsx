import { useState, useEffect } from 'react';
import ParticleCanvas from './components/ParticleCanvas';
import TextParticleEngine from './components/TextParticleEngine';
import VisionParticleEngine from './components/VisionParticleEngine';
import { useCamera } from './hooks/useCamera';
import { useHandTracking } from './hooks/useHandTracking';
import { useFaceTracking } from './hooks/useFaceTracking';
import { SINGLE_COLORS } from './constants/colors';
import { COLOR_PALETTES } from './constants/palettes';

export type TrackingMode = 'text' | 'hands' | 'face';
export type ColorMode = 'single' | 'palette';

export default function App() {
  const [text, setText] = useState<string>('');
  const [mode, setMode] = useState<TrackingMode>('text');
  const [colorMode, setColorMode] = useState<ColorMode>('single');
  const [particleColor, setParticleColor] = useState<string | string[]>(SINGLE_COLORS[0].value);
  const [particleSize, setParticleSize] = useState<number>(1);

  const isCameraMode = mode !== 'text';
  const { videoRef, cameraError } = useCamera(isCameraMode);

  const { handLandmarks, handIsInitializing, handError } = useHandTracking(videoRef, mode === 'hands');
  const { faceLandmarks, faceIsInitializing, faceError } = useFaceTracking(videoRef, mode === 'face');

  const error = cameraError || handError || faceError;
  const isInitializing = handIsInitializing || faceIsInitializing;

  // Manejo de teclado para cambiar texto y modos
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setText('');
        return;
      }

      if (e.key === 'Tab') {
         e.preventDefault();
         setMode(prev => prev === 'text' ? 'hands' : prev === 'hands' ? 'face' : 'text');
         setText('');
         return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mode]);

  return (
    <div className="relative w-full h-[100dvh] bg-black overflow-hidden flex flex-col items-center justify-center p-6 gap-8">

      {/* Contenedor genérico para las partículas (limita alto, ancho y fondo) */}
      <ParticleCanvas>
        {mode === 'text' ? (
          <TextParticleEngine text={text} particleColor={particleColor} particleSize={particleSize} />
        ) : (
          <VisionParticleEngine handLandmarks={handLandmarks} faceLandmarks={faceLandmarks} particleColor={particleColor} particleSize={particleSize} />
        )}

        {isCameraMode && (
          <video
            ref={videoRef}
            className="absolute top-0 left-0 w-[1px] h-[1px] opacity-0 pointer-events-none"
            playsInline
            muted
            autoPlay
          />
        )}
      </ParticleCanvas>

      {/* Controles interactivos fuera del contenedor */}
      <div className="relative w-full max-w-[1000px] flex flex-col items-center gap-6 text-white">

        {/* Selector de Modos */}
        <div className="flex gap-3">
          <button
            className={`px-4 py-2 text-[10px] uppercase font-sans tracking-widest border rounded-md transition-all ${mode === 'text' ? 'border-white text-white bg-white/5' : 'border-white/20 text-white/50 hover:bg-white/5 hover:text-white/80'}`}
            onClick={() => setMode('text')}
          >
            Text Mode
          </button>
          <button
            className={`px-4 py-2 text-[10px] uppercase font-sans tracking-widest border rounded-md transition-all ${mode === 'hands' ? 'border-white text-white bg-white/5' : 'border-white/20 text-white/50 hover:bg-white/5 hover:text-white/80'}`}
            onClick={() => {
              setMode('hands');
              setText('');
            }}
          >
            Hands Mode
          </button>
          <button
            className={`px-4 py-2 text-[10px] uppercase font-sans tracking-widest border rounded-md transition-all ${mode === 'face' ? 'border-white text-white bg-white/5' : 'border-white/20 text-white/50 hover:bg-white/5 hover:text-white/80'}`}
            onClick={() => {
              setMode('face');
              setText('');
            }}
          >
            Face Mode
          </button>
        </div>

        {/* Selector de Colores */}
        <div className="flex flex-col items-center gap-3 w-full">
          <div className="flex gap-2">
            <button
              className={`px-3 py-1 text-[9px] uppercase font-sans tracking-widest border rounded transition-all ${colorMode === 'single' ? 'border-white text-white bg-white/10' : 'border-white/20 text-white/50 hover:bg-white/5'}`}
              onClick={() => setColorMode('single')}
            >
              Solid Colors
            </button>
            <button
              className={`px-3 py-1 text-[9px] uppercase font-sans tracking-widest border rounded transition-all ${colorMode === 'palette' ? 'border-white text-white bg-white/10' : 'border-white/20 text-white/50 hover:bg-white/5'}`}
              onClick={() => setColorMode('palette')}
            >
              Color Palettes
            </button>
          </div>

          <div className="w-full max-w-[500px] overflow-x-auto pb-2 custom-scrollbar">
            <div className="flex gap-2 justify-center min-w-max px-2">
              {colorMode === 'single' ? (
                SINGLE_COLORS.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setParticleColor(c.value)}
                    className={`shrink-0 w-5 h-5 rounded-full transition-all ${c.bg} ${particleColor === c.value ? 'ring-[1.5px] ring-white ring-offset-1 ring-offset-black scale-110 shadow-lg shadow-white/20' : 'opacity-40 hover:opacity-100 hover:scale-105'}`}
                    title={c.name}
                  />
                ))
              ) : (
                COLOR_PALETTES.map((p) => (
                  <button
                    key={p.name}
                    onClick={() => setParticleColor(p.value)}
                    className={`shrink-0 w-8 h-5 rounded-full transition-all ${p.bg} ${JSON.stringify(particleColor) === JSON.stringify(p.value) ? 'ring-[1.5px] ring-white ring-offset-1 ring-offset-black scale-110 shadow-lg shadow-white/20' : 'opacity-40 hover:opacity-100 hover:scale-105'}`}
                    title={p.name}
                  />
                ))
              )}
            </div>
          </div>
        </div>

        {/* Selector de Tamaño */}
        <div className="w-full max-w-[200px] flex flex-col items-center gap-2 mt-2">
          <label className="text-[9px] uppercase font-sans tracking-widest text-white/50">
            Particle Size: {particleSize.toFixed(1)}x
          </label>
          <input
            type="range"
            min="0.5"
            max="3.0"
            step="0.1"
            value={particleSize}
            onChange={(e) => setParticleSize(parseFloat(e.target.value))}
            className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-white"
          />
        </div>
        {/*Enter your text*/}
        <div className="h-[60px] w-full max-w-[400px] flex items-center justify-center">
          {mode === 'text' ? (
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="ENTER TEXT"
              className="w-full bg-transparent border-b border-white/20 text-center text-[#ffffff] font-sans text-[24px] uppercase tracking-[0.2em] py-2 outline-none focus:border-white transition-colors placeholder:text-white/20"
              maxLength={12}
              autoFocus
            />
          ) : (
            <div className="text-center font-sans tracking-[0.2em] uppercase text-[12px]">
              {error ? (
                <span className="text-red-400">Sensor Error. Check permissions.</span>
              ) : isInitializing ? (
                <span className="text-white/50">Initializing Neural Sensor...</span>
              ) : (
                <span className="text-white/70">Move {mode === 'hands' ? 'hands' : 'face'} inside camera view</span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
