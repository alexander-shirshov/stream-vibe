import './Table.scss';

import clsx from 'clsx';
import type { CSSProperties, ReactNode } from 'react';

export type TableHeadCell = {
  children: ReactNode;
  width?: CSSProperties['width'];
};

export type TableRow = {
  cells: ReactNode[];
};

type TableProps = {
  className?: string;
  headCells?: TableHeadCell[];
  rows?: TableRow[];
};

export default function Table({ className, headCells = [], rows = [] }: TableProps) {
  return (
    <table className={clsx('table', className)}>
      {headCells.length > 0 && (
        <thead>
          <tr>
            {headCells.map(({ children, width }, index) => (
              <th style={width ? { width } : undefined} key={index}>
                {children}
              </th>
            ))}
          </tr>
        </thead>
      )}

      <tbody>
        {rows.map(({ cells }, rowIndex) => (
          <tr key={rowIndex}>
            {cells.map((cell, cellIndex) => (
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
