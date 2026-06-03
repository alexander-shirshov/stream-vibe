import './Collections.scss';

import { useMediaQuery } from 'usehooks-ts';

import { useMemo, useState } from 'react';
import Tabs from '@/components/Tabs';
import TabsNavigation from '@/components/Tabs/components/TabsNavigation';
import CatalogGroup from '@/pages/Catalog/sections/Collections/components/CatalogGroup';
import { SHOWS_SECTION_KEYS, MOVIES_SECTION_KEYS } from '@/constants/sectionKeys';
import type { CatalogSectionKey } from '@/api/catalog/catalog.types';
import { type Messages } from '@/i18n/types';
import type { TabItem } from '@/components/Tabs/Tabs';
import { BREAKPOINTS } from '@/config/windowBreakpoints';

import { useLanguage } from '@/i18n/LanguageProvider';

type CatalogSectionGroup = {
  id: keyof Messages['catalogPage']['catalogSections'];
  sectionKeys: CatalogSectionKey[];
};

const CATALOG_GROUPS: CatalogSectionGroup[] = [
  {
    id: 'movies',
    sectionKeys: MOVIES_SECTION_KEYS,
  },
  {
    id: 'shows',
    sectionKeys: SHOWS_SECTION_KEYS,
  },
];

export default function Collections() {
  const { t } = useLanguage();
  const isMobile = useMediaQuery(`(max-width: ${BREAKPOINTS.mobile}px)`, {
    defaultValue: false,
    initializeWithValue: true,
  });

  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);

  const tabsItems = useMemo<TabItem[]>(() => {
    return CATALOG_GROUPS.map(group => {
      return {
        id: group.id,
        title: t(`catalogPage.catalogSections.${group.id}`),
        children: <CatalogGroup sectionKeys={group.sectionKeys} />,
      };
    });
  }, [t]);

  if (isMobile) {
    return (
      <div className="collections container">
        <TabsNavigation
          title={''}
          items={tabsItems}
          activeTabIndex={activeTabIndex}
          onChange={setActiveTabIndex}
        />
        <Tabs items={tabsItems} activeTabIndex={activeTabIndex} />
      </div>
    );
  }

  return (
    <div className="collections container">
      {CATALOG_GROUPS.map(group => (
        <CatalogGroup key={group.id} sectionKeys={group.sectionKeys} titleKey={group.id} />
      ))}
    </div>
  );
}
