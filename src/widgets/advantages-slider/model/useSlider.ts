import { useState, useEffect } from 'react';

export const useSlider = (length: number) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev === length - 1 ? 0 : prev + 1));
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev === 0 ? length - 1 : prev - 1));
  };

  const goTo = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const id = window.setInterval(() => {
      setCurrentIndex((prev) => (prev === length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => window.clearInterval(id);
  }, [length]);

  return {
    currentIndex,
    next,
    prev,
    goTo,
  };
};
