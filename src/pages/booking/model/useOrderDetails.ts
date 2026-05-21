import { useBookingStore } from './bookingStore';
import { EXTRA_SERVICES } from '@/features/extra-step/model/extraOptions.mock';

export const useOrderDetails = () => {
    const { city, point, selectedCar, extra } = useBookingStore();
    const details = [];

    if (city) {
        const fullAddress = point ? `${city},\n${point}` : city;
        details.push({ label: 'Пункт выдачи', value: fullAddress });
    }

    if (selectedCar) {
        details.push({ label: 'Модель', value: selectedCar.name });
    }

    if (extra.dateFrom && extra.dateTo) {
        const fromDate = new Date(extra.dateFrom).toLocaleDateString('ru-RU');
        const toDate = new Date(extra.dateTo).toLocaleDateString('ru-RU');
        details.push({ label: 'Длительность аренды', value: `${fromDate} – ${toDate}` });
    }

    if (extra.colorLabel) {
        details.push({ label: 'Цвет', value: extra.colorLabel });
    }

    if (extra.tariffLabel) {
        details.push({ label: 'Тариф', value: extra.tariffLabel });
    }

    if (extra.services.length > 0) {
        const serviceLabels = EXTRA_SERVICES
            .filter((s) => extra.services.includes(s.id))
            .map((s) => s.label)
            .join(', ');
        details.push({ label: 'Доп услуги', value: serviceLabels });
    }

    return details;
};