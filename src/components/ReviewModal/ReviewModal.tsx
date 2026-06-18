import './ReviewModal.scss';
import { useMemo, useState, useEffect, useCallback } from 'react';
import clsx from 'clsx';

import RatingInput from '@/components/RatingInput';
import LinkButton from '@/components/Button';
import FormLabel from '@/components/FormLabel';

import { useLanguage } from '@/i18n/LanguageProvider';

type ReviewModalMode = 'create' | 'edit' | 'read';

export type ReviewFormValues = {
  authorName: string;
  country: string;
  rating: number | null;
  text: string;
};

type ReviewModalProps = {
  mode: ReviewModalMode;
  isOpen: boolean;
  initialValues?: Partial<ReviewFormValues>;
  onClose: () => void;
  onSubmit?: (values: ReviewFormValues) => Promise<void> | void;
  onDelete?: () => Promise<void> | void;
};

const MIN_NAME_LENGTH = 2;
const MIN_REVIEW_LENGTH = 10;
const MAX_REVIEW_LENGTH = 800;

export default function ReviewModal({
  mode,
  isOpen,
  initialValues,
  onClose,
  onSubmit,
  onDelete,
}: ReviewModalProps) {
  const isReadMode = mode === 'read';

  const [authorName, setAuthorName] = useState(initialValues?.authorName ?? '');
  const [country, setCountry] = useState(initialValues?.country ?? '');
  const [rating, setRating] = useState<number | null>(initialValues?.rating ?? null);
  const [text, setText] = useState(initialValues?.text ?? '');
  const [isDeleteConfirmVisible, setIsDeleteConfirmVisible] = useState(false);

  const trimmedName = authorName.trim();
  const trimmedText = text.trim();

  const isNameValid = trimmedName.length >= MIN_NAME_LENGTH && /\p{L}/u.test(trimmedName);
  const isTextValid =
    trimmedText.length >= MIN_REVIEW_LENGTH && trimmedText.length <= MAX_REVIEW_LENGTH;
  const isRatingValid = rating !== null && rating > 0 && rating <= 5;

  const canSubmit = isNameValid && isTextValid && isRatingValid;

  const { t } = useLanguage();

  const title = useMemo(() => {
    if (mode === 'create') return t('catalogEntity.reviewModal.titleAdd');
    if (mode === 'edit') return t('catalogEntity.reviewModal.titleEdit');
    return 'Review';
  }, [mode, t]);

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!canSubmit || isReadMode) return;

    await onSubmit?.({
      authorName: trimmedName,
      country: country.trim(),
      rating,
      text: trimmedText,
    });
  }

  const resetForm = useCallback(() => {
    setAuthorName(initialValues?.authorName ?? '');
    setCountry(initialValues?.country ?? '');
    setRating(initialValues?.rating ?? null);
    setText(initialValues?.text ?? '');
    setIsDeleteConfirmVisible(false);
  }, [
    initialValues?.authorName,
    initialValues?.country,
    initialValues?.rating,
    initialValues?.text,
  ]);

  const handleClose = useCallback(() => {
    resetForm();
    onClose();
  }, [resetForm, onClose]);

  async function handleDeleteClick() {
    await onDelete?.();
    setIsDeleteConfirmVisible(false);
  }

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isDeleteConfirmVisible) {
          setIsDeleteConfirmVisible(false);
          return;
        }
        handleClose();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleClose, isOpen, isDeleteConfirmVisible]);

  useEffect(() => {
    if (!isOpen) return;

    const { overflow } = document.body.style;

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = overflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    resetForm();
  }, [isOpen, resetForm]);

  if (!isOpen) return null;

  return (
    <div
      className={clsx('review-modal', isDeleteConfirmVisible && 'review-modal--confirm-open')}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="review-modal__overlay" onClick={handleClose} />

      <div className="review-modal__window">
        <div className="review-modal__content">
          <header className="review-modal__header">
            <h2 className="review-modal__title h3">{title}</h2>

            <LinkButton
              customClass="review-modal__close button--black-08"
              mode="button"
              type="button"
              onClick={handleClose}
            >
              ×
            </LinkButton>
          </header>

          <form className="review-modal__form" onSubmit={handleSubmit}>
            <FormLabel
              label={t('catalogEntity.reviewModal.name')}
              required
              className="review-modal__field"
              htmlFor="review-author"
            >
              <input
                id="review-author"
                className="review-modal__input"
                value={authorName}
                disabled={isReadMode}
                onChange={event => setAuthorName(event.target.value)}
              />
            </FormLabel>

            <FormLabel
              label={t('catalogEntity.reviewModal.country')}
              className="review-modal__field"
              htmlFor="review-country"
            >
              <input
                id="review-country"
                className="review-modal__input"
                value={country}
                disabled={isReadMode}
                onChange={event => setCountry(event.target.value)}
              />
            </FormLabel>

            <FormLabel
              label={t('catalogEntity.reviewModal.rating')}
              className="review-modal__field"
              // htmlFor="review-rating"
              required
            >
              <RatingInput
                value={rating}
                onChange={setRating}
                ariaLabel={t('catalogEntity.reviewModal.rating')}
                disabled={isReadMode}
              />
            </FormLabel>

            <FormLabel
              label={t('catalogEntity.reviewModal.review')}
              className="review-modal__field"
              required
              htmlFor="review-text"
            >
              <textarea
                id="review-text"
                className="review-modal__textarea"
                value={text}
                disabled={isReadMode}
                maxLength={MAX_REVIEW_LENGTH}
                onChange={event => setText(event.target.value)}
              />
              {!isReadMode && (
                <span
                  className={clsx(
                    'review-modal__counter',
                    trimmedText.length < MIN_REVIEW_LENGTH / 2 && 'review-modal__counter--alert',
                    trimmedText.length > MIN_REVIEW_LENGTH / 2 &&
                      trimmedText.length < MIN_REVIEW_LENGTH &&
                      'review-modal__counter--attention'
                  )}
                >
                  {trimmedText.length}/{MAX_REVIEW_LENGTH}
                </span>
              )}
            </FormLabel>

            {!isReadMode && (
              <footer className="review-modal__footer">
                <LinkButton
                  mode="button"
                  customClass="button--red"
                  disabled={!canSubmit}
                  type="submit"
                >
                  {mode === 'create' ? 'Submit Review' : 'Save Changes'}
                </LinkButton>

                {mode === 'edit' && onDelete && (
                  <LinkButton
                    mode="button"
                    customClass="button--black-08"
                    type="button"
                    onClick={() => setIsDeleteConfirmVisible(true)}
                  >
                    {t('catalogEntity.reviewModal.deleteReview')}
                  </LinkButton>
                )}
              </footer>
            )}
          </form>
        </div>

        {isDeleteConfirmVisible && (
          <div className="review-modal__confirm-overlay">
            <div className="review-modal__confirm">
              <p>{t('catalogEntity.reviewModal.deleteReviewConfirm')}</p>

              <div className="review-modal__confirm-actions">
                <LinkButton
                  mode="button"
                  customClass="button--black-08"
                  type="button"
                  onClick={() => setIsDeleteConfirmVisible(false)}
                >
                  {t('catalogEntity.reviewModal.cancel')}
                </LinkButton>

                <LinkButton
                  mode="button"
                  variant="danger"
                  type="button"
                  onClick={handleDeleteClick}
                >
                  {t('catalogEntity.reviewModal.delete')}
                </LinkButton>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
