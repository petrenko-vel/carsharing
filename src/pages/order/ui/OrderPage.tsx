import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Spinner } from '@/shared/ui/Spinner';
import { CarPlaceholder } from '@/shared/ui/CarPlaceholder';
import { fetchOrderById, type StoredOrder } from '../model/orderService';
import './OrderPage.scss';

export const OrderPage = () => {
    const { orderId } = useParams<{ orderId: string }>();
    const [order, setOrder] = useState<StoredOrder | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const [imgFailed, setImgFailed] = useState(false);

    useEffect(() => {
        if (!orderId) return;
        setIsLoading(true);
        fetchOrderById(orderId).then((data) => {
            setIsLoading(false);
            if (data) {
                setOrder(data);
                setImgFailed(!data.car.imageUrl);
            } else {
                setNotFound(true);
            }
        });
    }, [orderId]);

    if (isLoading) {
        return (
            <div className="order-page order-page--loading">
                <Spinner size="lg" />
                <p>Загружаем данные заказа...</p>
            </div>
        );
    }

    if (notFound || !order) {
        return (
            <div className="order-page order-page--not-found">
                <p className="order-page__not-found-text">Заказ не найден</p>
                <Link to="/booking/location" className="order-page__back-link">
                    Создать новый заказ
                </Link>
            </div>
        );
    }

    const availableFrom = order.car.availableFrom
        ? new Date(order.car.availableFrom).toLocaleString('ru-RU', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
          })
        : null;

    const showImage = Boolean(order.car.imageUrl) && !imgFailed;

    return (
        <div className="order-page">
            <h2 className="order-page__title">Ваш заказ подтверждён</h2>

            <div className="order-page__car">
                <div className="order-page__car-info">
                    <p className="order-page__car-name">{order.car.name}</p>

                    {order.car.plateNumber && (
                        <span className="order-page__plate">{order.car.plateNumber}</span>
                    )}

                    {order.car.fuelLevel != null && (
                        <p className="order-page__detail">
                            <b>Топливо</b> {order.car.fuelLevel}%
                        </p>
                    )}

                    {availableFrom && (
                        <p className="order-page__detail">
                            <b>Доступна с</b> {availableFrom}
                        </p>
                    )}
                </div>

                <div className="order-page__car-image">
                    {showImage ? (
                        <img
                            src={order.car.imageUrl}
                            alt={order.car.name}
                            onError={() => setImgFailed(true)}
                        />
                    ) : (
                        <CarPlaceholder />
                    )}
                </div>
            </div>
        </div>
    );
};
