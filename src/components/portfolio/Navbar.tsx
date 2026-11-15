import React, { useState } from 'react';
import { Menu, X, ArrowUpRight, ShieldCheck, Eye } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const Navbar: React.FC = () => {
  const { profile, isAdmin, adminPreviewMode } = useData();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'SKILLS', href: '#skills' },
    { label: 'PROJECTS', href: '#projects' },
    { label: 'EXPERIENCE', href: '#experience' },
    { label: 'EDUCATION', href: '#education' },
    { label: 'CERTIFICATIONS', href: '#certifications' },
    { label: 'HACKATHONS', href: '#hackathons' },
    { label: 'STATS', href: '#coding-stats' },
  ];

  return (
    <>
      {/* Draft Mode Notice Banner for Admin */}
      {isAdmin && adminPreviewMode && (
        <div className="bg-retro-yellow text-retro-black border-b-2 border-retro-black py-1.5 px-4 text-center font-mono text-xs font-bold flex items-center justify-center gap-2 sticky top-0 z-50">
          <Eye size={14} className="animate-pulse" />
          <span>ADMIN PREVIEW MODE ACTIVE: You are viewing draft updates before publishing.</span>
          <a href="/admin" className="underline hover:text-retro-purple ml-2">Back to Dashboard</a>
        </div>
      )}

      <header className="sticky top-0 z-40 bg-white border-b-4 border-retro-black shadow-neo-sm">
        <div className="max-w-7xl mx-auto flex items-stretch justify-between h-14 md:h-16">
          {/* Logo / Brand badge */}
          <a
            href="#"
            className="flex items-center px-4 md:px-6 bg-retro-lime border-r-4 border-retro-black hover:bg-[#bbf73c] transition-colors"
          >
            <span className="font-mono font-black text-sm md:text-base tracking-wider text-retro-black flex items-center gap-2">
              <span className="font-display">&lt;/&gt;</span>
              <span>{profile.full_name.toUpperCase()}</span>
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center flex-1 justify-center space-x-1 md:space-x-3 px-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-2.5 py-1 text-xs md:text-sm font-mono font-bold tracking-wider text-retro-black hover:bg-retro-yellow hover:border-2 hover:border-retro-black transition-all hover:shadow-neo-sm"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-stretch">
            {/* Admin Dashboard Quick Link */}
            <a
              href="/admin"
              title="Admin Dashboard"
              className="hidden sm:flex items-center gap-1.5 px-3 md:px-4 bg-retro-cream border-l-4 border-retro-black font-mono text-xs font-bold hover:bg-retro-yellow transition-colors"
            >
              <ShieldCheck size={16} className="text-retro-black" />
              <span>{isAdmin ? 'ADMIN' : 'LOGIN'}</span>
            </a>

            {/* Contact CTA Button */}
            <a
              href="#contact"
              className="flex items-center gap-1.5 px-4 md:px-6 bg-retro-purple text-white font-mono font-black text-xs md:text-sm tracking-wider border-l-4 border-retro-black hover:bg-[#703ff0] active:translate-y-0.5 transition-all select-none"
            >
              <span>CONTACT ME</span>
              <ArrowUpRight size={18} />
            </a>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex items-center justify-center w-14 bg-retro-yellow border-l-4 border-retro-black hover:bg-[#ebd915]"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-retro-cream border-t-2 border-retro-black p-4 space-y-2 shadow-neo-lg">
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 bg-white border-2 border-retro-black font-mono text-xs font-bold shadow-neo-sm text-center hover:bg-retro-lime active:translate-x-0.5 active:translate-y-0.5"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pt-2 border-t-2 border-retro-black flex items-center justify-between">
              <a
                href="/admin"
                className="flex items-center gap-2 px-3 py-2 bg-retro-pink text-retro-black border-2 border-retro-black font-mono text-xs font-bold shadow-neo-sm"
              >
                <ShieldCheck size={16} />
                <span>{isAdmin ? 'ADMIN DASHBOARD' : 'ADMIN LOGIN'}</span>
              </a>

              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2 bg-retro-purple text-white border-2 border-retro-black font-mono text-xs font-bold shadow-neo-sm"
              >
                LET'S TALK ↗
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
