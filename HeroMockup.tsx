'use client';

import { useEffect, useRef, useState } from 'react';

// Poster ships with the build — no external dependency, always available.
const POSTER_URL = '/hero-poster.jpg';
// Video lives on R2 CDN (configurable via env variable), fallback to local /hero-demo.mp4
const VIDEO_URL = process.env.NEXT_PUBLIC_HERO_VIDEO_URL || '/hero-demo.mp4';

export function HeroMockup() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const userHasPausedRef = useRef(false);
  const isProgrammaticPauseRef = useRef(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  // Stage 1: Don't request the video file at all until it's about to scroll into view
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: '300px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Stage 2: Autoplay only while visible, respecting manual user pause
  useEffect(() => {
    if (!shouldLoad || videoFailed) return;
    const video = videoRef.current;
    const el = containerRef.current;
    if (!video || !el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!userHasPausedRef.current) {
            video.play().catch(() => {});
          }
        } else {
          // Flag that this pause was triggered by scrolling away (programmatic)
          if (!video.paused) {
            isProgrammaticPauseRef.current = true;
            video.pause();
          }
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [shouldLoad, videoFailed]);

  // Track manual user pause / play actions
  const handlePause = () => {
    // If pause was triggered programmatically on scroll-away, ignore it
    if (isProgrammaticPauseRef.current) {
      isProgrammaticPauseRef.current = false;
      return;
    }
    // Pause was triggered by explicit user interaction with controls
    if (videoRef.current && !videoRef.current.ended) {
      userHasPausedRef.current = true;
    }
  };

  const handlePlay = () => {
    userHasPausedRef.current = false;
  };

  // R2 outage, 404, network error, decode error — degrade to poster.
  const handleError = () => setVideoFailed(true);

  const showVideo = shouldLoad && !videoFailed;

  return (
    <div ref={containerRef} className="hero-mockup-wrap">
      {showVideo ? (
        <video
          ref={videoRef}
          poster={POSTER_URL}
          muted
          playsInline
          controls
          preload="metadata"
          className="hero-mockup-video"
          onPause={handlePause}
          onPlay={handlePlay}
          onError={handleError}
        >
          <source src={VIDEO_URL} type="video/mp4" />
        </video>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={POSTER_URL} alt="Atlas One invoices dashboard" className="hero-mockup-video" />
      )}
    </div>
  );
}

export default HeroMockup;
