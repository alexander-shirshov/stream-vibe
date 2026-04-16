import './Logo.scss';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageProvider';
import IconLogo from '@/assets/icons/logo.svg?react';
import clsx from 'clsx';

type LogoProps = {
  customClass?: string;
};

export default function Logo({ customClass }: LogoProps) {
  const { t } = useLanguage();
  return (
    <Link
      to="/"
      className={clsx('logo', customClass)}
      aria-label={t('header.logoTitle')}
      title={t('header.logoTitle')}
    >
      <IconLogo className="logo__image" />
    </Link>
  );
}
