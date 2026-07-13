import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/i18n/LanguageProvider';
import { getTitle } from '@/utils/seo';
import Plans from '@/pages/Home/sections/Plans';
import PlansComparison from './sections/PlansComparison';
import { sectionIds } from '@/constants/navConfig';
import { useIsBelowBreakpoint } from '@/hooks/useBreakpoints';
import { useHashScroll } from '@/hooks/useHashScroll';

import type { BillingPeriod } from '@/config/planItems';

export default function Subscriptions() {
  const { t } = useLanguage();

  const [activeBillingPeriod, setActiveBillingPeriod] = useState<BillingPeriod>('monthly');
  const isMobile = useIsBelowBreakpoint('mobile');

  useHashScroll(isMobile);

  return (
    <>
      <Helmet>
        <title>{getTitle(t('subscriptionsPage.pageTitle'))}</title>
        <meta name="description" content={t('subscriptionsPage.meta')} />
      </Helmet>

      <div id={sectionIds.subscriptionsPlans} className="hash-section">
        <Plans
          activeBillingPeriod={activeBillingPeriod}
          onBillingPeriodChange={setActiveBillingPeriod}
        />
      </div>

      <PlansComparison activeBillingPeriod={activeBillingPeriod} />
    </>
  );
}
