import { useBookingStore } from '@/pages/booking/model/bookingStore';
import './SummaryStep.scss';

export const SummaryStep = () => {
    const { selectedCar, extra } = useBookingStore();

    const dateFromFormatted = extra?.dateFrom
        ? new Date(extra.dateFrom).toLocaleString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
        : 'Не выбрано';

    return (
        <div className="summary-step">
            <div className="summary-step__info">
                <h2 className="summary-step__title">
                    {selectedCar?.name ?? 'Автомобиль не выбран'}
                </h2>

                <span className='summary-step__number'>{selectedCar?.plateNumber ?? '—'}</span>
                <p><b>Топливо</b> {selectedCar?.fuelLevel ?? '—'}%</p>
                <p><b>Доступна c</b> {dateFromFormatted}</p>
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
