import { Helmet } from 'react-helmet-async';
import { getTitle } from '@/utils/seo';
import { useLanguage } from '@/i18n/LanguageProvider';

export default function Movies() {
  const { t } = useLanguage();

  return (
    <>
      <Helmet>
        <title>{getTitle(t('main.pageTitle'))}</title>
        <meta name="description" content="О проекте Stream Vibe" />
      </Helmet>
    </>
  );
}
