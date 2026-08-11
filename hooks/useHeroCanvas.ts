"use client";

import { useEffect, useRef } from "react";

type Dot = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
};

export function useHeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let animId: number;
    let w = 0;
    let h = 0;
    let dots: Dot[] = [];
    const COUNT = 70;

    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      active: false,
    };

    function resize() {
      if (!canvas || !canvas.parentElement) return;
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.parentElement.getBoundingClientRect();
      w = canvas.width = rect.width * dpr;
      h = canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    }

    function init() {
      const dpr = window.devicePixelRatio || 1;
      dots = [];
      for (let i = 0; i < COUNT; i++) {
        dots.push({
          x: Math.random() * w,
          y: Math.random() * h * 0.92,
          vx: (Math.random() - 0.5) * 0.2 * dpr,
          vy: (Math.random() - 0.5) * 0.2 * dpr,
          r: (Math.random() * 2.2 + 1.8) * dpr,
        });
      }
    }

    const handlePointerMove = (e: PointerEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const clientX = (e.clientX - rect.left) * dpr;
      const clientY = (e.clientY - rect.top) * dpr;

      if (clientX >= 0 && clientX <= w && clientY >= 0 && clientY <= h) {
        mouse.targetX = clientX;
        mouse.targetY = clientY;
        mouse.active = true;
      } else {
        mouse.active = false;
      }
    };

    const handlePointerLeave = () => {
      mouse.active = false;
    };

    function draw() {
      const dpr = window.devicePixelRatio || 1;
      ctx!.clearRect(0, 0, w, h);

      // Smooth lerp mouse position
      if (mouse.active) {
        mouse.x += (mouse.targetX - mouse.x) * 0.15;
        mouse.y += (mouse.targetY - mouse.y) * 0.15;
      } else {
        mouse.x += (-1000 - mouse.x) * 0.1;
        mouse.y += (-1000 - mouse.y) * 0.1;
      }

      const mouseMaxDist = 180 * dpr;

      for (let i = 0; i < dots.length; i++) {
        const a = dots[i];
        if (!reduceMotion) {
          a.x += a.vx;
          a.y += a.vy;
        }

        // Bounce off canvas boundaries
        if (a.x < 0 || a.x > w) a.vx *= -1;
        if (a.y < 0 || a.y > h * 0.95) a.vy *= -1;

        // Mouse interaction: repulsion and active connecting lines
        if (mouse.active) {
          const mdx = a.x - mouse.x;
          const mdy = a.y - mouse.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

          if (mdist < mouseMaxDist) {
            // Draw dynamic beam to cursor
            const alpha = 0.45 * (1 - mdist / mouseMaxDist);
            ctx!.strokeStyle = `rgba(35, 131, 226, ${alpha})`;
            ctx!.lineWidth = 1.6 * dpr;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(mouse.x, mouse.y);
            ctx!.stroke();

            // Soft push force away from mouse
            if (!reduceMotion && mdist > 0) {
              const push = (1 - mdist / mouseMaxDist) * 0.8 * dpr;
              a.x += (mdx / mdist) * push;
              a.y += (mdy / mdist) * push;
            }
          }
        }

        // Particle-to-particle connecting lines
        for (let j = i + 1; j < dots.length; j++) {
          const b = dots[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 140 * dpr;
          if (dist < maxDist) {
            ctx!.strokeStyle = `rgba(35,131,226,${0.34 * (1 - dist / maxDist)})`;
            ctx!.lineWidth = 1.2 * dpr;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }
      }

      // Render dots
      for (const a of dots) {
        ctx!.fillStyle = "rgba(35,131,226,0.8)";
        ctx!.beginPath();
        ctx!.arc(a.x, a.y, a.r, 0, Math.PI * 2);
        ctx!.fill();
      }

      // Render cursor glowing ring when inside hero area
      if (mouse.active && mouse.x > 0) {
        ctx!.strokeStyle = "rgba(35, 131, 226, 0.4)";
        ctx!.lineWidth = 1.8 * dpr;
        ctx!.beginPath();
        ctx!.arc(mouse.x, mouse.y, 14 * dpr, 0, Math.PI * 2);
        ctx!.stroke();

        ctx!.fillStyle = "rgba(35, 131, 226, 0.9)";
        ctx!.beginPath();
        ctx!.arc(mouse.x, mouse.y, 3 * dpr, 0, Math.PI * 2);
        ctx!.fill();
      }

      animId = requestAnimationFrame(draw);
    }

    const handleResize = () => {
      resize();
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave, { passive: true });

    resize();
    init();
    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      cancelAnimationFrame(animId);
    };
  }, []);

  return canvasRef;
}
