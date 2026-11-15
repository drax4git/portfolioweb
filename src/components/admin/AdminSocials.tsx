import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Globe, ExternalLink, X } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { SocialLink, ContentStatus } from '../../types/portfolio';
import { AdminConfirmModal } from './AdminConfirmModal';

export const AdminSocials: React.FC = () => {
  const { socialLinks, addSocialLink, updateSocialLink, deleteSocialLink } = useData();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSocial, setEditingSocial] = useState<SocialLink | null>(null);

  const [platform, setPlatform] = useState('');
  const [url, setUrl] = useState('');
  const [iconName, setIconName] = useState('Github');
  const [displayOrder, setDisplayOrder] = useState(1);
  const [status, setStatus] = useState<ContentStatus>('published');

  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [notification, setNotification] = useState('');

  const openCreateModal = () => {
    setEditingSocial(null);
    setPlatform('GitHub');
    setUrl('https://github.com');
    setIconName('Github');
    setDisplayOrder(socialLinks.length + 1);
    setStatus('published');
    setIsModalOpen(true);
  };

  const openEditModal = (soc: SocialLink) => {
    setEditingSocial(soc);
    setPlatform(soc.platform);
    setUrl(soc.url);
    setIconName(soc.icon_name);
    setDisplayOrder(soc.display_order);
    setStatus(soc.status);
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!platform.trim() || !url.trim()) return;

    const payload = {
      platform,
      url,
      icon_name: iconName,
      display_order: Number(displayOrder),
      status,
    };

    if (editingSocial) {
      await updateSocialLink(editingSocial.id, payload);
      setNotification('Social link updated!');
    } else {
      await addSocialLink(payload);
      setNotification('Social link added!');
    }

    setTimeout(() => setNotification(''), 3000);
    setIsModalOpen(false);
  };

  const handleDelete = async () => {
    if (!deleteConfirmId) return;
    await deleteSocialLink(deleteConfirmId);
    setDeleteConfirmId(null);
    setNotification('Social link removed.');
    setTimeout(() => setNotification(''), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-retro-black pb-4">
        <div>
          <h2 className="font-display text-2xl font-black text-retro-black uppercase">
            SOCIAL LINKS MANAGEMENT
          </h2>
          <p className="font-mono text-xs text-gray-600">
            Configure external developer channels, repositories, and direct contacts.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {notification && (
            <div className="bg-retro-lime border-2 border-retro-black px-3 py-1 font-mono text-xs font-bold text-retro-black shadow-neo-sm">
              ✓ {notification}
            </div>
          )}
          <button
            onClick={openCreateModal}
            className="btn-neo-lime text-xs sm:text-sm py-2 px-4 font-black flex items-center gap-2"
          >
            <Plus size={16} />
            <span>ADD SOCIAL LINK</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {socialLinks.map((soc) => (
          <div key={soc.id} className="card-neo p-4 bg-white flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-display text-base font-black uppercase text-retro-black">
                  {soc.platform}
                </span>
                <span className="font-mono text-xs text-gray-500 font-bold">#{soc.display_order}</span>
              </div>
              <p className="font-mono text-xs text-gray-600 truncate">{soc.url}</p>
            </div>

            <div className="pt-3 border-t-2 border-retro-black flex items-center justify-between mt-3">
              <a
                href={soc.url}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-xs text-retro-purple hover:underline flex items-center gap-1"
              >
                <span>Visit</span>
                <ExternalLink size={12} />
              </a>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => openEditModal(soc)}
                  className="btn-neo text-xs py-1 px-2 bg-retro-yellow"
                >
                  <Edit2 size={12} />
                </button>
                <button
                  onClick={() => setDeleteConfirmId(soc.id)}
                  className="btn-neo text-xs py-1 px-2 bg-red-400 text-white"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-retro-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-white border-4 border-retro-black shadow-neo-xl overflow-hidden">
            <div className="bg-retro-black text-white px-4 py-2.5 flex items-center justify-between border-b-2 border-retro-black">
              <span className="font-mono text-xs font-bold">
                {editingSocial ? 'EDIT SOCIAL LINK' : 'ADD SOCIAL LINK'}
              </span>
              <button onClick={() => setIsModalOpen(false)} className="w-6 h-6 bg-retro-pink text-retro-black font-bold">
                <X size={14} />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="p-6 space-y-4">
              <div>
                <label className="block font-mono text-xs font-bold uppercase mb-1">PLATFORM NAME *</label>
                <input type="text" required value={platform} onChange={(e) => setPlatform(e.target.value)} placeholder="e.g. GitHub, Discord, Bluesky" className="input-neo" />
              </div>

              <div>
                <label className="block font-mono text-xs font-bold uppercase mb-1">DESTINATION URL *</label>
                <input type="text" required value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://..." className="input-neo text-xs" />
              </div>

              <div>
                <label className="block font-mono text-xs font-bold uppercase mb-1">DISPLAY ORDER</label>
                <input type="number" value={displayOrder} onChange={(e) => setDisplayOrder(Number(e.target.value))} className="input-neo" />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t-2 border-retro-black">
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn-neo text-xs py-2 px-3">CANCEL</button>
                <button type="submit" className="btn-neo-lime text-xs py-2 px-4 font-black">{editingSocial ? 'SAVE' : 'ADD LINK'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <AdminConfirmModal
        isOpen={Boolean(deleteConfirmId)}
        title="Delete Social Link?"
        message="Are you sure you want to remove this profile link?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteConfirmId(null)}
      />
    </div>
  );
};
