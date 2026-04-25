import type { AdvantageSlide } from '@/entities/advantage/model/advantage-card.types';
import Button from '@/shared/ui/Button';

import './AdvantageCard.scss';

interface AdvantageCardProps {
  slide: AdvantageSlide;
}

const AdvantageCard = ({ slide }: AdvantageCardProps) => {
  return (
    <article
      className="advantage-card"
      style={{ backgroundImage: `url(${slide.image})` }}
    >
      <div className="advantage-card__overlay" />
      <div className="advantage-card__content">
        <h2 className="advantage-card__title">{slide.title}</h2>
        <p className="advantage-card__description">{slide.description}</p>
        <Button
          href={slide.buttonHref}
          gradient={slide.buttonGradient}
          className="advantage-card__button"
        >
          {slide.buttonText}
        </Button>
      </div>
    </article>
  );
};

export default AdvantageCard;