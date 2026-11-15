import React from 'react';
import { GraduationCap, Award, Calendar, BookOpen } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const EducationSection: React.FC = () => {
  const { education, adminPreviewMode } = useData();

  const visibleEdu = education.filter((e) => adminPreviewMode || e.status === 'published');

  const cardColors = ['bg-retro-yellow', 'bg-retro-cream', 'bg-retro-lime'];

  return (
    <section id="education" className="border-b-4 border-retro-black bg-retro-cream p-6 sm:p-10 md:p-14">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-retro-purple text-white font-mono text-xs font-bold border-2 border-retro-black shadow-neo-sm mb-2">
              <GraduationCap size={16} />
              <span>ACADEMIC FOUNDATION</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-black text-retro-black uppercase tracking-wider">
              EDUCATION & DEGREES
            </h2>
          </div>
          <span className="font-mono text-xs font-bold bg-white px-3 py-1.5 border-2 border-retro-black shadow-neo-sm">
            COMPUTER SCIENCE & SOFTWARE ENG
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {visibleEdu.map((edu, idx) => (
            <div
              key={edu.id}
              className={`card-neo p-6 md:p-8 ${cardColors[idx % cardColors.length]} relative overflow-hidden flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 bg-white border border-retro-black shadow-neo-sm">
                    {edu.start_year} — {edu.end_year}
                  </span>
                  {edu.grade_or_honors && (
                    <span className="font-mono text-xs font-bold px-2 py-0.5 bg-retro-pink border border-retro-black shadow-neo-sm">
                      ★ {edu.grade_or_honors}
                    </span>
                  )}
                </div>

                <h3 className="font-display text-2xl font-black text-retro-black uppercase mb-1">
                  {edu.institution}
                </h3>

                <h4 className="font-mono text-sm font-bold text-retro-purple mb-4">
                  {edu.degree} in {edu.field_of_study}
                </h4>

                {edu.description && (
                  <p className="font-mono text-xs sm:text-sm text-retro-darkgray leading-relaxed bg-white/70 p-3 border-2 border-retro-black">
                    {edu.description}
                  </p>
                )}
              </div>

              <div className="mt-6 pt-3 border-t-2 border-retro-black/40 flex items-center justify-between text-xs font-mono font-bold">
                <span className="text-gray-700">VERIFIED ACADEMIC RECORD</span>
                <span className="text-retro-black font-black">✓ COMPLETED</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
