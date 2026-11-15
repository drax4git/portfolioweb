import React, { useState } from 'react';
import { Mail, Trash2, CheckCircle2, MessageSquare, Reply, Clock } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { ContactMessage } from '../../types/portfolio';
import { AdminConfirmModal } from './AdminConfirmModal';

export const AdminMessages: React.FC = () => {
  const { contactMessages, markMessageAsRead, deleteMessage } = useData();
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  const handleSelect = (msg: ContactMessage) => {
    setSelectedMessage(msg);
    if (!msg.read) {
      markMessageAsRead(msg.id);
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirmId) return;
    await deleteMessage(deleteConfirmId);
    if (selectedMessage?.id === deleteConfirmId) {
      setSelectedMessage(null);
    }
    setDeleteConfirmId(null);
  };

  return (
    <div className="space-y-6">
      <div className="border-b-2 border-retro-black pb-4">
        <h2 className="font-display text-2xl font-black text-retro-black uppercase">
          INBOUND MESSAGES & TRANSMISSIONS
        </h2>
        <p className="font-mono text-xs text-gray-600">
          Messages received from visitors via your portfolio contact form.
        </p>
      </div>

      {contactMessages.length === 0 ? (
        <div className="card-neo p-12 text-center bg-white border-2 border-dashed border-retro-black">
          <MessageSquare size={36} className="mx-auto text-gray-400 mb-3" />
          <h3 className="font-display text-lg font-black text-retro-black uppercase">
            NO INCOMING MESSAGES YET
          </h3>
          <p className="font-mono text-xs text-gray-500 mt-1">
            When recruiters or collaborators submit the contact form on your portfolio, their messages will appear here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Message List (5 cols) */}
          <div className="md:col-span-5 space-y-2">
            {contactMessages.map((msg) => (
              <div
                key={msg.id}
                onClick={() => handleSelect(msg)}
                className={`card-neo p-4 cursor-pointer transition-all ${
                  selectedMessage?.id === msg.id
                    ? 'bg-retro-yellow border-4 border-retro-black shadow-neo'
                    : msg.read
                    ? 'bg-white hover:bg-retro-cream'
                    : 'bg-retro-lime/30 font-bold border-retro-black'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                  <span className="font-bold text-retro-purple truncate max-w-[150px]">
                    {msg.email}
                  </span>
                  <span className="text-gray-500 flex items-center gap-1">
                    <Clock size={10} />
                    {new Date(msg.created_at).toLocaleDateString()}
                  </span>
                </div>

                <h4 className="font-display text-sm font-black uppercase text-retro-black truncate">
                  {msg.name}: {msg.subject}
                </h4>

                <p className="font-mono text-xs text-gray-600 line-clamp-1 mt-1">
                  {msg.message}
                </p>
              </div>
            ))}
          </div>

          {/* Message Detail Viewer (7 cols) */}
          <div className="md:col-span-7">
            {selectedMessage ? (
              <div className="card-neo p-6 bg-white border-4 border-retro-black shadow-neo-lg space-y-6">
                <div className="flex items-start justify-between gap-4 border-b-2 border-retro-black pb-4">
                  <div>
                    <span className="font-mono text-[10px] font-bold text-gray-500 uppercase">
                      MESSAGE TRANSMISSION
                    </span>
                    <h3 className="font-display text-2xl font-black text-retro-black uppercase mt-1">
                      {selectedMessage.subject}
                    </h3>
                    <div className="font-mono text-xs text-gray-600 mt-1 space-y-0.5">
                      <div>From: <strong className="text-retro-black">{selectedMessage.name}</strong> ({selectedMessage.email})</div>
                      <div>Received: {new Date(selectedMessage.created_at).toLocaleString()}</div>
                    </div>
                  </div>

                  <button
                    onClick={() => setDeleteConfirmId(selectedMessage.id)}
                    className="btn-neo text-xs py-1 px-2.5 bg-red-400 text-white"
                    title="Delete message"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                {/* Message Body */}
                <div className="bg-retro-cream p-5 border-2 border-retro-black font-mono text-sm text-retro-darkgray whitespace-pre-wrap leading-relaxed">
                  {selectedMessage.message}
                </div>

                {/* Reply Button */}
                <div className="pt-2 flex items-center gap-3">
                  <a
                    href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject)}`}
                    className="btn-neo-lime text-xs py-2 px-4 font-black flex items-center gap-2"
                  >
                    <Reply size={16} />
                    <span>REPLY VIA EMAIL</span>
                  </a>
                </div>
              </div>
            ) : (
              <div className="card-neo p-12 text-center bg-retro-cream text-gray-500 font-mono text-xs">
                Select a message on the left to read its full content.
              </div>
            )}
          </div>
        </div>
      )}

      <AdminConfirmModal
        isOpen={Boolean(deleteConfirmId)}
        title="Delete Message?"
        message="Are you sure you want to permanently delete this message inquiry?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteConfirmId(null)}
      />
    </div>
  );
};
