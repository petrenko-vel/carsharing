import { create } from 'zustand';

export type BookingStepSlug = 'location' | 'model' | 'extra' | 'summary';

interface BookingState {
    city: string;
    point: string;

    setCity: (city: string) => void;
    setPoint: (point: string) => void;
    resetLocation: () => void;

    // true, если шаг заполнен и можно идти дальше
    isStepValid: (step: BookingStepSlug) => boolean;
}

export const useBookingStore = create<BookingState>((set, get) => ({
    city: '',
    point: '',

    // Функция изменения города: при смене города должен сбрасываться пункт выдачи
    setCity: (newCity) => set({ city: newCity, point: '' }),

    setPoint: (newPoint) => set({ point: newPoint }),

    resetLocation: () => set({ city: '', point: '' }),

    isStepValid: (step) => {
        const { city, point } = get();
        switch (step) {
            case 'location':
                return Boolean(city && point);
            case 'model':
                return false; // пока нет данных шага 2
            default:
                return false;
        }
    },
}));