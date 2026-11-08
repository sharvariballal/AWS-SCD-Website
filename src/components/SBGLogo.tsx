import React from 'react';

export const SBGLogo: React.FC<{ className?: string }> = ({ className = 'h-10 w-auto' }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* SBG Logo Badge only (AWS smile logo removed as requested) */}
      <div className="relative group/logo">
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-500 rounded-xl blur-xs opacity-60 group-hover/logo:opacity-100 transition duration-300" />
        <img
          src="/sbg-logo.png"
          alt="Student Builder Group Logo"
          className="relative w-9 h-9 object-contain rounded-lg p-0.5 bg-[#0F0A2A] border border-purple-500/40 shadow-sm"
        />
      </div>

      {/* Chapter Text in Purple/Blue Palette */}
      <div className="flex flex-col text-left">
        <span className="text-sm font-black tracking-tight text-white leading-tight flex items-center gap-1.5">
          SBG
          <span className="text-[10px] px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 font-semibold">
            PICT
          </span>
        </span>
        <span className="text-[10px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-blue-400 tracking-wider uppercase">
          STUDENT BUILDER GROUP
        </span>
      </div>
    </div>
  );
};
