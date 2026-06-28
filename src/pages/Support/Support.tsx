import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/i18n/LanguageProvider';
import { getTitle } from '@/utils/seo';

import Feedback from '@/pages/Support/sections/Feedback';

export default function Support() {
  const { t } = useLanguage();

  return (
    <>
      <Helmet>
        <title>{getTitle(t('supportPage.pageTitle'))}</title>
        <meta name="description" content={t('supportPage.meta')} />
      </Helmet>

      <Feedback></Feedback>
    </>
  );
}
