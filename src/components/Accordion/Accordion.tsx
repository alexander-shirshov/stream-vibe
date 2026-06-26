import './Accordion.scss';
import clsx from 'clsx';

import Arrow from '@/assets/icons/arrow-right.svg?react';

type AccordionProps = {
  title: string;
  titleClassName?: string;
  subtitle?: string;
  id: string;
  name: string;
  isOpen?: boolean;
  children: React.ReactNode;
  hasArrowButton?: boolean;
};

export default function Accordion({
  title,
  titleClassName = 'h5',
  subtitle,
  id,
  name,
  isOpen,
  children,
  hasArrowButton = false,
}: AccordionProps) {
  return (
    <div className="accordion">
      <details className="accordion__details" name={name} open={isOpen}>
        <summary className="accordion__summary">
          <h3 className={clsx('accordion__title', titleClassName)}>
            <span role="term" aria-details={id}>
              {title}
            </span>
            {subtitle && <span className="accordion__subtitle">{subtitle}</span>}
            {hasArrowButton && (
              <div className={clsx('accordion__arrow')}>
                <Arrow className="accordion__arrow-icon" />
              </div>
            )}
          </h3>
        </summary>
      </details>
      <div className="accordion__content" id={id} role="definition">
        <div className="accordion__content-inner">
          <div className="accordion__content-body">{children}</div>
        </div>
      </div>
    </div>
  );
}
