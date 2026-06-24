import { Helmet } from 'react-helmet-async';

import { useParams } from 'react-router-dom';

import MediaDetailsPage from '@/components/MediaDetailsPage';
import CatalogSectionSkeleton from '@/components/CatalogSectionSkeleton';
import DetailsBlockSkeleton from '@/components/DetailsBlockSkeleton';

import { getTitle } from '@/utils/seo';
import { useLanguage } from '@/i18n/LanguageProvider';
import { useShow } from '@/hooks/useShow';

export default function ShowDetails() {
  const { t, language } = useLanguage();
  const { slug } = useParams();
  const { show, isInitialLoading, error } = useShow(language, slug);

  const titleId = 'show-banner-title';
  const entityLabel = t(`catalogEntity.show.title`);

  const title = show ? getTitle(show.title, entityLabel) : getTitle(entityLabel);

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

  if (error || !show) {
    return null;
  }

  return (
    <MediaDetailsPage
      entity={show}
      titleId={titleId}
      pageTitle={title}
      entityType="show"
      metaDescription={t('catalogEntity.show.meta')}
    />
  );
}
