import { useEffect, useReducer, useRef } from 'react';

interface FadeState {
  visibleIndex: number;
  prevIndex: number | null;
  isTransitioning: boolean;
}

type FadeAction =
  | { type: 'START_TRANSITION'; nextIndex: number }
  | { type: 'END_TRANSITION' };

function fadeReducer(state: FadeState, action: FadeAction): FadeState {
  switch (action.type) {
    case 'START_TRANSITION':
      return {
        visibleIndex: action.nextIndex,
        prevIndex: state.visibleIndex,
        isTransitioning: true,
      };

    case 'END_TRANSITION':
      return {
        ...state,
        prevIndex: null,
        isTransitioning: false,
      };

    default:
      return state;
  }
}

export const useFadeAnimation = (activeIndex: number) => {
  const [state, dispatch] = useReducer(fadeReducer, {
    visibleIndex: activeIndex,
    prevIndex: null,
    isTransitioning: false,
  });

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Track last processed index via ref to avoid depending on state.visibleIndex —
  // including it in deps would cause the effect cleanup to cancel the END_TRANSITION
  // timeout whenever dispatch(START_TRANSITION) updates state.visibleIndex.
  const prevActiveIndex = useRef(activeIndex);

  useEffect(() => {
    if (activeIndex === prevActiveIndex.current) return;
    prevActiveIndex.current = activeIndex;

    dispatch({ type: 'START_TRANSITION', nextIndex: activeIndex });

    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      dispatch({ type: 'END_TRANSITION' });
      timeoutRef.current = null;
    }, 820);
  }, [activeIndex]);

  // Cleanup only on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    visibleIndex: state.visibleIndex,
    prevIndex: state.prevIndex,
    isTransitioning: state.isTransitioning,
  };
};
