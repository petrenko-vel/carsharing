import Hero from '@/widgets/hero';
import AdvantagesSlider from '@/widgets/advantages-slider';
import './Home.scss';

interface HomeProps {
  activeIndex: number;
  visibleIndex: number;
  prevIndex: number | null;
  isTransitioning: boolean;
  onNext: () => void;
  onPrev: () => void;
  onGoTo: (index: number) => void;
}

const Home = (props: HomeProps) => {

  const {
    activeIndex,
    visibleIndex,
    prevIndex,
    isTransitioning,
    onNext,
    onPrev,
    onGoTo,
  } = props;

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