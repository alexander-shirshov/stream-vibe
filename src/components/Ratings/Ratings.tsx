import './Ratings.scss';
import type { RatingItem } from '@/api/movie/movie.types';
import RatingStars from '@/components/RatingStars';

type RatingsProps = {
  ratings: RatingItem[];
};

export default function Ratings({ ratings }: RatingsProps) {
  const validRatings = ratings.filter(item => item.rating !== null);

  if (validRatings.length === 0) return null;

  return (
    <div className="ratings">
      <ul className="ratings__list">
        {ratings.map(rating => (
          <li className="ratings__item" key={rating.platform}>
            {rating.rating !== null && (
              <>
                <h4 className="ratings__platform">{rating.platform}</h4>
                <RatingStars rating={rating.rating} label={String(rating.rating)} />
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
