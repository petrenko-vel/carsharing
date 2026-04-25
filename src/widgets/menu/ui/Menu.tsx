import { useState } from 'react';
import type { AdvantageSlide } from '@/entities/advantage/model/advantage-card.types';
import { useEscape } from '@/shared/hooks/useEscape';
import clsx from 'clsx';

import IconTelegram from '@/shared/ui/icons/IconTelegram';
import IconFacebook from '@/shared/ui/icons/IconFacebook';
import IconInstagram from '@/shared/ui/icons/IconInstagram';

import './Menu.scss';


type MenuProps = {
  items: AdvantageSlide[];
  activeIndex: number;
  onSelect: (index: number) => void;
};

const Menu = (props: MenuProps) => {
  const { items, activeIndex, onSelect } = props;

  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (index: number) => {
    onSelect(index);
    setIsOpen(false);
  };

  useEscape(() => setIsOpen(false), isOpen);

  return (
    <>
      <div className={clsx('menu', { 'is-open': isOpen })} role="navigation" aria-label="Главное меню">
        <button
          type="button"
          className="menu__toggle"
          onClick={() => setIsOpen((prevState) => !prevState)}
          aria-label={isOpen ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={isOpen}
        >
          <span />
          <span />
          <span />
        </button>

        <span className="menu__lang">Eng</span>
      </div>

      {isOpen && (
        <div className="menu-panel">
          <div className="menu-panel__left">
            <button
              type="button"
              className="menu-panel__close"
              onClick={() => setIsOpen(false)}
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
              <a href="htt" aria-label="Telegram">
                <IconTelegram className='menu-panel__icon' />
              </a>
              <a href="#" aria-label="Facebook">
                <IconFacebook className='menu-panel__icon' />
              </a>
              <a href="#" aria-label="Instagram">
                <IconInstagram className='menu-panel__icon' />
              </a>
            </div>
          </div>

          <button
            type="button"
            className="menu-panel__overlay"
            onClick={() => setIsOpen(false)}
            aria-label="Закрыть меню"
          />
        </div>
      )}
    </>
  );
};

export default Menu;
