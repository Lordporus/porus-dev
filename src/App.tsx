import { ThemeProvider } from 'next-themes';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SectionIndicator from './components/SectionIndicator';
import { GridBackground } from './components/ui/grid-background';
import ChatWidget from './components/ChatWidget';

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
      <GridBackground />
      <SectionIndicator />
      <div className="relative min-h-screen scanlines vignette noise z-0">
        <Navbar />
        <main id="main-content">
          <section id="hero">
            <Hero />
          </section>
          <section id="about">
            <About />
          </section>
          <section id="skills">
            <Skills />
          </section>
          <section id="projects">
            <Projects />
          </section>
          <section id="contact">
            <Contact />
          </section>
        </main>
        <Footer />
      </div>
      <ChatWidget />
    </ThemeProvider>
  );
}

export default App;