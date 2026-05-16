import React, { useEffect, useRef } from 'react';
import { YMaps, Map, Placemark, ZoomControl } from '@pbe/react-yandex-maps';
import type { MarkerData } from '../model/useLocationMarkers';

interface LocationMapProps {
    center: [number, number];
    markers: MarkerData[];
    zoom: number; // новый проп
}

const LocationMap: React.FC<LocationMapProps> = ({ center, markers, zoom }) => {
    const mapRef = useRef<ymaps.Map | null>(null);

    useEffect(() => {
        if (!mapRef.current) return;

        // setCenter третьим аргументом принимает options —
        // duration задаёт длительность анимации в миллисекундах
        mapRef.current.setCenter(center, zoom, { duration: 300 });
    }, [center, zoom]); // следим за обоими — zoom тоже меняется при выборе точки

    const apiKey = import.meta.env.VITE_YANDEX_MAPS_API_KEY;

    if (!apiKey) {
        return (
            <div className="location-step__map-placeholder">
                ⚠️ API ключ не настроен. Добавьте VITE_YANDEX_MAPS_API_KEY в .env
            </div>
        );
    }

    return (
        <YMaps query={{ apikey: apiKey, lang: 'ru_RU' }}>
            <div className="location-step__map-container">
                <Map
                    instanceRef={(map) => {
                        mapRef.current = map;
                    }}
                    defaultState={{
                        center,
                        zoom,         // стартовый зум теперь тоже динамический
                        controls: [],
                    }}
                    width="100%"
                    height="100%"
                    modules={['geocode', 'package.full']}
                >
                    <ZoomControl />
                    {markers.map((marker) => (
                        <Placemark
                            key={marker.id}
                            geometry={marker.coordinates}
                            properties={{
                                hintContent: marker.hint,
                            }}
                            options={{
                                preset: 'islands#blueCircleDotIcon',
                            }}
                        />
                    ))}
                </Map>
            </div>
        </YMaps>
    );
};

const LocationMapMemo = React.memo(LocationMap);

// Для lazy() обязательно нужен default export!
export default LocationMapMemo;

// Именованный — для обычных импортов
export { LocationMapMemo as LocationMap };