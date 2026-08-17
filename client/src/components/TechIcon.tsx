import {
  BrainCircuit,
  Braces,
  ChartNoAxesCombined,
  Code2,
  Database,
  GitBranch,
  KeyRound,
  Network,
  ServerCog,
  Sparkles,
  Webhook,
  Workflow,
  type LucideIcon,
} from 'lucide-react';
import { useState } from 'react';

const fallbackIcons: Record<string, LucideIcon> = {
  code: Code2,
  database: Database,
  brain: BrainCircuit,
  key: KeyRound,
  network: Network,
  server: ServerCog,
  sparkles: Sparkles,
  workflow: Workflow,
  branch: GitBranch,
  chart: ChartNoAxesCombined,
  webhook: Webhook,
  braces: Braces,
};

export type TechIconFallback = keyof typeof fallbackIcons;

type TechIconProps = {
  name: string;
  slug?: string;
  color?: string;
  fallback?: TechIconFallback;
  sizeClass?: string;
};

export default function TechIcon({
  name,
  slug,
  color = '10b981',
  fallback = 'code',
  sizeClass = 'h-4 w-4',
}: TechIconProps) {
  const [iconUnavailable, setIconUnavailable] = useState(false);
  const FallbackIcon = fallbackIcons[fallback] ?? Code2;

  if (!slug || iconUnavailable) {
    return <FallbackIcon className={`${sizeClass} shrink-0 text-accent`} aria-hidden="true" />;
  }

  return (
    <img
      src={`https://cdn.simpleicons.org/${slug}/${color}`}
      alt=""
      aria-label={`${name} icon`}
      className={`${sizeClass} shrink-0 object-contain`}
      loading="lazy"
      onError={() => setIconUnavailable(true)}
    />
  );
}
