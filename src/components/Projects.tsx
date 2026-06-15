import { motion } from 'framer-motion';
import type { Project } from '../data/projects';
import { projects } from '../data/projects';
import { TextScramble } from './ui/text-scramble';

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function Projects() {
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
          // projects
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          viewport={{ once: true, margin: '-100px' }}
        >
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const isPlaceholder = project.isPlaceholder;

  return (
    <motion.article
      variants={cardVariants}
      className={`bg-bg-surface border ${isPlaceholder ? 'border-dashed border-bg-border/50' : 'border-bg-border animate-border'} transition-colors overflow-hidden group`}
      style={{ transitionDelay: `${0.1 * index}s` }}
    >
      {/* Gradient image placeholder */}
      <div className={`h-40 bg-gradient-to-br ${project.gradient} flex items-center justify-center`}>
        {isPlaceholder ? (
          <span className="font-code text-3xl text-text-muted/20">[·]</span>
        ) : (
          <span className="font-code text-3xl text-white/10">{project.index}</span>
        )}
      </div>

      <div className="p-6">
        <div className="font-display font-bold text-accent-green text-sm mb-4">
          {project.index}
        </div>

        <div className="mb-4">
          <TextScramble text={project.title} className="font-display text-xl" />
        </div>

        <p className="text-text-muted text-base leading-relaxed mb-6 line-clamp-3">
          {project.description}
        </p>

        {!isPlaceholder && project.techStack.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="font-code text-xs px-2 py-1 bg-bg-base border border-bg-border text-accent-cyan/80"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {!isPlaceholder && (
          <div className="flex gap-3 pt-4 border-t border-bg-border">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center py-2 px-4 border border-accent-green text-accent-green font-code text-sm hover:bg-accent-green hover:text-bg-base transition-all"
              aria-label={`View ${project.title} live`}
            >
              [Live ↗]
            </a>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center py-2 px-4 border border-accent-cyan text-accent-cyan font-code text-sm hover:bg-accent-cyan hover:text-bg-base transition-all"
              aria-label={`View ${project.title} on GitHub`}
            >
              [GitHub ↗]
            </a>
          </div>
        )}

        {isPlaceholder && (
          <div className="text-center py-4 text-text-muted font-code text-sm">
            {' > Coming Soon'}
          </div>
        )}
      </div>
    </motion.article>
  );
}