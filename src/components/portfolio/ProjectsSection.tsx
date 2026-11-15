import React, { useState } from 'react';
import { ArrowRight, ExternalLink, Award, ChevronLeft, ChevronRight } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Project, Certification } from '../../types/portfolio';
import { WeatherlyIllustration } from './WeatherlyIllustration';
import { ProjectModal } from './ProjectModal';
import { TechIcon } from '../common/TechIcon';
import { GithubIcon } from '../common/SocialIcons';

interface ProjectsSectionProps {
  onOpenCertModal?: (cert: Certification) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onOpenCertModal }) => {
  const { projects, certifications, adminPreviewMode } = useData();
  const [activeIndex, setActiveIndex] = useState(0);
  const [showAllModal, setShowAllModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Filter projects based on draft status
  const visibleProjects = projects.filter((p) => adminPreviewMode || p.status === 'published');
  const visibleCerts = certifications.filter((c) => adminPreviewMode || c.status === 'published');

  const currentProject = visibleProjects[activeIndex] || visibleProjects[0];

  const handleNext = () => {
    if (visibleProjects.length === 0) return;
    setActiveIndex((prev) => (prev + 1) % visibleProjects.length);
  };

  const handlePrev = () => {
    if (visibleProjects.length === 0) return;
    setActiveIndex((prev) => (prev - 1 + visibleProjects.length) % visibleProjects.length);
  };

  return (
    <section id="projects" className="border-b-4 border-retro-black bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 items-stretch">
        
        {/* LEFT / CENTER: Featured Projects (8 cols) */}
        <div className="lg:col-span-8 p-6 sm:p-8 md:p-10 border-b-4 lg:border-b-0 lg:border-r-4 border-retro-black flex flex-col justify-between">
          <div>
            {/* Header with Title, View All, and Carousel controls */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-black text-retro-black uppercase tracking-wider">
                  FEATURED PROJECTS
                </h2>
                <div className="mt-2">
                  <button
                    onClick={() => setShowAllModal(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border-2 border-retro-black font-mono text-xs font-bold shadow-neo-sm hover:bg-retro-yellow active:translate-x-0.5 active:translate-y-0.5"
                  >
                    <span>VIEW ALL PROJECTS ({visibleProjects.length})</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>

              {/* Prev / Next controls matching reference */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="w-9 h-9 bg-retro-pink border-2 border-retro-black flex items-center justify-center shadow-neo-sm hover:bg-[#ff6189] active:translate-x-0.5 active:translate-y-0.5 transition-all"
                  aria-label="Previous project"
                >
                  <ChevronLeft size={20} className="text-retro-black" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-9 h-9 bg-retro-pink border-2 border-retro-black flex items-center justify-center shadow-neo-sm hover:bg-[#ff6189] active:translate-x-0.5 active:translate-y-0.5 transition-all"
                  aria-label="Next project"
                >
                  <ChevronRight size={20} className="text-retro-black" />
                </button>
              </div>
            </div>

            {/* Current Project Card */}
            {currentProject && (
              <div className="card-neo p-4 sm:p-6 bg-white relative">
                {/* Draft Badge */}
                {currentProject.status === 'draft' && (
                  <span className="absolute top-2 right-2 bg-retro-yellow text-retro-black text-[10px] font-mono font-bold px-2 py-0.5 border border-retro-black z-20">
                    DRAFT (ADMIN ONLY)
                  </span>
                )}

                {/* Project Image Frame (Pink border container matching reference) */}
                <div className="p-2 sm:p-3 bg-retro-pink border-3 border-retro-black shadow-neo mb-6">
                  {currentProject.title.toUpperCase().includes('WEATHERLY') ? (
                    <WeatherlyIllustration />
                  ) : (
                    <div className="w-full h-56 sm:h-72 bg-retro-black border-2 border-retro-black overflow-hidden relative group">
                      <img
                        src={currentProject.image_url}
                        alt={currentProject.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80';
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Project Details */}
                <div className="space-y-4">
                  <h3 className="font-display text-2xl sm:text-3xl font-black text-retro-black uppercase">
                    {currentProject.title}
                  </h3>

                  <p className="font-mono text-sm sm:text-base text-retro-darkgray leading-relaxed">
                    {currentProject.description}
                  </p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {currentProject.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border-2 border-retro-black font-mono text-xs font-bold text-retro-black shadow-neo-sm"
                      >
                        <TechIcon name={tag} className="w-3.5 h-3.5" size={14} />
                        <span>{tag}</span>
                      </span>
                    ))}
                  </div>

                  {/* Buttons Row */}
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => setSelectedProject(currentProject)}
                      className="btn-neo text-xs sm:text-sm flex items-center gap-1.5"
                    >
                      <span>VIEW DETAILS</span>
                      <ArrowRight size={16} />
                    </button>

                    {currentProject.live_url && (
                      <a
                        href={currentProject.live_url}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-neo-lime text-xs sm:text-sm flex items-center gap-1.5"
                      >
                        <span>LIVE DEMO</span>
                        <ExternalLink size={16} />
                      </a>
                    )}

                    {currentProject.github_url && (
                      <a
                        href={currentProject.github_url}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-neo text-xs sm:text-sm flex items-center gap-1.5 text-retro-black"
                      >
                        <GithubIcon size={16} />
                        <span>GITHUB</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Carousel Pagination Dots */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {visibleProjects.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                aria-label={`Go to project ${idx + 1}`}
                className={`w-3 h-3 rounded-full border-2 border-retro-black transition-all ${
                  activeIndex === idx ? 'bg-retro-black scale-125' : 'bg-retro-cream hover:bg-retro-lime'
                }`}
              />
            ))}
          </div>
        </div>

        {/* RIGHT: Certifications Sidebar (4 cols) matching reference layout */}
        <div className="lg:col-span-4 bg-retro-lime p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl sm:text-2xl font-black text-retro-black uppercase tracking-wider">
                CERTIFICATIONS
              </h2>
              <Award size={24} className="text-retro-black" />
            </div>

            {/* Stacked Certificate Cards matching Cert 1, Cert 2, Cert 3 */}
            <div className="space-y-4">
              {visibleCerts.slice(0, 3).map((cert, index) => (
                <div
                  key={cert.id}
                  onClick={() => onOpenCertModal?.(cert)}
                  className="card-neo p-4 sm:p-5 bg-white cursor-pointer hover:-translate-y-1 hover:shadow-neo-lg transition-all group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-[10px] font-bold text-gray-500 uppercase">
                      CERTIFICATION #{index + 1}
                    </span>
                    <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 bg-retro-yellow border border-retro-black">
                      {cert.issue_date}
                    </span>
                  </div>

                  <h3 className="font-display text-base sm:text-lg font-black text-retro-black group-hover:text-retro-purple transition-colors line-clamp-1">
                    {cert.title}
                  </h3>

                  <p className="font-mono text-xs text-retro-darkgray mt-1">
                    Issuer: <strong className="text-retro-black">{cert.issuer}</strong>
                  </p>

                  <div className="mt-3 flex items-center justify-between text-xs font-mono font-bold text-retro-purple pt-2 border-t border-gray-200">
                    <span>VERIFY CREDENTIAL</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom link to view all certifications */}
          <div className="mt-6 pt-4 border-t-2 border-retro-black">
            <a
              href="#certifications"
              className="w-full btn-neo text-xs sm:text-sm flex items-center justify-center gap-2 bg-white"
            >
              <span>VIEW ALL CERTIFICATIONS</span>
              <ArrowRight size={16} />
            </a>
          </div>
        </div>

      </div>

      {/* Selected Project Full Details Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* View All Projects Modal */}
      {showAllModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-retro-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-5xl bg-retro-cream border-4 border-retro-black shadow-neo-xl max-h-[90vh] flex flex-col">
            <div className="bg-retro-black text-white px-4 py-3 flex items-center justify-between border-b-4 border-retro-black">
              <h3 className="font-mono text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                <span className="w-3 h-3 bg-retro-lime inline-block" />
                ALL PROJECTS ARCHIVE ({visibleProjects.length})
              </h3>
              <button
                onClick={() => setShowAllModal(false)}
                className="px-2 py-0.5 bg-retro-pink text-retro-black border border-white font-mono text-xs font-bold hover:bg-white"
              >
                CLOSE [X]
              </button>
            </div>

            <div className="overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {visibleProjects.map((proj) => (
                <div key={proj.id} className="card-neo p-5 bg-white flex flex-col justify-between">
                  <div>
                    <div className="h-44 bg-retro-pink border-2 border-retro-black mb-3 overflow-hidden">
                      <img
                        src={proj.image_url}
                        alt={proj.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80';
                        }}
                      />
                    </div>
                    <h4 className="font-display text-xl font-black uppercase text-retro-black mb-1">{proj.title}</h4>
                    <p className="font-mono text-xs text-gray-700 mb-3">{proj.description}</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {proj.tags.map((t, i) => (
                        <span key={i} className="text-[10px] font-mono font-bold bg-retro-cream border border-retro-black px-2 py-0.5">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-gray-200">
                    <button
                      onClick={() => {
                        setShowAllModal(false);
                        setSelectedProject(proj);
                      }}
                      className="btn-neo text-xs py-1.5 px-3"
                    >
                      DETAILS ↗
                    </button>
                    {proj.live_url && (
                      <a href={proj.live_url} target="_blank" rel="noreferrer" className="btn-neo-lime text-xs py-1.5 px-3">
                        DEMO
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
