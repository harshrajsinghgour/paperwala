import React from 'react';
import { FolderDown, FileText, Download, Lock } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function NotesVaultScreen() {
  const { user } = useApp();

  const notes = [
    { id: 1, title: 'Indian History One-Liner 1000 MCQs', size: '12 MB', isFree: true },
    { id: 2, title: 'RRB Math Formula Super Handbook 2026', size: '8 MB', isFree: false },
    { id: 3, title: 'Static GK All State Folder Capsule', size: '25 MB', isFree: false }
  ];

  return (
    <div className="min-h-screen bg-background text-textPrimary pb-24 max-w-md mx-auto border-x border-borderDark p-4 space-y-4">
      
      <div className="space-y-1">
        <h1 className="text-base font-bold flex items-center gap-2">
          <FolderDown size={18} className="text-accentGold" /> Offline PDF Vault
        </h1>
        <p className="text-xs text-textSecondary">Verified Study Materials & Answer Keys</p>
      </div>

      <div className="space-y-2.5">
        {notes.map((doc) => (
          <div key={doc.id} className="p-3.5 bg-cardBg rounded-xl border border-borderDark flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-background rounded-lg border border-borderDark text-accentGold">
                <FileText size={18} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-textPrimary">{doc.title}</h4>
                <span className="text-[10px] text-textSecondary">{doc.size}</span>
              </div>
            </div>

            {doc.isFree || user.isPro ? (
              <button className="p-2 bg-accentGold/10 hover:bg-accentGold text-accentGold hover:text-background rounded-lg border border-accentGold/40 transition">
                <Download size={16} />
              </button>
            ) : (
              <button className="p-2 bg-borderDark text-textSecondary rounded-lg border border-borderDark">
                <Lock size={16} />
              </button>
            )}
          </div>
        ))}
      </div>

    </div>
  );
    }
    
