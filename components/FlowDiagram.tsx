"use client";

import { useEffect, useRef } from "react";

type Node = {
  label: string;
  cx: number;
  cy: number;
  color: string;
};

const nodes: Node[] = [
  { label: "Client", cx: 0.14, cy: 0.5, color: "#8b5cb0" },
  { label: "Invoice", cx: 0.4, cy: 0.18, color: "#2383e2" },
  { label: "GST Ledger", cx: 0.4, cy: 0.82, color: "#c98a12" },
  { label: "PL Statement", cx: 0.68, cy: 0.5, color: "#3d8a52" },
  { label: "FY Summary", cx: 0.92, cy: 0.5, color: "#191919" },
];

const edges = [
  [0, 1],
  [0, 2],
  [1, 3],
  [2, 3],
  [3, 4],
];

export function FlowDiagram() {
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
    let t = 0;

    function resize() {
      if (!canvas || !canvas.parentElement) return;
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.parentElement.getBoundingClientRect();
      w = canvas.width = rect.width * dpr;
      h = canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    }

    function pos(n: Node) {
      return { x: n.cx * w, y: n.cy * h };
    }

    function draw() {
      const dpr = window.devicePixelRatio || 1;
      ctx!.clearRect(0, 0, w, h);

      // Edges
      edges.forEach(([a, b]) => {
        const pa = pos(nodes[a]);
        const pb = pos(nodes[b]);
        ctx!.strokeStyle = "#e9e9e7";
        ctx!.lineWidth = 1.5 * dpr;
        ctx!.beginPath();
        ctx!.moveTo(pa.x, pa.y);
        ctx!.lineTo(pb.x, pb.y);
        ctx!.stroke();
      });

      // Traveling pulses
      if (!reduceMotion) t += 0.006;
      edges.forEach(([a, b], i) => {
        const pa = pos(nodes[a]);
        const pb = pos(nodes[b]);
        const prog = (t * 0.7 + i * 0.22) % 1;
        const x = pa.x + (pb.x - pa.x) * prog;
        const y = pa.y + (pb.y - pa.y) * prog;
        ctx!.fillStyle = nodes[a].color;
        ctx!.beginPath();
        ctx!.arc(x, y, 2.4 * dpr, 0, Math.PI * 2);
        ctx!.fill();
      });

      // Nodes
      nodes.forEach((n) => {
        const p = pos(n);
        ctx!.fillStyle = "#ffffff";
        ctx!.strokeStyle = n.color;
        ctx!.lineWidth = 1.6 * dpr;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, 5.5 * dpr, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.stroke();

        ctx!.fillStyle = "#191919";
        ctx!.font = `${10 * dpr}px Inter, sans-serif`;
        ctx!.textAlign = "center";
        ctx!.fillText(n.label, p.x, p.y - 12 * dpr);
      });

      animId = requestAnimationFrame(draw);
    }

    const handleResize = () => {
      resize();
    };

    window.addEventListener("resize", handleResize);
    resize();
    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas id="flow-canvas" ref={canvasRef} />;
}
