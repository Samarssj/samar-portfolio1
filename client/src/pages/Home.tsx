import { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import AIOrchestration from '@/components/AIOrchestration';
import AIShowcase from '@/components/AIShowcase';
import CertificationsGallery from '@/components/CertificationsGallery';
import { Github, Linkedin, Mail, Download } from 'lucide-react';

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
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('animate-fade-in-up');
            }, index * 100);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const cards = projectsRef.current?.querySelectorAll('.project-card');
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
              <span className="text-accent-foreground font-bold text-sm">SS</span>
            </div>
            <span className="font-bold text-lg hidden sm:inline">Samar Singh</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-sm text-muted hover:text-foreground transition-colors">About</a>
            <a href="#projects" className="text-sm text-muted hover:text-foreground transition-colors">Projects</a>
            <a href="#skills" className="text-sm text-muted hover:text-foreground transition-colors">Skills</a>
            <a href="#ai-showcase" className="text-sm text-muted hover:text-foreground transition-colors">AI Systems</a>
            <a href="#contact" className="text-sm text-muted hover:text-foreground transition-colors">Contact</a>
          </div>

          <div className="flex items-center gap-3">
            <a href="https://github.com/Samarssj" target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-secondary rounded-lg transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/in/samarssj/" target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-secondary rounded-lg transition-colors">
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
            <div className="h-96 lg:h-[500px] rounded-xl overflow-hidden">
              <AIOrchestration />
            </div>

            {/* Right: Hero Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary border border-border">
                  <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                  <span className="text-xs font-medium text-muted">Available for opportunities</span>
                </div>

                <div className="flex items-start gap-6">
                  <div className="flex-1">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                      AI Engineer &<br />
                      <span className="text-accent">Full-Stack Developer</span>
                    </h1>
                  </div>
                  <div className="hidden lg:block flex-shrink-0">
                    <img
                      src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663745791505/NFiqZRbGBApQcYsC.jpg"
                      alt="Samar Singh"
                      className="w-32 h-40 object-cover rounded-lg border border-accent/30 shadow-lg"
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
                  <Button className="gap-2 bg-accent hover:bg-accent/90 text-accent-foreground">
                    <Mail className="w-4 h-4" />
                    Get in Touch
                  </Button>
                </a>
                <a href="https://drive.google.com/file/d/1Ow1aLJkVwEqv9bIa_HUZXaWybPn21CIa/view?usp=drivesdk" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="gap-2">
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
                  <div className="text-2xl font-bold text-accent">5+</div>
                  <div className="text-xs text-muted uppercase tracking-wide">Projects</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-accent">9+</div>
                  <div className="text-xs text-muted uppercase tracking-wide">Certifications</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-accent">40%↑</div>
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
          <div className="space-y-6">
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
            <div className="space-y-4 p-6 rounded-lg border border-border bg-background/50 hover:border-accent/50 transition-colors">
              <h3 className="font-semibold text-foreground">Languages</h3>
              <div className="flex flex-wrap gap-2">
                {['Python', 'JavaScript', 'TypeScript', 'Java', 'SQL'].map((skill) => (
                  <span key={skill} className="px-3 py-1 text-sm rounded-full bg-secondary border border-border text-muted hover:text-foreground hover:border-accent transition-colors">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Frameworks & Libraries */}
            <div className="space-y-4 p-6 rounded-lg border border-border bg-background/50 hover:border-accent/50 transition-colors">
              <h3 className="font-semibold text-foreground">Frameworks</h3>
              <div className="flex flex-wrap gap-2">
                {['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Pandas'].map((skill) => (
                  <span key={skill} className="px-3 py-1 text-sm rounded-full bg-secondary border border-border text-muted hover:text-foreground hover:border-accent transition-colors">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* AI & Cloud */}
            <div className="space-y-4 p-6 rounded-lg border border-border bg-background/50 hover:border-accent/50 transition-colors">
              <h3 className="font-semibold text-foreground">AI & Cloud</h3>
              <div className="flex flex-wrap gap-2">
                {['Vertex AI', 'Dialogflow CX', 'Gen AI', 'GCP', 'LLMs'].map((skill) => (
                  <span key={skill} className="px-3 py-1 text-sm rounded-full bg-secondary border border-border text-muted hover:text-foreground hover:border-accent transition-colors">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Tools & Platforms */}
            <div className="space-y-4 p-6 rounded-lg border border-border bg-background/50 hover:border-accent/50 transition-colors">
              <h3 className="font-semibold text-foreground">Tools</h3>
              <div className="flex flex-wrap gap-2">
                {['Git', 'Docker', 'Kubernetes', 'REST APIs', 'CI/CD'].map((skill) => (
                  <span key={skill} className="px-3 py-1 text-sm rounded-full bg-secondary border border-border text-muted hover:text-foreground hover:border-accent transition-colors">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Databases */}
            <div className="space-y-4 p-6 rounded-lg border border-border bg-background/50 hover:border-accent/50 transition-colors">
              <h3 className="font-semibold text-foreground">Databases</h3>
              <div className="flex flex-wrap gap-2">
                {['MongoDB', 'Firestore', 'PostgreSQL', 'VectorDB'].map((skill) => (
                  <span key={skill} className="px-3 py-1 text-sm rounded-full bg-secondary border border-border text-muted hover:text-foreground hover:border-accent transition-colors">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* ML & Data */}
            <div className="space-y-4 p-6 rounded-lg border border-border bg-background/50 hover:border-accent/50 transition-colors">
              <h3 className="font-semibold text-foreground">ML & Data</h3>
              <div className="flex flex-wrap gap-2">
                {['Scikit-Learn', 'NumPy', 'Pandas', 'NLP', 'Feature Engineering'].map((skill) => (
                  <span key={skill} className="px-3 py-1 text-sm rounded-full bg-secondary border border-border text-muted hover:text-foreground hover:border-accent transition-colors">
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
        <div className="max-w-6xl mx-auto">
          <div className="space-y-2 mb-12">
            <div className="text-xs font-semibold text-accent uppercase tracking-widest">Work</div>
            <h2 className="text-3xl sm:text-4xl font-bold">Featured Projects</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" ref={projectsRef}>
            {/* Project 1 */}
            <div className="project-card group p-6 rounded-lg border border-border bg-secondary/50 hover:border-accent/50 hover:bg-secondary transition-all opacity-0">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center text-2xl">🤖</div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Enterprise AI Chatbot</h3>
              <p className="text-muted text-sm mb-4">
                Built an enterprise-grade conversational agent using Dialogflow CX with multi-turn conversation handling and intelligent routing.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-xs px-2 py-1 rounded bg-accent/10 text-accent">−50% Resolution Time</span>
                <span className="text-xs px-2 py-1 rounded bg-accent/10 text-accent">−35% Support Costs</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {['Dialogflow CX', 'Vertex AI', 'Cloud Run'].map((tech) => (
                  <span key={tech} className="text-xs text-muted bg-background/50 px-2 py-1 rounded">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Project 2 */}
            <div className="project-card group p-6 rounded-lg border border-border bg-secondary/50 hover:border-accent/50 hover:bg-secondary transition-all opacity-0">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center text-2xl">📝</div>
              </div>
              <h3 className="text-xl font-semibold mb-2">E-Blogging WebApp</h3>
              <p className="text-muted text-sm mb-4">
                Engineered a TypeScript-based blogging platform with secure authentication, CRUD operations, and MongoDB persistence.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-xs px-2 py-1 rounded bg-accent/10 text-accent">−60% Publishing Time</span>
                <span className="text-xs px-2 py-1 rounded bg-accent/10 text-accent">+40% User Efficiency</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {['TypeScript', 'Node.js', 'MongoDB'].map((tech) => (
                  <span key={tech} className="text-xs text-muted bg-background/50 px-2 py-1 rounded">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Project 3 */}
            <div className="project-card group p-6 rounded-lg border border-border bg-secondary/50 hover:border-accent/50 hover:bg-secondary transition-all opacity-0">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center text-2xl">🏠</div>
              </div>
              <h3 className="text-xl font-semibold mb-2">House Price Prediction</h3>
              <p className="text-muted text-sm mb-4">
                ML-based pricing system trained on 1,000+ real estate records with feature engineering and regression models.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-xs px-2 py-1 rounded bg-accent/10 text-accent">80% Accuracy</span>
                <span className="text-xs px-2 py-1 rounded bg-accent/10 text-accent">+15% Precision</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {['Python', 'Scikit-Learn', 'Pandas'].map((tech) => (
                  <span key={tech} className="text-xs text-muted bg-background/50 px-2 py-1 rounded">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Project 4 */}
            <div className="project-card group p-6 rounded-lg border border-border bg-secondary/50 hover:border-accent/50 hover:bg-secondary transition-all opacity-0">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center text-2xl">🧠</div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Behaviour-IQ</h3>
              <p className="text-muted text-sm mb-4">
                Behavioral analytics platform analyzing user responses to generate data-driven personality insights and assessments.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-xs px-2 py-1 rounded bg-accent/10 text-accent">−30% Manual Effort</span>
                <span className="text-xs px-2 py-1 rounded bg-accent/10 text-accent">~70% Accuracy</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {['JavaScript', 'HTML/CSS'].map((tech) => (
                  <span key={tech} className="text-xs text-muted bg-background/50 px-2 py-1 rounded">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Project 5 */}
            <div className="project-card group p-6 rounded-lg border border-border bg-secondary/50 hover:border-accent/50 hover:bg-secondary transition-all opacity-0">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center text-2xl">✈️</div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Travel Booking Platform</h3>
              <p className="text-muted text-sm mb-4">
                Full-stack travel booking application with JWT authentication, real-time availability, and responsive React frontend.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-xs px-2 py-1 rounded bg-accent/10 text-accent">−50% Booking Time</span>
                <span className="text-xs px-2 py-1 rounded bg-accent/10 text-accent">+30% User Engagement</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {['React.js', 'Node.js', 'MongoDB'].map((tech) => (
                  <span key={tech} className="text-xs text-muted bg-background/50 px-2 py-1 rounded">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Engineering Showcase */}
      <section id="ai-showcase" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <AIShowcase />
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <CertificationsGallery />
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-2 mb-12">
            <div className="text-xs font-semibold text-accent uppercase tracking-widest">Career</div>
            <h2 className="text-3xl sm:text-4xl font-bold">Work Experience</h2>
          </div>

          <div className="space-y-8">
            {/* Current Role */}
            <div className="p-6 rounded-lg border border-accent/30 bg-accent/5 hover:border-accent/50 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">AI Engineer Intern</h3>
                  <p className="text-sm text-accent font-medium">EXL Service</p>
                </div>
                <div className="inline-block px-3 py-1 rounded-full bg-accent/20 text-xs font-semibold text-accent">May 2026 - Present</div>
              </div>
              <p className="text-sm text-muted mb-4 leading-relaxed">
                Developing and deploying enterprise-grade Generative AI solutions on Google Cloud Platform. Specializing in building conversational AI agents, LLM-powered workflows, and intelligent automation systems that drive measurable business impact.
              </p>
              <ul className="space-y-2.5 text-sm text-muted">
                <li className="flex gap-3">
                  <span className="text-accent flex-shrink-0 mt-1">→</span>
                  <span><strong className="text-foreground">Generative AI Solutions:</strong> Developed and deployed AI solutions using Vertex AI, Dialogflow CX, and Cloud Run, reducing manual effort by <strong className="text-accent">35%</strong></span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent flex-shrink-0 mt-1">→</span>
                  <span><strong className="text-foreground">LLM-Powered Agents:</strong> Designed conversational agents with advanced NLU/NLP capabilities, improving response accuracy by <strong className="text-accent">40%</strong></span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent flex-shrink-0 mt-1">→</span>
                  <span><strong className="text-foreground">API-Driven Workflows:</strong> Built scalable AI workflows integrating cloud services and enterprise systems, cutting processing time by <strong className="text-accent">30%</strong></span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent flex-shrink-0 mt-1">→</span>
                  <span><strong className="text-foreground">Prompt Engineering & Evaluation:</strong> Implemented advanced prompt engineering techniques and evaluation frameworks to ensure model reliability and consistency</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent flex-shrink-0 mt-1">→</span>
                  <span><strong className="text-foreground">Operational Impact:</strong> Contributed to <strong className="text-accent">25%</strong> reduction in operational turnaround through scalable AI application delivery</span>
                </li>
              </ul>
            </div>

            {/* Previous Role */}
            <div className="p-6 rounded-lg border border-accent/30 bg-accent/5 hover:border-accent/50 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">ABM Intern</h3>
                  <p className="text-sm text-accent font-medium">HighRadius</p>
                </div>
                <div className="inline-block px-3 py-1 rounded-full bg-accent/20 text-xs font-semibold text-accent">Aug 2025 - Jan 2026</div>
              </div>
              <p className="text-sm text-muted mb-4 leading-relaxed">
                Contributed to Account-Based Marketing initiatives by leveraging data analytics and automation to identify high-value prospects and optimize campaign performance for enterprise clients.
              </p>
              <ul className="space-y-2.5 text-sm text-muted">
                <li className="flex gap-3">
                  <span className="text-accent flex-shrink-0 mt-1">→</span>
                  <span><strong className="text-foreground">Enterprise Account Analysis:</strong> Analyzed enterprise account data and customer engagement metrics to identify high-value prospects and improve targeting precision</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent flex-shrink-0 mt-1">→</span>
                  <span><strong className="text-foreground">Campaign Automation:</strong> Automated campaign performance tracking and reporting workflows, reducing manual effort by <strong className="text-accent">40%</strong></span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent flex-shrink-0 mt-1">→</span>
                  <span><strong className="text-foreground">Lead Qualification:</strong> Worked with CRM and marketing platforms to generate actionable insights, boosting lead qualification accuracy by <strong className="text-accent">30%</strong></span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent flex-shrink-0 mt-1">→</span>
                  <span><strong className="text-foreground">Cross-Functional Collaboration:</strong> Collaborated with sales and marketing teams to optimize outreach strategies and increase overall campaign efficiency</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent flex-shrink-0 mt-1">→</span>
                  <span><strong className="text-foreground">Data-Driven Insights:</strong> Generated performance dashboards and insights to track KPIs and inform strategic decision-making</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border bg-secondary/30">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-2 mb-12">
            <div className="text-xs font-semibold text-accent uppercase tracking-widest">Academic</div>
            <h2 className="text-3xl sm:text-4xl font-bold">Education</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-lg border border-border bg-background/50 hover:border-accent/50 transition-colors">
              <h3 className="text-lg font-semibold mb-2">Chitkara University, Punjab</h3>
              <p className="text-sm text-accent mb-3">B.E. Computer Science Engineering</p>
              <div className="space-y-2 text-sm text-muted">
                <p><strong className="text-foreground">CGPA:</strong> 7.76</p>
                  <p><strong className="text-foreground">Expected Graduation:</strong> Aug 2026</p>
              </div>
            </div>

            <div className="p-6 rounded-lg border border-border bg-background/50 hover:border-accent/50 transition-colors">
              <h3 className="text-lg font-semibold mb-2">MHAC School, Jammu</h3>
              <p className="text-sm text-accent mb-3">Higher Secondary Education</p>
              <div className="space-y-2 text-sm text-muted">
                <p><strong className="text-foreground">Class XII:</strong> 76%</p>
                <p><strong className="text-foreground">Class X:</strong> 87%</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold">Let's Build Together</h2>
            <p className="text-lg text-muted">
              Open to AI engineering roles, Full Stack Development, Freelance projects, and Collaborations.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <a href="mailto:ssjsamar453@gmail.com" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 transition-colors font-medium">
              <Mail className="w-4 h-4" />
              Email Me
            </a>
            <a href="https://www.linkedin.com/in/samarssj/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border hover:border-accent hover:bg-secondary transition-colors font-medium">
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </a>
            <a href="https://github.com/Samarssj" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border hover:border-accent hover:bg-secondary transition-colors font-medium">
              <Github className="w-4 h-4" />
              GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-border text-center text-sm text-muted">
        <p>Designed & built by Samar Singh · 2026</p>
        <p className="text-xs mt-2 text-muted/70">Powered by React, TypeScript, and Tailwind CSS</p>
      </footer>
    </div>
  );
}
