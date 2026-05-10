import './Stepper.scss';

interface StepperProps {
    className?: string;
    steps: string[];
    currentStep: number;

    onStepClick?: (index: number) => void;
}

const Stepper = (props: StepperProps) => {
    const {
        className = "",
        steps,
        currentStep,
        onStepClick
    } = props;

    return (
        <nav className={`${className} stepper`} aria-label="Навигация по этапам">
            <ul className="stepper__list">
                {steps.map((step, index) => {
                    const isActive = index === currentStep;
                    const isPassed = index < currentStep;

                    // Кликабелен только пройденный шаг
                    const isClickable = isPassed && Boolean(onStepClick);

                    return (
                        <li key={step} className="stepper__item-wrapper">
                            <a
                                className={[
                                    'stepper__item',
                                    isActive ? 'stepper__item--active' : '',
                                    isPassed ? 'stepper__item--passed' : '',
                                    isClickable ? 'stepper__item--clickable' : '',
                                ].join(' ').trim()}
                                role={isClickable ? 'button' : undefined}
                                tabIndex={isClickable ? 0 : undefined}
                                aria-current={isActive ? 'step' : undefined}
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

export default Stepper;