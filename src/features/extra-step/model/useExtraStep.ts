import { useMemo } from 'react';
import { useBookingStore } from '@/pages/booking/model/bookingStore';
import { TARIFFS, EXTRA_SERVICES } from './extraOptions.mock';

interface UseExtraStepReturn {
    totalPrice: number;
    durationLabel: string;
    totalPriceLabel: string;
}

export const useExtraStep = (): UseExtraStepReturn => {
    const { selectedCar, extra } = useBookingStore();

    const durationMs = useMemo(() => {
        if (!extra.dateFrom || !extra.dateTo) return 0;
        const from = new Date(extra.dateFrom).getTime();
        const to = new Date(extra.dateTo).getTime();
        return Math.max(0, to - from);
    }, [extra.dateFrom, extra.dateTo]);

    // Форматирование длительности в читаемый вид (1д 2ч)
    const durationLabel = useMemo(() => {
        if (!durationMs) return '';
        const totalHours = Math.floor(durationMs / (1000 * 60 * 60));
        const days = Math.floor(totalHours / 24);
        const hours = totalHours % 24;

        if (days > 0 && hours > 0) return `${days}д ${hours}ч`;
        if (days > 0) return `${days}д`;
        return `${hours}ч`;
    }, [durationMs]);

    const totalPrice = useMemo(() => {
        if (!selectedCar || !durationMs) return 0;

        const tariff = TARIFFS.find((t) => t.id === extra.tariffId);
        let basePrice = 0;

        if (tariff?.isDaily) {
            // Посуточный тариф
            const days = Math.ceil(durationMs / (1000 * 60 * 60 * 24));
            basePrice = tariff.pricePerDay * Math.max(1, days);
        } else if (tariff) {
            // Поминутный тариф
            const minutes = Math.ceil(durationMs / (1000 * 60));
            basePrice = tariff.pricePerMin * minutes;
        }

        // Стоимость выбранных доп услуг
        const servicesPrice = EXTRA_SERVICES
            .filter((s) => extra.services.includes(s.id))
            .reduce((sum, s) => sum + s.price, 0);

        return basePrice + servicesPrice;
    }, [selectedCar, durationMs, extra.tariffId, extra.services]);

    const totalPriceLabel = totalPrice
        ? `${totalPrice.toLocaleString('ru-RU')} ₽`
        : '';

    return { totalPrice, durationLabel, totalPriceLabel };
};