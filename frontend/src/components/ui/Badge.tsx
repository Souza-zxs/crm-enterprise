import React from 'react';
import { twMerge } from 'tailwind-merge';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'purple';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className,
  ...props
}) => {
  const variants = {
    default: 'bg-slate-100 text-slate-700',
    success: 'bg-emerald-100 text-emerald-700',
    warning: 'bg-amber-100 text-amber-700',
    danger: 'bg-red-100 text-red-700',
    info: 'bg-blue-100 text-blue-700',
    purple: 'bg-violet-100 text-violet-700',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  };

  return (
    <span
      className={twMerge(
        'inline-flex items-center font-semibold rounded-full',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const statusConfig: Record<string, { variant: BadgeProps['variant']; label: string }> = {
    NEW: { variant: 'default', label: 'Novo' },
    CONTACTED: { variant: 'info', label: 'Contatado' },
    QUALIFIED: { variant: 'success', label: 'Qualificado' },
    PROPOSAL: { variant: 'warning', label: 'Proposta' },
    NEGOTIATION: { variant: 'purple', label: 'Negociação' },
    WON: { variant: 'success', label: 'Ganho' },
    LOST: { variant: 'danger', label: 'Perdido' },
    ACTIVE: { variant: 'success', label: 'Ativo' },
    PAUSED: { variant: 'warning', label: 'Pausado' },
    COMPLETED: { variant: 'default', label: 'Concluído' },
  };

  const config = statusConfig[status] || { variant: 'default', label: status };

  return (
    <Badge variant={config.variant} className={className}>
      {config.label}
    </Badge>
  );
};