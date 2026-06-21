import './CatalogPromoModal.scss';
import clsx from 'clsx';

import { useState, useEffect } from 'react';
import LinkButton from '@/components/Button';

type CatalogPromoModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};

export default function CatalogPromoModal({
  isOpen,
  onClose,
  title,
  children,
}: CatalogPromoModalProps) {
  const [shouldRender, setShouldRender] = useState(isOpen);

  function handleAnimationEnd(event: React.AnimationEvent<HTMLDivElement>) {
    if (event.currentTarget !== event.target) return;

    if (!isOpen) {
      setShouldRender(false);
    }
  }

  useEffect(() => {
    if (!shouldRender) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose, shouldRender]);

  useEffect(() => {
    if (!shouldRender) return;

    const { overflow } = document.body.style;

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = overflow;
    };
  }, [shouldRender]);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
    }
  }, [isOpen]);

  if (!shouldRender) return null;

  return (
    <div
      className={clsx(
        'modal',
        'modal--centered',
        'catalog-modal',
        isOpen ? 'modal--open catalog-modal--open' : 'modal--closing catalog-modal--closing'
      )}
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onAnimationEnd={handleAnimationEnd}
    >
      <div className="modal__overlay catalog-modal__overlay" onClick={onClose} />

      <div className="modal__window catalog-modal__window">
        <div className="catalog-modal__content">
          <header className="modal__header catalog-modal__header">
            <h2 className="modal__title catalog-modal__title h3">{title}</h2>

            <LinkButton
              customClass="modal__close catalog-modal__close button--black-08"
              mode="button"
              type="button"
              onClick={onClose}
            >
              ×
            </LinkButton>
          </header>
          <div className="catalog-modal__body">{children}</div>
        </div>
      </div>
    </div>
  );
}
