import './LinkButton.scss';
import { type LinkKey, linkItems } from '@/constants/linkItems';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

type ButtonTypes = 'button' | 'submit' | 'reset';
type ButtonVariants = 'primary' | 'secondary' | 'danger' | 'transparent';

type LinkButtonProps =
  | {
      //link mode
      linkKey: LinkKey;
      target?: React.HTMLAttributeAnchorTarget | undefined;
      customClass?: string;
      children: React.ReactNode;
      ariaLabel?: string;
    }
  | {
      //btn mode
      linkKey?: never;
      target?: never;
      children: React.ReactNode;
      onClick?: () => void;
      type?: ButtonTypes;
      variant?: ButtonVariants;
      customClass?: string;
      ariaLabel?: string;
    };

export default function LinkButton(props: LinkButtonProps) {
  if (props.linkKey) {
    const { linkKey, children, target, customClass, ariaLabel } = props;
    const path = linkItems[linkKey].path;
    return (
      <NavLink
        to={path}
        end={path === '/'}
        className={({ isActive }) => clsx('link', customClass, isActive && 'is-active')}
        target={target}
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
