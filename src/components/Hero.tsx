import { useEffect, useState } from 'react';
import { scroller } from 'react-scroll';

const terminalLines = [
  '> initializing_porus.exe...',
  '> role: AI Automation & Full Stack SaaS Developer',
  '> status: available_for_work ✓',
  '> location: India 🇮🇳',
];

export default function Hero() {
  const [flickerDone, setFlickerDone] = useState(false);
  const [arrowHover, setArrowHover] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setFlickerDone(true), 600);
    return () => clearTimeout(timeout);
  }, []);

  const scrollTo = (section: string) => {
    scroller.scrollTo(section, { smooth: true, duration: 500, offset: -80 });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* CRT power-on flicker */}
      <div
        className={`pointer-events-none fixed inset-0 z-[999] bg-white transition-opacity duration-500 ${
          flickerDone ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          animation: flickerDone ? 'none' : 'crtFlicker 0.6s ease-out forwards',
        }}
      />

      <div className="max-w-4xl w-full">
        {/* Full-bleed terminal block with left pipe */}
        <div
          className="mb-12 pl-5 border-l-2 border-accent-green/60 font-code text-sm text-accent-green leading-relaxed"
          role="status"
          aria-live="polite"
          aria-label="Terminal output"
        >
          {terminalLines.map((line, i) => (
            <div key={i} className="whitespace-pre-wrap">
              {line}
            </div>
          ))}
        </div>

        <div className={flickerDone ? 'animate-fade-up' : 'opacity-0'}>
          <h1 className="font-display font-bold text-4xl md:text-6xl lg:text-7xl text-text-primary mb-6 leading-tight">
            Hi, I<span className="text-accent-green">'</span>m Porus.
          </h1>
          <p className="font-body text-lg md:text-xl text-text-muted mb-10 max-w-2xl leading-relaxed">
            I build AI systems that automate work and SaaS products that generate revenue.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10">
            <button
              onClick={() => scrollTo('projects')}
              onMouseEnter={() => setArrowHover(true)}
              onMouseLeave={() => setArrowHover(false)}
              className="group flex items-center gap-2 font-code font-medium text-base text-accent-green hover:text-accent-green/80 transition-colors focus:outline-none"
              aria-label="View Projects"
            >
              <span>[</span>
              <span>view projects</span>
              <span className="inline-block transition-transform duration-300" style={{ transform: arrowHover ? 'translateX(4px)' : 'translateX(0)' }}>
                →
              </span>
              <span>]</span>
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className="font-code text-sm text-text-muted hover:text-accent-green transition-colors focus:outline-none"
              aria-label="Let's Talk"
            >
              ~/contact
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes crtFlicker {
          0% { opacity: 1; }
          10% { opacity: 0.85; }
          20% { opacity: 1; }
          30% { opacity: 0.6; }
          40% { opacity: 1; }
          50% { opacity: 0.3; }
          60% { opacity: 0.9; }
          80% { opacity: 1; }
          90% { opacity: 0.7; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}