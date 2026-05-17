import clsx from 'clsx';
import './ApproxConvertedPrice.scss';

type ApproxConvertedPriceProps = {
  formattedPrice: string;
  disclaimer?: string;
  showDivider?: boolean;
};

export default function ApproxConvertedPrice({
  formattedPrice,
  disclaimer,
  showDivider = false,
}: ApproxConvertedPriceProps) {
  const hasTooltip = Boolean(disclaimer);
  return (
    <div className="approx-price">
      {showDivider && <span className="approx-price__divider" aria-hidden="true"></span>}

      <span
        className={clsx(
          'approx-price__body',
          hasTooltip && 'tooltip tooltip--info tooltip--bottom-left'
        )}
        data-tooltip={hasTooltip ? disclaimer : undefined}
        tabIndex={disclaimer ? 0 : undefined}
      >
        <span className="approx-price__value">≈ {formattedPrice}</span>
        {Boolean(disclaimer) && (
          <span className="approx-price__hint" aria-hidden="true">
            ⓘ
          </span>
        )}
      </span>
    </div>
  );
}
