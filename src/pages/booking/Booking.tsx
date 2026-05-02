import Stepper from '@/shared/ui/Stepper/Stepper';
import LocationStep from '@/features/location-step/ui/LocationStep';
import OrderSummary from '@/widgets/order-summary/ui/OrderSummary';
import { useBookingStore } from './model/bookingStore';
import Header from '@/shared/ui/Header';
import './Booking.scss';

const BOOKING_STEPS = ['Местоположение', 'Модель', 'Дополнительно', 'Итого'];

const BookingPage = () => {
    // Вытаскиваем текущее состояние из нашего хранилища
    const { city, point } = useBookingStore();

    // Формируем данные для виджета "Ваш заказ"
    const orderDetails = [];

    // По ТЗ: отображаем пункт выдачи, только если выбран город
    if (city) {
        const fullAddress = point ? `${city},\n${point}` : city;
        orderDetails.push({ label: 'Пункт выдачи', value: fullAddress });
    }

    // По ТЗ: Кнопка "Выбрать модель" неактивна, пока не заполнены оба поля
    const isStepValid = Boolean(city && point);

    return (
        <>
            <div className="booking">
                {/* 1. Левое навигационное меню */}

                <div className="booking__wrapper container">
                    <Header />

                    {/* 3. Навигация по шагам */}
                    <div className="booking__stepper-wrapper">
                        <Stepper steps={BOOKING_STEPS} currentStep={0} />
                    </div>

                    {/* 4. Основная рабочая область */}
                    <main className="booking__main">
                        {/* Левая колонка с инпутами и картой */}
                        <section className="booking__content">
                            <LocationStep />
                        </section>

                        {/* Правая колонка с чеком */}
                        <section className="booking__sidebar">
                            <OrderSummary
                                details={orderDetails}
                                buttonText="Выбрать модель"
                                isButtonDisabled={!isStepValid}
                                onButtonClick={() => alert('Успех! Идем дальше!')}
                            />
                        </section>
                    </main>
                </div>
            </div>
        </>
    );
};

export default BookingPage;