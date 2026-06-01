import { Link } from 'react-router-dom';
import './CatalogItemCard.scss';
import Arrow from '@/assets/icons/arrow-right.svg?react';
import type { CatalogItem } from '@/api/catalog/catalog.types';
import Badge from '@/components/Badge';
import clsx from 'clsx';
import type { BadgeVariant } from '@/components/Badge/Badge';

type CatalogItemCardProps = Pick<
  CatalogItem,
  'title' | 'images' | 'href' | 'badge' | 'views' | 'rating' | 'duration' | 'releaseDate'
> & {
  variant?: 'genre' | 'poster';
  badgeVariant?: BadgeVariant;
};

export default function CatalogItemCard({
  variant = 'genre',
  title,
  images,
  href,
  badge,
  badgeVariant,
}: CatalogItemCardProps) {
  const mainClassName: string = clsx('category-item', `category-item--${variant}`);
  const maxImages = variant === 'genre' ? 4 : 1;

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
        <h3 className="category-item__title">
          {badge && (
            <Badge className="category-item__badge" variant={badgeVariant}>
              {badge}
            </Badge>
          )}
          <span>{title}</span>
        </h3>
        {href && <Arrow className="category-item__icon" />}
      </div>
    </>
  );

  if (href) {
    return (
      <Link className={mainClassName} to={href}>
        {content}
      </Link>
    );
  }

  return <div className={mainClassName}>{content}</div>;
}
