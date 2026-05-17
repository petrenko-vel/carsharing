import { useBookingStore } from '@/pages/booking/model/bookingStore';
import './SummaryStep.scss';

const SummaryStep = () => {
    const { selectedCar } = useBookingStore();

    const availableFrom = selectedCar?.availableFrom
        ? new Date(selectedCar.availableFrom).toLocaleDateString('ru-RU')
        : '-';

    return (
        <div className="summary-step">
            <div className="summary-step__car">
                {selectedCar?.imageUrl ? (
                    <img
                        className="summary-step__car-image"
                        src={selectedCar.imageUrl}
                        alt={selectedCar.name ?? 'Автомобиль'}
                    />
                ) : (
                    <div className="summary-step__car-image-placeholder">Нет изображения</div>
                )}

                <h2 className="summary-step__car-title">
                    {selectedCar?.name ?? 'Автомобиль не выбран'}
                </h2>

                <p>Номер: {selectedCar?.plateNumber ?? '—'}</p>
                <p>Топливо: {selectedCar?.fuelLevel ?? '—'}%</p>
                <p>Доступна с: {availableFrom}</p>
            </div>
        </div>
    );
};

export { SummaryStep };