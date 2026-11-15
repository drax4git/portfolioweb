import React, { useState } from 'react';
import { Plus, Edit2, Trash2, GraduationCap, X } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Education, ContentStatus } from '../../types/portfolio';
import { AdminConfirmModal } from './AdminConfirmModal';

export const AdminEducation: React.FC = () => {
  const { education, addEducation, updateEducation, deleteEducation } = useData();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEdu, setEditingEdu] = useState<Education | null>(null);

  const [institution, setInstitution] = useState('');
  const [degree, setDegree] = useState('');
  const [fieldOfStudy, setFieldOfStudy] = useState('');
  const [startYear, setStartYear] = useState('');
  const [endYear, setEndYear] = useState('');
  const [gradeOrHonors, setGradeOrHonors] = useState('');
  const [description, setDescription] = useState('');
  const [displayOrder, setDisplayOrder] = useState(1);
  const [status, setStatus] = useState<ContentStatus>('published');

  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [notification, setNotification] = useState('');

  const openCreateModal = () => {
    setEditingEdu(null);
    setInstitution('');
    setDegree('Bachelor of Science');
    setFieldOfStudy('Computer Science');
    setStartYear('2018');
    setEndYear('2022');
    setGradeOrHonors('Summa Cum Laude');
    setDescription('');
    setDisplayOrder(education.length + 1);
    setStatus('published');
    setIsModalOpen(true);
  };

  const openEditModal = (edu: Education) => {
    setEditingEdu(edu);
    setInstitution(edu.institution);
    setDegree(edu.degree);
    setFieldOfStudy(edu.field_of_study);
    setStartYear(edu.start_year);
    setEndYear(edu.end_year);
    setGradeOrHonors(edu.grade_or_honors || '');
    setDescription(edu.description || '');
    setDisplayOrder(edu.display_order);
    setStatus(edu.status);
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!institution.trim() || !degree.trim()) return;

    const payload = {
      institution,
      degree,
      field_of_study: fieldOfStudy,
      start_year: startYear,
      end_year: endYear,
      grade_or_honors: gradeOrHonors,
      description,
      display_order: Number(displayOrder),
      status,
    };

    if (editingEdu) {
      await updateEducation(editingEdu.id, payload);
      setNotification('Education updated!');
    } else {
      await addEducation(payload);
      setNotification('Education record added!');
    }

    setTimeout(() => setNotification(''), 3000);
    setIsModalOpen(false);
  };

  const handleDelete = async () => {
    if (!deleteConfirmId) return;
    await deleteEducation(deleteConfirmId);
    setDeleteConfirmId(null);
    setNotification('Record removed.');
    setTimeout(() => setNotification(''), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-retro-black pb-4">
        <div>
          <h2 className="font-display text-2xl font-black text-retro-black uppercase">
            EDUCATION MANAGEMENT
          </h2>
          <p className="font-mono text-xs text-gray-600">
            Manage institutions, degrees, honors, and coursework records.
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
            <span>ADD EDUCATION</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {education.map((edu) => (
          <div key={edu.id} className="card-neo p-5 bg-white flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs font-bold px-2 py-0.5 bg-retro-cream border border-retro-black">
                  {edu.start_year} — {edu.end_year}
                </span>
                {edu.grade_or_honors && (
                  <span className="font-mono text-xs font-bold px-2 py-0.5 bg-retro-pink border border-retro-black">
                    {edu.grade_or_honors}
                  </span>
                )}
              </div>

              <h3 className="font-display text-lg font-black uppercase text-retro-black">
                {edu.institution}
              </h3>
              <p className="font-mono text-xs text-retro-purple font-bold">
                {edu.degree} in {edu.field_of_study}
              </p>
              {edu.description && (
                <p className="font-mono text-xs text-gray-700 mt-2 bg-retro-cream/60 p-2 border border-retro-black/40">
                  {edu.description}
                </p>
              )}
            </div>

            <div className="pt-3 border-t-2 border-retro-black flex items-center justify-end gap-2 mt-4">
              <button
                onClick={() => openEditModal(edu)}
                className="btn-neo text-xs py-1 px-3 bg-retro-yellow flex items-center gap-1"
              >
                <Edit2 size={12} />
                <span>EDIT</span>
              </button>
              <button
                onClick={() => setDeleteConfirmId(edu.id)}
                className="btn-neo text-xs py-1 px-2.5 bg-red-400 text-white flex items-center gap-1"
              >
                <Trash2 size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-retro-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-white border-4 border-retro-black shadow-neo-xl overflow-hidden">
            <div className="bg-retro-black text-white px-4 py-2.5 flex items-center justify-between border-b-2 border-retro-black">
              <span className="font-mono text-xs font-bold">
                {editingEdu ? 'EDIT EDUCATION RECORD' : 'ADD NEW DEGREE'}
              </span>
              <button onClick={() => setIsModalOpen(false)} className="w-6 h-6 bg-retro-pink text-retro-black font-bold">
                <X size={14} />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="p-6 space-y-4">
              <div>
                <label className="block font-mono text-xs font-bold uppercase mb-1">INSTITUTION / UNIVERSITY *</label>
                <input type="text" required value={institution} onChange={(e) => setInstitution(e.target.value)} className="input-neo" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-xs font-bold uppercase mb-1">DEGREE *</label>
                  <input type="text" required value={degree} onChange={(e) => setDegree(e.target.value)} placeholder="B.S. / M.S." className="input-neo" />
                </div>
                <div>
                  <label className="block font-mono text-xs font-bold uppercase mb-1">FIELD OF STUDY *</label>
                  <input type="text" required value={fieldOfStudy} onChange={(e) => setFieldOfStudy(e.target.value)} placeholder="Computer Science" className="input-neo" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-mono text-xs font-bold uppercase mb-1">START YEAR</label>
                  <input type="text" value={startYear} onChange={(e) => setStartYear(e.target.value)} className="input-neo" />
                </div>
                <div>
                  <label className="block font-mono text-xs font-bold uppercase mb-1">END YEAR</label>
                  <input type="text" value={endYear} onChange={(e) => setEndYear(e.target.value)} className="input-neo" />
                </div>
                <div>
                  <label className="block font-mono text-xs font-bold uppercase mb-1">HONORS / GPA</label>
                  <input type="text" value={gradeOrHonors} onChange={(e) => setGradeOrHonors(e.target.value)} placeholder="Summa Cum Laude" className="input-neo" />
                </div>
              </div>

              <div>
                <label className="block font-mono text-xs font-bold uppercase mb-1">DESCRIPTION / RELEVANT COURSEWORK</label>
                <textarea rows={2} value={description} onChange={(e) => setDescription(e.target.value)} className="input-neo resize-none text-xs" />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t-2 border-retro-black">
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn-neo text-xs py-2 px-3">CANCEL</button>
                <button type="submit" className="btn-neo-lime text-xs py-2 px-4 font-black">{editingEdu ? 'SAVE' : 'ADD RECORD'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <AdminConfirmModal
        isOpen={Boolean(deleteConfirmId)}
        title="Delete Education Record?"
        message="Are you sure you want to remove this academic record?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteConfirmId(null)}
      />
    </div>
  );
};
