import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import logoImg from '@/assets/icons/logo.png';
import './AuthLayout.scss';

interface AuthLayoutProps {
    title: string;
    children: ReactNode;
}

export const AuthLayout = ({ title, children }: AuthLayoutProps) => (
    <main className="auth">
        <Link to="/" className="auth__logo" aria-label="На главную">
            <span className="auth__logo-mark" aria-hidden="true">
                <img src={logoImg} alt="" />
            </span>
            <span className="auth__logo-text">Need for drive</span>
        </Link>

        <section className="auth__card">
            <h1 className="auth__title">{title}</h1>
            {children}
        </section>
    </main>
);
