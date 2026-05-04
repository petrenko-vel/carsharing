import Hero from '@/widgets/hero';
import AdvantagesSlider from '@/widgets/advantages-slider';
import './Home.scss';

const Home = ({
  activeIndex,
  visibleIndex,
  prevIndex,
  isTransitioning,
  onNext,
  onPrev,
  onGoTo,
}) => {
  return (
    <main className="home">
      <Hero />
      <AdvantagesSlider
        activeIndex={activeIndex}
        visibleIndex={visibleIndex}
        prevIndex={prevIndex}
        isTransitioning={isTransitioning}
        onNext={onNext}
        onPrev={onPrev}
        onGoTo={onGoTo}
      />
    </main>
  );
};

export default Home;