import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Stepper } from '@/shared/ui/Stepper/Stepper';
import { OrderSummary } from '@/widgets/order-summary/ui/OrderSummary';
import { useBookingStore, type BookingStepSlug } from './model/bookingStore';
import { useExtraStep } from '@/features/extra-step/model/useExtraStep';
import { useOrderDetails } from './model/useOrderDetails';
import { Modal } from '@/shared/ui/Modal';
import { Header } from '@/shared/ui/Header';
import './Booking.scss';

const FIRST_STEP = 'location';

const STEPS: { label: string; slug: BookingStepSlug }[] = [
    { label: 'Местоположение', slug: 'location' },
    { label: 'Модель', slug: 'model' },
    { label: 'Дополнительно', slug: 'extra' },
    { label: 'Итого', slug: 'summary' },
];

export const Booking = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { isStepValid, resetLocation } = useBookingStore();
    const { totalPriceLabel } = useExtraStep();
    const orderDetails = useOrderDetails();
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);

    // Текущий шаг по URL
    const currentSlug = location.pathname.split('/').pop() as BookingStepSlug;
    const currentStepIndex = STEPS.findIndex((s) => s.slug === currentSlug);

    // Следующий шаг
    const nextStep = STEPS[currentStepIndex + 1];
    const canProceed = isStepValid(currentSlug);

    // Шаг N доступен, если все предыдущие шаги валидны
    const isStepAccessible = (index: number): boolean => {
        if (index === 0) return true;
        return STEPS.slice(0, index).every((s) => isStepValid(s.slug));
    };

    // Для каждого шага — можно ли на него кликнуть (доступен и не является текущим)
    const clickableSteps = STEPS.map((_, index) => index !== currentStepIndex && isStepAccessible(index));

    const handleNextStep = () => {
        if (currentSlug === 'summary') {
            setIsConfirmOpen(true);
            return;
        }
        if (canProceed && nextStep) {
            navigate(`/booking/${nextStep.slug}`);
        }
    };

    const handleStepClick = (index: number) => {
        if (index !== currentStepIndex && isStepAccessible(index)) {
            navigate(`/booking/${STEPS[index].slug}`);
        }
    };

    const handleConfirmOrder = () => {
        setIsConfirmOpen(false);
        setIsOrderConfirmed(true);
    };

    const handleCloseModal = () => {
        setIsConfirmOpen(false);
    };

    const handleCancelConfirmedOrder = () => {
        setIsOrderConfirmed(false);
        resetLocation();
        navigate(`/booking/${FIRST_STEP}`);
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
                            clickableSteps={clickableSteps}
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
                                buttonText={currentSlug === 'summary' ? 'Заказать' : `Перейти: ${nextStep?.label ?? 'Готово'}`}
                                isButtonDisabled={!canProceed}
                                onButtonClick={handleNextStep}
                                isOrderConfirmed={isOrderConfirmed}
                                onCancelOrder={handleCancelConfirmedOrder}
                            />
                        </section>
                    </div>
                </div>
            </div>

            <Modal
                title="Подтвердить заказ"
                isOpen={isConfirmOpen}
                onClose={handleCloseModal}
                actions={[
                    {
                        label: 'Подтвердить',
                        onClick: handleConfirmOrder,
                        variant: 'primary',
                    },
                    {
                        label: 'Вернуться',
                        onClick: handleCloseModal,
                        variant: 'danger',
                    },
                ]}
            />
        </main>

    );
};
