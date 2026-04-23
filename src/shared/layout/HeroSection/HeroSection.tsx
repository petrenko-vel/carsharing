import HeroContent from '@/features/heroHome/ui';
import AdvantagesSlider from '@/features/advantages/ui';

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