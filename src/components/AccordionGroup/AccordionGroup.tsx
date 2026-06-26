import clsx from 'clsx';
import './AccordionGroup.scss';
import React, { Children, isValidElement } from 'react';

type AccordionGroupsProps = {
  className?: string;
  columns: number;
  children: React.ReactNode;
  isOrderedList?: boolean;
  variant?: 'default' | 'dark';
};

export default function AccordionGroup({
  className,
  columns,
  children,
  isOrderedList = true,
  variant = 'default',
}: AccordionGroupsProps) {
  const ListTag = isOrderedList ? 'ol' : 'ul';

  const items = Children.toArray(children).filter(isValidElement);
  const lastItemOfFirstColumnIndex = Math.floor(items.length / columns) - 1;

  return (
    <ListTag
      className={clsx(
        className,
        'accordion-group',
        `accordion-group--${variant}`,
        columns > 1 && `accordion-group--${columns}-columns`,
        isOrderedList && 'accordion-group--has-counter'
      )}
    >
      {items.map((child, index) => {
        const isLastColumnItem =
          columns > 1 && (index === lastItemOfFirstColumnIndex || index === items.length - 1);

        return (
          <li
            className={clsx(
              'accordion-group__item',
              isLastColumnItem && 'accordion-group__item--last-column-item'
            )}
            key={index}
          >
            {child}
          </li>
        );
      })}
    </ListTag>
  );
}
