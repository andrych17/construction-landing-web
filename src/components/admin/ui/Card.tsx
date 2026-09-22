import React from 'react';

export function Card({ className = '', ...rest }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`rounded-2xl border border-slate-200 bg-white shadow-xs ${className}`} {...rest} />;
}
