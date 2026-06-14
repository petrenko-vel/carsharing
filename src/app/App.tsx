import type { ReactNode } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Home } from '@/pages/home';
import { Booking } from '@/pages/booking';
import { useBookingStore, type BookingStepSlug } from '@/pages/booking/model/bookingStore';
import { LocationStep } from '@/features/location-step';
import { ModelStep } from '@/features/model-step';
import { ExtraStep } from '@/features/extra-step';
import { SummaryStep } from '@/features/summary-step';
import { OrderPage } from '@/pages/order';
import { LoginPage } from '@/pages/login';
import { AdminOrdersPage } from '@/pages/admin-orders';
import { Menu } from '@/widgets/menu';
import { useSlider } from '@/widgets/advantages-slider/model/useSlider';
import { useFadeAnimation } from '@/widgets/advantages-slider/model/useFadeAnimation';
import { advantagesData } from '@/widgets/advantages-slider/model/slides.mock';

const STEP_SLUGS: BookingStepSlug[] = ['location', 'model', 'extra', 'summary'];

const BookingStepGuard = ({ slug, children }: { slug: BookingStepSlug; children: ReactNode }) => {
  const { isStepValid } = useBookingStore();
  const stepIndex = STEP_SLUGS.indexOf(slug);

  const isAccessible = stepIndex === 0 || STEP_SLUGS.slice(0, stepIndex).every((s) => isStepValid(s));

  if (!isAccessible) {
    const firstIncomplete = STEP_SLUGS.find((s) => !isStepValid(s)) ?? 'location';
    return <Navigate to={`/booking/${firstIncomplete}`} replace />;
  }

  return <>{children}</>;
};

function AppLayout() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isAuth = location.pathname === '/login';
  const isAdmin = location.pathname.startsWith('/admin');

  const { currentIndex, next, prev, goTo } = useSlider(advantagesData.length);
  const { visibleIndex, prevIndex, isTransitioning } = useFadeAnimation(currentIndex);

  const menuProps = isHome
    ? { items: advantagesData, activeIndex: currentIndex, onSelect: goTo }
    : { items: advantagesData, activeIndex: -1, onSelect: () => { } };

  return (
    <div className="app-shell">
      {!isAuth && !isAdmin && <Menu {...menuProps} />}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin/orders" element={<AdminOrdersPage />} />
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
          <Route path="location" element={<BookingStepGuard slug="location"><LocationStep /></BookingStepGuard>} />
          <Route path="model" element={<BookingStepGuard slug="model"><ModelStep /></BookingStepGuard>} />
          <Route path="extra" element={<BookingStepGuard slug="extra"><ExtraStep /></BookingStepGuard>} />
          <Route path="summary" element={<BookingStepGuard slug="summary"><SummaryStep /></BookingStepGuard>} />
          <Route path="order/:orderId" element={<OrderPage />} />
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
