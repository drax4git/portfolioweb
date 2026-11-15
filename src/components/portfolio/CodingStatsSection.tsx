import React from 'react';
import { Code, Flame, GitCommit, Star, ExternalLink, Trophy, Cpu } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const CodingStatsSection: React.FC = () => {
  const { codingStatistics, adminPreviewMode } = useData();

  const visibleStats = codingStatistics.filter((s) => adminPreviewMode || s.status === 'published');

  return (
    <section id="coding-stats" className="border-b-4 border-retro-black bg-white p-6 sm:p-10 md:p-14">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-retro-yellow text-retro-black font-mono text-xs font-bold border-2 border-retro-black shadow-neo-sm mb-2">
              <Cpu size={16} />
              <span>ALGORITHMIC METRICS</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-black text-retro-black uppercase tracking-wider">
              CODING STATISTICS & ACTIVITY
            </h2>
          </div>
          <span className="font-mono text-xs font-bold bg-retro-lime px-3 py-1.5 border-2 border-retro-black shadow-neo-sm">
            VERIFIED PLATFORM PROFILES
          </span>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleStats.map((stat) => (
            <div
              key={stat.id}
              className="card-neo p-6 bg-retro-cream border-2 border-retro-black flex flex-col justify-between hover:-translate-y-1 hover:shadow-neo-lg transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider px-2 py-0.5 bg-white border border-retro-black">
                    {stat.platform}
                  </span>
                  {stat.profile_url && (
                    <a
                      href={stat.profile_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-retro-black hover:text-retro-purple"
                      aria-label={`View ${stat.platform} profile`}
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>

                <div className="font-display text-3xl sm:text-4xl font-black text-retro-black tracking-tight my-2">
                  {stat.metric_value}
                </div>

                <h3 className="font-mono text-xs font-bold text-gray-700 uppercase tracking-wide">
                  {stat.metric_name}
                </h3>
              </div>

              {stat.profile_url && (
                <div className="mt-4 pt-3 border-t border-retro-black/30">
                  <a
                    href={stat.profile_url}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-xs font-bold text-retro-purple hover:underline flex items-center gap-1"
                  >
                    <span>View Profile on {stat.platform}</span>
                    <span>→</span>
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
