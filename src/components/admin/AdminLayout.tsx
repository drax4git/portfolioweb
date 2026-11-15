import React, { useState } from 'react';
import {
  LayoutDashboard,
  User,
  FolderGit2,
  Cpu,
  Briefcase,
  GraduationCap,
  Award,
  Trophy,
  BarChart3,
  Share2,
  FileText,
  MessageSquare,
  Settings,
  LogOut,
  Eye,
  ExternalLink,
  Menu,
  X,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { AdminOverview } from './AdminOverview';
import { AdminProfile } from './AdminProfile';
import { AdminProjects } from './AdminProjects';
import { AdminSkills } from './AdminSkills';
import { AdminExperience } from './AdminExperience';
import { AdminEducation } from './AdminEducation';
import { AdminCertifications } from './AdminCertifications';
import { AdminHackathons } from './AdminHackathons';
import { AdminCodingStats } from './AdminCodingStats';
import { AdminSocials } from './AdminSocials';
import { AdminMessages } from './AdminMessages';
import { AdminSettings } from './AdminSettings';

interface AdminLayoutProps {
  onBackToSite: () => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ onBackToSite }) => {
  const {
    profile,
    adminUser,
    logout,
    adminPreviewMode,
    setAdminPreviewMode,
    publishAllDrafts,
    contactMessages,
  } = useData();

  const [activeTab, setActiveTab] = useState('overview');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const unreadCount = contactMessages.filter((m) => !m.read).length;

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'skills', label: 'Skills', icon: Cpu },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'certifications', label: 'Certifications', icon: Award },
    { id: 'hackathons', label: 'Hackathons & Wins', icon: Trophy },
    { id: 'coding_stats', label: 'Coding Stats', icon: BarChart3 },
    { id: 'socials', label: 'Social Links', icon: Share2 },
    { id: 'messages', label: 'Messages', icon: MessageSquare, badge: unreadCount },
    { id: 'settings', label: 'Settings & DB', icon: Settings },
  ];

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'overview':
        return <AdminOverview onNavigateTab={(tab) => setActiveTab(tab)} />;
      case 'profile':
        return <AdminProfile />;
      case 'projects':
        return <AdminProjects />;
      case 'skills':
        return <AdminSkills />;
      case 'experience':
        return <AdminExperience />;
      case 'education':
        return <AdminEducation />;
      case 'certifications':
        return <AdminCertifications />;
      case 'hackathons':
        return <AdminHackathons />;
      case 'coding_stats':
        return <AdminCodingStats />;
      case 'socials':
        return <AdminSocials />;
      case 'messages':
        return <AdminMessages />;
      case 'settings':
        return <AdminSettings />;
      default:
        return <AdminOverview onNavigateTab={(tab) => setActiveTab(tab)} />;
    }
  };

  return (
    <div className="min-h-screen bg-retro-cream flex flex-col font-sans antialiased">
      {/* Top Admin Header Bar */}
      <header className="sticky top-0 z-40 bg-white border-b-4 border-retro-black shadow-neo-sm">
        <div className="px-4 sm:px-6 flex items-center justify-between h-14 md:h-16">
          {/* Left: Mobile Toggle & Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="lg:hidden p-1.5 border-2 border-retro-black bg-retro-yellow shadow-neo-sm"
              aria-label="Toggle menu"
            >
              {mobileSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <div className="flex items-center gap-2">
              <span className="w-4 h-4 bg-retro-lime border-2 border-retro-black inline-block shadow-neo-sm" />
              <span className="font-mono font-black text-xs sm:text-sm tracking-wider uppercase">
                ADMIN CONSOLE // {profile.full_name}
              </span>
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Draft Preview Toggle */}
            <button
              onClick={() => setAdminPreviewMode(!adminPreviewMode)}
              className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 border-2 border-retro-black font-mono text-xs font-bold transition-all ${
                adminPreviewMode
                  ? 'bg-retro-yellow text-retro-black shadow-neo-sm -translate-y-0.5'
                  : 'bg-white text-gray-700 hover:bg-retro-cream'
              }`}
            >
              <Eye size={14} />
              <span>{adminPreviewMode ? 'PREVIEW MODE: ON' : 'PREVIEW MODE: OFF'}</span>
            </button>

            {/* View Live Portfolio */}
            <button
              onClick={onBackToSite}
              className="btn-neo text-xs py-1.5 px-3 bg-retro-cream flex items-center gap-1.5"
            >
              <span>VIEW PORTFOLIO</span>
              <ExternalLink size={14} />
            </button>

            {/* Logout */}
            <button
              onClick={logout}
              className="btn-neo text-xs py-1.5 px-2.5 bg-red-400 text-white hover:bg-red-500"
              title="Sign Out"
            >
              <LogOut size={14} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto p-4 sm:p-6 gap-6 items-start">
        {/* Desktop Sidebar Navigation */}
        <aside className="hidden lg:block w-64 flex-shrink-0 card-neo bg-white p-3 space-y-1">
          <div className="px-3 py-2 border-b-2 border-retro-black mb-2">
            <span className="font-mono text-[10px] font-bold text-gray-500 uppercase tracking-widest block">
              SIGNED IN AS
            </span>
            <span className="font-mono text-xs font-bold text-retro-black truncate block">
              {adminUser?.email || 'Administrator'}
            </span>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 font-mono text-xs font-bold transition-all border-2 ${
                    isActive
                      ? 'bg-retro-lime text-retro-black border-retro-black shadow-neo-sm -translate-x-0.5 -translate-y-0.5'
                      : 'bg-transparent text-gray-700 border-transparent hover:bg-retro-cream hover:border-retro-black'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Icon size={16} />
                    <span>{item.label}</span>
                  </span>
                  {item.badge && item.badge > 0 ? (
                    <span className="px-1.5 py-0.2 bg-red-500 text-white font-mono text-[10px] font-bold border border-retro-black">
                      {item.badge}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </nav>

          <div className="pt-3 border-t-2 border-retro-black mt-4">
            <button
              onClick={publishAllDrafts}
              className="w-full btn-neo-lime text-xs py-2 px-2 flex items-center justify-center gap-1.5"
            >
              <CheckCircle2 size={14} />
              <span>PUBLISH ALL DRAFTS</span>
            </button>
          </div>
        </aside>

        {/* Mobile Slide-Out Drawer */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div
              className="fixed inset-0 bg-retro-black/60"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <div className="relative w-64 bg-white border-r-4 border-retro-black shadow-neo-xl p-4 flex flex-col justify-between z-10">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b-2 border-retro-black pb-3">
                  <span className="font-mono font-bold text-xs uppercase">ADMIN MENU</span>
                  <button onClick={() => setMobileSidebarOpen(false)}>
                    <X size={20} />
                  </button>
                </div>

                <nav className="space-y-1">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveTab(item.id);
                          setMobileSidebarOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 font-mono text-xs font-bold border-2 ${
                          isActive
                            ? 'bg-retro-lime text-retro-black border-retro-black shadow-neo-sm'
                            : 'border-transparent text-gray-700 hover:bg-retro-cream'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <Icon size={16} />
                          <span>{item.label}</span>
                        </span>
                        {item.badge && item.badge > 0 ? (
                          <span className="px-1.5 py-0.2 bg-red-500 text-white font-mono text-[10px]">
                            {item.badge}
                          </span>
                        ) : null}
                      </button>
                    );
                  })}
                </nav>
              </div>

              <button
                onClick={publishAllDrafts}
                className="btn-neo-lime text-xs py-2 w-full flex items-center justify-center gap-1"
              >
                <CheckCircle2 size={14} />
                <span>PUBLISH DRAFTS</span>
              </button>
            </div>
          </div>
        )}

        {/* Main Content Viewport */}
        <main className="flex-1 min-w-0">
          {renderActiveTab()}
        </main>
      </div>
    </div>
  );
};
