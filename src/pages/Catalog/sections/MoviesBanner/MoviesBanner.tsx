import './MoviesBanner.scss';
import { useLanguage } from '@/i18n/LanguageProvider';
// import { fetchMovies } from '@/api/catalog/catalog.api';
import { useRef } from 'react';
import Slider from '@/components/Slider';
import SliderNavigation from '@/components/Slider/components/SliderNavigation';
import { useCatalogSection } from '@/hooks/useCatalogSection';
import CatalogSectionSkeleton from '@/components/CatalogSectionSkeleton';
import MovieBannerCard from '@/components/MovieBannerCard/MovieBannerCard';

export default function MoviesBanner() {
  const { t, language } = useLanguage();
  const titleId = 'movies-banner-title';

  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const paginationRef = useRef<HTMLDivElement>(null);

  const { error, isLoading, section } = useCatalogSection(language, 'catalogBanner');

  if (isLoading) return <CatalogSectionSkeleton variant="banner" />;

  if (error || !section || !section.items) return null;

  return (
    <section className="movies-banner container" aria-labelledby={titleId}>
      <h1 className="visually-hidden" id={titleId}>
        {t('catalogPage.heading')}
      </h1>
      <Slider
        prevRef={prevRef}
        nextRef={nextRef}
        paginationRef={paginationRef}
        hasScrollbar={false}
        options={{
          slidesPerView: 1,
          slidesPerGroup: 1,
          allowTouchMove: true,
          breakpoints: {},
        }}
        controls={
          <SliderNavigation
            prevRef={prevRef}
            nextRef={nextRef}
            paginationRef={paginationRef}
            hasPagination
            className="movies-banner__navigation"
          />
        }
      >
        {section.items.map(item => (
          <MovieBannerCard key={item.id} {...item} />
        ))}
      </Slider>
    </section>
  );
}
