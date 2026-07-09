import React from 'react';
import MultiAgentWorkflow from './MultiAgentWorkflow';

/**
 * AI Engineering Showcase Component
 * 
 * Displays Samar's expertise in AI systems, multi-agent architectures,
 * and agentic workflows with visual diagrams and descriptions
 */

export default function AIShowcase() {
  return (
    <div className="space-y-12">
      <div className="space-y-2">
        <div className="text-xs font-semibold text-accent uppercase tracking-widest">Expertise</div>
        <h2 className="text-3xl sm:text-4xl font-bold">AI Engineering Showcase</h2>
        <p className="text-lg text-muted max-w-2xl">
          Specialized in building production-grade AI systems, autonomous agent orchestration, and intelligent automation platforms.
        </p>
      </div>

      <div className="relative flex flex-col items-center">
        {/* Top Grid (Cards 1 & 2) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-32 gap-y-8 lg:gap-y-12 relative z-10 order-1">
          {/* Multi-Agent Architecture */}
          <div className="p-6 rounded-lg border border-accent bg-background/50 shadow-[0_0_20px_#22c55e] active:bg-accent/10 active:scale-[0.99] md:border-border md:shadow-none hover:scale-[1.01] md:hover:border-accent md:hover:shadow-[0_0_20px_#22c55e] transition-all duration-300 cursor-pointer">
            <div className="mb-6">
              <div className="text-3xl mb-3">🔗</div>
              <h3 className="text-xl font-semibold mb-2">Multi-Agent Orchestration</h3>
              <p className="text-sm text-muted">
                Design and deployment of autonomous agent systems with intelligent task routing, inter-agent communication, and distributed decision-making.
              </p>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground">Agent Communication Patterns</p>
                  <p className="text-xs text-muted mt-0.5">Publish-subscribe, request-reply, and broadcast patterns</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground">Task Delegation</p>
                  <p className="text-xs text-muted mt-0.5">Dynamic workload distribution and load balancing</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground">State Management</p>
                  <p className="text-xs text-muted mt-0.5">Distributed state tracking and consistency protocols</p>
                </div>
              </div>
            </div>
          </div>

          {/* LLM & Prompt Engineering */}
          <div className="p-6 rounded-lg border border-accent bg-background/50 shadow-[0_0_20px_#22c55e] active:bg-accent/10 active:scale-[0.99] md:border-border md:shadow-none hover:scale-[1.01] md:hover:border-accent md:hover:shadow-[0_0_20px_#22c55e] transition-all duration-300 cursor-pointer">
            <div className="mb-6">
              <div className="text-3xl mb-3">🧠</div>
              <h3 className="text-xl font-semibold mb-2">LLM & Prompt Engineering</h3>
              <p className="text-sm text-muted">
                Advanced prompt engineering, fine-tuning strategies, and evaluation frameworks for production LLM applications.
              </p>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground">Prompt Optimization</p>
                  <p className="text-xs text-muted mt-0.5">Chain-of-thought, few-shot learning, and in-context learning</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground">RAG Systems</p>
                  <p className="text-xs text-muted mt-0.5">Retrieval-augmented generation with vector databases</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground">Model Evaluation</p>
                  <p className="text-xs text-muted mt-0.5">Metrics, benchmarking, and quality assurance frameworks</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Central Hub Diagram */}
        <div className="lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 w-full max-w-[280px] lg:w-44 h-48 lg:h-40 z-20 pointer-events-none my-8 lg:my-0 order-2 lg:order-none">
          <div className="w-full h-full pointer-events-auto">
            <MultiAgentWorkflow />
          </div>
        </div>

        {/* Bottom Grid (Cards 3 & 4) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-32 gap-y-8 lg:gap-y-12 relative z-10 order-3">
          {/* Tool Calling & API Integration */}
          <div className="p-6 rounded-lg border border-accent bg-background/50 shadow-[0_0_20px_#22c55e] active:bg-accent/10 active:scale-[0.99] md:border-border md:shadow-none hover:scale-[1.01] md:hover:border-accent md:hover:shadow-[0_0_20px_#22c55e] transition-all duration-300 cursor-pointer">
            <div className="mb-6">
              <div className="text-3xl mb-3">🔧</div>
              <h3 className="text-xl font-semibold mb-2">Tool Calling & API Integration</h3>
              <p className="text-sm text-muted">
                Seamless integration of external APIs, tools, and services with intelligent agent decision-making.
              </p>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground">Function Calling</p>
                  <p className="text-xs text-muted mt-0.5">OpenAI function calling, Gemini tool use, and custom schemas</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground">Workflow Automation</p>
                  <p className="text-xs text-muted mt-0.5">REST APIs, webhooks, and event-driven architectures</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground">Error Handling</p>
                  <p className="text-xs text-muted mt-0.5">Retry logic, fallback strategies, and graceful degradation</p>
                </div>
              </div>
            </div>
          </div>

          {/* Conversational AI */}
          <div className="p-6 rounded-lg border border-accent bg-background/50 shadow-[0_0_20px_#22c55e] active:bg-accent/10 active:scale-[0.99] md:border-border md:shadow-none hover:scale-[1.01] md:hover:border-accent md:hover:shadow-[0_0_20px_#22c55e] transition-all duration-300 cursor-pointer">
            <div className="mb-6">
              <div className="text-3xl mb-3">💬</div>
              <h3 className="text-xl font-semibold mb-2">Conversational AI Systems</h3>
              <p className="text-sm text-muted">
                Enterprise-grade chatbots and conversational agents with context awareness and multi-turn dialogue management.
              </p>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground">Dialogue Management</p>
                  <p className="text-xs text-muted mt-0.5">Context tracking, intent recognition, and slot filling</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground">NLU & NLP</p>
                  <p className="text-xs text-muted mt-0.5">Entity extraction, sentiment analysis, and semantic understanding</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground">Personalization</p>
                  <p className="text-xs text-muted mt-0.5">User profiling, preference learning, and adaptive responses</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="p-8 rounded-lg border border-border bg-accent/5 hover:border-accent hover:shadow-[0_0_25px_#22c55e] transition-all duration-300">
        <h3 className="text-lg font-semibold mb-6">AI & Cloud Technologies</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            { name: 'Vertex AI', icon: '🎯' },
            { name: 'Dialogflow CX', icon: '💬' },
            { name: 'Gemini', icon: '✨' },
            { name: 'Cloud Run', icon: '🚀' },
            { name: 'Firestore', icon: '🗄️' },
            { name: 'Vector DB', icon: '📊' },
            { name: 'Prompt Eng.', icon: '✍️' },
            { name: 'Feature Eng.', icon: '⚙️' },
            { name: 'NLP/NLU', icon: '🧠' },
            { name: 'REST APIs', icon: '🔌' },
          ].map((tech) => (
            <div key={tech.name} className="flex flex-col items-center gap-2 p-4 rounded-xl border border-border bg-background/50 hover:scale-105 hover:border-accent hover:shadow-[0_0_15px_#22c55e] transition-all duration-300 cursor-pointer">
              <div className="text-2xl">{tech.icon}</div>
              <p className="text-xs font-medium text-center text-muted">{tech.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
