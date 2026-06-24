import './MediaDetailsPage.scss';
import type { MediaEntityType, MediaDetailsBase } from '@/api/media/media.types';

import React, { useRef, useState } from 'react';

import clsx from 'clsx';

import { CURRENT_USER_ID } from '@/constants/user';

import type { UserReview } from '@/api/user/user.types';
import type { ReviewFormValues } from '@/components/ReviewModal/ReviewModal';

import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/i18n/LanguageProvider';
import { useUserState } from '@/hooks/useUserState';

import Plus from '@/assets/icons/plus.svg?react';
import Calendar from '@/assets/icons/calendar.svg?react';
import Lang from '@/assets/icons/lang.svg?react';
import Star from '@/assets/icons/star.svg?react';
import Tiles from '@/assets/icons/tiles.svg?react';
import Edit from '@/assets/icons/edit.svg?react';

import LinkButton from '@/components/Button';
import MovieBannerCard from '@/components/MovieBannerCard';
import CatalogSectionSkeleton from '@/components/CatalogSectionSkeleton';
import DetailsBlockSkeleton from '@/components/DetailsBlockSkeleton';
import InfoPanel from '@/components/InfoPanel/InfoPanel';
import Slider from '@/components/Slider';
import SliderNavigation from '@/components/Slider/components/SliderNavigation';
import PersonCard from '@/components/PersonCard';
import ReviewCard from '@/components/ReviewCard';
import Tags from '@/components/Tags';
import Ratings from '@/components/Ratings';
import ReviewModal from '@/components/ReviewModal';

import { mapUserReviewToReviewItem } from '@/api/user/user.mapper';

type DetailsPanel = {
  id: string;
  node: React.ReactNode;
};

type MediaDetailsPageProps = {
  entityType: MediaEntityType;
  entity: MediaDetailsBase;
  pageTitle: string;
  titleId: string;
  metaDescription: string;
  topPanel?: React.ReactNode;
};

export default function MediaDetailsPage({
  entityType,
  entity,
  pageTitle,
  titleId,
  metaDescription,
  topPanel,
}: MediaDetailsPageProps) {
  const castPrevRef = useRef<HTMLButtonElement>(null);
  const castNextRef = useRef<HTMLButtonElement>(null);

  const reviewsPrevRef = useRef<HTMLButtonElement>(null);
  const reviewsNextRef = useRef<HTMLButtonElement>(null);
  const reviewsPaginationRef = useRef<HTMLDivElement>(null);

  const reviewButtonRef = useRef<HTMLButtonElement>(null);

  const [isCastLocked, setIsCastLocked] = useState(true);
  const [isReviewsLocked, setIsReviewsLocked] = useState(true);

  const { t, language } = useLanguage();

  const {
    isLoading: isUserStateLoading,
    error: userStateError,
    handleToggleLike,
    handleTogglePlaylist,
    isInPlaylist,
    handleToggleMuted,
    isMuted,
    userState,
    isLiked,
    getReviewForEntity,
    handleAddReview,
    handleUpdateReview,
    handleDeleteReview,
  } = useUserState(CURRENT_USER_ID);

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const isInitialPageLoading = isUserStateLoading && !userState;

  const getDisplayedCountry = (country: string | null): string | undefined => {
    if (!country) return undefined;
    return language === 'en' ? `From ${country}` : country;
  };

  const userReview = getReviewForEntity(entity.id, entityType);

  const reviewModalMode = userReview ? 'edit' : 'create';

  const currentUserReview = userReview ? mapUserReviewToReviewItem(userReview) : null;

  const displayedReviews = currentUserReview
    ? [currentUserReview, ...entity.reviews]
    : entity.reviews;

  async function handleReviewSubmit(values: ReviewFormValues) {
    if (values.rating === null || !entity) return;

    const nextReview: UserReview = {
      id: userReview?.id ?? crypto.randomUUID(),
      entityId: entity.id,
      entityType,
      authorName: values.authorName,
      country: values.country.trim() || null,
      rating: values.rating,
      text: values.text,
      createdAt: userReview?.createdAt ?? new Date().toISOString(),
    };

    if (userReview) {
      await handleUpdateReview(nextReview);
    } else {
      await handleAddReview(nextReview);
    }

    handleReviewModalClose();
  }

  async function handleReviewDelete() {
    if (!userReview) return;

    await handleDeleteReview(userReview.id);
    handleReviewModalClose();
  }

  function handleReviewModalClose() {
    setIsReviewModalOpen(false);

    requestAnimationFrame(() => {
      reviewButtonRef.current?.focus();
    });
  }

  const detailsPanels: DetailsPanel[] = [
    ...(topPanel
      ? [
          {
            id: 'top-panel',
            node: topPanel,
          },
        ]
      : []),
    {
      id: 'description',
      node: (
        <InfoPanel
          className="details-block__main-item"
          title={t(`catalogEntity.${entityType}.description`)}
        >
          {<p className="media-details__description">{entity.description}</p>}
        </InfoPanel>
      ),
    },
    {
      id: 'cast',
      node: (
        <InfoPanel
          className="details-block__main-item"
          title={t(`catalogEntity.${entityType}.cast`)}
          headerActions={
            <SliderNavigation
              prevRef={castPrevRef}
              nextRef={castNextRef}
              // paginationRef={paginationRef}
              hasPagination={false}
              className={isCastLocked ? 'visually-hidden' : undefined}
              variant="round"
            />
          }
        >
          <Slider
            className="cast-slider"
            prevRef={castPrevRef}
            nextRef={castNextRef}
            onLockChange={setIsCastLocked}
            options={{
              slidesPerView: 'auto',
              slidesPerGroup: 3,
              spaceBetween: 10,
              allowTouchMove: true,
              breakpoints: {
                1024: {
                  spaceBetween: 20,
                  allowTouchMove: false,
                },
              },
            }}
            hasScrollbarOnMobile={false}
          >
            {entity.cast.map(actor => {
              return (
                <PersonCard
                  key={actor.id}
                  imgSrc={actor.avatar}
                  displayedName={actor.fullNameShort || actor.fullName}
                  displayedCountry={getDisplayedCountry(actor.country)}
                  showTooltip={true}
                />
              );
            })}
          </Slider>
        </InfoPanel>
      ),
    },
    {
      id: 'reviews',
      node: (
        <InfoPanel
          className="details-block__main-item"
          title={t(`catalogEntity.${entityType}.reviews`)}
          headerActions={
            <LinkButton
              ref={reviewButtonRef}
              mode="button"
              customClass="button--black-08 button--review"
              onClick={() => setIsReviewModalOpen(true)}
            >
              <div className="media-details__action">
                <div className="media-details__action-icon-wrapper">
                  {userReview ? (
                    <Edit className="media-details__action-icon" />
                  ) : (
                    <Plus className="media-details__action-icon" />
                  )}
                </div>

                <p className="media-details__action-text">
                  {userReview
                    ? t(`catalogEntity.${entityType}.editReview`)
                    : t(`catalogEntity.${entityType}.addReview`)}
                </p>
              </div>
            </LinkButton>
          }
          bottomActions={
            <div className="media-details__navigation">
              <SliderNavigation
                prevRef={reviewsPrevRef}
                nextRef={reviewsNextRef}
                paginationRef={reviewsPaginationRef}
                hasPagination={true}
                className={clsx(
                  'media-details__reviews-navigation',
                  isReviewsLocked && 'is-hidden'
                )}
                variant="round"
              />
            </div>
          }
        >
          <div className="media-details__reviews">
            <Slider
              className="review-slider"
              prevRef={reviewsPrevRef}
              nextRef={reviewsNextRef}
              paginationRef={reviewsPaginationRef}
              onLockChange={setIsReviewsLocked}
              options={{
                slidesPerView: 1,
                slidesPerGroup: 1,
                spaceBetween: 16,
                allowTouchMove: true,
                breakpoints: {
                  1441: {
                    slidesPerView: 2,
                    slidesPerGroup: 2,
                    spaceBetween: 20,
                  },
                },
              }}
              hasScrollbarOnMobile={false}
            >
              {displayedReviews.map(review => (
                <ReviewCard
                  name={review.authorName}
                  ratingValue={review.rating}
                  text={review.text}
                  country={review.country}
                  key={review.id}
                  isOwn={review.id === userReview?.id}
                ></ReviewCard>
              ))}
            </Slider>
          </div>
        </InfoPanel>
      ),
    },
  ];

  if (isInitialPageLoading)
    return (
      <>
        <Helmet>
          <title>{pageTitle}</title>
          <meta name="description" content={metaDescription} />
        </Helmet>
        <CatalogSectionSkeleton variant="banner" />
        <DetailsBlockSkeleton />
      </>
    );

  if (userStateError || !userState) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
      </Helmet>
      <section className="movies-banner container" aria-labelledby={titleId}>
        <h1 className="visually-hidden" id={titleId}>
          {entity.title}
        </h1>
        <MovieBannerCard
          title={entity.title}
          description={entity.description}
          images={[entity.preview]}
          liked={isLiked(entity.id)}
          added={isInPlaylist(entity.id)}
          isMuted={isMuted}
          onLikeToggle={() => handleToggleLike(entity.id)}
          onPlaylistToggle={() => handleTogglePlaylist(entity.id)}
          onMuteToggle={handleToggleMuted}
        />
      </section>

      <section
        className="details-block container"
        style={
          {
            '--detailsBlockRows': detailsPanels.length,
          } as React.CSSProperties
        }
      >
        {detailsPanels.map((panel, index) => (
          <React.Fragment key={panel.id}>
            {panel.node}

            {index === 0 && (
              <div className="details-block__aside-wrapper">
                <aside className="details-block__aside">
                  <div className="media-details__groups">
                    {/* RELEASE */}
                    <div className="media-details__group">
                      <h3 className="media-details__title">
                        <Calendar />
                        <span>{t(`catalogEntity.${entityType}.release`)}</span>
                      </h3>
                      <div className="media-details__description">
                        <span className="h6">{entity.releaseDate}</span>
                      </div>
                    </div>

                    {/* LANGS */}
                    <div className="media-details__group">
                      <h3 className="media-details__title">
                        <Lang />
                        <span>{t(`catalogEntity.${entityType}.languages`)}</span>
                      </h3>
                      <Tags tags={entity.languages} />
                    </div>

                    {/* RATINGS */}
                    <div className="media-details__group">
                      <h3 className="media-details__title">
                        <Star />
                        <span>{t(`catalogEntity.${entityType}.ratings`)}</span>
                      </h3>
                      <Ratings ratings={entity.ratings} />
                    </div>

                    {/* GENRES */}
                    <div className="media-details__group">
                      <h3 className="media-details__title">
                        <Tiles />
                        <span>{t(`catalogEntity.${entityType}.genres`)}</span>
                      </h3>
                      <Tags tags={entity.genres} />
                    </div>

                    {/* DIRECTOR */}
                    <div className="media-details__group">
                      <h3 className="media-details__title">
                        {t(`catalogEntity.${entityType}.director`)}
                      </h3>
                      {entity.director && (
                        <PersonCard
                          imgSrc={entity.director?.avatar || ''}
                          displayedName={entity.director?.fullName}
                          displayedCountry={entity.director?.country || undefined}
                          showTooltip={false}
                          variant="extended"
                        />
                      )}
                    </div>

                    {/* MUSIC */}
                    <div className="media-details__group">
                      <h3 className="media-details__title">
                        {t(`catalogEntity.${entityType}.music`)}
                      </h3>
                      {entity.music && (
                        <PersonCard
                          imgSrc={entity.music?.avatar || ''}
                          displayedName={entity.music?.fullName}
                          displayedCountry={entity.music?.country || undefined}
                          showTooltip={false}
                          variant="extended"
                        />
                      )}
                    </div>
                  </div>
                </aside>
              </div>
            )}
          </React.Fragment>
        ))}
      </section>

      {/* MODAL */}
      <ReviewModal
        mode={reviewModalMode}
        isOpen={isReviewModalOpen}
        initialValues={
          userReview
            ? {
                authorName: userReview.authorName,
                country: userReview.country ?? '',
                rating: userReview.rating,
                text: userReview.text,
              }
            : undefined
        }
        onClose={handleReviewModalClose}
        onSubmit={handleReviewSubmit}
        onDelete={userReview ? handleReviewDelete : undefined}
      />
    </>
  );
}
