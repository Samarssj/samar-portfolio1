import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface ProjectMetric {
  value: string;
  label: string;
}

interface Project {
  title: string;
  description: string;
  metrics: ProjectMetric[];
  tech: string[];
  demo?: string;
  github: string;
}

const projects: Project[] = [
  {
    title: 'Enterprise AI Chatbot',
    description: 'Enterprise conversational AI platform for customer support automation, intent recognition, knowledge retrieval, multi-turn conversations, and escalations using Vertex AI and CX Agent Studio.',
    metrics: [
      { value: '85%', label: 'User Satisfaction' },
      { value: '40%', label: 'Ticket Reduction' },
      { value: '60%', label: 'Faster Resolution' },
    ],
    tech: ['Vertex AI', 'CX Agent Studio', 'GCP', 'OpenAPI Tools'],
    demo: 'https://healthcare-card-portal.vercel.app',
    github: 'https://github.com/Samarssj/Enterprise-Agent',
  },
  {
    title: 'Jarvis AI Voice Assistant',
    description: 'Modular AI-powered desktop assistant that combines offline speech recognition, Gemini reasoning, tool execution, and text-to-speech for hands-free automation and system control.',
    metrics: [
      { value: 'VAD', label: 'Voice Activity Detection' },
      { value: '7+', label: 'Integrated Tools' },
      { value: 'Edge-TTS', label: 'Text-to-Speech' },
    ],
    tech: ['Python', 'Gemini API', 'Faster-Whisper', 'Edge TTS', 'SoundDevice', 'Automation'],
    github: 'https://github.com/Samarssj/Jarvis-prototype',
  },
  {
    title: 'Movie Review Sentiment Analysis',
    description: 'End-to-end NLP application that classifies movie reviews into five sentiment categories with TF-IDF features and a tuned linear SVM, deployed through Streamlit.',
    metrics: [
      { value: '5', label: 'Sentiment Classes' },
      { value: '4+', label: 'ML Models Compared' },
      { value: 'TF-IDF', label: 'Feature Engineering' },
    ],
    tech: ['Python', 'Scikit-Learn', 'Streamlit', 'TF-IDF', 'Pandas', 'NumPy'],
    demo: 'https://samarssj-movie-review-sentiment-analysis-appapp-z7ohdt.streamlit.app',
    github: 'https://github.com/Samarssj/movie-review-sentiment-analysis',
  },
  {
    title: 'News Pilot — Hybrid AI News Intelligence Platform',
    description: 'Hybrid RAG news assistant that indexes live RSS and NewsAPI articles in ChromaDB, provides source-backed answers, and intelligently falls back to Gemini knowledge when needed.',
    metrics: [
      { value: 'Hybrid', label: 'RAG + Gemini' },
      { value: '1.9 sec', label: 'Average Response Time' },
      { value: 'Live', label: 'News Retrieval' },
    ],
    tech: ['Python', 'Streamlit', 'Gemini API', 'ChromaDB', 'Sentence Transformers', 'RAG'],
    demo: 'https://samarssj-newspilot-app-qbihoh.streamlit.app',
    github: 'https://github.com/Samarssj/NewsPilot',
  },
  {
    title: 'E-Blogging Platform',
    description: 'Full-stack blogging platform featuring secure authentication, CRUD workflows, responsive UI, REST APIs, and MongoDB-backed post management.',
    metrics: [
      { value: 'CRUD', label: 'Blog Management' },
      { value: 'JWT', label: 'Authentication' },
      { value: 'REST', label: 'API Architecture' },
    ],
    tech: ['TypeScript', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'Bootstrap'],
    demo: 'https://eblogging-webapp-1.onrender.com',
    github: 'https://github.com/Samarssj/eBlogging-webapp',
  },
  {
    title: 'Clearance Desk',
    description: 'AI-powered resume parser and job description matcher that uses hybrid rule-based extraction with Gemini fallback, semantic similarity, and skill matching.',
    metrics: [
      { value: 'AI', label: 'Resume Parsing' },
      { value: 'Hybrid', label: 'Rule + LLM' },
      { value: 'ATS', label: 'Resume Matching' },
    ],
    tech: ['Python', 'Streamlit', 'Gemini API', 'PDF Parsing', 'RapidFuzz', 'NLP'],
    demo: 'https://samarssj-clerance-desk-app-4ik4yy.streamlit.app',
    github: 'https://github.com/Samarssj/Clearance_desk',
  },
  {
    title: 'HealthBuddy — AI Health Information Assistant',
    description: 'Guardrailed health-information chatbot combining RAG retrieval with Gemini, emergency-input detection, diagnosis-request flagging, disclaimers, and server-side credential handling.',
    metrics: [
      { value: 'RAG', label: 'Knowledge Retrieval' },
      { value: 'Zero', label: 'Client-Side Keys' },
      { value: 'Multi-turn', label: 'Conversation Memory' },
    ],
    tech: ['Gemini API', 'RAG', 'Streamlit', 'Guardrails'],
    demo: 'https://health-buddy-hglg822fh6wt86qhrt6jp2.streamlit.app',
    github: 'https://github.com/Samarssj/health-buddy',
  },
  {
    title: 'Travel Booking Platform',
    description: 'Full-stack travel booking platform for browsing destinations, searching options, and managing bookings through a responsive UI and MongoDB-backed REST APIs.',
    metrics: [
      { value: 'CRUD', label: 'Booking Management' },
      { value: 'REST', label: 'API Integration' },
      { value: 'Active', label: 'User Experience' },
    ],
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs'],
    demo: 'https://tesystem-1.onrender.com',
    github: 'https://github.com/Samarssj/TEsystem',
  },
  {
    title: 'Job-track',
    description: 'AI-powered job discovery and application tracker that scores roles against a resume, organizes applications in a Kanban board, and assists with application workflows.',
    metrics: [
      { value: 'AI', label: 'Resume Matching' },
      { value: 'Auto', label: 'Job Discovery' },
      { value: 'Kanban', label: 'Application Tracker' },
    ],
    tech: ['Python', 'Playwright', 'Streamlit', 'SQLite', 'Gemini API', 'Automation'],
    github: 'https://github.com/Samarssj/job-track',
  },
  {
    title: 'FlowCast',
    description: 'ML-powered menstrual cycle prediction application using rolling-average and regression models, interactive cycle logging, and symptom tracking.',
    metrics: [
      { value: 'ML', label: 'Cycle Prediction' },
      { value: '±1.8d', label: 'Avg. Model Error' },
      { value: '159', label: 'Users in Training Data' },
    ],
    tech: ['Python', 'Streamlit', 'scikit-learn', 'Pandas', 'Regression', 'Feature Engineering'],
    demo: 'https://period-predictor-kxssmdhkv2qxjqymovkkro.streamlit.app',
    github: 'https://github.com/Samarssj/Period-Predictor',
  },
];

const cylinderRadius = 700;

export default function ProjectCylinder() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cylinderRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileIndex, setMobileIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const touchStartXRef = useRef<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cylinder = cylinderRef.current;
    if (!section || !cylinder) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const updateCylinder = () => {
      frameRef.current = null;
      if (reducedMotion.matches) {
        cylinder.style.transform = 'rotateX(0deg)';
        return;
      }

      const rect = section.getBoundingClientRect();
      const scrollRange = Math.max(section.offsetHeight - window.innerHeight, 1);
      const progress = Math.min(Math.max(-rect.top / scrollRange, 0), 1);
      const rotation = progress * 360;
      cylinder.style.transform = `rotateX(${-rotation}deg)`;

      const nextIndex = Math.round(progress * projects.length) % projects.length;
      if (nextIndex !== activeIndexRef.current) {
        activeIndexRef.current = nextIndex;
        setActiveIndex(nextIndex);
      }
    };

    const onScroll = () => {
      if (frameRef.current === null) {
        frameRef.current = window.requestAnimationFrame(updateCylinder);
      }
    };

    updateCylinder();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    reducedMotion.addEventListener('change', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      reducedMotion.removeEventListener('change', onScroll);
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const previousMobileProject = () => {
    setMobileIndex((current) => (current - 1 + projects.length) % projects.length);
  };

  const nextMobileProject = () => {
    setMobileIndex((current) => (current + 1) % projects.length);
  };

  const mobileProject = projects[mobileIndex];

  return (
    <>
      <div ref={sectionRef} className="hidden md:block relative h-[280vh]" aria-label="Scroll-driven project carousel">
        <div className="sticky top-0 h-screen overflow-hidden flex flex-col items-center justify-center py-20" style={{ perspective: '1800px' }}>
          <div className="absolute inset-x-0 top-16 flex items-start justify-between px-10 lg:px-16 pointer-events-none">
            <div>
              <div className="text-xs font-semibold text-accent uppercase tracking-[0.28em]">Scroll to rotate</div>
              <p className="mt-2 text-sm text-muted">A vertical 3D archive of selected work</p>
            </div>
            <div className="text-right">
              <div className="font-mono text-sm text-accent">PROJECT {String(activeIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</div>
              <div className="mt-2 flex justify-end gap-1.5">
                {projects.map((project, index) => (
                  <span
                    key={project.title}
                    className={`h-1 rounded-full transition-all duration-300 ${index === activeIndex ? 'w-7 bg-accent' : 'w-2 bg-border'}`}
                    aria-hidden="true"
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="relative h-[380px] w-[min(80vw,660px)]" style={{ transformStyle: 'preserve-3d' }}>
            <div
              ref={cylinderRef}
              className="absolute inset-0"
              style={{
                transformStyle: 'preserve-3d',
                transform: 'rotateX(0deg)',
                willChange: 'transform',
              }}
            >
              {projects.map((project, index) => {
                const angle = (360 / projects.length) * index;
                const isActive = index === activeIndex;
                return (
                  <article
                    key={project.title}
                    className="absolute inset-0 overflow-hidden rounded-2xl border border-accent/30 bg-card/95 p-5 shadow-2xl transition-[opacity,border-color,box-shadow] duration-500"
                    style={{
                      transform: `rotateX(${angle}deg) translateZ(${cylinderRadius}px)`,
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      pointerEvents: isActive ? 'auto' : 'none',
                      opacity: isActive ? 1 : 0.1,
                      boxShadow: isActive ? '0 0 34px rgba(16, 185, 129, 0.24)' : '0 18px 50px rgba(0, 0, 0, 0.12)',
                    }}
                    aria-hidden={!isActive}
                  >
                    <div className="flex h-full flex-col">
                      <div className="flex items-start justify-between gap-5">
                        <div>
                          <p className="font-mono text-xs text-accent">{String(index + 1).padStart(2, '0')} — SELECTED BUILD</p>
                          <h3 className="mt-2 text-2xl font-semibold leading-tight">{project.title}</h3>
                        </div>
                      </div>

                      <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-muted">{project.description}</p>

                      <div className="mt-4 grid grid-cols-3 divide-x divide-border border-y border-border">
                        {project.metrics.map((metric) => (
                          <div key={metric.label} className="px-3 py-3 first:pl-0 last:pr-0">
                            <p className="text-lg font-bold text-accent">{metric.value}</p>
                            <p className="mt-0.5 text-[10px] leading-tight text-muted">{metric.label}</p>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {project.tech.map((item) => (
                          <span key={item} className="rounded-full border border-border px-2.5 py-1 text-[11px] text-muted">{item}</span>
                        ))}
                      </div>

                      <div className="mt-auto flex gap-3 pt-4">
                        {project.demo && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            tabIndex={isActive ? 0 : -1}
                            className="flex-1 rounded-lg bg-accent px-4 py-2.5 text-center text-sm font-medium text-accent-foreground transition-transform duration-200 hover:opacity-90 active:scale-[0.97]"
                          >
                            Live Demo
                          </a>
                        )}
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          tabIndex={isActive ? 0 : -1}
                          className="flex-1 rounded-lg border border-border px-4 py-2.5 text-center text-sm font-medium transition-colors duration-200 hover:border-accent hover:text-accent active:scale-[0.97]"
                        >
                          GitHub
                        </a>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <p className="mt-12 text-xs uppercase tracking-[0.24em] text-muted">Scroll downward to rotate the cylinder</p>
        </div>
      </div>

      <div className="md:hidden">
        <style>{`
          @keyframes mobile-project-rotate-in {
            from { opacity: 0; transform: rotateX(-14deg) translateY(22px) scale(0.97); }
            to { opacity: 1; transform: rotateX(0deg) translateY(0) scale(1); }
          }
          @media (prefers-reduced-motion: reduce) {
            .mobile-project-card { animation: none !important; }
          }
        `}</style>

        <div className="rounded-2xl border border-border bg-accent/5 p-4 sm:p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-xs font-semibold text-accent uppercase tracking-[0.28em]">Swipe to rotate</div>
              <p className="mt-1 text-xs text-muted">Browse all selected projects</p>
            </div>
            <div className="font-mono text-xs text-accent">{String(mobileIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</div>
          </div>

          <div
            className="mt-5"
            style={{ perspective: '1000px', touchAction: 'pan-y' }}
            onTouchStart={(event) => {
              touchStartXRef.current = event.touches[0]?.clientX ?? null;
            }}
            onTouchEnd={(event) => {
              const startX = touchStartXRef.current;
              const endX = event.changedTouches[0]?.clientX;
              touchStartXRef.current = null;
              if (startX === null || endX === undefined) return;
              if (endX - startX > 42) previousMobileProject();
              if (startX - endX > 42) nextMobileProject();
            }}
          >
            <article
              key={mobileProject.title}
              className="mobile-project-card overflow-hidden rounded-xl border border-accent/35 bg-card/95 p-5 shadow-[0_0_28px_rgba(16,185,129,0.16)]"
              style={{ animation: 'mobile-project-rotate-in 420ms cubic-bezier(0.23, 1, 0.32, 1)', transformStyle: 'preserve-3d', willChange: 'transform, opacity' }}
            >
              <p className="font-mono text-xs text-accent">{String(mobileIndex + 1).padStart(2, '0')} — SELECTED BUILD</p>
              <h3 className="mt-2 text-xl font-semibold leading-tight">{mobileProject.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{mobileProject.description}</p>

              <div className="mt-4 grid grid-cols-3 divide-x divide-border border-y border-border">
                {mobileProject.metrics.map((metric) => (
                  <div key={metric.label} className="px-2 py-3 first:pl-0 last:pr-0">
                    <p className="text-sm font-bold text-accent">{metric.value}</p>
                    <p className="mt-0.5 text-[9px] leading-tight text-muted">{metric.label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {mobileProject.tech.map((item) => (
                  <span key={item} className="rounded-full border border-border px-2 py-1 text-[10px] text-muted">{item}</span>
                ))}
              </div>

              <div className="mt-5 flex gap-3">
                {mobileProject.demo && (
                  <a href={mobileProject.demo} target="_blank" rel="noopener noreferrer" className="flex-1 rounded-lg bg-accent px-4 py-2.5 text-center text-sm font-medium text-accent-foreground active:scale-[0.97]">
                    Live Demo
                  </a>
                )}
                <a href={mobileProject.github} target="_blank" rel="noopener noreferrer" className="flex-1 rounded-lg border border-border px-4 py-2.5 text-center text-sm font-medium active:scale-[0.97]">
                  GitHub
                </a>
              </div>
            </article>
          </div>

          <div className="mt-5 flex items-center justify-between gap-3">
            <button type="button" onClick={previousMobileProject} aria-label="Show previous project" className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:border-accent hover:text-accent active:scale-[0.97]">
              <ChevronLeft size={18} aria-hidden="true" />
            </button>
            <div className="flex items-center gap-1.5" aria-label={`Project ${mobileIndex + 1} of ${projects.length}`}>
              {projects.map((project, index) => (
                <button
                  key={project.title}
                  type="button"
                  onClick={() => setMobileIndex(index)}
                  aria-label={`Show project ${index + 1}: ${project.title}`}
                  aria-current={index === mobileIndex ? 'true' : undefined}
                  className={`h-1.5 rounded-full transition-all duration-300 ${index === mobileIndex ? 'w-6 bg-accent' : 'w-1.5 bg-border'}`}
                />
              ))}
            </div>
            <button type="button" onClick={nextMobileProject} aria-label="Show next project" className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:border-accent hover:text-accent active:scale-[0.97]">
              <ChevronRight size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
