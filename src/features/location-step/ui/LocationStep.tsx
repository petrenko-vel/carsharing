import Input from '@/shared/ui/Input/Input';
import { useBookingStore } from '@/pages/booking/model/bookingStore';
import locationsData from '../model/location.mock';
import './LocationStep.scss';

const LocationStep = () => {
    // Достаем значения и экшены из хранилища
    const { city, point, setCity, setPoint, resetLocation } = useBookingStore();

    // 1. Фильтруем города по введенному тексту для первого инпута
    const filteredCities = locationsData
        .map((c) => c.name)
        .filter((cityName) => cityName.toLowerCase().includes(city.toLowerCase()));

    // 2. Ищем объект выбранного города (чтобы проверить, существует ли он в базе)
    const selectedCity = locationsData.find(
        (c) => c.name.toLowerCase() === city.toLowerCase()
    );

    // 3. Если город найден — достаем его адреса и фильтруем по введенному тексту.
    // Если город не выбран или введен с ошибкой — возвращаем пустой массив.
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
                    onChange={setCity}        // Обновляем стейт при каждом нажатии клавиши
                    onSelect={setCity}        // Обновляем стейт при клике по подсказке
                    onClear={resetLocation}   // Полностью очищаем оба поля
                />

                <Input
                    label="Пункт выдачи"
                    placeholder="Начните вводить пункт..."
                    value={point}
                    options={filteredPoints}
                    disabled={!selectedCity}  // Блокируем поле, если город не выбран/невалиден
                    onChange={setPoint}
                    onSelect={setPoint}
                    onClear={() => setPoint('')} // Очищаем только адрес
                />
            </div>

            {/* Временная заглушка для карты */}
            <div className="location-step__map">
                <p>Выбрать на карте:</p>
                <div className="location-step__map-placeholder" style={{ height: '350px', background: '#eaeaea', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    Здесь будет карта
                </div>
            </div>
        </div>
    );
};

export default LocationStep;