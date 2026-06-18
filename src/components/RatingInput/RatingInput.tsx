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
const STEP = 0.5;

function clampRating(value: number) {
  return Math.min(MAX_RATING, Math.max(STEP, value));
}

function roundToStep(value: number) {
  return Math.round(value / STEP) * STEP;
}

export default function RatingInput({ value, onChange, ariaLabel, disabled }: RatingInputProps) {
  const [previewValue, setPreviewValue] = useState<number | null>(null);

  const displayedValue = previewValue ?? value ?? 0;

  function getRatingFromPointer(event: React.PointerEvent<HTMLButtonElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const ratio = x / rect.width;

    return clampRating(roundToStep(ratio * MAX_RATING));
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
        <RatingStars rating={displayedValue} ariaLabel={ariaLabel} />
      </button>

      <span className="rating-input__value" aria-live="polite">
        {value === null ? '—' : value.toFixed(1)}
      </span>
    </div>
  );
}
