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
      const devicePixelRatio = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * devicePixelRatio;
      canvas.height = canvas.offsetHeight * devicePixelRatio;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
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

      // A slow diagnostic sweep makes the Hero workflow feel live without changing its geometry.
      const sweepX = ((timeRef.current * 1.8) % (canvas.offsetWidth + 120)) - 60;
      const sweepGradient = ctx.createLinearGradient(sweepX - 45, 0, sweepX + 45, 0);
      sweepGradient.addColorStop(0, 'rgba(16, 185, 129, 0)');
      sweepGradient.addColorStop(0.5, 'rgba(16, 185, 129, 0.22)');
      sweepGradient.addColorStop(1, 'rgba(16, 185, 129, 0)');
      ctx.fillStyle = sweepGradient;
      ctx.fillRect(sweepX - 45, 0, 90, canvas.offsetHeight);

      // Update and draw agents
      agentsRef.current.forEach((agent, agentIndex) => {
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
        const pulse = (Math.sin(timeRef.current * 0.08 + agentIndex * 1.4) + 1) / 2;

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

        // Soft orbit pulse around every node keeps the network visually alive.
        ctx.strokeStyle = agent.color + '55';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(agent.x, agent.y, radius + 5 + pulse * 4, 0, Math.PI * 2);
        ctx.stroke();

        // Main node circle with a subtle color bloom.
        const nodeGradient = ctx.createRadialGradient(agent.x - radius * 0.35, agent.y - radius * 0.4, 2, agent.x, agent.y, radius);
        nodeGradient.addColorStop(0, '#ffffff55');
        nodeGradient.addColorStop(0.28, agent.color);
        nodeGradient.addColorStop(1, agent.color + 'b5');
        ctx.fillStyle = nodeGradient;
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

      // Draw color-linked connections with a gentle traveling dash.
      ctx.lineWidth = 1.25;
      ctx.setLineDash([6, 9]);
      ctx.lineDashOffset = -timeRef.current * 0.45;
      for (let i = 0; i < agentsRef.current.length - 1; i++) {
        const from = agentsRef.current[i];
        const to = agentsRef.current[i + 1];
        const connectionGradient = ctx.createLinearGradient(from.x, from.y, to.x, to.y);
        connectionGradient.addColorStop(0, from.color + '70');
        connectionGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.2)');
        connectionGradient.addColorStop(1, to.color + '70');
        ctx.strokeStyle = connectionGradient;
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();
      }
      ctx.setLineDash([]);

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

        // Draw a luminous packet trail so each handoff reads clearly.
        for (let trail = 4; trail >= 1; trail--) {
          const trailProgress = Math.max(0, packet.progress - trail * 0.045);
          const trailX = fromAgent.x + (toAgent.x - fromAgent.x) * trailProgress;
          const trailY = fromAgent.y + (toAgent.y - fromAgent.y) * trailProgress;
          ctx.globalAlpha = 0.1 + (4 - trail) * 0.06;
          ctx.fillStyle = packet.color;
          ctx.beginPath();
          ctx.arc(trailX, trailY, 2.5 + (4 - trail) * 0.45, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;

        // Draw packet core.
        ctx.fillStyle = packet.color;
        ctx.beginPath();
        ctx.arc(x, y, 4.5, 0, Math.PI * 2);
        ctx.fill();

        // Glow
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 15);
        gradient.addColorStop(0, packet.color + '80');
        gradient.addColorStop(1, packet.color + '00');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, 15, 0, Math.PI * 2);
        ctx.fill();

        return true;
      });

      // Draw smooth ambient particles instead of per-frame random flicker.
      for (let i = 0; i < 5; i++) {
        const particleX = (Math.sin(timeRef.current * 0.012 + i * 2.1) * 0.5 + 0.5) * canvas.offsetWidth;
        const particleY = (Math.cos(timeRef.current * 0.009 + i * 1.7) * 0.5 + 0.5) * canvas.offsetHeight;
        const particleRadius = 1 + ((i + 1) % 2) * 0.7;
        ctx.globalAlpha = 0.16 + ((Math.sin(timeRef.current * 0.04 + i) + 1) / 2) * 0.2;
        ctx.fillStyle = i % 2 === 0 ? '#10b981' : '#06b6d4';
        ctx.beginPath();
        ctx.arc(particleX, particleY, particleRadius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

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
