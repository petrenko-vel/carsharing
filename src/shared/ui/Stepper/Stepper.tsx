import './Stepper.scss';

interface StepperProps {
    className?: string;
    steps: string[];
    currentStep: number;
    /** Для каждого шага — можно ли на него кликнуть. Если не передан, кликабельны только пройденные шаги. */
    clickableSteps?: boolean[];
    onStepClick?: (index: number) => void;
}

export const Stepper = (props: StepperProps) => {
    const {
        className = "",
        steps,
        currentStep,
        clickableSteps,
        onStepClick
    } = props;

    return (
        <nav className={`stepper ${className}`} aria-label="Навигация по этапам">
            <ul className="stepper__list">
                {steps.map((step, index) => {
                    const isActive = index === currentStep;
                    const isPassed = index < currentStep;

                    const isClickable = (clickableSteps ? clickableSteps[index] : isPassed) && Boolean(onStepClick);
                    const isDisabled = clickableSteps
                        ? !isActive && !clickableSteps[index]
                        : false;

                    return (
                        <li key={step} className="stepper__item-wrapper">
                            <a
                                className={[
                                    'stepper__item',
                                    isActive ? 'stepper__item--active' : '',
                                    isPassed ? 'stepper__item--passed' : '',
                                    isClickable ? 'stepper__item--clickable' : '',
                                    isDisabled ? 'stepper__item--disabled' : '',
                                ].join(' ').trim()}
                                role={isClickable ? 'button' : undefined}
                                tabIndex={isClickable ? 0 : undefined}
                                aria-current={isActive ? 'step' : undefined}
                                aria-disabled={isDisabled || undefined}
                                onClick={() => isClickable && onStepClick?.(index)}
                                onKeyDown={(e) => {
                                    if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
                                        onStepClick?.(index);
                                    }
                                }}
                            >
                                {step}
                            </a>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};