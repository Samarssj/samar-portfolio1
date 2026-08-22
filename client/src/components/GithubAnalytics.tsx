import { Activity, ExternalLink, Github, RefreshCw } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const ANALYTICS_BASE =
  "https://raw.githubusercontent.com/Samarssj/Samarssj/main/assets";

const assets = [
  {
    name: "GitHub Pulse",
    src: "github-stats.svg",
    alt: "Live GitHub Pulse statistics for Samar Singh",
  },
  {
    name: "Repository DNA",
    src: "github-languages.svg",
    alt: "Live repository language mix for Samar Singh",
  },
  {
    name: "Contribution Wave",
    src: "github-contributions.svg",
    alt: "Live GitHub contribution wave for Samar Singh",
  },
];

const greenAccent = `
  <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0%" stop-color="#16a34a"/>
    <stop offset="52%" stop-color="#4ade80"/>
    <stop offset="100%" stop-color="#86efac"/>
  </linearGradient>`;

const greenWaveLine = `
  <linearGradient id="waveLine" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0%" stop-color="#15803d"/>
    <stop offset="52%" stop-color="#22c55e"/>
    <stop offset="100%" stop-color="#86efac"/>
  </linearGradient>`;

function greenifySvg(svg: string) {
  let themed = svg.replace(
    /<linearGradient id="accent"[\s\S]*?<\/linearGradient>/,
    greenAccent
  );

  themed = themed.replace(
    /<linearGradient id="waveLine"[\s\S]*?<\/linearGradient>/,
    greenWaveLine
  );

  themed = themed.replace(
    /(<text\b[^>]*?)fill="#f8fafc"([^>]*>)(GitHub Pulse|Repository DNA|Contribution Wave)(<\/text>)/g,
    '$1fill="#86efac"$2$3$4'
  );

  themed = themed.replace(
    /(<text\b[^>]*?)fill="#94a3b8"([^>]*>)(Language mix across active repositories)(<\/text>)/g,
    '$1fill="#a7f3d0"$2$3$4'
  );

  themed = themed.replace(
    /(<text\b[^>]*?)fill="#f8fafc"([^>]*>)(Python|HTML|TypeScript|Jupyter Notebook|JavaScript)(<\/text>)/g,
    '$1fill="#a7f3d0"$2$3$4'
  );

  return themed;
}

export default function GithubAnalytics() {
  const [cacheKey, setCacheKey] = useState(() => Date.now());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [svgSources, setSvgSources] = useState<Record<string, string>>({});
  const objectUrlsRef = useRef<string[]>([]);

  const refresh = useCallback(() => {
    setIsRefreshing(true);
    setCacheKey(Date.now());
    window.setTimeout(() => setIsRefreshing(false), 450);
  }, []);

  useEffect(() => {
    const handleReturn = () => {
      if (document.visibilityState === "visible") refresh();
    };

    window.addEventListener("focus", handleReturn);
    document.addEventListener("visibilitychange", handleReturn);
    return () => {
      window.removeEventListener("focus", handleReturn);
      document.removeEventListener("visibilitychange", handleReturn);
    };
  }, [refresh]);

  useEffect(() => {
    let cancelled = false;

    const loadThemedAssets = async () => {
      const nextSources: Record<string, string> = {};
      const nextObjectUrls: string[] = [];

      await Promise.all(
        assets.map(async (asset) => {
          try {
            const response = await fetch(`${ANALYTICS_BASE}/${asset.src}?v=${cacheKey}`);
            if (!response.ok) throw new Error(`Unable to load ${asset.src}`);
            const svg = greenifySvg(await response.text());
            const objectUrl = URL.createObjectURL(
              new Blob([svg], { type: "image/svg+xml" })
            );
            nextObjectUrls.push(objectUrl);
            nextSources[asset.src] = objectUrl;
          } catch {
            // Keep a direct live URL as a graceful fallback if SVG fetching is blocked.
            nextSources[asset.src] = `${ANALYTICS_BASE}/${asset.src}?v=${cacheKey}`;
          }
        })
      );

      if (cancelled) {
        nextObjectUrls.forEach((url) => URL.revokeObjectURL(url));
        return;
      }

      objectUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
      objectUrlsRef.current = nextObjectUrls;
      setSvgSources(nextSources);
    };

    void loadThemedAssets();
    return () => {
      cancelled = true;
    };
  }, [cacheKey]);

  const imageUrl = useMemo(
    () => (filename: string) =>
      svgSources[filename] ?? `${ANALYTICS_BASE}/${filename}?v=${cacheKey}`,
    [cacheKey, svgSources]
  );

  return (
    <section
      aria-labelledby="github-analytics-title"
      className="mt-14 rounded-3xl border border-emerald-400/25 bg-background/70 p-3 shadow-[0_0_45px_rgba(34,197,94,0.08)] backdrop-blur-xl sm:p-5 lg:mt-20 lg:p-7"
    >
      <div className="mb-5 flex flex-col gap-4 border-b border-emerald-400/35 pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-emerald-300">
            <Activity className="h-4 w-4" />
            Live GitHub telemetry
          </div>
          <h2 id="github-analytics-title" className="text-2xl font-bold tracking-tight text-emerald-200 sm:text-3xl">
            Built in public. Measured in real time.
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
            The same GitHub Pulse, Repository DNA, and Contribution Wave visuals from my profile, refreshed directly from the repository’s live analytics feed.
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={refresh}
            className="inline-flex items-center gap-2 rounded-lg border border-emerald-400/45 bg-emerald-400/10 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-emerald-200 transition hover:border-emerald-300 hover:bg-emerald-400/20 active:scale-[0.98]"
            aria-label="Refresh live GitHub analytics"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </button>
          <a
            href="https://github.com/Samarssj/Samarssj"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted transition hover:border-emerald-400/60 hover:text-emerald-200"
          >
            <Github className="h-4 w-4" />
            Source
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      <div className="space-y-4 sm:space-y-5">
        {assets.map((asset) => (
          <figure
            key={asset.name}
            className="overflow-hidden rounded-2xl border border-emerald-400/20 bg-[#0b1020] shadow-[0_0_24px_rgba(15,23,42,0.35)]"
          >
            <img
              src={imageUrl(asset.src)}
              alt={asset.alt}
              className="block h-auto w-full"
              loading="lazy"
            />
          </figure>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-emerald-400/25 pt-4 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted">
        <span className="text-emerald-200/80">Live source · Samarssj/Samarssj</span>
        <span>Refreshes on page load, focus, and manual refresh</span>
      </div>
    </section>
  );
}
