import './CarPlaceholder.scss';

interface CarPlaceholderProps {
    className?: string;
}

export const CarPlaceholder = ({ className = '' }: CarPlaceholderProps) => (
    <div className={`car-placeholder ${className}`.trim()} aria-label="Изображение недоступно">
        <svg
            className="car-placeholder__icon"
            viewBox="0 0 64 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            <path
                d="M6 20H4V14L10 8H42L48 14V20H46M6 20H46M6 20C6 22.2 7.8 24 10 24C12.2 24 14 22.2 14 20M46 20C46 22.2 44.2 24 42 24C39.8 24 38 22.2 38 20M14 20H38"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <circle cx="10" cy="20" r="4" stroke="currentColor" strokeWidth="2" />
            <circle cx="42" cy="20" r="4" stroke="currentColor" strokeWidth="2" />
            <path
                d="M10 11L14 8M10 11H38L42 8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
        </svg>
        <span className="car-placeholder__text">Фото недоступно</span>
    </div>
);
