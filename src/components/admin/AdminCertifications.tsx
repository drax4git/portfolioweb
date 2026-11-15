import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Award, Upload, X, ExternalLink, Eye } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Certification, ContentStatus } from '../../types/portfolio';
import { uploadFile } from '../../lib/supabase';
import { AdminConfirmModal } from './AdminConfirmModal';

export const AdminCertifications: React.FC = () => {
  const { certifications, addCertification, updateCertification, deleteCertification } = useData();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCert, setEditingCert] = useState<Certification | null>(null);

  const [title, setTitle] = useState('');
  const [issuer, setIssuer] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [credentialId, setCredentialId] = useState('');
  const [credentialUrl, setCredentialUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [displayOrder, setDisplayOrder] = useState(1);
  const [status, setStatus] = useState<ContentStatus>('published');

  const [isUploading, setIsUploading] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [notification, setNotification] = useState('');

  const openCreateModal = () => {
    setEditingCert(null);
    setTitle('');
    setIssuer('AWS');
    setIssueDate('2024');
    setExpiryDate('');
    setCredentialId('');
    setCredentialUrl('');
    setImageUrl('https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=600&q=80');
    setDisplayOrder(certifications.length + 1);
    setStatus('published');
    setIsModalOpen(true);
  };

  const openEditModal = (cert: Certification) => {
    setEditingCert(cert);
    setTitle(cert.title);
    setIssuer(cert.issuer);
    setIssueDate(cert.issue_date);
    setExpiryDate(cert.expiry_date || '');
    setCredentialId(cert.credential_id || '');
    setCredentialUrl(cert.credential_url || '');
    setImageUrl(cert.image_url || '');
    setDisplayOrder(cert.display_order);
    setStatus(cert.status);
    setIsModalOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const res = await uploadFile('certificates', file);
    setIsUploading(false);

    if (res.url) {
      setImageUrl(res.url);
      setNotification('Certificate asset uploaded!');
      setTimeout(() => setNotification(''), 3000);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !issuer.trim()) return;

    const payload = {
      title,
      issuer,
      issue_date: issueDate,
      expiry_date: expiryDate,
      credential_id: credentialId,
      credential_url: credentialUrl,
      image_url: imageUrl,
      display_order: Number(displayOrder),
      status,
    };

    if (editingCert) {
      await updateCertification(editingCert.id, payload);
      setNotification(`Certificate "${title}" updated!`);
    } else {
      await addCertification(payload);
      setNotification(`Certificate "${title}" added!`);
    }

    setTimeout(() => setNotification(''), 3000);
    setIsModalOpen(false);
  };

  const handleDelete = async () => {
    if (!deleteConfirmId) return;
    await deleteCertification(deleteConfirmId);
    setDeleteConfirmId(null);
    setNotification('Certificate removed.');
    setTimeout(() => setNotification(''), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-retro-black pb-4">
        <div>
          <h2 className="font-display text-2xl font-black text-retro-black uppercase">
            CERTIFICATION MANAGEMENT
          </h2>
          <p className="font-mono text-xs text-gray-600">
            Upload industry licenses, verification links, and preview documents.
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
            <span>ADD CERTIFICATE</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certifications.map((cert) => (
          <div key={cert.id} className="card-neo p-5 bg-white flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs font-bold px-2 py-0.5 bg-retro-yellow border border-retro-black">
                  {cert.issue_date}
                </span>
                <span className={`px-2 py-0.5 text-[10px] font-bold border border-retro-black ${
                  cert.status === 'published' ? 'bg-retro-lime text-retro-black' : 'bg-retro-cream text-retro-black'
                }`}>
                  {cert.status.toUpperCase()}
                </span>
              </div>

              {cert.image_url && (
                <div className="w-full h-32 bg-retro-cream border-2 border-retro-black my-2 overflow-hidden">
                  <img src={cert.image_url} alt={cert.title} className="w-full h-full object-cover" />
                </div>
              )}

              <h3 className="font-display text-base font-black uppercase text-retro-black mt-2">
                {cert.title}
              </h3>
              <p className="font-mono text-xs text-gray-600">
                Issued by: <strong>{cert.issuer}</strong>
              </p>
              {cert.credential_id && (
                <p className="font-mono text-[10px] text-gray-500 mt-1 truncate">
                  ID: {cert.credential_id}
                </p>
              )}
            </div>

            <div className="pt-3 border-t-2 border-retro-black flex items-center justify-between mt-4">
              {cert.credential_url ? (
                <a
                  href={cert.credential_url}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-xs font-bold text-retro-purple hover:underline flex items-center gap-1"
                >
                  <span>Verify</span>
                  <ExternalLink size={12} />
                </a>
              ) : <div />}

              <div className="flex items-center gap-2">
                <button
                  onClick={() => openEditModal(cert)}
                  className="btn-neo text-xs py-1 px-2.5 bg-retro-yellow flex items-center gap-1"
                >
                  <Edit2 size={12} />
                  <span>EDIT</span>
                </button>
                <button
                  onClick={() => setDeleteConfirmId(cert.id)}
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
          <div className="relative w-full max-w-lg bg-white border-4 border-retro-black shadow-neo-xl max-h-[92vh] flex flex-col overflow-hidden">
            <div className="bg-retro-black text-white px-4 py-2.5 flex items-center justify-between border-b-2 border-retro-black">
              <span className="font-mono text-xs font-bold">
                {editingCert ? 'EDIT CERTIFICATION' : 'ADD NEW CERTIFICATION'}
              </span>
              <button onClick={() => setIsModalOpen(false)} className="w-6 h-6 bg-retro-pink text-retro-black font-bold">
                <X size={14} />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="overflow-y-auto p-6 space-y-4">
              <div>
                <label className="block font-mono text-xs font-bold uppercase mb-1">CERTIFICATE TITLE *</label>
                <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="AWS Solutions Architect" className="input-neo" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-xs font-bold uppercase mb-1">ISSUING AUTHORITY *</label>
                  <input type="text" required value={issuer} onChange={(e) => setIssuer(e.target.value)} placeholder="Amazon Web Services" className="input-neo" />
                </div>
                <div>
                  <label className="block font-mono text-xs font-bold uppercase mb-1">ISSUE DATE</label>
                  <input type="text" value={issueDate} onChange={(e) => setIssueDate(e.target.value)} placeholder="OCT 2023" className="input-neo" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-xs font-bold uppercase mb-1">CREDENTIAL ID</label>
                  <input type="text" value={credentialId} onChange={(e) => setCredentialId(e.target.value)} className="input-neo text-xs" />
                </div>
                <div>
                  <label className="block font-mono text-xs font-bold uppercase mb-1">VERIFICATION URL</label>
                  <input type="url" value={credentialUrl} onChange={(e) => setCredentialUrl(e.target.value)} placeholder="https://..." className="input-neo text-xs" />
                </div>
              </div>

              {/* Upload Certificate Image / PDF */}
              <div className="card-neo p-3 bg-retro-cream space-y-2">
                <label className="block font-mono text-xs font-bold uppercase">CERTIFICATE IMAGE / PDF PREVIEW</label>
                <input type="file" accept="image/*,.pdf" onChange={handleFileUpload} className="font-mono text-xs" />
                {isUploading && <p className="font-mono text-xs text-retro-purple">Uploading...</p>}
                <input type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="Or paste direct image URL" className="input-neo text-xs py-1" />
              </div>

              <div className="grid grid-cols-2 gap-3">
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

              <div className="pt-2 flex items-center justify-end gap-2 border-t-2 border-retro-black">
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn-neo text-xs py-2 px-3">CANCEL</button>
                <button type="submit" className="btn-neo-lime text-xs py-2 px-4 font-black">{editingCert ? 'SAVE' : 'ADD CERTIFICATE'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <AdminConfirmModal
        isOpen={Boolean(deleteConfirmId)}
        title="Delete Certificate?"
        message="Are you sure you want to remove this certificate?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteConfirmId(null)}
      />
    </div>
  );
};
