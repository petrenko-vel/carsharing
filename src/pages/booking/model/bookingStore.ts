import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CarCategory = 'economy' | 'premium';

export type BookingStepSlug = 'location' | 'model' | 'extra' | 'summary';

export interface SelectedCar {
    id: string;
    name: string;
    priceMin: number;
    priceMax: number;
}

// Данные шага 3 — дополнительные опции
export interface ExtraStepData {
    colorId: string;         // id выбранного цвета из CAR_COLORS
    colorLabel: string;      // лейбл для отображения в OrderSummary
    tariffId: string;        // id выбранного тарифа
    tariffLabel: string;     // лейбл для OrderSummary
    dateFrom: string | null; // ISO-строка даты начала
    dateTo: string | null;   // ISO-строка даты окончания
    services: string[];      // массив id выбранных доп услуг
}

interface BookingState {
    // Шаг 1 — Местоположение
    city: string;
    point: string;

    // Шаг 2 — Модель
    selectedCar: SelectedCar | null;

    // Шаг 3
    extra: ExtraStepData;

    // Сеттеры шага 1
    setCity: (city: string) => void;
    setPoint: (point: string) => void;
    resetLocation: () => void;

    // Сеттеры шага 2
    setSelectedCar: (car: SelectedCar | null) => void;

    // Сеттеры шага 3
    setExtra: (data: Partial<ExtraStepData>) => void;
    resetExtra: () => void;

    // true, если шаг заполнен и можно идти дальше
    isStepValid: (step: BookingStepSlug) => boolean;
}

// Дефолтное состояние шага 3 — вынесено отдельно,
// чтобы переиспользовать в resetExtra и при сбросе последующих шагов
const DEFAULT_EXTRA: ExtraStepData = {
    colorId: '',
    colorLabel: '',
    tariffId: '',
    tariffLabel: '',
    dateFrom: null,
    dateTo: null,
    services: [],
};


export const useBookingStore = create<BookingState>()(
    persist(
        (set, get) => ({
            city: '',
            point: '',
            selectedCar: null,
            extra: DEFAULT_EXTRA,


            setCity: (newCity) => set({ city: newCity, point: '' }),
            setPoint: (newPoint) => set({ point: newPoint }),
            resetLocation: () => set({ city: '', point: '' }),
            setSelectedCar: (car) => set({ selectedCar: car }),
            setExtra: (data) => set((state) => ({
                extra: { ...state.extra, ...data },
            })),

            resetExtra: () => set({ extra: DEFAULT_EXTRA }),


            isStepValid: (step) => {
                const { city, point, selectedCar, extra } = get();
                switch (step) {
                    case 'location':
                        return Boolean(city && point);
                    case 'model':
                        return Boolean(selectedCar);
                    case 'extra':
                        // Обязательны: цвет, тариф, обе даты
                        // services — опциональны, не блокируют кнопку
                        return Boolean(
                            extra.colorId &&
                            extra.tariffId &&
                            extra.dateFrom &&
                            extra.dateTo
                        );
                    default:
                        return false;
                }
            },
        }),
        {
            name: 'booking-storage',
            partialize: (state) => ({
                city: state.city,
                point: state.point,
                selectedCar: state.selectedCar,
                extra: state.extra,
            }),
        }
    )
);