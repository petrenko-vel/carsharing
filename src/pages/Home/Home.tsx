import { useSlider } from '@/widgets/advantages-slider/model/useSlider';
import { useFadeAnimation } from '@/widgets/advantages-slider/model/useFadeAnimation';
import Hero from '@/widgets/hero';
import AdvantagesSlider from '@/widgets/advantages-slider';
import Menu from '@/widgets/menu';
import { advantagesData } from '@/widgets/advantages-slider/model/slides.mock';
import './Home.scss';

const Home = () => {
  const { currentIndex, next, prev, goTo } = useSlider(advantagesData.length);
  const { visibleIndex, prevIndex, isTransitioning } =
    useFadeAnimation(currentIndex);

  return (
    <main className="home">
      <Menu items={advantagesData} activeIndex={currentIndex} onSelect={goTo} />
      <Hero />
      <AdvantagesSlider
        activeIndex={currentIndex}
        visibleIndex={visibleIndex}
        prevIndex={prevIndex}
        isTransitioning={isTransitioning}
        onNext={next}
        onPrev={prev}
        onGoTo={goTo}
      />
    </main>
  );
};

export default Home;
