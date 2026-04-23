import HeroContent from '@/shared/components/HeroContent';
import AdvantagesSlider from '@/shared/components/AdvantagesSlider';

import './HeroSection.scss';


const HeroSection = () => {
    return (
        <>
            <section className="hero">
                <div className="hero__left">
                    <HeroContent />
                </div>
                <div className="hero__right">
                    <AdvantagesSlider />
                </div>
            </section>
        </>
    )
}

export default HeroSection