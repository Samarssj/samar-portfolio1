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
  preview?: {
    src: string;
    alt: string;
  };
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
    preview: {
      src: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663824498893/wuVvQqlcCyzdShcJ.png',
      alt: 'Healthcare Card Portal homepage preview',
    },
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
    preview: {
      src: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663824498893/DGgDjeXQZTJAkjud.png',
      alt: 'JARVIS tactical interface preview',
    },
  },
  {
    title: 'AutoApply — AI Job Matching & Application Tracker',
    description: 'Full-stack AI job matching workspace that extracts structured data from resumes, aggregates 1,200+ roles across remote, hybrid, and on-site feeds, scores opportunities against a candidate profile, generates tailored pitches, and tracks application progress.',
    metrics: [
      { value: '1,200+', label: 'Jobs Aggregated' },
      { value: 'ATS', label: 'Resume Matching' },
      { value: 'AI', label: 'Scoring & Pitches' },
    ],
    tech: ['React', 'TypeScript', 'Node.js', 'Express', 'Gemini API', 'MongoDB', 'PDF Parsing'],
    demo: 'https://auto-apply-datn.onrender.com',
    github: 'https://github.com/Samarssj/Auto-Apply',
    preview: {
      src: '/autoapply-preview.webp',
      alt: 'AutoApply AI job radar with resume matching and ATS scoring preview',
    },
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
    preview: {
      src: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663824498893/REhIlLAmPJdxmWME.png',
      alt: 'NewsPilot intelligence workspace preview',
    },
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
    preview: {
      src: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663824498893/EYlmIGkIwxSjIjxi.png',
      alt: 'ReelFeel movie review sentiment analysis preview',
    },
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
    preview: {
      src: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663824498893/PsTCLtFXbkaQZnpK.png',
      alt: 'eBlogging homepage preview',
    },
  },
  {
    title: 'Step Pulse — Real-Time Fitness Intelligence',
    description: 'Real-time fitness intelligence dashboard with motion-aware step tracking, client-side AES-GCM encryption, live Firestore leaderboards and duels, and Gemini-powered wellness coaching.',
    metrics: [
      { value: 'E2EE', label: 'AES-GCM Health Vault' },
      { value: 'Live', label: 'Firestore Leaderboards' },
      { value: 'AI', label: 'Gemini Wellness Coach' },
    ],
    tech: ['React 19', 'TypeScript', 'Firebase', 'Gemini AI', 'Web Crypto', 'Express', 'Recharts'],
    demo: 'https://step-pulse.vercel.app',
    github: 'https://github.com/Samarssj/step-pulse',
    preview: {
      src: '/steppulse-preview.webp',
      alt: 'Step Pulse real-time fitness intelligence dashboard preview',
    },
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
    preview: {
      src: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663824498893/cyPFSEHPABFrYAPc.png',
      alt: 'TourET travel booking homepage preview',
    },
  },

  {
    title: 'CreditGuard',
    description: 'Production-style credit-card fraud screening console that compares imbalance-aware machine-learning models, selects the strongest validated pipeline, and routes high-risk transactions for review.',
    metrics: [
      { value: '0.875', label: 'Average Precision' },
      { value: '0.981', label: 'ROC-AUC' },
      { value: '5', label: 'Models Compared' },
    ],
    tech: ['Python', 'Streamlit', 'scikit-learn', 'SMOTE', 'XGBoost', 'Plotly'],
    demo: 'https://credit-guard-h9s6peguaqjvq7wwt4skzd.streamlit.app',
    github: 'https://github.com/Samarssj/Credit-Guard',
    preview: {
      src: '/assets/creditguard-preview.webp',
      alt: 'CreditGuard green fraud detection risk console preview',
    },
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
    preview: {
      src: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663824498893/JEQsyEIGRzrienaQ.png',
      alt: 'HealthBuddy health information assistant preview',
    },
  },
];

const horizontalCylinderRadius = 700;

export default function ProjectCylinder() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cylinderRef = useRef<HTMLDivElement>(null);
  const mobileSectionRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const scrollFrameRef = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileIndex, setMobileIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const swipeStartRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cylinder = cylinderRef.current;
    if (!section || !cylinder) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const maxRotation = (360 / projects.length) * (projects.length - 1);
    let targetRotation = 0;
    let currentRotation = 0;

    const updateTarget = () => {
      if (reducedMotion.matches) {
        targetRotation = 0;
        currentRotation = 0;
        cylinder.style.transform = 'rotateY(0deg)';
        return;
      }

      const rect = section.getBoundingClientRect();
      const scrollRange = Math.max(section.offsetHeight - window.innerHeight, 1);
      const progress = Math.min(Math.max(-rect.top / scrollRange, 0), 1);
      targetRotation = progress * maxRotation;

      const nextIndex = Math.min(Math.round(progress * (projects.length - 1)), projects.length - 1);
      if (nextIndex !== activeIndexRef.current) {
        activeIndexRef.current = nextIndex;
        setActiveIndex(nextIndex);
      }
    };

    const animateCylinder = () => {
      frameRef.current = null;
      if (reducedMotion.matches) {
        cylinder.style.transform = 'rotateY(0deg)';
        return;
      }

      const difference = targetRotation - currentRotation;
      currentRotation += difference * 0.16;
      if (Math.abs(difference) < 0.05) currentRotation = targetRotation;
      cylinder.style.transform = `rotateY(${-currentRotation}deg)`;

      if (currentRotation !== targetRotation) {
        frameRef.current = window.requestAnimationFrame(animateCylinder);
      }
    };

    const requestUpdate = () => {
      if (scrollFrameRef.current !== null) return;
      scrollFrameRef.current = window.requestAnimationFrame(() => {
        scrollFrameRef.current = null;
        updateTarget();
        if (frameRef.current === null) frameRef.current = window.requestAnimationFrame(animateCylinder);
      });
    };

    updateTarget();
    animateCylinder();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate, { passive: true });
    reducedMotion.addEventListener('change', requestUpdate);

    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      reducedMotion.removeEventListener('change', requestUpdate);
      if (scrollFrameRef.current !== null) window.cancelAnimationFrame(scrollFrameRef.current);
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
    };
  }, []);

  useEffect(() => {
    const section = mobileSectionRef.current;
    if (!section) return;

    const mobileQuery = window.matchMedia('(max-width: 767px)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const scrollStep = 40;
    let lastScrollY = window.scrollY;
    let accumulatedDistance = 0;
    let locked = false;
    let settleTimer: number | null = null;

    const unlockAfterScrollSettles = () => {
      if (settleTimer !== null) window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(() => {
        locked = false;
        accumulatedDistance = 0;
      }, 320);
    };

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      if (!mobileQuery.matches || reducedMotion.matches) {
        accumulatedDistance = 0;
        return;
      }

      const rect = section.getBoundingClientRect();
      const sectionIsActive = rect.top <= 0 && rect.bottom > 0;
      if (!sectionIsActive || scrollDelta === 0) {
        accumulatedDistance = 0;
        return;
      }

      if (locked) {
        unlockAfterScrollSettles();
        return;
      }

      accumulatedDistance += scrollDelta;
      if (Math.abs(accumulatedDistance) < scrollStep) return;

      const direction = accumulatedDistance > 0 ? 1 : -1;
      accumulatedDistance = 0;
      locked = true;
      setMobileIndex((current) => Math.min(Math.max(current + direction, 0), projects.length - 1));
      unlockAfterScrollSettles();
    };

    const resetTracking = () => {
      lastScrollY = window.scrollY;
      accumulatedDistance = 0;
    };

    resetTracking();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', resetTracking, { passive: true });
    mobileQuery.addEventListener('change', resetTracking);
    reducedMotion.addEventListener('change', resetTracking);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', resetTracking);
      mobileQuery.removeEventListener('change', resetTracking);
      reducedMotion.removeEventListener('change', resetTracking);
      if (settleTimer !== null) window.clearTimeout(settleTimer);
    };
  }, []);

  const changeMobileProject = (direction: number) => {
    setMobileIndex((current) => Math.min(Math.max(current + direction, 0), projects.length - 1));
  };

  const lastSwipeChangeRef = useRef(0);

  const beginSwipe = (x: number, y: number) => {
    swipeStartRef.current = { x, y };
  };

  const endSwipe = (x: number, y: number) => {
    const start = swipeStartRef.current;
    swipeStartRef.current = null;
    if (!start || Date.now() - lastSwipeChangeRef.current < 350) return;

    const deltaX = x - start.x;
    const deltaY = y - start.y;
    if (Math.abs(deltaX) < 48 || Math.abs(deltaX) <= Math.abs(deltaY)) return;

    lastSwipeChangeRef.current = Date.now();
    changeMobileProject(deltaX < 0 ? 1 : -1);
  };

  const mobileProject = projects[mobileIndex];

  return (
    <>
      <div ref={sectionRef} className="hidden md:block relative h-[520vh]" aria-label="Scroll-driven horizontal project cylinder">
        <div className="sticky top-0 h-screen overflow-hidden flex flex-col items-center justify-center py-20" style={{ perspective: '1800px' }}>
          <div className="absolute inset-x-0 top-16 flex items-start justify-between px-10 lg:px-16 pointer-events-none">
            <div>
              <div className="text-xs font-semibold text-accent uppercase tracking-[0.28em]">Scroll down to spin</div>
              <p className="mt-2 text-sm text-muted">A horizontal 3D cylinder of selected work</p>
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
                transform: 'rotateY(0deg)',
                willChange: 'transform',
              }}
            >
              {projects.map((project, index) => {
                const angle = (360 / projects.length) * index;
                const isActive = index === activeIndex;
                return (
                  <article
                    key={project.title}
                    className="absolute inset-0 overflow-y-auto rounded-2xl border border-accent/30 bg-card/95 p-5 shadow-2xl transition-[opacity,border-color,box-shadow] duration-500"
                    style={{
                      transform: `rotateY(${angle}deg) translateZ(${horizontalCylinderRadius}px)`,
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      pointerEvents: isActive ? 'auto' : 'none',
                      opacity: isActive ? 1 : 0.1,
                      boxShadow: isActive ? '0 0 34px rgba(16, 185, 129, 0.24)' : '0 18px 50px rgba(0, 0, 0, 0.12)',
                    }}
                    aria-hidden={!isActive}
                  >
                    <div className="flex h-full flex-col">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <p className="font-mono text-xs text-accent">{String(index + 1).padStart(2, '0')} — SELECTED BUILD</p>
                          <h3 className="mt-2 text-2xl font-semibold leading-tight">{project.title}</h3>
                        </div>
                        {project.preview && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            tabIndex={isActive ? 0 : -1}
                            className="group/preview relative block w-40 shrink-0 overflow-hidden rounded-xl border border-accent/35 bg-background shadow-[0_0_18px_rgba(16,185,129,0.12)] transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-accent hover:shadow-[0_0_24px_rgba(16,185,129,0.28)]"
                            aria-label={`Open ${project.title} live preview`}
                          >
                            <img src={project.preview.src} alt={project.preview.alt} loading="lazy" className="aspect-video w-full object-cover transition-transform duration-500 group-hover/preview:scale-105" />
                            <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent px-2 py-1.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-white">Live preview</span>
                          </a>
                        )}
                      </div>

                      <p className="mt-4 text-sm leading-relaxed text-muted">{project.description}</p>

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

          <p className="mt-12 text-xs uppercase tracking-[0.24em] text-muted">Scroll downward to spin through the horizontal project cylinder</p>
        </div>
      </div>

      <div ref={mobileSectionRef} className="relative h-[260svh] md:hidden" aria-label="Scroll-driven mobile project carousel">
        <style>{`
          @keyframes mobile-project-rotate-in {
            from { opacity: 0; transform: rotateY(26deg) translate3d(28px, 14px, 0) scale(0.96); }
            to { opacity: 1; transform: rotateY(0deg) translate3d(0, 0, 0) scale(1); }
          }
          @media (prefers-reduced-motion: reduce) {
            .mobile-project-card { animation: none !important; }
          }
        `}</style>

        <div className="sticky top-0 flex h-[100svh] items-center px-4 py-20">
          <div className="w-full rounded-2xl border border-border bg-accent/5 p-4 sm:p-5">
            <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-xs font-semibold text-accent uppercase tracking-[0.28em]">Scroll or swipe to rotate</div>
            </div>
            <div className="font-mono text-xs text-accent">{String(mobileIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</div>
          </div>

          <div
            className="mt-5"
            style={{ perspective: '1000px', touchAction: 'pan-y' }}
            onPointerDown={(event) => {
              if (event.pointerType === 'mouse') return;
              beginSwipe(event.clientX, event.clientY);
              event.currentTarget.setPointerCapture(event.pointerId);
            }}
            onPointerUp={(event) => {
              if (event.currentTarget.hasPointerCapture(event.pointerId)) {
                event.currentTarget.releasePointerCapture(event.pointerId);
              }
              endSwipe(event.clientX, event.clientY);
            }}
            onPointerCancel={() => {
              swipeStartRef.current = null;
            }}
            onTouchStart={(event) => {
              const touch = event.changedTouches[0];
              if (touch) beginSwipe(touch.clientX, touch.clientY);
            }}
            onTouchEnd={(event) => {
              const touch = event.changedTouches[0];
              if (touch) endSwipe(touch.clientX, touch.clientY);
            }}
            onTouchCancel={() => {
              swipeStartRef.current = null;
            }}
          >
            <article
              key={mobileProject.title}
              className="mobile-project-card max-h-[calc(100svh-14rem)] overflow-y-auto rounded-xl border border-accent/35 bg-card/95 p-5 shadow-[0_0_28px_rgba(16,185,129,0.16)]"
              style={{ animation: 'mobile-project-rotate-in 500ms cubic-bezier(0.22, 1, 0.36, 1)', transformStyle: 'preserve-3d', willChange: 'transform, opacity', touchAction: 'pan-y' }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-mono text-xs text-accent">{String(mobileIndex + 1).padStart(2, '0')} — SELECTED BUILD</p>
                  <h3 className="mt-2 text-xl font-semibold leading-tight">{mobileProject.title}</h3>
                </div>
                {mobileProject.preview && (
                  <a
                    href={mobileProject.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/preview relative block w-28 shrink-0 overflow-hidden rounded-lg border border-accent/35 bg-background shadow-[0_0_14px_rgba(16,185,129,0.12)]"
                    aria-label={`Open ${mobileProject.title} live preview`}
                  >
                    <img src={mobileProject.preview.src} alt={mobileProject.preview.alt} loading="lazy" className="aspect-video w-full object-cover transition-transform duration-500 group-hover/preview:scale-105" />
                    <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-1.5 py-1 text-[8px] font-semibold uppercase tracking-[0.1em] text-white">Preview</span>
                  </a>
                )}
              </div>
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

          <div className="mt-5 flex items-center justify-center gap-1.5" aria-label={`Project ${mobileIndex + 1} of ${projects.length}`}>
            {projects.map((project, index) => (
              <span
                key={project.title}
                aria-hidden="true"
                className={`h-1.5 rounded-full transition-all duration-300 ${index === mobileIndex ? 'w-6 bg-accent' : 'w-1.5 bg-border'}`}
              />
            ))}
          </div>
          </div>
        </div>
      </div>
    </>
  );
}
