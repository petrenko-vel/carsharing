import { useBookingStore } from '@/pages/booking/model/bookingStore';
import './SummaryStep.scss';

const SummaryStep = () => {
    const { selectedCar } = useBookingStore();

    const availableFrom = selectedCar?.availableFrom
        ? new Date(selectedCar.availableFrom).toLocaleDateString('ru-RU')
        : '-';

    return (
        <div className="summary-step">
            <div className="summary-step__info">
                <h2 className="summary-step__title">
                    {selectedCar?.name ?? 'Автомобиль не выбран'}
                </h2>

                <span className='summary-step__number'>{selectedCar?.plateNumber ?? '—'}</span>
                <p>Топливо: {selectedCar?.fuelLevel ?? '—'}%</p>
                <p>Доступна с: {availableFrom}</p>
            </div>

            {selectedCar?.imageUrl ? (
                <img
                    className="summary-step__image"
                    src={selectedCar.imageUrl}
                    alt={selectedCar.name ?? 'Автомобиль'}
                />
            ) : (
                <div className="summary-step__image-placeholder">Нет изображения</div>
            )}
        </div>
    );
};

export { SummaryStep };