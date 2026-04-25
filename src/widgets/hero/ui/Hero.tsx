import Button from '@/shared/ui/Button';
import IconLocation from '@/shared/ui/icons/IconLocation';
import './Hero.scss';
import './Header.scss';
import './Footer.scss'

const Hero = () => {
    return (
        <>
            <section className="hero-wrapper">
                <div className="container-hero-content">
                    <header className="header">
                        <div className="header__wrapper">
                            <span className="header__logo-text">Need for drive</span>
                            <div className="header__location">
                                <IconLocation className='header__icon' />
                                <span className='header__city'>Ульяновск</span>
                            </div>
                        </div>
                    </header >
                    <div className="hero-content">
                        <h1 className="hero-content__title">
                            <span className="hero-content__title-main">Каршеринг</span>
                            <span className="hero-content__title-brand">Need for drive</span>
                        </h1>
                        <p className="hero-content__subtitle">
                            Поминутная аренда авто твоего города
                        </p>
                        <Button
                            href='#'
                            className='hero-content__button'
                        >
                            Забронировать
                        </Button>
                    </div>
                    <footer className="footer">
                        <div className="footer__container">
                            <small className="footer__copyright">
                                © 2016-2019 «Need for drive»
                            </small>

                            <address className="footer__contact">
                                <a href="tel:84952342244" className="footer__phone">
                                    8 (495) 234-22-44
                                </a>
                            </address>
                        </div>
                    </footer>
                </div>
            </section>
        </>
    );
};

export default Hero;