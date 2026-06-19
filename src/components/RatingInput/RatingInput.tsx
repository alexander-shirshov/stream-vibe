import './RatingInput.scss';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import RatingStars from '@/components/RatingStars';

type RatingInputProps = {
  value: number | null;
  onChange: (value: number) => void;
  ariaLabel: string;
  disabled?: boolean;
};

const MAX_RATING = 5;
const DESKTOP_STEP = 0.1;
const STEPPER_STEP = 0.1;
const MIN_RATING = 0.1;

function clampRating(value: number, step: number) {
  return Math.min(MAX_RATING, Math.max(step, value));
}

function normalizeRating(value: number) {
  return Number(clampRating(roundToStep(value, STEPPER_STEP), STEPPER_STEP).toFixed(1));
}

function roundToStep(value: number, step: number) {
  return Math.round(value / step) * step;
}

export default function RatingInput({ value, onChange, ariaLabel, disabled }: RatingInputProps) {
  const [previewValue, setPreviewValue] = useState<number | null>(null);

  const displayedValue = previewValue ?? value ?? 0;

  const [isLockedByStepper, setIsLockedByStepper] = useState(false);
  const [isStepperOpen, setIsStepperOpen] = useState(false);

  const valueRef = useRef(value);
  const holdRef = useRef<{ delayId: number | null; intervalId: number | null }>({
    delayId: null,
    intervalId: null,
  });

  function stopHold() {
    if (holdRef.current.delayId) {
      window.clearTimeout(holdRef.current.delayId);
    }

    if (holdRef.current.intervalId) {
      window.clearInterval(holdRef.current.intervalId);
    }

    holdRef.current.delayId = null;
    holdRef.current.intervalId = null;
  }

  function startHold(action: () => void) {
    stopHold();
    action();

    holdRef.current.delayId = window.setTimeout(() => {
      holdRef.current.intervalId = window.setInterval(action, 65);
    }, 260);
  }

  function updateRating(nextValue: number) {
    onChange(normalizeRating(nextValue));
    setPreviewValue(null);
  }

  function bumpRating(delta: number) {
    const currentValue = valueRef.current ?? MIN_RATING;
    const nextValue = normalizeRating(currentValue + delta);

    valueRef.current = nextValue;
    updateRating(nextValue);
  }

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

    setIsStepperOpen(false);
    updateRating(nextRating);
  }

  useEffect(() => {
    return stopHold;
  }, []);

  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  useEffect(() => {
    window.addEventListener('pointerup', stopHold);
    window.addEventListener('pointercancel', stopHold);

    return () => {
      window.removeEventListener('pointerup', stopHold);
      window.removeEventListener('pointercancel', stopHold);
    };
  }, []);

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

      <div className={clsx('rating-input__value-wrapper', isStepperOpen && 'is-open')}>
        <button
          className="rating-input__value"
          type="button"
          disabled={disabled}
          onClick={() => setIsStepperOpen(prev => !prev)}
          aria-expanded={isStepperOpen}
          aria-label="Edit rating value"
        >
          {displayedValue > 0 ? displayedValue.toFixed(1) : '—'}
        </button>

        <div className="rating-input__stepper" aria-hidden={!isStepperOpen}>
          <button
            className="rating-input__stepper-button"
            type="button"
            disabled={disabled}
            onPointerDown={event => {
              event.preventDefault();
              event.currentTarget.setPointerCapture(event.pointerId);
              startHold(() => bumpRating(STEPPER_STEP));
            }}
            onPointerUp={event => {
              event.currentTarget.releasePointerCapture(event.pointerId);
              stopHold();
            }}
            onPointerCancel={event => {
              event.currentTarget.releasePointerCapture(event.pointerId);
              stopHold();
            }}
            aria-label="Increase rating"
          >
            ▲
          </button>

          <button
            className="rating-input__stepper-button"
            type="button"
            disabled={disabled}
            onPointerDown={event => {
              event.preventDefault();
              event.currentTarget.setPointerCapture(event.pointerId);
              startHold(() => bumpRating(-STEPPER_STEP));
            }}
            onPointerUp={event => {
              event.currentTarget.releasePointerCapture(event.pointerId);
              stopHold();
            }}
            onPointerCancel={event => {
              event.currentTarget.releasePointerCapture(event.pointerId);
              stopHold();
            }}
            aria-label="Decrease rating"
          >
            ▼
          </button>
        </div>
      </div>
    </div>
  );
}
