import type { ReactNode } from 'react';
import './Checkbox.scss';

interface CheckboxProps {
    checked: boolean;
    label: ReactNode;
    /** Если не передан — чекбокс работает в режиме «только отображение». */
    onChange?: (checked: boolean) => void;
    disabled?: boolean;
    className?: string;
}

export const Checkbox = ({ checked, label, onChange, disabled = false, className = '' }: CheckboxProps) => {
    const isInteractive = Boolean(onChange) && !disabled;

    return (
        <label
            className={[
                'checkbox',
                checked ? 'checkbox--checked' : '',
                isInteractive ? '' : 'checkbox--static',
                className,
            ].filter(Boolean).join(' ')}
        >
            <input
                className="checkbox__input"
                type="checkbox"
                checked={checked}
                disabled={disabled}
                readOnly={!onChange}
                onChange={(e) => onChange?.(e.target.checked)}
            />
            <span className="checkbox__box" aria-hidden="true">
                {checked && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                )}
            </span>
            <span className="checkbox__label">{label}</span>
        </label>
    );
};
