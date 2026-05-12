export interface CarColor {
    id: string;
    label: string;
}

export const CAR_COLORS: CarColor[] = [
    { id: 'any', label: 'Любой' },
    { id: 'red', label: 'Красный' },
    { id: 'blue', label: 'Голубой' },
];

export interface Tariff {
    id: string;
    label: string;
    pricePerDay: number; // цена за сутки в рублях
    pricePerMin: number; // цена за минуту в рублях
    isDaily: boolean;    // true = посуточный, false = поминутный
}

export const TARIFFS: Tariff[] = [
    {
        id: 'minute',
        label: 'Поминутно, 7Р/мин',
        pricePerDay: 0,
        pricePerMin: 7,
        isDaily: false,
    },
    {
        id: 'daily',
        label: 'На сутки, 1999 Р/сутки',
        pricePerDay: 1999,
        pricePerMin: 0,
        isDaily: true,
    },
];

// Дополнительные услуги
export interface ExtraService {
    id: string;
    label: string;
    price: number;
}

export const EXTRA_SERVICES: ExtraService[] = [
    { id: 'full-tank', label: 'Полный бак', price: 500 },
    { id: 'child-seat', label: 'Детское кресло', price: 200 },
    { id: 'right-wheel', label: 'Правый руль', price: 1600 },
];