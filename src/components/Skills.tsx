import { motion } from 'framer-motion';

const skillCategories = [
  {
    category: 'Languages',
    skills: ['Python', 'SQL', 'JavaScript', 'TypeScript'],
  },
  {
    category: 'Frontend',
    skills: ['React', 'Tailwind CSS', 'Streamlit'],
  },
  {
    category: 'Data & BI',
    skills: ['PowerBI', 'Tableau', 'Pandas'],
  },
  {
    category: 'AI / LLM',
    skills: ['LLM APIs', 'Prompt Engineering', 'RAG', 'LangChain'],
  },
  {
    category: 'Automation',
    skills: ['n8n', 'Zapier', 'Webhook Integrations'],
  },
  {
    category: 'Cloud & Infra',
    skills: ['AWS EC2', 'Docker', 'Nginx'],
  },
  {
    category: 'APIs & Backend',
    skills: ['FastAPI', 'Node.js', 'REST API Integration'],
  },
  {
    category: 'Databases',
    skills: ['Supabase', 'PostgreSQL'],
  },
];

export default function Skills() {
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
          // tech_stack
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {skillCategories.map((cat, catIndex) => (
            <div key={cat.category}>
              <div className="font-code text-[10px] uppercase tracking-[0.15em] text-text-muted mb-3">
                {'//'} {cat.category}
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skill}
                    className="font-code text-xs px-2.5 py-1.5 bg-bg-surface border border-accent-cyan/20 text-accent-cyan hover:border-accent-cyan hover:shadow-[0_0_10px_#00d4ff30] transition-all cursor-default animate-float"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.03 * (catIndex * 4 + skillIndex), duration: 0.2 }}
                    style={{ animationDelay: `${0.15 * (catIndex * 4 + skillIndex)}s` }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}