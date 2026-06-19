import './RatingInput.scss';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import RatingStars from '@/components/RatingStars';
import Chevron from '@/assets/icons/chevron-right.svg?react';

import { useLanguage } from '@/i18n/LanguageProvider';

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
  const { t } = useLanguage();

  const [previewValue, setPreviewValue] = useState<number | null>(null);

  const displayedValue = previewValue ?? value ?? 0;

  const [isLockedByStepper, setIsLockedByStepper] = useState(false);
  const [isStepperOpen, setIsStepperOpen] = useState(false);

  const [isValueEditing, setIsValueEditing] = useState(false);
  const [textValue, setTextValue] = useState('');

  const [activeStepperButton, setActiveStepperButton] = useState<'up' | 'down' | null>(null);

  const valueRef = useRef(value);
  const holdRef = useRef<{ delayId: number | null; intervalId: number | null }>({
    delayId: null,
    intervalId: null,
  });

  const autoCloseTimerRef = useRef<number | null>(null);

  function stopHold() {
    if (holdRef.current.delayId) {
      window.clearTimeout(holdRef.current.delayId);
    }

    if (holdRef.current.intervalId) {
      window.clearInterval(holdRef.current.intervalId);
    }

    holdRef.current.delayId = null;
    holdRef.current.intervalId = null;
    setActiveStepperButton(null);
  }

  function startHold(action: () => void, direction: 'up' | 'down') {
    stopHold();
    setActiveStepperButton(direction);
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
    setIsLockedByStepper(true);

    if (!isValueEditing) {
      scheduleStepperClose();
    }

    const currentValue = valueRef.current ?? MIN_RATING;
    const nextValue = normalizeRating(currentValue + delta);

    valueRef.current = nextValue;
    updateRating(nextValue);

    if (isValueEditing) {
      setTextValue(nextValue.toFixed(1));
    }
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
    if (disabled || isLockedByStepper) return;

    setPreviewValue(getRatingFromPointer(event));
  }

  function handlePointerLeave() {
    setPreviewValue(null);
  }

  function handleClick(event: React.PointerEvent<HTMLButtonElement>) {
    if (disabled) return;

    const nextRating = getRatingFromPointer(event);

    setIsStepperOpen(false);
    setIsValueEditing(false);
    setIsLockedByStepper(false);
    updateRating(nextRating);
  }

  function startValueEditing() {
    if (disabled) return;

    const currentValue = valueRef.current;

    scheduleStepperClose();

    setIsStepperOpen(true);
    setIsLockedByStepper(true);
    setIsValueEditing(true);
    setTextValue(currentValue ? currentValue.toFixed(1) : '');
  }

  function commitTextValue() {
    const normalizedText = textValue.replace(',', '.').trim();
    const currentValue = valueRef.current;

    if (normalizedText === '') {
      setIsValueEditing(false);
      setTextValue(currentValue ? currentValue.toFixed(1) : '');
      return;
    }

    const parsedValue = Number(normalizedText);

    if (Number.isFinite(parsedValue)) {
      const nextValue = normalizeRating(parsedValue);

      valueRef.current = nextValue;
      updateRating(nextValue);
    }

    setIsValueEditing(false);
  }

  function cancelTextEditing() {
    setIsValueEditing(false);

    const currentValue = valueRef.current;
    setTextValue(currentValue ? currentValue.toFixed(1) : '');
  }

  function scheduleStepperClose() {
    if (autoCloseTimerRef.current) {
      window.clearTimeout(autoCloseTimerRef.current);
    }

    autoCloseTimerRef.current = window.setTimeout(() => {
      setIsStepperOpen(false);
      setIsValueEditing(false);
    }, 2500);
  }

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

  useEffect(() => {
    return () => {
      stopHold();

      if (autoCloseTimerRef.current) {
        window.clearTimeout(autoCloseTimerRef.current);
      }
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
        {isValueEditing ? (
          <input
            className="rating-input__value rating-input__value--input"
            value={textValue}
            autoFocus
            inputMode="decimal"
            maxLength={4}
            onChange={event => {
              setTextValue(event.target.value.replace(/[^\d.,]/g, ''));
            }}
            onFocus={() => {
              if (autoCloseTimerRef.current) {
                window.clearTimeout(autoCloseTimerRef.current);
              }
            }}
            onBlur={commitTextValue}
            onKeyDown={event => {
              if (event.key === 'Enter') {
                event.preventDefault();
                commitTextValue();
                event.currentTarget.blur();
              }

              if (event.key === 'Escape') {
                event.preventDefault();
                cancelTextEditing();
                event.currentTarget.blur();
              }
            }}
          />
        ) : (
          <button
            className="rating-input__value"
            type="button"
            disabled={disabled}
            onClick={startValueEditing}
            onWheel={event => {
              event.preventDefault();
              bumpRating(event.deltaY < 0 ? STEPPER_STEP : -STEPPER_STEP);
            }}
            aria-expanded={isStepperOpen}
            aria-label={t('RatingInput.editRating')}
          >
            {displayedValue > 0 ? displayedValue.toFixed(1) : '—'}
          </button>
        )}

        <div className="rating-input__stepper" aria-hidden={!isStepperOpen}>
          <button
            className={clsx(
              'rating-input__stepper-button',
              activeStepperButton === 'up' && 'is-active'
            )}
            type="button"
            disabled={disabled}
            onPointerDown={event => {
              event.preventDefault();
              event.currentTarget.setPointerCapture(event.pointerId);
              startHold(() => bumpRating(STEPPER_STEP), 'up');
            }}
            onPointerUp={event => {
              if (event.currentTarget.hasPointerCapture(event.pointerId)) {
                event.currentTarget.releasePointerCapture(event.pointerId);
              }

              stopHold();
            }}
            onPointerCancel={event => {
              if (event.currentTarget.hasPointerCapture(event.pointerId)) {
                event.currentTarget.releasePointerCapture(event.pointerId);
              }

              stopHold();
            }}
            aria-label={t('RatingInput.increaseRating')}
          >
            <Chevron className="chevron-up" />
          </button>

          <button
            className={clsx(
              'rating-input__stepper-button',
              activeStepperButton === 'down' && 'is-active'
            )}
            type="button"
            disabled={disabled}
            onPointerDown={event => {
              event.preventDefault();
              event.currentTarget.setPointerCapture(event.pointerId);
              startHold(() => bumpRating(-STEPPER_STEP), 'down');
            }}
            onPointerUp={event => {
              if (event.currentTarget.hasPointerCapture(event.pointerId)) {
                event.currentTarget.releasePointerCapture(event.pointerId);
              }

              stopHold();
            }}
            onPointerCancel={event => {
              if (event.currentTarget.hasPointerCapture(event.pointerId)) {
                event.currentTarget.releasePointerCapture(event.pointerId);
              }

              stopHold();
            }}
            aria-label={t('RatingInput.decreaseRating')}
          >
            <Chevron className="chevron-down" />
          </button>
        </div>
      </div>
    </div>
  );
}
