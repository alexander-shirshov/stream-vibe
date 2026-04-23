import { Link } from 'react-router-dom';
import './CategoryCard.scss';
import { getPath, type DynamicRouteKey } from '@/router/routes';
import Arrow from '@/assets/icons/arrow-right.svg?react';
import type { Messages } from '@/i18n/types';
import { useLanguage } from '@/i18n/LanguageProvider';

export type CategoryCardProps = {
  genre: keyof Messages['categoryCard'];
  categoryUrl: DynamicRouteKey;
  imagesUrls: string[];
};

export default function CategoryCard({ genre, imagesUrls, categoryUrl }: CategoryCardProps) {
  const { t } = useLanguage();

  const path = getPath(categoryUrl, { genre });
  const title = t(`categoryCard.${genre}`);

  return (
    <Link className="category-card" to={path}>
      <div className="category-card__images">
        {imagesUrls.map(url => (
          <div key={url} className="category-card__image-wrapper">
            <img className="category-card__image" src={url} loading="lazy" alt="" />
          </div>
        ))}
      </div>

      <div className="category-card__body">
        <h3 className="category-card__title">{title}</h3>
        <Arrow className="category-card__icon" />
      </div>
    </Link>
  );
}
