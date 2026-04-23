import './Button.scss';


interface ButtonProps {
    children: React.ReactNode;
    gradient: 'green' | 'blue' | 'red' | 'purple';  // 👈 только эти варианты
    href: string;
    className?: string;
}

const Button = (props: ButtonProps) => {

    const {
        children,
        gradient = 'green',      // primary, secondary, outline
        href,                     // если ссылка
        // onClick,                  // если кнопка
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