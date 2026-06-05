import './RatingStars.scss';

type RatingStarsProps = {
  rating: number;
  label?: string;
  ariaLabel?: string;
};

export default function RatingStars({ rating, label, ariaLabel }: RatingStarsProps) {
  const safeRating = Math.min(5, Math.max(0, rating));

  return (
    <div
      className="rating-stars"
      style={
        {
          '--ratingStarsValue': safeRating,
        } as React.CSSProperties
      }
      title={ariaLabel}
      aria-label={`${ariaLabel}: ${safeRating}`}
    >
      <div className="rating-stars__indicator">
        <img
          className="rating-stars__indicator-unfilled"
          src="/rating/stars-unfilled.svg"
          width={98}
          height={18}
          alt=""
          aria-hidden="true"
        />
        <span className="rating-stars__indicator-filled-wrapper">
          <img
            className="rating-stars__indicator-filled"
            src="/rating/stars-filled.svg"
            width={98}
            height={18}
            alt=""
            aria-hidden="true"
          />
        </span>
      </div>
      {label && <div className="rating-stars__label">{label}</div>}
    </div>
  );
}
