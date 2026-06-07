import './MoviesBanner.scss';
import { useLanguage } from '@/i18n/LanguageProvider';
// import { fetchMovies } from '@/api/catalog/catalog.api';
import { useRef } from 'react';
import Slider from '@/components/Slider';
import SliderNavigation from '@/components/Slider/components/SliderNavigation';

import CatalogSectionSkeleton from '@/components/CatalogSectionSkeleton';
import MovieBannerCard from '@/components/MovieBannerCard/MovieBannerCard';

import { CURRENT_USER_ID } from '@/constants/user';

import { useCatalogSection } from '@/hooks/useCatalogSection';
import { useUserState } from '@/hooks/useUserState';

export default function MoviesBanner() {
  const { t, language } = useLanguage();
  const titleId = 'movies-banner-title';

  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const paginationRef = useRef<HTMLDivElement>(null);

  const { error, isInitialLoading, section } = useCatalogSection(language, 'catalogBanner');

  const {
    isLoading: isUserStateLoading,
    error: userStateError,
    handleToggleLike,
    handleTogglePlaylist,
    isInPlaylist,
    handleToggleMuted,
    isMuted,
    userState,
    isLiked,
  } = useUserState(CURRENT_USER_ID);

  const isInitialPageLoading = isInitialLoading || (isUserStateLoading && !userState);

  if (isInitialPageLoading) return <CatalogSectionSkeleton variant="banner" />;

  if (
    (error && !section?.items?.length) ||
    (userStateError && !userState) ||
    !section?.items ||
    !userState
  ) {
    return null;
  }

  return (
    <section className="movies-banner container" aria-labelledby={titleId}>
      <h1 className="visually-hidden" id={titleId}>
        {t('catalogPage.heading')}
      </h1>
      <Slider
        prevRef={prevRef}
        nextRef={nextRef}
        paginationRef={paginationRef}
        hasScrollbarOnMobile={false}
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
          <MovieBannerCard
            key={item.entityId}
            {...item}
            liked={isLiked(item.entityId)}
            added={isInPlaylist(item.entityId)}
            isMuted={isMuted}
            onLikeToggle={() => handleToggleLike(item.entityId)}
            onPlaylistToggle={() => handleTogglePlaylist(item.entityId)}
            onMuteToggle={handleToggleMuted}
          />
        ))}
      </Slider>
    </section>
  );
}
