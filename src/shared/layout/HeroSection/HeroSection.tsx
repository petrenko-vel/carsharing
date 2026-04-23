import HeroContent from '@/components/ui/HeroContent/HeroContent';
import AdvantagesSlider from '@/components/ui/AdvantagesSlider/AdvantagesSlider';

import './HeroSection.scss';


export const HeroSection = () => {
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