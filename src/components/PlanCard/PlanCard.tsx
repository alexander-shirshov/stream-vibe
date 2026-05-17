import './PlanCard.scss';
import LinkButton from '@/components/Button';
import { useLanguage } from '@/i18n/LanguageProvider';
import type { ButtonNavLink } from '@/constants/navConfig';
import { type Messages, getLocale, getApproxCurrency } from '@/i18n/types';
import type { Currency } from '@/constants/currencies';
import { formatMoney, convertPrice } from '@/utils/money';
import { useExchangeRates } from '@/hooks/useExchangeRates';
import ApproxConvertedPrice from '@/components/ApproxConvertedPrice';

type PriceItem = {
  value: number;
  currency: Currency;
  period: keyof Messages['plans']['periods'];
};

export type PlanCardData = {
  itemKey: keyof Messages['plans']['items'];
  price: PriceItem;
};

type PlanCardProps = PlanCardData & {
  showApproxPrice?: boolean;
};

const planLink: ButtonNavLink = { route: 'subscriptions' };

export default function PlanCard({ itemKey, price, showApproxPrice }: PlanCardProps) {
  const { t, language } = useLanguage();
  const { rates, isLoading, error } = useExchangeRates();

  const locale = getLocale(language);
  const formattedSum = formatMoney(price.value, price.currency, locale);
  const approxCurrency = getApproxCurrency(language);
  const rate = approxCurrency ? rates?.[approxCurrency] : null;

  const shouldShowApproxPrice =
    Boolean(showApproxPrice) && !isLoading && !error && approxCurrency && rate != null;

  const approxPrice =
    shouldShowApproxPrice && approxCurrency && rate != null
      ? formatMoney(convertPrice(price.value, rate), approxCurrency, locale)
      : null;

  return (
    <div className="plan-card">
      <div className="plan-card__info">
        <h3 className="plan-card__title h4">{t(`plans.items.${itemKey}.title`)}</h3>
        <div className="plan-card__description">
          <p>{t(`plans.items.${itemKey}.descr`)}</p>
        </div>
      </div>
      <div className="plan-card__pricing">
        <div className="plan-card__conditions">
          <span className="plan-card__price">{formattedSum}</span>
          <span className="plan-card__period">/{t(`plans.periods.${price.period}`)}</span>
        </div>
        {approxPrice && (
          <ApproxConvertedPrice
            formattedPrice={approxPrice}
            disclaimer={t('plans.approxPriceDisclaimer')}
            showDivider
          />
        )}
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
