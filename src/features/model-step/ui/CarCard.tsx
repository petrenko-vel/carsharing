import type { CarModel } from '../model/cars.mock';
import './CarCard.scss';

interface CarCardProps {
    car: CarModel;
    isSelected: boolean;
    onSelect: (car: CarModel) => void;
}

const CarCard = ({ car, isSelected, onSelect }: CarCardProps) => {
    const fullName = `${car.brand} ${car.model}`;
    const priceLabel = `${car.priceMin.toLocaleString('ru-RU')} – ${car.priceMax.toLocaleString('ru-RU')} ₽`;


    const handleCardClick = () => {
        onSelect(car);
    };

    const handleCardKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onSelect(car);
        }
    };

    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        (e.currentTarget as HTMLImageElement).style.visibility = 'hidden';
    }

    return (
        <article
            className={['car-card', isSelected ? 'car-card--selected' : ''].join(' ').trim()}
            onClick={handleCardClick}
            role="button"
            tabIndex={0}
            aria-pressed={isSelected}
            aria-label={`${fullName}, ${priceLabel}`}
            onKeyDown={handleCardKeyDown}
        >
            <div className="car-card__header">
                <h3 className="car-card__name">{fullName}</h3>
                <p className="car-card__price">{priceLabel}</p>
            </div>

            <div className="car-card__image-wrapper">
                <img
                    className="car-card__image"
                    src={car.imageUrl}
                    alt={fullName}
                    onError={handleImageError}
                />
            </div>
        </article>
    );
};

export { CarCard };