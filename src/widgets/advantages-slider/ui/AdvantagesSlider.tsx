import { useState } from 'react';
import AdvantageCard from '@/entities/advantage/ui/AdvantageCard';
import { advantagesData } from '../lib/slides';
import './AdvantagesSlider.scss';

type AdvantagesSliderProps = {
  currentIndex?: number;
  onSlideChange?: (index: number) => void;
};

const AdvantagesSlider = ({
  currentIndex: externalIndex,
  onSlideChange,
}: AdvantagesSliderProps) => {
  const total = advantagesData.length;
  const [internalIndex, setInternalIndex] = useState(0);

  if (!total) return null;
  const activeIndex =
    typeof externalIndex === 'number' ? externalIndex : internalIndex;
  const activeSlide = advantagesData[activeIndex] ?? advantagesData[0];

  const handleGoTo = (index: number) => {
    if (typeof externalIndex !== 'number') {
      setInternalIndex(index);
    }
    onSlideChange?.(index);
  };

  const handleNext = () => {
    const nextIndex = (activeIndex + 1) % total;
    if (typeof externalIndex !== 'number') {
      setInternalIndex(nextIndex);
    }
    onSlideChange?.(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = (activeIndex - 1 + total) % total;
    if (typeof externalIndex !== 'number') {
      setInternalIndex(prevIndex);
    }
    onSlideChange?.(prevIndex);
  };

  return (
    <section className="advantages-slider" aria-label="Преимущества сервиса">
      <AdvantageCard slide={activeSlide} />

      <button
        className="advantages-slider__arrow advantages-slider__arrow--prev"
        type="button"
        aria-label="Предыдущий слайд"
        onClick={handlePrev}
      >
        &#10094;
      </button>

      <button
        className="advantages-slider__arrow advantages-slider__arrow--next"
        type="button"
        aria-label="Следующий слайд"
        onClick={handleNext}
      >
        &#10095;
      </button>

      <div
        className="advantages-slider__dots"
        aria-label="Навигация по слайдам"
      >
        {advantagesData.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            className={`advantages-slider__dot ${index === activeIndex ? 'is-active' : ''}`}
            aria-label={`Слайд ${slide.id}`}
            aria-current={index === activeIndex}
            onClick={() => handleGoTo(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default AdvantagesSlider;
