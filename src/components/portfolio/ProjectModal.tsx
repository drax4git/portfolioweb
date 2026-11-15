import React from 'react';
import { X, ExternalLink, Tag } from 'lucide-react';
import { Project } from '../../types/portfolio';
import { TechIcon } from '../common/TechIcon';
import { GithubIcon } from '../common/SocialIcons';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-retro-black/75 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-3xl bg-white border-4 border-retro-black shadow-neo-xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Retro Window Bar */}
        <div className="bg-retro-black text-white px-4 py-2.5 flex items-center justify-between border-b-4 border-retro-black">
          <div className="flex items-center gap-2 font-mono text-xs font-bold tracking-wider">
            <span className="w-3 h-3 bg-retro-lime inline-block border border-white" />
            <span>PROJECT_VIEWER // {project.title}.EXE</span>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 bg-retro-pink text-retro-black border-2 border-white flex items-center justify-center font-black hover:bg-white transition-colors"
            aria-label="Close modal"
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto p-6 md:p-8 space-y-6">
          {/* Project Screenshot / Visual Frame */}
          <div className="relative border-3 border-retro-black p-2 bg-retro-pink shadow-neo">
            <img
              src={project.image_url}
              alt={project.title}
              className="w-full h-64 sm:h-80 object-cover border-2 border-retro-black bg-white"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80';
              }}
            />
          </div>

          {/* Title & Status */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-retro-black pb-4">
            <div>
              <span className="text-xs font-mono font-bold tracking-widest text-retro-purple uppercase">
                {project.featured ? '★ FEATURED PROJECT' : 'PROJECT SHOWCASE'}
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-black text-retro-black uppercase">
                {project.title}
              </h2>
            </div>

            {/* Quick Links */}
            <div className="flex items-center gap-3">
              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-neo text-xs flex items-center gap-1.5 text-retro-black"
                >
                  <GithubIcon size={16} />
                  <span>CODE</span>
                </a>
              )}
              {project.live_url && (
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-neo-lime text-xs flex items-center gap-1.5"
                >
                  <span>LIVE DEMO</span>
                  <ExternalLink size={16} />
                </a>
              )}
            </div>
          </div>

          {/* Detailed Description */}
          <div>
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
              PROJECT OVERVIEW
            </h4>
            <p className="font-mono text-sm sm:text-base text-retro-darkgray leading-relaxed bg-retro-cream p-4 border-2 border-retro-black">
              {project.detailed_description || project.description}
            </p>
          </div>

          {/* Technologies Used */}
          <div>
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 flex items-center gap-1.5">
              <Tag size={14} />
              <span>TECHNOLOGIES & ARCHITECTURE</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, idx) => (
                <div
                  key={idx}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border-2 border-retro-black shadow-neo-sm font-mono text-xs font-bold text-retro-black"
                >
                  <TechIcon name={tag} className="w-4 h-4" size={16} />
                  <span>{tag}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-retro-cream border-t-2 border-retro-black px-6 py-3 flex items-center justify-between">
          <span className="font-mono text-xs text-gray-500">Press ESC or click close</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-white border-2 border-retro-black font-mono text-xs font-bold shadow-neo-sm hover:bg-retro-yellow active:translate-x-0.5 active:translate-y-0.5"
          >
            DISMISS
          </button>
        </div>
      </div>
    </div>
  );
};
