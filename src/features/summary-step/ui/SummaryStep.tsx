import { useState } from 'react';
import { useBookingStore } from '@/pages/booking/model/bookingStore';
import { CarPlaceholder } from '@/shared/ui/CarPlaceholder';
import './SummaryStep.scss';

export const SummaryStep = () => {
    const { selectedCar, extra } = useBookingStore();
    const [imgFailed, setImgFailed] = useState(!selectedCar?.imageUrl);

    const dateFromFormatted = extra?.dateFrom
        ? new Date(extra.dateFrom).toLocaleString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })
        : 'Не выбрано';

    const plateNumber = selectedCar?.plateNumber || 'Не указан';
    const fuelLevel = selectedCar?.fuelLevel != null
        ? `${selectedCar.fuelLevel}%`
        : 'Не указан';

    const showImage = Boolean(selectedCar?.imageUrl) && !imgFailed;

    return (
        <div className="summary-step">
            <div className="summary-step__info">
                <h2 className="summary-step__title">
                    {selectedCar?.name ?? 'Автомобиль не выбран'}
                </h2>

                <span className="summary-step__number">{plateNumber}</span>
                <p><b>Топливо</b> {fuelLevel}</p>
                <p><b>Доступна c</b> {dateFromFormatted}</p>
            </div>

            <div className="summary-step__image-wrapper">
                {showImage ? (
                    <img
                        className="summary-step__image"
                        src={selectedCar!.imageUrl}
                        alt={selectedCar!.name ?? 'Автомобиль'}
                        onError={() => setImgFailed(true)}
                    />
                ) : (
                    <CarPlaceholder className="summary-step__placeholder" />
                )}
            </div>
        </div>
    );
};
