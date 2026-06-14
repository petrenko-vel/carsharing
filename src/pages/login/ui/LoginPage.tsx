import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/shared/ui/Button';
import { AuthLayout, AuthField, validateEmail, validatePassword } from '@/features/auth';

export const LoginPage = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<{ email?: string | null; password?: string | null }>({});

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const emailError = validateEmail(email);
        const passwordError = validatePassword(password);

        setErrors({ email: emailError, password: passwordError });

        if (emailError || passwordError) return;

        const payload = { email: email.trim(), password };
        void payload;
        navigate('/admin/orders');
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
                    <a href="#" className="auth__link" onClick={(e) => e.preventDefault()}>
                        Запросить доступ
                    </a>
                    <Button gradient="primary" className="auth__submit">
                        Войти
                    </Button>
                </div>
            </form>
        </AuthLayout>
    );
};
