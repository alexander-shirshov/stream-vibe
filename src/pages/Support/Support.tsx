import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/i18n/LanguageProvider';
import { getTitle } from '@/utils/seo';
import { sectionIds } from '@/constants/navConfig';
import { useHashScroll } from '@/hooks/useHashScroll';
import { useIsBelowBreakpoint } from '@/hooks/useBreakpoints';

import Feedback from '@/pages/Support/sections/Feedback';

export default function Support() {
  const { t } = useLanguage();

  const isMobile = useIsBelowBreakpoint('mobile');
  useHashScroll(isMobile);
  return (
    <>
      <Helmet>
        <title>{getTitle(t('supportPage.pageTitle'))}</title>
        <meta name="description" content={t('supportPage.meta')} />
      </Helmet>

      <div id={sectionIds.support} className="hash-section">
        <Feedback></Feedback>
      </div>
    </>
  );
}
