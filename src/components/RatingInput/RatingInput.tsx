import './RatingInput.scss';
import { useState } from 'react';
import RatingStars from '@/components/RatingStars';

type RatingInputProps = {
  value: number | null;
  onChange: (value: number) => void;
  ariaLabel: string;
  disabled?: boolean;
};

const MAX_RATING = 5;
const DESKTOP_STEP = 0.1;
const TOUCH_STEP = 1;

function clampRating(value: number, step: number) {
  return Math.min(MAX_RATING, Math.max(step, value));
}

function roundToStep(value: number, step: number) {
  return Math.round(value / step) * step;
}

function getStep(event: React.PointerEvent) {
  return event.pointerType === 'mouse' ? DESKTOP_STEP : TOUCH_STEP;
}

export default function RatingInput({ value, onChange, ariaLabel, disabled }: RatingInputProps) {
  const [previewValue, setPreviewValue] = useState<number | null>(null);

  const displayedValue = previewValue ?? value ?? 0;

  const [isLockedByStepper, setIsLockedByStepper] = useState(false);

  function getRatingFromPointer(event: React.PointerEvent<HTMLButtonElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = Math.min(Math.max(event.clientX - rect.left, 0), rect.width);
    const ratio = x / rect.width;

    if (event.pointerType !== 'mouse') {
      return Math.min(MAX_RATING, Math.max(1, Math.ceil(ratio * MAX_RATING)));
    }

    return clampRating(roundToStep(ratio * MAX_RATING, DESKTOP_STEP), DESKTOP_STEP);
  }

  function handlePointerMove(event: React.PointerEvent<HTMLButtonElement>) {
    if (disabled) return;

    setPreviewValue(getRatingFromPointer(event));
  }

  function handlePointerLeave() {
    setPreviewValue(null);
  }

  function handleClick(event: React.PointerEvent<HTMLButtonElement>) {
    if (disabled) return;

    const nextRating = getRatingFromPointer(event);

    onChange(nextRating);
    setPreviewValue(null);
  }

  return (
    <div className="rating-input">
      <button
        className="rating-input__stars"
        type="button"
        disabled={disabled}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onPointerDown={handleClick}
        aria-label={ariaLabel}
      >
        <RatingStars rating={displayedValue} ariaLabel={ariaLabel} variant="large" />
      </button>

      <span className="rating-input__value" aria-live="polite">
        {displayedValue > 0 ? displayedValue.toFixed(1) : '—'}
      </span>
    </div>
  );
}
