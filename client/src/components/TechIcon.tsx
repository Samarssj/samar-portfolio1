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

type TechIconProps = {
  name: string;
  slug?: string;
  color?: string;
  fallback?: keyof typeof fallbackIcons;
};

export default function TechIcon({ name, slug, color = '10b981', fallback = 'code' }: TechIconProps) {
  const [iconUnavailable, setIconUnavailable] = useState(false);
  const FallbackIcon = fallbackIcons[fallback] ?? Code2;

  if (!slug || iconUnavailable) {
    return <FallbackIcon className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />;
  }

  return (
    <img
      src={`https://cdn.simpleicons.org/${slug}/${color}`}
      alt=""
      aria-label={`${name} icon`}
      className="h-4 w-4 shrink-0 object-contain"
      loading="lazy"
      onError={() => setIconUnavailable(true)}
    />
  );
}
