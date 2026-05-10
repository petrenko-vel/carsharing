// features/location-step/model/useLocationMarkers.ts
import { useMemo } from 'react';
import { useBookingStore } from '@/pages/booking/model/bookingStore';
import locationsData, { type MapPoint } from './location.mock';

export interface MarkerData {
    id: string;
    coordinates: [number, number];
    hint: string;
}

// Выносим уровни зума в константы — удобно менять в одном месте
const ZOOM = {
    DEFAULT: 10,  // все города
    CITY: 12,     // выбран город, видны все его точки
    POINT: 16,    // выбрана конкретная точка выдачи
} as const;

export const useLocationMarkers = () => {
    const { city, point } = useBookingStore();

    const markers = useMemo<MarkerData[]>(() => {
        const cityObj = city
            ? locationsData.find((c) => c.name.toLowerCase() === city.toLowerCase())
            : undefined;

        let pointsToShow: MapPoint[] = [];

        if (point && cityObj) {
            const pt = cityObj.points.find(
                (p) => p.name.toLowerCase() === point.toLowerCase()
            );
            if (pt) pointsToShow = [pt];
        } else if (cityObj) {
            pointsToShow = cityObj.points;
        } else {
            pointsToShow = locationsData.flatMap((c) => c.points);
        }

        return pointsToShow.map((p) => ({
            id: p.id,
            coordinates: p.coords,
            hint: p.name,
        }));
    }, [city, point]);

    // center и zoom вычисляем вместе — они логически связаны,
    // поэтому один useMemo вместо двух отдельных
    const { center, zoom } = useMemo<{
        center: [number, number];
        zoom: number;
    }>(() => {
        // Выбрана конкретная точка — зумимся прямо на неё
        if (city && point) {
            const cityObj = locationsData.find(
                (c) => c.name.toLowerCase() === city.toLowerCase()
            );
            const pt = cityObj?.points.find(
                (p) => p.name.toLowerCase() === point.toLowerCase()
            );
            if (pt) {
                return { center: pt.coords, zoom: ZOOM.POINT };
            }
        }

        // Выбран город — центрируемся на нём
        if (city) {
            const cityObj = locationsData.find(
                (c) => c.name.toLowerCase() === city.toLowerCase()
            );
            if (cityObj) {
                return { center: cityObj.coords, zoom: ZOOM.CITY };
            }
        }

        // Ничего не выбрано — среднее по всем маркерам или дефолт Москва
        if (markers.length > 0) {
            const lats = markers.map((m) => m.coordinates[0]);
            const lngs = markers.map((m) => m.coordinates[1]);
            const avgLat = lats.reduce((a, b) => a + b, 0) / lats.length;
            const avgLng = lngs.reduce((a, b) => a + b, 0) / lngs.length;
            return { center: [avgLat, avgLng], zoom: ZOOM.DEFAULT };
        }

        return { center: [55.755864, 37.617698], zoom: ZOOM.DEFAULT };
    }, [city, point, markers]);

    return { markers, center, zoom };
};