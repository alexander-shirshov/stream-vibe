import { useState } from 'react';

import { Helmet } from 'react-helmet-async';
import { getTitle } from '@/utils/seo';
import { useLanguage } from '@/i18n/LanguageProvider';
import MoviesBanner from '@/pages/Catalog/sections/MoviesBanner';
import Collections from '@/pages/Catalog/sections/Collections';
import CatalogItemCard from '@/components/CatalogItemCard';
import CatalogPromoModal from '@/components/CatalogPromoModal';
import { useCatalogMultipleSections } from '@/hooks/useCatalogMultipleSections';

import type { CatalogSectionKey } from '@/api/catalog/catalog.types';

type CatalogPromoSet = {
  itemId: string;
  sectionKey: CatalogSectionKey;
};

const CATALOG_PROMO_SEEN_KEY = 'stream-vibe-catalog-promo-seen';
const CATALOG_PROMO_ITEMS: CatalogPromoSet[] = [
  {
    itemId: 'kantara',
    sectionKey: 'catalogMoviesMustWatch',
  },
  {
    itemId: 'stranger-things',
    sectionKey: 'catalogShowsTrending',
  },
];

export default function Catalog() {
  const [isPromoModalOpen, setIsPromoModalOpen] = useState(() => {
    return sessionStorage.getItem(CATALOG_PROMO_SEEN_KEY) !== 'true';
  });

  const { t, language } = useLanguage();

  const sectionKeys = [...new Set(CATALOG_PROMO_ITEMS.map(item => item.sectionKey))];

  const { error, isInitialLoading, sections } = useCatalogMultipleSections(language, sectionKeys, {
    withKeys: true,
  });

  const promoItems = CATALOG_PROMO_ITEMS.flatMap(item => {
    const section = sections.find(sec => sec.key === item.sectionKey);
    const catalogItem = section?.items.find(it => it.id === item.itemId);

    return catalogItem && catalogItem.href && catalogItem.images ? [catalogItem] : [];
  });

  const canShowPromo = !isInitialLoading && !error && promoItems.length > 0;

  function markPromoAsSeen() {
    sessionStorage.setItem(CATALOG_PROMO_SEEN_KEY, 'true');
  }

  function handlePromoModalClose() {
    markPromoAsSeen();
    setIsPromoModalOpen(false);
  }

  function handlePromoItemClick() {
    markPromoAsSeen();
    setIsPromoModalOpen(false);
  }

  return (
    <>
      <Helmet>
        <title>{getTitle(t('catalogPage.pageTitle'))}</title>
        <meta name="description" content={t('catalogPage.meta')} />
      </Helmet>

      <MoviesBanner />
      <Collections />
      {canShowPromo && (
        <CatalogPromoModal
          title={t('catalogPage.promoModal.title')}
          isOpen={isPromoModalOpen}
          onClose={handlePromoModalClose}
        >
          {promoItems.map(catalogItem => (
            <CatalogItemCard
              variant="poster"
              key={catalogItem.id}
              title={catalogItem.title}
              href={catalogItem.href}
              images={catalogItem.images}
              onClick={handlePromoItemClick}
              durationMinutes={null}
              rating={null}
              ratingCount={null}
              season={null}
              badge={'Must-watch'}
              badgeVariant="accent"
              forceShowTitle={true}
            />
          ))}
        </CatalogPromoModal>
      )}
    </>
  );
}
