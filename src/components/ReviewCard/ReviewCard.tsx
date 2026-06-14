import './ReviewCard.scss';
import { useLanguage } from '@/i18n/LanguageProvider';
import Badge from '@/components/Badge';
import RatingStars from '@/components/RatingStars';

type ReviewCardProps = {
  name: string;
  country: string | null;
  text: string;
  ratingValue: number | null;
};

export default function ReviewCard({ name, country, text, ratingValue }: ReviewCardProps) {
  const { t, language } = useLanguage();
  const displayedCountry = country ? (language === 'en' ? `From ${country}` : country) : 'null';

  return (
    <div className="review-card">
      <header className="review-card__header">
        <div className="review-card__author">
          <h4 className="review-card__name h6">{name}</h4>
          {country && <p className="review-card__country">{displayedCountry}</p>}
        </div>

        {ratingValue !== null && (
          <Badge>
            <RatingStars
              rating={ratingValue}
              ariaLabel={t('catalogEntity.movie.rating')}
            ></RatingStars>
          </Badge>
        )}
      </header>

      <div className="review-card__body">
        <p>{text}</p>
      </div>
    </div>
  );
}
