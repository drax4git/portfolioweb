import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Trophy, Award, X } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Hackathon, Achievement, ContentStatus } from '../../types/portfolio';
import { AdminConfirmModal } from './AdminConfirmModal';

export const AdminHackathons: React.FC = () => {
  const {
    hackathons,
    addHackathon,
    updateHackathon,
    deleteHackathon,
    achievements,
    addAchievement,
    updateAchievement,
    deleteAchievement,
  } = useData();

  const [isHackModalOpen, setIsHackModalOpen] = useState(false);
  const [editingHack, setEditingHack] = useState<Hackathon | null>(null);

  const [title, setTitle] = useState('');
  const [organizer, setOrganizer] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [teamName, setTeamName] = useState('');
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [awardOrPosition, setAwardOrPosition] = useState('🏆 1st Place');
  const [projectUrl, setProjectUrl] = useState('');
  const [displayOrder, setDisplayOrder] = useState(1);
  const [status, setStatus] = useState<ContentStatus>('published');

  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [notification, setNotification] = useState('');

  const openCreateModal = () => {
    setEditingHack(null);
    setTitle('');
    setOrganizer('');
    setEventDate('2024');
    setTeamName('');
    setProjectName('');
    setProjectDescription('');
    setAwardOrPosition('🏆 1st Place Winner');
    setProjectUrl('');
    setDisplayOrder(hackathons.length + 1);
    setStatus('published');
    setIsHackModalOpen(true);
  };

  const openEditModal = (h: Hackathon) => {
    setEditingHack(h);
    setTitle(h.title);
    setOrganizer(h.organizer);
    setEventDate(h.event_date);
    setTeamName(h.team_name || '');
    setProjectName(h.project_name);
    setProjectDescription(h.project_description);
    setAwardOrPosition(h.award_or_position);
    setProjectUrl(h.project_url || '');
    setDisplayOrder(h.display_order);
    setStatus(h.status);
    setIsHackModalOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !projectName.trim()) return;

    const payload = {
      title,
      organizer,
      event_date: eventDate,
      team_name: teamName,
      project_name: projectName,
      project_description: projectDescription,
      award_or_position: awardOrPosition,
      project_url: projectUrl,
      display_order: Number(displayOrder),
      status,
    };

    if (editingHack) {
      await updateHackathon(editingHack.id, payload);
      setNotification('Hackathon entry updated!');
    } else {
      await addHackathon(payload);
      setNotification('New hackathon win recorded!');
    }

    setTimeout(() => setNotification(''), 3000);
    setIsHackModalOpen(false);
  };

  const handleDelete = async () => {
    if (!deleteConfirmId) return;
    await deleteHackathon(deleteConfirmId);
    setDeleteConfirmId(null);
    setNotification('Entry removed.');
    setTimeout(() => setNotification(''), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-retro-black pb-4">
        <div>
          <h2 className="font-display text-2xl font-black text-retro-black uppercase">
            HACKATHONS & ACHIEVEMENTS
          </h2>
          <p className="font-mono text-xs text-gray-600">
            Record hackathon victories, positions, team submissions, and career milestones.
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
            <span>ADD HACKATHON WIN</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {hackathons.map((hack) => (
          <div key={hack.id} className="card-neo p-5 bg-white flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs font-bold px-2 py-0.5 bg-retro-yellow border border-retro-black">
                  {hack.award_or_position}
                </span>
                <span className="font-mono text-xs text-gray-500 font-bold">
                  {hack.event_date}
                </span>
              </div>

              <h3 className="font-display text-lg font-black uppercase text-retro-black">
                {hack.title}
              </h3>
              <p className="font-mono text-xs text-gray-600">
                Organizer: <strong>{hack.organizer}</strong>
              </p>

              <div className="bg-retro-cream p-2.5 border border-retro-black my-2">
                <div className="font-mono text-xs font-bold text-retro-purple">
                  Project: {hack.project_name}
                </div>
                <p className="font-mono text-xs text-gray-700 mt-1">
                  {hack.project_description}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t-2 border-retro-black flex items-center justify-end gap-2">
              <button
                onClick={() => openEditModal(hack)}
                className="btn-neo text-xs py-1 px-3 bg-retro-yellow flex items-center gap-1"
              >
                <Edit2 size={12} />
                <span>EDIT</span>
              </button>
              <button
                onClick={() => setDeleteConfirmId(hack.id)}
                className="btn-neo text-xs py-1 px-2.5 bg-red-400 text-white flex items-center gap-1"
              >
                <Trash2 size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isHackModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-retro-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-white border-4 border-retro-black shadow-neo-xl overflow-hidden max-h-[92vh] flex flex-col">
            <div className="bg-retro-black text-white px-4 py-2.5 flex items-center justify-between border-b-2 border-retro-black">
              <span className="font-mono text-xs font-bold">
                {editingHack ? 'EDIT HACKATHON ENTRY' : 'RECORD NEW HACKATHON WIN'}
              </span>
              <button onClick={() => setIsHackModalOpen(false)} className="w-6 h-6 bg-retro-pink text-retro-black font-bold">
                <X size={14} />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="overflow-y-auto p-6 space-y-4">
              <div>
                <label className="block font-mono text-xs font-bold uppercase mb-1">HACKATHON NAME *</label>
                <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} className="input-neo" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-xs font-bold uppercase mb-1">ORGANIZER *</label>
                  <input type="text" required value={organizer} onChange={(e) => setOrganizer(e.target.value)} className="input-neo" />
                </div>
                <div>
                  <label className="block font-mono text-xs font-bold uppercase mb-1">EVENT DATE</label>
                  <input type="text" value={eventDate} onChange={(e) => setEventDate(e.target.value)} placeholder="March 2024" className="input-neo" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-xs font-bold uppercase mb-1">AWARD / POSITION *</label>
                  <input type="text" required value={awardOrPosition} onChange={(e) => setAwardOrPosition(e.target.value)} className="input-neo" />
                </div>
                <div>
                  <label className="block font-mono text-xs font-bold uppercase mb-1">TEAM NAME</label>
                  <input type="text" value={teamName} onChange={(e) => setTeamName(e.target.value)} placeholder="ByteBusters (Optional)" className="input-neo" />
                </div>
              </div>

              <div>
                <label className="block font-mono text-xs font-bold uppercase mb-1">SUBMITTED PROJECT NAME *</label>
                <input type="text" required value={projectName} onChange={(e) => setProjectName(e.target.value)} className="input-neo" />
              </div>

              <div>
                <label className="block font-mono text-xs font-bold uppercase mb-1">PROJECT SUMMARY *</label>
                <textarea required rows={2} value={projectDescription} onChange={(e) => setProjectDescription(e.target.value)} className="input-neo resize-none text-xs" />
              </div>

              <div>
                <label className="block font-mono text-xs font-bold uppercase mb-1">PROJECT DEMO / REPO URL</label>
                <input type="url" value={projectUrl} onChange={(e) => setProjectUrl(e.target.value)} placeholder="https://github.com/..." className="input-neo text-xs" />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t-2 border-retro-black">
                <button type="button" onClick={() => setIsHackModalOpen(false)} className="btn-neo text-xs py-2 px-3">CANCEL</button>
                <button type="submit" className="btn-neo-lime text-xs py-2 px-4 font-black">{editingHack ? 'SAVE' : 'ADD RECORD'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <AdminConfirmModal
        isOpen={Boolean(deleteConfirmId)}
        title="Delete Hackathon Record?"
        message="Are you sure you want to remove this record?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteConfirmId(null)}
      />
    </div>
  );
};
