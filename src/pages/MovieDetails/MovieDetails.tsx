import { useParams } from 'react-router-dom';

import { CURRENT_USER_ID } from '@/constants/user';

import { Helmet } from 'react-helmet-async';
import { getTitle } from '@/utils/seo';
import { useLanguage } from '@/i18n/LanguageProvider';
import { useMovie } from '@/hooks/useMovie';
import { useUserState } from '@/hooks/useUserState';

import MovieBannerCard from '@/components/MovieBannerCard';
import CatalogSectionSkeleton from '@/components/CatalogSectionSkeleton';

export default function MovieDetails() {
  const { t, language } = useLanguage();
  const { slug } = useParams();
  const { movie, isInitialLoading, error } = useMovie(language, slug);
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

  const titleId = 'movie-banner-title';
  const entityLabel = t(`catalogEntity.movie.title`);

  if (isInitialPageLoading) return <CatalogSectionSkeleton variant="banner" />;

  if (error || !movie) {
    return null;
  }

  if (userStateError || !userState) {
    return null;
  }

  const title = getTitle(movie?.title || '', entityLabel);

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={t('catalogEntity.movie.meta')} />
      </Helmet>
      <section className="movies-banner container" aria-labelledby={titleId}>
        <h1 className="visually-hidden" id={titleId}>
          {movie.title}
        </h1>
        <MovieBannerCard
          title={movie.title}
          description={movie.description}
          images={[movie.preview]}
          liked={isLiked(movie.id)}
          added={isInPlaylist(movie.id)}
          isMuted={isMuted}
          onLikeToggle={() => handleToggleLike(movie.id)}
          onPlaylistToggle={() => handleTogglePlaylist(movie.id)}
          onMuteToggle={handleToggleMuted}
        />
      </section>
    </>
  );
}
