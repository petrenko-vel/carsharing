import AdvantageCard from '@/entities/advantage/ui/AdvantageCard';
import { advantagesData } from '../lib/slides';
import './AdvantagesSlider.scss';

interface Props {
  activeIndex: number;
  visibleIndex: number;
  prevIndex: number | null;
  isTransitioning: boolean;
  onNext: () => void;
  onPrev: () => void;
  onGoTo: (index: number) => void;
}

const AdvantagesSlider = ({
  activeIndex,
  visibleIndex,
  prevIndex,
  isTransitioning,
  onNext,
  onPrev,
  onGoTo,
}: Props) => {
  const activeSlide = advantagesData[visibleIndex] ?? advantagesData[0];

  return (
    <section className="advantages-slider" aria-label="Преимущества сервиса">
      <div className="advantages-slider__viewport">
        {prevIndex !== null && (
          <div
            className={`advantages-slider__slide advantages-slider__slide--previous ${
              isTransitioning ? 'is-fading-out' : ''
            }`}
          >
            <AdvantageCard slide={advantagesData[prevIndex]} />
          </div>
        )}

        <div
          className={`advantages-slider__slide advantages-slider__slide--current ${
            isTransitioning ? 'is-fading-in' : ''
          }`}
        >
          <AdvantageCard slide={activeSlide} />
        </div>
      </div>

      <button
        className="advantages-slider__arrow advantages-slider__arrow--prev"
        type="button"
        aria-label="Предыдущий слайд"
        onClick={onPrev}
      >
        &#10094;
      </button>

      <button
        className="advantages-slider__arrow advantages-slider__arrow--next"
        type="button"
        aria-label="Следующий слайд"
        onClick={onNext}
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
            className={`advantages-slider__dot ${
              index === activeIndex ? 'is-active' : ''
            }`}
            aria-label={`Слайд ${slide.id}`}
            aria-current={index === activeIndex}
            onClick={() => onGoTo(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default AdvantagesSlider;
