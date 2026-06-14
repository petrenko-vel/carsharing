import { useState, useRef, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEscape } from '@/shared/hooks/useEscape';
import { getAllOrders, type StoredOrder } from '@/pages/order/model/orderService';
import { EXTRA_SERVICES } from '@/features/extra-step/model/extraOptions.mock';
import { CarPlaceholder } from '@/shared/ui/CarPlaceholder';
import { Checkbox } from '@/shared/ui/Checkbox';
import logoImg from '@/assets/icons/logo.png';
import './AdminOrdersPage.scss';

// Формат даты заказа: "12.06.2019 12:00"
const formatOrderDate = (iso: string | null): string =>
    iso
        ? new Date(iso)
            .toLocaleString('ru-RU', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            })
            .replace(',', '')
        : '—';

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
const IconBurger = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="18" x2="21" y2="18" />
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
    { label: 'Список авто', icon: <IconGrid /> },
    { label: 'Заказы', icon: <IconOrders />, active: true },
];

const PAGINATION = ['«', '1', '...', '4', '5', '6', '...', '31', '»'];
const ACTIVE_PAGE = '5';

// ── Filters ────────────────────────────────────────────────────────────────────
const ALL = 'all';

interface Filters {
    period: string;
    model: string;
    city: string;
    status: string;
}

const DEFAULT_FILTERS: Filters = { period: ALL, model: ALL, city: ALL, status: ALL };

const hasActiveFilters = (f: Filters): boolean =>
    Object.values(f).some((value) => value !== ALL);

const filterOrders = (orders: StoredOrder[], f: Filters): StoredOrder[] =>
    orders.filter((order) => {
        if (f.model !== ALL && order.car.name !== f.model) return false;
        if (f.city !== ALL && order.city !== f.city) return false;
        if (f.period === 'week') {
            const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
            if (new Date(order.createdAt).getTime() < weekAgo) return false;
        }
        // Все сохранённые заказы считаются «в процессе» — статус не отсекает их
        return true;
    });

// ── Order card ─────────────────────────────────────────────────────────────────
const OrderCard = ({ order }: { order: StoredOrder }) => {
    const [imgFailed, setImgFailed] = useState(!order.car.imageUrl);

    const location = [order.city, order.point].filter(Boolean).join(', ');
    const dateRange = `${formatOrderDate(order.extra.dateFrom)} — ${formatOrderDate(order.extra.dateTo)}`;

    return (
        <article className="order-card">
            <div className="order-card__image-wrapper">
                {imgFailed ? (
                    <CarPlaceholder className="order-card__placeholder" />
                ) : (
                    <img
                        className="order-card__image"
                        src={order.car.imageUrl}
                        alt={order.car.name}
                        onError={() => setImgFailed(true)}
                    />
                )}
            </div>

            <div className="order-card__info">
                <p className="order-card__title">
                    <strong>{order.car.name}</strong>
                    {location && <> в {location}</>}
                </p>
                <p className="order-card__dates">{dateRange}</p>
                {order.extra.colorLabel && (
                    <p className="order-card__color">
                        Цвет: <span className="order-card__color-value">{order.extra.colorLabel}</span>
                    </p>
                )}
            </div>

            <div className="order-card__services">
                {EXTRA_SERVICES.map((service) => (
                    <Checkbox
                        key={service.id}
                        checked={order.extra.services.includes(service.id)}
                        label={service.label}
                    />
                ))}
            </div>

            <p className="order-card__price">{order.totalPrice || '—'}</p>

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
    );
};

// ── Component ──────────────────────────────────────────────────────────────────
export const AdminOrdersPage = () => {
    const navigate = useNavigate();
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const userMenuRef = useRef<HTMLDivElement>(null);
    const [orders] = useState<StoredOrder[]>(() => getAllOrders());

    // Черновик фильтров (в селектах) и применённые фильтры (к списку)
    const [draftFilters, setDraftFilters] = useState<Filters>(DEFAULT_FILTERS);
    const [appliedFilters, setAppliedFilters] = useState<Filters>(DEFAULT_FILTERS);

    // Уникальные модели и города для опций
    const modelOptions = useMemo(
        () => [...new Set(orders.map((o) => o.car.name))],
        [orders],
    );
    const cityOptions = useMemo(
        () => [...new Set(orders.map((o) => o.city).filter(Boolean))],
        [orders],
    );

    const visibleOrders = useMemo(
        () => filterOrders(orders, appliedFilters),
        [orders, appliedFilters],
    );

    const showReset = hasActiveFilters(draftFilters) || hasActiveFilters(appliedFilters);

    const setFilter = (key: keyof Filters, value: string) =>
        setDraftFilters((prev) => ({ ...prev, [key]: value }));

    const handleApplyFilters = () => setAppliedFilters(draftFilters);

    const handleResetFilters = () => {
        setDraftFilters(DEFAULT_FILTERS);
        setAppliedFilters(DEFAULT_FILTERS);
    };

    useEscape(() => setIsUserMenuOpen(false), isUserMenuOpen);
    useEscape(() => setIsSidebarOpen(false), isSidebarOpen);

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
            {isSidebarOpen && (
                <div
                    className="admin-sidebar-overlay"
                    onClick={() => setIsSidebarOpen(false)}
                    aria-hidden="true"
                />
            )}
            <aside
                className={[
                    'admin-sidebar',
                    isSidebarOpen ? 'admin-sidebar--open' : '',
                ].filter(Boolean).join(' ')}
            >
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
                            onClick={(e) => {
                                e.preventDefault();
                                setIsSidebarOpen(false);
                            }}
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
                    <button
                        type="button"
                        className="admin-header__burger"
                        onClick={() => setIsSidebarOpen(true)}
                        aria-label="Открыть меню"
                    >
                        <IconBurger />
                    </button>

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
                        <select
                            className="orders-filters__select"
                            value={draftFilters.period}
                            onChange={(e) => setFilter('period', e.target.value)}
                        >
                            <option value={ALL}>За всё время</option>
                            <option value="week">За неделю</option>
                        </select>
                        <select
                            className="orders-filters__select"
                            value={draftFilters.model}
                            onChange={(e) => setFilter('model', e.target.value)}
                        >
                            <option value={ALL}>Все модели</option>
                            {modelOptions.map((model) => (
                                <option key={model} value={model}>{model}</option>
                            ))}
                        </select>
                        <select
                            className="orders-filters__select"
                            value={draftFilters.city}
                            onChange={(e) => setFilter('city', e.target.value)}
                        >
                            <option value={ALL}>Все города</option>
                            {cityOptions.map((city) => (
                                <option key={city} value={city}>{city}</option>
                            ))}
                        </select>
                        <select
                            className="orders-filters__select"
                            value={draftFilters.status}
                            onChange={(e) => setFilter('status', e.target.value)}
                        >
                            <option value={ALL}>Все статусы</option>
                            <option value="inprogress">В процессе</option>
                        </select>

                        <div className="orders-filters__actions">
                            {showReset && (
                                <button
                                    type="button"
                                    className="orders-filters__reset"
                                    onClick={handleResetFilters}
                                >
                                    Отменить
                                </button>
                            )}
                            <button
                                type="button"
                                className="orders-filters__apply"
                                onClick={handleApplyFilters}
                            >
                                Применить
                            </button>
                        </div>
                    </div>

                    {/* Orders list */}
                    {visibleOrders.length > 0 ? (
                        <div className="orders-list">
                            {visibleOrders.map((order) => (
                                <OrderCard key={order.id} order={order} />
                            ))}
                        </div>
                    ) : (
                        <div className="orders-empty">
                            {orders.length === 0
                                ? 'Заказов пока нет. Оформите заказ через бронирование — он появится здесь.'
                                : 'По выбранным фильтрам ничего не найдено.'}
                        </div>
                    )}

                    {/* Pagination */}
                    {visibleOrders.length > 0 && (
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
                    )}
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
