import './Stepper.scss';

interface StepperProps {
    className?: string;
    steps: string[];
    currentStep: number;
}

const Stepper = (props: StepperProps) => {
    const {
        className = "",
        steps,
        currentStep
    } = props;

    return (
        <nav className={`${className} stepper`} aria-label="Навигация по этапам">
            <ul className="stepper__list">
                {steps.map((step, index) => {
                    const isActive = index === currentStep;
                    const isPassed = index < currentStep;

                    return (
                        <li key={step} className="stepper__item-wrapper">
                            <a
                                className={`stepper__item 
                                ${isActive ? 'stepper__item--active' : ''} 
                                ${isPassed ? 'stepper__item--passed' : ''}`
                                }
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