import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from '@/pages/home';
import Booking from '@/pages/booking';
import LocationStep from '@/features/location-step/ui/LocationStep';
import Menu from '@/widgets/menu';
import { useSlider } from '@/widgets/advantages-slider/model/useSlider';
import { useFadeAnimation } from '@/widgets/advantages-slider/model/useFadeAnimation';
import { advantagesData } from '@/widgets/advantages-slider/model/slides.mock';

function AppLayout() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  // Логика слайдера (только для Home)
  const { currentIndex, next, prev, goTo } = useSlider(advantagesData.length);
  const { visibleIndex, prevIndex, isTransitioning } = useFadeAnimation(currentIndex);

  const menuProps = isHome
    ? { items: advantagesData, activeIndex: currentIndex, onSelect: goTo }
    : { items: advantagesData, activeIndex: -1, onSelect: () => { } };

  return (
    <div className="app-shell">
      <Menu {...menuProps} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              activeIndex={currentIndex}
              visibleIndex={visibleIndex}
              prevIndex={prevIndex}
              isTransitioning={isTransitioning}
              onNext={next}
              onPrev={prev}
              onGoTo={goTo}
            />
          }
        />
        <Route path="/booking" element={<Booking />}>
          <Route index element={<Navigate to="location" replace />} />
          <Route path="location" element={<LocationStep />} />
          {/* <Route path="model" element={<ModelStep />} /> */}
        </Route>
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;