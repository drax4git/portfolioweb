import React from 'react';
import {
  FolderGit2,
  Cpu,
  Briefcase,
  GraduationCap,
  Award,
  Trophy,
  MessageSquare,
  Eye,
  CheckCircle2,
  ExternalLink,
  UploadCloud,
  FileCheck,
  Zap,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { isSupabaseConfigured } from '../../lib/supabase';

interface AdminOverviewProps {
  onNavigateTab: (tab: string) => void;
}

export const AdminOverview: React.FC<AdminOverviewProps> = ({ onNavigateTab }) => {
  const {
    projects,
    skills,
    experience,
    education,
    certifications,
    hackathons,
    contactMessages,
    publishAllDrafts,
    adminPreviewMode,
    setAdminPreviewMode,
  } = useData();

  // Calculate drafts
  const draftProjects = projects.filter((p) => p.status === 'draft').length;
  const draftSkills = skills.filter((s) => s.status === 'draft').length;
  const draftTotal = draftProjects + draftSkills;

  const unreadMessages = contactMessages.filter((m) => !m.read).length;

  const statCards = [
    { label: 'Projects', count: projects.length, icon: FolderGit2, tab: 'projects', color: 'bg-retro-lime' },
    { label: 'Skills', count: skills.length, icon: Cpu, tab: 'skills', color: 'bg-retro-pink' },
    { label: 'Experience', count: experience.length, icon: Briefcase, tab: 'experience', color: 'bg-retro-yellow' },
    { label: 'Education', count: education.length, icon: GraduationCap, tab: 'education', color: 'bg-retro-cream' },
    { label: 'Certifications', count: certifications.length, icon: Award, tab: 'certifications', color: 'bg-retro-purple', textWhite: true },
    { label: 'Hackathons', count: hackathons.length, icon: Trophy, tab: 'hackathons', color: 'bg-retro-cyan' },
    { label: 'Messages', count: contactMessages.length, unread: unreadMessages, icon: MessageSquare, tab: 'messages', color: 'bg-retro-orange' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="card-neo bg-retro-cream p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-retro-purple text-white font-mono text-xs font-bold border-2 border-retro-black shadow-neo-sm mb-3">
            <span>DASHBOARD COCKPIT</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-black text-retro-black uppercase">
            PORTFOLIO CONTROL CENTER
          </h2>
          <p className="font-mono text-xs sm:text-sm text-retro-darkgray mt-2 max-w-xl">
            Manage all live portfolio content, projects, credentials, and inbound messages without editing code.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <button
            onClick={() => setAdminPreviewMode(!adminPreviewMode)}
            className={`btn-neo text-xs sm:text-sm flex items-center justify-center gap-2 ${
              adminPreviewMode ? 'bg-retro-yellow' : 'bg-white'
            }`}
          >
            <Eye size={16} />
            <span>{adminPreviewMode ? 'DISABLE PREVIEW' : 'PREVIEW DRAFTS'}</span>
          </button>

          {draftTotal > 0 && (
            <button
              onClick={publishAllDrafts}
              className="btn-neo-lime text-xs sm:text-sm flex items-center justify-center gap-2"
            >
              <CheckCircle2 size={16} />
              <span>PUBLISH ALL DRAFTS ({draftTotal})</span>
            </button>
          )}
        </div>
      </div>

      {/* Supabase Status Banner */}
      <div className={`card-neo p-4 sm:p-5 flex items-center justify-between gap-4 ${
        isSupabaseConfigured ? 'bg-green-50 border-green-800' : 'bg-retro-yellow/30'
      }`}>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 border-2 border-retro-black flex items-center justify-center font-bold shadow-neo-sm ${
            isSupabaseConfigured ? 'bg-[#3ECF8E] text-white' : 'bg-retro-yellow text-retro-black'
          }`}>
            <Zap size={20} />
          </div>
          <div>
            <div className="font-mono text-xs font-bold uppercase tracking-wider text-retro-black flex items-center gap-2">
              <span>BACKEND STATUS:</span>
              <span className={`px-2 py-0.5 text-[10px] border border-retro-black ${
                isSupabaseConfigured ? 'bg-green-300 text-black' : 'bg-white text-retro-black'
              }`}>
                {isSupabaseConfigured ? 'CONNECTED TO SUPABASE CLOUD' : 'LOCAL PERSISTENCE MODE'}
              </span>
            </div>
            <p className="font-mono text-xs text-gray-700 mt-0.5">
              {isSupabaseConfigured
                ? 'Your data and uploaded assets synchronize with Supabase PostgreSQL and Storage.'
                : 'Running on browser persistent storage with instant CRUD. Add Supabase keys in Settings to sync with cloud.'}
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigateTab('settings')}
          className="btn-neo text-xs py-1.5 px-3 bg-white hidden sm:block"
        >
          CONFIGURE
        </button>
      </div>

      {/* Entity Stat Cards Grid */}
      <div>
        <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-retro-black mb-4">
          PORTFOLIO INVENTORY
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {statCards.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                onClick={() => onNavigateTab(item.tab)}
                className={`card-neo p-5 cursor-pointer hover:-translate-y-1 hover:shadow-neo-lg transition-all ${item.color} ${
                  item.textWhite ? 'text-white' : 'text-retro-black'
                } flex flex-col justify-between`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon size={22} />
                  {item.unread && item.unread > 0 ? (
                    <span className="font-mono text-[10px] font-black px-1.5 py-0.5 bg-red-600 text-white border border-retro-black animate-pulse">
                      {item.unread} NEW
                    </span>
                  ) : null}
                </div>

                <div className="mt-4">
                  <div className="font-display text-3xl font-black">{item.count}</div>
                  <div className="font-mono text-xs font-bold uppercase tracking-wider mt-0.5">
                    {item.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Actions Bar */}
      <div className="card-neo bg-white p-6">
        <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-retro-black mb-4">
          FAST SHORTCUTS
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <button
            onClick={() => onNavigateTab('projects')}
            className="btn-neo text-xs py-2.5 px-4 justify-start gap-2 bg-retro-cream"
          >
            <span>+ Add New Project</span>
          </button>
          <button
            onClick={() => onNavigateTab('skills')}
            className="btn-neo text-xs py-2.5 px-4 justify-start gap-2 bg-retro-cream"
          >
            <span>+ Add Skill</span>
          </button>
          <button
            onClick={() => onNavigateTab('certifications')}
            className="btn-neo text-xs py-2.5 px-4 justify-start gap-2 bg-retro-cream"
          >
            <span>+ Add Certificate</span>
          </button>
          <button
            onClick={() => onNavigateTab('profile')}
            className="btn-neo text-xs py-2.5 px-4 justify-start gap-2 bg-retro-cream"
          >
            <span>Edit Profile & Photo</span>
          </button>
        </div>
      </div>
    </div>
  );
};
