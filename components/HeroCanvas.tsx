"use client";

import { useHeroCanvas } from "@/hooks/useHeroCanvas";

export function HeroCanvas() {
  const canvasRef = useHeroCanvas();

  return (
    <>
      <div className="hero-blob b1" />
      <div className="hero-blob b2" />
      <div className="hero-blob b3" />
      <canvas id="dotnet-canvas" ref={canvasRef} />
    </>
  );
}
