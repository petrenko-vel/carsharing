import React, { useEffect, useRef } from 'react';
import { YMaps, Map, Placemark, ZoomControl } from '@pbe/react-yandex-maps';
import type { MarkerData } from '../model/useLocationMarkers';

interface LocationMapProps {
    center: [number, number];
    markers: MarkerData[];
    zoom: number;
}

const LocationMap: React.FC<LocationMapProps> = ({ center, markers, zoom }) => {
    const mapRef = useRef<ymaps.Map | null>(null);

    useEffect(() => {
        if (!mapRef.current) return;

        mapRef.current.setCenter(center, zoom, { duration: 300 });
    }, [center, zoom]);

    const apiKey = import.meta.env.VITE_YANDEX_MAPS_API_KEY;

    if (!apiKey) {
        if (import.meta.env.DEV) {
            console.error('[LocationMap] VITE_YANDEX_MAPS_API_KEY не настроен');
        }
        return (
            <div className="location-step__map-placeholder">
                Карта временно недоступна
            </div>
        );
    }

    const handleMapInit = (map: ymaps.Map | null) => {
        mapRef.current = map;
    };

    return (
        <YMaps query={{ apikey: apiKey, lang: 'ru_RU' }}>
            <div className="location-step__map-container">
                <Map
                    instanceRef={handleMapInit}
                    defaultState={{
                        center,
                        zoom,
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
export default LocationMapMemo;
export { LocationMapMemo as LocationMap };