import React, { useState } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  Star,
  X,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Project, ContentStatus } from '../../types/portfolio';
import { uploadFile } from '../../lib/supabase';
import { AdminConfirmModal } from './AdminConfirmModal';
import { GithubIcon } from '../common/SocialIcons';

export const AdminProjects: React.FC = () => {
  const { projects, addProject, updateProject, deleteProject } = useData();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [detailedDescription, setDetailedDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [featured, setFeatured] = useState(false);
  const [displayOrder, setDisplayOrder] = useState(1);
  const [status, setStatus] = useState<ContentStatus>('published');

  const [isUploading, setIsUploading] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [notification, setNotification] = useState('');
  const [error, setError] = useState('');

  const openCreateModal = () => {
    setEditingProject(null);
    setTitle('');
    setDescription('');
    setDetailedDescription('');
    setImageUrl('https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80');
    setLiveUrl('');
    setGithubUrl('');
    setTags(['React', 'TypeScript']);
    setTagInput('');
    setFeatured(false);
    setDisplayOrder(projects.length + 1);
    setStatus('published');
    setError('');
    setIsModalOpen(true);
  };

  const openEditModal = (proj: Project) => {
    setEditingProject(proj);
    setTitle(proj.title);
    setDescription(proj.description);
    setDetailedDescription(proj.detailed_description || '');
    setImageUrl(proj.image_url);
    setLiveUrl(proj.live_url || '');
    setGithubUrl(proj.github_url || '');
    setTags([...proj.tags]);
    setTagInput('');
    setFeatured(proj.featured);
    setDisplayOrder(proj.display_order);
    setStatus(proj.status);
    setError('');
    setIsModalOpen(true);
  };

  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError('');

    const res = await uploadFile('project-images', file);
    setIsUploading(false);

    if (res.error) {
      setError(res.error);
    } else if (res.url) {
      setImageUrl(res.url);
      setNotification('Screenshot uploaded!');
      setTimeout(() => setNotification(''), 3000);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!title.trim() || !description.trim()) {
      setError('Title and description are required.');
      return;
    }

    const payload = {
      title,
      description,
      detailed_description: detailedDescription,
      image_url: imageUrl,
      live_url: liveUrl,
      github_url: githubUrl,
      tags,
      featured,
      display_order: Number(displayOrder),
      status,
    };

    try {
      if (editingProject) {
        await updateProject(editingProject.id, payload);
        setNotification(`Project "${title}" updated!`);
      } else {
        await addProject(payload);
        setNotification(`New project "${title}" created!`);
      }
      setTimeout(() => setNotification(''), 3000);
      setIsModalOpen(false);
    } catch (err: any) {
      setError(err.message || 'Error saving project');
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirmId) return;
    await deleteProject(deleteConfirmId);
    setDeleteConfirmId(null);
    setNotification('Project removed successfully.');
    setTimeout(() => setNotification(''), 3000);
  };

  const toggleStatus = async (proj: Project) => {
    const newStatus = proj.status === 'published' ? 'draft' : 'published';
    await updateProject(proj.id, { status: newStatus });
    setNotification(`Status changed to ${newStatus}`);
    setTimeout(() => setNotification(''), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-retro-black pb-4">
        <div>
          <h2 className="font-display text-2xl font-black text-retro-black uppercase">
            PROJECT MANAGEMENT
          </h2>
          <p className="font-mono text-xs text-gray-600">
            Create, edit, reorder, and publish developer showcase applications.
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
            <span>ADD NEW PROJECT</span>
          </button>
        </div>
      </div>

      {/* Projects List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className="card-neo p-5 bg-white flex flex-col justify-between relative group"
          >
            {/* Status & Featured Badge */}
            <div className="flex items-center justify-between mb-3">
              <button
                onClick={() => toggleStatus(proj)}
                className={`font-mono text-[10px] font-bold px-2 py-0.5 border border-retro-black cursor-pointer shadow-neo-sm ${
                  proj.status === 'published'
                    ? 'bg-retro-lime text-retro-black'
                    : 'bg-retro-yellow text-retro-black'
                }`}
                title="Click to toggle status"
              >
                {proj.status.toUpperCase()} 🔄
              </button>

              {proj.featured && (
                <span className="font-mono text-[10px] font-bold px-2 py-0.5 bg-retro-purple text-white border border-retro-black flex items-center gap-1">
                  <Star size={10} fill="white" />
                  FEATURED
                </span>
              )}
            </div>

            {/* Thumbnail */}
            <div className="w-full h-40 bg-retro-pink border-2 border-retro-black mb-3 overflow-hidden relative">
              <img
                src={proj.image_url}
                alt={proj.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80';
                }}
              />
            </div>

            {/* Details */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg font-black uppercase text-retro-black">
                  {proj.title}
                </h3>
                <span className="font-mono text-xs text-gray-500 font-bold">#{proj.display_order}</span>
              </div>

              <p className="font-mono text-xs text-retro-darkgray line-clamp-2">
                {proj.description}
              </p>

              <div className="flex flex-wrap gap-1 pt-1">
                {proj.tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="font-mono text-[10px] font-bold bg-retro-cream px-1.5 py-0.5 border border-retro-black"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions Bar */}
            <div className="pt-3 border-t-2 border-retro-black flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                {proj.live_url && (
                  <a
                    href={proj.live_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-600 hover:text-retro-purple"
                    title="Live preview"
                  >
                    <ExternalLink size={16} />
                  </a>
                )}
                {proj.github_url && (
                  <a
                    href={proj.github_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-600 hover:text-retro-purple"
                    title="GitHub"
                  >
                    <GithubIcon size={16} />
                  </a>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => openEditModal(proj)}
                  className="btn-neo text-xs py-1 px-2.5 bg-retro-yellow flex items-center gap-1"
                >
                  <Edit2 size={12} />
                  <span>EDIT</span>
                </button>
                <button
                  onClick={() => setDeleteConfirmId(proj.id)}
                  className="btn-neo text-xs py-1 px-2.5 bg-red-400 text-white flex items-center gap-1"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create / Edit Project Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-retro-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl bg-white border-4 border-retro-black shadow-neo-xl max-h-[92vh] flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="bg-retro-black text-white px-4 py-2.5 flex items-center justify-between border-b-3 border-retro-black">
              <span className="font-mono text-xs font-bold">
                {editingProject ? `EDIT PROJECT // ${editingProject.title}` : 'CREATE NEW SHOWCASE PROJECT'}
              </span>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-6 h-6 bg-retro-pink text-retro-black flex items-center justify-center font-bold"
              >
                <X size={14} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleFormSubmit} className="overflow-y-auto p-6 space-y-4">
              {error && (
                <div className="bg-retro-pink/30 border-2 border-retro-pink p-3 font-mono text-xs font-bold text-retro-black">
                  ⚠️ {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-xs font-bold uppercase mb-1">
                    PROJECT TITLE *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="WEATHERLY"
                    className="input-neo"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs font-bold uppercase mb-1">
                    DISPLAY ORDER (PRIORITY)
                  </label>
                  <input
                    type="number"
                    value={displayOrder}
                    onChange={(e) => setDisplayOrder(Number(e.target.value))}
                    className="input-neo"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-xs font-bold uppercase mb-1">
                  SHORT CARD DESCRIPTION *
                </label>
                <textarea
                  required
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="A weather app with real-time data, beautiful charts and forecasts."
                  className="input-neo resize-none text-xs"
                />
              </div>

              <div>
                <label className="block font-mono text-xs font-bold uppercase mb-1">
                  DETAILED OVERVIEW / MODAL CONTENT
                </label>
                <textarea
                  rows={3}
                  value={detailedDescription}
                  onChange={(e) => setDetailedDescription(e.target.value)}
                  placeholder="Deep technical breakdown of how this project is structured..."
                  className="input-neo resize-none text-xs"
                />
              </div>

              {/* Image Upload / URL */}
              <div className="card-neo p-4 bg-retro-cream space-y-3">
                <label className="block font-mono text-xs font-bold uppercase text-retro-black">
                  PROJECT SCREENSHOT / COVER IMAGE
                </label>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="w-24 h-16 bg-white border-2 border-retro-black overflow-hidden flex-shrink-0">
                    <img src={imageUrl} alt="preview" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 space-y-2 w-full">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="font-mono text-xs file:mr-2 file:py-1 file:px-2 file:border file:border-retro-black file:text-xs file:font-mono file:bg-white"
                    />
                    <input
                      type="url"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="Or enter direct image URL"
                      className="input-neo text-xs py-1.5"
                    />
                  </div>
                </div>
                {isUploading && <p className="font-mono text-xs text-retro-purple font-bold">Uploading screenshot...</p>}
              </div>

              {/* Technologies Tag Manager */}
              <div>
                <label className="block font-mono text-xs font-bold uppercase mb-1">
                  TECHNOLOGIES & TAGS
                </label>
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                    placeholder="Type tech (e.g. Next.js) and click Add"
                    className="input-neo text-xs py-1.5"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="btn-neo text-xs py-1.5 px-3 bg-retro-yellow"
                  >
                    ADD
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {tags.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1 px-2 py-0.5 bg-retro-cream border border-retro-black font-mono text-xs font-bold"
                    >
                      <span>{t}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(t)}
                        className="text-red-500 font-black hover:text-red-700 ml-1"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* URLs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-xs font-bold uppercase mb-1">
                    LIVE DEMO URL
                  </label>
                  <input
                    type="url"
                    value={liveUrl}
                    onChange={(e) => setLiveUrl(e.target.value)}
                    placeholder="https://..."
                    className="input-neo text-xs"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs font-bold uppercase mb-1">
                    GITHUB REPOSITORY URL
                  </label>
                  <input
                    type="url"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    placeholder="https://github.com/..."
                    className="input-neo text-xs"
                  />
                </div>
              </div>

              {/* Toggles */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-gray-200">
                <label className="flex items-center gap-2 cursor-pointer font-mono text-xs font-bold">
                  <input
                    type="checkbox"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="w-4 h-4 accent-retro-purple"
                  />
                  <span>FEATURE ON HERO / TOP OF PROJECTS</span>
                </label>

                <div className="flex items-center gap-2 font-mono text-xs font-bold">
                  <span>PUBLISH STATUS:</span>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as ContentStatus)}
                    className="border-2 border-retro-black px-2 py-1 bg-white font-mono text-xs font-bold"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft (Hidden from Public)</option>
                  </select>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t-2 border-retro-black">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn-neo text-xs py-2 px-4"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="btn-neo-lime text-xs py-2 px-5 font-black"
                >
                  {editingProject ? 'SAVE PROJECT CHANGES' : 'CREATE PROJECT'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <AdminConfirmModal
        isOpen={Boolean(deleteConfirmId)}
        title="Delete Project?"
        message="Are you sure you want to delete this project? This will permanently remove it from your portfolio."
        onConfirm={handleDelete}
        onCancel={() => setDeleteConfirmId(null)}
      />
    </div>
  );
};
