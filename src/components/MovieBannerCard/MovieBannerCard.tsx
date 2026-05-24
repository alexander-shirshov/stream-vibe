import './MovieBannerCard.scss';
import Play from '@/assets/icons/play.svg?react';
import Plus from '@/assets/icons/plus.svg?react';
import Like from '@/assets/icons/like.svg?react';
import Sound from '@/assets/icons/sound.svg?react';
import LinkButton from '@/components/Button';

import type { CatalogItem } from '@/api/catalog/catalog.types';

import { useLanguage } from '@/i18n/LanguageProvider';

type MovieBannerCardProps = Pick<CatalogItem, 'title' | 'description' | 'images'>;

export default function MovieBannerCard({ title, description, images }: MovieBannerCardProps) {
  const { t } = useLanguage();

  if (!images) return null;

  return (
    <div className="movie-banner-card">
      {images.map(image => (
        <img className="movie-banner-card__image" src={image} loading="lazy" alt="" />
      ))}

      <div className="movie-banner-card__inner">
        <div className="movie-banner-card__body">
          <h2 className="movie-banner-card__title h3">{title}</h2>
          <div className="movie-banner-card__description">
            <p>{description}</p>
          </div>
        </div>
        <footer className="movie-banner-card__footer">
          <LinkButton mode="button" customClass="movie-banner-card__play">
            <div className="movie-banner-card__cta">
              <Play />
              <p>{t('catalogPage.cta')}</p>
            </div>
          </LinkButton>
          <div className="movie-banner-card__actions">
            <LinkButton
              mode="button"
              customClass="button--black-06 button--movies-actions"
              ariaLabel={t('catalogPage.actions.add')}
            >
              <Plus className="movie-banner-card__icon" />
            </LinkButton>
            <LinkButton mode="button" customClass="button--black-06 button--movies-actions">
              <Like className="movie-banner-card__icon" />
            </LinkButton>
            <LinkButton mode="button" customClass="button--black-06 button--movies-actions">
              <Sound className="movie-banner-card__icon" />
            </LinkButton>
          </div>
        </footer>
      </div>
    </div>
  );
}
