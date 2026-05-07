import Button from '@/shared/ui/Button';
import Header from '@/shared/ui/Header';
import Footer from './Footer';

import './Hero.scss';

const Hero = () => {
  return (
    <>
      <section className="hero-wrapper">
        <div className="container-hero-content">
          <Header />
          <div className="hero-content">
            <h1 className="hero-content__title">
              <span className="hero-content__title-main">Каршеринг</span>
              <span className="hero-content__title-brand">Need for drive</span>
            </h1>
            <p className="hero-content__subtitle">
              Поминутная аренда авто твоего города
            </p>
            <Button href="/booking" className="hero-content__button">
              Забронировать
            </Button>
          </div>
          <Footer />
        </div>
      </section>
    </>
  );
};

export default Hero;
