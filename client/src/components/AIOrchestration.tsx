import React, { useEffect, useRef } from 'react';

/**
 * AIOrchestration Component
 * 
 * Renders a live interactive AI agent orchestration visualization with:
 * - Animated autonomous agent nodes
 * - Dynamic data flow connections
 * - Real-time workflow execution indicators
 * - Particle-based data stream effects
 * 
 * Design Philosophy: Enterprise AI infrastructure dashboard aesthetic
 * - Smooth, continuous motion (no flashy effects)
 * - Resembles production Vertex AI / DataDog dashboards
 * - Conveys intelligent automation and autonomous systems
 */

interface Agent {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  label: string;
  status: 'idle' | 'processing' | 'active';
  color: string;
}

interface DataPacket {
  id: string;
  fromAgent: string;
  toAgent: string;
  progress: number;
  color: string;
}

export default function AIOrchestration() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const agentsRef = useRef<Agent[]>([]);
  const packetsRef = useRef<DataPacket[]>([]);
  const animationRef = useRef<number | undefined>(undefined);
  const timeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize agents
    const initAgents = () => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      const agentLabels = ['Data\nProcessor', 'LLM\nEngine', 'Vector\nDB', 'Task\nRouter', 'Output\nFormatter'];
      
      agentsRef.current = agentLabels.map((label, i) => ({
        id: `agent-${i}`,
        x: (width / (agentLabels.length + 1)) * (i + 1),
        y: height * 0.5 + (Math.random() - 0.5) * 80,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        label,
        status: 'idle' as const,
        color: ['#10b981', '#f59e0b', '#06b6d4', '#8b5cf6', '#ec4899'][i],
      }));
    };

    initAgents();

    // Animation loop
    const animate = () => {
      timeRef.current += 1;

      // Clear canvas
      ctx.fillStyle = '#0a0a0f';
      ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      // Draw subtle grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 0.5;
      const gridSize = 60;
      for (let x = 0; x < canvas.offsetWidth; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.offsetHeight);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.offsetHeight; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.offsetWidth, y);
        ctx.stroke();
      }

      // Update and draw agents
      agentsRef.current.forEach((agent) => {
        // Gentle floating motion
        agent.x += agent.vx;
        agent.y += agent.vy;

        // Bounce off edges
        if (agent.x < 40 || agent.x > canvas.offsetWidth - 40) agent.vx *= -1;
        if (agent.y < 40 || agent.y > canvas.offsetHeight - 40) agent.vy *= -1;

        // Clamp position
        agent.x = Math.max(40, Math.min(canvas.offsetWidth - 40, agent.x));
        agent.y = Math.max(40, Math.min(canvas.offsetHeight - 40, agent.y));

        // Randomly change status
        if (Math.random() < 0.02) {
          agent.status = ['idle', 'processing', 'active'][Math.floor(Math.random() * 3)] as any;
        }

        // Draw agent node
        const radius = agent.status === 'processing' ? 22 : 18;
        
        // Glow effect for active agents
        if (agent.status === 'active' || agent.status === 'processing') {
          const gradient = ctx.createRadialGradient(agent.x, agent.y, 0, agent.x, agent.y, radius * 2);
          gradient.addColorStop(0, agent.color + '40');
          gradient.addColorStop(1, agent.color + '00');
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(agent.x, agent.y, radius * 2, 0, Math.PI * 2);
          ctx.fill();
        }

        // Main node circle
        ctx.fillStyle = agent.color;
        ctx.beginPath();
        ctx.arc(agent.x, agent.y, radius, 0, Math.PI * 2);
        ctx.fill();

        // Node border
        ctx.strokeStyle = agent.color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(agent.x, agent.y, radius, 0, Math.PI * 2);
        ctx.stroke();

        // Pulsing indicator for processing
        if (agent.status === 'processing') {
          const pulseSize = 8 + Math.sin(timeRef.current * 0.1) * 4;
          ctx.strokeStyle = agent.color + '80';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(agent.x, agent.y, pulseSize, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Draw label
        ctx.fillStyle = '#f0eff5';
        ctx.font = 'bold 11px "Syne", sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const lines = agent.label.split('\n');
        lines.forEach((line, idx) => {
          ctx.fillText(line, agent.x, agent.y - 5 + idx * 12);
        });
      });

      // Draw connections between agents
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1;
      for (let i = 0; i < agentsRef.current.length - 1; i++) {
        const from = agentsRef.current[i];
        const to = agentsRef.current[i + 1];
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();
      }

      // Generate data packets
      if (timeRef.current % 40 === 0 && agentsRef.current.length > 1) {
        const fromIdx = Math.floor(Math.random() * (agentsRef.current.length - 1));
        const toIdx = fromIdx + 1 + Math.floor(Math.random() * (agentsRef.current.length - fromIdx - 1));
        packetsRef.current.push({
          id: `packet-${timeRef.current}`,
          fromAgent: `agent-${fromIdx}`,
          toAgent: `agent-${toIdx}`,
          progress: 0,
          color: agentsRef.current[fromIdx].color,
        });
      }

      // Update and draw data packets
      packetsRef.current = packetsRef.current.filter((packet) => {
        const fromAgent = agentsRef.current.find((a) => a.id === packet.fromAgent);
        const toAgent = agentsRef.current.find((a) => a.id === packet.toAgent);

        if (!fromAgent || !toAgent) return false;

        packet.progress += 0.02;
        if (packet.progress > 1) return false;

        // Interpolate position
        const x = fromAgent.x + (toAgent.x - fromAgent.x) * packet.progress;
        const y = fromAgent.y + (toAgent.y - fromAgent.y) * packet.progress;

        // Draw packet
        ctx.fillStyle = packet.color;
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();

        // Glow
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 12);
        gradient.addColorStop(0, packet.color + '40');
        gradient.addColorStop(1, packet.color + '00');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, 12, 0, Math.PI * 2);
        ctx.fill();

        return true;
      });

      // Draw particle streams
      ctx.fillStyle = 'rgba(16, 185, 129, 0.15)';
      for (let i = 0; i < 3; i++) {
        const x = Math.random() * canvas.offsetWidth;
        const y = Math.random() * canvas.offsetHeight;
        ctx.beginPath();
        ctx.arc(x, y, Math.random() * 2 + 1, 0, Math.PI * 2);
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden border border-border bg-secondary">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: 'block' }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}
