import './Hero.scss';
import PlayHero from '@/assets/icons/playHero.svg?react';
import Play from '@/assets/icons/play.svg?react';
import { useLanguage } from '@/i18n/LanguageProvider';
import LinkButton from '@/components/Button';

export function Hero() {
  const titelId = 'hero-title';

  const { t } = useLanguage();

  return (
    <section className="hero" aria-labelledby={titelId}>
      <div className="hero__pano">
        <div className="hero__pano-inner container">
          <button className="hero__play-button" type="button" aria-label="" title="">
            <PlayHero className="hero__play-icon" />
          </button>
        </div>
      </div>
      <div className="hero__body">
        <div className="hero__body-inner container">
          <h1 className="hero__title" id={titelId}>
            {t('hero.title')}
          </h1>
          <div className="hero__description">
            <p>{t('hero.descr')}</p>
          </div>
          <LinkButton mode="button">
            <div className="hero__cta">
              <Play />
              <p>{t('hero.cta')}</p>
            </div>
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
