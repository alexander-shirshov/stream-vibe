import './PlanCard.scss';
import LinkButton from '@/components/Button';
import { useLanguage } from '@/i18n/LanguageProvider';
import type { ButtonNavLink } from '@/constants/navConfig';
import type { Messages } from '@/i18n/types';
import type { Currencies } from '@/constants/currencies';

type PriceItem = {
  value: number;
  currency: Currencies;
  period: keyof Messages['plans']['periods'];
};

export type PlanCardProps = {
  itemKey: keyof Messages['plans']['items'];
  price: PriceItem;
};

const planLink: ButtonNavLink = { route: 'subscriptions' };

export default function PlanCard({ itemKey, price }: PlanCardProps) {
  const { t } = useLanguage();

  return (
    <div className="plan-card">
      <div className="plan-card__info">
        <h3 className="plan-card__title h4">{t(`plans.items.${itemKey}.title`)}</h3>
        <div className="plan-card__description">
          <p>{t(`plans.items.${itemKey}.descr`)}</p>
        </div>
      </div>
      <div className="plan-card__conditions">
        <span className="plan-card__price">{price.currency + price.value.toFixed(2)}</span>
        <span className="plan-card__period">/{t(`plans.periods.${price.period}`)}</span>
      </div>
      <div className="plan-card__actions">
        <LinkButton mode="link" link={planLink} customClass="button button--black-08">
          {t('plans.secondaryAction')}
        </LinkButton>
        <LinkButton mode="link" link={planLink} customClass="button">
          {t('plans.mainAction')}
        </LinkButton>
      </div>
    </div>
  );
}
