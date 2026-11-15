import React, { useState } from 'react';
import { ArrowRight, Code, Database, Globe, Layers, Sparkles } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { SkillCategory } from '../../types/portfolio';
import { TechIcon } from '../common/TechIcon';

export const SkillsSection: React.FC = () => {
  const { skills, adminPreviewMode } = useData();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Filter skills based on status (and admin preview)
  const visibleSkills = skills.filter((s) => {
    if (!adminPreviewMode && s.status === 'draft') return false;
    if (selectedCategory === 'all') return true;
    return s.category === selectedCategory;
  });

  const categories: { key: string; label: string }[] = [
    { key: 'all', label: 'ALL SKILLS' },
    { key: 'frontend', label: 'FRONTEND' },
    { key: 'backend', label: 'BACKEND' },
    { key: 'database', label: 'DATABASE' },
    { key: 'languages', label: 'LANGUAGES' },
    { key: 'tools', label: 'TOOLS & PLATFORMS' },
  ];

  return (
    <section id="skills" className="border-b-4 border-retro-black bg-white">
      {/* Top Banner Row matching reference: Purple 'SKILLS ->' header box */}
      <div className="border-b-4 border-retro-black flex flex-col md:flex-row items-stretch">
        <div className="bg-retro-purple text-white px-6 md:px-10 py-5 flex items-center justify-between md:justify-start gap-4 border-b-4 md:border-b-0 md:border-r-4 border-retro-black md:min-w-[260px]">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-black uppercase tracking-wider">
              SKILLS
            </h2>
            <p className="font-mono text-xs text-purple-200 mt-0.5">CORE TECH ARSENAL</p>
          </div>
          <ArrowRight size={28} className="animate-pulse" />
        </div>

        {/* Category Filters Bar */}
        <div className="flex-1 bg-retro-cream p-3 md:p-4 flex items-center flex-wrap gap-2 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-3 py-1.5 font-mono text-xs font-bold tracking-wider uppercase border-2 border-retro-black transition-all ${
                selectedCategory === cat.key
                  ? 'bg-retro-lime text-retro-black shadow-neo-sm -translate-y-0.5'
                  : 'bg-white text-retro-black hover:bg-retro-yellow'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Skills Grid */}
      <div className="max-w-7xl mx-auto p-6 md:p-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {visibleSkills.map((skill) => (
            <div
              key={skill.id}
              className="card-neo p-4 flex flex-col items-center justify-between text-center relative group hover:-translate-y-1 hover:shadow-neo-lg transition-all bg-white"
            >
              {/* Draft indicator */}
              {skill.status === 'draft' && (
                <span className="absolute top-1 right-1 bg-retro-yellow text-retro-black text-[9px] font-mono font-bold px-1 border border-retro-black">
                  DRAFT
                </span>
              )}

              {/* Icon Container with Neo-Brutalist Frame */}
              <div className="w-12 h-12 bg-retro-cream border-2 border-retro-black flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-retro-lime transition-all shadow-neo-sm">
                <TechIcon name={skill.name} className="w-6 h-6 text-retro-black" size={24} />
              </div>

              {/* Skill Name */}
              <h3 className="font-mono font-bold text-xs md:text-sm text-retro-black tracking-wide mb-2 line-clamp-1">
                {skill.name}
              </h3>

              {/* Proficiency Level Bar */}
              <div className="w-full bg-retro-cream border border-retro-black h-2 overflow-hidden mt-1">
                <div
                  className="bg-retro-purple h-full transition-all duration-500 group-hover:bg-retro-lime"
                  style={{ width: `${skill.proficiency}%` }}
                />
              </div>

              <span className="text-[10px] font-mono font-semibold text-gray-500 mt-1">
                {skill.proficiency}%
              </span>
            </div>
          ))}
        </div>

        {visibleSkills.length === 0 && (
          <div className="text-center py-12 border-2 border-dashed border-retro-black bg-retro-cream font-mono">
            <p className="text-sm font-bold text-gray-600">No skills found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
};
