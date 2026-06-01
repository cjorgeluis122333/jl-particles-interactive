import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';
import ExampleShell from './_ExampleShell';

const EXAMPLE_CODE = `import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';

export default function HeroSection() {
  return (
    <section style={{ width: '100%', padding: '4rem 0' }}>
      <ParticleCanvas height="80vh" style={{ borderRadius: 0 }}>
        <TextParticleEngine
          text="BIENVENIDO"
          particleColor={['255, 255, 255', '200, 200, 200', '150, 200, 255']}
          particleSize={1.3}
          particleDensity={1.2}
          particleEase={1.5}
          clickMode="repel"
        />
      </ParticleCanvas>
    </section>
  );
}`;

export default function Example11HeroSection() {
  return (
    <ExampleShell
      number={11}
      title="Animación de Título Hero"
      description="Sección hero de página completa con texto grande, múltiples colores y efecto de repulsión al hacer clic."
      code={EXAMPLE_CODE}
      height="80vh"
    >
      <ParticleCanvas height="100%" style={{ borderRadius: 0 }}>
        <TextParticleEngine
          text="BIENVENIDO"
          particleColor={['255, 255, 255', '200, 200, 200', '150, 200, 255']}
          particleSize={1.3}
          particleDensity={1.2}
          particleEase={1.5}
          clickMode="repel"
        />
      </ParticleCanvas>
    </ExampleShell>
  );
}
