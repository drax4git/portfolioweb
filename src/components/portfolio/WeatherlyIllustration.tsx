import React from 'react';

export const WeatherlyIllustration: React.FC = () => {
  return (
    <div className="w-full h-56 sm:h-72 bg-[#F7F2E7] border-3 border-retro-black p-4 relative overflow-hidden flex items-end justify-between select-none">
      {/* Sun Graphic in top left */}
      <div className="absolute -top-12 -left-12 w-44 h-44 rounded-full bg-[#FF9800] border-4 border-retro-black flex items-center justify-center">
        {/* Sun rays */}
        <div className="absolute w-3 h-16 bg-retro-black -top-4 left-20" />
        <div className="absolute w-16 h-3 bg-retro-black -right-4 top-20" />
        <div className="w-28 h-28 rounded-full bg-[#FFB74D] border-2 border-retro-black" />
      </div>

      {/* Retro Weather Cloud Graphic */}
      <div className="relative z-10">
        <svg viewBox="0 0 240 140" className="w-48 sm:w-64 h-auto drop-shadow-md">
          {/* Cloud Outline & Color */}
          <path
            d="M50 120 H200 A30 30 0 0 0 200 60 A45 45 0 0 0 140 30 A35 35 0 0 0 80 50 A35 35 0 0 0 50 120 Z"
            fill="#64B5F6"
            stroke="#111111"
            strokeWidth="5"
            strokeLinejoin="round"
          />
          {/* Cloud shadow lines */}
          <path
            d="M75 110 H185"
            stroke="#111111"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Retro Temperature Display 24°C */}
      <div className="relative z-10 flex flex-col items-end pb-2">
        <div className="font-display text-5xl sm:text-7xl font-black text-retro-black tracking-tighter leading-none drop-shadow-[2px_2px_0px_#FFFFFF]">
          24°C
        </div>
        <span className="font-mono text-xs font-bold uppercase tracking-widest bg-retro-lime px-2 py-0.5 border border-retro-black mt-1">
          SAN FRANCISCO, CA
        </span>
      </div>
    </div>
  );
};
