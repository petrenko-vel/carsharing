import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/shared/ui/Button';
import { AuthLayout, AuthField, validateEmail, validatePassword } from '@/features/auth';

export const LoginPage = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<{ email?: string | null; password?: string | null }>({});
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const emailError = validateEmail(email);
        const passwordError = validatePassword(password);

        setErrors({ email: emailError, password: passwordError });

        if (emailError || passwordError) {
            setSubmitted(false);
            return;
        }

        // Отсекаем пробелы по краям перед «отправкой»
        const payload = { email: email.trim(), password };
        // Здесь был бы запрос на сервер
        void payload;
        setSubmitted(true);
    };

    return (
        <AuthLayout title="Вход">
            <form className="auth__form" onSubmit={handleSubmit} noValidate>
                <div className="auth__fields">
                    <AuthField
                        id="login-email"
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
                        id="login-password"
                        label="Пароль"
                        type="password"
                        placeholder="Введите пароль"
                        autoComplete="current-password"
                        value={password}
                        error={errors.password}
                        onChange={(v) => {
                            setPassword(v);
                            if (errors.password) setErrors((p) => ({ ...p, password: validatePassword(v) }));
                        }}
                        onBlur={() => setErrors((p) => ({ ...p, password: validatePassword(password) }))}
                    />
                </div>

                <div className="auth__footer">
                    <Link to="/register" className="auth__link">
                        Регистрация
                    </Link>
                    <Button gradient="green" className="auth__submit">
                        Войти
                    </Button>
                </div>
            </form>

            {submitted && (
                <p className="auth__notice" role="status">
                    Вход выполнен успешно!{' '}
                    <button
                        type="button"
                        className="auth__link"
                        onClick={() => navigate('/')}
                    >
                        На главную
                    </button>
                </p>
            )}
        </AuthLayout>
    );
};
