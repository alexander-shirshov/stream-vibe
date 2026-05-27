import './CatalogSection.scss';
import { useRef, useState } from 'react';

import { catalogSectionSliderConfig } from '@/config/catalogSectionSliderConfig';
import type { CatalogSection } from '@/api/catalog/catalog.types';
import type { SwiperOptions } from 'swiper/types';
import Section from '@/layouts/Section';
import CategoryCard from '@/components/CategoryCard';

import Slider from '@/components/Slider';
import SliderNavigation from '@/components/Slider/components/SliderNavigation';

type CatalogSectionProps = CatalogSection & {
  sliderParams?: SwiperOptions;
};

export default function CatalogSection({
  id,
  title,
  description,
  category,
  items,
  sliderParams,
}: CatalogSectionProps) {
  const [isLocked, setIsLocked] = useState(true);

  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const paginationRef = useRef<HTMLDivElement>(null);
  const scrollbarRef = useRef<HTMLDivElement>(null);

  return (
    <Section
      className="collections__section"
      title={title}
      titleId={id}
      isActionsHiddenOnMobile={true}
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
        options={sliderParams}
      >
        {items.map(item => {
          return <CategoryCard key={item.id} {...item}></CategoryCard>;
        })}
      </Slider>
    </Section>
  );
}
