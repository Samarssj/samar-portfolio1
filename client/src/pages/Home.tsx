import { useState, useRef, useEffect, type CSSProperties } from 'react';
import { Button } from '@/components/ui/button';
import AIOrchestration from '@/components/AIOrchestration';
import AIShowcase from '@/components/AIShowcase';
import CertificationsGallery from '@/components/CertificationsGallery';
import SpotifyWidget from '@/components/SpotifyWidget';
import HUDBackground from '@/components/HUDBackground';
import ProjectCylinder from '@/components/ProjectCylinder';
import OmnitrixEmblem from '@/components/OmnitrixEmblem';
import CursorFollower from '@/components/CursorFollower';
import TechIcon from '@/components/TechIcon';
import GithubAnalytics from '@/components/GithubAnalytics';
import { ArrowUpRight, Github, Linkedin, Mail, Download, Moon, Sun, Menu, X } from 'lucide-react';

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
    { value: '2+', label: 'Companies' },
    { value: '21+', label: 'Deployments' },
    { value: '11+', label: 'Certifications' },
    { value: '74%↑', label: 'AI Integration' },
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

  const toggleDarkMode = () => {
    setIsDark((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle('dark', next);
      localStorage.setItem('theme', next ? 'dark' : 'light');
      return next;
    });
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const shouldUseDark = savedTheme !== 'light';
    setIsDark(shouldUseDark);
    document.documentElement.classList.toggle('dark', shouldUseDark);
  }, []);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('active');
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    document.querySelectorAll('.scroll-reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('https://formspree.io/f/xaqgqazr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
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

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <HUDBackground />
      <CursorFollower />
      <div className="relative z-10">
        <SpotifyWidget />

        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2 md:flex-1">
              <OmnitrixEmblem />
              <span className="font-bold text-lg">Samar Singh</span>
            </div>

            <div className="hidden md:flex items-center gap-8 flex-1 justify-center">
              <a href="#about" className="text-sm text-muted hover:text-foreground transition-colors">About</a>
              <a href="#projects" className="text-sm text-muted hover:text-foreground transition-colors">Projects</a>
              <a href="#skills" className="text-sm text-muted hover:text-foreground transition-colors">Skills</a>
              <a href="#ai-showcase" className="text-sm text-muted hover:text-foreground transition-colors">AI Systems</a>
              <a href="#contact" className="text-sm text-muted hover:text-foreground transition-colors">Contact</a>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 md:flex-1 md:justify-end">
              <button onClick={toggleDarkMode} className="p-2 hover:bg-secondary rounded-lg transition-colors" aria-label="Toggle dark mode">
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <a href="https://github.com/Samarssj" target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-secondary rounded-lg transition-colors" aria-label="GitHub">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/in/samarssj/" target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-secondary rounded-lg transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors text-green-400"
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden border-t border-border bg-background/95 px-6 py-6 space-y-4 shadow-2xl">
              <a href="#about" onClick={() => setMobileMenuOpen(false)} className="block text-base font-semibold text-foreground hover:text-green-400">About</a>
              <a href="#projects" onClick={() => setMobileMenuOpen(false)} className="block text-base font-semibold text-foreground hover:text-green-400">Projects</a>
              <a href="#skills" onClick={() => setMobileMenuOpen(false)} className="block text-base font-semibold text-foreground hover:text-green-400">Skills</a>
              <a href="#ai-showcase" onClick={() => setMobileMenuOpen(false)} className="block text-base font-semibold text-foreground hover:text-green-400">AI Systems</a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block text-base font-semibold text-foreground hover:text-green-400">Contact</a>
            </div>
          )}
        </nav>

        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="flex flex-col gap-4">
                <div className="h-96 lg:h-[500px] rounded-xl overflow-hidden">
                  <AIOrchestration />
                </div>
                <div className="mt-3 text-center">
                  <p className="text-xs font-semibold uppercase tracking-widest text-accent">Basic Agentic AI Workflow</p>
                </div>
              </div>

              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/20 bg-accent/5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                    </span>
                    <span className="text-xs font-semibold text-accent">Available for work/freelance projects</span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                    <div className="flex-1">
                      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                        AI Engineer &<br />
                        <span className="text-accent">Full-Stack Developer</span>
                      </h1>
                    </div>
                    <div className="group/profile relative flex-shrink-0">
                      <div className="absolute -inset-[3px] rounded-xl opacity-0 blur-[1px] transition-opacity duration-300 group-hover/profile:opacity-100">
                        <div className="h-full w-full rounded-xl bg-[conic-gradient(from_0deg,#ff3b30,#ff6b35,#ffd166,#d7263d,#ff3b30)]" />
                      </div>
                      <div className="relative overflow-hidden rounded-lg border border-orange-500/50 shadow-lg">
                        <img
                          src="/samar-profile.webp"
                          alt="Samar Singh"
                          className="w-48 h-48 sm:w-56 sm:h-56 object-cover object-[80%_100%] -translate-x-6 scale-[1.3] origin-bottom"
                        />
                      </div>
                    </div>
                  </div>

                  <p className="text-lg text-muted leading-relaxed max-w-md">
                    Building intelligent systems, agentic AI solutions, and scalable software that transform ideas into real-world products.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4">
                  <a href="mailto:ssjsamar453@gmail.com">
                    <Button className="gap-2 bg-accent hover:bg-accent/90 text-accent-foreground">
                      <Mail className="w-4 h-4" />
                      Get in Touch
                    </Button>
                  </a>
                  <a href="https://drive.google.com/file/d/1ygq4aSNoREhRY-VxNdygpeVU2-_NCUVX/view?usp=drivesdk" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="gap-2 hover:border-accent">
                      <Download className="w-4 h-4" />
                      Resume
                    </Button>
                  </a>
                </div>

                <div className="pt-8 border-t border-border overflow-hidden">
                  <div className="flex py-2" style={{ maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)' } as CSSProperties}>
                    <div className="flex" style={{ willChange: 'transform', animation: statsLoopDistance ? 'stats-marquee 12s linear infinite' : 'none' } as CSSProperties}>
                      <div ref={statsTrackRef} className="flex items-center flex-shrink-0">
                        {stats.map((stat, i) => (
                          <div key={i} className="flex items-center" style={{ gap: '1.25rem', paddingRight: '3rem' }}>
                            <span className="text-2xl font-bold text-accent">{stat.value}</span>
                            <span className="text-xs font-bold text-muted uppercase tracking-[0.3em]">{stat.label}</span>
                            <span className="w-2 h-2 rounded-full bg-accent/40" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <GithubAnalytics />
          </div>
        </section>

        <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border">
          <div className="max-w-4xl mx-auto">
            <div className="p-8 rounded-lg border border-accent bg-background/50 shadow-[0_0_20px_#22c55e]">
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-accent uppercase tracking-widest">About</div>
                  <h2 className="text-3xl sm:text-4xl font-bold">Who I Am</h2>
                </div>

                <div className="space-y-4 text-muted leading-relaxed">
                  <p>
                    I'm an AI Engineer and Full-Stack Developer passionate about building intelligent systems that solve real-world problems. With experience spanning product design, AI automation, and cloud engineering, I work at the intersection of software, data, and automation.
                  </p>
                  <p>
                    My expertise spans across AI/ML, cloud computing, and modern web development. I specialize in building agentic AI workflows, LLM-powered applications, and scalable backend systems.
                  </p>
                  <p>
                    I hold multiple certifications in AI, machine learning, and Google Cloud infrastructure, and I'm continuously learning and experimenting with cutting-edge technologies.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="relative overflow-hidden border-t border-border bg-secondary/30 px-4 py-20 sm:px-6 lg:px-8">
          <div className="relative mx-auto max-w-6xl">
            <div className="mb-10 space-y-3">
              <div className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">Toolkit</div>
              <h2 className="text-3xl font-bold sm:text-4xl">Skills & Expertise</h2>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {skillGroups.map((group, groupIndex) => (
                <article key={group.title} className="group relative overflow-hidden rounded-2xl border border-accent/25 bg-background/65 p-5 shadow-[0_0_24px_rgba(16,185,129,0.08)]">
                  <div className="mb-6 flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl border border-accent/40 bg-accent/10 font-mono text-sm font-bold text-accent">
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
                          <div className="h-full rounded-full bg-gradient-to-r from-emerald-600 via-emerald-400 to-cyan-300" style={{ width: `${skill.level}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="samarscope" className="border-t border-border bg-background/80 px-4 py-10 sm:px-6 lg:px-8 scroll-reveal">
          <div className="mx-auto max-w-6xl">
            <a href="https://personal-rag-bot.onrender.com" target="_blank" rel="noopener noreferrer" className="group relative flex flex-col gap-5 overflow-hidden rounded-2xl border border-accent/30 bg-accent/[0.06] p-6 shadow-[0_0_28px_rgba(16,185,129,0.08)]">
              <div className="space-y-2">
                <div className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">Personal AI</div>
                <h2 className="text-xl font-bold text-foreground sm:text-2xl">SamarScope AI — Personal RAG Assistant</h2>
                <p className="text-sm leading-relaxed text-muted sm:text-base">Score my resume against any JD or another user&apos;s resume with a built-in Gemini-powered ATS scoring system.</p>
              </div>
              <span className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-2 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                Click to try SamarScope
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </a>
          </div>
        </section>

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

        <section id="ai-showcase" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border bg-secondary/30 scroll-reveal">
          <div className="max-w-4xl mx-auto">
            <AIShowcase />
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border">
          <div className="max-w-4xl mx-auto">
            <CertificationsGallery />
          </div>
        </section>

        <section ref={experienceRef} id="experience" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border bg-secondary/30 scroll-reveal">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-2 mb-12">
              <div className="text-xs font-semibold text-accent uppercase tracking-widest">Career</div>
              <h2 className="text-3xl sm:text-4xl font-bold">Work Experience</h2>
            </div>

            <div ref={timelineContainerRef} className="relative space-y-24 pl-8 md:pl-12">
              <div className="absolute left-[15px] md:left-[23px] top-8 bottom-8 w-[6px] bg-accent/20">
                <div ref={timelineLineRef} className="w-full h-full bg-accent origin-bottom shadow-[0_0_30px_#10b981]" />
              </div>

              <div className="relative">
                <div className="absolute -left-[25px] md:-left-[33px] top-8 w-4 h-4 rounded-full bg-background border-2 border-accent z-10 shadow-[0_0_12px_#10b981]" />
                <div className="p-6 rounded-lg border border-accent bg-background/50 shadow-[0_0_20px_#22c55e]">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-semibold">Associate AI Developer</h3>
                      <p className="text-muted">EXL Service</p>
                    </div>
                    <span className="text-sm text-accent font-medium whitespace-nowrap">August 2026 - Present</span>
                  </div>
                  <div className="space-y-3 text-muted">
                    <p>→ Develop and enhance agentic AI automation solutions on Google Cloud Platform for enterprise workflows.</p>
                    <p>→ Build scalable multi-agent workflows for task orchestration and human-in-the-loop operations.</p>
                    <p>→ Integrate Vertex AI, cloud services, and APIs to deliver production-ready automation systems.</p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -left-[25px] md:-left-[33px] top-8 w-4 h-4 rounded-full bg-background border-2 border-accent z-10 shadow-[0_0_12px_#10b981]" />
                <div className="p-6 rounded-lg border border-accent bg-background/50 shadow-[0_0_20px_#22c55e]">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-semibold">AI Engineer Intern</h3>
                      <p className="text-muted">EXL Service</p>
                    </div>
                    <span className="text-sm text-accent font-medium whitespace-nowrap">April 2026 - July 2026</span>
                  </div>
                  <div className="space-y-3 text-muted">
                    <p>→ Developed and deployed Generative AI solutions using Vertex AI and Dialogflow CX.</p>
                    <p>→ Built multi-agent orchestration systems for enterprise workflow automation.</p>
                    <p>→ Achieved measurable improvements in model accuracy through prompt optimization and RAG design.</p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -left-[25px] md:-left-[33px] top-8 w-4 h-4 rounded-full bg-background border-2 border-accent z-10 shadow-[0_0_12px_#10b981]" />
                <div className="p-6 rounded-lg border border-accent bg-background/50 shadow-[0_0_20px_#22c55e]">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-semibold">ABM Intern</h3>
                      <p className="text-muted">HighRadius</p>
                    </div>
                    <span className="text-sm text-accent font-medium whitespace-nowrap">Aug 2025 - Jan 2026</span>
                  </div>
                  <div className="space-y-3 text-muted">
                    <p>→ Analyzed customer and business metrics to identify growth opportunities.</p>
                    <p>→ Built reporting dashboards and ETL workflows to improve decision-making speed.</p>
                    <p>→ Improved reporting accuracy through automated data processing and validation.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border scroll-reveal">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-2 mb-12">
              <div className="text-xs font-semibold text-accent uppercase tracking-widest">Education</div>
              <h2 className="text-3xl sm:text-4xl font-bold">Academic Background</h2>
            </div>

            <div className="p-6 rounded-lg border border-border bg-background/50 hover:border-accent hover:shadow-[0_0_20px_#22c55e] transition-all duration-300">
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

        <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border bg-secondary/30 scroll-reveal">
          <div className="max-w-2xl mx-auto">
            <div className="space-y-2 mb-12 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/20 bg-accent/5 mx-auto">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                </span>
                <span className="text-xs font-semibold uppercase tracking-widest text-accent">Get in Touch</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold">Let&apos;s Build Something Great</h2>
              <p className="text-lg text-muted">Have a project in mind or want to collaborate? Send me a message and I&apos;ll get back to you as soon as possible.</p>
            </div>

            <form onSubmit={handleFormSubmit} className="p-8 rounded-lg border border-accent bg-background/50 shadow-[0_0_20px_#22c55e]">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-foreground">Name</label>
                <input id="name" name="name" value={formData.name} onChange={handleFormChange} required placeholder="Your name" className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 text-foreground placeholder:text-muted focus:outline-none focus:border-accent" />
              </div>

              <div className="space-y-2 mt-4">
                <label htmlFor="email" className="block text-sm font-medium text-foreground">Email</label>
                <input id="email" name="email" type="email" value={formData.email} onChange={handleFormChange} required placeholder="your@email.com" className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 text-foreground placeholder:text-muted focus:outline-none focus:border-accent" />
              </div>

              <div className="space-y-2 mt-4">
                <label htmlFor="message" className="block text-sm font-medium text-foreground">Message</label>
                <textarea id="message" name="message" value={formData.message} onChange={handleFormChange} required rows={5} placeholder="Tell me about your project or inquiry..." className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 text-foreground placeholder:text-muted focus:outline-none focus:border-accent" />
              </div>

              {submitStatus === 'success' && (
                <div className="mt-4 p-4 rounded-lg bg-accent/10 border border-accent/30 text-accent text-sm">✓ Message sent successfully! I&apos;ll get back to you soon.</div>
              )}
              {submitStatus === 'error' && (
                <div className="mt-4 p-4 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-sm">✗ Failed to send. Please try again or email me directly.</div>
              )}

              <Button type="submit" disabled={isSubmitting} className="w-full mt-6 gap-2 bg-accent hover:bg-accent/90 text-accent-foreground">
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <a href="mailto:ssjsamar453@gmail.com" className="p-4 rounded-lg border border-accent bg-background/50">
                <div className="text-accent font-semibold mb-2">Email</div>
                <div className="text-sm text-muted">ssjsamar453@gmail.com</div>
              </a>
              <a href="https://www.linkedin.com/in/samarssj/" target="_blank" rel="noopener noreferrer" className="p-4 rounded-lg border border-accent bg-background/50">
                <div className="text-accent font-semibold mb-2">LinkedIn</div>
                <div className="text-sm text-muted">samarssj</div>
              </a>
              <a href="https://github.com/Samarssj" target="_blank" rel="noopener noreferrer" className="p-4 rounded-lg border border-accent bg-background/50">
                <div className="text-accent font-semibold mb-2">GitHub</div>
                <div className="text-sm text-muted">Samarssj</div>
              </a>
            </div>
          </div>
        </section>

        <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-border text-center text-muted text-sm">
          <p>© 2026 Samar Singh. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
