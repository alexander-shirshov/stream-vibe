import './MovieDetails.scss';

import { Helmet } from 'react-helmet-async';

import { useParams } from 'react-router-dom';

import MediaDetailsPage from '@/components/MediaDetailsPage';
import CatalogSectionSkeleton from '@/components/CatalogSectionSkeleton';
import DetailsBlockSkeleton from '@/components/DetailsBlockSkeleton';

import { getTitle } from '@/utils/seo';
import { useLanguage } from '@/i18n/LanguageProvider';
import { useMovie } from '@/hooks/useMovie';

export default function MovieDetails() {
  const { t, language } = useLanguage();
  const { slug } = useParams();
  const { movie, isInitialLoading, error } = useMovie(language, slug);

  const titleId = 'movie-banner-title';
  const entityLabel = t(`catalogEntity.movie.title`);

  const title = movie ? getTitle(movie.title, entityLabel) : getTitle(entityLabel);

  if (isInitialLoading) {
    return (
      <>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={t('catalogEntity.movie.meta')} />
        </Helmet>
        <CatalogSectionSkeleton variant="banner" />
        <DetailsBlockSkeleton />
      </>
    );
  }

  if (error || !movie) {
    return null;
  }

  return (
    <MediaDetailsPage
      entity={movie}
      titleId={titleId}
      pageTitle={title}
      entityType="movie"
      metaDescription={t('catalogEntity.movie.meta')}
    />
  );
}
