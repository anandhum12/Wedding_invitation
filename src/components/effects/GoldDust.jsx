import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * Lightweight canvas of drifting, twinkling gold motes.
 * Pauses when off-screen or when the tab is hidden; DPR capped for mobile.
 */
export default function GoldDust({ className = '', density = 1, rgb = '217,185,100' }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    let particles = [];

    const spawn = (anywhere) => ({
      x: Math.random() * w,
      y: anywhere ? Math.random() * h : h + 8,
      r: Math.random() * 1.6 + 0.4,
      vy: -(Math.random() * 0.28 + 0.06),
      vx: (Math.random() - 0.5) * 0.12,
      ph: Math.random() * Math.PI * 2,
      tw: Math.random() * 0.02 + 0.006,
    });

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(70, (w * h) / 20000) * density);
      particles = Array.from({ length: count }, () => spawn(true));
      if (reduce) frame(false);
    };

    const frame = (move) => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        if (move) {
          p.y += p.vy;
          p.x += p.vx + Math.sin(p.ph) * 0.15;
          p.ph += p.tw;
          if (p.y < -8) Object.assign(p, spawn(false));
        }
        const a = 0.3 + 0.5 * (0.5 + 0.5 * Math.sin(p.ph * 2));
        if (p.r > 1.3) {
          ctx.fillStyle = `rgba(${rgb},${a * 0.14})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 3.4, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = `rgba(${rgb},${a})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = () => {
      frame(true);
      raf = requestAnimationFrame(loop);
    };
    const play = () => {
      cancelAnimationFrame(raf);
      if (!reduce && visible && !document.hidden) raf = requestAnimationFrame(loop);
    };

    resize();
    play();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      play();
    });
    io.observe(canvas);
    document.addEventListener('visibilitychange', play);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', play);
    };
  }, [density, rgb, reduce]);

  return <canvas ref={ref} aria-hidden="true" className={`pointer-events-none ${className}`} />;
}
