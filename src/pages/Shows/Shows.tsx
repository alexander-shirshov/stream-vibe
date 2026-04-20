import { Helmet } from 'react-helmet-async';
import { getTitle } from '@/utils/seo';
import { useLanguage } from '@/i18n/LanguageProvider';

export default function Shows() {
  const { t } = useLanguage();

  return (
    <>
      <Helmet>
        <title>{getTitle(t('main.pageTitle'))}</title>
        <meta name="description" content="Главная страница Stream Vibe" />
      </Helmet>

      <h1>Главная</h1>
    </>
  );
}
