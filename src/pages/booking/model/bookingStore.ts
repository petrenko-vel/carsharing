import { create } from 'zustand';

interface BookingState {
    city: string;
    point: string;
    // Функции для изменения данных
    setCity: (city: string) => void;
    setPoint: (point: string) => void;
    resetLocation: () => void;
}

// Хранилище
export const useBookingStore = create<BookingState>((set) => ({
    // Начальные значения (стейт пустой)
    city: '',
    point: '',

    // Функция изменения города: 
    // При смене города мы по ТЗ должны сбрасывать пункт выдачи
    setCity: (newCity) => set({ city: newCity, point: '' }),

    // Функция изменения пункта выдачи
    setPoint: (newPoint) => set({ point: newPoint }),

    // Функция для полной очистки шага (пригодится для крестика)
    resetLocation: () => set({ city: '', point: '' }),
}));