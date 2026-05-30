import './SoundToggleIcon.scss';
import clsx from 'clsx';

type SoundToggleIconProps = {
  muted: boolean;
  className?: string;
};

export function SoundToggleIcon({ muted, className }: SoundToggleIconProps) {
  return (
    <span className={clsx('movie-banner-card__sound-icon', muted && 'is-muted', className)}>
      <svg viewBox="2.5 2.5 19 19" fill="none" aria-hidden="true">
        <path
          className="movie-banner-card__sound-speaker"
          d="M4 9.5H7L13 4.5V19.5L7 14.5H4C3.4 14.5 3 14.1 3 13.5V10.5C3 9.9 3.4 9.5 4 9.5Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <path
          className="movie-banner-card__sound-wave movie-banner-card__sound-wave--inner"
          d="M16 9C17.2 10.2 17.2 13.8 16 15"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        <path
          className="movie-banner-card__sound-wave movie-banner-card__sound-wave--outer"
          d="M18.5 6.5C21.5 9.5 21.5 14.5 18.5 17.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        <path
          className="movie-banner-card__sound-mute-line movie-banner-card__sound-mute-line--first"
          d="M17 9L22 14"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        <path
          className="movie-banner-card__sound-mute-line movie-banner-card__sound-mute-line--second"
          d="M22 9L17 14"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}
