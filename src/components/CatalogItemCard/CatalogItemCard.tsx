import { Link } from 'react-router-dom';
import './CatalogItemCard.scss';
import Arrow from '@/assets/icons/arrow-right.svg?react';
import type { CatalogItem } from '@/api/catalog/catalog.types';
import Badge from '@/components/Badge';
import clsx from 'clsx';
import type { BadgeVariant } from '@/components/Badge/Badge';

import Eye from '@/assets/icons/eye.svg?react';
import Clock from '@/assets/icons/clock.svg?react';
import Season from '@/assets/icons/season.svg?react';

import { useLanguage } from '@/i18n/LanguageProvider';
import { getLocale } from '@/i18n/types';

import RatingStars from '@/components/RatingStars';

import { formatDuration, formatViews, formatReleaseDate } from '@/utils/formatters';

export type CatalogItemCardVariant = 'genre' | 'poster';

type CatalogItemCardProps = Pick<
  CatalogItem,
  | 'title'
  | 'images'
  | 'href'
  | 'badge'
  | 'views'
  | 'rating'
  | 'ratingCount'
  | 'durationMinutes'
  | 'releaseDate'
  | 'season'
> & {
  variant?: CatalogItemCardVariant;
  badgeVariant?: BadgeVariant;
};

export default function CatalogItemCard({
  variant = 'genre',
  title,
  images,
  href,
  badge,
  badgeVariant,
  durationMinutes,
  rating,
  ratingCount,
  views,
  releaseDate,
  season,
}: CatalogItemCardProps) {
  const mainClassName: string = clsx('category-item', `category-item--${variant}`);
  const maxImages = variant === 'genre' ? 4 : 1;

  const { t, language } = useLanguage();
  const locale = getLocale(language);

  const hasDuration = durationMinutes !== null && durationMinutes !== undefined;
  const hasViews = views !== null && views !== undefined;
  const hasRating = rating !== null && rating !== undefined;
  const hasRatingCount = ratingCount !== null && ratingCount !== undefined;
  const hasSeason = season !== null && season !== undefined;
  const hasReleaseDate = Boolean(releaseDate);

  const badgesCount = [hasDuration, hasViews, hasRating, hasSeason, hasReleaseDate].filter(
    Boolean
  ).length;

  const isOnlyReleaseDateBadge = badgesCount === 1 && Boolean(releaseDate);

  const duration = hasDuration
    ? formatDuration(durationMinutes, {
        hours: t('CatalogItemCard.durationHours'),
        minutes: t('CatalogItemCard.durationMinutes'),
      })
    : null;
  const viewsFormatted = hasViews ? formatViews(views) : null;
  const reviewsFormatted = hasRatingCount ? formatViews(ratingCount) : null;

  const content = (
    <>
      {images && (
        <div className="category-item__images">
          {images.slice(0, maxImages).map(url => (
            <div key={url} className="category-item__image-wrapper">
              <img className="category-item__image" src={url} loading="lazy" alt="" />
            </div>
          ))}
        </div>
      )}

      <div className="category-item__body">
        {variant === 'genre' ? (
          <h3 className="category-item__title">
            {badge && (
              <Badge className="category-item__badge" variant={badgeVariant}>
                {badge}
              </Badge>
            )}
            <span>{title}</span>
          </h3>
        ) : (
          <>
            <h3 className="visually-hidden">{title}</h3>
            <div
              className={clsx('category-item__meta', {
                'category-item__meta--centered': isOnlyReleaseDateBadge,
                'category-item__meta--many': badgesCount > 2,
                'category-item__meta--has-rating': hasRating,
                'category-item__meta--has-link': href,
              })}
            >
              {hasDuration && (
                <Badge variant={badgeVariant}>
                  <Clock
                    className="badge__icon"
                    aria-label={t('CatalogItemCard.ariaLabels.duration')}
                  />
                  {duration}
                </Badge>
              )}
              {hasRating && hasRatingCount && (
                <Badge variant={badgeVariant}>
                  <RatingStars rating={rating} ariaLabel={t('CatalogItemCard.ariaLabels.rating')} />
                  {reviewsFormatted}
                </Badge>
              )}

              {hasSeason && (
                <Badge variant={badgeVariant}>
                  <Season
                    className="badge__icon"
                    aria-label={t('CatalogItemCard.ariaLabels.season')}
                  />
                  <span>
                    {season} {t('CatalogItemCard.ariaLabels.season')}
                  </span>
                </Badge>
              )}
              {hasViews && (
                <Badge variant={badgeVariant}>
                  <Eye className="badge__icon" aria-label={t('CatalogItemCard.ariaLabels.views')} />
                  {viewsFormatted}
                </Badge>
              )}
              {hasReleaseDate && releaseDate && (
                <Badge variant={badgeVariant}>
                  <span className="category-item__release">{t('CatalogItemCard.releasedAt')}</span>
                  <span className="category-item__date">
                    {formatReleaseDate(releaseDate, locale)}
                  </span>
                </Badge>
              )}
            </div>
          </>
        )}

        {href && <Arrow className="category-item__icon" />}
      </div>
    </>
  );

  if (href) {
    return (
      <Link className={mainClassName} to={href} aria-label={title}>
        {content}
      </Link>
    );
  }

  return <article className={mainClassName}>{content}</article>;
}
