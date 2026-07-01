import React from "react";
import { ExternalLink } from "lucide-react";

interface Certification {
  id: string;
  title: string;
  provider: string;
  icon: string;
  color: string;
  url: string;
}

const certifications: Certification[] = [
  {
    id: "ibm-ml",
    title: "IBM Machine Learning Professional Certificate",
    provider: "IBM",
    icon: "🤖",
    color: "from-blue-500 to-blue-600",
    url: "https://coursera.org/share/4d0f5b448eb9bf8b202cfcd075bf925b",
  },
  {
    id: "ibm-ai",
    title: "IBM AI Enterprise Workflow Specialization",
    provider: "IBM",
    icon: "🧠",
    color: "from-blue-500 to-blue-600",
    url: "https://coursera.org/share/b0e3b089723ce42f0aa3308a38d36f1e",
  },
  {
    id: "coursera-ai",
    title: "AI for Scientific Research Specialization",
    provider: "Coursera",
    icon: "🔬",
    color: "from-purple-500 to-purple-600",
    url: "https://coursera.org/share/b14960a82bbb4a4e70b912c1141a92c6",
  },
  {
    id: "gcp-infra",
    title: "Essential Google Cloud Infrastructure: Core Services",
    provider: "Google Cloud",
    icon: "☁️",
    color: "from-red-500 to-orange-500",
    url: "https://partner.skills.google/public_profiles/e2bb2abb-fb8a-4b51-882e-744f692fa177/badges/24584405",
  },
  {
    id: "gcp-agents",
    title: "Build Production-Ready Conversational Agents",
    provider: "Google Cloud",
    icon: "🤖",
    color: "from-red-500 to-orange-500",
    url: "https://partner.skills.google/public_profiles/e2bb2abb-fb8a-4b51-882e-744f692fa177/badges/24379436",
  },
  {
    id: "gcp-scaling",
    title: "Elastic Google Cloud Infrastructure: Scaling and Automation",
    provider: "Google Cloud",
    icon: "⚙️",
    color: "from-red-500 to-orange-500",
    url: "https://partner.skills.google/public_profiles/e2bb2abb-fb8a-4b51-882e-744f692fa177/badges/24370472",
  },
  {
    id: "gcp-k8s",
    title: "Getting Started with Google Kubernetes Engine",
    provider: "Google Cloud",
    icon: "🐳",
    color: "from-red-500 to-orange-500",
    url: "https://partner.skills.google/public_profiles/e2bb2abb-fb8a-4b51-882e-744f692fa177/badges/24453923",
  },
  {
    id: "gcp-prompt",
    title: "Text Prompt Engineering Techniques",
    provider: "Google Cloud",
    icon: "✍️",
    color: "from-red-500 to-orange-500",
    url: "https://partner.skills.google/public_profiles/e2bb2abb-fb8a-4b51-882e-744f692fa177/badges/24421265",
  },
  {
    id: "gcp-cx-studio",
    title: "Build agents with CX Agent Studio",
    provider: "Google Cloud",
    icon: "🎯",
    color: "from-red-500 to-orange-500",
    url: "https://partner.skills.google/public_profiles/e2bb2abb-fb8a-4b51-882e-744f692fa177/badges/24327489",
  },
];

export default function CertificationsGallery() {
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {certifications.map((cert) => (
          <a
            key={cert.id}
            href={cert.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block p-5 rounded-lg border border-border bg-secondary/50 hover:border-accent hover:bg-secondary hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              <div className="text-3xl flex-shrink-0">{cert.icon}</div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground leading-tight mb-1 group-hover:text-accent transition-colors">
                  {cert.title}
                </p>

                <p className="text-xs text-muted mb-3">
                  {cert.provider}
                </p>

                <div className="flex items-center gap-1 text-xs text-accent font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  View Credential
                  <ExternalLink size={14} />
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Stats */}
  {/* Stats */}
<div className="grid grid-cols-3 gap-4 pt-8 border-t border-border">

  <a
    href="https://partner.skills.google/public_profiles/e2bb2abb-fb8a-4b51-882e-744f692fa177"
    target="_blank"
    rel="noopener noreferrer"
    className="group text-center rounded-lg p-3 transition-all duration-300 hover:bg-secondary/50 hover:scale-105 cursor-pointer"
  >
    <div className="flex items-center justify-center gap-1">
      <span className="text-2xl font-bold text-accent">40+</span>
      <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">
        ↗
      </span>
    </div>

    <div className="text-xs text-muted uppercase tracking-wide group-hover:text-accent transition-colors">
      Certifications &amp; Google Badges
    </div>
  </a>

  <div className="text-center">
    <div className="text-2xl font-bold text-accent">3</div>
    <div className="text-xs text-muted uppercase tracking-wide">
      Providers
    </div>
  </div>

  <div className="text-center">
    <div className="text-2xl font-bold text-accent">100%</div>
    <div className="text-xs text-muted uppercase tracking-wide">
      Completed
    </div>
  </div>

</div>
    
</div>
  );
}
