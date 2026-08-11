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

    function draw() {
      const dpr = window.devicePixelRatio || 1;
      ctx!.clearRect(0, 0, w, h);

      for (let i = 0; i < dots.length; i++) {
        const a = dots[i];
        if (!reduceMotion) {
          a.x += a.vx;
          a.y += a.vy;
        }
        if (a.x < 0 || a.x > w) a.vx *= -1;
        if (a.y < 0 || a.y > h * 0.95) a.vy *= -1;

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

      for (const a of dots) {
        ctx!.fillStyle = "rgba(35,131,226,0.8)";
        ctx!.beginPath();
        ctx!.arc(a.x, a.y, a.r, 0, Math.PI * 2);
        ctx!.fill();
      }

      animId = requestAnimationFrame(draw);
    }

    const handleResize = () => {
      resize();
    };

    window.addEventListener("resize", handleResize);
    resize();
    init();
    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return canvasRef;
}
