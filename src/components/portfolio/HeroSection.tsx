import React from 'react';
import { ArrowDown, Mail, Terminal } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { StarburstSticker, RetroFloppyDisk, RetroPixelHeart } from '../common/RetroStickers';
import { GithubIcon, LinkedinIcon, TwitterIcon } from '../common/SocialIcons';

export const HeroSection: React.FC = () => {
  const { profile } = useData();

  return (
    <section className="relative border-b-4 border-retro-black overflow-hidden bg-retro-cream">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[620px] items-stretch">
        
        {/* LEFT COLUMN: Developer Info & Bio (Graph/Notebook Paper) */}
        <div className="lg:col-span-7 bg-grid-notebook p-6 sm:p-10 md:p-14 flex flex-col justify-between border-b-4 lg:border-b-0 lg:border-r-4 border-retro-black">
          <div>
            {/* Top Greeting Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-retro-purple text-white border-2 border-retro-black shadow-neo-sm font-mono text-xs md:text-sm font-bold tracking-wider mb-6">
              <span>{profile.short_intro}</span>
            </div>

            {/* Giant Title Headline */}
            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-black text-retro-black leading-[1.02] tracking-tight uppercase mb-6">
              {profile.title}
            </h1>

            {/* Bio Paragraph */}
            <p className="font-mono text-base sm:text-lg text-retro-darkgray max-w-xl leading-relaxed mb-8">
              {profile.bio}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <a
                href="#projects"
                className="btn-neo-lime text-sm sm:text-base flex items-center gap-2 group"
              >
                <span>VIEW MY WORK</span>
                <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
              </a>

              <a
                href={profile.resume_url || '#resume'}
                target="_blank"
                rel="noreferrer"
                className="btn-neo text-sm sm:text-base flex items-center gap-2 group"
              >
                <span>DOWNLOAD RESUME</span>
                <ArrowDown size={18} className="transition-transform group-hover:translate-y-0.5" />
              </a>
            </div>
          </div>

          {/* Social Links Bar */}
          <div>
            <div className="text-xs font-mono font-bold tracking-widest uppercase text-retro-black mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-retro-lime border border-retro-black inline-block" />
              <span>CONNECT WITH ME</span>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              {profile.github_url && (
                <a
                  href={profile.github_url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub Profile"
                  className="w-10 h-10 bg-white border-2 border-retro-black flex items-center justify-center shadow-neo-sm hover:bg-retro-yellow hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all text-retro-black"
                >
                  <GithubIcon size={20} />
                </a>
              )}
              {profile.linkedin_url && (
                <a
                  href={profile.linkedin_url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn Profile"
                  className="w-10 h-10 bg-white border-2 border-retro-black flex items-center justify-center shadow-neo-sm hover:bg-retro-yellow hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all text-retro-black"
                >
                  <LinkedinIcon size={20} />
                </a>
              )}
              {profile.twitter_url && (
                <a
                  href={profile.twitter_url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Twitter Profile"
                  className="w-10 h-10 bg-white border-2 border-retro-black flex items-center justify-center shadow-neo-sm hover:bg-retro-yellow hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all text-retro-black"
                >
                  <TwitterIcon size={20} />
                </a>
              )}
              {profile.email && (
                <a
                  href={`mailto:${profile.email}`}
                  aria-label="Email Me"
                  className="w-10 h-10 bg-white border-2 border-retro-black flex items-center justify-center shadow-neo-sm hover:bg-retro-yellow hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all text-retro-black"
                >
                  <Mail size={20} />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Pink Panel with Overlapping Frames & Retro Terminal */}
        <div className="lg:col-span-5 bg-retro-pink p-8 sm:p-12 relative flex flex-col items-center justify-center overflow-hidden">
          
          {/* Decorative Floating Stickers */}
          <div className="absolute top-4 left-4 z-20 animate-wiggle">
            <RetroFloppyDisk className="w-12 h-12 drop-shadow-md" />
          </div>

          <div className="absolute top-6 right-6 z-20">
            <StarburstSticker text="100% CLEAN CODE" color="#F5E82D" className="transform rotate-12" />
          </div>

          <div className="absolute bottom-6 left-6 z-20">
            <RetroPixelHeart className="w-8 h-8 drop-shadow-sm" />
          </div>

          {/* Layered Photo Frame */}
          <div className="relative w-64 sm:w-72 md:w-80 my-4 z-10">
            {/* Background Lime Offset Frame */}
            <div className="absolute -top-3 -right-3 w-full h-full bg-retro-lime border-4 border-retro-black shadow-neo-lg" />
            
            {/* Main Picture Frame */}
            <div className="relative border-4 border-retro-black bg-white overflow-hidden shadow-neo-lg group">
              <div className="bg-retro-black text-white px-3 py-1 font-mono text-[10px] flex items-center justify-between border-b-2 border-retro-black">
                <span className="flex items-center gap-1.5">
                  <Terminal size={12} className="text-retro-lime" />
                  <span>PORTRAIT.PNG</span>
                </span>
                <span className="text-retro-lime font-bold">100% READY</span>
              </div>
              <img
                src={profile.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'}
                alt={profile.full_name}
                className="w-full h-72 sm:h-80 object-cover object-center filter contrast-105 group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80';
                }}
              />
            </div>

            {/* Overlapping Floating Code Card (Purple matching reference) */}
            <div className="absolute -bottom-8 -right-4 sm:-right-8 w-64 sm:w-72 bg-retro-purple text-white border-3 border-retro-black p-3.5 shadow-neo-lg transform rotate-[-2deg] hover:rotate-0 transition-transform">
              <div className="flex items-center justify-between border-b border-purple-400 pb-1 mb-2 font-mono text-[10px] text-purple-200">
                <span className="font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-retro-lime inline-block" />
                  developer.ts
                </span>
                <span className="opacity-80">v2.4</span>
              </div>
              <pre className="font-mono text-xs sm:text-[13px] leading-tight text-white whitespace-pre font-medium overflow-x-auto">
                {profile.code_snippet}
              </pre>
            </div>
          </div>

          {/* Location / Status Pill */}
          <div className="mt-8 z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border-2 border-retro-black font-mono text-xs font-bold shadow-neo-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse-dot" />
              <span>{profile.status_badge}</span>
              <span className="text-gray-400">|</span>
              <span>{profile.location}</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
