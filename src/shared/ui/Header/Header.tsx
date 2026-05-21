import { Link } from 'react-router-dom';
import { IconLocation } from '@/shared/ui/icons/IconLocation';
import './Header.scss';

interface HeaderProps {
    className?: string
}

const Header = ({ className }: HeaderProps) => {

    return (
        <header className={`header ${className}`}>
            <div className="header__wrapper">
                <Link to="/" className="header__logo-text">
                    Need for drive
                </Link>
                <div className="header__location">
                    <IconLocation className="header__icon" />
                    <span className="header__city">Ульяновск</span>
                </div>
            </div>
        </header>
    );
};

export { Header };
