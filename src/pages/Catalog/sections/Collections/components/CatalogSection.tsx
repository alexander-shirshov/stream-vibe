import './CatalogSection.scss';
import { useRef, useState } from 'react';

import type { CatalogSection } from '@/api/catalog/catalog.types';
import type { SwiperOptions } from 'swiper/types';
import Section from '@/layouts/Section';
import CatalogItemCard from '@/components/CatalogItemCard';

import Slider from '@/components/Slider';
import SliderNavigation from '@/components/Slider/components/SliderNavigation';
import type { BadgeVariant } from '@/components/Badge/Badge';

type CatalogSectionProps = CatalogSection & {
  sliderParams?: SwiperOptions;
};

export default function CatalogSection({
  id,
  title,
  items,
  category,
  sliderParams,
}: CatalogSectionProps) {
  const [isLocked, setIsLocked] = useState(true);

  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const paginationRef = useRef<HTMLDivElement>(null);
  const scrollbarRef = useRef<HTMLDivElement>(null);

  const BadgeVariant: BadgeVariant = category === 'top' ? 'accent' : 'default';

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
        hasScrollbarOnMobile={true}
      >
        {items.map(item => {
          return (
            <CatalogItemCard key={item.id} {...item} badgeVariant={BadgeVariant}></CatalogItemCard>
          );
        })}
      </Slider>
    </Section>
  );
}
