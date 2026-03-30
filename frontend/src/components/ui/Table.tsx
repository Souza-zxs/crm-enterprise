import React from 'react';
import { twMerge } from 'tailwind-merge';

interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  children: React.ReactNode;
}

export const Table: React.FC<TableProps> = ({ children, className, ...props }) => {
  return (
    <div className="overflow-x-auto">
      <table
        className={twMerge('w-full', className)}
        {...props}
      >
        {children}
      </table>
    </div>
  );
};

interface TheadProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

export const Thead: React.FC<TheadProps> = ({ children, className, ...props }) => {
  return (
    <thead className={twMerge('bg-slate-50 border-b border-slate-200', className)} {...props}>
      {children}
    </thead>
  );
};

interface TbodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

export const Tbody: React.FC<TbodyProps> = ({ children, className, ...props }) => {
  return (
    <tbody className={twMerge('divide-y divide-slate-200', className)} {...props}>
      {children}
    </tbody>
  );
};

interface TrProps extends React.HTMLAttributes<HTMLTableRowElement> {
  hover?: boolean;
}

export const Tr: React.FC<TrProps> = ({ children, hover = true, className, ...props }) => {
  return (
    <tr
      className={twMerge(
        hover && 'hover:bg-slate-50 transition-colors',
        className
      )}
      {...props}
    >
      {children}
    </tr>
  );
};

interface ThProps extends React.ThHTMLAttributes<HTMLTableCellElement> {}

export const Th: React.FC<ThProps> = ({ children, className, ...props }) => {
  return (
    <th
      className={twMerge(
        'px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider',
        className
      )}
      {...props}
    >
      {children}
    </th>
  );
};

interface TdProps extends React.TdHTMLAttributes<HTMLTableCellElement> {}

export const Td: React.FC<TdProps> = ({ children, className, ...props }) => {
  return (
    <td
      className={twMerge(
        'px-6 py-4 text-sm text-slate-700',
        className
      )}
      {...props}
    >
      {children}
    </td>
  );
};