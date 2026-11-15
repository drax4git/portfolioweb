import React from 'react';

export const StarburstSticker: React.FC<{
  text: string;
  color?: string;
  className?: string;
  textColor?: string;
}> = ({ text, color = '#FF789B', className = '', textColor = '#111111' }) => {
  return (
    <div className={`relative inline-flex items-center justify-center select-none ${className}`}>
      <svg viewBox="0 0 100 100" className="w-20 h-20 drop-shadow-md animate-spin-slow" style={{ animationDuration: '25s' }}>
        <path
          d="M50 0 L58 25 L85 15 L75 42 L100 50 L75 58 L85 85 L58 75 L50 100 L42 75 L15 85 L25 58 L0 50 L25 42 L15 15 L42 25 Z"
          fill={color}
          stroke="#111111"
          strokeWidth="3"
        />
      </svg>
      <span
        className="absolute text-center font-display text-[9px] uppercase leading-tight font-black rotate-[-6deg]"
        style={{ color: textColor }}
      >
        {text}
      </span>
    </div>
  );
};

export const RetroFloppyDisk: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="56" height="56" rx="4" fill="#8050F5" stroke="#111111" strokeWidth="4" />
      <rect x="14" y="4" width="36" height="20" fill="#FFFFFF" stroke="#111111" strokeWidth="3" />
      <rect x="20" y="8" width="6" height="12" fill="#111111" />
      <rect x="12" y="32" width="40" height="24" rx="2" fill="#F5E82D" stroke="#111111" strokeWidth="3" />
      <line x1="18" y1="40" x2="46" y2="40" stroke="#111111" strokeWidth="2" strokeDasharray="3 3" />
      <line x1="18" y1="46" x2="46" y2="46" stroke="#111111" strokeWidth="2" strokeDasharray="3 3" />
    </svg>
  );
};

export const RetroPixelHeart: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="#FF789B" stroke="#111111" strokeWidth="0.8">
      <path d="M2 5h2v-2h3v2h2v-2h3v2h2v4h-2v2h-2v2h-2v2h-2v-2h-2v-2h-2v-2h-2z" />
    </svg>
  );
};

export const RetroBarcode: React.FC<{ className?: string; code?: string }> = ({
  className = '',
  code = '01001010 01001111',
}) => {
  return (
    <div className={`inline-flex flex-col items-center bg-white border-2 border-retro-black p-1 shadow-neo-sm ${className}`}>
      <div className="flex items-center h-6 gap-0.5 px-1">
        <div className="w-1 h-full bg-retro-black" />
        <div className="w-0.5 h-full bg-retro-black" />
        <div className="w-2 h-full bg-retro-black" />
        <div className="w-0.5 h-full bg-retro-black" />
        <div className="w-1.5 h-full bg-retro-black" />
        <div className="w-0.5 h-full bg-retro-black" />
        <div className="w-2 h-full bg-retro-black" />
        <div className="w-1 h-full bg-retro-black" />
        <div className="w-0.5 h-full bg-retro-black" />
        <div className="w-1.5 h-full bg-retro-black" />
      </div>
      <span className="text-[8px] font-mono font-bold tracking-tighter text-retro-black mt-0.5">{code}</span>
    </div>
  );
};

export const PaperClipBadge: React.FC<{ text: string; color?: string }> = ({ text, color = '#C5FF4A' }) => {
  return (
    <div className="relative inline-flex items-center">
      {/* Paperclip */}
      <svg className="absolute -top-3 -left-2 w-5 h-8 text-retro-black z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
      </svg>
      <div
        className="px-3 py-1 border-2 border-retro-black font-mono font-bold text-xs uppercase shadow-neo-sm transform -rotate-1"
        style={{ backgroundColor: color }}
      >
        {text}
      </div>
    </div>
  );
};

export const RetroWindowControls: React.FC = () => {
  return (
    <div className="flex items-center gap-1.5">
      <span className="w-3 h-3 rounded-none border border-retro-black bg-[#FF5F56] shadow-[1px_1px_0px_#111111]" />
      <span className="w-3 h-3 rounded-none border border-retro-black bg-[#FFBD2E] shadow-[1px_1px_0px_#111111]" />
      <span className="w-3 h-3 rounded-none border border-retro-black bg-[#27C93F] shadow-[1px_1px_0px_#111111]" />
    </div>
  );
};
