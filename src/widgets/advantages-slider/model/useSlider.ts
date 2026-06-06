import { useState, useEffect, useRef, useCallback } from 'react';

const AUTOPLAY_INTERVAL = 5000;
const RESUME_DELAY = 5000;

export const useSlider = (length: number) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const pauseAutoplay = useCallback(() => {
    setIsPaused(true);

    if (resumeTimeoutRef.current !== null) {
      window.clearTimeout(resumeTimeoutRef.current);
    }

    resumeTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, RESUME_DELAY);
  }, []);

  const next = useCallback(() => {
    pauseAutoplay();
    setCurrentIndex((prev) => (prev === length - 1 ? 0 : prev + 1));
  }, [length, pauseAutoplay]);

  const prev = useCallback(() => {
    pauseAutoplay();
    setCurrentIndex((prev) => (prev === 0 ? length - 1 : prev - 1));
  }, [length, pauseAutoplay]);

  const goTo = useCallback(
    (index: number) => {
      pauseAutoplay();
      setCurrentIndex(index);
    },
    [pauseAutoplay],
  );

  // Автоматическая смена контента
  useEffect(() => {
    if (isPaused) return;

    const id = window.setInterval(() => {
      setCurrentIndex((prev) => (prev === length - 1 ? 0 : prev + 1));
    }, AUTOPLAY_INTERVAL);

    return () => window.clearInterval(id);
  }, [length, isPaused]);

  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current !== null) {
        window.clearTimeout(resumeTimeoutRef.current);
      }
    };
  }, []);

  return {
    currentIndex,
    next,
    prev,
    goTo,
  };
};
