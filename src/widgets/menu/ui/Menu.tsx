import { useState, useCallback } from 'react';
import type { AdvantageSlide } from '@/widgets/advantages-slider/model/advantage-card.types';
import { useEscape } from '@/shared/hooks/useEscape';
import clsx from 'clsx';

import { IconTelegram, IconFacebook, IconInstagram } from '@/shared/ui/icons';

import './Menu.scss';

type MenuProps = {
  items: AdvantageSlide[];
  activeIndex: number;
  onSelect: (index: number) => void;
};

export const Menu = (props: MenuProps) => {
  const { items, activeIndex, onSelect } = props;

  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = useCallback(
    (index: number) => {
      onSelect(index);
      setIsOpen(false);
    },
    [onSelect],
  );

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  useEscape(handleClose, isOpen);

  return (
    <>
      <aside
        className={clsx('menu', { 'is-open': isOpen })}
        role="navigation"
        aria-label="Главное меню"
      >
        <button
          type="button"
          className="menu__toggle"
          onClick={handleToggle}
          aria-label={isOpen ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={isOpen}
        >
          <span />
          <span />
          <span />
        </button>

        <span className="menu__lang">Eng</span>
      </aside>

      {isOpen && (
        <div className="menu-panel">
          <div className="menu-panel__left">
            <button
              type="button"
              className="menu-panel__close"
              onClick={handleClose}
              aria-label="Закрыть меню"
            >
              &#10005;
            </button>

            <nav className="menu-panel__nav" aria-label="Пункты меню">
              <ul className="menu-panel__list">
                {items.map((item, index) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      className={clsx('menu-panel__item', {
                        'is-active': index === activeIndex,
                      })}
                      onClick={() => handleSelect(index)}
                    >
                      {item.menuLabel}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="menu-panel__socials" aria-label="Социальные сети">
              <a href="#" aria-label="Telegram">
                <IconTelegram className="menu-panel__icon" />
              </a>
              <a href="#" aria-label="Facebook">
                <IconFacebook className="menu-panel__icon" />
              </a>
              <a href="#" aria-label="Instagram">
                <IconInstagram className="menu-panel__icon" />
              </a>
            </div>
          </div>

          <button
            type="button"
            className="menu-panel__overlay"
            onClick={handleClose}
            aria-label="Закрыть меню"
          />
        </div>
      )}
    </>
  );
};