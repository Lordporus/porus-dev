import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useCountUp } from '../hooks/useCountUp';

const stats = [
  { value: '3+', label: 'Products Shipped' },
  { value: '5+', label: 'AI Agents Deployed' },
  { value: '10+', label: 'Automation Workflows Built' },
  { value: '\u221E', label: 'Bugs Fixed at 2 AM' },
];

const asciiArt = [
  '  ┌─────────────────┐',
  '  │  \\\\             │',
  '  │   \\\\  █  █     │',
  '  │    █──────█    │',
  '  │   ╱    █    ╲   │',
  '  │  ╱           ╲  │',
  '  └─────────────────┘',
];

export default function About() {
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: '-100px' });

  return (
    <section className="py-20 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="font-display font-bold text-2xl md:text-3xl text-accent-green mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.3 }}
        >
          // about_me
        </motion.h2>

        <div className="grid md:grid-cols-5 gap-12 lg:gap-16 items-center">
          <motion.div
            className="md:col-span-3 space-y-5 text-text-primary leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <p>
              I'm an AI Automation & Full Stack SaaS Developer based in India,
              building systems that cut manual work and scale revenue.
            </p>
            <p>
              My work spans intelligent automation workflows, production-grade
              AI assistants, and data SaaS products — all built to generate
              real business value, not just demos.
            </p>
            <p>
              When I'm not shipping products, I'm automating pipelines on AWS,
              scraping signals, and pushing agentic workflows to their limits.
            </p>

            {/* Inline stats */}
            <div ref={statsRef} className="flex flex-wrap gap-x-8 gap-y-2 pt-4">
              {stats.map((stat) => (
                <AnimatedStat key={stat.label} stat={stat} start={statsInView} />
              ))}
            </div>
          </motion.div>

          <motion.div
            className="md:col-span-2 flex justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <pre className="font-code text-[10px] md:text-xs leading-relaxed text-text-muted/60 select-none">
              {asciiArt.map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </pre>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function AnimatedStat({ stat, start }: { stat: { value: string; label: string }; start: boolean }) {
  const displayValue = useCountUp(stat.value, start);
  return (
    <span className="inline-flex items-baseline gap-1.5">
      <span className="font-display font-bold text-sm text-accent-green">[{displayValue}]</span>
      <span className="font-code text-xs text-text-muted">{stat.label}</span>
    </span>
  );
}
