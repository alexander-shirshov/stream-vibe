import { useCatalogMultipleSections } from '@/hooks/useCatalogMultipleSections';
import CatalogSection from './CatalogSection';
import { useLanguage } from '@/i18n/LanguageProvider';
import { catalogSectionSliderConfig } from '@/config/catalogSectionSliderConfig';
import CatalogSectionSkeleton from '@/components/CatalogSectionSkeleton';
import { catalogSectionIds } from '@/constants/navConfig';

import type { CatalogSectionKey } from '@/api/catalog/catalog.types';
import { type Messages } from '@/i18n/types';

type CatalogGroupProps = {
  id: string;
  sectionKeys: CatalogSectionKey[];
  titleKey?: keyof Messages['catalogPage']['catalogSections'];
};

export default function CatalogGroup({ sectionKeys, titleKey, id }: CatalogGroupProps) {
  const { language, t } = useLanguage();
  const { sections, error, isInitialLoading } = useCatalogMultipleSections(language, sectionKeys, {
    withKeys: true,
  });

  if (isInitialLoading) {
    return (
      <>
        {sectionKeys.map(key => {
          const cardsCount =
            typeof catalogSectionSliderConfig[key]?.slidesPerView === 'number' &&
            catalogSectionSliderConfig[key]?.slidesPerView > 0
              ? Math.floor(catalogSectionSliderConfig[key]?.slidesPerView)
              : undefined;
          return <CatalogSectionSkeleton key={key} cardsCount={cardsCount} />;
        })}
      </>
    );
  }

  if (error && sections.length === 0) {
    return null;
  }

  return (
    <div id={id} className="collections__group">
      {titleKey && (
        <p className="collections__title hidden-mobile">
          {t(`catalogPage.catalogSections.${titleKey}`)}
        </p>
      )}
      {sections.map(section => {
        return (
          <CatalogSection
            {...section}
            id={catalogSectionIds[section.key] ?? section.id}
            sliderParams={catalogSectionSliderConfig[section.key]}
            key={section.id}
          ></CatalogSection>
        );
      })}
    </div>
  );
}
