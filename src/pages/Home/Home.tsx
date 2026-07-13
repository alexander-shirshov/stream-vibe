import { Helmet } from 'react-helmet-async';
import { getTitle } from '@/utils/seo';
import { useLanguage } from '@/i18n/LanguageProvider';
import { Hero } from '@/pages/Home/sections/';
import { Categories } from './sections/Categories/Categories';
import Devices from './sections/Devices';
import Questions from '@/pages/Home/sections/Questions';
import Plans from './sections/Plans/index';
import { useHashScroll } from '@/hooks/useHashScroll';
import { useIsBelowBreakpoint } from '@/hooks/useBreakpoints';

export default function Home() {
  const { t } = useLanguage();
  const isMobile = useIsBelowBreakpoint('mobile');

  useHashScroll(isMobile);

  return (
    <>
      <Helmet>
        <title>{getTitle(t('main.pageTitle'))}</title>
        <meta name="description" content={t('main.meta')} />
      </Helmet>

      <Hero />
      <Categories />
      <Devices />
      <Questions />
      <Plans />
    </>
  );
}
