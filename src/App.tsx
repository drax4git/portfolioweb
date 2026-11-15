import React, { useState, useEffect } from 'react';
import { useData } from './context/DataContext';
import { Navbar } from './components/portfolio/Navbar';
import { HeroSection } from './components/portfolio/HeroSection';
import { SkillsSection } from './components/portfolio/SkillsSection';
import { ProjectsSection } from './components/portfolio/ProjectsSection';
import { ExperienceSection } from './components/portfolio/ExperienceSection';
import { EducationSection } from './components/portfolio/EducationSection';
import { CertificationsSection } from './components/portfolio/CertificationsSection';
import { HackathonsSection } from './components/portfolio/HackathonsSection';
import { CodingStatsSection } from './components/portfolio/CodingStatsSection';
import { ContactSection } from './components/portfolio/ContactSection';
import { Footer } from './components/portfolio/Footer';
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminLogin } from './components/admin/AdminLogin';
import { Certification } from './types/portfolio';
import { X } from 'lucide-react';

export const App: React.FC = () => {
  const { isAdmin } = useData();
  const [currentRoute, setCurrentRoute] = useState<'portfolio' | 'admin'>('portfolio');
  const [activeCertModal, setActiveCertModal] = useState<Certification | null>(null);

  // Sync routing from window.location.pathname or hash
  useEffect(() => {
    const checkRoute = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path.startsWith('/admin') || hash === '#admin') {
        setCurrentRoute('admin');
      } else {
        setCurrentRoute('portfolio');
      }
    };

    checkRoute();
    window.addEventListener('popstate', checkRoute);
    window.addEventListener('hashchange', checkRoute);
    return () => {
      window.removeEventListener('popstate', checkRoute);
      window.removeEventListener('hashchange', checkRoute);
    };
  }, []);

  const navigateToAdmin = () => {
    window.history.pushState({}, '', '/admin');
    setCurrentRoute('admin');
  };

  const navigateToPortfolio = () => {
    window.history.pushState({}, '', '/');
    setCurrentRoute('portfolio');
  };

  // If in Admin Route
  if (currentRoute === 'admin') {
    if (!isAdmin) {
      return (
        <AdminLogin
          onSuccess={() => setCurrentRoute('admin')}
          onBackToSite={navigateToPortfolio}
        />
      );
    }
    return <AdminLayout onBackToSite={navigateToPortfolio} />;
  }

  // Public Developer Portfolio View
  return (
    <div className="min-h-screen flex flex-col bg-retro-cream text-retro-black selection:bg-retro-lime selection:text-retro-black">
      {/* Sticky Neo-Brutalist Navigation */}
      <Navbar />

      {/* Main Portfolio Sections */}
      <main className="flex-1">
        {/* Split-screen Hero Section */}
        <HeroSection />

        {/* Core Skills Matrix with Official Icons & Category Filters */}
        <SkillsSection />

        {/* Featured Projects with Carousel, Illustration & Certifications sidebar */}
        <ProjectsSection onOpenCertModal={(cert) => setActiveCertModal(cert)} />

        {/* Vertical Career Timeline & Call-To-Action Banner */}
        <ExperienceSection />

        {/* Education & Academic Credentials */}
        <EducationSection />

        {/* Full Certifications & Licenses Grid */}
        <CertificationsSection />

        {/* Hackathon Wins & Major Achievements */}
        <HackathonsSection />

        {/* Algorithmic Coding Statistics */}
        <CodingStatsSection />

        {/* Bold Contact Section with Live Confetti Form */}
        <ContactSection />
      </main>

      {/* Retro Footer */}
      <Footer />

      {/* Global Certificate Preview Lightbox */}
      {activeCertModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-retro-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl bg-white border-4 border-retro-black shadow-neo-xl overflow-hidden">
            <div className="bg-retro-black text-white px-4 py-2.5 flex items-center justify-between border-b-2 border-retro-black">
              <span className="font-mono text-xs font-bold uppercase">
                CREDENTIAL_DOCUMENT // {activeCertModal.title}
              </span>
              <button
                onClick={() => setActiveCertModal(null)}
                className="w-6 h-6 bg-retro-pink text-retro-black flex items-center justify-center font-bold"
              >
                <X size={14} />
              </button>
            </div>
            <div className="p-4 bg-retro-cream">
              <img
                src={activeCertModal.image_url || 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=800&q=80'}
                alt={activeCertModal.title}
                className="w-full max-h-[60vh] object-contain border-2 border-retro-black bg-white"
              />
            </div>
            <div className="p-4 bg-white border-t-2 border-retro-black flex items-center justify-between">
              <div>
                <p className="font-display text-sm font-black uppercase">{activeCertModal.title}</p>
                <p className="font-mono text-xs text-gray-600">{activeCertModal.issuer} • {activeCertModal.issue_date}</p>
              </div>
              <button
                onClick={() => setActiveCertModal(null)}
                className="btn-neo text-xs py-1 px-3"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
