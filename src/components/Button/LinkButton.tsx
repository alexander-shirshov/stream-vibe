import './LinkButton.scss';
import { NavLink } from 'react-router-dom';
import { getPath } from '@/router/routes';
import clsx from 'clsx';
import type { ButtonNavLink } from '@/constants/navConfig';

type ButtonTypes = 'button' | 'submit' | 'reset';
type ButtonVariants = 'primary' | 'secondary' | 'danger' | 'transparent';

type LinkButtonProps =
  | {
      mode: 'link';
      link: ButtonNavLink;
      target?: React.HTMLAttributeAnchorTarget | undefined;
      customClass?: string;
      children: React.ReactNode;
      ariaLabel?: string;
    }
  | {
      mode: 'button';
      link?: never;
      target?: never;
      children: React.ReactNode;
      onClick?: () => void;
      type?: ButtonTypes;
      variant?: ButtonVariants;
      customClass?: string;
      ariaLabel?: string;
    };

export default function LinkButton(props: LinkButtonProps) {
  if (props.mode === 'link') {
    const { link, children, target, customClass, ariaLabel } = props;
    let path: string;
    if ('href' in link) {
      path = link['href'];
    } else if ('params' in link) {
      path = getPath(link.route, link.params);
    } else {
      path = getPath(link.route);
    }

    return 'href' in link ? (
      <a
        href={path}
        rel="noopener noreferrer"
        aria-label={ariaLabel}
        target={target}
        className={clsx('link', customClass)}
      >
        {children}
      </a>
    ) : (
      <NavLink
        to={path}
        end={path === '/'}
        className={({ isActive }) => clsx('link', customClass, isActive && 'is-active')}
        // target={target}
        aria-label={ariaLabel}
      >
        {children}
      </NavLink>
    );
  } else {
    const { children, onClick, type, variant, customClass, ariaLabel } = props;
    return (
      <button
        className={clsx('button', customClass, variant && `button--${variant}`)}
        type={type ?? 'button'}
        onClick={onClick}
        aria-label={ariaLabel}
      >
        {children}
      </button>
    );
  }
}
