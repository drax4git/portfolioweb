import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Cpu, ExternalLink, X } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { CodingStatistic, ContentStatus } from '../../types/portfolio';
import { AdminConfirmModal } from './AdminConfirmModal';

export const AdminCodingStats: React.FC = () => {
  const { codingStatistics, addCodingStatistic, updateCodingStatistic, deleteCodingStatistic } = useData();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStat, setEditingStat] = useState<CodingStatistic | null>(null);

  const [platform, setPlatform] = useState<'leetcode' | 'github' | 'codeforces' | 'hackerrank' | 'general'>('leetcode');
  const [metricName, setMetricName] = useState('');
  const [metricValue, setMetricValue] = useState('');
  const [profileUrl, setProfileUrl] = useState('');
  const [displayOrder, setDisplayOrder] = useState(1);
  const [status, setStatus] = useState<ContentStatus>('published');

  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [notification, setNotification] = useState('');

  const openCreateModal = () => {
    setEditingStat(null);
    setPlatform('leetcode');
    setMetricName('Problems Solved');
    setMetricValue('700+');
    setProfileUrl('https://leetcode.com');
    setDisplayOrder(codingStatistics.length + 1);
    setStatus('published');
    setIsModalOpen(true);
  };

  const openEditModal = (stat: CodingStatistic) => {
    setEditingStat(stat);
    setPlatform(stat.platform);
    setMetricName(stat.metric_name);
    setMetricValue(stat.metric_value);
    setProfileUrl(stat.profile_url || '');
    setDisplayOrder(stat.display_order);
    setStatus(stat.status);
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!metricName.trim() || !metricValue.trim()) return;

    const payload = {
      platform,
      metric_name: metricName,
      metric_value: metricValue,
      profile_url: profileUrl,
      display_order: Number(displayOrder),
      status,
    };

    if (editingStat) {
      await updateCodingStatistic(editingStat.id, payload);
      setNotification('Metric updated!');
    } else {
      await addCodingStatistic(payload);
      setNotification('Coding metric added!');
    }

    setTimeout(() => setNotification(''), 3000);
    setIsModalOpen(false);
  };

  const handleDelete = async () => {
    if (!deleteConfirmId) return;
    await deleteCodingStatistic(deleteConfirmId);
    setDeleteConfirmId(null);
    setNotification('Metric removed.');
    setTimeout(() => setNotification(''), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-retro-black pb-4">
        <div>
          <h2 className="font-display text-2xl font-black text-retro-black uppercase">
            CODING STATISTICS & PLATFORMS
          </h2>
          <p className="font-mono text-xs text-gray-600">
            Showcase authentic problem-solving statistics and platform links (never fabricate metrics).
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
            <span>ADD METRIC</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {codingStatistics.map((stat) => (
          <div key={stat.id} className="card-neo p-5 bg-white flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs font-bold uppercase px-2 py-0.5 bg-retro-cream border border-retro-black">
                  {stat.platform}
                </span>
                <span className={`px-2 py-0.5 text-[10px] font-bold border border-retro-black ${
                  stat.status === 'published' ? 'bg-retro-lime text-retro-black' : 'bg-retro-yellow text-retro-black'
                }`}>
                  {stat.status.toUpperCase()}
                </span>
              </div>

              <div className="font-display text-3xl font-black text-retro-black my-2">
                {stat.metric_value}
              </div>
              <h3 className="font-mono text-xs font-bold text-gray-700">
                {stat.metric_name}
              </h3>
            </div>

            <div className="pt-3 border-t-2 border-retro-black flex items-center justify-between mt-4">
              {stat.profile_url ? (
                <a
                  href={stat.profile_url}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-xs font-bold text-retro-purple hover:underline flex items-center gap-1"
                >
                  <span>Link</span>
                  <ExternalLink size={12} />
                </a>
              ) : <div />}

              <div className="flex items-center gap-2">
                <button
                  onClick={() => openEditModal(stat)}
                  className="btn-neo text-xs py-1 px-2.5 bg-retro-yellow flex items-center gap-1"
                >
                  <Edit2 size={12} />
                </button>
                <button
                  onClick={() => setDeleteConfirmId(stat.id)}
                  className="btn-neo text-xs py-1 px-2.5 bg-red-400 text-white flex items-center gap-1"
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
                {editingStat ? 'EDIT CODING STAT' : 'ADD NEW PLATFORM STAT'}
              </span>
              <button onClick={() => setIsModalOpen(false)} className="w-6 h-6 bg-retro-pink text-retro-black font-bold">
                <X size={14} />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="p-6 space-y-4">
              <div>
                <label className="block font-mono text-xs font-bold uppercase mb-1">PLATFORM</label>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value as any)}
                  className="input-neo"
                >
                  <option value="leetcode">LeetCode</option>
                  <option value="github">GitHub</option>
                  <option value="codeforces">Codeforces</option>
                  <option value="hackerrank">HackerRank</option>
                  <option value="general">General / Other</option>
                </select>
              </div>

              <div>
                <label className="block font-mono text-xs font-bold uppercase mb-1">METRIC VALUE *</label>
                <input
                  type="text"
                  required
                  value={metricValue}
                  onChange={(e) => setMetricValue(e.target.value)}
                  placeholder="e.g. 685+ or 2,140+ or Top 3%"
                  className="input-neo"
                />
              </div>

              <div>
                <label className="block font-mono text-xs font-bold uppercase mb-1">METRIC LABEL *</label>
                <input
                  type="text"
                  required
                  value={metricName}
                  onChange={(e) => setMetricName(e.target.value)}
                  placeholder="e.g. Problems Solved or Contributions"
                  className="input-neo"
                />
              </div>

              <div>
                <label className="block font-mono text-xs font-bold uppercase mb-1">PROFILE URL</label>
                <input
                  type="url"
                  value={profileUrl}
                  onChange={(e) => setProfileUrl(e.target.value)}
                  placeholder="https://leetcode.com/username"
                  className="input-neo text-xs"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t-2 border-retro-black">
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn-neo text-xs py-2 px-3">CANCEL</button>
                <button type="submit" className="btn-neo-lime text-xs py-2 px-4 font-black">{editingStat ? 'SAVE' : 'ADD STAT'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <AdminConfirmModal
        isOpen={Boolean(deleteConfirmId)}
        title="Delete Statistic?"
        message="Are you sure you want to remove this metric card?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteConfirmId(null)}
      />
    </div>
  );
};
