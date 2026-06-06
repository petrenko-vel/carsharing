import type { SelectedCar, ExtraStepData } from '@/pages/booking/model/bookingStore';

export interface StoredOrder {
    id: string;
    city: string;
    point: string;
    car: SelectedCar;
    extra: ExtraStepData;
    details: Array<{ label: string; value: string }>;
    totalPrice: string;
    createdAt: string;
}

const STORAGE_KEY = 'carsharing_orders';

const readStorage = (): Record<string, StoredOrder> => {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}');
    } catch {
        return {};
    }
};

export const saveOrder = (order: StoredOrder): void => {
    const all = readStorage();
    all[order.id] = order;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
};

export const fetchOrderById = (id: string): Promise<StoredOrder | null> =>
    new Promise((resolve) =>
        setTimeout(() => resolve(readStorage()[id] ?? null), 800)
    );
