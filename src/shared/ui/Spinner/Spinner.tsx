import './Spinner.scss';

interface SpinnerProps {
    className?: string;
    size?: 'sm' | 'md' | 'lg';
}

export const Spinner = ({ className = '', size = 'md' }: SpinnerProps) => (
    <div
        className={`spinner spinner--${size} ${className}`.trim()}
        role="status"
        aria-label="Загрузка"
    />
);
