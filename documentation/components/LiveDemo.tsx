import { useEffect, useRef, useState, type ReactNode } from 'react';

interface LiveDemoProps {
  children: ReactNode;
  height?: string;
  label?: string;
}

export default function LiveDemo({ children, height = '280px', label = 'Live Preview' }: LiveDemoProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  // Mount canvas when visible, unmount when scrolled away
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="mt-5">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[11px] font-semibold uppercase tracking-widest text-white/25">
          {label}
        </span>
        <div className="flex-1 h-px bg-white/8" />
        <span className="text-[10px] text-white/20 italic">hover &amp; click to interact</span>
      </div>

      <div
        ref={ref}
        style={{ height }}
        className="rounded-xl overflow-hidden border border-white/10 bg-[#050505]"
      >
        {inView ? children : null}
      </div>
    </div>
  );
}
