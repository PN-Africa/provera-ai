"use client";

import { useEffect, useRef } from "react";

export function ParticleWave() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!canvas || !ctx) return;

    let animationId = 0;
    let width = 0;
    let height = 0;
    let time = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      width = rect.width;
      height = rect.height;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Subtle green glow beneath the content
      const glow = ctx.createRadialGradient(
        width * 0.5,
        height * 0.88,
        0,
        width * 0.5,
        height * 0.88,
        width * 0.65,
      );

      glow.addColorStop(0, "rgba(0, 210, 125, 0.09)");
      glow.addColorStop(1, "rgba(0, 210, 125, 0)");

      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      // Flowing field of green particles
      const spacingX = width < 640 ? 13 : 10;
      const spacingZ = 7;
      const columns = Math.ceil(width / spacingX);
      const rows = 49;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
          const x = col * spacingX;
          const z = row / rows;

          const envelope = Math.pow(z, 0.72);
          const wave =
            Math.sin(col * 0.038 + row * 0.105 + time) * 27 +
            Math.sin(col * 0.019 - row * 0.09 + time * 0.7) * 35 +
            Math.cos(col * 0.012 + time * 0.5) * 20;

          const perspective = z * z * height * 0.23;
          const y =
            height * 0.57 +
            z * height * 0.39 +
            wave * envelope -
            perspective * 0.2;

          // Fade particles toward the top and outer edges
          const centerFade = Math.max(
            0.15,
            1 - Math.abs(x - width / 2) / (width * 0.8),
          );

          const alpha = Math.min(0.85, (0.12 + z * 0.65) * centerFade);

          const radius = 0.65 + z * 0.85;

          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 235, 145, ${alpha})`;
          ctx.fill();
        }
      }

      time += 0.008;
      animationId = requestAnimationFrame(draw);
    };

    resize();
    draw();

    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
