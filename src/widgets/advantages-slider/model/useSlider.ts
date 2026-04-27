import { useState } from 'react';

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

  return {
    currentIndex,
    next,
    prev,
    goTo,
  };
};
