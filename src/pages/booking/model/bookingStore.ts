import { create } from 'zustand';

interface BookingState {
    city: string;
    point: string;

    setCity: (city: string) => void;
    setPoint: (point: string) => void;
    resetLocation: () => void;
}

export const useBookingStore = create<BookingState>((set) => ({
    city: '',
    point: '',

    // Функция изменения города: при смене города должен сбрасываться пункт выдачи
    setCity: (newCity) => set({ city: newCity, point: '' }),

    setPoint: (newPoint) => set({ point: newPoint }),

    resetLocation: () => set({ city: '', point: '' }),
}));