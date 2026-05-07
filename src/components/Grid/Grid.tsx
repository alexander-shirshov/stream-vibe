import clsx from 'clsx';
import './Grid.scss';
import React, { Children } from 'react';

type GridProps = {
  columns: number;
  children: React.ReactNode;
};

export default function Grid({ columns, children }: GridProps) {
  return (
    <ul className={clsx('grid', columns > 1 && `grid--${columns}`)}>
      {Children.map(children, (child, index) => (
        <li className="grid__item" key={index}>
          {child}
        </li>
      ))}
    </ul>
  );
}
