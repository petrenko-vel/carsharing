import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/shared/ui/Button';
import {
    AuthLayout,
    AuthField,
    validateEmail,
    validatePassword,
    validateConfirmPassword,
} from '@/features/auth';

interface FormErrors {
    email?: string | null;
    password?: string | null;
    confirm?: string | null;
}

export const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [errors, setErrors] = useState<FormErrors>({});
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const nextErrors: FormErrors = {
            email: validateEmail(email),
            password: validatePassword(password),
            confirm: validateConfirmPassword(password, confirm),
        };

        setErrors(nextErrors);

        if (nextErrors.email || nextErrors.password || nextErrors.confirm) {
            setSubmitted(false);
            return;
        }

        const payload = { email: email.trim(), password };
        void payload;
        setSubmitted(true);
    };

    return (
        <AuthLayout title="Регистрация">
            <form className="auth__form" onSubmit={handleSubmit} noValidate>
                <div className="auth__fields">
                    <AuthField
                        id="reg-email"
                        label="Почта"
                        type="email"
                        placeholder="admin@example.com"
                        autoComplete="email"
                        value={email}
                        error={errors.email}
                        onChange={(v) => {
                            setEmail(v);
                            if (errors.email) setErrors((p) => ({ ...p, email: validateEmail(v) }));
                        }}
                        onBlur={() => setErrors((p) => ({ ...p, email: validateEmail(email) }))}
                    />

                    <AuthField
                        id="reg-password"
                        label="Пароль"
                        type="password"
                        placeholder="Придумайте пароль"
                        autoComplete="new-password"
                        value={password}
                        error={errors.password}
                        onChange={(v) => {
                            setPassword(v);
                            setErrors((p) => ({
                                ...p,
                                password: p.password ? validatePassword(v) : p.password,
                                confirm: p.confirm ? validateConfirmPassword(v, confirm) : p.confirm,
                            }));
                        }}
                        onBlur={() => setErrors((p) => ({ ...p, password: validatePassword(password) }))}
                    />

                    <AuthField
                        id="reg-confirm"
                        label="Подтвердите пароль"
                        type="password"
                        placeholder="Повторите пароль"
                        autoComplete="new-password"
                        value={confirm}
                        error={errors.confirm}
                        onChange={(v) => {
                            setConfirm(v);
                            if (errors.confirm) {
                                setErrors((p) => ({ ...p, confirm: validateConfirmPassword(password, v) }));
                            }
                        }}
                        onBlur={() =>
                            setErrors((p) => ({ ...p, confirm: validateConfirmPassword(password, confirm) }))
                        }
                    />
                </div>

                <div className="auth__footer">
                    <Link to="/login" className="auth__link">
                        Уже есть аккаунт? Войти
                    </Link>
                    <Button gradient="green" className="auth__submit">
                        Зарегистрироваться
                    </Button>
                </div>
            </form>

            {submitted && (
                <p className="auth__notice" role="status">
                    Регистрация прошла успешно!{' '}
                    <Link to="/login" className="auth__link">
                        Войти
                    </Link>
                </p>
            )}
        </AuthLayout>
    );
};
