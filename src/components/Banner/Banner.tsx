import './Banner.scss';
import LinkButton from '@/components/Button';
import type { ButtonNavLink } from '@/constants/navConfig';
import { useLanguage } from '@/i18n/LanguageProvider';

type BannerProps = {
  titleId?: string;
};

const planLink: ButtonNavLink = { route: 'subscriptions' };

export default function Banner({ titleId = 'banner-title' }: BannerProps) {
  const { t } = useLanguage();

  return (
    <section className="banner container" aria-labelledby={titleId}>
      <div className="banner__inner">
        <div className="banner__body">
          <h2 className="banner__title" id={titleId}>
            {t('banner.title')}
          </h2>
          <div className="banner__description">
            <p>{t('banner.description')}</p>
          </div>
        </div>
        <LinkButton mode="link" link={planLink} customClass="button banner__button">
          {t('banner.cta')}
        </LinkButton>
      </div>
    </section>
  );
}
