import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Stepper } from '@/shared/ui/Stepper/Stepper';
import { OrderSummary } from '@/widgets/order-summary/ui/OrderSummary';
import { useBookingStore, type BookingStepSlug } from './model/bookingStore';
import { useExtraStep } from '@/features/extra-step/model/useExtraStep';
import { useOrderDetails } from './model/useOrderDetails';

import { Header } from '@/shared/ui/Header';
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
    const { isStepValid } = useBookingStore();
    const { totalPriceLabel } = useExtraStep();
    const orderDetails = useOrderDetails();

    // текущий шаг по URL
    const currentSlug = location.pathname.split('/').pop() as BookingStepSlug;
    const currentStepIndex = STEPS.findIndex((s) => s.slug === currentSlug);

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

                    <div className="booking__main">
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
                    </div>
                </div>
            </div>
        </main>

    );
};

export { Booking };