import type { CarCategory } from '@/pages/booking/model/bookingStore';

// локально: '/', на gh-pages: '/carsharing/'
const BASE = import.meta.env.BASE_URL;

export interface CarModel {
    id: string;
    brand: string;          // марка
    model: string;          // модель
    category: CarCategory;  // 'economy' | 'premium'
    priceMin: number;       // минимальная цена аренды
    priceMax: number;       // максимальная цена аренды
    imageUrl: string;       // путь к картинке из public/

    plateNumber: string;    // номерной знак
    fuelLevel: number;      // уровень топлива в процентах
    availableFrom: string;  // дата доступности: "2019-06-12T12:00:00"
}

const carsData: CarModel[] = [
    {
        id: '1',
        brand: 'Hyundai',
        model: 'Elantra',
        category: 'economy',
        priceMin: 12000,
        priceMax: 25000,
        imageUrl: `${BASE}cars/car-1.png`,
        plateNumber: 'А 123 ВС 77',
        fuelLevel: 80,
        availableFrom: '2019-06-12T10:00:00',
    },
    {
        id: '2',
        brand: 'Hyundai',
        model: 'i30 N',
        category: 'premium',
        priceMin: 10000,
        priceMax: 32000,
        imageUrl: `${BASE}cars/car-2.png`,
        plateNumber: 'А 123 ВС 77',
        fuelLevel: 80,
        availableFrom: '2019-06-12T10:00:00',
    },
    {
        id: '3',
        brand: 'Hyundai',
        model: 'Creta',
        category: 'economy',
        priceMin: 12000,
        priceMax: 25000,
        imageUrl: `${BASE}cars/car-3.png`,
        plateNumber: 'А 123 ВС 77',
        fuelLevel: 80,
        availableFrom: '2019-06-12T10:00:00',
    },
    {
        id: '4',
        brand: 'Hyundai',
        model: 'Sonata',
        category: 'premium',
        priceMin: 10000,
        priceMax: 32000,
        imageUrl: `${BASE}cars/car-4.png`,
        plateNumber: 'К 761 НА 73',
        fuelLevel: 100,
        availableFrom: '2019-06-12T12:00:00'
    },
    {
        id: '5',
        brand: 'Hyundai',
        model: 'Accent',
        category: 'economy',
        priceMin: 8000,
        priceMax: 18000,
        imageUrl: `${BASE}cars/car-1.png`,
        plateNumber: 'В 456 МН 99',
        fuelLevel: 60,
        availableFrom: '2019-06-13T09:00:00',

    },
    {
        id: '6',
        brand: 'Genesis',
        model: 'G80',
        category: 'premium',
        priceMin: 20000,
        priceMax: 50000,
        imageUrl: `${BASE}cars/car-2.png`,
        plateNumber: 'Е 789 КР 50',
        fuelLevel: 90,
        availableFrom: '2019-06-12T14:00:00',
    },
];

export default carsData;