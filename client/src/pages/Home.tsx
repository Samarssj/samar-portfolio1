import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import AIOrchestration from '@/components/AIOrchestration';
import AIShowcase from '@/components/AIShowcase';
import CertificationsGallery from '@/components/CertificationsGallery';
import SpotifyWidget from '@/components/SpotifyWidget';
import { Github, Linkedin, Mail, Download, Moon, Sun } from 'lucide-react';



/**
 * Home Page - Premium AI Engineer Portfolio
 * 
 * Design Philosophy: Enterprise AI infrastructure dashboard aesthetic
 * - Sophisticated dark theme with charcoal, graphite, emerald, and amber accents
 * - Live AI orchestration visualization in hero
 * - Smooth animations and micro-interactions
 * - Professional, technical, forward-thinking
 */

export default function Home() {
  const [isDark, setIsDark] = useState(true);
  const projectsRef = useRef<HTMLDivElement>(null);

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
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          const animationClass = entry.target.getAttribute('data-animation') || 'animate-fade-in-up';
          setTimeout(() => {
            entry.target.classList.add(animationClass);
          }, index * 80);
        }
      });
    }, observerOptions);

    // Observe all content boxes with data-animation attribute
    const contentBoxes = document.querySelectorAll('[data-animation]');
    contentBoxes.forEach((box) => observer.observe(box));

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

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SpotifyWidget />
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-center md:justify-between">
          <div className="flex items-center gap-2 md:flex-1">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
              <span className="text-accent-foreground font-bold text-sm">SS</span>
            </div>
            <span className="font-bold text-lg">Samar Singh</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 flex-1 justify-center">
            <a href="#about" className="text-sm text-muted hover:text-foreground active:text-accent transition-colors cursor-pointer">About</a>
            <a href="#projects" className="text-sm text-muted hover:text-foreground active:text-accent transition-colors cursor-pointer">Projects</a>
            <a href="#skills" className="text-sm text-muted hover:text-foreground active:text-accent transition-colors cursor-pointer">Skills</a>
            <a href="#ai-showcase" className="text-sm text-muted hover:text-foreground active:text-accent transition-colors cursor-pointer">AI Systems</a>
            <a href="#contact" className="text-sm text-muted hover:text-foreground active:text-accent transition-colors cursor-pointer">Contact</a>
          </div>

          <div className="flex items-center gap-3 md:flex-1 md:justify-end">
            <button onClick={toggleDarkMode} className="p-2 hover:bg-secondary active:bg-accent/20 rounded-lg transition-colors" aria-label="Toggle dark mode">
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <a href="https://github.com/Samarssj" target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-secondary active:bg-accent/20 rounded-lg transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/in/samarssj/" target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-secondary active:bg-accent/20 rounded-lg transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
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
                      AI Engineer &<br />
                      <span className="text-accent">Full-Stack Developer</span>
                    </h1>
                  </div>
                  <div className="flex-shrink-0">
                    <img
                      src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663745791505/NFiqZRbGBApQcYsC.jpg"
                      alt="Samar Singh"
                      className="w-24 h-32 sm:w-32 sm:h-40 object-cover rounded-lg border border-accent/30 shadow-lg"
                    />
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
                <a href="https://drive.google.com/file/d/1o_w_ES_hotYhv4HiPzucbpBy9P2WMpwP/view?usp=drivesdk" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="gap-2 hover:border-accent active:bg-accent/10 transition-all">
                    <Download className="w-4 h-4" />
                    Resume
                  </Button>
                </a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-border">
                <div>
                  <div className="text-2xl font-bold text-accent">2+</div>
                  <div className="text-xs text-muted uppercase tracking-wide">Internships</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-accent">7+</div>
                  <div className="text-xs text-muted uppercase tracking-wide">Projects</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-accent">11+</div>
                  <div className="text-xs text-muted uppercase tracking-wide">Certifications</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-accent">74+%↑</div>
                  <div className="text-xs text-muted uppercase tracking-wide">AI Accuracy</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6" data-animation="animate-fade-in-up">
            <div className="space-y-2">
              <div className="text-xs font-semibold text-accent uppercase tracking-widest">About</div>
              <h2 className="text-3xl sm:text-4xl font-bold">Who I Am</h2>
            </div>

            <div className="space-y-4 text-muted leading-relaxed">
              <p>
                I'm an AI Engineer and Full-Stack Developer passionate about building intelligent systems that solve real-world problems. Currently working at <strong className="text-foreground">EXL Service</strong> as an AI Engineer Intern, where I develop and deploy Generative AI solutions using Google Cloud technologies.
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
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border bg-secondary/30">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-2 mb-12">
            <div className="text-xs font-semibold text-accent uppercase tracking-widest">Toolkit</div>
            <h2 className="text-3xl sm:text-4xl font-bold">Skills & Expertise</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Languages */}
            <div className="p-6 rounded-lg border border-accent bg-background/50 shadow-[0_0_20px_#22c55e] active:bg-accent/10 active:scale-[0.99] md:border-border md:shadow-none hover:scale-[1.01] md:hover:border-accent md:hover:shadow-[0_0_20px_#22c55e] transition-all duration-300 cursor-pointer">
              <h3 className="font-semibold text-foreground">Languages</h3>
              <div className="flex flex-wrap gap-2">
                {['Python', 'JavaScript', 'TypeScript', 'Java', 'SQL'].map((skill) => (
                  <span key={skill} className="px-3 py-1 text-sm rounded-full bg-secondary border border-border text-muted hover:text-foreground hover:border-accent active:bg-accent/20 transition-colors">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Frameworks & Libraries */}
            <div className="p-6 rounded-lg border border-accent bg-background/50 shadow-[0_0_20px_#22c55e] active:bg-accent/10 active:scale-[0.99] md:border-border md:shadow-none hover:scale-[1.01] md:hover:border-accent md:hover:shadow-[0_0_20px_#22c55e] transition-all duration-300 cursor-pointer">
              <h3 className="font-semibold text-foreground">Frameworks</h3>
              <div className="flex flex-wrap gap-2">
                {['React.js', 'Node.js', 'Express.js', 'LangChain', 'JWTs'].map((skill) => (
                  <span key={skill} className="px-3 py-1 text-sm rounded-full bg-secondary border border-border text-muted hover:text-foreground hover:border-accent active:bg-accent/20 transition-colors">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* AI & Cloud */}
            <div className="p-6 rounded-lg border border-accent bg-background/50 shadow-[0_0_20px_#22c55e] active:bg-accent/10 active:scale-[0.99] md:border-border md:shadow-none hover:scale-[1.01] md:hover:border-accent md:hover:shadow-[0_0_20px_#22c55e] transition-all duration-300 cursor-pointer">
              <h3 className="font-semibold text-foreground">AI & Cloud</h3>
              <div className="flex flex-wrap gap-2">
                {['Vertex AI', 'Dialogflow CX', 'Gen AI', 'GCP', 'LLMs', 'RAG', 'ADK'].map((skill) => (
                  <span key={skill} className="px-3 py-1 text-sm rounded-full bg-secondary border border-border text-muted hover:text-foreground hover:border-accent active:bg-accent/20 transition-colors">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Tools & Platforms */}
            <div className="p-6 rounded-lg border border-accent bg-background/50 shadow-[0_0_20px_#22c55e] active:bg-accent/10 active:scale-[0.99] md:border-border md:shadow-none hover:scale-[1.01] md:hover:border-accent md:hover:shadow-[0_0_20px_#22c55e] transition-all duration-300 cursor-pointer">
              <h3 className="font-semibold text-foreground">Tools</h3>
              <div className="flex flex-wrap gap-2">
                {['Git', 'Docker', 'Kubernetes', 'REST APIs', 'CI/CD', 'WebHooks'].map((skill) => (
                  <span key={skill} className="px-3 py-1 text-sm rounded-full bg-secondary border border-border text-muted hover:text-foreground hover:border-accent active:bg-accent/20 transition-colors">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Databases */}
            <div className="p-6 rounded-lg border border-accent bg-background/50 shadow-[0_0_20px_#22c55e] active:bg-accent/10 active:scale-[0.99] md:border-border md:shadow-none hover:scale-[1.01] md:hover:border-accent md:hover:shadow-[0_0_20px_#22c55e] transition-all duration-300 cursor-pointer">
              <h3 className="font-semibold text-foreground">Databases</h3>
              <div className="flex flex-wrap gap-2">
                {['MongoDB', 'Firestore', 'BigQuery', 'VectorDB'].map((skill) => (
                  <span key={skill} className="px-3 py-1 text-sm rounded-full bg-secondary border border-border text-muted hover:text-foreground hover:border-accent active:bg-accent/20 transition-colors">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* ML & Data */}
            <div className="p-6 rounded-lg border border-accent bg-background/50 shadow-[0_0_20px_#22c55e] active:bg-accent/10 active:scale-[0.99] md:border-border md:shadow-none hover:scale-[1.01] md:hover:border-accent md:hover:shadow-[0_0_20px_#22c55e] transition-all duration-300 cursor-pointer">
              <h3 className="font-semibold text-foreground">ML & Data</h3>
              <div className="flex flex-wrap gap-2">
                {['Scikit-Learn', 'NumPy', 'Pandas', 'NLP', 'EDA', 'Feature & Prompt Engineering'].map((skill) => (
                  <span key={skill} className="px-3 py-1 text-sm rounded-full bg-secondary border border-border text-muted hover:text-foreground hover:border-accent active:bg-accent/20 transition-colors">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-2 mb-12">
            <div className="text-xs font-semibold text-accent uppercase tracking-widest">Portfolio</div>
            <h2 className="text-3xl sm:text-4xl font-bold">Featured Projects</h2>
          </div>

          <div ref={projectsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Project 1 */}
            <div className="p-6 rounded-lg border border-accent bg-background/50 shadow-[0_0_20px_#22c55e] active:bg-accent/10 active:scale-[0.99] md:border-border md:shadow-none hover:scale-[1.01] md:hover:border-accent md:hover:shadow-[0_0_20px_#22c55e] transition-all duration-300 cursor-pointer">
            <div className="space-y-4">
    <h3 className="text-xl font-semibold">
      Enterprise AI Chatbot
    </h3>

    <p className="text-sm text-muted leading-relaxed">
      Built an enterprise-grade conversational AI platform capable of
      automating customer support workflows, intent recognition,
      knowledge retrieval, multi-turn conversations, and escalation
      handling using Vertex AI and Dialogflow CX.
    </p>

    <div className="grid grid-cols-3 gap-4 border-y border-border py-4">
      <div>
        <p className="text-accent text-xl font-bold">85%</p>
        <p className="text-xs text-muted">User Satisfaction</p>
      </div>

      <div>
        <p className="text-accent text-xl font-bold">40%</p>
        <p className="text-xs text-muted">Ticket Reduction</p>
      </div>

      <div>
        <p className="text-accent text-xl font-bold">60%</p>
        <p className="text-xs text-muted">Faster Resolution</p>
      </div>
    </div>

    <div className="flex flex-wrap gap-2">
      <span className="px-3 py-1 text-xs rounded-full border border-border">
        Vertex AI
      </span>
      <span className="px-3 py-1 text-xs rounded-full border border-border">
        Dialogflow CX
      </span>
      <span className="px-3 py-1 text-xs rounded-full border border-border">
        GCP
      </span>
      <span className="px-3 py-1 text-xs rounded-full border border-border">
        OPEN API Tools
      </span>
    </div>

    <div className="pt-2">
      <a
        href="https://github.com/Samarssj/Enterprise-Agent"
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full text-center px-4 py-2 rounded-lg border border-border hover:border-accent hover:text-accent transition"
      >
        💻 View on GitHub
      </a>
    </div>
  </div>
</div>
          {/* Project 2 */}
            <div className="p-6 rounded-lg border border-accent bg-background/50 shadow-[0_0_20px_#22c55e] active:bg-accent/10 active:scale-[0.99] md:border-border md:shadow-none hover:scale-[1.01] md:hover:border-accent md:hover:shadow-[0_0_20px_#22c55e] transition-all duration-300 cursor-pointer">
  <div className="space-y-4">
    <h3 className="text-xl font-semibold">
      Movie Review Sentiment Analysis
    </h3>

    <p className="text-sm text-muted leading-relaxed">
      Developed an end-to-end NLP application that classifies movie
      reviews into five sentiment categories using TF-IDF feature
      extraction and machine learning. Compared multiple classification
      models and deployed the best-performing model (linear tuned SVM) through an
      interactive Streamlit web application for real-time sentiment
      prediction.
    </p>

    <div className="grid grid-cols-3 gap-4 border-y border-border py-4">
      <div>
        <p className="text-accent text-xl font-bold">5</p>
        <p className="text-xs text-muted">Sentiment Classes</p>
      </div>

      <div>
        <p className="text-accent text-xl font-bold">4+</p>
        <p className="text-xs text-muted">ML Models Compared</p>
      </div>

      <div>
        <p className="text-accent text-xl font-bold">TF-IDF</p>
        <p className="text-xs text-muted">Feature Engineering</p>
      </div>
    </div>

    <div className="flex flex-wrap gap-2">
      <span className="px-3 py-1 text-xs rounded-full border border-border">
        Python
      </span>
      <span className="px-3 py-1 text-xs rounded-full border border-border">
        Scikit-Learn
      </span>
      <span className="px-3 py-1 text-xs rounded-full border border-border">
        Streamlit
      </span>
      <span className="px-3 py-1 text-xs rounded-full border border-border">
        TF-IDF
      </span>
      <span className="px-3 py-1 text-xs rounded-full border border-border">
        Pandas
      </span>
      <span className="px-3 py-1 text-xs rounded-full border border-border">
        NumPy
      </span>
    </div>

    <div className="flex gap-3 pt-2">
      <a
        href="https://samarssj-movie-review-sentiment-analysis-appapp-z7ohdt.streamlit.app"
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 text-center px-4 py-2 rounded-lg bg-accent text-background font-medium hover:opacity-90 transition"
      >
        🚀 Live Demo
      </a>

      <a
        href="https://github.com/Samarssj/movie-review-sentiment-analysis"
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 text-center px-4 py-2 rounded-lg border border-border hover:border-accent hover:text-accent transition"
      >
        💻 GitHub
      </a>
    </div>
  </div>
</div>

{/* Project 3 */}
           <div className="p-6 rounded-lg border border-accent bg-background/50 shadow-[0_0_20px_#22c55e] active:bg-accent/10 active:scale-[0.99] md:border-border md:shadow-none hover:scale-[1.01] md:hover:border-accent md:hover:shadow-[0_0_20px_#22c55e] transition-all duration-300 cursor-pointer">
  <div className="space-y-4">
    <h3 className="text-xl font-semibold">
      News Pilot — Hybrid AI News Intelligence Platform
    </h3>

    <p className="text-sm text-muted leading-relaxed">
      Developed an intelligent Hybrid RAG-powered news assistant that
      fetches live news from RSS feeds and NewsAPI, indexes articles in
      ChromaDB using Sentence Transformers, and delivers source-backed
      answers. The system intelligently falls back to Google Gemini's
      general knowledge whenever relevant news is unavailable, ensuring
      accurate and reliable responses through an interactive Streamlit
      interface.
    </p>

    <div className="grid grid-cols-3 gap-4 border-y border-border py-4">
      <div>
        <p className="text-accent text-xl font-bold">Hybrid</p>
        <p className="text-xs text-muted">RAG + Gemini</p>
      </div>

      <div>
        <p className="text-accent text-xl font-bold">ChromaDB</p>
        <p className="text-xs text-muted">Vector Store</p>
      </div>

      <div>
        <p className="text-accent text-xl font-bold">Live</p>
        <p className="text-xs text-muted">News Retrieval</p>
      </div>
    </div>

    <div className="flex flex-wrap gap-2">
      <span className="px-3 py-1 text-xs rounded-full border border-border">
        Python
      </span>

      <span className="px-3 py-1 text-xs rounded-full border border-border">
        Streamlit
      </span>

      <span className="px-3 py-1 text-xs rounded-full border border-border">
        Gemini API
      </span>

      <span className="px-3 py-1 text-xs rounded-full border border-border">
        ChromaDB
      </span>

      <span className="px-3 py-1 text-xs rounded-full border border-border">
        Sentence Transformers
      </span>

      <span className="px-3 py-1 text-xs rounded-full border border-border">
        RAG
      </span>

      <span className="px-3 py-1 text-xs rounded-full border border-border">
        NewsAPI
      </span>

      <span className="px-3 py-1 text-xs rounded-full border border-border">
        RSS Feeds
      </span>
    </div>

    <div className="flex gap-3 pt-2">
      <a
        href="https://samarssj-newspilot-app-qbihoh.streamlit.app"
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 text-center px-4 py-2 rounded-lg bg-accent text-background font-medium hover:opacity-90 transition"
      >
        🚀 Live Demo
      </a>

      <a
        href="https://github.com/Samarssj/NewsPilot"
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 text-center px-4 py-2 rounded-lg border border-border hover:border-accent hover:text-accent transition"
      >
        💻 GitHub
      </a>
    </div>
  </div>
</div>

{/* Project 4 */}
            <div className="p-6 rounded-lg border border-accent bg-background/50 shadow-[0_0_20px_#22c55e] active:bg-accent/10 active:scale-[0.99] md:border-border md:shadow-none hover:scale-[1.01] md:hover:border-accent md:hover:shadow-[0_0_20px_#22c55e] transition-all duration-300 cursor-pointer">
  <div className="space-y-4">
    <h3 className="text-xl font-semibold">
      E-Blogging Platform
    </h3>

    <p className="text-sm text-muted leading-relaxed">
      Developed a full-stack blogging platform with secure user
      authentication, CRUD functionality, responsive UI, RESTful APIs,
      and MongoDB integration, enabling users to create, edit, and
      manage blog posts seamlessly.
    </p>

    <div className="grid grid-cols-3 gap-4 border-y border-border py-4">
      <div>
        <p className="text-accent text-xl font-bold">CRUD</p>
        <p className="text-xs text-muted">Blog Management</p>
      </div>

      <div>
        <p className="text-accent text-xl font-bold">JWT</p>
        <p className="text-xs text-muted">Authentication</p>
      </div>

      <div>
        <p className="text-accent text-xl font-bold">REST</p>
        <p className="text-xs text-muted">API Architecture</p>
      </div>
    </div>

    <div className="flex flex-wrap gap-2">
      <span className="px-3 py-1 text-xs rounded-full border border-border">
        TypeScript
      </span>
      <span className="px-3 py-1 text-xs rounded-full border border-border">
        Node.js
      </span>
      <span className="px-3 py-1 text-xs rounded-full border border-border">
        Express.js
      </span>
      <span className="px-3 py-1 text-xs rounded-full border border-border">
        MongoDB
      </span>
      <span className="px-3 py-1 text-xs rounded-full border border-border">
        REST APIs
      </span>
      <span className="px-3 py-1 text-xs rounded-full border border-border">
        Bootstrap
      </span>
    </div>

    <div className="pt-2">
      <a
        href="https://github.com/Samarssj/eBlogging-webapp"
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full text-center px-4 py-2 rounded-lg border border-border hover:border-accent hover:text-accent transition"
      >
        💻 View on GitHub
      </a>
    </div>
  </div>
</div>

{/* Project 5 */}
           <div className="p-6 rounded-lg border border-accent bg-background/50 shadow-[0_0_20px_#22c55e] active:bg-accent/10 active:scale-[0.99] md:border-border md:shadow-none hover:scale-[1.01] md:hover:border-accent md:hover:shadow-[0_0_20px_#22c55e] transition-all duration-300 cursor-pointer">
  <div className="space-y-4">
    <h3 className="text-xl font-semibold">
      Clearance Desk
    </h3>

    <p className="text-sm text-muted leading-relaxed">
      Built an AI-powered resume parser and Job Description matcher that extracts candidate information using hybrid rule-based parsing with Gemini fallback, then scores resumes through semantic similarity, skill matching, and experience analysis.
    </p>

    <div className="grid grid-cols-3 gap-4 border-y border-border py-4">
      <div>
        <p className="text-accent text-xl font-bold">AI</p>
        <p className="text-xs text-muted">Resume Parsing</p>
      </div>

      <div>
        <p className="text-accent text-xl font-bold">Hybrid</p>
        <p className="text-xs text-muted">Rule + LLM</p>
      </div>

      <div>
        <p className="text-accent text-xl font-bold">ATS</p>
        <p className="text-xs text-muted">Resume Matching</p>
      </div>
    </div>

    <div className="flex flex-wrap gap-2">
      <span className="px-3 py-1 text-xs rounded-full border border-border">
        Python
      </span>
      <span className="px-3 py-1 text-xs rounded-full border border-border">
        Streamlit
      </span>
      <span className="px-3 py-1 text-xs rounded-full border border-border">
        Gemini API
      </span>
      <span className="px-3 py-1 text-xs rounded-full border border-border">
        PDF Parsing
      </span>
      <span className="px-3 py-1 text-xs rounded-full border border-border">
        RapidFuzz
      </span>
      <span className="px-3 py-1 text-xs rounded-full border border-border">
        NLP
      </span>
    </div>

    <div className="flex gap-3 pt-2">
      <a
        href="https://samarssj-clerance-desk-app-4ik4yy.streamlit.app"
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 text-center px-4 py-2 rounded-lg bg-accent text-background font-medium hover:opacity-90 transition"
      >
        🚀 Live Demo
      </a>

      <a
        href="https://github.com/Samarssj/Clearance_desk"
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 text-center px-4 py-2 rounded-lg border border-border hover:border-accent hover:text-accent transition"
      >
        💻 GitHub
      </a>
    </div>
  </div>
</div>

         {/* Project 6 */}   
<div className="p-6 rounded-lg border border-accent bg-background/50 shadow-[0_0_20px_#22c55e] active:bg-accent/10 active:scale-[0.99] md:border-border md:shadow-none hover:scale-[1.01] md:hover:border-accent md:hover:shadow-[0_0_20px_#22c55e] transition-all duration-300 cursor-pointer">
  <div className="space-y-4">
    <h3 className="text-xl font-semibold">
      House Price Prediction
    </h3>

    <p className="text-sm text-muted leading-relaxed">
      Built a machine learning application with a sign up feature that predicts residential property prices using regression techniques. Trained and evaluated multiple models, then deployed the best-performing model (XG Boost) through an interactive web interface for real-time predictions.
    </p>

    <div className="grid grid-cols-3 gap-4 border-y border-border py-4">
      <div>
        <p className="text-accent text-xl font-bold">Regression</p>
        <p className="text-xs text-muted">4+ML models</p>
      </div>

      <div>
        <p className="text-accent text-xl font-bold">Real-Time</p>
        <p className="text-xs text-muted">Predictions</p>
      </div>

      <div>
        <p className="text-accent text-xl font-bold">EDA</p>
        <p className="text-xs text-muted">Data Analysis</p>
      </div>
    </div>

    <div className="flex flex-wrap gap-2">
      <span className="px-3 py-1 text-xs rounded-full border border-border">
        Python
      </span>
      <span className="px-3 py-1 text-xs rounded-full border border-border">
        Scikit-Learn
      </span>
      <span className="px-3 py-1 text-xs rounded-full border border-border">
        Pandas
      </span>
      <span className="px-3 py-1 text-xs rounded-full border border-border">
        NumPy
      </span>
      <span className="px-3 py-1 text-xs rounded-full border border-border">
        Jupyter Notebook
      </span>
      <span className="px-3 py-1 text-xs rounded-full border border-border">
        Machine Learning
      </span>
    </div>

    <div className="flex gap-3 pt-2">
      <a
        href="https://house-price-predictor-pied.vercel.app"
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 text-center px-4 py-2 rounded-lg bg-accent text-background font-medium hover:opacity-90 transition"
      >
        🚀 Live Demo
      </a>

      <a
        href="https://github.com/Samarssj/Housing-price-predictor"
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 text-center px-4 py-2 rounded-lg border border-border hover:border-accent hover:text-accent transition"
      >
        💻 GitHub
      </a>
    </div>
  </div>
</div>
            
{/* Project 7 */}
            <div className="p-6 rounded-lg border border-accent bg-background/50 shadow-[0_0_20px_#22c55e] active:bg-accent/10 active:scale-[0.99] md:border-border md:shadow-none hover:scale-[1.01] md:hover:border-accent md:hover:shadow-[0_0_20px_#22c55e] transition-all duration-300 cursor-pointer">
  <div className="space-y-4">
    <h3 className="text-xl font-semibold">
      Travel Booking Platform
    </h3>

    <p className="text-sm text-muted leading-relaxed">
      Developed a full-stack travel booking platform that enables users
      to browse destinations, search travel options, and manage bookings
      through a responsive interface, secure REST APIs, and MongoDB-backed
      data management.
    </p>

    <div className="grid grid-cols-3 gap-4 border-y border-border py-4">
      <div>
        <p className="text-accent text-xl font-bold">CRUD</p>
        <p className="text-xs text-muted">Booking Management</p>
      </div>

      <div>
        <p className="text-accent text-xl font-bold">REST</p>
        <p className="text-xs text-muted">API Integration</p>
      </div>

      <div>
        <p className="text-accent text-xl font-bold">Responsive</p>
        <p className="text-xs text-muted">User Experience</p>
      </div>
    </div>

    <div className="flex flex-wrap gap-2">
      <span className="px-3 py-1 text-xs rounded-full border border-border">
        React.js
      </span>
      <span className="px-3 py-1 text-xs rounded-full border border-border">
        Node.js
      </span>
      <span className="px-3 py-1 text-xs rounded-full border border-border">
        Express.js
      </span>
      <span className="px-3 py-1 text-xs rounded-full border border-border">
        MongoDB
      </span>
      <span className="px-3 py-1 text-xs rounded-full border border-border">
        REST APIs
      </span>
      <span className="px-3 py-1 text-xs rounded-full border border-border">
        React
      </span>
    </div>

    <div className="pt-2">
      <a
        href="https://github.com/Samarssj/TEsystem"
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full text-center px-4 py-2 rounded-lg border border-border hover:border-accent hover:text-accent transition"
      >
        💻 View on GitHub
      </a>
    </div>
  </div>
</div>
            {/* Project 8 */}
            <div className="p-6 rounded-lg border border-accent bg-background/50 shadow-[0_0_20px_#22c55e] active:bg-accent/10 active:scale-[0.99] md:border-border md:shadow-none hover:scale-[1.01] md:hover:border-accent md:hover:shadow-[0_0_20px_#22c55e] transition-all duration-300 cursor-pointer">
  <div className="space-y-4">
    <h3 className="text-xl font-semibold">
      FlowCast
    </h3>
    <p className="text-sm text-muted leading-relaxed">
      Built an ML-powered menstrual cycle prediction app trained on real-world cycle data, combining a rolling-average baseline with a regression model to forecast next period start dates, complete with an interactive cycle logging and symptom-tracking dashboard.
    </p>
    <div className="grid grid-cols-3 gap-4 border-y border-border py-4">
      <div>
        <p className="text-accent text-xl font-bold">ML</p>
        <p className="text-xs text-muted">Cycle Prediction</p>
      </div>
      <div>
        <p className="text-accent text-xl font-bold">±1.8d</p>
        <p className="text-xs text-muted">Avg. Model Error</p>
      </div>
      <div>
        <p className="text-accent text-xl font-bold">159</p>
        <p className="text-xs text-muted">Users in Training Data</p>
      </div>
    </div>
    <div className="flex flex-wrap gap-2">
      <span className="px-3 py-1 text-xs rounded-full border border-border">
        Python
      </span>
      <span className="px-3 py-1 text-xs rounded-full border border-border">
        Streamlit
      </span>
      <span className="px-3 py-1 text-xs rounded-full border border-border">
        scikit-learn
      </span>
      <span className="px-3 py-1 text-xs rounded-full border border-border">
        Pandas
      </span>
      <span className="px-3 py-1 text-xs rounded-full border border-border">
        Regression
      </span>
      <span className="px-3 py-1 text-xs rounded-full border border-border">
        Feature Engineering
      </span>
    </div>
    <div className="flex gap-3 pt-2">
      
        href="https://period-predictor-kxssmdhkv2qxjqymovkkro.streamlit.app"
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 text-center px-4 py-2 rounded-lg bg-accent text-background font-medium hover:opacity-90 transition"
      >
        🚀 Live Demo
      </a>
      
        href="https://github.com/Samarssj/Period-Predictor"
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 text-center px-4 py-2 rounded-lg border border-border hover:border-accent hover:text-accent transition"
      >
        💻 GitHub
      </a>
    </div>
  </div>
</div>
          </div> {/* projects grid */}
        </div>   {/* max-w-4xl */}
      </section>

      {/* AI Engineering Showcase */}
      <section id="ai-showcase" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border bg-secondary/30">
        <div className="max-w-4xl mx-auto">
          <AIShowcase />
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-2 mb-12">
          </div>

          <CertificationsGallery />
        </div>
      </section>

      {/* Experience */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border bg-secondary/30">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-2 mb-12">
            <div className="text-xs font-semibold text-accent uppercase tracking-widest">Career</div>
            <h2 className="text-3xl sm:text-4xl font-bold">Work Experience</h2>
          </div>

          <div className="space-y-8">
            {/* EXL Service */}
            <div className="p-6 rounded-lg border border-accent bg-background/50 shadow-[0_0_20px_#22c55e] active:bg-accent/10 active:scale-[0.99] md:border-border md:shadow-none hover:scale-[1.01] md:hover:border-accent md:hover:shadow-[0_0_20px_#22c55e] transition-all duration-300 cursor-pointer">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-semibold">AI Engineer Intern</h3>
                  <p className="text-muted">EXL Service</p>
                </div>
                <span className="text-sm text-accent font-medium whitespace-nowrap">April 2026 - Present</span>
              </div>
              <div className="space-y-3 text-muted">
                <p>→ Developed and deployed Generative AI solutions using Vertex AI and Dialogflow CX on Google Cloud Platform</p>
                <p>→ Built multi-agent orchestration systems for enterprise workflow automation and task delegation</p>
                <p>→ Optimized LLM prompts and implemented RAG pipelines for improved accuracy and context awareness</p>
                <p>→ Collaborated with cross-functional teams to integrate AI solutions into production environments</p>
                <p>→ Achieved 40%+ improvement in AI model accuracy through fine-tuning and feature engineering</p>
              </div>
            </div>

            {/* HighRadius */}
            <div className="p-6 rounded-lg border border-accent bg-background/50 shadow-[0_0_20px_#22c55e] active:bg-accent/10 active:scale-[0.99] md:border-border md:shadow-none hover:scale-[1.01] md:hover:border-accent md:hover:shadow-[0_0_20px_#22c55e] transition-all duration-300 cursor-pointer">
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
      </section>

      {/* Education */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-2 mb-12">
            <div className="text-xs font-semibold text-accent uppercase tracking-widest">Education</div>
            <h2 className="text-3xl sm:text-4xl font-bold">Academic Background</h2>
          </div>

          <div className="p-6 rounded-lg border border-border bg-background/50 hover:scale-[1.01] hover:border-accent hover:shadow-[0_0_20px_#22c55e] transition-all duration-300 cursor-pointer">
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
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border bg-secondary/30">
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

          <form onSubmit={handleFormSubmit} className="p-8 rounded-lg border border-accent bg-background/50 shadow-[0_0_20px_#22c55e] active:bg-accent/10 active:scale-[0.99] md:border-border md:shadow-none hover:scale-[1.01] md:hover:border-accent md:hover:shadow-[0_0_20px_#22c55e] transition-all duration-300 cursor-pointer">
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
  );
}
