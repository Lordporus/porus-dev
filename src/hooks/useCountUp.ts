import { useState, useEffect, useRef } from 'react';

export function useCountUp(end: string, start: boolean, duration = 1500): string {
  const [value, setValue] = useState('0');
  const rafRef = useRef(0);

  useEffect(() => {
    if (!start) return;

    const match = end.match(/^(\d+)(.*)$/);
    if (!match) {
      setValue(end);
      return;
    }

    const target = parseInt(match[1], 10);
    const suffix = match[2];
    const startTime = performance.now();

    function animate(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(`${Math.floor(eased * target)}${suffix}`);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    }

    rafRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(rafRef.current);
  }, [end, duration, start]);

  return value;
}
