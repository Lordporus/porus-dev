import { useEffect, useState } from 'react';

export default function CursorGlow() {
  const [pos, setPos] = useState({ x: -200, y: -200 });

  useEffect(() => {
    const handleMove = (e: PointerEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('pointermove', handleMove);
    return () => window.removeEventListener('pointermove', handleMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-30" aria-hidden="true">
      <div
        className="absolute rounded-full blur-3xl"
        style={{
          width: 400,
          height: 400,
          transform: `translate(${pos.x - 200}px, ${pos.y - 200}px)`,
          background:
            'radial-gradient(circle, rgba(0, 255, 136, 0.35) 0%, rgba(0, 212, 255, 0.08) 40%, transparent 70%)',
          transition: 'transform 0.08s ease-out',
        }}
      />
    </div>
  );
}
