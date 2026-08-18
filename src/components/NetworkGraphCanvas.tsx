import React, { useEffect, useRef } from 'react';

interface NetworkGraphCanvasProps {
  className?: string;
  nodeCount?: number;
}

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  color: string;
  glowColor: string;
  pulsePhase: number;
  isZKNode: boolean;
}

interface PulsePacket {
  fromNode: Node;
  toNode: Node;
  progress: number;
  speed: number;
  color: string;
}

export const NetworkGraphCanvas: React.FC<NetworkGraphCanvasProps> = ({
  className = '',
  nodeCount = 42
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Node palette: Electric Violet (#8B5CF6), Cyber Cyan (#22D3EE), Warm Amber (#F59E0B)
    const colorPalette = [
      { color: '#8B5CF6', glow: 'rgba(139, 92, 246, 0.6)', isZK: true },
      { color: '#A78BFA', glow: 'rgba(167, 139, 250, 0.6)', isZK: true },
      { color: '#22D3EE', glow: 'rgba(34, 211, 238, 0.6)', isZK: false },
      { color: '#67E8F9', glow: 'rgba(103, 232, 249, 0.5)', isZK: false },
      { color: '#F59E0B', glow: 'rgba(245, 158, 11, 0.7)', isZK: false }
    ];

    // Responsive node count
    const effectiveCount = width < 640 ? 22 : width < 1024 ? 32 : nodeCount;

    const nodes: Node[] = [];
    for (let i = 0; i < effectiveCount; i++) {
      const p = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      const radius = Math.random() * 2.2 + 1.8;
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * (prefersReducedMotion ? 0 : 0.35),
        vy: (Math.random() - 0.5) * (prefersReducedMotion ? 0 : 0.35),
        radius: radius,
        baseRadius: radius,
        color: p.color,
        glowColor: p.glow,
        pulsePhase: Math.random() * Math.PI * 2,
        isZKNode: p.isZK
      });
    }

    const pulses: PulsePacket[] = [];
    let lastPulseTime = 0;

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Mouse proximity effect
    let mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Render loop
    const maxConnectionDistance = width < 640 ? 110 : 150;

    const render = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      // Trigger occasional anonymous ZK signal packets along connection edges
      if (!prefersReducedMotion && time - lastPulseTime > 1200 && pulses.length < 6) {
        lastPulseTime = time;
        const sourceIndex = Math.floor(Math.random() * nodes.length);
        const source = nodes[sourceIndex];
        // find a close neighbor
        const closeNeighbors = nodes.filter((n, idx) => {
          if (idx === sourceIndex) return false;
          const dx = n.x - source.x;
          const dy = n.y - source.y;
          return Math.hypot(dx, dy) < maxConnectionDistance;
        });

        if (closeNeighbors.length > 0) {
          const target = closeNeighbors[Math.floor(Math.random() * closeNeighbors.length)];
          pulses.push({
            fromNode: source,
            toNode: target,
            progress: 0,
            speed: 0.015 + Math.random() * 0.01,
            color: source.isZKNode ? '#22D3EE' : '#F59E0B'
          });
        }
      }

      // Draw connection lines
      for (let i = 0; i < nodes.length; i++) {
        const nodeA = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const nodeB = nodes[j];
          const dx = nodeB.x - nodeA.x;
          const dy = nodeB.y - nodeA.y;
          const dist = Math.hypot(dx, dy);

          if (dist < maxConnectionDistance) {
            const alpha = (1 - dist / maxConnectionDistance) * 0.22;
            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(nodeB.x, nodeB.y);
            
            // Gradient link line
            const grad = ctx.createLinearGradient(nodeA.x, nodeA.y, nodeB.x, nodeB.y);
            grad.addColorStop(0, `rgba(139, 92, 246, ${alpha})`);
            grad.addColorStop(1, `rgba(34, 211, 238, ${alpha})`);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
        }
      }

      // Draw and advance signal pulse packets
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.progress += p.speed;

        if (p.progress >= 1) {
          pulses.splice(i, 1);
          continue;
        }

        const currentX = p.fromNode.x + (p.toNode.x - p.fromNode.x) * p.progress;
        const currentY = p.fromNode.y + (p.toNode.y - p.fromNode.y) * p.progress;

        ctx.beginPath();
        ctx.arc(currentX, currentY, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Update and draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        if (!prefersReducedMotion) {
          node.x += node.vx;
          node.y += node.vy;

          // Bounce off boundaries
          if (node.x < 0 || node.x > width) node.vx *= -1;
          if (node.y < 0 || node.y > height) node.vy *= -1;

          // Interactive mouse repel / attract
          const mdx = node.x - mouse.x;
          const mdy = node.y - mouse.y;
          const mDist = Math.hypot(mdx, mdy);
          if (mDist < 120 && mDist > 0) {
            const force = (1 - mDist / 120) * 0.8;
            node.x += (mdx / mDist) * force * 1.5;
            node.y += (mdy / mDist) * force * 1.5;
          }

          node.pulsePhase += 0.025;
        }

        const pulseScale = 1 + Math.sin(node.pulsePhase) * 0.2;
        const drawRadius = node.baseRadius * pulseScale;

        // Node circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, drawRadius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.shadowColor = node.glowColor;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Subtle outer ring for primary ZK nodes
        if (node.isZKNode) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, drawRadius * 2, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(139, 92, 246, ${0.15 + Math.sin(node.pulsePhase) * 0.1})`;
          ctx.lineWidth = 0.75;
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [nodeCount]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none w-full h-full opacity-65 ${className}`}
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
};
