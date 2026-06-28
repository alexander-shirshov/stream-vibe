import './EpisodePlayerModal.scss';
import clsx from 'clsx';
import { useEffect, useMemo, useState, useRef } from 'react';
import { useLanguage } from '@/i18n/LanguageProvider';

import type { Season } from '@/api/show/show.types';
import LinkButton from '@/components/Button';
import SoundToggleIcon from '@/components/MovieBannerCard/SoundToggleIcon';

import Play from '@/assets/icons/play.svg?react';
import Pause from '@/assets/icons/pause.svg?react';
import Next from '@/assets/icons/play-next.svg?react';
import Fullscreen from '@/assets/icons/fullscreen.svg?react';

type EpisodePlayerModalProps = {
  isOpen: boolean;
  seasons: Season[];
  seasonId: string;
  episodeId: string;
  onEpisodeChange: (seasonId: string, episodeId: string) => void;
  onClose: () => void;
};

const CONTROLS_HIDE_DELAY = 2200;
const CONTROLS_INTERACTIVE_DELAY = 220;

export default function EpisodePlayerModal({
  isOpen,
  seasons,
  seasonId,
  episodeId,
  onEpisodeChange,
  onClose,
}: EpisodePlayerModalProps) {
  const controlsTimerRef = useRef<number | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const shouldIgnoreNextTouchRef = useRef(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [areControlsVisible, setAreControlsVisible] = useState(true);
  const [areControlsInteractive, setAreControlsInteractive] = useState(true);

  const controlsInteractiveTimerRef = useRef<number | null>(null);

  const [shouldRender, setShouldRender] = useState(isOpen);
  const [isVideoLoading, setIsVideoLoading] = useState(true);

  const { t } = useLanguage();

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

  const currentEpisodeIndex =
    currentSeason?.episodes.findIndex(episode => episode.id === currentEpisode?.id) ?? -1;

  const prevEpisode =
    currentEpisodeIndex > 0 ? currentSeason.episodes[currentEpisodeIndex - 1] : null;

  const nextEpisode =
    currentEpisodeIndex >= 0 && currentEpisodeIndex < currentSeason.episodes.length - 1
      ? currentSeason.episodes[currentEpisodeIndex + 1]
      : null;

  function playEpisode(episodeId: string) {
    if (!currentSeason) return;

    onEpisodeChange(currentSeason.id, episodeId);
    showControlsTemporarily();
  }

  function playPrevEpisode() {
    if (!prevEpisode) return;
    playEpisode(prevEpisode.id);
  }

  function playNextEpisode() {
    if (!nextEpisode) return;
    playEpisode(nextEpisode.id);
  }

  function formatVideoTime(seconds: number) {
    if (!Number.isFinite(seconds)) return '0:00';

    const minutes = Math.floor(seconds / 60);
    const restSeconds = Math.floor(seconds % 60);

    return `${minutes}:${String(restSeconds).padStart(2, '0')}`;
  }

  async function togglePlay() {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      await video.play();
    } else {
      video.pause();
    }
  }

  function clearControlsInteractiveTimer() {
    if (controlsInteractiveTimerRef.current) {
      window.clearTimeout(controlsInteractiveTimerRef.current);
      controlsInteractiveTimerRef.current = null;
    }
  }

  function unlockControlsInteractivity() {
    clearControlsInteractiveTimer();

    controlsInteractiveTimerRef.current = window.setTimeout(() => {
      setAreControlsInteractive(true);
    }, CONTROLS_INTERACTIVE_DELAY);
  }

  function clearControlsTimer() {
    if (controlsTimerRef.current) {
      window.clearTimeout(controlsTimerRef.current);
      controlsTimerRef.current = null;
    }
  }

  function scheduleControlsHide() {
    clearControlsTimer();

    controlsTimerRef.current = window.setTimeout(() => {
      setAreControlsVisible(false);
    }, CONTROLS_HIDE_DELAY);
  }

  function showControlsTemporarily({ lockInteractivity = false } = {}) {
    setAreControlsVisible(true);

    if (lockInteractivity) {
      setAreControlsInteractive(false);
      unlockControlsInteractivity();
    } else {
      setAreControlsInteractive(true);
    }

    scheduleControlsHide();
  }

  function showControlsAlways() {
    clearControlsTimer();
    clearControlsInteractiveTimer();
    setAreControlsVisible(true);
    setAreControlsInteractive(true);
  }

  function toggleMuted() {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  }

  function handleSeek(event: React.ChangeEvent<HTMLInputElement>) {
    const video = videoRef.current;
    if (!video) return;

    const nextTime = Number(event.target.value);

    video.currentTime = nextTime;
    setCurrentTime(nextTime);
  }

  async function toggleFullscreen() {
    const videoWrapper = videoRef.current?.parentElement;
    if (!videoWrapper) return;

    if (!document.fullscreenElement) {
      await videoWrapper.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  }

  function handleAnimationEnd(event: React.AnimationEvent<HTMLDivElement>) {
    if (event.currentTarget !== event.target) return;

    if (!isOpen) {
      setShouldRender(false);
    }
  }

  async function handleVideoAreaPointerDown(event: React.PointerEvent<HTMLDivElement>) {
    const target = event.target as HTMLElement;

    if (target.closest('.episode-player-modal__controls, .episode-player-modal__center-controls')) {
      return;
    }

    if (event.pointerType === 'mouse') {
      await togglePlay();
      showControlsTemporarily();
      return;
    }

    if (!areControlsVisible) {
      shouldIgnoreNextTouchRef.current = true;
      showControlsTemporarily({ lockInteractivity: true });
      return;
    }

    await togglePlay();
    showControlsTemporarily();
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
    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(false);
  }, [currentEpisode?.id]);

  useEffect(() => {
    return () => {
      clearControlsTimer();
      clearControlsInteractiveTimer();
      shouldIgnoreNextTouchRef.current = false;
    };
  }, []);

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
                      onClick={() => playEpisode(episode.id)}
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

          <div
            className={clsx(
              'episode-player-modal__video-wrapper',
              areControlsVisible && 'is-controls-visible',
              areControlsInteractive && 'is-controls-interactive',
              isPlaying && 'is-playing'
            )}
            tabIndex={0}
            role="button"
            aria-label={isPlaying ? t('player.pauseButton') : t('player.playButton')}
            onPointerMove={event => {
              if (event.pointerType !== 'mouse') return;
              showControlsTemporarily();
            }}
            onMouseLeave={scheduleControlsHide}
            onPointerDown={handleVideoAreaPointerDown}
            onPointerUp={event => {
              if (event.pointerType === 'mouse') return;

              if (shouldIgnoreNextTouchRef.current) {
                event.preventDefault();
                event.stopPropagation();
                shouldIgnoreNextTouchRef.current = false;
              }
            }}
            onKeyDown={event => {
              if (event.code !== 'Space') return;

              event.preventDefault();
              togglePlay();
              showControlsTemporarily();
            }}
          >
            {isVideoLoading && (
              <div className="episode-player-modal__loader">
                <div className="episode-player-modal__spinner" />
              </div>
            )}

            <div
              className="episode-player-modal__center-controls"
              onPointerDown={event => event.stopPropagation()}
            >
              <button
                type="button"
                className="episode-player-modal__center-button"
                disabled={!prevEpisode}
                onClick={playPrevEpisode}
                aria-label="Previous episode"
              >
                <Next className="player-icon player-icon--center player-icon--prev" />
              </button>

              <button
                type="button"
                className="episode-player-modal__center-button episode-player-modal__center-button--main"
                onClick={togglePlay}
                aria-label={isPlaying ? t('player.pauseButton') : t('player.playButton')}
              >
                {isPlaying ? (
                  <Pause className="player-icon player-icon--center player-icon--pause" />
                ) : (
                  <Play className="player-icon player-icon--center player-icon--play" />
                )}
              </button>

              <button
                type="button"
                className="episode-player-modal__center-button"
                disabled={!nextEpisode}
                onClick={playNextEpisode}
                aria-label="Next episode"
              >
                <Next className="player-icon player-icon--center player-icon--next" />
              </button>
            </div>
            <video
              ref={videoRef}
              key={currentEpisode.id}
              className={clsx('episode-player-modal__video', isVideoLoading && 'is-loading')}
              src={currentEpisode.video}
              autoPlay
              onPlay={() => {
                setIsPlaying(true);
                showControlsTemporarily();
              }}
              onPause={() => {
                setIsPlaying(false);
                showControlsAlways();
              }}
              onTimeUpdate={event => setCurrentTime(event.currentTarget.currentTime)}
              onLoadedMetadata={event => setDuration(event.currentTarget.duration)}
              onCanPlay={() => setIsVideoLoading(false)}
              onPlaying={() => setIsVideoLoading(false)}
              onWaiting={() => setIsVideoLoading(true)}
              onLoadStart={() => setIsVideoLoading(true)}
              onError={() => setIsVideoLoading(false)}
            />
            <div
              className="episode-player-modal__controls"
              onPointerDown={event => event.stopPropagation()}
            >
              <div className="episode-player-modal__progress-wrapper">
                <input
                  className="episode-player-modal__progress"
                  type="range"
                  min={0}
                  max={duration || 0}
                  step={0.1}
                  value={currentTime}
                  onChange={handleSeek}
                  style={
                    {
                      '--progressPercent': `${duration ? (currentTime / duration) * 100 : 0}%`,
                    } as React.CSSProperties
                  }
                  aria-label="Video progress"
                />
              </div>

              <div className="episode-player-modal__controls-row">
                <button
                  type="button"
                  className="episode-player-modal__control-button"
                  onClick={togglePlay}
                >
                  {isPlaying ? '❚❚' : '▶'}
                </button>

                <span className="episode-player-modal__time">
                  {formatVideoTime(currentTime)} / {formatVideoTime(duration)}
                </span>

                <button
                  type="button"
                  className="episode-player-modal__control-button"
                  onClick={toggleMuted}
                >
                  <SoundToggleIcon muted={isMuted} />
                </button>

                <button
                  type="button"
                  className="episode-player-modal__control-button"
                  onClick={toggleFullscreen}
                >
                  <Fullscreen className="player-icon player-icon--fullscreen" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
