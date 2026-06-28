import './EpisodeCard.scss';
import { useState } from 'react';

import type { Episode } from '@/api/show/show.types';

import { useLanguage } from '@/i18n/LanguageProvider';
import { formatDuration } from '@/utils/formatters';

import PlayCircle from '@/assets/icons/play-circle.svg?react';
import Clock from '@/assets/icons/clock.svg?react';
import clsx from 'clsx';

type EpisodeProps = Episode & {
  number: number;
  onPlay: () => void;
};

const FALLBACK_PREVIEW = '/images/shows/default-episode-preview.jpg';
const CLICK_ANIMATION_DELAY = 140;

export default function EpisodeCard({
  title,
  description,
  durationMinutes,
  preview,
  number,
  onPlay,
}: EpisodeProps) {
  const { t } = useLanguage();

  const [isClicked, setIsClicked] = useState(false);

  const duration = formatDuration(
    durationMinutes,
    {
      hours: t('CatalogItemCard.durationHours'),
      minutes: t('CatalogItemCard.durationMinutes'),
    },
    ' '
  );
  function handlePlayClick() {
    setIsClicked(false);

    requestAnimationFrame(() => {
      setIsClicked(true);
    });

    window.setTimeout(() => {
      onPlay();
    }, CLICK_ANIMATION_DELAY);
  }

  return (
    <button
      type="button"
      className="episode-card"
      onClick={handlePlayClick}
      aria-label={`${t('player.playButton')}: ${title}`}
    >
      <div className="episode-card__number">{number}</div>
      <div className={clsx('episode-card__player', 'is-preview-visible')}>
        <img
          src={preview}
          className="episode-card__preview"
          alt=""
          onError={e => {
            if (e.currentTarget.src.endsWith(FALLBACK_PREVIEW)) return;
            e.currentTarget.src = FALLBACK_PREVIEW;
          }}
        />
        <span
          className={clsx('episode-card__play-button', isClicked && 'is-clicked')}
          aria-hidden={true}
          onAnimationEnd={() => setIsClicked(false)}
        >
          <PlayCircle className="episode-card__play-button-icon" />
        </span>
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
    </button>
  );
}
