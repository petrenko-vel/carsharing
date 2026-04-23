import './Button.scss';


interface ButtonProps {
    children: React.ReactNode;
    gradient?: string;
    href: string;
    className?: string;
}

const Button = (props: ButtonProps) => {

    const {
        children,
        gradient = 'hero', // по умолчанию: градиент кнопки на главной странице
        href,
        className = '',
    } = props


    return (
        <a
            href={href}
            className={`button button--${gradient} ${className}`}
        >
            {children}
        </a>
    )
}

export default Button