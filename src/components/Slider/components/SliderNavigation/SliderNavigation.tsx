import clsx from 'clsx';
import './SliderNavigation.scss';
import LinkButton from '@/components/Button';
import Arrow from '@/assets/icons/arrow-right.svg?react';
import { useLanguage } from '@/i18n/LanguageProvider';

type SliderButtonVariant = 'default' | 'round';

type SliderNavigationProps = {
  className?: string;
  id?: string;
  hasPagination?: boolean;
  variant?: SliderButtonVariant;
};

export default function SliderNavigation({
  className,
  id,
  hasPagination,
  variant,
}: SliderNavigationProps) {
  const { t } = useLanguage();

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
        customClass="button--black-10 slider-navigation__arrow-button slider-navigation__arrow-button--prev"
        ariaLabel={t('slider.prevButton')}
      >
        <Arrow className="slider-navigation__icon" />
      </LinkButton>
      {hasPagination && <div className="slider-navigation__pagination" />}
      <LinkButton
        mode="button"
        customClass="button--black-10 slider-navigation__arrow-button slider-navigation__arrow-button--next"
        ariaLabel={t('slider.nextButton')}
      >
        <Arrow className="slider-navigation__icon" />
      </LinkButton>
    </div>
  );
}
