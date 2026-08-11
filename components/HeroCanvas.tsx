"use client";

import { useEffect, useRef } from "react";
import { useHeroCanvas } from "@/hooks/useHeroCanvas";

export function HeroCanvas() {
  const canvasRef = useHeroCanvas();
  const blob1Ref = useRef<HTMLDivElement | null>(null);
  const blob2Ref = useRef<HTMLDivElement | null>(null);
  const blob3Ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let animId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      targetX = (e.clientX - centerX) / centerX;
      targetY = (e.clientY - centerY) / centerY;
    };

    const updateParallax = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      if (blob1Ref.current) {
        blob1Ref.current.style.transform = `translate3d(${currentX * -24}px, ${currentY * -18}px, 0)`;
      }
      if (blob2Ref.current) {
        blob2Ref.current.style.transform = `translate3d(${currentX * 32}px, ${currentY * 24}px, 0)`;
      }
      if (blob3Ref.current) {
        blob3Ref.current.style.transform = `translate3d(${currentX * -14}px, ${currentY * 12}px, 0)`;
      }

      animId = requestAnimationFrame(updateParallax);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    animId = requestAnimationFrame(updateParallax);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      <div className="hero-blob b1" ref={blob1Ref} />
      <div className="hero-blob b2" ref={blob2Ref} />
      <div className="hero-blob b3" ref={blob3Ref} />
      <canvas id="dotnet-canvas" ref={canvasRef} />
    </>
  );
}
