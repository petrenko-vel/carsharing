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

export const useBookingStore = create<BookingState>()(
    persist(
        (set, get) => ({
            city: '',
            point: '',
            selectedCar: null,

            setCity: (newCity) => set({ city: newCity, point: '' }),
            setPoint: (newPoint) => set({ point: newPoint }),
            resetLocation: () => set({ city: '', point: '' }),
            setSelectedCar: (car) => set({ selectedCar: car }),

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
        }),
        {
            name: 'booking-storage',
            partialize: (state) => ({
                city: state.city,
                point: state.point,
                selectedCar: state.selectedCar,
            }),
        }
    )
);