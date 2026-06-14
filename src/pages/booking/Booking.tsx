import { Outlet, useNavigate, useLocation, useMatch } from 'react-router-dom';
import { useState } from 'react';
import { Stepper } from '@/shared/ui/Stepper/Stepper';
import { OrderSummary } from '@/widgets/order-summary/ui/OrderSummary';
import { useBookingStore, type BookingStepSlug } from './model/bookingStore';
import { useExtraStep } from '@/features/extra-step/model/useExtraStep';
import { useOrderDetails } from './model/useOrderDetails';
import { Modal } from '@/shared/ui/Modal';
import { Header } from '@/shared/ui/Header';
import { saveOrder } from '@/pages/order/model/orderService';
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
    const { isStepValid, resetLocation, city, point, selectedCar, extra } = useBookingStore();
    const { totalPriceLabel } = useExtraStep();
    const orderDetails = useOrderDetails();
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    // Определяем, находимся ли мы на странице подтверждённого заказа
    const orderMatch = useMatch('/booking/order/:orderId');
    const confirmedOrderId = orderMatch?.params.orderId ?? null;

    // Текущий шаг по URL
    const currentSlug = location.pathname.split('/').pop() as BookingStepSlug;
    const currentStepIndex = STEPS.findIndex((s) => s.slug === currentSlug);

    const nextStep = STEPS[currentStepIndex + 1];
    const canProceed = isStepValid(currentSlug);

    const isStepAccessible = (index: number): boolean => {
        if (index === 0) return true;
        return STEPS.slice(0, index).every((s) => isStepValid(s.slug));
    };

    const clickableSteps = STEPS.map(
        (_, index) => index !== currentStepIndex && isStepAccessible(index)
    );

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
        const id = `RU${Math.floor(Math.random() * 90_000_000 + 10_000_000)}`;

        saveOrder({
            id,
            city,
            point,
            car: selectedCar!,
            extra,
            details: orderDetails,
            totalPrice: totalPriceLabel,
            createdAt: new Date().toISOString(),
        });

        setIsConfirmOpen(false);
        navigate(`/booking/order/${id}`);
    };

    const handleCloseModal = () => setIsConfirmOpen(false);

    const handleCancelOrder = () => {
        resetLocation();
        navigate(`/booking/${FIRST_STEP}`);
    };

    return (
        <main className="booking">
            <div className="container">
                <div className="booking__wrapper">
                    <Header />

                    <div className="booking__stepper-wrapper">
                        {confirmedOrderId ? (
                            <div className="booking__order-number">
                                Заказ номер{' '}
                                <span className="booking__order-number-value">
                                    {confirmedOrderId}
                                </span>
                            </div>
                        ) : (
                            <Stepper
                                steps={STEPS.map((s) => s.label)}
                                currentStep={currentStepIndex}
                                clickableSteps={clickableSteps}
                                onStepClick={handleStepClick}
                            />
                        )}
                    </div>

                    <div className="booking__main">
                        <section className="booking__content">
                            <Outlet />
                        </section>

                        <section className="booking__sidebar">
                            <OrderSummary
                                details={orderDetails}
                                price={totalPriceLabel}
                                buttonText={
                                    currentSlug === 'summary'
                                        ? 'Заказать'
                                        : `Перейти: ${nextStep?.label ?? 'Готово'}`
                                }
                                isButtonDisabled={!canProceed}
                                onButtonClick={handleNextStep}
                                isOrderConfirmed={!!confirmedOrderId}
                                onCancelOrder={handleCancelOrder}
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
