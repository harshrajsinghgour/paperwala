import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export default function Toast({ message, type = 'success', onClose, duration = 3000 }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!message) return null;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 max-w-xs w-full px-4">
      <div className={`p-3 rounded-xl border flex items-center justify-between shadow-xl backdrop-blur-md transition ${
        type === 'success' 
          ? 'bg-emerald-950/90 border-emerald-500/40 text-emerald-300' 
          : 'bg-rose-950/90 border-rose-500/40 text-rose-300'
      }`}>
        <div className="flex items-center gap-2.5 text-xs font-semibold">
          {type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
          <span>{message}</span>
        </div>
        <button onClick={onClose} className="opacity-70 hover:opacity-100">
          <X size={14} />
        </button>
      </div>
    </div>
  );
          }
  
