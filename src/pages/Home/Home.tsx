import { Helmet } from 'react-helmet-async';
import { getTitle } from '@/utils/seo';
import { useLanguage } from '@/i18n/LanguageProvider';
import { Hero } from '@/pages/Home/sections/';
import { Categories } from './sections/Categories/Categories';
import Devices from './sections/Devices';

export default function Home() {
  const { t } = useLanguage();

  return (
    <>
      <Helmet>
        <title>{getTitle(t('main.pageTitle'))}</title>
        <meta name="description" content="Главная страница Stream Vibe" />
      </Helmet>

      <Hero />
      <Categories />
      <Devices />
    </>
  );
}
