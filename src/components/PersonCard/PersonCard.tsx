import './PersonCard.scss';
import clsx from 'clsx';

const FALLBACK_AVATAR = '/images/persons/default-avatar.jpg';

type PersonCardProps = {
  imgSrc: string;
  displayedName?: string;
  displayedCountry?: string;
  showTooltip?: boolean;
  variant?: 'default' | 'extended';
};

export default function PersonCard({
  imgSrc,
  displayedName,
  displayedCountry,
  showTooltip = true,
  variant = 'default',
}: PersonCardProps) {
  const needShowTooltip = showTooltip && variant !== 'extended';
  const tooltipText = [displayedName, displayedCountry].filter(Boolean).join(', ');

  return (
    <div
      className={`person-card person-card--${variant}`}
      data-tooltip={needShowTooltip && tooltipText ? tooltipText : undefined}
      tabIndex={0}
    >
      <img
        className="person-card__image"
        onError={event => {
          if (event.currentTarget.src.endsWith(FALLBACK_AVATAR)) return;
          event.currentTarget.src = FALLBACK_AVATAR;
        }}
        src={imgSrc}
        alt={displayedName ?? ''}
        loading="lazy"
      />
      <div className={`person-card__meta person-card__meta--${variant}`}>
        <span className="person-card__name">{displayedName}</span>
        {displayedCountry && <span className="person-card__country">{displayedCountry}</span>}
      </div>
    </div>
  );
}
