import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const agents = [
  { id: 'root', label: 'Root Agent', color: '#10b981', x: '50%', y: '25%' },
  { id: 'sub1', label: 'Research', color: '#06b6d4', x: '15%', y: '70%' },
  { id: 'sub2', label: 'Execution', color: '#8b5cf6', x: '50%', y: '70%' },
  { id: 'sub3', label: 'Quality', color: '#f59e0b', x: '85%', y: '70%' },
];

const flows = [
  { from: 'root', to: 'sub1' },
  { from: 'root', to: 'sub2' },
  { from: 'root', to: 'sub3' },
  { from: 'sub1', to: 'root' },
  { from: 'sub2', to: 'root' },
  { from: 'sub3', to: 'root' },
];

export default function MultiAgentWorkflow() {
  const [activePacket, setActivePacket] = useState(0);

  useEffect(() => {
    // Sequenced flow: Root -> Sub1 -> Root -> Sub2 -> Root -> Sub3 -> Root
    const sequence = [0, 3, 1, 4, 2, 5]; 
    let step = 0;
    const interval = setInterval(() => {
      setActivePacket(sequence[step]);
      step = (step + 1) % sequence.length;
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full bg-background/40 backdrop-blur-sm rounded-xl border border-border/50 overflow-hidden">
      {/* SVG for connections */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {flows.map((flow, i) => {
          const fromAgent = agents.find(a => a.id === flow.from)!;
          const toAgent = agents.find(a => a.id === flow.to)!;
          return (
            <g key={i}>
              <motion.line
                x1={fromAgent.x}
                y1={fromAgent.y}
                x2={toAgent.x}
                y2={toAgent.y}
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
              <AnimatePresence>
                {activePacket === i && (
                  <motion.circle
                    r="3.5"
                    fill={fromAgent.color}
                    initial={{ cx: fromAgent.x, cy: fromAgent.y, opacity: 0, scale: 0 }}
                    animate={{ 
                      cx: toAgent.x,
                      cy: toAgent.y,
                      opacity: [0, 1, 1, 0],
                      scale: [0, 1, 1, 0]
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ 
                      duration: 2.5, 
                      ease: "easeInOut",
                    }}
                    style={{ filter: `drop-shadow(0 0 10px ${fromAgent.color})` }}
                  />
                )}
              </AnimatePresence>
            </g>
          );
        })}
      </svg>

      {/* Agent Nodes */}
      {agents.map((agent) => (
        <div
          key={agent.id}
          className="absolute flex flex-col items-center justify-center gap-1"
          style={{ left: agent.x, top: agent.y, transform: 'translate(-50%, -50%)' }}
        >
          <div 
            className="w-8 h-8 rounded-lg border-2 flex items-center justify-center bg-background shadow-lg transition-colors duration-300"
            style={{ borderColor: agent.color, boxShadow: `0 0 10px ${agent.color}20` }}
          >
            <div className="w-1 h-1 rounded-full" style={{ backgroundColor: agent.color }} />
          </div>
          <span className="text-[8px] font-bold uppercase tracking-tighter text-muted-foreground whitespace-nowrap">
            {agent.label}
          </span>
        </div>
      ))}

      {/* Overlay status - Repositioned much lower to avoid overlap */}
      <div className="absolute bottom-0 w-full flex justify-center items-center gap-1 translate-y-6">
        <div className="w-1 h-1 rounded-full bg-accent animate-pulse" />
        <span className="text-[7px] text-accent/90 font-mono tracking-[0.2em]">AGENT_HUB_ACTIVE</span>
      </div>
    </div>
  );
}
