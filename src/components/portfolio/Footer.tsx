import React from 'react';
import { ArrowUp, Mail } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { GithubIcon, LinkedinIcon, TwitterIcon } from '../common/SocialIcons';

export const Footer: React.FC = () => {
  const { profile } = useData();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t-4 border-retro-black select-none">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-stretch justify-between">
        
        {/* Left: Lime Logo Tag matching reference */}
        <div className="bg-retro-lime px-6 py-4 border-b-4 md:border-b-0 md:border-r-4 border-retro-black flex items-center justify-between md:justify-start gap-4">
          <div className="font-mono font-black text-sm tracking-wider text-retro-black flex items-center gap-2">
            <span className="font-display">&lt;/&gt;</span>
            <span>{profile.full_name.toUpperCase()}</span>
          </div>

          {/* Quick Admin link for evaluators */}
          <a
            href="/admin"
            className="text-[11px] font-mono font-bold bg-white px-2 py-0.5 border border-retro-black hover:bg-retro-yellow transition-colors"
          >
            ADMIN ↗
          </a>
        </div>

        {/* Center: Copyright Notice */}
        <div className="p-4 flex items-center justify-center flex-1 font-mono text-xs text-gray-700 text-center">
          <span>© {currentYear} {profile.full_name}. All rights reserved. Crafted with Neo-Brutalism.</span>
        </div>

        {/* Right: Social Box Icons & Back To Top */}
        <div className="flex items-stretch border-t-4 md:border-t-0 md:border-l-4 border-retro-black">
          {profile.github_url && (
            <a
              href={profile.github_url}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="w-12 h-12 flex items-center justify-center border-r-2 border-retro-black hover:bg-retro-yellow transition-colors text-retro-black"
            >
              <GithubIcon size={18} />
            </a>
          )}
          {profile.linkedin_url && (
            <a
              href={profile.linkedin_url}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="w-12 h-12 flex items-center justify-center border-r-2 border-retro-black hover:bg-retro-yellow transition-colors text-retro-black"
            >
              <LinkedinIcon size={18} />
            </a>
          )}
          {profile.twitter_url && (
            <a
              href={profile.twitter_url}
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter"
              className="w-12 h-12 flex items-center justify-center border-r-2 border-retro-black hover:bg-retro-yellow transition-colors text-retro-black"
            >
              <TwitterIcon size={18} />
            </a>
          )}
          {profile.email && (
            <a
              href={`mailto:${profile.email}`}
              aria-label="Email"
              className="w-12 h-12 flex items-center justify-center border-r-2 border-retro-black hover:bg-retro-yellow transition-colors text-retro-black"
            >
              <Mail size={18} />
            </a>
          )}

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="px-4 bg-retro-purple text-white flex items-center justify-center hover:bg-[#723ff0] active:translate-y-0.5 transition-colors"
          >
            <ArrowUp size={20} />
          </button>
        </div>

      </div>
    </footer>
  );
};
