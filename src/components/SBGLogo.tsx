import React from 'react';

interface SBGLogoProps {
  variant?: 'emblem' | 'full' | 'inline';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const SBGLogo: React.FC<SBGLogoProps> = ({ 
  variant = 'emblem', 
  className = '',
  size = 'md' 
}) => {
  const sizeMap = {
    sm: { imgH: 'h-6', container: 'p-1 rounded-lg', text: 'text-xs' },
    md: { imgH: 'h-9', container: 'p-1.5 rounded-xl', text: 'text-sm' },
    lg: { imgH: 'h-12', container: 'p-2 rounded-2xl', text: 'text-base' },
    xl: { imgH: 'h-16', container: 'p-2.5 rounded-2xl', text: 'text-lg' },
  };

  const currentSize = sizeMap[size];

  // Pure emblem on black background with zero extra letter clutter
  if (variant === 'emblem' || variant === 'full') {
    return (
      <div className={`inline-flex items-center justify-center shrink-0 bg-black border border-neutral-800 ${currentSize.container} shadow-sm ${className}`}>
        <img
          src="/brand/sbg-emblem-black.png"
          alt="Club Logo"
          className={`${currentSize.imgH} w-auto object-contain`}
          loading="eager"
        />
      </div>
    );
  }

  // 'inline' variant: Pure Black Emblem + clean title
  return (
    <div className={`inline-flex items-center gap-2.5 shrink-0 ${className}`}>
      <div className={`inline-flex items-center justify-center bg-black border border-neutral-800 ${currentSize.container} shadow-sm`}>
        <img
          src="/brand/sbg-emblem-black.png"
          alt="Club Logo"
          className={`${currentSize.imgH} w-auto object-contain`}
        />
      </div>
      <div className="flex flex-col leading-tight">
        <span className={`font-black tracking-tight text-[#260B49] ${currentSize.text}`}>
          Cloud City
        </span>
        <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-purple-700">
          PICT Pune
        </span>
      </div>
    </div>
  );
};
