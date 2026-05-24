import { useState, useMemo } from 'react';

import Section from '@/layouts/Section';
import { useLanguage } from '@/i18n/LanguageProvider';
import Grid from '@/components/Grid';
import { planGroups } from '@/config/planItems';
import PlanCard from '@/components/PlanCard';
import Tabs from '@/components/Tabs';
import TabsNavigation from '@/components/Tabs/components/TabsNavigation';
import type { TabItem } from '@/components/Tabs/Tabs';
import { sectionIds } from '@/constants/navConfig';

export default function Plans() {
  const { t } = useLanguage();

  const tabsItems = useMemo<TabItem[]>(() => {
    return planGroups.map(group => {
      return {
        id: group.title,
        title: t(`plans.tabs.${group.title}`),
        isActive: group.isActive,
        children: (
          <Grid columns={3}>
            {group.items.map(item => (
              <PlanCard {...item} key={item.itemKey} showApproxPrice={true} />
            ))}
          </Grid>
        ),
      };
    });
  }, [t]);

  const [activeTabIndex, setActiveTabIndex] = useState<number>((): number => {
    const index = planGroups.findIndex(group => group.isActive);

    return index >= 0 ? index : 0;
  });

  return (
    <Section
      title={t('plans.title')}
      titleId="plans-title"
      id={sectionIds.pricing}
      description={t('plans.descr')}
      actions={
        <TabsNavigation
          title={t('plans.title')}
          items={tabsItems}
          activeTabIndex={activeTabIndex}
          onChange={setActiveTabIndex}
        />
      }
    >
      <Tabs items={tabsItems} activeTabIndex={activeTabIndex} />
    </Section>
  );
}
