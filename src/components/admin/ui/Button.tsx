import React from 'react';

type ButtonVariant = 'primary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md';

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  primary: 'bg-amber-500 hover:bg-amber-400 text-black',
  ghost: 'border border-slate-300 text-slate-700 hover:bg-slate-100 bg-white',
  danger: 'text-red-600 hover:text-red-700',
};

const SIZE_CLASS: Record<ButtonSize, string> = {
  sm: 'min-h-[36px] px-3 text-xs',
  md: 'min-h-[44px] px-5 text-sm',
};

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant; size?: ButtonSize }) {
  return (
    <button
      {...props}
      className={`rounded-md font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${VARIANT_CLASS[variant]} ${SIZE_CLASS[size]} ${className}`}
    />
  );
}
