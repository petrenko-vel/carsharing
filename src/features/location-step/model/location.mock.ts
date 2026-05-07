type Coords = [number, number]; // [Широта, Долгота]

interface MapPoint {
    id: string;
    name: string;      // Название улицы/дома
    coords: Coords;    // Координаты маркера
}

interface MapCity {
    id: string;
    name: string;      // Название города
    coords: Coords;    // Координаты центра города
    points: MapPoint[]; // Список доступных адресов в этом городе
}

const locationsData: MapCity[] = [
    {
        id: '1',
        name: 'Ульяновск',
        coords: [54.314192, 48.403123],
        points: [
            { id: 'p1', name: 'Нариманова 42', coords: [54.340263, 48.395159] },
            { id: 'p2', name: 'Московское шоссе 34', coords: [54.301546, 48.324545] },
            { id: 'p3', name: 'Гончарова 11', coords: [54.317585, 48.395610] },
        ],
    },
    {
        id: '2',
        name: 'Москва',
        coords: [55.755864, 37.617698],
        points: [
            { id: 'p4', name: 'Красная площадь 1', coords: [55.753544, 37.621202] },
            { id: 'p5', name: 'Новый Арбат 15', coords: [55.752150, 37.593250] },
        ],
    },
    {
        id: '3',
        name: 'Казань',
        coords: [55.796127, 49.106414],
        points: [
            { id: 'p6', name: 'Баумана 20', coords: [55.790938, 49.114486] },
            { id: 'p7', name: 'Петербургская 1', coords: [55.786523, 49.123984] },
        ],
    },
];

export default locationsData;