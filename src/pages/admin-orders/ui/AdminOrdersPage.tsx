import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEscape } from '@/shared/hooks/useEscape';
import logoImg from '@/assets/icons/logo.png';
import carImg from '@/assets/images/cars/car-2.png';
import './AdminOrdersPage.scss';

// ── Sidebar icons ──────────────────────────────────────────────────────────────
const IconPencil = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
);
const IconGrid = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
);
const IconOrders = () => (
    <svg width="18" height="18" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path fillRule="evenodd" clipRule="evenodd" d="M7 1H3C2.45 1 2.005 1.45 2.005 2L2 10C2 10.55 2.445 11 2.995 11H9C9.55 11 10 10.55 10 10V4L7 1ZM8 8H6.5V9.5H5.5V8H4V7H5.5V5.5H6.5V7H8V8ZM6.5 1.75V4.5H9.25L6.5 1.75Z" fill="currentColor" />
    </svg>
);
const IconUser = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
);
const IconCircle = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <circle cx="12" cy="12" r="8" />
    </svg>
);

// ── Header icons ───────────────────────────────────────────────────────────────
const IconSearch = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
);
const IconBell = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
);
const IconChevronDown = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="6 9 12 15 18 9" />
    </svg>
);
const IconLogout = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
);

// ── Order card action icons ────────────────────────────────────────────────────
const IconCheck = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="20 6 9 17 4 12" />
    </svg>
);
const IconX = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);
const IconDots = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <circle cx="12" cy="5" r="1.6" />
        <circle cx="12" cy="12" r="1.6" />
        <circle cx="12" cy="19" r="1.6" />
    </svg>
);

// ── Data ───────────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
    { label: 'Карточка автомобиля', icon: <IconPencil /> },
    { label: 'Список авто',         icon: <IconGrid /> },
    { label: 'Заказы',              icon: <IconOrders />, active: true },
    { label: 'Menu 4',              icon: <IconUser /> },
    { label: 'Menu 5',              icon: <IconUser /> },
    { label: 'Menu 6',              icon: <IconUser /> },
    { label: 'Menu 7',              icon: <IconCircle /> },
];

const MOCK_ORDER = {
    car: 'ELANTRA',
    city: 'Ульяновск',
    address: 'Нариманова 42',
    dateFrom: '12.06.2019 12:00',
    dateTo: '13.06.2019 12:00',
    color: 'Голубой',
    services: [
        { label: 'Полный бак',     checked: true },
        { label: 'Детское кресло', checked: false },
        { label: 'Правый руль',    checked: false },
    ],
    price: '4 300 ₽',
};

const PAGINATION = ['«', '1', '...', '4', '5', '6', '...', '31', '»'];
const ACTIVE_PAGE = '5';

// ── Component ──────────────────────────────────────────────────────────────────
export const AdminOrdersPage = () => {
    const navigate = useNavigate();
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const userMenuRef = useRef<HTMLDivElement>(null);

    useEscape(() => setIsUserMenuOpen(false), isUserMenuOpen);

    useEffect(() => {
        if (!isUserMenuOpen) return;

        const handleClickOutside = (e: MouseEvent) => {
            if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
                setIsUserMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isUserMenuOpen]);

    const handleLogout = () => {
        setIsUserMenuOpen(false);
        navigate('/login');
    };

    return (
    <div className="admin">

        {/* ── Sidebar ── */}
        <aside className="admin-sidebar">
            <div className="admin-sidebar__logo">
                <img src={logoImg} alt="" className="admin-sidebar__logo-img" />
                <span className="admin-sidebar__logo-text">Need for car</span>
            </div>

            <nav className="admin-sidebar__nav" aria-label="Навигация">
                {NAV_ITEMS.map((item) => (
                    <a
                        key={item.label}
                        href="#"
                        className={[
                            'admin-sidebar__nav-item',
                            item.active ? 'admin-sidebar__nav-item--active' : '',
                        ].filter(Boolean).join(' ')}
                        onClick={(e) => e.preventDefault()}
                    >
                        <span className="admin-sidebar__nav-icon">{item.icon}</span>
                        {item.label}
                    </a>
                ))}
            </nav>
        </aside>

        {/* ── Main area ── */}
        <div className="admin-main">

            {/* Header */}
            <header className="admin-header">
                <div className="admin-header__search">
                    <IconSearch />
                    <input
                        className="admin-header__search-input"
                        placeholder="Поиск ..."
                        readOnly
                    />
                </div>

                <div className="admin-header__user">
                    <button type="button" className="admin-header__bell" aria-label="Уведомления">
                        <IconBell />
                        <span className="admin-header__badge">2</span>
                    </button>

                    <div className="admin-header__dropdown" ref={userMenuRef}>
                        <button
                            type="button"
                            className="admin-header__user-toggle"
                            onClick={() => setIsUserMenuOpen((prev) => !prev)}
                            aria-haspopup="true"
                            aria-expanded={isUserMenuOpen}
                        >
                            <span className="admin-header__avatar" aria-hidden="true" />
                            <span className="admin-header__username">Admin</span>
                            <span
                                className={[
                                    'admin-header__chevron',
                                    isUserMenuOpen ? 'admin-header__chevron--open' : '',
                                ].filter(Boolean).join(' ')}
                            >
                                <IconChevronDown />
                            </span>
                        </button>

                        {isUserMenuOpen && (
                            <div className="admin-header__menu" role="menu">
                                <button
                                    type="button"
                                    className="admin-header__menu-item"
                                    role="menuitem"
                                    onClick={handleLogout}
                                >
                                    <IconLogout /> Выход
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* Content */}
            <main className="admin-content">
                <h1 className="admin-content__title">Заказы</h1>

                {/* Filters */}
                <div className="orders-filters">
                    <select className="orders-filters__select" defaultValue="week">
                        <option value="week">За неделю</option>
                    </select>
                    <select className="orders-filters__select" defaultValue="elantra">
                        <option value="elantra">Elantra</option>
                    </select>
                    <select className="orders-filters__select" defaultValue="ulyanovsk">
                        <option value="ulyanovsk">Ульяновск</option>
                    </select>
                    <select className="orders-filters__select" defaultValue="inprogress">
                        <option value="inprogress">В процессе</option>
                    </select>
                    <button type="button" className="orders-filters__apply">
                        Применить
                    </button>
                </div>

                {/* Orders list */}
                <div className="orders-list">
                    <article className="order-card">
                        <img
                            className="order-card__image"
                            src={carImg}
                            alt={MOCK_ORDER.car}
                        />

                        <div className="order-card__info">
                            <p className="order-card__title">
                                <strong>{MOCK_ORDER.car}</strong>
                                {' '}в {MOCK_ORDER.city}, {MOCK_ORDER.address}
                            </p>
                            <p className="order-card__dates">
                                {MOCK_ORDER.dateFrom} — {MOCK_ORDER.dateTo}
                            </p>
                            <p className="order-card__color">
                                Цвет: <span className="order-card__color-value">{MOCK_ORDER.color}</span>
                            </p>
                        </div>

                        <div className="order-card__services">
                            {MOCK_ORDER.services.map((s) => (
                                <span
                                    key={s.label}
                                    className={[
                                        'order-card__service',
                                        s.checked ? 'order-card__service--checked' : '',
                                    ].filter(Boolean).join(' ')}
                                >
                                    <span className="order-card__service-box">
                                        {s.checked && (
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                        )}
                                    </span>
                                    <span className="order-card__service-label">{s.label}</span>
                                </span>
                            ))}
                        </div>

                        <p className="order-card__price">{MOCK_ORDER.price}</p>

                        <div className="order-card__actions">
                            <button type="button" className="order-card__btn">
                                <span className="order-card__btn-icon order-card__btn-icon--success">
                                    <IconCheck />
                                </span>
                                Готово
                            </button>
                            <button type="button" className="order-card__btn">
                                <span className="order-card__btn-icon order-card__btn-icon--danger">
                                    <IconX />
                                </span>
                                Отмена
                            </button>
                            <button type="button" className="order-card__btn">
                                <span className="order-card__btn-icon">
                                    <IconDots />
                                </span>
                                Изменить
                            </button>
                        </div>
                    </article>
                </div>

                {/* Pagination */}
                <nav className="admin-pagination" aria-label="Пагинация">
                    {PAGINATION.map((page, i) =>
                        page === '...' ? (
                            <span key={i} className="admin-pagination__dots">...</span>
                        ) : (
                            <button
                                key={i}
                                type="button"
                                className={[
                                    'admin-pagination__btn',
                                    page === ACTIVE_PAGE ? 'admin-pagination__btn--active' : '',
                                ].filter(Boolean).join(' ')}
                                onClick={(e) => e.preventDefault()}
                            >
                                {page}
                            </button>
                        )
                    )}
                </nav>
            </main>

            {/* Footer */}
            <footer className="admin-footer">
                <div className="admin-footer__links">
                    <a href="#" onClick={(e) => e.preventDefault()}>Главная страница</a>
                    <a href="#" onClick={(e) => e.preventDefault()}>Ссылка</a>
                </div>
                <p className="admin-footer__copy">Copyright © 2020 Simbirsoft</p>
            </footer>
        </div>
    </div>
    );
};
