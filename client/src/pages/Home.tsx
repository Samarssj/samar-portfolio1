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

  // Add smooth scroll behavior
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  // Scroll animation observer for project cards
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
                <a href="https://drive.google.com/file/d/1Ow1aLJkVwEqv9bIa_HUZXaWybPn21CIa/view?usp=drivesdk" target="_blank" rel="noopener noreferrer">
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
            <div className="space-y-4 p-6 rounded-lg border border-border bg-background/50 hover:border-accent/50 active:border-accent transition-colors">
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
            <div className="space-y-4 p-6 rounded-lg border border-border bg-background/50 hover:border-accent/50 active:border-accent transition-colors">
              <h3 className="font-semibold text-foreground">Frameworks</h3>
              <div className="flex flex-wrap gap-2">
                {['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Pandas'].map((skill) => (
                  <span key={skill} className="px-3 py-1 text-sm rounded-full bg-secondary border border-border text-muted hover:text-foreground hover:border-accent active:bg-accent/20 transition-colors">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* AI & Cloud */}
            <div className="space-y-4 p-6 rounded-lg border border-border bg-background/50 hover:border-accent/50 active:border-accent transition-colors">
              <h3 className="font-semibold text-foreground">AI & Cloud</h3>
              <div className="flex flex-wrap gap-2">
                {['Vertex AI', 'Dialogflow CX', 'Gen AI', 'GCP', 'LLMs'].map((skill) => (
                  <span key={skill} className="px-3 py-1 text-sm rounded-full bg-secondary border border-border text-muted hover:text-foreground hover:border-accent active:bg-accent/20 transition-colors">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Tools & Platforms */}
            <div className="space-y-4 p-6 rounded-lg border border-border bg-background/50 hover:border-accent/50 active:border-accent transition-colors">
              <h3 className="font-semibold text-foreground">Tools</h3>
              <div className="flex flex-wrap gap-2">
                {['Git', 'Docker', 'Kubernetes', 'REST APIs', 'CI/CD'].map((skill) => (
                  <span key={skill} className="px-3 py-1 text-sm rounded-full bg-secondary border border-border text-muted hover:text-foreground hover:border-accent active:bg-accent/20 transition-colors">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Databases */}
            <div className="space-y-4 p-6 rounded-lg border border-border bg-background/50 hover:border-accent/50 active:border-accent transition-colors">
              <h3 className="font-semibold text-foreground">Databases</h3>
              <div className="flex flex-wrap gap-2">
                {['MongoDB', 'Firestore', 'PostgreSQL', 'VectorDB'].map((skill) => (
                  <span key={skill} className="px-3 py-1 text-sm rounded-full bg-secondary border border-border text-muted hover:text-foreground hover:border-accent active:bg-accent/20 transition-colors">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* ML & Data */}
            <div className="space-y-4 p-6 rounded-lg border border-border bg-background/50 hover:border-accent/50 active:border-accent transition-colors">
              <h3 className="font-semibold text-foreground">ML & Data</h3>
              <div className="flex flex-wrap gap-2">
                {['Scikit-Learn', 'NumPy', 'Pandas', 'NLP', 'Feature Engineering'].map((skill) => (
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
            <div className="project-card p-6 rounded-lg border border-border bg-background/50 hover:border-accent/50 active:border-accent hover:shadow-lg transition-all opacity-0">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Enterprise AI Chatbot</h3>
                  <p className="text-sm text-muted">Generative AI solution using Vertex AI and Dialogflow CX</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 text-xs rounded bg-secondary border border-border text-muted">Vertex AI</span>
                  <span className="px-2 py-1 text-xs rounded bg-secondary border border-border text-muted">Dialogflow CX</span>
                  <span className="px-2 py-1 text-xs rounded bg-secondary border border-border text-muted">GCP</span>
                </div>
              </div>
            </div>

            {/* Project 2 */}
            <div className="project-card p-6 rounded-lg border border-border bg-background/50 hover:border-accent/50 active:border-accent hover:shadow-lg transition-all opacity-0">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">House Price Prediction</h3>
                  <p className="text-sm text-muted">ML model for real estate price forecasting</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 text-xs rounded bg-secondary border border-border text-muted">Python</span>
                  <span className="px-2 py-1 text-xs rounded bg-secondary border border-border text-muted">Scikit-Learn</span>
                  <span className="px-2 py-1 text-xs rounded bg-secondary border border-border text-muted">Pandas</span>
                </div>
              </div>
            </div>

            {/* Project 3 */}
            <div className="project-card p-6 rounded-lg border border-border bg-background/50 hover:border-accent/50 active:border-accent hover:shadow-lg transition-all opacity-0">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">E-Blogging WebApp</h3>
                  <p className="text-sm text-muted">Full-stack blogging platform with real-time updates</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 text-xs rounded bg-secondary border border-border text-muted">React</span>
                  <span className="px-2 py-1 text-xs rounded bg-secondary border border-border text-muted">Node.js</span>
                  <span className="px-2 py-1 text-xs rounded bg-secondary border border-border text-muted">MongoDB</span>
                </div>
              </div>
            </div>

            {/* Project 4 */}
            <div className="project-card p-6 rounded-lg border border-border bg-background/50 hover:border-accent/50 active:border-accent hover:shadow-lg transition-all opacity-0">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Behaviour-IQ</h3>
                  <p className="text-sm text-muted">AI-powered behavioral analysis platform</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 text-xs rounded bg-secondary border border-border text-muted">AI/ML</span>
                  <span className="px-2 py-1 text-xs rounded bg-secondary border border-border text-muted">Python</span>
                  <span className="px-2 py-1 text-xs rounded bg-secondary border border-border text-muted">Analytics</span>
                </div>
              </div>
            </div>

            {/* Project 5 */}
            <div className="project-card p-6 rounded-lg border border-border bg-background/50 hover:border-accent/50 active:border-accent hover:shadow-lg transition-all opacity-0">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Travel Booking Platform</h3>
                  <p className="text-sm text-muted">End-to-end travel reservation system</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 text-xs rounded bg-secondary border border-border text-muted">React</span>
                  <span className="px-2 py-1 text-xs rounded bg-secondary border border-border text-muted">Express</span>
                  <span className="px-2 py-1 text-xs rounded bg-secondary border border-border text-muted">REST APIs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
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
            <div className="text-xs font-semibold text-accent uppercase tracking-widest">Credentials</div>
            <h2 className="text-3xl sm:text-4xl font-bold">Certifications & Achievements</h2>
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
            <div className="p-6 rounded-lg border border-border bg-background/50 hover:border-accent/50 active:border-accent transition-all">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-semibold">AI Engineer Intern</h3>
                  <p className="text-muted">EXL Service</p>
                </div>
                <span className="text-sm text-accent font-medium whitespace-nowrap">May 2026 - Present</span>
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
            <div className="p-6 rounded-lg border border-border bg-background/50 hover:border-accent/50 active:border-accent transition-all">
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

          <div className="p-6 rounded-lg border border-border bg-background/50 hover:border-accent/50 active:border-accent transition-all">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
              <div>
                <h3 className="text-xl font-semibold">B.E. Computer Science</h3>
                <p className="text-muted">Chitkara University</p>
              </div>
              <span className="text-sm text-accent font-medium whitespace-nowrap">CGPA: 7.76</span>
            </div>
            <p className="text-muted">Focused on AI, machine learning, and software engineering with practical experience in building scalable systems.</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border bg-secondary/30">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-2 mb-12">
            <div className="text-xs font-semibold text-accent uppercase tracking-widest">Get in Touch</div>
            <h2 className="text-3xl sm:text-4xl font-bold">Let's Build Something Great</h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              I'm always interested in hearing about new projects and opportunities. Feel free to reach out!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="mailto:ssjsamar453@gmail.com">
              <Button className="gap-2 bg-accent hover:bg-accent/90 active:bg-accent/80 text-accent-foreground transition-all">
                <Mail className="w-4 h-4" />
                Email Me
              </Button>
            </a>
            <a href="https://www.linkedin.com/in/samarssj/" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="gap-2 hover:border-accent active:bg-accent/10 transition-all">
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </Button>
            </a>
            <a href="https://github.com/Samarssj" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="gap-2 hover:border-accent active:bg-accent/10 transition-all">
                <Github className="w-4 h-4" />
                GitHub
              </Button>
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
