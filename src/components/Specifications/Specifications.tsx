import './Specifications.scss';

import clsx from 'clsx';
import type { ReactNode } from 'react';

export type SpecificationItem = {
  label: ReactNode;
  value: ReactNode;
  isWide?: boolean;
};

type SpecificationsProps = {
  items?: SpecificationItem[];
};

export default function Specifications({ items = [] }: SpecificationsProps) {
  return (
    <div className="specifications">
      <dl className="specifications__list">
        {items.map(({ label, value, isWide }, index) => (
          <div
            className={clsx('specifications__item', isWide && 'specifications__item--wide')}
            key={index}
          >
            <dt className="specifications__key">{label}</dt>
            <dd className="specifications__value">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
