import React from 'react';
import { Trophy, Award, Users, ExternalLink, Flame, Star, Sparkles, Terminal } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const HackathonsSection: React.FC = () => {
  const { hackathons, achievements, adminPreviewMode } = useData();

  const visibleHacks = hackathons.filter((h) => adminPreviewMode || h.status === 'published');
  const visibleAchs = achievements.filter((a) => adminPreviewMode || a.status === 'published');

  return (
    <section id="hackathons" className="border-b-4 border-retro-black bg-retro-cream p-6 sm:p-10 md:p-14">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Hackathons Header */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-retro-pink text-retro-black font-mono text-xs font-bold border-2 border-retro-black shadow-neo-sm mb-2">
            <Trophy size={16} />
            <span>COMPETITIONS & SPRINTS</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-black text-retro-black uppercase tracking-wider">
            HACKATHONS & WINS
          </h2>
        </div>

        {/* Hackathon Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {visibleHacks.map((hack) => (
            <div
              key={hack.id}
              className="card-neo p-6 md:p-8 bg-white flex flex-col justify-between hover:-translate-y-1 hover:shadow-neo-lg transition-all"
            >
              <div>
                {/* Award Banner */}
                <div className="inline-block px-3 py-1 bg-retro-yellow border-2 border-retro-black font-mono text-xs font-black shadow-neo-sm mb-4">
                  {hack.award_or_position}
                </div>

                <h3 className="font-display text-2xl font-black text-retro-black uppercase mb-1">
                  {hack.title}
                </h3>

                <div className="font-mono text-xs text-gray-600 mb-4 flex flex-wrap items-center gap-2">
                  <span>Organizer: <strong>{hack.organizer}</strong></span>
                  <span>•</span>
                  <span>{hack.event_date}</span>
                  {hack.team_name && (
                    <>
                      <span>•</span>
                      <span className="text-retro-purple font-bold">Team: {hack.team_name}</span>
                    </>
                  )}
                </div>

                {/* Built Project Info */}
                <div className="p-4 bg-retro-cream border-2 border-retro-black mb-4">
                  <div className="font-mono text-xs font-bold uppercase text-retro-purple mb-1">
                    PROJECT: {hack.project_name}
                  </div>
                  <p className="font-mono text-xs sm:text-sm text-retro-darkgray leading-relaxed">
                    {hack.project_description}
                  </p>
                </div>
              </div>

              {hack.project_url && (
                <div className="pt-2">
                  <a
                    href={hack.project_url}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-neo-lime text-xs py-1.5 px-3 inline-flex items-center gap-1.5"
                  >
                    <span>VIEW SUBMISSION</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Major Achievements & Honors Sub-section */}
        <div className="pt-8 border-t-4 border-retro-black">
          <div className="flex items-center gap-2 mb-6">
            <Award size={20} className="text-retro-purple" />
            <h3 className="font-display text-xl sm:text-2xl font-black text-retro-black uppercase tracking-wider">
              KEY ACHIEVEMENTS & CONTRIBUTIONS
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {visibleAchs.map((ach) => (
              <div
                key={ach.id}
                className="card-neo p-5 bg-white border-2 border-retro-black hover:bg-retro-yellow/20 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-none bg-retro-lime border-2 border-retro-black flex items-center justify-center font-bold text-xs shadow-neo-sm">
                    ★
                  </div>
                  <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 bg-retro-cream border border-retro-black">
                    {ach.date}
                  </span>
                </div>

                <h4 className="font-display text-base font-black uppercase text-retro-black mb-1">
                  {ach.title}
                </h4>

                <p className="font-mono text-xs text-retro-purple font-bold mb-2">
                  {ach.organization}
                </p>

                <p className="font-mono text-xs text-gray-700 leading-relaxed">
                  {ach.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
