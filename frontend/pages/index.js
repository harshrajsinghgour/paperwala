import React, { useState } from 'react';
import { 
  BookOpen, 
  Briefcase, 
  HelpCircle, 
  Award, 
  Crown, 
  User, 
  Bell, 
  Search, 
  FileText,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function MainDashboard() {
  const { user, currentAffairs, jobAlerts } = useApp();
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="min-h-screen bg-background text-textPrimary pb-24 max-w-md mx-auto relative border-x border-borderDark shadow-2xl">
      
      {/* Header Bar */}
      <header className="p-4 bg-cardBg/80 backdrop-blur-md sticky top-0 z-50 flex items-center justify-between border-b border-borderDark">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-accentGold flex items-center justify-center font-bold text-background text-lg shadow-md">
            PW
          </div>
          <div>
            <h1 className="text-base font-bold tracking-wide text-textPrimary">PAPER WALA</h1>
            <p className="text-xs text-textSecondary">Exam & Job Prep Portal</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 bg-background rounded-full border border-borderDark text-textSecondary hover:text-accentGold transition">
            <Bell size={18} />
          </button>
          <button className="flex items-center gap-1 px-3 py-1.5 bg-accentGold/10 border border-accentGold/40 text-accentGold text-xs font-semibold rounded-full">
            <Crown size={14} />
            <span>PRO Pass</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="p-4 space-y-6">
        
        {/* Banner Section */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-cardBg via-borderDark to-cardBg border border-accentGold/30 relative overflow-hidden shadow-lg">
          <div className="relative z-10 space-y-2">
            <span className="px-2.5 py-1 bg-accentGold/20 text-accentGold text-[10px] font-bold rounded-md uppercase tracking-wider">
              Live CBT Test Engine
            </span>
            <h2 className="text-xl font-extrabold text-white">SSC & Railway Mock Series 2026</h2>
            <p className="text-xs text-textSecondary">Real Exam Pattern with Instant Analytics & Watermark Security.</p>
            <button className="mt-2 px-4 py-2 bg-accentGold hover:bg-accentGoldDark text-background font-bold text-xs rounded-xl shadow-md transition">
              Attempt Mock Test
            </button>
          </div>
        </div>

        {/* Quick Navigation Cards */}
        <div className="grid grid-cols-4 gap-3">
          {[
            { label: 'CBT Tests', icon: FileText, color: 'text-amber-400' },
            { label: 'Current Affairs', icon: BookOpen, color: 'text-blue-400' },
            { label: 'Job Alerts', icon: Briefcase, color: 'text-emerald-400' },
            { label: 'AI Doubt Solver', icon: HelpCircle, color: 'text-purple-400' },
          ].map((item, idx) => (
            <button key={idx} className="p-3 bg-cardBg rounded-xl border border-borderDark flex flex-col items-center justify-center text-center gap-1.5 hover:border-accentGold/50 transition">
              <item.icon size={22} className={item.color} />
              <span className="text-[11px] font-medium text-textPrimary leading-tight">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Latest Job Alerts Section */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-textPrimary flex items-center gap-2">
              <Briefcase size={16} className="text-accentGold" /> Job Alerts & Vacancies
            </h3>
            <span className="text-xs text-accentGold font-medium cursor-pointer">View All</span>
          </div>

          <div className="space-y-2.5">
            {jobAlerts.map((job) => (
              <div key={job.id} className="p-3.5 bg-cardBg rounded-xl border border-borderDark flex items-center justify-between hover:border-accentGold/40 transition">
                <div>
                  <h4 className="text-xs font-bold text-textPrimary">{job.title}</h4>
                  <p className="text-[11px] text-textSecondary mt-0.5">Posts: {job.totalPosts} • Last Date: {job.lastDate}</p>
                </div>
                <ChevronRight size={16} className="text-textSecondary" />
              </div>
            ))}
          </div>
        </section>

        {/* Current Affairs & Study Vault */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-textPrimary flex items-center gap-2">
              <BookOpen size={16} className="text-accentGold" /> Daily Current Affairs
            </h3>
            <span className="text-xs text-accentGold font-medium cursor-pointer">Read Notes</span>
          </div>

          <div className="space-y-2.5">
            {currentAffairs.map((ca) => (
              <div key={ca.id} className="p-3.5 bg-cardBg rounded-xl border border-borderDark flex items-center justify-between">
                <div>
                  <span className="text-[10px] bg-borderDark text-accentGold px-2 py-0.5 rounded font-medium">{ca.category}</span>
                  <h4 className="text-xs font-semibold text-textPrimary mt-1">{ca.title}</h4>
                </div>
                <ShieldCheck size={16} className="text-emerald-400" />
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* Sticky Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-cardBg/90 backdrop-blur-lg border-t border-borderDark px-6 py-2.5 flex items-center justify-between z-50">
        {[
          { id: 'home', label: 'Home', icon: BookOpen },
          { id: 'tests', label: 'Tests', icon: FileText },
          { id: 'jobs', label: 'Jobs', icon: Briefcase },
          { id: 'profile', label: 'Profile', icon: User },
        ].map((tab) => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center gap-1 ${activeTab === tab.id ? 'text-accentGold' : 'text-textSecondary'}`}
          >
            <tab.icon size={20} />
            <span className="text-[10px] font-medium">{tab.label}</span>
          </button>
        ))}
      </nav>

    </div>
  );
}
