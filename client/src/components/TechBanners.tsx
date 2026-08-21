import { useEffect, useRef, useState, type CSSProperties } from 'react';
import TechIcon, { type TechIconFallback } from '@/components/TechIcon';

type Technology = {
  name: string;
  slug?: string;
  color?: string;
  fallback?: TechIconFallback;
};

const movingRight: Technology[] = [
  { name: 'Vertex AI', slug: 'googlecloud', color: '4285F4' },
  { name: 'CX Agent Studio', slug: 'dialogflow', color: 'FF9800' },
  { name: 'Gemini', slug: 'googlegemini', color: '8E75B2' },
  { name: 'Cloud Run', slug: 'googlecloud', color: '4285F4' },
  { name: 'Firestore', slug: 'firebase', color: 'FFCA28' },
];

const movingLeft: Technology[] = [
  { name: 'Vector DB', fallback: 'database' },
  { name: 'Prompt Eng.', fallback: 'sparkles' },
  { name: 'Feature Eng.', fallback: 'chart' },
  { name: 'NLP/NLU', slug: 'huggingface', color: 'FFD21E' },
  { name: 'REST APIs', slug: 'postman', color: 'FF6C37' },
];

function TechnologyGroup({ technologies }: { technologies: Technology[] }) {
  return (
    <>
      {technologies.map((tech) => (
        <div
          key={tech.name}
          className="group/tech flex min-h-[64px] w-60 flex-shrink-0 items-center gap-3 rounded-xl border border-emerald-400/30 bg-gradient-to-br from-emerald-400/15 via-background/90 to-cyan-400/10 px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_10px_22px_-18px_rgba(16,185,129,0.9)] transition-[transform,border-color,box-shadow,background-color] duration-200 hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-400/15 hover:shadow-[0_0_0_1px_rgba(52,211,153,0.55),0_0_26px_-8px_rgba(16,185,129,0.9)]"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-emerald-300/30 bg-background/75 shadow-[inset_0_0_12px_rgba(16,185,129,0.14)]">
            <TechIcon
              name={tech.name}
              slug={tech.slug}
              color={tech.color}
              fallback={tech.fallback}
              sizeClass="h-5 w-5"
            />
          </div>
          <div className="min-w-0 text-left">
            <span className="block truncate text-[15px] font-bold leading-tight text-foreground drop-shadow-sm">
              {tech.name}
            </span>
          </div>
        </div>
      ))}
    </>
  );
}

function TechnologyBanner({
  technologies,
  direction,
}: {
  technologies: Technology[];
  direction: 'left' | 'right';
}) {
  const groupRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const group = groupRef.current;
    if (!group) return;

    const updateDistance = () => setDistance(group.getBoundingClientRect().width);
    updateDistance();

    const observer = new ResizeObserver(updateDistance);
    observer.observe(group);
    return () => observer.disconnect();
  }, []);

  const bannerStyle = {
    '--tech-loop-distance': `-${distance}px`,
    animation: distance ? `tech-banner-${direction} 18s linear infinite` : 'none',
    willChange: 'transform',
    transform: direction === 'right' ? `translate3d(-${distance}px, 0, 0)` : 'translate3d(0, 0, 0)',
    backfaceVisibility: 'hidden' as const,
  } as CSSProperties;

  return (
    <div
      className="overflow-hidden py-1"
      style={{ maskImage: 'linear-gradient(to right, transparent, black 7%, black 93%, transparent)' }}
    >
      <div className="flex w-max" style={bannerStyle}>
        <div ref={groupRef} className="flex flex-shrink-0 gap-4 pr-4">
          <TechnologyGroup technologies={technologies} />
        </div>
        <div className="flex flex-shrink-0 gap-4 pr-4" aria-hidden="true">
          <TechnologyGroup technologies={technologies} />
        </div>
      </div>
    </div>
  );
}

export default function TechBanners() {
  return (
    <div className="rounded-lg border border-border bg-accent/5 p-6 transition-[border-color,box-shadow] duration-300 hover:border-emerald-400/70 hover:shadow-[0_0_30px_-6px_rgba(34,197,94,0.65)] sm:p-8">
      <style>{`
        @keyframes tech-banner-left {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(var(--tech-loop-distance), 0, 0); }
        }
        @keyframes tech-banner-right {
          from { transform: translate3d(var(--tech-loop-distance), 0, 0); }
          to { transform: translate3d(0, 0, 0); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="tech-banner"] { animation: none !important; }
        }
      `}</style>

      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-emerald-400/30 bg-emerald-400/10">
            <TechIcon name="Google Cloud" slug="googlecloud" color="4285F4" sizeClass="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground">AI & Cloud Technologies</h3>
            <p className="mt-1 text-xs font-medium text-muted">Two live technology streams · 10 tools</p>
          </div>
        </div>
        <span className="hidden rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-1 font-mono text-[10px] font-bold tracking-wide text-emerald-300 sm:inline-flex">
          TECH_STACK_ACTIVE
        </span>
      </div>

      <div className="space-y-4">
        <TechnologyBanner technologies={movingRight} direction="right" />
        <TechnologyBanner technologies={movingLeft} direction="left" />
      </div>
    </div>
  );
}
