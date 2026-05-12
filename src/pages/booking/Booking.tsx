import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Stepper from '@/shared/ui/Stepper/Stepper';
import OrderSummary from '@/widgets/order-summary/ui/OrderSummary';
import { useBookingStore, type BookingStepSlug } from './model/bookingStore';
import { useExtraStep } from '@/features/extra-step/model/useExtraStep';
import { EXTRA_SERVICES } from '@/features/extra-step/model/extraOptions.mock';

import Header from '@/shared/ui/Header';
import './Booking.scss';

// Порядок шагов
const STEPS: { label: string; slug: BookingStepSlug }[] = [
    { label: 'Местоположение', slug: 'location' },
    { label: 'Модель', slug: 'model' },
    { label: 'Дополнительно', slug: 'extra' },
    { label: 'Итого', slug: 'summary' },
];

const Booking = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { city, point, selectedCar, extra, isStepValid } = useBookingStore();
    const { totalPriceLabel } = useExtraStep();


    // текущий шаг по URL
    const currentSlug = location.pathname.split('/').pop() as BookingStepSlug;
    const currentStepIndex = STEPS.findIndex((s) => s.slug === currentSlug);

    // Данные для OrderSummary
    const orderDetails = [];

    // Шаг 1
    if (city) {
        const fullAddress = point ? `${city},\n${point}` : city;
        orderDetails.push({ label: 'Пункт выдачи', value: fullAddress });
    }

    // Шаг 2
    if (selectedCar) {
        orderDetails.push({ label: 'Модель', value: selectedCar.name });
    }

    // const priceLabel = selectedCar
    //     ? `от ${selectedCar.priceMin.toLocaleString('ru-RU')} до ${selectedCar.priceMax.toLocaleString('ru-RU')} ₽`
    //     : undefined;


    // Шаг 3
    if (extra.dateFrom && extra.dateTo) {
        const fromDate = new Date(extra.dateFrom).toLocaleDateString('ru-RU');
        const toDate = new Date(extra.dateTo).toLocaleDateString('ru-RU');
        orderDetails.push({ label: 'Длительность аренды', value: `${fromDate} – ${toDate}` });
    }

    if (extra.colorLabel) {
        orderDetails.push({ label: 'Цвет', value: extra.colorLabel });
    }

    if (extra.tariffLabel) {
        orderDetails.push({ label: 'Тариф', value: extra.tariffLabel });
    }

    // Доп услуги — показываем только выбранные
    if (extra.services.length > 0) {
        const serviceLabels = EXTRA_SERVICES
            .filter((s) => extra.services.includes(s.id))
            .map((s) => s.label)
            .join(', ');
        orderDetails.push({ label: 'Доп услуги', value: serviceLabels });
    }

    // Следующий шаг
    const nextStep = STEPS[currentStepIndex + 1];
    const canProceed = isStepValid(currentSlug);

    const handleNextStep = () => {
        if (canProceed && nextStep) {
            navigate(`/booking/${nextStep.slug}`);
        }
    };

    const handleStepClick = (index: number) => {
        const targetSlug = STEPS[index].slug;
        const isPassed = index < currentStepIndex;
        if (isPassed) {
            navigate(`/booking/${targetSlug}`);
        }
    };

    return (
        <>
            <main className="booking">
                <div className="container">
                    <div className="booking__wrapper">
                        <Header />

                        <div className="booking__stepper-wrapper">
                            <Stepper
                                steps={STEPS.map((s) => s.label)}
                                currentStep={currentStepIndex}
                                onStepClick={handleStepClick}
                            />
                        </div>

                        <main className="booking__main">
                            <section className="booking__content">
                                <Outlet />
                            </section>
                            <section className="booking__sidebar">
                                <OrderSummary
                                    details={orderDetails}
                                    price={totalPriceLabel}
                                    buttonText={nextStep ? `Перейти: ${nextStep.label}` : 'Готово'}
                                    isButtonDisabled={!canProceed}
                                    onButtonClick={handleNextStep}
                                />
                            </section>
                        </main>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Booking;