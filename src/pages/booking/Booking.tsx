import Stepper from '@/shared/ui/Stepper/Stepper';
import LocationStep from '@/features/location-step/ui/LocationStep';
import OrderSummary from '@/widgets/order-summary/ui/OrderSummary';
import { useBookingStore } from './model/bookingStore';
import Header from '@/shared/ui/Header';
import './Booking.scss';

const BOOKING_STEPS = ['Местоположение', 'Модель', 'Дополнительно', 'Итого'];

const Booking = () => {
    const { city, point } = useBookingStore();

    // Формируем данные для виджета "Ваш заказ"
    const orderDetails = [];

    if (city) {
        const fullAddress = point ? `${city},\n${point}` : city;
        orderDetails.push({ label: 'Пункт выдачи', value: fullAddress });
    }

    // Кнопка "Выбрать модель" неактивна, пока не заполнены оба поля
    const isStepValid = Boolean(city && point);

    return (
        <>
            <main className="booking">
                <div className="booking__wrapper container">
                    <Header />

                    <div className="booking__stepper-wrapper">
                        <Stepper steps={BOOKING_STEPS} currentStep={0} />
                    </div>

                    <main className="booking__main">
                        <section className="booking__content">
                            <LocationStep />
                        </section>
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
            </main>
        </>
    );
};

export default Booking;