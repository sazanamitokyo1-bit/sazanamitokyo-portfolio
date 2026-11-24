'use client';

import { useEffect, useRef } from 'react';

const lifetime = 800;

export function PointerRipples() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    const motion = matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    let ripples: { x: number; y: number; start: number }[] = [];
    let lastRipple = -Infinity;
    let frame: number | null = null;

    const clear = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
    };

    const draw = (now: number) => {
      clear();
      ripples = ripples.filter(ripple => now - ripple.start < lifetime);
      const scale = Math.min(window.devicePixelRatio || 1, 2);

      context.save();
      context.scale(scale, scale);
      context.strokeStyle = '#a6a6a6';
      context.lineWidth = 1.25;
      for (const { x, y, start } of ripples) {
        const progress = Math.max(0, (now - start) / lifetime);
        context.globalAlpha = 1 - progress;
        for (const radius of [4 + progress * 43, 8 + progress * 60]) {
          context.beginPath();
          context.arc(x, y, radius, 0, 2 * Math.PI);
          context.stroke();
        }
      }
      context.restore();
      frame = ripples.length ? requestAnimationFrame(draw) : null;
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      const now = performance.now();
      if (now - lastRipple < 65) return;
      lastRipple = now;

      const scale = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.round(innerWidth * scale);
      const height = Math.round(innerHeight * scale);
      if (canvas.width !== width) canvas.width = width;
      if (canvas.height !== height) canvas.height = height;

      ripples.push({ x: event.clientX, y: event.clientY, start: now });
      if (frame === null) frame = requestAnimationFrame(draw);
    };

    const stop = () => {
      window.removeEventListener('pointermove', onPointerMove);
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
      ripples = [];
      clear();
    };

    const syncPreference = () => {
      if (motion.matches) window.addEventListener('pointermove', onPointerMove, { passive: true });
      else stop();
    };

    syncPreference();
    motion.addEventListener('change', syncPreference);
    return () => {
      motion.removeEventListener('change', syncPreference);
      stop();
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-ripples" aria-hidden="true" />;
}
