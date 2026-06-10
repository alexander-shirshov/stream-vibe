import { Helmet } from 'react-helmet-async';
import { getTitle } from '@/utils/seo';
import { useLanguage } from '@/i18n/LanguageProvider';
import MoviesBanner from '@/pages/Catalog/sections/MoviesBanner';
import Collections from '@/pages/Catalog/sections/Collections';

export default function Catalog() {
  const { t } = useLanguage();

  return (
    <>
      <Helmet>
        <title>{getTitle(t('catalogPage.pageTitle'))}</title>
        <meta name="description" content={t('catalogPage.meta')} />
      </Helmet>

      <MoviesBanner />
      <Collections />
    </>
  );
}
