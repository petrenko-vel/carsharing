import { create } from 'zustand';

export type CarCategory = 'economy' | 'premium';

export type BookingStepSlug = 'location' | 'model' | 'extra' | 'summary';

export interface SelectedCar {
    id: string;
    name: string;
    priceMin: number;
    priceMax: number;
}

interface BookingState {
    // Шаг 1 — Местоположение
    city: string;
    point: string;

    // Шаг 2 — Модель
    selectedCar: SelectedCar | null;

    // Сеттеры шага 1
    setCity: (city: string) => void;
    setPoint: (point: string) => void;
    resetLocation: () => void;

    // Сеттеры шага 2
    setSelectedCar: (car: SelectedCar | null) => void;

    // true, если шаг заполнен и можно идти дальше
    isStepValid: (step: BookingStepSlug) => boolean;
}

export const useBookingStore = create<BookingState>((set, get) => ({
    // Шаг 1
    city: '',
    point: '',

    // Шаг 2
    selectedCar: null,


    // --- Шаг 1 ---
    setCity: (newCity) => set({ city: newCity, point: '' }),    // при смене города должен сбрасываться пункт выдачи
    setPoint: (newPoint) => set({ point: newPoint }),
    resetLocation: () => set({ city: '', point: '' }),

    // --- Шаг 2 ---
    setSelectedCar: (car) => set({ selectedCar: car }),         // null — сброс выбора (например при возврате на шаг 1)

    // --- Валидация шагов ---
    isStepValid: (step) => {
        const { city, point, selectedCar } = get();
        switch (step) {
            case 'location':
                return Boolean(city && point);
            case 'model':
                return Boolean(selectedCar);
            default:
                return false;
        }
    },
}));