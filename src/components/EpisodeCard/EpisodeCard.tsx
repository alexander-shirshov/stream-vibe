import './EpisodeCard.scss';
import { useRef, useState } from 'react';

import type { Episode } from '@/api/show/show.types';

import { useLanguage } from '@/i18n/LanguageProvider';
import { formatDuration } from '@/utils/formatters';

import PlayCircle from '@/assets/icons/play-circle.svg?react';
import Clock from '@/assets/icons/clock.svg?react';
import clsx from 'clsx';

type EpisodeProps = Episode & {
  number: number;
};

const FALLBACK_PREVIEW = '/images/shows/default-episode-preview.jpg';

export default function EpisodeCard({
  title,
  description,
  durationMinutes,
  preview,
  video,
  number,
}: EpisodeProps) {
  const { t } = useLanguage();

  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPreviewVisible, setIsPreviewVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [isClicked, setIsClicked] = useState(false);

  const duration = formatDuration(
    durationMinutes,
    {
      hours: t('CatalogItemCard.durationHours'),
      minutes: t('CatalogItemCard.durationMinutes'),
    },
    ' '
  );

  const handlePlay = async () => {
    const videoElement = videoRef.current;

    if (!videoElement) return;

    setIsClicked(false);

    requestAnimationFrame(() => {
      setIsClicked(true);
    });

    setIsLoading(true);

    try {
      await videoElement.play();
    } catch {
      setIsLoading(false);
    }
  };

  return (
    <div className="episode-card">
      <div className="episode-card__number">{number}</div>
      <div className={clsx('episode-card__player', isPreviewVisible && 'is-preview-visible')}>
        <video
          ref={videoRef}
          src={video}
          className="episode-card__video"
          width={172}
          height={118}
          onWaiting={() => setIsLoading(true)}
          onPlaying={() => {
            setIsLoading(false);
            setIsPreviewVisible(false);
          }}
          onPause={() => {
            setIsLoading(false);
            setIsPreviewVisible(true);
          }}
          onEnded={() => {
            setIsLoading(false);
            setIsPreviewVisible(true);
          }}
          onError={() => {
            setIsLoading(false);
            setIsPreviewVisible(true);
          }}
        />
        {isPreviewVisible && (
          <img
            src={preview}
            className="episode-card__preview"
            alt=""
            onError={e => {
              if (e.currentTarget.src.endsWith(FALLBACK_PREVIEW)) return;
              e.currentTarget.src = FALLBACK_PREVIEW;
            }}
          />
        )}

        {isLoading && <div className="episode-card__spinner" />}

        {isPreviewVisible && !isLoading && (
          <button
            type="button"
            className={clsx('episode-card__play-button', isClicked && 'is-clicked')}
            aria-label={t('player.playButton')}
            title={t('player.playButton')}
            onClick={handlePlay}
            onAnimationEnd={() => setIsClicked(false)}
          >
            <PlayCircle className="episode-card__play-button-icon" />
          </button>
        )}
      </div>
      <div className="episode-card__body">
        <div className="episode-card__info">
          <h4 className="episode-card__title h6">{title}</h4>
          <div className="episode-card__duration">
            <Clock />
            <span>{duration}</span>
          </div>
        </div>
        <div className="episode-card__description hidden-mobile">
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}
