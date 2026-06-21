import React from 'react';

/**
 * Certifications Gallery Component
 * 
 * Displays Samar's professional certifications in an interactive grid
 * with hover effects and organized by provider
 */

interface Certification {
  id: string;
  title: string;
  provider: string;
  icon: string;
  color: string;
}

const certifications: Certification[] = [
  {
    id: 'ibm-ml',
    title: 'IBM Machine Learning Professional Certificate',
    provider: 'IBM',
    icon: '🤖',
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: 'ibm-ai',
    title: 'IBM AI Enterprise Workflow Specialization',
    provider: 'IBM',
    icon: '🧠',
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: 'coursera-ai',
    title: 'AI for Scientific Research Specialization',
    provider: 'Coursera',
    icon: '🔬',
    color: 'from-purple-500 to-purple-600',
  },
  {
    id: 'gcp-infra',
    title: 'Essential Google Cloud Infrastructure: Core Services',
    provider: 'Google Cloud',
    icon: '☁️',
    color: 'from-red-500 to-orange-500',
  },
  {
    id: 'gcp-agents',
    title: 'Build Production-Ready Conversational Agents',
    provider: 'Google Cloud',
    icon: '🤖',
    color: 'from-red-500 to-orange-500',
  },
  {
    id: 'gcp-scaling',
    title: 'Elastic Google Cloud Infrastructure: Scaling and Automation',
    provider: 'Google Cloud',
    icon: '⚙️',
    color: 'from-red-500 to-orange-500',
  },
  {
    id: 'gcp-k8s',
    title: 'Getting Started with Google Kubernetes Engine',
    provider: 'Google Cloud',
    icon: '🐳',
    color: 'from-red-500 to-orange-500',
  },
  {
    id: 'gcp-prompt',
    title: 'Text Prompt Engineering Techniques',
    provider: 'Google Cloud',
    icon: '✍️',
    color: 'from-red-500 to-orange-500',
  },
  {
    id: 'gcp-cx-studio',
    title: 'Build agents with CX Agent Studio',
    provider: 'Google Cloud',
    icon: '🎯',
    color: 'from-red-500 to-orange-500',
  },
];

export default function CertificationsGallery() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <div className="text-xs font-semibold text-accent uppercase tracking-widest">Achievements</div>
        <h2 className="text-3xl sm:text-4xl font-bold">Certifications & Credentials</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {certifications.map((cert) => (
          <div
            key={cert.id}
            className="group p-5 rounded-lg border border-border bg-secondary/50 hover:border-accent/50 hover:bg-secondary transition-all duration-200 cursor-default"
          >
            <div className="flex items-start gap-4">
              <div className="text-3xl flex-shrink-0">{cert.icon}</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground leading-tight mb-1 group-hover:text-accent transition-colors">
                  {cert.title}
                </p>
                <p className="text-xs text-muted">{cert.provider}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 pt-8 border-t border-border">
        <div className="text-center">
          <div className="text-2xl font-bold text-accent">9+</div>
          <div className="text-xs text-muted uppercase tracking-wide">Certifications</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-accent">5</div>
          <div className="text-xs text-muted uppercase tracking-wide">Providers</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-accent">100%</div>
          <div className="text-xs text-muted uppercase tracking-wide">Completed</div>
        </div>
      </div>
    </div>
  );
}
