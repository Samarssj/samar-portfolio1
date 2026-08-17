import { useState, useRef, useEffect, type CSSProperties } from 'react';
import { Button } from '@/components/ui/button';
import AIOrchestration from '@/components/AIOrchestration';
import MultiAgentWorkflow from '@/components/MultiAgentWorkflow';
import AIShowcase from '@/components/AIShowcase';
import CertificationsGallery from '@/components/CertificationsGallery';
import SpotifyWidget from '@/components/SpotifyWidget';
import HUDBackground from '@/components/HUDBackground';
import ProjectCylinder from '@/components/ProjectCylinder';
import OmnitrixEmblem from '@/components/OmnitrixEmblem';
import CursorFollower from '@/components/CursorFollower';
import TechIcon from '@/components/TechIcon';
import { Github, Linkedin, Mail, Download, Moon, Sun, Menu, X } from 'lucide-react';
/**
 * Home Page - Premium AI Engineer Portfolio
 * 
 * Design Philosophy: Enterprise AI infrastructure dashboard aesthetic
 * - Sophisticated dark theme with charcoal, graphite, emerald, and amber accents
 * - Live AI orchestration visualization in hero
 * - Smooth animations and micro-interactions
 * - Professional, technical, forward-thinking
 * */

/** The timeline uses a requestAnimationFrame-throttled scroll link for reliable mobile and desktop updates. */

export default function Home() {
  const [isDark, setIsDark] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const statsTrackRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const timelineContainerRef = useRef<HTMLDivElement>(null);
  const timelineLineRef = useRef<HTMLDivElement>(null);
  const [statsLoopDistance, setStatsLoopDistance] = useState(0);

  useEffect(() => {
    const timeline = timelineContainerRef.current;
    const line = timelineLineRef.current;
    if (!timeline || !line) return;

    let frame = 0;
    const updateTimeline = () => {
      frame = 0;
      const timelineTop = timeline.getBoundingClientRect().top;
      const startPosition = window.innerHeight;
      const endPosition = 96;
      const progress = Math.min(
        1,
        Math.max(0, (startPosition - timelineTop) / (startPosition - endPosition))
      );
      line.style.transform = `scaleY(${progress})`;
    };

    const handleScroll = () => {
      if (!frame) frame = requestAnimationFrame(updateTimeline);
    };

    updateTimeline();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateTimeline);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateTimeline);
    };
  }, []);

  const stats = [
    { value: '2+', label: 'Internships' },
    { value: '11+', label: 'Projects' },
    { value: '11+', label: 'Certifications' },
    { value: '74%↑', label: 'AI Accuracy' },
  ];

  useEffect(() => {
    const track = statsTrackRef.current;
    if (!track) return;

    const updateLoopDistance = () => setStatsLoopDistance(track.getBoundingClientRect().width);
    updateLoopDistance();

    const observer = new ResizeObserver(updateLoopDistance);
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  // Load theme preference on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    } else {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Add smooth scroll behavior
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  // Scroll animation observer for all content boxes with bidirectional scrolling
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        } else {
          // Optional: remove to re-trigger animation when scrolling back up
          // entry.target.classList.remove('active');
        }
      });
    }, observerOptions);

    // Observe all sections and cards for smooth reveal
    const revealElements = document.querySelectorAll('.scroll-reveal');
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Form state management
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Using Formspree API for email submission
      const response = await fetch('https://formspree.io/f/xaqgqazr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        setSubmitStatus('error');
        setTimeout(() => setSubmitStatus('idle'), 5000);
      }
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const skillGroups = [
    {
      title: 'Languages',
      marker: '</>',
      skills: [
        { name: 'Python', level: 96, slug: 'python', color: '3776AB' },
        { name: 'JavaScript', level: 92, slug: 'javascript', color: 'F7DF1E' },
        { name: 'TypeScript', level: 90, slug: 'typescript', color: '3178C6' },
        { name: 'Java', level: 84, slug: 'openjdk', color: 'ED8B00' },
        { name: 'SQL', level: 91, slug: 'sqlite', color: '003B57' },
      ],
    },
    {
      title: 'Frameworks',
      marker: '◈',
      skills: [
        { name: 'React.js', level: 93, slug: 'react', color: '61DAFB' },
        { name: 'Node.js', level: 91, slug: 'nodedotjs', color: '339933' },
        { name: 'Express.js', level: 88, slug: 'express', color: 'F7F7F7', fallback: 'server' },
        { name: 'LangChain', level: 90, slug: 'langchain', color: '1C3C3C' },
        { name: 'JWTs', level: 84, slug: 'jsonwebtokens', color: 'F7F7F7', fallback: 'key' },
      ],
    },
    {
      title: 'AI & Cloud',
      marker: '✦',
      skills: [
        { name: 'Vertex AI', level: 96, slug: 'googlecloud', color: '4285F4' },
        { name: 'CX Agent Studio', level: 88, slug: 'dialogflow', color: 'FF9800' },
        { name: 'Gen AI', level: 94, slug: 'googlegemini', color: '8E75B2' },
        { name: 'GCP', level: 92, slug: 'googlecloud', color: '4285F4' },
        { name: 'LLMs', level: 97, slug: 'openai', color: '412991' },
        { name: 'RAG', level: 93, fallback: 'network' },
        { name: 'ADK', level: 86, slug: 'googlecloud', color: '34A853' },
      ],
    },
    {
      title: 'Tools',
      marker: '⌘',
      skills: [
        { name: 'Git', level: 95, slug: 'git', color: 'F05032' },
        { name: 'Docker', level: 88, slug: 'docker', color: '2496ED' },
        { name: 'Kubernetes', level: 84, slug: 'kubernetes', color: '326CE5' },
        { name: 'REST APIs', level: 92, slug: 'postman', color: 'FF6C37' },
        { name: 'CI/CD', level: 86, slug: 'githubactions', color: '2088FF' },
        { name: 'WebHooks', level: 82, fallback: 'webhook' },
      ],
    },
    {
      title: 'Databases',
      marker: '◇',
      skills: [
        { name: 'MongoDB', level: 87, slug: 'mongodb', color: '47A248' },
        { name: 'Firestore', level: 92, slug: 'firebase', color: 'FFCA28' },
        { name: 'BigQuery', level: 85, slug: 'googlebigquery', color: '669DF6' },
        { name: 'VectorDB', level: 88, fallback: 'database' },
      ],
    },
    {
      title: 'ML & Data',
      marker: '∿',
      skills: [
        { name: 'Scikit-Learn', level: 89, slug: 'scikitlearn', color: 'F7931E' },
        { name: 'NumPy', level: 92, slug: 'numpy', color: '013243' },
        { name: 'Pandas', level: 91, slug: 'pandas', color: '150458' },
        { name: 'NLP', level: 88, slug: 'huggingface', color: 'FFD21E' },
        { name: 'EDA', level: 86, slug: 'plotly', color: '3F4F75' },
        { name: 'Feature & Prompt Engineering', level: 94, fallback: 'sparkles' },
      ],
    },
  ];

  const skillsRef = useRef<HTMLElement>(null);
  const [skillsVisible, setSkillsVisible] = useState(false);

  useEffect(() => {
    const section = skillsRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setSkillsVisible(entry.isIntersecting),
      { threshold: 0.18, rootMargin: '0px 0px -8% 0px' }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <HUDBackground />
      <CursorFollower />
      <div className="relative z-10">
      <SpotifyWidget />
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 md:flex-1">
            <OmnitrixEmblem />
            <span className="font-bold text-lg">Samar Singh</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 flex-1 justify-center">
            <a href="#about" className="text-sm text-muted hover:text-foreground active:text-accent transition-colors cursor-pointer">About</a>
            <a href="#projects" className="text-sm text-muted hover:text-foreground active:text-accent transition-colors cursor-pointer">Projects</a>
            <a href="#skills" className="text-sm text-muted hover:text-foreground active:text-accent transition-colors cursor-pointer">Skills</a>
            <a href="#ai-showcase" className="text-sm text-muted hover:text-foreground active:text-accent transition-colors cursor-pointer">AI Systems</a>
            <a href="#contact" className="text-sm text-muted hover:text-foreground active:text-accent transition-colors cursor-pointer">Contact</a>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 md:flex-1 md:justify-end">
            <button onClick={toggleDarkMode} className="p-2 hover:bg-secondary active:bg-accent/20 rounded-lg transition-colors" aria-label="Toggle dark mode">
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <a href="https://github.com/Samarssj" target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-secondary active:bg-accent/20 rounded-lg transition-colors" aria-label="GitHub">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/in/samarssj/" target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-secondary active:bg-accent/20 rounded-lg transition-colors" aria-label="LinkedIn">
              <Linkedin className="w-5 h-5" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-secondary active:bg-accent/20 rounded-lg transition-colors text-green-400"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl px-6 py-6 space-y-4 shadow-2xl animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col space-y-3">
              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold text-foreground hover:text-green-400 transition-colors py-2 px-3 rounded-lg hover:bg-secondary/50 flex items-center justify-between"
              >
                <span>About</span>
                <span className="text-xs text-green-500 font-mono">01</span>
              </a>
              <a
                href="#projects"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold text-foreground hover:text-green-400 transition-colors py-2 px-3 rounded-lg hover:bg-secondary/50 flex items-center justify-between"
              >
                <span>Projects</span>
                <span className="text-xs text-green-500 font-mono">02</span>
              </a>
              <a
                href="#skills"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold text-foreground hover:text-green-400 transition-colors py-2 px-3 rounded-lg hover:bg-secondary/50 flex items-center justify-between"
              >
                <span>Skills</span>
                <span className="text-xs text-green-500 font-mono">03</span>
              </a>
              <a
                href="#ai-showcase"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold text-foreground hover:text-green-400 transition-colors py-2 px-3 rounded-lg hover:bg-secondary/50 flex items-center justify-between"
              >
                <span>AI Systems</span>
                <span className="text-xs text-green-500 font-mono">04</span>
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold text-foreground hover:text-green-400 transition-colors py-2 px-3 rounded-lg hover:bg-secondary/50 flex items-center justify-between"
              >
                <span>Contact</span>
                <span className="text-xs text-green-500 font-mono">05</span>
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: AI Orchestration Visualization */}
            <div className="flex flex-col gap-4">
            <div className="h-96 lg:h-[500px] rounded-xl overflow-hidden">
              <AIOrchestration />
            </div>

            <div className="mt-3 text-center">
             <p className="text-xs font-semibold uppercase tracking-widest text-accent drop-shadow-[0_0_8px_#22c55e]">
            Basic Agentic AI Workflow
            </p>
         </div>
        </div>

            {/* Right: Hero Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/20 bg-accent/5">
  {/* 1. Glowing & Fast Expanding Dot */}
  <div className="relative flex h-2 w-2">
    <div className="animate-ping [animation-duration:0.7s] absolute inline-flex h-full w-full rounded-full bg-accent opacity-75 shadow-[0_0_12px_rgba(var(--accent),0.8)]"></div>
    <div className="relative inline-flex rounded-full h-2 w-2 bg-accent shadow-[0_0_8px_rgba(var(--accent),1)]"></div>
  </div>
  
  {/* 2. Pulsing & Glowing Text */}
  <span className="text-xs font-semibold text-accent animate-pulse [animation-duration:1.5s] drop-shadow-[0_0_4px_rgba(var(--accent),0.5)]">
    Available for work/freelance projects
  </span>
</div>

                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                  <div className="flex-1">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                      {["AI", "Engineer", "&"].map((word, wordIdx, words) => {
                        const previousCharsCount = words.slice(0, wordIdx).join(" ").length + (wordIdx > 0 ? 1 : 0);
                        return (
                          <span key={wordIdx} className="inline-block whitespace-nowrap">
                            {word.split("").map((char, charIdx) => (
                              <span 
                                key={charIdx} 
                                className="animate-char-reveal" 
                                style={{ animationDelay: `${(previousCharsCount + charIdx) * 0.05}s` }}
                              >
                                {char}
                              </span>
                            ))}
                            {wordIdx < words.length - 1 && <span>&nbsp;</span>}
                          </span>
                        );
                      })}
                      <br />
                      {["Full-Stack", "Developer"].map((word, wordIdx, words) => {
                        const previousCharsCount = words.slice(0, wordIdx).join(" ").length + (wordIdx > 0 ? 1 : 0) + 13;
                        return (
                          <span key={wordIdx} className="inline-block whitespace-nowrap text-accent">
                            {word.split("").map((char, charIdx) => (
                              <span 
                                key={charIdx} 
                                className="animate-char-reveal" 
                                style={{ animationDelay: `${(previousCharsCount + charIdx) * 0.05}s` }}
                              >
                                {char}
                              </span>
                            ))}
                            {wordIdx < words.length - 1 && <span>&nbsp;</span>}
                          </span>
                        );
                      })}
                    </h1>
                  </div>
                  <div className="group/profile relative flex-shrink-0">
                    <div className="absolute -inset-[3px] rounded-xl opacity-0 blur-[1px] transition-opacity duration-300 group-hover/profile:opacity-100">
                      <div className="h-full w-full rounded-xl bg-[conic-gradient(from_0deg,#10b981,#a3e635,#10b981,#065f46,#10b981)] group-hover/profile:animate-[spin_1.8s_linear_infinite]" />
                    </div>
                    <div className="relative overflow-hidden rounded-lg border border-accent/30 shadow-lg transition-transform duration-300 group-hover/profile:scale-[1.02]">
                      <img
                        src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663745791505/NFiqZRbGBApQcYsC.jpg"
                        alt="Samar Singh"
                        className="w-24 h-32 sm:w-32 sm:h-40 object-cover"
                      />
                    </div>
                  </div>
                </div>

                <p className="text-lg text-muted leading-relaxed max-w-md">
                  Building intelligent systems, agentic AI solutions, and scalable software that transform ideas into real-world products.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <a href="mailto:ssjsamar453@gmail.com">
                  <Button className="gap-2 bg-accent hover:bg-accent/90 active:bg-accent/80 text-accent-foreground transition-all">
                    <Mail className="w-4 h-4" />
                    Get in Touch
                  </Button>
                </a>
                <a href="https://drive.google.com/file/d/1ygq4aSNoREhRY-VxNdygpeVU2-_NCUVX/view?usp=drivesdk" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="gap-2 hover:border-accent active:bg-accent/10 transition-all">
                    <Download className="w-4 h-4" />
                    Resume
                  </Button>
                </a>
              </div>

              {/* Stats Live Banner */}
              <div className="pt-8 border-t border-border overflow-hidden">
                <div
                  className="flex py-2"
                  style={{ maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)' } as CSSProperties}
                >
                  {/* Outer wrapper drives the animation using the exact measured width of one copy */}
                  <div
                    className="flex"
                    style={{
                      willChange: 'transform',
                      backfaceVisibility: 'hidden',
                      '--stats-loop-distance': `-${statsLoopDistance}px`,
                      animation: statsLoopDistance
                        ? 'stats-marquee 12s linear infinite'
                        : 'none',
                    } as CSSProperties}
                  >
                    {/* First copy — measured by ref */}
                    <div ref={statsTrackRef} className="flex items-center flex-shrink-0">
                      {stats.map((stat, i) => (
                        <>
                          <div key={stat.label} className="flex items-center" style={{ gap: '1.25rem', paddingRight: '3rem' }}>
                            <span className="text-2xl font-bold text-accent" style={{ textShadow: '0 0 12px rgba(16,185,129,0.6)' }}>{stat.value}</span>
                            <span className="text-xs font-bold text-muted uppercase" style={{ letterSpacing: '0.3em' }}>{stat.label}</span>
                          </div>
                          <div key={`dot-${i}`} className="w-2 h-2 rounded-full bg-accent/40" style={{ marginRight: '3rem', flexShrink: 0 }} />
                        </>
                      ))}
                    </div>
                    {/* Exact duplicate — same content, same spacing */}
                    <div className="flex items-center flex-shrink-0">
                      {stats.map((stat, i) => (
                        <>
                          <div key={stat.label} className="flex items-center" style={{ gap: '1.25rem', paddingRight: '3rem' }}>
                            <span className="text-2xl font-bold text-accent" style={{ textShadow: '0 0 12px rgba(16,185,129,0.6)' }}>{stat.value}</span>
                            <span className="text-xs font-bold text-muted uppercase" style={{ letterSpacing: '0.3em' }}>{stat.label}</span>
                          </div>
                          <div key={`dot-${i}`} className="w-2 h-2 rounded-full bg-accent/40" style={{ marginRight: '3rem', flexShrink: 0 }} />
                        </>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <div className="p-8 rounded-lg border border-accent bg-background/50 shadow-[0_0_20px_#22c55e] active:bg-accent/10 active:scale-[0.99] md:border-border md:shadow-none hover:scale-[1.01] md:hover:border-accent md:hover:shadow-[0_0_20px_#22c55e] transition-all duration-300 cursor-pointer scroll-reveal">
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="text-xs font-semibold text-accent uppercase tracking-widest">About</div>
                <h2 className="text-3xl sm:text-4xl font-bold">Who I Am</h2>
              </div>

              <div className="space-y-4 text-muted leading-relaxed">
                <p>
                  I'm an AI Engineer and Full-Stack Developer passionate about building intelligent systems that solve real-world problems. With experience of <strong className="text-foreground">EXL Service</strong> as an AI Engineer Intern and then being transitioned to Associate Developer, where I develop and deploy Generative AI solutions using Google Cloud technologies.
                </p>

                <p>
                  My expertise spans across AI/ML, cloud computing, and modern web development. I specialize in building agentic AI workflows, LLM-powered applications, and scalable backend systems. I'm particularly interested in autonomous agent orchestration, prompt engineering, and production-ready AI systems.
                </p>

                <p>
                  I hold multiple certifications in AI, machine learning, and Google Cloud infrastructure, and I'm continuously learning and experimenting with cutting-edge technologies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section ref={skillsRef} id="skills" className="relative overflow-hidden border-t border-border bg-secondary/30 px-4 py-20 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent" />
        <div className="pointer-events-none absolute -left-28 top-20 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-28 bottom-10 h-72 w-72 rounded-full bg-cyan-400/5 blur-3xl" />

        <div className="relative mx-auto max-w-6xl">
          <div className="mb-10 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">Toolkit</div>
            <h2 className="text-3xl font-bold sm:text-4xl">Skills & Expertise</h2>
            <p className="max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
              A live view of the technologies I use to design, build, and ship intelligent systems.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {skillGroups.map((group, groupIndex) => (
              <article
                key={group.title}
                className={`group relative overflow-hidden rounded-2xl border border-accent/25 bg-background/65 p-5 shadow-[0_0_24px_rgba(16,185,129,0.08)] transition-[transform,opacity,box-shadow,border-color,background-color] duration-700 ease-out hover:-translate-y-2 hover:scale-[1.025] hover:border-accent hover:bg-accent/[0.06] hover:shadow-[0_0_42px_rgba(16,185,129,0.28)] hover:ring-1 hover:ring-accent/40 sm:p-6 ${skillsVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                style={{ transitionDelay: `${groupIndex * 90}ms` }}
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-80" />
                <div className="mb-6 flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl border border-accent/40 bg-accent/10 font-mono text-sm font-bold text-accent shadow-[0_0_18px_rgba(16,185,129,0.16)] transition-[transform,box-shadow,background-color] duration-300 group-hover:rotate-6 group-hover:scale-110 group-hover:bg-accent/20 group-hover:shadow-[0_0_26px_rgba(16,185,129,0.42)]">
                    {group.marker}
                  </span>
                  <h3 className="text-lg font-semibold text-foreground sm:text-xl">{group.title}</h3>
                </div>

                <div className="space-y-5">
                  {group.skills.map((skill, skillIndex) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex items-center justify-between gap-3 text-sm">
                        <span className="flex min-w-0 items-center gap-2 truncate text-foreground/90">
                          <TechIcon name={skill.name} slug={skill.slug} color={skill.color} fallback={skill.fallback} />
                          <span className="truncate">{skill.name}</span>
                        </span>
                        <span className="shrink-0 font-mono text-xs font-semibold text-accent">{skill.level}%</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-accent/10 ring-1 ring-inset ring-accent/10">
                        <div
                          className={`h-full origin-left rounded-full bg-gradient-to-r from-emerald-600 via-emerald-400 to-cyan-300 shadow-[0_0_12px_rgba(16,185,129,0.55)] transition-transform duration-[1000ms] ease-out group-hover:brightness-125 ${skillsVisible ? 'scale-x-100' : 'scale-x-0'}`}
                          style={{ width: `${skill.level}%`, transitionDelay: `${groupIndex * 90 + skillIndex * 55}ms` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative border-t border-border bg-secondary/30">
        <div className="px-4 pt-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="space-y-2">
              <div className="text-xs font-semibold text-accent uppercase tracking-widest">Portfolio</div>
              <h2 className="text-3xl sm:text-4xl font-bold">Featured Projects</h2>
            </div>
          </div>
        </div>
        <ProjectCylinder />
      </section>

      {/* AI Engineering Showcase */}
      <section id="ai-showcase" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border bg-secondary/30 scroll-reveal">
        <div className="max-w-4xl mx-auto">
          <AIShowcase />
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <CertificationsGallery />
        </div>
      </section>

      {/* Experience */}
      <section ref={experienceRef} id="experience" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border bg-secondary/30 scroll-reveal">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-2 mb-12">
            <div className="text-xs font-semibold text-accent uppercase tracking-widest">Career</div>
            <h2 className="text-3xl sm:text-4xl font-bold">Work Experience</h2>
          </div>

          <div ref={timelineContainerRef} className="relative space-y-24 pl-8 md:pl-12">
            {/* Vertical Connecting Line */}
            <div className="absolute left-[15px] md:left-[23px] top-8 bottom-8 w-[6px] bg-accent/20">
              <div
                ref={timelineLineRef}
                className="w-full h-full bg-accent origin-bottom shadow-[0_0_30px_#10b981] will-change-transform"
              />
            </div>

            {/* EXL Service — Current Role */}
            <div className="relative">
              {/* Timeline Dot */}
              <div className="absolute -left-[25px] md:-left-[33px] top-8 w-4 h-4 rounded-full bg-background border-2 border-accent z-10 shadow-[0_0_12px_#10b981]" />

              <div className="p-6 rounded-lg border border-accent bg-background/50 shadow-[0_0_20px_#22c55e] active:bg-accent/10 active:scale-[0.99] md:border-border md:shadow-none hover:scale-[1.01] md:hover:border-accent md:hover:shadow-[0_0_20px_#22c55e] transition-all duration-300 cursor-pointer scroll-reveal">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">Associate Developer</h3>
                    <p className="text-muted">EXL Service</p>
                  </div>
                  <span className="text-sm text-accent font-medium whitespace-nowrap">August 2026 - Present</span>
                </div>
                <div className="space-y-3 text-muted">
                  <p>→ Develop and enhance agentic AI automation solutions on Google Cloud Platform for enterprise workflows</p>
                  <p>→ Build scalable multi-agent workflows for task orchestration, intelligent routing, and human-in-the-loop operations</p>
                  <p>→ Integrate Vertex AI, cloud services, and APIs to deliver reliable, production-ready automation systems</p>
                  <p>→ Collaborate with cross-functional teams to translate business processes into secure, measurable AI-enabled solutions</p>
                </div>
              </div>
            </div>

            {/* EXL Service — Internship */}
            <div className="relative">
              {/* Timeline Dot */}
              <div className="absolute -left-[25px] md:-left-[33px] top-8 w-4 h-4 rounded-full bg-background border-2 border-accent z-10 shadow-[0_0_12px_#10b981]" />

              <div className="p-6 rounded-lg border border-accent bg-background/50 shadow-[0_0_20px_#22c55e] active:bg-accent/10 active:scale-[0.99] md:border-border md:shadow-none hover:scale-[1.01] md:hover:border-accent md:hover:shadow-[0_0_20px_#22c55e] transition-all duration-300 cursor-pointer scroll-reveal">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">AI Engineer Intern</h3>
                    <p className="text-muted">EXL Service</p>
                  </div>
                  <span className="text-sm text-accent font-medium whitespace-nowrap">April 2026 - July 2026</span>
                </div>
                <div className="space-y-3 text-muted">
                  <p>→ Developed and deployed Generative AI solutions using Vertex AI and Dialogflow CX on Google Cloud Platform</p>
                  <p>→ Built multi-agent orchestration systems for enterprise workflow automation and task delegation</p>
                  <p>→ Optimized LLM prompts and implemented RAG pipelines for improved accuracy and context awareness</p>
                  <p>→ Collaborated with cross-functional teams to integrate AI solutions into production environments</p>
                  <p>→ Achieved 40%+ improvement in AI model accuracy through fine-tuning and feature engineering</p>
                </div>
              </div>
            </div>

            {/* HighRadius */}
            <div className="relative">
              {/* Timeline Dot */}
              <div className="absolute -left-[25px] md:-left-[33px] top-8 w-4 h-4 rounded-full bg-background border-2 border-accent z-10 shadow-[0_0_12px_#10b981]" />

              <div className="p-6 rounded-lg border border-accent bg-background/50 shadow-[0_0_20px_#22c55e] active:bg-accent/10 active:scale-[0.99] md:border-border md:shadow-none hover:scale-[1.01] md:hover:border-accent md:hover:shadow-[0_0_20px_#22c55e] transition-all duration-300 cursor-pointer scroll-reveal">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">ABM Intern</h3>
                    <p className="text-muted">HighRadius</p>
                  </div>
                  <span className="text-sm text-accent font-medium whitespace-nowrap">Aug 2025 - Jan 2026</span>
                </div>
                <div className="space-y-3 text-muted">
                  <p>→ Analyzed business metrics and customer data to identify growth opportunities and market trends</p>
                  <p>→ Developed automated reporting dashboards for real-time business intelligence and decision-making</p>
                  <p>→ Implemented data pipelines for ETL processes, improving data accuracy by 35%</p>
                  <p>→ Collaborated with product and marketing teams to align business objectives with technical solutions</p>
                  <p>→ Contributed to strategic planning and execution of account-based marketing initiatives</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border scroll-reveal">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-2 mb-12">
            <div className="text-xs font-semibold text-accent uppercase tracking-widest">Education</div>
            <h2 className="text-3xl sm:text-4xl font-bold">Academic Background</h2>
          </div>

          <div className="p-6 rounded-lg border border-border bg-background/50 hover:scale-[1.01] hover:border-accent hover:shadow-[0_0_20px_#22c55e] transition-all duration-300 cursor-pointer scroll-reveal">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
              <div>
                <h3 className="text-xl font-semibold">B.E. Computer Science</h3>
                <p className="text-muted">Chitkara University [2022-2026]</p>
              </div>
              <span className="text-sm text-accent font-medium whitespace-nowrap">CGPA: 7.76</span>
            </div>
            <p className="text-muted">Focused on AI, machine learning, and software engineering with practical experience in building scalable systems.</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border bg-secondary/30 scroll-reveal">
        <div className="max-w-2xl mx-auto">
          <div className="space-y-2 mb-12 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/20 bg-accent/5 mx-auto">
  {/* 1. Glowing & Fast Expanding Radar Dot */}
            <div className="relative flex h-2 w-2">
            <div className="animate-ping [animation-duration:0.7s] absolute inline-flex h-full w-full rounded-full bg-accent opacity-75 shadow-[0_0_12px_#22c55e]"></div>
             <div className="relative inline-flex rounded-full h-2 w-2 bg-accent shadow-[0_0_8px_#22c55e]"></div>
           </div>
  
  {/* 2. Pulsing Subtitle Text */}
     <span className="text-xs font-semibold uppercase tracking-widest text-accent animate-pulse [animation-duration:1.5s] drop-shadow-[0_0_4px_rgba(34,197,94,0.5)]">
    Get in Touch
  </span>
</div>
            <h2 className="text-3xl sm:text-4xl font-bold">Let's Build Something Great</h2>
            <p className="text-lg text-muted">
              Have a project in mind or want to collaborate? Send me a message and I'll get back to you as soon as possible.
            </p>
          </div>

          <form onSubmit={handleFormSubmit} className="p-8 rounded-lg border border-accent bg-background/50 shadow-[0_0_20px_#22c55e] active:bg-accent/10 active:scale-[0.99] md:border-border md:shadow-none hover:scale-[1.01] md:hover:border-accent md:hover:shadow-[0_0_20px_#22c55e] transition-all duration-300 cursor-pointer scroll-reveal">
            {/* Name Field */}
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-foreground">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                required
                placeholder="Your name"
                className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 text-foreground placeholder:text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-colors"
              />
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-foreground">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                required
                placeholder="your@email.com"
                className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 text-foreground placeholder:text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-colors"
              />
            </div>

            {/* Message Field */}
            <div className="space-y-2">
              <label htmlFor="message" className="block text-sm font-medium text-foreground">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleFormChange}
                required
                placeholder="Tell me about your project or inquiry..."
                rows={5}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 text-foreground placeholder:text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-colors resize-none"
              />
            </div>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="p-4 rounded-lg bg-accent/10 border border-accent/30 text-accent text-sm animate-fade-in">
                ✓ Message sent successfully fam! I'll get back to you soon.
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-sm animate-fade-in">
                ✗ BRUH failed to send. Please try again or just give up and email me directly.
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full gap-2 bg-accent hover:bg-accent/90 active:bg-accent/80 text-accent-foreground transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
          </form>

          {/* Alternative Contact Methods */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <a href="mailto:ssjsamar453@gmail.com" className="p-4 rounded-lg border border-accent bg-background/50 shadow-[0_0_20px_#22c55e] active:bg-accent/10 active:scale-[0.99] md:border-border md:shadow-none hover:scale-[1.01] md:hover:border-accent md:hover:shadow-[0_0_20px_#22c55e] transition-all duration-300 cursor-pointer">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4"></div>
              <div className="text-accent font-semibold mb-2">Email</div>
              <div className="text-sm text-muted">ssjsamar453@gmail.com</div>
            </a>
            <a href="https://www.linkedin.com/in/samarssj/" target="_blank" rel="noopener noreferrer" className="p-4 rounded-lg border border-accent bg-background/50 shadow-[0_0_20px_#22c55e] active:bg-accent/10 active:scale-[0.99] md:border-border md:shadow-none hover:scale-[1.01] md:hover:border-accent md:hover:shadow-[0_0_20px_#22c55e] transition-all duration-300 cursor-pointer">
              <div className="text-accent font-semibold mb-2">LinkedIn</div>
              <div className="text-sm text-muted">samarssj</div>
            </a>
            <a href="https://github.com/Samarssj" target="_blank" rel="noopener noreferrer" className="p-4 rounded-lg border border-accent bg-background/50 shadow-[0_0_20px_#22c55e] active:bg-accent/10 active:scale-[0.99] md:border-border md:shadow-none hover:scale-[1.01] md:hover:border-accent md:hover:shadow-[0_0_20px_#22c55e] transition-all duration-300 cursor-pointer">
              <div className="text-accent font-semibold mb-2">GitHub</div>
              <div className="text-sm text-muted">Samarssj</div>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-border text-center text-muted text-sm">
        <p>© 2026 Samar Singh. All rights reserved.</p>
      </footer>
      </div>
    </div>
  );
}
