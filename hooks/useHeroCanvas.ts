"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function useHeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !canvas.parentElement) return;

    const container = canvas.parentElement;
    const count = 20000;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 45;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);

    // Buffers for 20,000 particles
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Particle texture / material
    const material = new THREE.PointsMaterial({
      size: 0.28,
      vertexColors: true,
      transparent: true,
      opacity: 0.72,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Temp objects for zero allocation loop
    const targetVec = new THREE.Vector3();
    const colorObj = new THREE.Color();

    let animId: number;
    const clock = new THREE.Clock();

    // Particle update logic following exact WebGL Shader & Particle Swarm rules
    function updateParticle(
      i: number,
      totalCount: number,
      target: THREE.Vector3,
      color: THREE.Color,
      time: number
    ) {
      const p = i / totalCount;
      const angle1 = p * Math.PI * 24 + time * 0.15;
      const angle2 = p * Math.PI * 48 - time * 0.25;

      const radius = 18 + Math.sin(angle1 * 3 + time) * 6 + Math.cos(angle2 * 2) * 4;
      const x = Math.cos(angle1) * radius + Math.sin(time * 0.3 + p * 10) * 3;
      const y = Math.sin(angle1) * Math.cos(angle2) * (radius * 0.7) + Math.cos(time * 0.2) * 4;
      const z = Math.sin(angle2) * (radius * 0.8) + Math.sin(p * Math.PI * 8) * 5;

      target.set(x, y, z);

      // Atlas One Brand Palette (Blue #2383e2, Amber #c98a12, Ink)
      const hue = 0.58 + Math.sin(p * Math.PI * 4 + time * 0.2) * 0.12;
      const saturation = 0.8 + Math.cos(p * Math.PI * 2) * 0.2;
      const lightness = 0.45 + Math.sin(angle2 + time) * 0.25;

      color.setHSL(hue, saturation, lightness);
    }

    function animate() {
      const time = reduceMotion ? 0 : clock.getElapsedTime();

      // Slow rotational drift
      points.rotation.y = time * 0.05;
      points.rotation.x = Math.sin(time * 0.03) * 0.1;

      const posAttr = geometry.attributes.position as THREE.BufferAttribute;
      const colAttr = geometry.attributes.color as THREE.BufferAttribute;

      const posArray = posAttr.array as Float32Array;
      const colArray = colAttr.array as Float32Array;

      for (let i = 0; i < count; i++) {
        updateParticle(i, count, targetVec, colorObj, time);

        const i3 = i * 3;
        posArray[i3] = targetVec.x;
        posArray[i3 + 1] = targetVec.y;
        posArray[i3 + 2] = targetVec.z;

        colArray[i3] = colorObj.r;
        colArray[i3 + 1] = colorObj.g;
        colArray[i3 + 2] = colorObj.b;
      }

      posAttr.needsUpdate = true;
      colAttr.needsUpdate = true;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    }

    function handleResize() {
      if (!container || !canvas) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }

    window.addEventListener("resize", handleResize);
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return canvasRef;
}
