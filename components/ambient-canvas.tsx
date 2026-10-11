'use client';

import { useEffect, useRef } from 'react';

type Particle = {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  color: string;
};

const COLORS = ['rgba(120, 53, 15, 0.05)', 'rgba(217, 119, 6, 0.03)', 'rgba(46, 16, 101, 0.05)'];

export default function AmbientCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const a11yReduce = document.documentElement.classList.contains('a11y-reduce-motion');
    if (reducedMotion || a11yReduce) {
      return undefined;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    let frame = 0;
    let particles: Particle[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initParticles = () => {
      particles = Array.from({ length: 40 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 200 + 100,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        color: COLORS[Math.floor(Math.random() * COLORS.length)] ?? COLORS[0],
      }));
    };

    const draw = () => {
      ctx.fillStyle = '#0c0a09';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (const particle of particles) {
        particle.x += particle.vx;
        particle.y += particle.vy;
        if (particle.x < -particle.size) particle.x = canvas.width + particle.size;
        if (particle.x > canvas.width + particle.size) particle.x = -particle.size;
        if (particle.y < -particle.size) particle.y = canvas.height + particle.size;
        if (particle.y > canvas.height + particle.size) particle.y = -particle.size;

        const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.size);
        gradient.addColorStop(0, particle.color);
        gradient.addColorStop(1, 'rgba(12, 10, 9, 0)');
        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = () => {
      if (document.documentElement.classList.contains('a11y-reduce-motion')) {
        ctx.fillStyle = '#0c0a09';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        return;
      }
      draw();
      frame = window.requestAnimationFrame(loop);
    };

    resize();
    initParticles();
    loop();

    const onResize = () => {
      resize();
      initParticles();
    };

    window.addEventListener('resize', onResize);

    const observer = new MutationObserver(() => {
      if (document.documentElement.classList.contains('a11y-reduce-motion')) {
        window.cancelAnimationFrame(frame);
        ctx.fillStyle = '#0c0a09';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('resize', onResize);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
      aria-hidden="true"
    />
  );
}
