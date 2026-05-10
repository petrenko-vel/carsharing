import type { CarCategory } from '@/pages/booking/model/bookingStore';

export interface CarModel {
    id: string;
    brand: string;          // марка
    model: string;          // модель
    category: CarCategory;  // 'economy' | 'premium'
    priceMin: number;       // минимальная цена аренды
    priceMax: number;       // максимальная цена аренды
    imageUrl: string;       // путь к картинке из public/
}

const carsData: CarModel[] = [
    {
        id: '1',
        brand: 'Hyundai',
        model: 'Elantra',
        category: 'economy',
        priceMin: 12000,
        priceMax: 25000,
        imageUrl: '/cars/car-1.png',
    },
    {
        id: '2',
        brand: 'Hyundai',
        model: 'i30 N',
        category: 'premium',
        priceMin: 10000,
        priceMax: 32000,
        imageUrl: '/cars/car-2.png',
    },
    {
        id: '3',
        brand: 'Hyundai',
        model: 'Creta',
        category: 'economy',
        priceMin: 12000,
        priceMax: 25000,
        imageUrl: '/cars/car-3.png',
    },
    {
        id: '4',
        brand: 'Hyundai',
        model: 'Sonata',
        category: 'premium',
        priceMin: 10000,
        priceMax: 32000,
        imageUrl: '/cars/car-4.png',
    },
    {
        id: '5',
        brand: 'Hyundai',
        model: 'Accent',
        category: 'economy',
        priceMin: 8000,
        priceMax: 18000,
        imageUrl: '/cars/car-1.png',
    },
    {
        id: '6',
        brand: 'Genesis',
        model: 'G80',
        category: 'premium',
        priceMin: 20000,
        priceMax: 50000,
        imageUrl: '/cars/car-2.png',
    },
];

export default carsData;