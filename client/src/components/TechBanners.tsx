import { useEffect, useRef, useState } from 'react';

type Technology = {
  name: string;
};

const movingRight: Technology[] = [
  { name: 'Vertex AI' },
  { name: 'Dialogflow CX' },
  { name: 'Gemini' },
  { name: 'Cloud Run' },
  { name: 'Firestore' },
];

const movingLeft: Technology[] = [
  { name: 'Vector DB' },
  { name: 'Prompt Eng.' },
  { name: 'Feature Eng.' },
  { name: 'NLP/NLU' },
  { name: 'REST APIs' },
];

function TechnologyGroup({ technologies }: { technologies: Technology[] }) {
  return (
    <>
      {technologies.map((tech) => (
        <div
          key={tech.name}
          className="flex w-44 flex-shrink-0 items-center justify-center rounded-xl border border-border bg-background/70 px-4 py-3 text-center transition-colors duration-300 hover:border-accent/70"
        >
          <span className="text-sm font-semibold text-muted whitespace-nowrap">{tech.name}</span>
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
  } as React.CSSProperties;

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
    <div className="p-8 rounded-lg border border-border bg-accent/5 hover:border-accent/60 hover:shadow-[0_0_25px_#22c55e] transition-[border-color,box-shadow] duration-300">
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
        <div>
          <h3 className="text-lg font-semibold">AI & Cloud Technologies</h3>
          <p className="mt-1 text-xs text-muted">Two live technology streams · 10 tools</p>
        </div>
        <span className="font-mono text-xs text-accent">TECH_STACK_ACTIVE</span>
      </div>

      <div className="space-y-4">
        <TechnologyBanner technologies={movingRight} direction="right" />
        <TechnologyBanner technologies={movingLeft} direction="left" />
      </div>
    </div>
  );
}
