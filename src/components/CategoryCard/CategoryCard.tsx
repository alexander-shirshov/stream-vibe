import { Link } from 'react-router-dom';
import './CategoryCard.scss';
import Arrow from '@/assets/icons/arrow-right.svg?react';
import type { CatalogItem } from '@/api/catalog/catalog.types';

export type CategoryCardProps = Pick<CatalogItem, 'title' | 'images' | 'href'>;

export default function CategoryCard({ title, images, href }: CategoryCardProps) {
  const content = (
    <>
      {images && (
        <div className="category-card__images">
          {images.map(url => (
            <div key={url} className="category-card__image-wrapper">
              <img className="category-card__image" src={url} loading="lazy" alt="" />
            </div>
          ))}
        </div>
      )}

      <div className="category-card__body">
        <h3 className="category-card__title">{title}</h3>
        {href && <Arrow className="category-card__icon" />}
      </div>
    </>
  );

  if (href) {
    return (
      <Link className="category-card" to={href}>
        {content}
      </Link>
    );
  }

  return <div className="category-card">{content}</div>;
}
