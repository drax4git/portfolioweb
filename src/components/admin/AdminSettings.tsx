import React, { useState } from 'react';
import { Save, RefreshCw, Zap, ShieldAlert, CheckCircle2, ShieldCheck, User } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { isSupabaseConfigured } from '../../lib/supabase';
import { AdminConfirmModal } from './AdminConfirmModal';

export const AdminSettings: React.FC = () => {
  const {
    siteSettings,
    updateSiteSettings,
    resetToDefaults,
    adminUser,
  } = useData();

  const [formData, setFormData] = useState({ ...siteSettings });
  const [isSaving, setIsSaving] = useState(false);
  const [notification, setNotification] = useState('');
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await updateSiteSettings(formData);
    setIsSaving(false);
    setNotification('Website settings saved!');
    setTimeout(() => setNotification(''), 3000);
  };

  const handleReset = () => {
    resetToDefaults();
    setIsResetConfirmOpen(false);
    setNotification('Reset portfolio to initial demo state!');
    setTimeout(() => setNotification(''), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-retro-black pb-4">
        <div>
          <h2 className="font-display text-2xl font-black text-retro-black uppercase">
            WEBSITE SETTINGS & DATABASE
          </h2>
          <p className="font-mono text-xs text-gray-600">
            Configure SEO metadata, theme accents, and review connected Supabase backend status.
          </p>
        </div>

        {notification && (
          <div className="bg-retro-lime border-2 border-retro-black px-3 py-1 font-mono text-xs font-bold text-retro-black shadow-neo-sm">
            ✓ {notification}
          </div>
        )}
      </div>

      {/* 1. Authenticated Administrator Session Info */}
      <div className="card-neo bg-white p-6 space-y-3 border-2 border-retro-black">
        <div className="flex items-center justify-between border-b-2 border-retro-black pb-3">
          <div className="flex items-center gap-2">
            <ShieldCheck size={20} className="text-retro-purple" />
            <h3 className="font-display text-base font-black uppercase text-retro-black">
              AUTHORIZED ADMINISTRATOR
            </h3>
          </div>
          <span className="font-mono text-[10px] font-bold bg-retro-lime text-retro-black px-2 py-0.5 border border-retro-black shadow-neo-sm">
            SUPABASE AUTH
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
          <div className="bg-retro-cream p-3 border border-retro-black">
            <span className="text-gray-500 block text-[10px] uppercase font-bold">Admin Email</span>
            <span className="font-black text-retro-black">{adminUser?.email || 'Authenticated User'}</span>
          </div>
          <div className="bg-retro-cream p-3 border border-retro-black">
            <span className="text-gray-500 block text-[10px] uppercase font-bold">Supabase User ID</span>
            <span className="font-mono text-[11px] text-gray-700 truncate block">{adminUser?.id || '—'}</span>
          </div>
        </div>

        <p className="font-mono text-[11px] text-gray-600 pt-1">
          To reset your password or manage authentication, use your project dashboard under <strong>Authentication &gt; Users</strong>.
        </p>
      </div>

      {/* 2. SEO & Meta Configuration */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="card-neo bg-white p-6 space-y-4">
          <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-retro-black mb-2">
            SEO & META CONFIGURATION
          </h3>

          <div>
            <label className="block font-mono text-xs font-bold uppercase mb-1">
              META PAGE TITLE
            </label>
            <input
              type="text"
              value={formData.seo_title}
              onChange={(e) => setFormData({ ...formData, seo_title: e.target.value })}
              className="input-neo"
            />
          </div>

          <div>
            <label className="block font-mono text-xs font-bold uppercase mb-1">
              SEARCH ENGINE DESCRIPTION
            </label>
            <textarea
              rows={2}
              value={formData.seo_description}
              onChange={(e) => setFormData({ ...formData, seo_description: e.target.value })}
              className="input-neo resize-none text-xs"
            />
          </div>
        </div>

        {/* 3. Aesthetic Theme Controls */}
        <div className="card-neo bg-white p-6 space-y-4">
          <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-retro-black mb-2">
            AESTHETIC & THEME CONTROLS
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-mono text-xs font-bold uppercase mb-1">
                PRIMARY ACCENT COLOR
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={formData.primary_accent}
                  onChange={(e) => setFormData({ ...formData, primary_accent: e.target.value })}
                  className="w-10 h-10 border-2 border-retro-black cursor-pointer p-0"
                />
                <input
                  type="text"
                  value={formData.primary_accent}
                  onChange={(e) => setFormData({ ...formData, primary_accent: e.target.value })}
                  className="input-neo font-mono text-xs"
                />
              </div>
            </div>

            <div className="space-y-2 pt-4 sm:pt-0">
              <label className="flex items-center gap-2 cursor-pointer font-mono text-xs font-bold">
                <input
                  type="checkbox"
                  checked={formData.show_retro_stickers}
                  onChange={(e) => setFormData({ ...formData, show_retro_stickers: e.target.checked })}
                  className="w-4 h-4 accent-retro-purple"
                />
                <span>SHOW RETRO STICKERS & BADGES</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer font-mono text-xs font-bold">
                <input
                  type="checkbox"
                  checked={formData.show_grid_lines}
                  onChange={(e) => setFormData({ ...formData, show_grid_lines: e.target.checked })}
                  className="w-4 h-4 accent-retro-purple"
                />
                <span>SHOW NOTEBOOK GRAPH GRID BACKGROUND</span>
              </label>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="btn-neo-lime text-xs py-2 px-5 font-black flex items-center gap-2"
            >
              <Save size={14} />
              <span>SAVE SETTINGS</span>
            </button>
          </div>
        </div>
      </form>

      {/* 4. Supabase Backend Connection Details */}
      <div className="card-neo bg-retro-cream p-6 border-2 border-retro-black space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase text-retro-black">
            <Zap size={16} className="text-retro-purple" />
            <span>SUPABASE CLOUD DATABASE CONNECTION</span>
          </div>
          <span className={`px-2 py-0.5 border border-retro-black text-[10px] font-bold ${
            isSupabaseConfigured ? 'bg-retro-lime text-retro-black' : 'bg-retro-yellow text-retro-black'
          }`}>
            {isSupabaseConfigured ? 'CONNECTED' : 'LOCAL CACHE MODE'}
          </span>
        </div>

        <p className="font-mono text-xs text-retro-darkgray leading-relaxed">
          {isSupabaseConfigured ? (
            'Your application is connected to Supabase PostgreSQL. Database operations and file storage enforce Row Level Security, allowing modifications exclusively by your authorized administrator account.'
          ) : (
            'Supabase keys not detected in .env. Supply your project keys to connect to cloud backend:'
          )}
        </p>

        <div className="bg-retro-black text-retro-lime p-4 font-mono text-xs border-2 border-retro-black overflow-x-auto space-y-1">
          <div># .env</div>
          <div>VITE_SUPABASE_URL=https://fkqouvmdjpknqqqfqbri.supabase.co</div>
          <div>VITE_SUPABASE_ANON_KEY=your-publishable-anon-key</div>
        </div>

        <div className="pt-2 font-mono text-xs text-gray-700">
          SQL Database schema & RLS policies file: <strong className="text-retro-black">supabase-schema.sql</strong>.
        </div>
      </div>

      {/* 5. Danger Zone */}
      <div className="card-neo p-6 bg-red-50 border-2 border-red-400 space-y-3">
        <h3 className="font-mono text-xs font-bold uppercase text-red-700 flex items-center gap-2">
          <ShieldAlert size={16} />
          <span>DANGER ZONE // RESET CONTENT</span>
        </h3>
        <p className="font-mono text-xs text-gray-600">
          Restore portfolio projects, skills, and timeline entries back to the clean initial reference state.
        </p>
        <button
          type="button"
          onClick={() => setIsResetConfirmOpen(true)}
          className="btn-neo bg-red-500 text-white hover:bg-red-600 text-xs py-2 px-4 font-bold flex items-center gap-2"
        >
          <RefreshCw size={14} />
          <span>RESTORE INITIAL PORTFOLIO CONTENT</span>
        </button>
      </div>

      <AdminConfirmModal
        isOpen={isResetConfirmOpen}
        title="Reset Portfolio Content?"
        message="This will reset portfolio projects, skills, and timeline content. Your administrator login will remain untouched."
        onConfirm={handleReset}
        onCancel={() => setIsResetConfirmOpen(false)}
        confirmText="YES, RESET CONTENT"
      />
    </div>
  );
};
