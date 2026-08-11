"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { SystemRegion } from "@/lib/content";

const clamp = (v: number, mn: number, mx: number) => Math.max(mn, Math.min(mx, v));
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export type CardRenderState = {
  logical: number;
  dataIndex: number;
  data: SystemRegion;
  style: React.CSSProperties;
  motionStyle: React.CSSProperties;
  visible: boolean;
  isHovered: boolean;
};

export function useArcCarousel(regions: SystemRegion[]) {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);

  const [cardsState, setCardsState] = useState<CardRenderState[]>([]);

  const valueRef = useRef(-1);
  const targetRef = useRef(-1);
  const velocityRef = useRef(0);
  const visualMotionRef = useRef(0);
  const lastFrameValueRef = useRef(-1);

  const manualRef = useRef(false);
  const draggingRef = useRef(false);
  const draggedRef = useRef(false);
  const startYRef = useRef(0);
  const startValueRef = useRef(-1);
  const lastWheelRef = useRef(0);
  const hoveredLogicalRef = useRef<number | null>(null);

  const stageWidthRef = useRef(234);
  const stageHeightRef = useRef(350);

  const takeControl = useCallback(() => {
    manualRef.current = true;
    targetRef.current = valueRef.current;
  }, []);

  const moveOne = useCallback(
    (direction: number) => {
      takeControl();
      targetRef.current = Math.round(targetRef.current) + direction;
    },
    [takeControl]
  );

  const handleCardClick = useCallback(
    (logical: number, slot: number) => {
      if (!draggedRef.current) {
        moveOne(2 - Math.round(slot));
      }
    },
    [moveOne]
  );

  const handleMouseEnter = useCallback((logical: number) => {
    hoveredLogicalRef.current = logical;
  }, []);

  const handleMouseLeave = useCallback((logical: number) => {
    if (hoveredLogicalRef.current === logical) {
      hoveredLogicalRef.current = null;
    }
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    const viewport = viewportRef.current;
    if (!stage || !viewport) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let animId: number;

    const logicalCards: number[] = [];
    for (let i = -7; i < 12; i++) logicalCards.push(i);

    const updateStageDimensions = () => {
      stageWidthRef.current = stage.clientWidth || 234;
      stageHeightRef.current = stage.clientHeight || 350;
    };

    updateStageDimensions();

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 4) return;
      const now = performance.now();
      if (now - lastWheelRef.current < 420) return;
      lastWheelRef.current = now;
      moveOne(e.deltaY > 0 ? -1 : 1);
    };

    const onPointerDown = (e: PointerEvent) => {
      takeControl();
      draggingRef.current = true;
      draggedRef.current = false;
      startYRef.current = e.clientY;
      startValueRef.current = valueRef.current;
      stage.classList.add("dragging");
      try {
        stage.setPointerCapture(e.pointerId);
      } catch {}
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!draggingRef.current) return;
      const deltaY = e.clientY - startYRef.current;
      if (Math.abs(deltaY) > 4) draggedRef.current = true;
      valueRef.current = startValueRef.current - deltaY / (stageHeightRef.current * 0.45);
      targetRef.current = valueRef.current;
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!draggingRef.current) return;
      draggingRef.current = false;
      stage.classList.remove("dragging");
      targetRef.current = Math.round(valueRef.current);
      try {
        stage.releasePointerCapture(e.pointerId);
      } catch {}
    };

    stage.addEventListener("pointerdown", onPointerDown);
    stage.addEventListener("pointermove", onPointerMove);
    stage.addEventListener("pointerup", onPointerUp);
    stage.addEventListener("pointercancel", onPointerUp);
    viewport.addEventListener("wheel", onWheel, { passive: true });

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(updateStageDimensions);
      resizeObserver.observe(stage);
    }
    window.addEventListener("resize", updateStageDimensions);

    const started = performance.now();

    const tick = (now: number) => {
      if (reduceMotion) {
        valueRef.current = 0;
        targetRef.current = 0;
      } else if (!manualRef.current) {
        // 5.3s presentation loop:
        // 0.0 - 2.1s: move from -1 to 0
        // 2.1 - 3.72s (1.62s): hold at 0
        // 3.72 - 5.3s (1.58s): move back from 0 to -1
        const time = ((now - started) % 5300) / 1000;
        let next = -1;
        if (time < 2.1) next = -1 + easeInOutCubic(time / 2.1);
        else if (time < 3.72) next = 0;
        else next = -easeInOutCubic((time - 3.72) / 1.58);
        valueRef.current = next;
      } else if (!draggingRef.current) {
        const delta = targetRef.current - valueRef.current;
        velocityRef.current = (velocityRef.current + delta * 0.105) * 0.72;
        valueRef.current += velocityRef.current;
        if (Math.abs(delta) < 0.0005 && Math.abs(velocityRef.current) < 0.0005) {
          valueRef.current = targetRef.current;
          velocityRef.current = 0;
        }
        if (Math.abs(valueRef.current) > regions.length) {
          const cycle = Math.round(valueRef.current / regions.length) * regions.length;
          valueRef.current -= cycle;
          targetRef.current -= cycle;
        }
      }

      let frameDelta = valueRef.current - lastFrameValueRef.current;
      frameDelta -= Math.round(frameDelta / regions.length) * regions.length;
      lastFrameValueRef.current = valueRef.current;

      const requestedMotion = clamp(frameDelta * 28, -1, 1);
      const motionResponse = Math.abs(requestedMotion) > Math.abs(visualMotionRef.current) ? 0.38 : 0.115;
      visualMotionRef.current += (requestedMotion - visualMotionRef.current) * motionResponse;
      if (Math.abs(visualMotionRef.current) < 0.0005) visualMotionRef.current = 0;

      const pos = valueRef.current;
      const mot = visualMotionRef.current;
      const width = stageWidthRef.current;

      const computed: CardRenderState[] = logicalCards.map((logical) => {
        const dataIndex = ((logical % regions.length) + regions.length) % regions.length;
        const data = regions[dataIndex];
        const slot = logical + pos;
        const theta = (-20 + slot * 10.5) * (Math.PI / 180);
        const radius = width * 1.868;
        const centerX = -width * 1.322;
        const centerY = width * 0.812;
        const x = centerX + radius * Math.cos(theta);
        const y = centerY + radius * Math.sin(theta);
        const edge = Math.max(0, Math.abs(slot - 2) - 3.15);
        const visible = slot > -2.2 && slot < 6.2;

        const side = clamp(Math.abs(slot - 2) / 2.6, 0, 1);
        const travel = clamp(mot, -1, 1);
        const travelStrength = Math.abs(travel) * (0.34 + side * 0.66);
        const slipX = travel * width * 0.009 * side;
        const peelY = -travelStrength * width * 0.014;
        const counterRotation = travel * (slot < 2 ? -1 : 1) * (0.7 + side * 1.8);
        const travelScale = 1 + travelStrength * 0.012;
        const isHovered = hoveredLogicalRef.current === logical;

        return {
          logical,
          dataIndex,
          data,
          visible,
          isHovered,
          style: {
            opacity: visible ? clamp(1 - edge * 0.52, 0, 1) : 0,
            filter: `blur(${edge * (2.5 + Math.abs(travel) * 1.4)}px)`,
            pointerEvents: visible ? "auto" : "none",
            zIndex: isHovered ? 1000 : Math.round((slot + 3) * 10),
            transform: `translate3d(${x}px,${y}px,0) translate(-50%,-50%) rotate(${theta}rad)`,
          },
          motionStyle: {
            transform: `translate3d(${slipX}px,${peelY}px,0) rotate(${counterRotation}deg) scale(${travelScale})`,
          },
        };
      });

      setCardsState(computed);
      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);

    return () => {
      stage.removeEventListener("pointerdown", onPointerDown);
      stage.removeEventListener("pointermove", onPointerMove);
      stage.removeEventListener("pointerup", onPointerUp);
      stage.removeEventListener("pointercancel", onPointerUp);
      viewport.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", updateStageDimensions);
      if (resizeObserver) resizeObserver.disconnect();
      cancelAnimationFrame(animId);
    };
  }, [regions, moveOne, takeControl]);

  return {
    stageRef,
    viewportRef,
    cardsState,
    handleCardClick,
    handleMouseEnter,
    handleMouseLeave,
  };
}
