import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Stepper from '@/shared/ui/Stepper/Stepper';
import OrderSummary from '@/widgets/order-summary/ui/OrderSummary';
import { useBookingStore, type BookingStepSlug } from './model/bookingStore';
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
    const { city, point, isStepValid } = useBookingStore();

    // текущий шаг по URL
    const currentSlug = location.pathname.split('/').pop() as BookingStepSlug;
    const currentStepIndex = STEPS.findIndex((s) => s.slug === currentSlug);

    // Данные для OrderSummary
    const orderDetails = [];
    if (city) {
        const fullAddress = point ? `${city},\n${point}` : city;
        orderDetails.push({ label: 'Пункт выдачи', value: fullAddress });
    }

    // Следующий шаг
    const nextStep = STEPS[currentStepIndex + 1];
    const canProceed = isStepValid(currentSlug);

    const handleNextStep = () => {
        if (canProceed && nextStep) {
            navigate(`/booking/${nextStep.slug}`);
        }
    };

    // Клик по шагу в Stepper — разрешён только для пройденных шагов
    const handleStepClick = (index: number) => {
        const targetSlug = STEPS[index].slug;
        // Пройденный шаг — это любой шаг до текущего
        const isPassed = index < currentStepIndex;
        if (isPassed) {
            navigate(`/booking/${targetSlug}`);
        }
    };

    return (
        <>
            <main className="booking">
                <div className="booking__wrapper container">
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
                                buttonText={nextStep ? `Перейти: ${nextStep.label}` : 'Готово'}
                                isButtonDisabled={!canProceed}
                                onButtonClick={handleNextStep}
                            />
                        </section>
                    </main>
                </div>
            </main>
        </>
    );
};

export default Booking;