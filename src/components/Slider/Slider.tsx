import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './Slider.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar } from 'swiper/modules';
import type { SwiperOptions } from 'swiper/types';
import 'swiper/css/scrollbar';

import React, { Children } from 'react';
import clsx from 'clsx';

type SliderProps = {
  children: React.ReactNode;
  controls?: React.ReactNode;
  prevRef: React.RefObject<HTMLButtonElement | null>;
  nextRef: React.RefObject<HTMLButtonElement | null>;
  paginationRef?: React.RefObject<HTMLDivElement | null>;
  hasScrollbarOnMobile?: boolean;
  isMobileBleeding?: boolean;
  scrollbarRef?: React.RefObject<HTMLDivElement | null>;
  onLockChange?: (locked: boolean) => void;
  options?: SwiperOptions;
};

const defaultSliderOptions: SwiperOptions = {
  slidesPerView: 5,
  slidesPerGroup: 5,
  spaceBetween: 30,
  allowTouchMove: false,
  watchOverflow: true,
  freeMode: false,
  breakpoints: {
    0: {
      slidesPerView: 2,
      slidesPerGroup: 1,
      spaceBetween: 20,
      allowTouchMove: true,
    },
    481: {
      slidesPerView: 3,
      slidesPerGroup: 1,
      spaceBetween: 20,
      allowTouchMove: true,
    },
    768: {
      slidesPerView: 4,
      slidesPerGroup: 4,
      spaceBetween: 20,
      allowTouchMove: true,
    },
    1024: {
      slidesPerView: 5,
      slidesPerGroup: 5,
      spaceBetween: 20,
      allowTouchMove: false,
    },
    1441: {
      slidesPerView: 5,
      slidesPerGroup: 5,
      spaceBetween: 30,
      allowTouchMove: false,
    },
  },
};

export default function Slider({
  children,
  controls,
  prevRef,
  nextRef,
  paginationRef,
  scrollbarRef,
  hasScrollbarOnMobile,
  isMobileBleeding,
  onLockChange,
  options,
}: SliderProps) {
  const handleLockChange = (swiper: { isLocked: boolean }) => {
    onLockChange?.(swiper.isLocked);
  };

  const sliderOptions: SwiperOptions = {
    ...defaultSliderOptions,
    ...options,
    breakpoints: options?.breakpoints ?? defaultSliderOptions.breakpoints,
  };

  return (
    <div className={clsx('slider', isMobileBleeding && 'slider--bleed-mobile')}>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar]}
        {...sliderOptions}
        navigation
        pagination
        scrollbar={{
          el: scrollbarRef?.current,
          draggable: true,
          dragClass: 'slider__scrollbar-drag',
        }}
        onInit={handleLockChange}
        onBreakpoint={handleLockChange}
        onResize={handleLockChange}
        onBeforeInit={swiper => {
          if (typeof swiper.params.scrollbar !== 'boolean') {
            swiper.params.scrollbar = {
              ...swiper.params.scrollbar,
              el: scrollbarRef?.current,
              draggable: true,
              dragClass: 'slider__scrollbar-drag',
            };
          }

          if (typeof swiper.params.navigation !== 'boolean') {
            swiper.params.navigation = {
              ...swiper.params.navigation,
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            };
          }

          if (typeof swiper.params.pagination !== 'boolean') {
            swiper.params.pagination = {
              ...swiper.params.pagination,
              el: paginationRef?.current,
              clickable: true,
              bulletClass: 'slider-navigation__pagination-bullet',
              bulletActiveClass: 'is-active',
            };
          }
        }}
        onSwiper={swiper => {
          setTimeout(() => {
            if (swiper.destroyed || !swiper.params) return;

            if (
              typeof swiper.params.scrollbar !== 'boolean' &&
              swiper.params.scrollbar &&
              scrollbarRef?.current &&
              swiper.scrollbar
            ) {
              swiper.params.scrollbar = {
                ...swiper.params.scrollbar,
                el: scrollbarRef.current,
                draggable: true,
                dragClass: 'slider__scrollbar-drag',
              };

              swiper.scrollbar.init();
              swiper.scrollbar.updateSize();
              swiper.scrollbar.setTranslate();
            }

            if (
              typeof swiper.params.pagination !== 'boolean' &&
              swiper.params.pagination &&
              paginationRef?.current &&
              swiper.pagination
            ) {
              swiper.params.pagination = {
                ...swiper.params.pagination,
                el: paginationRef.current,
                clickable: true,
                bulletClass: 'slider-navigation__pagination-bullet',
                bulletActiveClass: 'is-active',
              };

              swiper.pagination.init();
              swiper.pagination.render();
              swiper.pagination.update();
            }

            if (
              typeof swiper.params.navigation !== 'boolean' &&
              swiper.params.navigation &&
              prevRef.current &&
              nextRef.current &&
              swiper.navigation
            ) {
              swiper.params.navigation = {
                ...swiper.params.navigation,
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              };

              swiper.navigation.init();
              swiper.navigation.update();
            }
          });
        }}
      >
        {Children.map(children, (slide, index) => (
          <SwiperSlide key={index}>{slide}</SwiperSlide>
        ))}
      </Swiper>
      {controls}
      {hasScrollbarOnMobile && scrollbarRef && (
        <div ref={scrollbarRef} className="slider__scrollbar visible-mobile" />
      )}
    </div>
  );
}
