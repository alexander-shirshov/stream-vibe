import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/i18n/LanguageProvider';
import { getTitle } from '@/utils/seo';
import Plans from '@/pages/Home/sections/Plans';
import PlansComparison from './sections/PlansComparison';

import type { BillingPeriod } from '@/config/planItems';

export default function Subscriptions() {
  const { t } = useLanguage();

  const [activeBillingPeriod, setActiveBillingPeriod] = useState<BillingPeriod>('monthly');

  return (
    <>
      <Helmet>
        <title>{getTitle(t('subscriptionsPage.pageTitle'))}</title>
        <meta name="description" content={t('subscriptionsPage.meta')} />
      </Helmet>

      <Plans
        activeBillingPeriod={activeBillingPeriod}
        onBillingPeriodChange={setActiveBillingPeriod}
      />

      <PlansComparison activeBillingPeriod={activeBillingPeriod} />
    </>
  );
}
