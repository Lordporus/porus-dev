import { motion } from 'framer-motion';
import { Mail, Briefcase, MessageCircle, ArrowUpRight, Code2, UserCheck } from 'lucide-react';

const contacts = [
  { label: 'Email', value: 'buildporus@gmail.com', href: 'mailto:buildporus@gmail.com', icon: Mail },
  { label: 'GitHub', value: 'github.com/Lordporus', href: 'https://github.com/Lordporus', icon: Code2 },
  { label: 'Fiverr', value: 'porusautomation', href: 'https://www.fiverr.com/sellers/porusautomation/', icon: Briefcase },
  { label: 'LinkedIn', value: 'Purushottam Kumar', href: 'https://linkedin.com/in/purushottam-kumar-773a59219', icon: UserCheck },
  { label: 'WhatsApp', value: '+91 8527413901', href: 'https://wa.me/918527413901', icon: MessageCircle },
];

export default function Contact() {
  return (
    <section
      className="relative pt-40 pb-40 overflow-hidden"
      style={{
        maskImage: 'linear-gradient(90deg, transparent, black 55%, black 60%, transparent)',
        WebkitMaskImage: 'linear-gradient(90deg, transparent, black 55%, black 60%, transparent)',
      }}
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute -left-40 top-10 h-[70vh] w-[60vh] rounded-full blur-3xl opacity-15"
          style={{ background: 'radial-gradient(closest-side, rgba(0, 255, 136, 0.15), transparent)' }}
        />
        <div
          className="absolute -right-40 bottom-10 h-[50vh] w-[50vh] rounded-full blur-3xl opacity-10"
          style={{ background: 'radial-gradient(closest-side, rgba(0, 212, 255, 0.12), transparent)' }}
        />
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 opacity-20 w-[60%] h-8"
          style={{ background: 'radial-gradient(ellipse 80% 100% at 50% 100%, rgba(0, 255, 136, 0.3) 0%, transparent 70%)' }}
        />
        <div className="h-px bg-bg-border w-full" />
      </div>

      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center">
          <motion.span
            className="inline-flex items-center gap-2 border border-accent-green/20 bg-bg-surface px-4 py-2 font-code text-xs text-accent-green"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
          >
            <Mail className="h-3.5 w-3.5" />
            Let's Work Together
          </motion.span>

          <motion.h2
            className="mt-6 font-display font-bold text-4xl sm:text-6xl tracking-tight text-text-primary"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            Ready to <span className="italic font-body text-text-muted">build?</span>
          </motion.h2>

          <motion.p
            className="mt-4 font-code text-sm text-text-muted max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.15 }}
          >
            {' > Open for freelance projects, automation contracts, and SaaS collabs.'}
          </motion.p>

          {/* Availability badge */}
          <motion.div
            className="inline-flex items-center gap-2 mt-4 border border-accent-green/20 bg-bg-surface px-3 py-1.5"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <span className="w-1.5 h-1.5 bg-accent-green rounded-full animate-blink" />
            <span className="font-code text-[10px] text-accent-green uppercase tracking-widest">
              Available for Work
            </span>
          </motion.div>
        </div>

        <div className="mt-16 grid md:grid-cols-2 gap-6">
          {/* Contact cards — left column */}
          <div className="space-y-6">
            {contacts.slice(0, 3).map((contact, i) => (
              <motion.a
                key={contact.label}
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center gap-5 border border-bg-border bg-bg-surface/80 p-6 hover:border-accent-green/40 transition-all"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 * i }}
              >
                <div className="h-12 w-12 flex items-center justify-center border border-bg-border bg-bg-base">
                  <contact.icon className="h-5 w-5 text-accent-green" />
                </div>
                <div className="flex-1">
                  <div className="font-code text-[10px] uppercase tracking-widest text-text-muted">
                    {contact.label}
                  </div>
                  <div className="font-code text-sm text-text-primary group-hover:text-accent-green transition-colors mt-0.5">
                    {contact.value}
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-text-muted group-hover:text-accent-green group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </motion.a>
            ))}
          </div>

          {/* Contact cards — right column */}
          <div className="space-y-6">
            {contacts.slice(3).map((contact, i) => (
              <motion.a
                key={contact.label}
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center gap-5 border border-bg-border bg-bg-surface/80 p-6 hover:border-accent-green/40 transition-all"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 * i }}
              >
                <div className="h-12 w-12 flex items-center justify-center border border-bg-border bg-bg-base">
                  <contact.icon className="h-5 w-5 text-accent-green" />
                </div>
                <div className="flex-1">
                  <div className="font-code text-[10px] uppercase tracking-widest text-text-muted">
                    {contact.label}
                  </div>
                  <div className="font-code text-sm text-text-primary group-hover:text-accent-green transition-colors mt-0.5">
                    {contact.value}
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-text-muted group-hover:text-accent-green group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </motion.a>
            ))}

            {/* Quick chat CTA card */}
            <motion.div
              className="border border-bg-border bg-bg-surface/80 p-6 cursor-default"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <div className="font-code text-xs text-text-muted mb-3">{'>'} quick_links</div>
              <div className="flex items-center gap-3">
                {[
                  { icon: Code2, href: 'https://github.com/Lordporus', label: 'GitHub' },
                  { icon: UserCheck, href: 'https://linkedin.com/in/purushottam-kumar-773a59219', label: 'LinkedIn' },
                  { icon: Briefcase, href: 'https://www.fiverr.com/sellers/porusautomation/', label: 'Fiverr' },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 border border-bg-border bg-bg-base text-text-muted hover:text-accent-green hover:border-accent-green/40 transition-all"
                    aria-label={link.label}
                  >
                    <link.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}