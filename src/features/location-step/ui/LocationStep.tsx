import Input from '@/shared/ui/Input/Input';
import { useBookingStore } from '@/pages/booking/model/bookingStore';
import locationsData from '../model/location.mock';
import './LocationStep.scss';

const LocationStep = () => {
    const { city, point, setCity, setPoint, resetLocation } = useBookingStore();

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

            {/* Временная заглушка для карты */}
            <div className="location-step__map">
                <p>Выбрать на карте:</p>
                <div className="location-step__map-placeholder">
                    Здесь будет карта
                </div>
            </div>
        </div>
    );
};

export default LocationStep;