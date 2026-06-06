import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CarCategory = 'economy' | 'premium';
export type BookingStepSlug = 'location' | 'model' | 'extra' | 'summary';

export interface SelectedCar {
    id: string;
    name: string;
    priceMin?: number;
    priceMax?: number;
    imageUrl?: string;
    plateNumber?: string;
    fuelLevel?: number;
    availableFrom?: string;
}


// Данные шага 3 — дополнительные опции
export interface ExtraStepData {
    colorId: string;         // id выбранного цвета из CAR_COLORS
    colorLabel: string;      // лейбл для отображения в OrderSummary
    tariffId: string;        // id выбранного тарифа
    tariffLabel: string;     // лейбл для OrderSummary
    dateFrom: string | null; // дата начала
    dateTo: string | null;   // дата окончания
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

    isStepValid: (step: BookingStepSlug) => boolean;
}

// Дефолтное состояние шага 3
const DEFAULT_EXTRA: ExtraStepData = {
    colorId: '',
    colorLabel: '',
    tariffId: '',
    tariffLabel: '',
    dateFrom: null,
    dateTo: null,
    services: [],
};

const DEFAULT_STATE = {
    city: '',
    point: '',
    selectedCar: null,
    extra: DEFAULT_EXTRA,
};

export const useBookingStore = create<BookingState>()(
    persist(
        (set, get) => ({
            ...DEFAULT_STATE,

            setCity: (newCity) =>
                set({
                    city: newCity,
                    point: '',
                    selectedCar: null,
                    extra: DEFAULT_EXTRA,
                }),

            setPoint: (newPoint) =>
                set({
                    point: newPoint,
                    selectedCar: null,
                    extra: DEFAULT_EXTRA,
                }),

            resetLocation: () => set({ ...DEFAULT_STATE }),

            setSelectedCar: (car) =>
                set({
                    selectedCar: car,
                    extra: DEFAULT_EXTRA,
                }),

            setExtra: (data) =>
                set((state) => ({
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
                        return Boolean(
                            extra.colorId &&
                            extra.tariffId &&
                            extra.dateFrom &&
                            extra.dateTo
                        );
                    case 'summary':
                        return Boolean(
                            city &&
                            point &&
                            selectedCar &&
                            extra.colorId &&
                            extra.tariffId &&
                            extra.dateFrom &&
                            extra.dateTo);
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