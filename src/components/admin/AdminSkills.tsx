import React, { useState } from 'react';
import { Plus, Edit2, Trash2, CheckCircle2, Cpu, X, Tag } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Skill, SkillCategory, ContentStatus } from '../../types/portfolio';
import { AdminConfirmModal } from './AdminConfirmModal';
import { TechIcon } from '../common/TechIcon';

export const AdminSkills: React.FC = () => {
  const { skills, addSkill, updateSkill, deleteSkill } = useData();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);

  const [name, setName] = useState('');
  const [category, setCategory] = useState<SkillCategory>('frontend');
  const [iconName, setIconName] = useState('Code2');
  const [proficiency, setProficiency] = useState(90);
  const [displayOrder, setDisplayOrder] = useState(1);
  const [status, setStatus] = useState<ContentStatus>('published');

  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [notification, setNotification] = useState('');

  const openCreateModal = () => {
    setEditingSkill(null);
    setName('');
    setCategory('frontend');
    setIconName('Atom');
    setProficiency(90);
    setDisplayOrder(skills.length + 1);
    setStatus('published');
    setIsModalOpen(true);
  };

  const openEditModal = (skill: Skill) => {
    setEditingSkill(skill);
    setName(skill.name);
    setCategory(skill.category);
    setIconName(skill.icon_name);
    setProficiency(skill.proficiency);
    setDisplayOrder(skill.display_order);
    setStatus(skill.status);
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const payload = {
      name,
      category,
      icon_name: iconName,
      proficiency: Number(proficiency),
      display_order: Number(displayOrder),
      status,
    };

    if (editingSkill) {
      await updateSkill(editingSkill.id, payload);
      setNotification(`Skill "${name}" updated!`);
    } else {
      await addSkill(payload);
      setNotification(`Skill "${name}" added!`);
    }

    setTimeout(() => setNotification(''), 3000);
    setIsModalOpen(false);
  };

  const handleDelete = async () => {
    if (!deleteConfirmId) return;
    await deleteSkill(deleteConfirmId);
    setDeleteConfirmId(null);
    setNotification('Skill deleted.');
    setTimeout(() => setNotification(''), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-retro-black pb-4">
        <div>
          <h2 className="font-display text-2xl font-black text-retro-black uppercase">
            SKILLS MANAGEMENT
          </h2>
          <p className="font-mono text-xs text-gray-600">
            Add official technologies, categories, and proficiency meters.
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
            <span>ADD NEW SKILL</span>
          </button>
        </div>
      </div>

      {/* Skills Table / Grid */}
      <div className="card-neo bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead className="bg-retro-black text-white uppercase text-[11px] border-b-2 border-retro-black">
              <tr>
                <th className="py-3 px-4">Icon & Tech</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Proficiency</th>
                <th className="py-3 px-4">Order</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-retro-black/20">
              {skills.map((skill) => (
                <tr key={skill.id} className="hover:bg-retro-cream/60 transition-colors">
                  <td className="py-3 px-4 flex items-center gap-2.5">
                    <div className="w-8 h-8 bg-retro-cream border border-retro-black flex items-center justify-center">
                      <TechIcon name={skill.name} className="w-4 h-4" size={16} />
                    </div>
                    <span className="font-bold text-retro-black">{skill.name}</span>
                  </td>
                  <td className="py-3 px-4 uppercase text-gray-600 font-bold">
                    {skill.category}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 border border-retro-black h-2 overflow-hidden">
                        <div className="bg-retro-purple h-full" style={{ width: `${skill.proficiency}%` }} />
                      </div>
                      <span className="font-bold">{skill.proficiency}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-500">#{skill.display_order}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 border border-retro-black text-[10px] font-bold ${
                      skill.status === 'published' ? 'bg-retro-lime text-retro-black' : 'bg-retro-yellow text-retro-black'
                    }`}>
                      {skill.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right space-x-2">
                    <button
                      onClick={() => openEditModal(skill)}
                      className="p-1 bg-retro-yellow border border-retro-black hover:bg-yellow-300"
                      title="Edit Skill"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(skill.id)}
                      className="p-1 bg-red-400 text-white border border-retro-black hover:bg-red-500"
                      title="Delete Skill"
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-retro-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-white border-4 border-retro-black shadow-neo-xl overflow-hidden">
            <div className="bg-retro-black text-white px-4 py-2.5 flex items-center justify-between border-b-2 border-retro-black">
              <span className="font-mono text-xs font-bold">
                {editingSkill ? `EDIT SKILL // ${editingSkill.name}` : 'ADD NEW SKILL'}
              </span>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-6 h-6 bg-retro-pink text-retro-black flex items-center justify-center font-bold"
              >
                <X size={14} />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="p-6 space-y-4">
              <div>
                <label className="block font-mono text-xs font-bold uppercase mb-1">
                  SKILL / TECH NAME *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Next.js, Docker, PostgreSQL"
                  className="input-neo"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-xs font-bold uppercase mb-1">
                    CATEGORY
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as SkillCategory)}
                    className="input-neo"
                  >
                    <option value="frontend">Frontend</option>
                    <option value="backend">Backend</option>
                    <option value="database">Database</option>
                    <option value="languages">Languages</option>
                    <option value="tools">Tools & Platforms</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-xs font-bold uppercase mb-1">
                    DISPLAY ORDER
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
                <div className="flex items-center justify-between font-mono text-xs font-bold uppercase mb-1">
                  <span>PROFICIENCY ({proficiency}%)</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={proficiency}
                  onChange={(e) => setProficiency(Number(e.target.value))}
                  className="w-full accent-retro-purple"
                />
              </div>

              <div>
                <label className="block font-mono text-xs font-bold uppercase mb-1">
                  STATUS
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as ContentStatus)}
                  className="input-neo"
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft (Hidden)</option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t-2 border-retro-black">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn-neo text-xs py-2 px-3"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="btn-neo-lime text-xs py-2 px-4 font-black"
                >
                  {editingSkill ? 'SAVE' : 'ADD SKILL'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <AdminConfirmModal
        isOpen={Boolean(deleteConfirmId)}
        title="Delete Skill?"
        message="Are you sure you want to remove this skill from your tech stack?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteConfirmId(null)}
      />
    </div>
  );
};
