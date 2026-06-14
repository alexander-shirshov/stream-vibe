import clsx from 'clsx';
import './SliderNavigation.scss';
import LinkButton from '@/components/Button';
import Arrow from '@/assets/icons/arrow-right.svg?react';
import { useLanguage } from '@/i18n/LanguageProvider';
import { useState } from 'react';

type SliderButtonVariant = 'default' | 'round';
type ClickedButton = 'prev' | 'next' | null;

type SliderNavigationProps = {
  prevRef: React.RefObject<HTMLButtonElement | null>;
  nextRef: React.RefObject<HTMLButtonElement | null>;
  paginationRef?: React.RefObject<HTMLDivElement | null>;
  className?: string;
  id?: string;
  hasPagination?: boolean;
  variant?: SliderButtonVariant;
};

export default function SliderNavigation({
  prevRef,
  nextRef,
  className,
  id,
  hasPagination,
  paginationRef,
  variant,
}: SliderNavigationProps) {
  const { t } = useLanguage();
  const [clickedButton, setClickedButton] = useState<ClickedButton>(null);

  const handleClick = (button: Exclude<ClickedButton, null>) => {
    setClickedButton(null);

    requestAnimationFrame(() => {
      setClickedButton(button);
    });
  };

  return (
    <div
      className={clsx(
        'slider-navigation',
        className,
        variant === 'round' && `slider-navigation--${variant}`
      )}
      id={id}
    >
      <LinkButton
        mode="button"
        ref={prevRef}
        customClass={clsx(
          'slider-navigation__arrow-button slider-navigation__arrow-button--prev',
          clickedButton === 'prev' && 'is-clicked',
          variant === 'round' ? 'button--black-08' : 'button--black-10'
        )}
        ariaLabel={t('slider.prevButton')}
        onClick={() => handleClick('prev')}
        onAnimationEnd={() => setClickedButton(null)}
      >
        <Arrow className="slider-navigation__icon" />
      </LinkButton>
      {hasPagination && <div ref={paginationRef} className="slider-navigation__pagination" />}
      <LinkButton
        ref={nextRef}
        mode="button"
        customClass={clsx(
          'slider-navigation__arrow-button slider-navigation__arrow-button--next',
          clickedButton === 'next' && 'is-clicked',
          variant === 'round' ? 'button--black-08' : 'button--black-10'
        )}
        ariaLabel={t('slider.nextButton')}
        onClick={() => handleClick('next')}
        onAnimationEnd={() => setClickedButton(null)}
      >
        <Arrow className="slider-navigation__icon" />
      </LinkButton>
    </div>
  );
}
