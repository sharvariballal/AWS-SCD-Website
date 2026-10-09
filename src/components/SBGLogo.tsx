import React from 'react';

export const SBGLogo: React.FC<{ className?: string }> = ({ className = 'h-10 w-auto' }) => {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* AWS Smile Logo */}
      <svg className="h-7 w-auto text-white fill-current" viewBox="0 0 100 60">
        <path d="M43.8 28.5c0 3.8-1.1 6.8-3.3 9-2.2 2.2-5.3 3.3-9.2 3.3-4.1 0-7.3-1.1-9.5-3.4-2.2-2.3-3.3-5.3-3.3-9.1 0-3.9 1.1-7 3.3-9.2 2.2-2.3 5.4-3.4 9.5-3.4 3.9 0 7 1.1 9.2 3.3 2.2 2.3 3.3 5.4 3.3 9.5zm-6.6 0c0-2.3-.5-4.1-1.6-5.4-1.1-1.3-2.6-1.9-4.7-1.9-2 0-3.6.6-4.7 1.9-1.1 1.3-1.6 3.1-1.6 5.4 0 2.2.5 4 1.6 5.3 1.1 1.3 2.7 2 4.7 2 2.1 0 3.6-.7 4.7-2 1.1-1.3 1.6-3.1 1.6-5.3zm29.8-12.4l-7.8 24.3h-6.2l-5.6-18.4-5.6 18.4h-6.2l-7.8-24.3h6.6l4.4 15.6 5.5-15.6h6.2l5.5 15.6 4.5-15.6h6.5zm19.4 6.8c-1.4-1.6-3.4-2.4-6-2.4-2.4 0-4.3.7-5.6 2-1.3 1.4-2 3.1-2 5.1 0 1.9.6 3.4 1.9 4.6 1.3 1.1 3.2 2.1 5.7 2.8 2.6.7 4.5 1.4 5.6 2.1 1.1.7 1.7 1.8 1.7 3.2 0 1.6-.7 2.8-2 3.8-1.3 1-3.2 1.4-5.6 1.4-2.2 0-4.2-.5-5.9-1.6-1.7-1-2.8-2.6-3.2-4.6l-5.9 1.3c.7 3.4 2.4 6 5.1 7.8 2.7 1.8 6.1 2.7 10.1 2.7 4.3 0 7.7-1 10.2-2.9 2.5-1.9 3.8-4.6 3.8-8 0-2.2-.7-4-2.1-5.4-1.4-1.4-3.5-2.5-6.3-3.3-2.5-.7-4.2-1.4-5.1-2-.9-.7-1.4-1.5-1.4-2.6 0-1.2.5-2.2 1.6-2.9 1.1-.8 2.6-1.1 4.5-1.1 1.8 0 3.3.4 4.5 1.1 1.2.8 2 2 2.4 3.6l5.7-1.4c-.7-2.7-2.1-4.9-4.2-6.5z" />
        {/* Amazon Smile Curve */}
        <path d="M12.4 47.2c16.5 7.9 36.9 8.2 55.4.7 2.8-1.1 5.9.9 5.3 3.9-.9 4.3-5 5.9-8.4 7.2-18.7 7.2-41.2 5.3-57.5-6.4-1.8-1.3-.2-3.8 2-3.8 1.1 0 2.2-.8 3.2-1.6z" fill="#FF9900" />
        <path d="M72.2 46.5l3.8 6.9-7.8-.3 4-6.6z" fill="#FF9900" />
      </svg>

      <span className="h-6 w-px bg-slate-700 mx-0.5" />

      {/* SBG Chip Logo from uploaded image */}
      <img
        src="/sbg-logo.png"
        alt="AWS Student Builder Group Logo"
        className="w-8 h-8 object-contain rounded-md"
      />

      {/* Chapter Text */}
      <div className="flex flex-col text-left">
        <span className="text-xs font-black tracking-tight text-white leading-tight">
          AWS SBG
        </span>
        <span className="text-[10px] font-bold text-amber-400 tracking-wider">
          PICT PUNE
        </span>
      </div>
    </div>
  );
};
