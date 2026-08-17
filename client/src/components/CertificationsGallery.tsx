import { useEffect, useRef, useState } from "react";
import { ExternalLink } from "lucide-react";

interface Certification {
  id: string;
  title: string;
  provider: string;
  color: string;
  url: string;
}

const certifications: Certification[] = [
  {
    id: "ibm-ml",
    title: "IBM Machine Learning Professional Certificate",
    provider: "IBM",
    color: "from-blue-500 to-blue-600",
    url: "https://coursera.org/share/4d0f5b448eb9bf8b202cfcd075bf925b",
  },
  {
    id: "ibm-ai",
    title: "IBM AI Enterprise Workflow Specialization",
    provider: "IBM",
    color: "from-blue-500 to-blue-600",
    url: "https://coursera.org/share/b0e3b089723ce42f0aa3308a38d36f1e",
  },
  {
    id: "coursera-ai",
    title: "AI for Scientific Research Specialization",
    provider: "Coursera",
    color: "from-purple-500 to-purple-600",
    url: "https://coursera.org/share/b14960a82bbb4a4e70b912c1141a92c6",
  },
  {
    id: "gcp-infra",
    title: "Essential Google Cloud Infrastructure: Core Services",
    provider: "Google Cloud",
    color: "from-red-500 to-orange-500",
    url: "https://partner.skills.google/public_profiles/e2bb2abb-fb8a-4b51-882e-744f692fa177/badges/24584405",
  },
  {
    id: "gcp-agents",
    title: "Certified Partner Specialist Gemini Enterprise Agent Development",
    provider: "Google Cloud",
    color: "from-red-500 to-orange-500",
    url: "https://www.credly.com/badges/2533a1d5-c98b-4102-b1f6-c73c983da84b/public_url",
  },
  {
    id: "gcp-scaling",
    title: "Elastic Google Cloud Infrastructure: Scaling and Automation",
    provider: "Google Cloud",
    color: "from-red-500 to-orange-500",
    url: "https://partner.skills.google/public_profiles/e2bb2abb-fb8a-4b51-882e-744f692fa177/badges/24370472",
  },
  {
    id: "gcp-k8s",
    title: "Getting Started with Google Kubernetes Engine",
    provider: "Google Cloud",
    color: "from-red-500 to-orange-500",
    url: "https://partner.skills.google/public_profiles/e2bb2abb-fb8a-4b51-882e-744f692fa177/badges/24453923",
  },
  {
    id: "gcp-prompt",
    title: "Text Prompt Engineering Techniques",
    provider: "Google Cloud",
    color: "from-red-500 to-orange-500",
    url: "https://partner.skills.google/public_profiles/e2bb2abb-fb8a-4b51-882e-744f692fa177/badges/24421265",
  },
  {
    id: "gcp-cx-studio",
    title: "Certified Partner Specialist Gemini Enterprise Deployment",
    provider: "Google Cloud",
    color: "from-red-500 to-orange-500",
    url: "https://www.credly.com/badges/f0de046e-1a43-4e03-9393-2f8e69f4e5d9/public_url",
  },
];

const getEntranceDirection = (index: number) =>
  index < 3 || index >= 6 ? "right" : "left";

const getEntranceDelay = (index: number) => {
  const group = Math.floor(index / 3);
  const positionInGroup = index % 3;
  return group * 225 + positionInGroup * 75;
};

export default function CertificationsGallery() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const inRevealZoneRef = useRef(false);
  const replayFrameRef = useRef<number | null>(null);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setHasEntered(true);
      return;
    }

    const replayEntrance = () => {
      if (replayFrameRef.current !== null) {
        window.cancelAnimationFrame(replayFrameRef.current);
      }

      setHasEntered(false);
      replayFrameRef.current = window.requestAnimationFrame(() => {
        replayFrameRef.current = window.requestAnimationFrame(() => {
          setHasEntered(true);
          replayFrameRef.current = null;
        });
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        const hasReachedRevealZone = entry.intersectionRatio >= 0.18;

        if (hasReachedRevealZone && !inRevealZoneRef.current) {
          inRevealZoneRef.current = true;
          replayEntrance();
        } else if (!hasReachedRevealZone && inRevealZoneRef.current) {
          inRevealZoneRef.current = false;
          setHasEntered(false);
        }
      },
      { threshold: [0, 0.18], rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(gallery);
    return () => {
      observer.disconnect();
      if (replayFrameRef.current !== null) {
        window.cancelAnimationFrame(replayFrameRef.current);
      }
    };
  }, []);

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <div className="text-xs font-semibold text-accent uppercase tracking-widest">
          Achievements
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold">
          Certifications & Credentials
        </h2>
      </div>

      <div ref={galleryRef} className="grid grid-cols-1 gap-4 overflow-x-hidden md:grid-cols-2 lg:grid-cols-3">
        {certifications.map((cert, index) => {
          const movesFromRight = getEntranceDirection(index) === "right";
          const entranceClass = hasEntered
            ? "translate-x-0 opacity-100"
            : movesFromRight
              ? "translate-x-20 opacity-0"
              : "-translate-x-20 opacity-0";

          return (
            <div
              key={cert.id}
              className={`motion-reduce:translate-x-0 motion-reduce:opacity-100 motion-reduce:transition-none ${entranceClass} will-change-[translate,opacity] transition-[translate,opacity] duration-[900ms] [transition-timing-function:cubic-bezier(0.23,1,0.32,1)]`}
              style={{ transitionDelay: hasEntered ? `${getEntranceDelay(index)}ms` : "0ms" }}
            >
              <a
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-lg border border-border bg-secondary/50 p-5 transition-[transform,border-color,background-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-accent hover:bg-secondary hover:shadow-lg"
              >
                <div className="min-w-0">
                  <p className="mb-1 text-sm font-semibold leading-tight text-foreground transition-colors group-hover:text-accent">
                    {cert.title}
                  </p>

                  <p className="mb-3 text-xs text-muted">
                    {cert.provider}
                  </p>

                  <div className="flex items-center gap-1 text-xs font-medium text-accent opacity-0 transition-opacity group-hover:opacity-100">
                    View Credential
                    <ExternalLink size={14} />
                  </div>
                </div>
              </a>
            </div>
          );
        })}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 border-t border-border pt-8">
        <a
          href="https://partner.skills.google/public_profiles/e2bb2abb-fb8a-4b51-882e-744f692fa177"
          target="_blank"
          rel="noopener noreferrer"
          className="group cursor-pointer rounded-lg border border-transparent p-3 text-center transition-all duration-300 hover:scale-105 hover:border-accent hover:bg-secondary/50 hover:shadow-[0_0_20px_#22c55e]"
        >
          <div className="flex items-center justify-center gap-1">
            <span className="text-2xl font-bold text-accent">45+</span>
            <span className="text-xs opacity-0 transition-opacity group-hover:opacity-100">
              ↗
            </span>
          </div>

          <div className="text-xs uppercase tracking-wide text-muted transition-colors group-hover:text-accent">
            Certifications &amp; Google Badges
          </div>
        </a>

        <div className="text-center">
          <div className="text-2xl font-bold text-accent">3</div>
          <div className="text-xs uppercase tracking-wide text-muted">
            Providers
          </div>
        </div>

        <div className="text-center">
          <div className="text-2xl font-bold text-accent">100%</div>
          <div className="text-xs uppercase tracking-wide text-muted">
            Completed
          </div>
        </div>
      </div>
    </div>
  );
}
