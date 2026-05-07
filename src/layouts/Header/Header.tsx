import Logo from '@/components/Logo/Logo';
import { headerNav } from '@/constants/navConfig';
import { getPath } from '@/router/routes';
import { NavLink } from 'react-router-dom';
import './Header.scss';
import clsx from 'clsx';
import SearchIcon from '@/assets/icons/lens.svg?react';
import NotificationIcon from '@/assets/icons/bell.svg?react';
import { useLocation } from 'react-router-dom';

import LangToggle from '@/components/LangToggle/LangToggle';

import { useLanguage } from '@/i18n/LanguageProvider';
import LinkButton from '@/components/Button';
import BurgerButton from '@/components/BurgerButton';
import { useState, useEffect } from 'react';

export default function Header() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const { t } = useLanguage();

  const [dialogState, setDialogState] = useState(false);

  const toggleDialog = () => {
    setDialogState(prev => !prev);
  };

  const handleMenuClick = (e: React.MouseEvent<HTMLUListElement>) => {
    const target = e.target as HTMLElement;

    if (target.closest('a')) {
      setDialogState(false);
    }
  };

  useEffect(() => {
    if (!dialogState) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setDialogState(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [dialogState]);

  useEffect(() => {
    if (dialogState) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [dialogState]);

  useEffect(() => {
    const desktopMediaQuery = window.matchMedia('(min-width: 1024px)');

    const closeMenuOnDesktop = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setDialogState(false);
      }
    };

    if (desktopMediaQuery.matches) {
      setDialogState(false);
    }

    desktopMediaQuery.addEventListener('change', closeMenuOnDesktop);

    return () => {
      desktopMediaQuery.removeEventListener('change', closeMenuOnDesktop);
    };
  }, []);

  return (
    <header className={clsx('header', isHome && 'header--fixed')}>
      <div className="header__inner container">
        <Logo />
        <dialog className="header__overlay-menu-dialog" open={dialogState}>
          <nav className="header__menu">
            <ul className="header__menu-list" onClick={handleMenuClick}>
              {headerNav.map(item => {
                const path = getPath(item.route);
                const isEnd = path === '/';
                return (
                  <li className="header__menu-item" key={item.labelKey}>
                    <NavLink
                      to={path}
                      end={isEnd}
                      className={({ isActive }) =>
                        clsx('header__menu-link', isActive && 'is-active')
                      }
                    >
                      {t(`link.${item.labelKey}`)}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="header__actions">
            <LangToggle />

            <LinkButton mode="button" variant="transparent" ariaLabel={t('headerActions.search')}>
              <SearchIcon className="icon button__icon" />
            </LinkButton>

            <LinkButton
              mode="button"
              variant="transparent"
              ariaLabel={t('headerActions.notifications')}
            >
              <NotificationIcon className="icon button__icon" />
            </LinkButton>
          </div>
        </dialog>
        <BurgerButton
          customClass={clsx('header__burger-button visible-tablet', dialogState && 'is-active')}
          onClick={toggleDialog}
          isExpanded={dialogState}
        />
      </div>
    </header>
  );
}
