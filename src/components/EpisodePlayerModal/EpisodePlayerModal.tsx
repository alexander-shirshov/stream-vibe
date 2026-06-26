import './EpisodePlayerModal.scss';
import clsx from 'clsx';
import { useEffect, useMemo, useState } from 'react';

import type { Season } from '@/api/show/show.types';
import LinkButton from '@/components/Button';

type EpisodePlayerModalProps = {
  isOpen: boolean;
  seasons: Season[];
  seasonId: string;
  episodeId: string;
  onEpisodeChange: (seasonId: string, episodeId: string) => void;
  onClose: () => void;
};

export default function EpisodePlayerModal({
  isOpen,
  seasons,
  seasonId,
  episodeId,
  onEpisodeChange,
  onClose,
}: EpisodePlayerModalProps) {
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [isVideoLoading, setIsVideoLoading] = useState(true);

  const currentSeason = useMemo(
    () => seasons.find(season => season.id === seasonId) ?? seasons[0],
    [seasons, seasonId]
  );

  const currentEpisode = useMemo(() => {
    return (
      currentSeason?.episodes.find(episode => episode.id === episodeId) ??
      currentSeason?.episodes[0] ??
      null
    );
  }, [currentSeason, episodeId]);

  function handleAnimationEnd(event: React.AnimationEvent<HTMLDivElement>) {
    if (event.currentTarget !== event.target) return;

    if (!isOpen) {
      setShouldRender(false);
    }
  }

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!shouldRender) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [shouldRender, onClose]);

  useEffect(() => {
    if (!shouldRender) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = overflow;
    };
  }, [shouldRender]);

  useEffect(() => {
    setIsVideoLoading(true);
  }, [currentEpisode?.id]);

  if (!shouldRender || !currentSeason || !currentEpisode) return null;

  return (
    <div
      className={clsx(
        'modal',
        'modal--centered',
        'episode-player-modal',
        isOpen ? 'modal--open' : 'modal--closing'
      )}
      role="dialog"
      aria-modal="true"
      aria-label={currentEpisode.title}
      onAnimationEnd={handleAnimationEnd}
    >
      <div className="modal__overlay episode-player-modal__overlay" onClick={onClose} />

      <div className="modal__window episode-player-modal__window">
        <header className="episode-player-modal__header">
          <div>
            <h2 className="episode-player-modal__title h4">{currentEpisode.title}</h2>
            <p className="episode-player-modal__season">{currentSeason.title}</p>
          </div>

          <LinkButton
            customClass="modal__close episode-player-modal__close button--black-08"
            mode="button"
            type="button"
            onClick={onClose}
          >
            ×
          </LinkButton>
        </header>

        <div className="episode-player-modal__body">
          <aside className="episode-player-modal__playlist">
            <ul className="episode-player-modal__list">
              {currentSeason.episodes.map((episode, index) => {
                const isActive = episode.id === currentEpisode.id;

                return (
                  <li key={episode.id}>
                    <button
                      type="button"
                      className={clsx('episode-player-modal__episode', isActive && 'is-active')}
                      onClick={() => onEpisodeChange(currentSeason.id, episode.id)}
                    >
                      <span className="episode-player-modal__episode-number">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="episode-player-modal__episode-title">{episode.title}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </aside>

          <div className="episode-player-modal__video-wrapper">
            {isVideoLoading && (
              <div className="episode-player-modal__loader">
                <div className="episode-player-modal__spinner" />
              </div>
            )}

            <video
              key={currentEpisode.id}
              className={clsx('episode-player-modal__video', isVideoLoading && 'is-loading')}
              src={currentEpisode.video}
              controls
              autoPlay
              onCanPlay={() => setIsVideoLoading(false)}
              onPlaying={() => setIsVideoLoading(false)}
              onWaiting={() => setIsVideoLoading(true)}
              onLoadStart={() => setIsVideoLoading(true)}
              onError={() => setIsVideoLoading(false)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
