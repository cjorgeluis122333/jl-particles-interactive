import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';
import type { ClickMode, ParticleShape, ColorMode } from 'jl-particle-interactive';
import { BookOpen } from 'lucide-react';
import { SINGLE_COLORS } from '../../constants/colors';
import { COLOR_PALETTES } from '../../constants/palettes';
import { DEFAULT_WORDS } from '../../constants/words';

export default function PlaygroundPage() {
    const [text, setText] = useState<string>('');
    const [colorMode, setColorMode] = useState<ColorMode>('single');
    const [particleColor, setParticleColor] = useState<string | string[]>(SINGLE_COLORS[0].value);
    const [particleShape, setParticleShape] = useState<ParticleShape>('circle');
    const [particleSize, setParticleSize] = useState<number>(1);
    const [particleDensity, setParticleDensity] = useState<number>(1);
    const [particleEase, setParticleEase] = useState<number>(1);
    const [isMagnet, setIsMagnet] = useState<boolean>(true);
    const [clickMode, setClickMode] = useState<ClickMode>('none');
    const [canvasBg, setCanvasBg] = useState<string>('#050505');
    const [canvasWidth, setCanvasWidth] = useState<number>(100);
    const [canvasHeight, setCanvasHeight] = useState<number>(60);
    const [defaultWordIndex, setDefaultWordIndex] = useState(0);
    const [showDefaultWords, setShowDefaultWords] = useState(false);

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        let interval: NodeJS.Timeout;

        if (text === '') {
            setShowDefaultWords(false);
            timeout = setTimeout(() => {
                setShowDefaultWords(true);
                interval = setInterval(() => {
                    setDefaultWordIndex((prev) => (prev + 1) % DEFAULT_WORDS.length);
                }, 4000);
            }, 3000);
        } else {
            setShowDefaultWords(false);
        }

        return () => {
            clearTimeout(timeout);
            clearInterval(interval);
        };
    }, [text]);

    const displayText = text !== '' ? text : (showDefaultWords ? DEFAULT_WORDS[defaultWordIndex] : '');

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setText('');
                return;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <div className="fixed inset-0 bg-black overflow-hidden flex flex-col items-center justify-center transition-colors duration-500">

            {/* Documentation Button - Top Right */}
            <Link
                to="/docs"
                className="absolute top-6 right-6 z-40 flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 text-white text-sm font-sans tracking-widest uppercase transition-all duration-200 group"
                title="View documentation"
            >
                <BookOpen size={18} className="group-hover:scale-110 transition-transform" />
                <span className="hidden sm:inline">Docs</span>
            </Link>

            {/* Contenedor genérico para las partículas (limita alto, ancho y fondo) */}
            <div className="absolute inset-0 flex items-center justify-center p-6 pb-[240px] pointer-events-none">
                <div className="pointer-events-auto w-full h-full flex items-center justify-center">
                    <ParticleCanvas width={`${canvasWidth}%`} height={`${canvasHeight}vh`} backgroundColor={canvasBg}>
                        <TextParticleEngine text={displayText} particleColor={particleColor} particleSize={particleSize} particleDensity={particleDensity} particleEase={particleEase} isMagnet={isMagnet} clickMode={clickMode} particleShape={particleShape} backgroundColor={canvasBg} />
                    </ParticleCanvas>
                </div>
            </div>

            {/* Controles interactivos flotantes */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-[900px] bg-[#050505]/60 backdrop-blur-xl border border-white/10 rounded-2xl p-5 flex flex-col gap-5 text-white shadow-2xl z-30">

                {/* Fila 1: Colores e Interacciones */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">

                    {/* Selector de Colores */}
                    <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                        <div className="flex items-center gap-2 mr-2">
                            <input
                                type="color"
                                value={canvasBg}
                                onChange={(e) => setCanvasBg(e.target.value)}
                                className="w-7 h-7 rounded-lg cursor-pointer bg-white/5 border border-white/10 p-1 hover:bg-white/10 transition-all shadow-inner"
                                title="Canvas Background Color"
                            />
                        </div>
                        <div className="flex gap-1 bg-white/5 rounded-lg p-1 border border-white/5 shrink-0">
                            <button
                                className={`px-3 py-1 text-[8px] uppercase font-sans tracking-widest rounded transition-all ${colorMode === 'single' ? 'text-white bg-white/10' : 'text-white/50 hover:text-white/80'}`}
                                onClick={() => setColorMode('single')}
                            >
                                Solid
                            </button>
                            <button
                                className={`px-3 py-1 text-[8px] uppercase font-sans tracking-widest rounded transition-all ${colorMode === 'palette' ? 'text-white bg-white/10' : 'text-white/50 hover:text-white/80'}`}
                                onClick={() => setColorMode('palette')}
                            >
                                Palette
                            </button>
                        </div>

                        <div className="w-full sm:w-[220px] md:w-[300px] overflow-x-auto custom-scrollbar flex items-center h-[30px]">
                            <div className="flex gap-2 min-w-max px-1 items-center">
                                {colorMode === 'single' ? (
                                    SINGLE_COLORS.map((c) => (
                                        <button
                                            key={c.name}
                                            onClick={() => setParticleColor(c.value)}
                                            className={`shrink-0 w-4 h-4 rounded-full transition-all ${c.bg} ${particleColor === c.value ? 'ring-[1.5px] ring-white ring-offset-[2px] ring-offset-[#050505] scale-110 shadow-lg shadow-white/20' : 'opacity-40 hover:opacity-100 hover:scale-110'}`}
                                            title={c.name}
                                        />
                                    ))
                                ) : (
                                    COLOR_PALETTES.map((p) => (
                                        <button
                                            key={p.name}
                                            onClick={() => setParticleColor(p.value)}
                                            className={`shrink-0 w-6 h-4 rounded-full transition-all ${p.bg} ${JSON.stringify(particleColor) === JSON.stringify(p.value) ? 'ring-[1.5px] ring-white ring-offset-[2px] ring-offset-[#050505] scale-110 shadow-lg shadow-white/20' : 'opacity-40 hover:opacity-100 hover:scale-110'}`}
                                            title={p.name}
                                        />
                                    ))
                                )}
                            </div>
                        </div>

                        <div className="flex gap-2 ml-auto md:ml-2">
                            <button
                                className={`px-3 py-1.5 text-[8px] uppercase font-sans tracking-widest rounded border transition-all ${particleShape === 'square' ? 'border-white text-white bg-white/10 shadow-sm' : 'border-white/20 text-white/50 hover:text-white/80'}`}
                                onClick={() => setParticleShape(particleShape === 'circle' ? 'square' : 'circle')}
                                title="Squares perform better (lighter)"
                            >
                                Shape: {particleShape === 'circle' ? 'Circle' : 'Square (Lighter)'}
                            </button>

                            <button
                                className={`px-3 py-1.5 text-[8px] uppercase font-sans tracking-widest rounded border transition-all ${isMagnet ? 'border-white text-white bg-white/10 shadow-sm' : 'border-white/20 text-white/50 hover:text-white/80'}`}
                                onClick={() => setIsMagnet(!isMagnet)}
                            >
                                Magnet: {isMagnet ? 'ON' : 'OFF'}
                            </button>

                            <button
                                className={`px-3 py-1.5 text-[8px] uppercase font-sans tracking-widest rounded border transition-all ${clickMode !== 'none' ? 'border-white text-white bg-white/10 shadow-sm' : 'border-white/20 text-white/50 hover:text-white/80'}`}
                                onClick={() => {
                                    if (clickMode === 'none') setClickMode('attract');
                                    else if (clickMode === 'attract') setClickMode('repel');
                                    else setClickMode('none');
                                }}
                            >
                                Click: {clickMode.toUpperCase()}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Fila 2: Sliders Container */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 mt-1 border-t border-white/5 pt-4">
                    {/* Selector de Tamaño */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[8px] uppercase font-sans tracking-widest text-white/50 flex justify-between">
                            <span>Size</span>
                            <span>{particleSize.toFixed(1)}x</span>
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

                    {/* Selector de Densidad */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[8px] uppercase font-sans tracking-widest text-white/50 flex justify-between">
                            <span>Density</span>
                            <span>{particleDensity.toFixed(1)}x</span>
                        </label>
                        <input
                            type="range"
                            min="0.1"
                            max="3.0"
                            step="0.1"
                            value={particleDensity}
                            onChange={(e) => setParticleDensity(parseFloat(e.target.value))}
                            className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-white"
                        />
                    </div>

                    {/* Selector de Fluidez */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[8px] uppercase font-sans tracking-widest text-white/50 flex justify-between">
                            <span>Speed</span>
                            <span>{particleEase.toFixed(2)}x</span>
                        </label>
                        <input
                            type="range"
                            min="0.1"
                            max="3.0"
                            step="0.1"
                            value={particleEase}
                            onChange={(e) => setParticleEase(parseFloat(e.target.value))}
                            className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-white"
                        />
                    </div>

                    {/* Selector de Width */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[8px] uppercase font-sans tracking-widest text-white/50 flex justify-between">
                            <span>Width</span>
                            <span>{canvasWidth}%</span>
                        </label>
                        <input
                            type="range"
                            min="20"
                            max="100"
                            step="1"
                            value={canvasWidth}
                            onChange={(e) => setCanvasWidth(parseInt(e.target.value))}
                            className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-white"
                        />
                    </div>

                    {/* Selector de Height */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[8px] uppercase font-sans tracking-widest text-white/50 flex justify-between">
                            <span>Height</span>
                            <span>{canvasHeight}vh</span>
                        </label>
                        <input
                            type="range"
                            min="20"
                            max="100"
                            step="1"
                            value={canvasHeight}
                            onChange={(e) => setCanvasHeight(parseInt(e.target.value))}
                            className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-white"
                        />
                    </div>
                </div>

                {/* Fila 3: Entrada */}
                <div className="h-[40px] w-full flex items-center justify-center border-t border-white/5 pt-4 mt-1 pb-2 relative">
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onBlur={() => window.scrollTo(0, 0)}
                        placeholder="ENTER TEXT"
                        className="w-full max-w-[400px] bg-transparent border-b border-white/20 text-center text-[#ffffff] font-sans text-[20px] uppercase tracking-[0.2em] py-1 outline-none focus:border-white transition-colors placeholder:text-white/20"
                        maxLength={40}
                        autoFocus
                    />
                </div>
            </div>
        </div>
    );
}
