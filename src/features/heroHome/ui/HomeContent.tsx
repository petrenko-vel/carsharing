import Button from '@/shared/ui/Button';
import './HomeContent.scss';
import Header from '@/shared/layout/Header';

const HeroContent = () => {
    return (
        <div className="container-hero-content">
            <Header />
            <section className="hero-content">
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
            </section>
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
    );
};

export default HeroContent;