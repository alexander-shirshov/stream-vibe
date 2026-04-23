import './Section.scss';
import clsx from 'clsx';

type SectionProps = {
  className?: string;
  title?: string;
  titleId?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  description?: React.ReactNode;
  isActionsHiddenOnMobile?: boolean;
};

export default function Section({
  className,
  title,
  titleId,
  children,
  actions,
  description,
  isActionsHiddenOnMobile,
}: SectionProps) {
  return (
    <section className={clsx(className, 'section container')} aria-labelledby={titleId}>
      <header className="section__header">
        <div className="section__info">
          {title && (
            <h2 className="section__title h3" id={titleId}>
              {title}
            </h2>
          )}
          {description && <div className="section__description">{description}</div>}
        </div>
        {actions && (
          <div className={clsx('section__actions', isActionsHiddenOnMobile && 'hidden-mobile')}>
            {actions}
          </div>
        )}
      </header>
      <div className="section__body">{children}</div>
    </section>
  );
}
