import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import './AuthLayout.scss';

interface AuthLayoutProps {
    title: string;
    children: ReactNode;
}

export const AuthLayout = ({ title, children }: AuthLayoutProps) => (
    <main className="auth">
        <Link to="/" className="auth__logo" aria-label="На главную">
            <span className="auth__logo-mark" aria-hidden="true">
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="24" cy="24" r="24" fill="#0EC261" />
                    <path
                        d="M16 32c0-6 4-12 12-14-2 6-6 10-12 14Z"
                        fill="#fff"
                    />
                    <circle cx="19" cy="29" r="4" fill="#0EC261" />
                </svg>
            </span>
            <span className="auth__logo-text">Need for drive</span>
        </Link>

        <section className="auth__card">
            <h1 className="auth__title">{title}</h1>
            {children}
        </section>
    </main>
);
