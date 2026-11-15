import React from 'react';
import { ArrowRight, Briefcase, Calendar, CheckCircle2, FileText } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { StarburstSticker } from '../common/RetroStickers';

export const ExperienceSection: React.FC = () => {
  const { experience, profile, adminPreviewMode } = useData();

  const visibleExp = experience.filter((e) => adminPreviewMode || e.status === 'published');

  return (
    <section id="experience" className="border-b-4 border-retro-black bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 items-stretch">
        
        {/* LEFT COLUMN: Pink Header Block matching reference */}
        <div className="lg:col-span-2 bg-retro-pink p-6 md:p-8 border-b-4 lg:border-b-0 lg:border-r-4 border-retro-black flex flex-col justify-between">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-black text-retro-black uppercase tracking-wider">
              EXPERIENCE
            </h2>
            <ArrowRight size={32} className="text-retro-black mt-2 hidden lg:block" />
          </div>
          <div className="mt-8">
            <span className="font-mono text-xs font-bold bg-white px-2 py-1 border-2 border-retro-black inline-block shadow-neo-sm">
              6+ YEARS XP
            </span>
          </div>
        </div>

        {/* MIDDLE COLUMN: Vertical Timeline */}
        <div className="lg:col-span-6 p-6 sm:p-10 border-b-4 lg:border-b-0 lg:border-r-4 border-retro-black bg-white flex flex-col justify-between">
          <div className="space-y-8 relative before:absolute before:inset-0 before:left-2 before:w-0.5 before:bg-retro-black">
            {visibleExp.map((exp) => (
              <div key={exp.id} className="relative pl-8 group">
                {/* Timeline Dot */}
                <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-retro-black border-2 border-white shadow-[1px_1px_0px_#111111] group-hover:bg-retro-lime transition-colors" />

                <div className="space-y-2">
                  {/* Role & Company */}
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-display text-base sm:text-lg font-black text-retro-black uppercase">
                      {exp.role} <span className="text-retro-purple">•</span> {exp.organization}
                    </h3>
                  </div>

                  {/* Dates */}
                  <div className="font-mono text-xs font-bold text-gray-500 tracking-wider">
                    {exp.start_date} — {exp.end_date}
                    {exp.location && <span className="text-gray-400"> ({exp.location})</span>}
                  </div>

                  {/* Description */}
                  <p className="font-mono text-xs sm:text-sm text-retro-darkgray leading-relaxed">
                    {exp.description}
                  </p>

                  {/* Bullet achievements if available */}
                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul className="space-y-1.5 pt-1">
                      {exp.achievements.map((ach, idx) => (
                        <li key={idx} className="font-mono text-xs text-gray-700 flex items-start gap-2">
                          <span className="text-retro-purple font-bold">›</span>
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Tech stack pills */}
                  {exp.technologies && exp.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {exp.technologies.map((t, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-mono font-bold bg-retro-cream px-2 py-0.5 border border-retro-black"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Button: View Full Resume */}
          <div className="mt-10 pt-4 border-t-2 border-retro-black">
            <a
              href={profile.resume_url || '#resume'}
              target="_blank"
              rel="noreferrer"
              className="btn-neo text-xs sm:text-sm flex items-center justify-center gap-2 max-w-xs"
            >
              <FileText size={16} />
              <span>VIEW FULL RESUME</span>
              <ArrowRight size={14} />
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN: Purple Call-to-action Block with Starburst matching reference */}
        <div className="lg:col-span-4 bg-retro-purple p-8 sm:p-10 text-white flex flex-col justify-between relative overflow-hidden bg-grid-dark">
          {/* Headline */}
          <div>
            <div className="inline-block px-2 py-1 bg-retro-lime text-retro-black font-mono text-[10px] font-bold uppercase mb-4 border border-retro-black">
              COLLABORATION
            </div>
            <h3 className="font-display text-3xl sm:text-4xl font-black uppercase tracking-tight text-white leading-tight">
              LET'S BUILD SOMETHING AMAZING TOGETHER.
            </h3>
          </div>

          {/* Action button */}
          <div className="my-8 z-10">
            <a
              href="#contact"
              className="btn-neo bg-white text-retro-black text-sm sm:text-base font-bold flex items-center justify-center gap-2 hover:bg-retro-yellow"
            >
              <span>GET IN TOUCH</span>
              <ArrowRight size={18} />
            </a>
          </div>

          {/* Decorative Starburst sticker in bottom right matching reference */}
          <div className="absolute -bottom-4 -right-4 z-0 pointer-events-none">
            <StarburstSticker text="HIRE ME!" color="#FF789B" className="w-28 h-28 transform rotate-12" />
          </div>
        </div>

      </div>
    </section>
  );
};
