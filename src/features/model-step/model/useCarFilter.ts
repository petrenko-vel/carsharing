import { useState, useMemo } from 'react';
import carsData, { type CarModel } from './cars.mock';

export type CarFilter = 'all' | 'economy' | 'premium';

interface UseCarFilterReturn {
    activeFilter: CarFilter;
    setActiveFilter: (filter: CarFilter) => void;
    filteredCars: CarModel[];
}

export const useCarFilter = (): UseCarFilterReturn => {
    const [activeFilter, setActiveFilter] = useState<CarFilter>('all');

    const filteredCars = useMemo<CarModel[]>(() => {
        if (activeFilter === 'all') return carsData;
        return carsData.filter((car) => car.category === activeFilter);
    }, [activeFilter]);

    return {
        activeFilter,
        setActiveFilter,
        filteredCars,
    };
};