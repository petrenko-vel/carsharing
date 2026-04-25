import { useEffect, useCallback } from 'react';

export function useEscape(handler: () => void, active: boolean = true) {
    const stableHandler = useCallback(() => {
        handler();
    }, [handler]);

    useEffect(() => {
        if (!active) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' || e.key === 'Esc') {
                stableHandler();
            }
        };
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [stableHandler, active]);
}