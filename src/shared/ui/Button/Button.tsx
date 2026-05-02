import './Button.scss';

interface ButtonProps {
  children: React.ReactNode;
  gradient?: string;
  href?: string;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

const Button = (props: ButtonProps) => {
  const {
    children,
    gradient = 'hero',
    href,
    disabled = false,
    onClick,
    className = '',
  } = props;

  const classes = `button button--${gradient} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;