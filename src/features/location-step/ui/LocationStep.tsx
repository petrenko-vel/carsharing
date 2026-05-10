// features/location-step/ui/LocationStep.tsx
import { lazy, Suspense } from 'react';
import Input from '@/shared/ui/Input/Input';
import { useBookingStore } from '@/pages/booking/model/bookingStore';
import locationsData from '../model/location.mock';
import { useLocationMarkers } from '../model/useLocationMarkers';
import './LocationStep.scss';

const LocationMap = lazy(() => import('./LocationMap'));

const LocationStep = () => {
    const { city, point, setCity, setPoint, resetLocation } = useBookingStore();

    // zoom добавился — деструктурируем здесь
    const { markers, center, zoom } = useLocationMarkers();

    const filteredCities = locationsData
        .map((c) => c.name)
        .filter((cityName) => cityName.toLowerCase().includes(city.toLowerCase()));

    const selectedCity = locationsData.find(
        (c) => c.name.toLowerCase() === city.toLowerCase()
    );

    const filteredPoints = selectedCity
        ? selectedCity.points
            .map((p) => p.name)
            .filter((pointName) => pointName.toLowerCase().includes(point.toLowerCase()))
        : [];

    return (
        <div className="location-step">
            <div className="location-step__inputs">
                <Input
                    label="Город"
                    placeholder="Начните вводить город..."
                    value={city}
                    options={filteredCities}
                    onChange={setCity}
                    onSelect={setCity}
                    onClear={resetLocation}
                />

                <Input
                    label="Пункт выдачи"
                    placeholder="Начните вводить пункт..."
                    value={point}
                    options={filteredPoints}
                    disabled={!selectedCity}
                    onChange={setPoint}
                    onSelect={setPoint}
                    onClear={() => setPoint('')}
                />
            </div>

            <div className="location-step__map">
                <Suspense fallback={<div className="location-step__map-placeholder">Загрузка карты...</div>}>
                    {/* zoom прокидываем как новый проп */}
                    <LocationMap center={center} markers={markers} zoom={zoom} />
                </Suspense>
            </div>
        </div>
    );
};

export default LocationStep;