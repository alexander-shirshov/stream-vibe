import Section from '@/layouts/Section';
import './Categories.scss';
import { useLanguage } from '@/i18n/LanguageProvider';
import { categoryItems } from '@/config/categoryItems';
import CategoryCard from '@/components/CategoryCard';
import Slider from '@/components/Slider';
import SliderNavigation from '@/components/Slider/components/SliderNavigation';

import { useRef, useState } from 'react';

export function Categories() {
  const [isLocked, setIsLocked] = useState(true);
  const { t } = useLanguage();

  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const paginationRef = useRef<HTMLDivElement>(null);
  const scrollbarRef = useRef<HTMLDivElement>(null);

  return (
    <Section
      title={t('categories.title')}
      titleId="categories-title"
      description={t('categories.descr')}
      isActionsHiddenOnMobile
      id="categories"
      actions={
        <SliderNavigation
          prevRef={prevRef}
          nextRef={nextRef}
          paginationRef={paginationRef}
          hasPagination={!isLocked}
          variant="round"
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
      >
        {categoryItems.map(cat => {
          return <CategoryCard key={cat.genre} {...cat}></CategoryCard>;
        })}
      </Slider>
    </Section>
  );
}
