import { useState } from 'react';
import Hero from '@/widgets/hero';
import AdvantagesSlider from '@/widgets/advantages-slider';
import Menu from '@/widgets/menu';
import { advantagesData } from '@/widgets/advantages-slider/lib/slides';
import './Home.scss';

const Home = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  return (
    <main className="home">
      <Menu
        items={advantagesData}
        activeIndex={currentSlideIndex}
        onSelect={setCurrentSlideIndex}
      />
      <Hero />
      <AdvantagesSlider
        currentIndex={currentSlideIndex}
        onSlideChange={setCurrentSlideIndex}
      />
    </main>
  );
};

export default Home;
