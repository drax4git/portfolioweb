import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface AdminConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
}

export const AdminConfirmModal: React.FC<AdminConfirmModalProps> = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = 'DELETE ITEM',
  cancelText = 'CANCEL',
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-retro-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white border-4 border-retro-black shadow-neo-xl overflow-hidden">
        {/* Retro Window Header */}
        <div className="bg-retro-pink text-retro-black px-4 py-2 font-mono text-xs font-black flex items-center gap-2 border-b-3 border-retro-black">
          <AlertTriangle size={16} />
          <span>CONFIRM DESTRUCTIVE ACTION</span>
        </div>

        <div className="p-6 space-y-4">
          <h3 className="font-display text-xl font-black text-retro-black uppercase">
            {title}
          </h3>
          <p className="font-mono text-xs text-retro-darkgray leading-relaxed bg-retro-cream p-3 border-2 border-retro-black">
            {message}
          </p>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="btn-neo text-xs py-2 px-4"
            >
              {cancelText}
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="btn-neo bg-red-500 text-white hover:bg-red-600 text-xs py-2 px-4 font-black"
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
