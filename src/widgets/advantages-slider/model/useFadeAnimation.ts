import { useEffect, useRef, useState } from 'react';

export const useFadeAnimation = (activeIndex: number) => {
  const [visibleIndex, setVisibleIndex] = useState(activeIndex);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (activeIndex === visibleIndex) return;

    setPrevIndex(visibleIndex);
    setIsTransitioning(true);
    setVisibleIndex(activeIndex);

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      setPrevIndex(null);
      setIsTransitioning(false);
    }, 450);

    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [activeIndex]);

  return {
    visibleIndex,
    prevIndex,
    isTransitioning,
  };
};
