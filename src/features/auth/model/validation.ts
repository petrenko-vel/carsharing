export const MAX_FIELD_LENGTH = 150;

/**
 * Валидация поля «Почта».
 * - не может быть пустым / состоять из пробелов;
 * - пробелы по краям отсекаются перед проверкой;
 * - должна быть корректным email (обязателен символ «@» и домен).
 */
export const validateEmail = (raw: string): string | null => {
    const value = raw.trim();

    if (!value) return 'Поле «Почта» не может быть пустым';
    if (value.length > MAX_FIELD_LENGTH) return `Не более ${MAX_FIELD_LENGTH} символов`;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
        return 'Введите корректный email, например name@mail.com';
    }

    return null;
};

/** Валидация поля «Пароль». */
export const validatePassword = (value: string): string | null => {
    if (!value) return 'Поле «Пароль» не может быть пустым';
    if (value.length > MAX_FIELD_LENGTH) return `Не более ${MAX_FIELD_LENGTH} символов`;
    return null;
};

/** Валидация поля «Подтвердите пароль». */
export const validateConfirmPassword = (
    password: string,
    confirm: string,
): string | null => {
    if (!confirm) return 'Подтвердите пароль';
    if (password !== confirm) return 'Пароли не совпадают';
    return null;
};
