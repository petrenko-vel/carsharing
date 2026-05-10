import { useBookingStore, type SelectedCar } from '@/pages/booking/model/bookingStore';
import { useCarFilter, type CarFilter } from '../model/useCarFilter';
import type { CarModel } from '../model/cars.mock';
import CarCard from './CarCard';
import './ModelStep.scss';

const FILTERS: { value: CarFilter; label: string }[] = [
    { value: 'all', label: 'Все модели' },
    { value: 'economy', label: 'Эконом' },
    { value: 'premium', label: 'Премиум' },
];

const ModelStep = () => {
    const { selectedCar, setSelectedCar } = useBookingStore();
    const { activeFilter, setActiveFilter, filteredCars } = useCarFilter();

    const handleSelect = (car: CarModel) => {
        if (selectedCar?.id === car.id) {
            setSelectedCar(null);
            return;
        }

        const payload: SelectedCar = {
            id: car.id,
            name: `${car.brand} ${car.model}`,
            priceMin: car.priceMin,
            priceMax: car.priceMax,
        };
        setSelectedCar(payload);
    };

    return (
        <div className="model-step">
            <div className="model-step__filters" role="radiogroup" aria-label="Фильтр моделей">
                {FILTERS.map(({ value, label }) => (
                    <label key={value} className="model-step__filter-label">
                        <input
                            className="model-step__filter-input"
                            type="radio"
                            name="car-filter"
                            value={value}
                            checked={activeFilter === value}
                            onChange={() => setActiveFilter(value)}
                        />
                        <span
                            className={[
                                'model-step__filter-text',
                                activeFilter === value ? 'model-step__filter-text--active' : '',
                            ].join(' ').trim()}
                        >
                            {label}
                        </span>
                    </label>
                ))}
            </div>

            <ul className="model-step__grid" role="list">
                {filteredCars.map((car) => (
                    <li key={car.id} role="listitem">
                        <CarCard
                            car={car}
                            isSelected={selectedCar?.id === car.id}
                            onSelect={handleSelect}
                        />
                    </li>
                ))}

                {filteredCars.length === 0 && (
                    <li className="model-step__empty">
                        Нет доступных моделей в этой категории
                    </li>
                )}
            </ul>
        </div>
    );
};

export default ModelStep;