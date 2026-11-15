import React, { useState } from 'react';
import { Save, Upload, CheckCircle2, User, Mail, Globe, MapPin, Terminal, AlertCircle } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { uploadFile } from '../../lib/supabase';

export const AdminProfile: React.FC = () => {
  const { profile, updateProfile } = useData();

  const [formData, setFormData] = useState({ ...profile });
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setErrorMessage('');

    const res = await uploadFile('profile-images', file);
    setIsUploading(false);

    if (res.error) {
      setErrorMessage(res.error);
    } else if (res.url) {
      setFormData((prev) => ({ ...prev, avatar_url: res.url }));
      setSuccessMessage('Avatar uploaded successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setErrorMessage('');

    try {
      await updateProfile(formData);
      setIsSaving(false);
      setSuccessMessage('Profile information saved and published!');
      setTimeout(() => setSuccessMessage(''), 3500);
    } catch (err: any) {
      setIsSaving(false);
      setErrorMessage(err.message || 'Failed to save profile');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-retro-black pb-4">
        <div>
          <h2 className="font-display text-2xl font-black text-retro-black uppercase">
            PROFILE MANAGEMENT
          </h2>
          <p className="font-mono text-xs text-gray-600">
            Update personal biography, headline, portrait photograph, and social links.
          </p>
        </div>

        {successMessage && (
          <div className="bg-retro-lime border-2 border-retro-black px-3 py-1 font-mono text-xs font-bold text-retro-black flex items-center gap-1.5 shadow-neo-sm">
            <CheckCircle2 size={16} />
            <span>{successMessage}</span>
          </div>
        )}
      </div>

      {errorMessage && (
        <div className="bg-retro-pink/30 border-2 border-retro-pink p-3 font-mono text-xs font-bold text-retro-black flex items-center gap-2">
          <AlertCircle size={16} />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Avatar Upload Card */}
        <div className="card-neo bg-white p-6">
          <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-retro-black mb-4 flex items-center gap-2">
            <User size={16} />
            <span>PROFILE PHOTOGRAPH & AVATAR</span>
          </h3>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative w-32 h-32 border-3 border-retro-black shadow-neo overflow-hidden bg-retro-cream flex-shrink-0">
              <img
                src={formData.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                alt="Profile Preview"
                className="w-full h-full object-cover"
              />
              {isUploading && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white font-mono text-xs font-bold">
                  UPLOADING...
                </div>
              )}
            </div>

            <div className="space-y-3 w-full">
              <div>
                <label className="block font-mono text-xs font-bold text-gray-700 mb-1">
                  UPLOAD NEW PHOTO (WEBP, PNG, JPG, MAX 5MB)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="font-mono text-xs file:mr-4 file:py-2 file:px-4 file:border-2 file:border-retro-black file:text-xs file:font-mono file:font-bold file:bg-retro-lime file:text-retro-black hover:file:bg-[#b8f537] cursor-pointer"
                />
              </div>

              <div>
                <label className="block font-mono text-xs font-bold text-gray-700 mb-1">
                  OR DIRECT IMAGE URL
                </label>
                <input
                  type="url"
                  value={formData.avatar_url}
                  onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="input-neo text-xs"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Basic Info */}
        <div className="card-neo bg-white p-6 space-y-4">
          <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-retro-black mb-2">
            PRIMARY IDENTITY
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-mono text-xs font-bold uppercase mb-1">
                FULL NAME *
              </label>
              <input
                type="text"
                required
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                className="input-neo"
              />
            </div>

            <div>
              <label className="block font-mono text-xs font-bold uppercase mb-1">
                PROFESSIONAL TITLE *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="input-neo"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-mono text-xs font-bold uppercase mb-1">
                GREETING BADGE TEXT
              </label>
              <input
                type="text"
                value={formData.short_intro}
                onChange={(e) => setFormData({ ...formData, short_intro: e.target.value })}
                className="input-neo"
              />
            </div>

            <div>
              <label className="block font-mono text-xs font-bold uppercase mb-1">
                LOCATION
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="input-neo"
              />
            </div>

            <div>
              <label className="block font-mono text-xs font-bold uppercase mb-1">
                AVAILABILITY BADGE
              </label>
              <input
                type="text"
                value={formData.status_badge}
                onChange={(e) => setFormData({ ...formData, status_badge: e.target.value })}
                className="input-neo"
              />
            </div>
          </div>

          <div>
            <label className="block font-mono text-xs font-bold uppercase mb-1">
              SHORT BIOGRAPHY & OVERVIEW *
            </label>
            <textarea
              required
              rows={3}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="input-neo resize-none"
            />
          </div>

          <div>
            <label className="block font-mono text-xs font-bold uppercase mb-1 flex items-center gap-1.5">
              <Terminal size={14} />
              <span>FLOATING CODE SNIPPET (HERO SECTION)</span>
            </label>
            <textarea
              rows={6}
              value={formData.code_snippet}
              onChange={(e) => setFormData({ ...formData, code_snippet: e.target.value })}
              className="input-neo font-mono text-xs resize-none bg-retro-cream"
            />
          </div>
        </div>

        {/* Links & Socials */}
        <div className="card-neo bg-white p-6 space-y-4">
          <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-retro-black mb-2 flex items-center gap-2">
            <Globe size={16} />
            <span>CONTACT & SOCIAL PROFILES</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-mono text-xs font-bold uppercase mb-1">
                CONTACT EMAIL ADDRESS *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="input-neo"
              />
            </div>

            <div>
              <label className="block font-mono text-xs font-bold uppercase mb-1">
                RESUME LINK / FILE URL
              </label>
              <input
                type="text"
                value={formData.resume_url}
                onChange={(e) => setFormData({ ...formData, resume_url: e.target.value })}
                placeholder="https://example.com/resume.pdf"
                className="input-neo"
              />
            </div>

            <div>
              <label className="block font-mono text-xs font-bold uppercase mb-1">
                GITHUB PROFILE URL
              </label>
              <input
                type="url"
                value={formData.github_url}
                onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                className="input-neo"
              />
            </div>

            <div>
              <label className="block font-mono text-xs font-bold uppercase mb-1">
                LINKEDIN PROFILE URL
              </label>
              <input
                type="url"
                value={formData.linkedin_url}
                onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                className="input-neo"
              />
            </div>

            <div>
              <label className="block font-mono text-xs font-bold uppercase mb-1">
                TWITTER / X PROFILE URL
              </label>
              <input
                type="url"
                value={formData.twitter_url}
                onChange={(e) => setFormData({ ...formData, twitter_url: e.target.value })}
                className="input-neo"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="btn-neo-lime py-3 px-8 text-sm font-black flex items-center gap-2 shadow-neo"
          >
            <Save size={18} />
            <span>{isSaving ? 'SAVING CHANGES...' : 'SAVE & UPDATE PROFILE'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
