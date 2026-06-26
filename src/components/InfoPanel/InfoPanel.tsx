import { useId } from 'react';

import './InfoPanel.scss';
import clsx from 'clsx';

type InfoPanelProps = {
  title: string;
  bigTitle?: boolean;
  children: React.ReactNode;
  headerActions?: React.ReactNode;
  className?: string;
  bottomActions?: React.ReactNode;
};

export default function InfoPanel({
  title,
  bigTitle,
  children,
  headerActions,
  bottomActions,
  className,
}: InfoPanelProps) {
  const titleId = useId();

  return (
    <section className={clsx('info-panel', className)} aria-labelledby={titleId}>
      <header className="info-panel__header">
        <h3
          className={clsx('info-panel__title', bigTitle && 'info-panel__title--big')}
          id={titleId}
        >
          {title}
        </h3>
        {headerActions && <div className="info-panel__actions">{headerActions}</div>}
      </header>

      <div className="info-panel__body">{children}</div>

      {bottomActions && <div className="info-panel__bottom">{bottomActions}</div>}
    </section>
  );
}
