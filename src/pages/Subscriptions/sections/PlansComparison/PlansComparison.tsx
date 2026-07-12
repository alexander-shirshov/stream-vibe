import './PlansComparison.scss';

import { useMemo, useCallback, useState } from 'react';

import Section from '@/layouts/Section';
import Table, { type TableHeadCell, type TableRow } from '@/components/Table';
import Tabs from '@/components/Tabs';
import TabsNavigation from '@/components/Tabs/components/TabsNavigation';
import Specifications, { type SpecificationItem } from '@/components/Specifications';
import { getLocale } from '@/i18n/types';

import { useLanguage } from '@/i18n/LanguageProvider';
import { useIsBelowBreakpoint } from '@/hooks/useBreakpoints';

import {
  planComparisonRows,
  subscriptionPlans,
  type BillingPeriod,
  type PlanComparisonRow,
  type PlanKey,
  type PlanPrice,
} from '@/config/planItems';

import type { TabItem } from '@/components/Tabs/Tabs';

type PlansComparisonProps = {
  activeBillingPeriod: BillingPeriod;
};

function getPlanByKey(planKey: PlanKey) {
  const plan = subscriptionPlans.find(item => item.itemKey === planKey);

  if (!plan) {
    throw new Error(`Plan "${planKey}" was not found`);
  }

  return plan;
}

function formatPlanPrice(price: PlanPrice, periodLabel: string, locale: string): string {
  const formattedValue = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: price.currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price.value);

  return `${formattedValue}/${periodLabel}`;
}

export default function PlansComparison({ activeBillingPeriod }: PlansComparisonProps) {
  const { t, language } = useLanguage();
  const locale = getLocale(language);

  const isMobileComparison = useIsBelowBreakpoint('mobile');

  const defaultActivePlanIndex = Math.max(
    subscriptionPlans.findIndex(plan => plan.isPopular),
    0
  );

  const [activeTabIndex, setActiveTabIndex] = useState(defaultActivePlanIndex);

  const getComparisonValue = useCallback(
    (row: PlanComparisonRow, planKey: PlanKey): string => {
      if (row.type === 'price') {
        const plan = getPlanByKey(planKey);
        const price = plan.prices[activeBillingPeriod];
        const periodLabel = t(`subscriptionsPage.comparison.pricePeriods.${price.period}`);

        return formatPlanPrice(price, periodLabel, locale);
      }

      return t(`subscriptionsPage.comparison.values.${row.values[planKey]}`);
    },
    [activeBillingPeriod, locale, t]
  );

  const headCells = useMemo<TableHeadCell[]>(() => {
    return [
      {
        children: t('subscriptionsPage.comparison.featuresTitle'),
        width: '25%',
      },
      ...subscriptionPlans.map(plan => ({
        children: (
          <>
            {t(`plans.items.${plan.itemKey}.title`)}
            {plan.isPopular && (
              <span className="plans-comparison__badge">
                {t('subscriptionsPage.comparison.popularBadge')}
              </span>
            )}
          </>
        ),
        width: '25%',
      })),
    ];
  }, [t]);

  const tableRows = useMemo<TableRow[]>(() => {
    return planComparisonRows.map(row => ({
      cells: [
        t(`subscriptionsPage.comparison.features.${row.featureKey}`),
        ...subscriptionPlans.map(plan => getComparisonValue(row, plan.itemKey)),
      ],
    }));
  }, [getComparisonValue, t]);

  const tabsItems = useMemo<TabItem[]>(() => {
    return subscriptionPlans.map(plan => ({
      id: plan.itemKey,
      title: t(`plans.items.${plan.itemKey}.title`),
      children: (
        <Specifications
          items={planComparisonRows.map<SpecificationItem>(row => ({
            label: t(`subscriptionsPage.comparison.features.${row.featureKey}`),
            value: getComparisonValue(row, plan.itemKey),
            isWide: row.featureKey === 'content' || row.featureKey === 'devices',
          }))}
        />
      ),
    }));
  }, [getComparisonValue, t]);

  return (
    <Section
      className="plans-comparison"
      title={t('subscriptionsPage.comparison.title')}
      titleId="plans-comparison-title"
      description={t('subscriptionsPage.comparison.descr')}
    >
      {isMobileComparison ? (
        <div className="plans-comparison__tabs">
          <TabsNavigation
            title={t('subscriptionsPage.comparison.title')}
            items={tabsItems}
            activeTabIndex={activeTabIndex}
            onChange={setActiveTabIndex}
          />

          <Tabs items={tabsItems} activeTabIndex={activeTabIndex} />
        </div>
      ) : (
        <Table className="plans-comparison__table" headCells={headCells} rows={tableRows} />
      )}
    </Section>
  );
}
