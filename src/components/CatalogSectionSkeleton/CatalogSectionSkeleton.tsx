import './CatalogSectionSkeleton.scss';
import Section from '@/layouts/Section';

type SkeletonVariant = 'cards' | 'banner';

type CatalogSectionSkeletonProps = {
  cardsCount?: number;
  variant?: SkeletonVariant;
};

export default function CatalogSectionSkeleton({
  cardsCount = 3,
  variant = 'cards',
}: CatalogSectionSkeletonProps) {
  return variant === 'cards' ? (
    <Section>
      <section
        className={`catalog-section-skeleton section`}
        style={
          {
            '--skeleton-columns': cardsCount,
          } as React.CSSProperties
        }
        aria-hidden="true"
      >
        <div className="catalog-section-skeleton__header section__header">
          <div className="catalog-section-skeleton__info section__info">
            <div className="catalog-section-skeleton__title" />
            <div className="catalog-section-skeleton__description section__description" />
          </div>

          <div className="catalog-section-skeleton__navigation hidden-mobile" />
        </div>

        <div className="catalog-section-skeleton__cards">
          {Array.from({ length: cardsCount }).map((_, index) => (
            <div className="catalog-section-skeleton__card" key={index}>
              <div className="catalog-section-skeleton__image" />
              <div className="catalog-section-skeleton__card-footer">
                <div className="catalog-section-skeleton__card-title" />
                <div className="catalog-section-skeleton__icon" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </Section>
  ) : (
    <div className="banner-skeleton container"></div>
  );
}
