"use client";

import { useEffect, useRef } from "react";

const ROWS = 70;
const COLS = 170;

// Height of the wave surface at x (0..1) and depth z (0 far .. 1 near)
function height(x: number, z: number, t: number) {
  return (
    Math.sin(x * 5.2 + t * 0.5 + z * 2.0) * 0.55 +
    Math.sin(x * 11 + z * 4.5 - t * 0.8) * 0.25 +
    Math.sin(x * 2.1 - t * 0.3 + z * 6) * 0.7
  );
}

export default function WaveCanvas({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let W = 0,
      H = 0,
      raf = 0;

    const draw = (t: number) => {
      ctx.clearRect(0, 0, W, H);
      const top = H * 0.62,
        bottom = H * 1.02,
        amp = H * 0.075;
      for (let j = 0; j < ROWS; j++) {
        const z = j / (ROWS - 1);
        const persp = 0.35 + z * 0.9;
        const baseY = top + Math.pow(z, 1.35) * (bottom - top);
        const size = 0.5 + z * 1.5;
        const alpha = 0.12 + z * 0.75;
        for (let i = 0; i < COLS; i++) {
          const u = i / (COLS - 1);
          const x = (0.5 + (u - 0.5) * (1.5 + persp * 0.4)) * W;
          if (x < -10 || x > W + 10) continue;
          const y = baseY - height(u, z, t) * amp * persp;
          const edge = Math.min(1, Math.min(u, 1 - u) * 6);
          ctx.fillStyle = `rgba(45,228,143,${(alpha * edge).toFixed(3)})`;
          ctx.fillRect(x, y, size, size);
        }
      }
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reduced) draw(0);
    };

    const loop = (ms: number) => {
      draw(ms / 1000);
      raf = requestAnimationFrame(loop);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    if (!reduced) raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
