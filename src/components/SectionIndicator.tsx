import { useEffect, useState } from 'react';

const sections = [
  { id: 'hero', label: 'hero' },
  { id: 'about', label: 'about' },
  { id: 'skills', label: 'skills' },
  { id: 'projects', label: 'projects' },
  { id: 'contact', label: 'contact' },
];

export default function SectionIndicator() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach(({ id }, i) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveIndex(i);
          }
        },
        { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div className="fixed left-3 md:left-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-5">
      {/* Vertical line */}
      <div className="w-px h-24 bg-bg-border relative">
        <div
          className="absolute left-1/2 -translate-x-1/2 w-px bg-accent-green transition-all duration-500 ease-out"
          style={{ top: 0, height: `${((activeIndex) / (sections.length - 1)) * 100}%` }}
        />
      </div>

      {/* Section labels */}
      <div className="flex flex-col gap-4">
        {sections.map((section, i) => (
          <button
            key={section.id}
            onClick={() => {
              document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group flex items-center gap-2 text-left"
            aria-label={`Scroll to ${section.label}`}
          >
            <span
              className={`block w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                i === activeIndex ? 'bg-accent-green shadow-[0_0_6px_#00ff88]' : 'bg-bg-border'
              }`}
            />
            <span
              className={`font-code text-[10px] transition-all duration-300 ${
                i === activeIndex ? 'text-accent-green opacity-100' : 'text-text-muted opacity-0 group-hover:opacity-60'
              }`}
            >
              {section.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}