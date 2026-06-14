import Section from '@/layouts/Section';
import './Categories.scss';
import { useLanguage } from '@/i18n/LanguageProvider';
import CatalogItemCard from '@/components/CatalogItemCard';
import Slider from '@/components/Slider';
import SliderNavigation from '@/components/Slider/components/SliderNavigation';
import { sectionIds } from '@/constants/navConfig';
import { useCatalogSection } from '@/hooks/useCatalogSection';
import CatalogSectionSkeleton from '@/components/CatalogSectionSkeleton';

import { useRef, useState } from 'react';

export function Categories() {
  const [isLocked, setIsLocked] = useState(true);
  const { language } = useLanguage();
  const { section, error, isLoading } = useCatalogSection(language, 'homeCategories');

  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const paginationRef = useRef<HTMLDivElement>(null);
  const scrollbarRef = useRef<HTMLDivElement>(null);

  if (isLoading) {
    return <CatalogSectionSkeleton />;
  }

  if (error || !section) {
    return null;
  }

  return (
    <Section
      title={section.title}
      titleId={section.id}
      description={section.description}
      isActionsHiddenOnMobile
      id={sectionIds.categories}
      actions={
        <SliderNavigation
          prevRef={prevRef}
          nextRef={nextRef}
          paginationRef={paginationRef}
          hasPagination={!isLocked}
          className={isLocked ? 'visually-hidden' : undefined}
        />
      }
    >
      <Slider
        prevRef={prevRef}
        nextRef={nextRef}
        paginationRef={paginationRef}
        scrollbarRef={scrollbarRef}
        onLockChange={setIsLocked}
        hasScrollbarOnMobile={true}
      >
        {section.items.map(item => {
          return <CatalogItemCard key={item.id} {...item}></CatalogItemCard>;
        })}
      </Slider>
    </Section>
  );
}
