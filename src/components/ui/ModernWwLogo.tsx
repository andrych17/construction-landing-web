'use client';

import React from 'react';
import Image from 'next/image';

interface ModernWwLogoProps {
  variant?: 'mark' | 'full' | 'minimal' | 'preloader';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  gold?: boolean;
}

export default function ModernWwLogo({
  variant = 'full',
  size = 'md',
  className = '',
  gold = false,
}: ModernWwLogoProps) {
  const sizeMap = {
    sm: { box: 'w-7 h-7', px: 28, text: 'text-sm', subtext: 'text-[7.5px]' },
    md: { box: 'w-9 h-9', px: 36, text: 'text-base', subtext: 'text-[8.5px]' },
    lg: { box: 'w-14 h-14', px: 56, text: 'text-2xl', subtext: 'text-[10px]' },
    xl: { box: 'w-24 h-24', px: 96, text: 'text-4xl', subtext: 'text-xs' },
  };

  const currentSize = sizeMap[size];
  const logoSrc = gold ? '/images/ww/logo_gold_hq.png' : '/images/ww/logo_white_hq.png';

  // The Exact Authentic Instagram Logo Emblem
  const renderLogoMark = () => {
    return (
      <div className={`relative ${currentSize.box} shrink-0 group flex items-center justify-center`}>
        <Image
          src={logoSrc}
          alt="ww.cons Logo"
          width={currentSize.px}
          height={currentSize.px}
          className="object-contain w-full h-full drop-shadow-md group-hover:brightness-110 transition-all duration-300"
          priority
        />
      </div>
    );
  };

  if (variant === 'mark') {
    return <div className={`inline-flex items-center ${className}`}>{renderLogoMark()}</div>;
  }

  if (variant === 'preloader') {
    return (
      <div className={`flex flex-col items-center justify-center ${className}`}>
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 mb-4 flex items-center justify-center">
          <Image
            src="/images/ww/logo_white_hq.png"
            alt="ww.cons Preloader Logo"
            width={120}
            height={120}
            className="object-contain w-full h-full drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]"
            priority
          />
        </div>
      </div>
    );
  }

  if (variant === 'minimal') {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        {renderLogoMark()}
        <div className="flex items-center gap-1.5">
          <span className={`font-serif ${currentSize.text} tracking-[0.2em] font-bold text-white uppercase`}>
            WW.CONS
          </span>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400" />
        </div>
      </div>
    );
  }

  // Full Brand Lockup: Official Emblem + Baskervville Wordmark + Subline
  return (
    <div className={`flex items-center gap-3.5 ${className}`}>
      {renderLogoMark()}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className={`font-serif ${currentSize.text} tracking-[0.2em] font-bold text-white uppercase group-hover:text-amber-400 transition-colors`}>
            WW.CONS
          </span>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
        </div>
        <span className={`${currentSize.subtext} font-mono tracking-[0.28em] text-neutral-400 uppercase group-hover:text-neutral-300 transition-colors`}>
          ARCHITECTURE · GENERAL CONTRACTING
        </span>
      </div>
    </div>
  );
}
