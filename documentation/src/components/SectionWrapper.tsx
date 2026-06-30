import { type ReactNode } from 'react';

interface SectionWrapperProps {
  id: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export default function SectionWrapper({ id, title, subtitle, children }: SectionWrapperProps) {
  return (
    <section
      id={id}
      className="border-b border-white/5"
    >
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
          {subtitle && (
            <p className="text-white/50 text-base leading-relaxed">{subtitle}</p>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}
