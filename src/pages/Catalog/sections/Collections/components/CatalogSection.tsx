import './CatalogSection.scss';
import { useRef, useState } from 'react';

import type { CatalogSection } from '@/api/catalog/catalog.types';
import type { SwiperOptions } from 'swiper/types';
import Section from '@/layouts/Section';
import CatalogItemCard from '@/components/CatalogItemCard';
import type { CatalogItemCardVariant } from '@/components/CatalogItemCard/CatalogItemCard';

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

  const badgeVariant: BadgeVariant = category === 'top' ? 'accent' : 'default';
  const cardVariant: CatalogItemCardVariant =
    category === 'genres' || category === 'top' ? 'genre' : 'poster';

  return (
    <Section
      id={id}
      className="collections__section"
      title={title}
      titleId={`${id}-title`}
      isActionsHiddenOnMobile={true}
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
        options={sliderParams}
        hasScrollbarOnMobile={true}
      >
        {items.map(item => {
          return (
            <CatalogItemCard
              key={item.id}
              {...item}
              badgeVariant={badgeVariant}
              variant={cardVariant}
            ></CatalogItemCard>
          );
        })}
      </Slider>
    </Section>
  );
}
