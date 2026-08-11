import React, { useState } from 'react';
import { Search, Briefcase, Calendar, FileText, ExternalLink, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function JobInfoHub() {
  const { jobAlerts } = useApp();
  const [search, setSearch] = useState('');

  return (
    <div className="min-h-screen bg-background text-textPrimary pb-24 max-w-md mx-auto border-x border-borderDark">
      
      {/* Search Header */}
      <div className="p-4 bg-cardBg sticky top-0 z-50 border-b border-borderDark space-y-3">
        <h1 className="text-base font-bold text-textPrimary flex items-center gap-2">
          <Briefcase size={18} className="text-accentGold" /> Govt Job Notifications
        </h1>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-3 text-textSecondary" />
          <input 
            type="text" 
            placeholder="Search SSC, Railway, Banking..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-background border border-borderDark rounded-xl pl-9 pr-4 py-2 text-xs text-textPrimary focus:outline-none focus:border-accentGold"
          />
        </div>
      </div>

      {/* Vacancy Feed */}
      <main className="p-4 space-y-3">
        {jobAlerts.map((job) => (
          <div key={job.id} className="p-4 bg-cardBg rounded-xl border border-borderDark space-y-3 hover:border-accentGold/40 transition">
            <div className="flex items-start justify-between">
              <div>
                <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold rounded">
                  NEW NOTIFICATION
                </span>
                <h3 className="text-sm font-bold text-textPrimary mt-1">{job.title}</h3>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] text-textSecondary bg-background/50 p-2.5 rounded-lg border border-borderDark/50">
              <div className="flex items-center gap-1.5">
                <FileText size={13} className="text-accentGold" />
                <span>Posts: <b className="text-textPrimary">{job.totalPosts}</b></span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar size={13} className="text-accentGold" />
                <span>Last Date: <b className="text-textPrimary">{job.lastDate}</b></span>
              </div>
            </div>

            <button className="w-full py-2 bg-accentGold/10 hover:bg-accentGold text-accentGold hover:text-background border border-accentGold/40 font-bold text-xs rounded-lg transition flex items-center justify-center gap-1.5">
              <span>View Official Circular & Apply</span>
              <ExternalLink size={14} />
            </button>
          </div>
        ))}
      </main>

    </div>
  );
    }
    
