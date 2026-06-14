import { useState } from 'react';
import { MAX_FIELD_LENGTH } from '../model/validation';
import './AuthField.scss';

interface AuthFieldProps {
    id: string;
    label: string;
    value: string;
    type?: 'text' | 'email' | 'password';
    placeholder?: string;
    autoComplete?: string;
    error?: string | null;
    onChange: (value: string) => void;
    onBlur?: () => void;
}

export const AuthField = ({
    id,
    label,
    value,
    type = 'text',
    placeholder,
    autoComplete,
    error,
    onChange,
    onBlur,
}: AuthFieldProps) => {
    const isPassword = type === 'password';
    const [isRevealed, setIsRevealed] = useState(false);

    const inputType = isPassword ? (isRevealed ? 'text' : 'password') : type;
    const hasError = Boolean(error);

    return (
        <div className="auth-field">
            <label className="auth-field__label" htmlFor={id}>
                {label}
            </label>

            <div className="auth-field__wrapper">
                <input
                    id={id}
                    className={[
                        'auth-field__input',
                        isPassword ? 'auth-field__input--password' : '',
                        hasError ? 'auth-field__input--error' : '',
                    ].join(' ').trim()}
                    type={inputType}
                    value={value}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    maxLength={MAX_FIELD_LENGTH}
                    aria-invalid={hasError}
                    aria-describedby={hasError ? `${id}-error` : undefined}
                    onChange={(e) => onChange(e.target.value)}
                    onBlur={onBlur}
                />

                {isPassword && (
                    <button
                        type="button"
                        className="auth-field__toggle"
                        onClick={() => setIsRevealed((prev) => !prev)}
                        aria-label={isRevealed ? 'Скрыть пароль' : 'Показать пароль'}
                        aria-pressed={isRevealed}
                        tabIndex={-1}
                    >
                        {isRevealed ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                )}
            </div>

            {hasError && (
                <p className="auth-field__error" id={`${id}-error`} role="alert">
                    {error}
                </p>
            )}
        </div>
    );
};

const EyeIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
            d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
    </svg>
);

const EyeOffIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
            d="M3 3l18 18M10.6 10.6a3 3 0 0 0 4.2 4.2M9.4 5.2A9.7 9.7 0 0 1 12 5c6.4 0 10 7 10 7a18 18 0 0 1-3.3 4M6.1 6.1A18 18 0 0 0 2 12s3.6 7 10 7a9.7 9.7 0 0 0 3-.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
