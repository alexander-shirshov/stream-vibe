import './MovieDetails.scss';

import React from 'react';
import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import { CURRENT_USER_ID } from '@/constants/user';

import { Helmet } from 'react-helmet-async';
import { getTitle } from '@/utils/seo';
import { useLanguage } from '@/i18n/LanguageProvider';
import { useMovie } from '@/hooks/useMovie';
import { useUserState } from '@/hooks/useUserState';

import Plus from '@/assets/icons/plus.svg?react';
import Calendar from '@/assets/icons/calendar.svg?react';
import Lang from '@/assets/icons/lang.svg?react';
import Star from '@/assets/icons/star.svg?react';
import Tiles from '@/assets/icons/tiles.svg?react';

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

export default function MovieDetails() {
  const castPrevRef = useRef<HTMLButtonElement>(null);
  const castNextRef = useRef<HTMLButtonElement>(null);

  const reviewsPrevRef = useRef<HTMLButtonElement>(null);
  const reviewsNextRef = useRef<HTMLButtonElement>(null);
  const reviewsPaginationRef = useRef<HTMLDivElement>(null);

  const [isCastLocked, setIsCastLocked] = useState(true);
  const [isReviewsLocked, setIsReviewsLocked] = useState(true);

  const { t, language } = useLanguage();
  const { slug } = useParams();
  const { movie, isInitialLoading, error } = useMovie(language, slug);
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
  } = useUserState(CURRENT_USER_ID);

  const isInitialPageLoading = isInitialLoading || (isUserStateLoading && !userState);

  const titleId = 'movie-banner-title';
  const entityLabel = t(`catalogEntity.movie.title`);

  const title = getTitle(movie?.title || '', entityLabel);

  const getDisplayedCountry = (country: string | null): string | undefined => {
    if (!country) return undefined;
    return language === 'en' ? `From ${country}` : country;
  };

  if (isInitialPageLoading)
    return (
      <>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={t('catalogEntity.movie.meta')} />
        </Helmet>
        <CatalogSectionSkeleton variant="banner" />
        {/* <DetailsBlockSkeleton /> */}
      </>
    );

  if (error || !movie) {
    return null;
  }

  if (userStateError || !userState) {
    return null;
  }

  const detailsPanels = [
    {
      id: 'description',
      node: (
        <InfoPanel
          className="details-block__main-item"
          title={t('catalogEntity.movie.description')}
        >
          {<p className="movie-details__description">{movie.description}</p>}
        </InfoPanel>
      ),
    },
    {
      id: 'cast',
      node: (
        <InfoPanel
          className="details-block__main-item"
          title={t('catalogEntity.movie.cast')}
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
            {movie.cast.map(actor => {
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
          title={t('catalogEntity.movie.reviews')}
          headerActions={
            <LinkButton mode="button" customClass="button--black-08 button--review">
              <div className="movie-details__action">
                <div className="movie-details__action-icon-wrapper">
                  <Plus className="movie-details__action-icon" />
                </div>

                <p className="movie-details__action-text">{t('catalogEntity.movie.addReview')}</p>
              </div>
            </LinkButton>
          }
          bottomActions={
            <div className="movie-details__navigation">
              <SliderNavigation
                prevRef={reviewsPrevRef}
                nextRef={reviewsNextRef}
                paginationRef={reviewsPaginationRef}
                hasPagination={true}
                className={isReviewsLocked ? 'visually-hidden' : undefined}
                variant="round"
              />
            </div>
          }
        >
          <div className="movie-details__reviews">
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
              {movie.reviews.map(review => (
                <ReviewCard
                  name={review.authorName}
                  ratingValue={review.rating}
                  text={review.text}
                  country={review.country}
                  key={review.id}
                ></ReviewCard>
              ))}
            </Slider>
          </div>
        </InfoPanel>
      ),
    },
  ].filter(Boolean);

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={t('catalogEntity.movie.meta')} />
      </Helmet>
      <section className="movies-banner container" aria-labelledby={titleId}>
        <h1 className="visually-hidden" id={titleId}>
          {movie.title}
        </h1>
        <MovieBannerCard
          title={movie.title}
          description={movie.description}
          images={[movie.preview]}
          liked={isLiked(movie.id)}
          added={isInPlaylist(movie.id)}
          isMuted={isMuted}
          onLikeToggle={() => handleToggleLike(movie.id)}
          onPlaylistToggle={() => handleTogglePlaylist(movie.id)}
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
                  <div className="movie-details__groups">
                    {/* RELEASE */}
                    <div className="movie-details__group">
                      <h3 className="movie-details__title">
                        <Calendar />
                        <span>{t('catalogEntity.movie.release')}</span>
                      </h3>
                      <div className="movie-details__description">
                        <span className="h6">{movie.releaseDate}</span>
                      </div>
                    </div>

                    {/* LANGS */}
                    <div className="movie-details__group">
                      <h3 className="movie-details__title">
                        <Lang />
                        <span>{t('catalogEntity.movie.languages')}</span>
                      </h3>
                      <Tags tags={movie.languages} />
                    </div>

                    {/* RATINGS */}
                    <div className="movie-details__group">
                      <h3 className="movie-details__title">
                        <Star />
                        <span>{t('catalogEntity.movie.ratings')}</span>
                      </h3>
                      <Ratings ratings={movie.ratings} />
                    </div>

                    {/* GENRES */}
                    <div className="movie-details__group">
                      <h3 className="movie-details__title">
                        <Tiles />
                        <span>{t('catalogEntity.movie.genres')}</span>
                      </h3>
                      <Tags tags={movie.genres} />
                    </div>

                    {/* DIRECTOR */}
                    <div className="movie-details__group">
                      <h3 className="movie-details__title">{t('catalogEntity.movie.director')}</h3>
                      {movie.director && (
                        <PersonCard
                          imgSrc={movie.director?.avatar || ''}
                          displayedName={movie.director?.fullName}
                          displayedCountry={movie.director?.country || undefined}
                          showTooltip={false}
                          variant="extended"
                        />
                      )}
                    </div>

                    {/* MUSIC */}
                    <div className="movie-details__group">
                      <h3 className="movie-details__title">{t('catalogEntity.movie.music')}</h3>
                      {movie.music && (
                        <PersonCard
                          imgSrc={movie.music?.avatar || ''}
                          displayedName={movie.music?.fullName}
                          displayedCountry={movie.music?.country || undefined}
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
    </>
  );
}
