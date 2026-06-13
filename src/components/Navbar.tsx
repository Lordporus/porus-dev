import { useState, useEffect } from 'react';
import { Link, scroller } from 'react-scroll';

const navLinks = [
  { name: 'About', href: 'about' },
  { name: 'Skills', href: 'skills' },
  { name: 'Projects', href: 'projects' },
  { name: 'Contact', href: 'contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = ['hero', 'about', 'skills', 'projects', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-50% 0px -50% 0px', threshold: 0 }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (section: string) => {
    scroller.scrollTo(section, { smooth: true, duration: 500, offset: -80 });
    setMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-bg-surface/80 backdrop-blur-md border-b border-bg-border' : 'bg-transparent'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          to="hero"
          smooth={true}
          duration={500}
          offset={-80}
          className="flex items-center gap-2 font-display font-bold text-lg text-accent-green"
          aria-label="Porus - Home"
        >
          <span>{'>'} porus_</span>
          <span className="animate-blink text-accent-green" aria-hidden="true">█</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {/* Terminal path */}
          <span className="font-code text-xs text-text-muted/50 hidden xl:block select-none">
            ~/porus/<span className="text-accent-green">{activeSection}</span>/
          </span>

          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              smooth={true}
              duration={500}
              offset={-80}
              className={`font-code text-sm transition-colors hover:text-accent-green ${
                activeSection === link.href ? 'text-accent-green' : 'text-text-muted'
              }`}
              activeClass="text-accent-green"
              spy={true}
            >
              {link.name}
            </Link>
          ))}
          <button
            onClick={() => scrollTo('contact')}
            className="px-4 py-2 border border-accent-green text-accent-green font-code text-sm hover:bg-accent-green hover:text-bg-base transition-all"
            aria-label="Hire Me"
          >
            [Hire Me]
          </button>
        </div>

        <button
          className="md:hidden p-2 text-text-primary hover:text-accent-green transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {mobileMenuOpen && (
        <div id="mobile-menu" className="md:hidden bg-bg-surface border-t border-bg-border py-4 px-6 animate-fade-up">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollTo(link.href)}
                className={`text-left font-code text-lg transition-colors hover:text-accent-green ${
                  activeSection === link.href ? 'text-accent-green' : 'text-text-muted'
                }`}
              >
                {link.name}
              </button>
            ))}
            <button
              onClick={() => scrollTo('contact')}
              className="px-4 py-2 border border-accent-green text-accent-green font-code text-sm hover:bg-accent-green hover:text-bg-base transition-all text-left"
            >
              [Hire Me]
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}