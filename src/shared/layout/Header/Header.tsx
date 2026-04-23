import { IconLocation } from '../../ui/icons';
import './Header.scss';


const Header = () => {
    return (
        <header className="header">
            <div className="header__wrapper">
                <span className="header__logo-text">Need for drive</span>
                <div className="header__location">
                    <IconLocation className='header__icon' />
                    <span className='header__city'>Ульяновск</span>
                </div>
            </div>
        </header >
    )
}

export default Header