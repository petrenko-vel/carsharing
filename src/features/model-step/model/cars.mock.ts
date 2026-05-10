import type { CarCategory } from '@/pages/booking/model/bookingStore';

export interface CarModel {
    id: string;
    brand: string;          // марка
    model: string;          // модель
    category: CarCategory;  // 'economy' | 'premium'
    priceMin: number;       // минимальная цена аренды
    priceMax: number;       // максимальная цена аренды
    imageUrl: string;       // путь к картинке из public/
    tank: string;           // объём бака
    enginePower: string;    // мощность двигателя
    transmission: string;   // "Механика" | "Автомат"
}

// imageUrl указывает на /public/cars/ — положи туда картинки перед запуском.
const carsData: CarModel[] = [
    {
        id: 'elantra',
        brand: 'Hyundai',
        model: 'Elantra',
        category: 'economy',
        priceMin: 12000,
        priceMax: 25000,
        imageUrl: '/cars/elantra.png',
        tank: '50л',
        enginePower: '128 л.с.',
        transmission: 'Автомат',
    },
    {
        id: 'i30n',
        brand: 'Hyundai',
        model: 'i30 N',
        category: 'premium',
        priceMin: 10000,
        priceMax: 32000,
        imageUrl: '/cars/i30n.png',
        tank: '50л',
        enginePower: '249 л.с.',
        transmission: 'Механика',
    },
    {
        id: 'creta',
        brand: 'Hyundai',
        model: 'Creta',
        category: 'economy',
        priceMin: 12000,
        priceMax: 25000,
        imageUrl: '/cars/creta.png',
        tank: '55л',
        enginePower: '150 л.с.',
        transmission: 'Автомат',
    },
    {
        id: 'sonata',
        brand: 'Hyundai',
        model: 'Sonata',
        category: 'premium',
        priceMin: 10000,
        priceMax: 32000,
        imageUrl: '/cars/sonata.png',
        tank: '70л',
        enginePower: '180 л.с.',
        transmission: 'Автомат',
    },
    {
        id: 'accent',
        brand: 'Hyundai',
        model: 'Accent',
        category: 'economy',
        priceMin: 8000,
        priceMax: 18000,
        imageUrl: '/cars/accent.png',
        tank: '45л',
        enginePower: '100 л.с.',
        transmission: 'Механика',
    },
    {
        id: 'genesis',
        brand: 'Genesis',
        model: 'G80',
        category: 'premium',
        priceMin: 20000,
        priceMax: 50000,
        imageUrl: '/cars/genesis-g80.png',
        tank: '80л',
        enginePower: '375 л.с.',
        transmission: 'Автомат',
    },
];

export default carsData;