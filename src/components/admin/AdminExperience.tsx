import React, { useState } from 'react';
import { Plus, Edit2, Trash2, CheckCircle2, Briefcase, X, Calendar } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Experience, ContentStatus } from '../../types/portfolio';
import { AdminConfirmModal } from './AdminConfirmModal';

export const AdminExperience: React.FC = () => {
  const { experience, addExperience, updateExperience, deleteExperience } = useData();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExp, setEditingExp] = useState<Experience | null>(null);

  const [role, setRole] = useState('');
  const [organization, setOrganization] = useState('');
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isCurrent, setIsCurrent] = useState(false);
  const [description, setDescription] = useState('');
  const [achievementsInput, setAchievementsInput] = useState('');
  const [techInput, setTechInput] = useState('');
  const [displayOrder, setDisplayOrder] = useState(1);
  const [status, setStatus] = useState<ContentStatus>('published');

  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [notification, setNotification] = useState('');

  const openCreateModal = () => {
    setEditingExp(null);
    setRole('');
    setOrganization('');
    setLocation('San Francisco, CA');
    setStartDate('2023');
    setEndDate('PRESENT');
    setIsCurrent(true);
    setDescription('');
    setAchievementsInput('');
    setTechInput('');
    setDisplayOrder(experience.length + 1);
    setStatus('published');
    setIsModalOpen(true);
  };

  const openEditModal = (exp: Experience) => {
    setEditingExp(exp);
    setRole(exp.role);
    setOrganization(exp.organization);
    setLocation(exp.location || '');
    setStartDate(exp.start_date);
    setEndDate(exp.end_date);
    setIsCurrent(exp.is_current);
    setDescription(exp.description);
    setAchievementsInput((exp.achievements || []).join('\n'));
    setTechInput((exp.technologies || []).join(', '));
    setDisplayOrder(exp.display_order);
    setStatus(exp.status);
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!role.trim() || !organization.trim()) return;

    const achievements = achievementsInput
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const technologies = techInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const payload = {
      role,
      organization,
      location,
      start_date: startDate,
      end_date: isCurrent ? 'PRESENT' : endDate,
      is_current: isCurrent,
      description,
      achievements,
      technologies,
      display_order: Number(displayOrder),
      status,
    };

    if (editingExp) {
      await updateExperience(editingExp.id, payload);
      setNotification(`Experience updated!`);
    } else {
      await addExperience(payload);
      setNotification(`New experience added!`);
    }

    setTimeout(() => setNotification(''), 3000);
    setIsModalOpen(false);
  };

  const handleDelete = async () => {
    if (!deleteConfirmId) return;
    await deleteExperience(deleteConfirmId);
    setDeleteConfirmId(null);
    setNotification('Experience deleted.');
    setTimeout(() => setNotification(''), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-retro-black pb-4">
        <div>
          <h2 className="font-display text-2xl font-black text-retro-black uppercase">
            CAREER & EXPERIENCE MANAGEMENT
          </h2>
          <p className="font-mono text-xs text-gray-600">
            Manage your employment history, roles, key achievements, and stack tags.
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
            <span>ADD EXPERIENCE</span>
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {experience.map((exp) => (
          <div key={exp.id} className="card-neo p-5 bg-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] font-bold px-2 py-0.5 bg-retro-cream border border-retro-black">
                  {exp.start_date} — {exp.end_date}
                </span>
                <span className={`px-2 py-0.5 text-[10px] font-bold border border-retro-black ${
                  exp.status === 'published' ? 'bg-retro-lime text-retro-black' : 'bg-retro-yellow text-retro-black'
                }`}>
                  {exp.status.toUpperCase()}
                </span>
              </div>

              <h3 className="font-display text-lg font-black uppercase text-retro-black">
                {exp.role} <span className="text-retro-purple">@</span> {exp.organization}
              </h3>
              <p className="font-mono text-xs text-retro-darkgray">{exp.description}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => openEditModal(exp)}
                className="btn-neo text-xs py-1.5 px-3 bg-retro-yellow flex items-center gap-1"
              >
                <Edit2 size={14} />
                <span>EDIT</span>
              </button>
              <button
                onClick={() => setDeleteConfirmId(exp.id)}
                className="btn-neo text-xs py-1.5 px-3 bg-red-400 text-white flex items-center gap-1"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-retro-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-xl bg-white border-4 border-retro-black shadow-neo-xl max-h-[92vh] flex flex-col overflow-hidden">
            <div className="bg-retro-black text-white px-4 py-2.5 flex items-center justify-between border-b-2 border-retro-black">
              <span className="font-mono text-xs font-bold">
                {editingExp ? `EDIT ROLE // ${editingExp.role}` : 'ADD CAREER EXPERIENCE'}
              </span>
              <button onClick={() => setIsModalOpen(false)} className="w-6 h-6 bg-retro-pink text-retro-black flex items-center justify-center font-bold">
                <X size={14} />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="overflow-y-auto p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-xs font-bold uppercase mb-1">ROLE / TITLE *</label>
                  <input type="text" required value={role} onChange={(e) => setRole(e.target.value)} className="input-neo" />
                </div>
                <div>
                  <label className="block font-mono text-xs font-bold uppercase mb-1">ORGANIZATION *</label>
                  <input type="text" required value={organization} onChange={(e) => setOrganization(e.target.value)} className="input-neo" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-mono text-xs font-bold uppercase mb-1">START DATE</label>
                  <input type="text" value={startDate} onChange={(e) => setStartDate(e.target.value)} placeholder="2022" className="input-neo" />
                </div>
                <div>
                  <label className="block font-mono text-xs font-bold uppercase mb-1">END DATE</label>
                  <input type="text" disabled={isCurrent} value={isCurrent ? 'PRESENT' : endDate} onChange={(e) => setEndDate(e.target.value)} placeholder="2024" className="input-neo" />
                </div>
                <div>
                  <label className="block font-mono text-xs font-bold uppercase mb-1">LOCATION</label>
                  <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="San Francisco" className="input-neo" />
                </div>
              </div>

              <label className="flex items-center gap-2 font-mono text-xs font-bold cursor-pointer">
                <input type="checkbox" checked={isCurrent} onChange={(e) => setIsCurrent(e.target.checked)} className="accent-retro-purple" />
                <span>Currently working in this position</span>
              </label>

              <div>
                <label className="block font-mono text-xs font-bold uppercase mb-1">SHORT SUMMARY *</label>
                <textarea required rows={2} value={description} onChange={(e) => setDescription(e.target.value)} className="input-neo resize-none text-xs" />
              </div>

              <div>
                <label className="block font-mono text-xs font-bold uppercase mb-1">KEY BULLET ACHIEVEMENTS (ONE PER LINE)</label>
                <textarea rows={3} value={achievementsInput} onChange={(e) => setAchievementsInput(e.target.value)} placeholder="Spearheaded micro-frontends...&#10;Increased speed by 40%..." className="input-neo resize-none text-xs font-mono" />
              </div>

              <div>
                <label className="block font-mono text-xs font-bold uppercase mb-1">TECHNOLOGIES (COMMA SEPARATED)</label>
                <input type="text" value={techInput} onChange={(e) => setTechInput(e.target.value)} placeholder="React, TypeScript, GraphQL, AWS" className="input-neo text-xs" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-xs font-bold uppercase mb-1">DISPLAY ORDER</label>
                  <input type="number" value={displayOrder} onChange={(e) => setDisplayOrder(Number(e.target.value))} className="input-neo" />
                </div>
                <div>
                  <label className="block font-mono text-xs font-bold uppercase mb-1">STATUS</label>
                  <select value={status} onChange={(e) => setStatus(e.target.value as ContentStatus)} className="input-neo">
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t-2 border-retro-black">
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn-neo text-xs py-2 px-3">CANCEL</button>
                <button type="submit" className="btn-neo-lime text-xs py-2 px-5 font-black">{editingExp ? 'SAVE' : 'ADD ROLE'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <AdminConfirmModal
        isOpen={Boolean(deleteConfirmId)}
        title="Delete Experience Record?"
        message="Are you sure you want to remove this role from your timeline?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteConfirmId(null)}
      />
    </div>
  );
};
