import './LinkButton.scss';
import { NavLink } from 'react-router-dom';
import { getPath } from '@/router/routes';
import clsx from 'clsx';
import type { ButtonNavLink } from '@/constants/navConfig';
import { forwardRef, useState } from 'react';

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
      onAnimationEnd?: React.AnimationEventHandler<HTMLButtonElement>;
      type?: ButtonTypes;
      variant?: ButtonVariants;
      customClass?: string;
      ariaLabel?: string;
      ariaExpanded?: boolean;
      ariaHaspopup?: React.AriaAttributes['aria-haspopup'];
    };

const LinkButton = forwardRef<HTMLButtonElement | HTMLAnchorElement, LinkButtonProps>(
  (props, ref) => {
    const [isPressed, setIsPressed] = useState(false);

    const handlePress = () => {
      setIsPressed(false);

      requestAnimationFrame(() => {
        setIsPressed(true);
      });
    };

    const handleAnimationEnd = (
      event: React.AnimationEvent<HTMLButtonElement | HTMLAnchorElement>
    ) => {
      if (event.animationName !== 'button-press') return;

      setIsPressed(false);
    };

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
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={path}
          rel="noopener noreferrer"
          aria-label={ariaLabel}
          target={target}
          className={clsx('link', customClass, isPressed && 'is-pressed')}
          onClick={handlePress}
          onAnimationEnd={handleAnimationEnd}
        >
          {children}
        </a>
      ) : (
        <NavLink
          ref={ref as React.Ref<HTMLAnchorElement>}
          to={path}
          end={path === '/'}
          className={({ isActive }) =>
            clsx('link', customClass, isActive && 'is-active', isPressed && 'is-pressed')
          }
          // target={target}
          aria-label={ariaLabel}
          onClick={handlePress}
          onAnimationEnd={handleAnimationEnd}
        >
          {children}
        </NavLink>
      );
    } else {
      const {
        children,
        onClick,
        onAnimationEnd,
        type,
        variant,
        customClass,
        ariaLabel,
        ariaExpanded,
        ariaHaspopup,
      } = props;
      return (
        <button
          ref={ref as React.Ref<HTMLButtonElement>}
          className={clsx(
            'button',
            customClass,
            variant && `button--${variant}`,
            isPressed && 'is-pressed'
          )}
          type={type ?? 'button'}
          onClick={() => {
            handlePress();
            onClick?.();
          }}
          onAnimationEnd={event => {
            handleAnimationEnd(event);
            onAnimationEnd?.(event);
          }}
          aria-label={ariaLabel}
          aria-expanded={ariaExpanded}
          aria-haspopup={ariaHaspopup}
        >
          {children}
        </button>
      );
    }
  }
);

export default LinkButton;
