import './MovieBannerCard.scss';
import { useEffect, useRef, useState } from 'react';
import Play from '@/assets/icons/play.svg?react';
import Plus from '@/assets/icons/plus.svg?react';
import Like from '@/assets/icons/like.svg?react';
import Checkmark from '@/assets/icons/checkmark.svg?react';
import LinkButton from '@/components/Button';
import SoundToggleIcon from '@/components/MovieBannerCard/SoundToggleIcon';
import lottie from 'lottie-web';
import type { AnimationItem } from 'lottie-web';
import type { CatalogItem } from '@/api/catalog/catalog.types';

import clsx from 'clsx';

import animationData from '@/assets/animations/animated_like_icon_dark_v5.json';

import { useLanguage } from '@/i18n/LanguageProvider';

type MovieBannerCardProps = Pick<CatalogItem, 'title' | 'description' | 'images'> & {
  liked: boolean;
  added: boolean;
  isMuted: boolean;
  onLikeToggle: () => void;
  onPlaylistToggle: () => void;
  onMuteToggle: () => void;
};

export default function MovieBannerCard({
  title,
  description,
  images,
  liked,
  added,
  isMuted,
  onLikeToggle,
  onPlaylistToggle,
  onMuteToggle,
}: MovieBannerCardProps) {
  const { t } = useLanguage();

  const [isLikeAnimationVisible, setIsLikeAnimationVisible] = useState(false);

  const likeAnimationContainerRef = useRef<HTMLDivElement>(null);
  const likeAnimationRef = useRef<AnimationItem | null>(null);
  const isLikeAnimatingRef = useRef(false);

  const likedRef = useRef(liked);

  useEffect(() => {
    likedRef.current = liked;
  }, [liked]);

  useEffect(() => {
    if (!likeAnimationContainerRef.current) return;

    const animation = lottie.loadAnimation({
      container: likeAnimationContainerRef.current,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      animationData,
    });

    animation.goToAndStop(0, true);

    const handleComplete = () => {
      isLikeAnimatingRef.current = false;

      if (likedRef.current) {
        animation.goToAndStop(60, true);
        setIsLikeAnimationVisible(true);
      }
    };

    animation.addEventListener('complete', handleComplete);

    likeAnimationRef.current = animation;

    return () => {
      animation.removeEventListener('complete', handleComplete);
      animation.destroy();
      likeAnimationRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!likeAnimationRef.current) return;
    if (isLikeAnimatingRef.current) return;

    if (liked) {
      likeAnimationRef.current.goToAndStop(60, true);
      setIsLikeAnimationVisible(true);
    } else {
      likeAnimationRef.current.goToAndStop(0, true);
      setIsLikeAnimationVisible(false);
    }
  }, [liked]);

  function handleLikeClick() {
    if (!liked) {
      setIsLikeAnimationVisible(true);
      isLikeAnimatingRef.current = true;
      likeAnimationRef.current?.goToAndStop(0, true);
      likeAnimationRef.current?.playSegments([0, 60], true);
    } else {
      isLikeAnimatingRef.current = false;
      likeAnimationRef.current?.goToAndStop(0, true);
      setIsLikeAnimationVisible(false);
    }

    onLikeToggle();
  }

  function handlePlaylistClick() {
    onPlaylistToggle();
  }

  function handleMuteClick() {
    onMuteToggle();
  }

  if (!images) return null;

  return (
    <div className="movie-banner-card">
      {images.map(image => (
        <img key={image} className="movie-banner-card__image" src={image} loading="lazy" alt="" />
      ))}

      <div className="movie-banner-card__inner">
        <div className="movie-banner-card__body">
          <h2 className="movie-banner-card__title h3">{title}</h2>
          <div className="movie-banner-card__description">
            <p>{description}</p>
          </div>
        </div>
        <footer className="movie-banner-card__footer">
          <LinkButton mode="button" customClass="movie-banner-card__play">
            <div className="movie-banner-card__cta">
              <Play />
              <p>{t('catalogPage.cta')}</p>
            </div>
          </LinkButton>
          <div className="movie-banner-card__actions">
            <LinkButton
              mode="button"
              customClass="button--black-06 button--movies-actions"
              ariaLabel={t('catalogPage.actions.add')}
              onClick={handlePlaylistClick}
            >
              <span className={clsx('movie-banner-card__playlist-icon', added && 'is-added')}>
                <Plus className="movie-banner-card__playlist-icon-plus" />
                <Checkmark className="movie-banner-card__playlist-icon-check" />
              </span>
            </LinkButton>
            <LinkButton
              mode="button"
              customClass="button--black-06 button--movies-actions"
              ariaLabel={t('catalogPage.actions.like')}
              onClick={handleLikeClick}
            >
              <span className="movie-banner-card__like">
                {!liked && <Like className="movie-banner-card__icon" />}

                <span
                  ref={likeAnimationContainerRef}
                  className={clsx(
                    'movie-banner-card__like-animation',
                    isLikeAnimationVisible && 'movie-banner-card__like-animation--visible'
                  )}
                  aria-hidden="true"
                />
              </span>
            </LinkButton>
            <LinkButton
              mode="button"
              customClass="button--black-06 button--movies-actions"
              ariaLabel={t('catalogPage.actions.sound')}
              onClick={handleMuteClick}
            >
              <SoundToggleIcon muted={isMuted} />
            </LinkButton>
          </div>
        </footer>
      </div>
    </div>
  );
}
