import React from 'react';
import { Bell, CheckCircle2, AlertCircle, Info, ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/router';

export default function NotificationsScreen() {
  const router = useRouter();

  const notifications = [
    {
      id: 1,
      type: 'alert',
      title: 'SSC CGL Tier-1 Admit Card Out',
      desc: 'Download your admit card for North Region directly from official links.',
      time: '10 mins ago',
    },
    {
      id: 2,
      type: 'success',
      title: 'CBT Mock #04 Result Published',
      desc: 'You scored 154.5/200. Check your detailed scorecard and solutions.',
      time: '2 hours ago',
    },
    {
      id: 3,
      type: 'info',
      title: 'Daily Current Affairs PDF Updated',
      desc: 'August Monthly Capsule is now available in Notes Vault.',
      time: '1 day ago',
    },
  ];

  return (
    <div className="min-h-screen bg-background text-textPrimary pb-24 max-w-md mx-auto border-x border-borderDark">
      
      {/* Header */}
      <header className="p-4 bg-cardBg border-b border-borderDark flex items-center gap-3 sticky top-0 z-50">
        <button onClick={() => router.back()} className="text-textSecondary hover:text-textPrimary">
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-sm font-bold flex items-center gap-2">
          <Bell size={18} className="text-accentGold" /> Exam Updates & Alerts
        </h1>
      </header>

      {/* List */}
      <main className="p-4 space-y-3">
        {notifications.map((item) => (
          <div key={item.id} className="p-3.5 bg-cardBg rounded-xl border border-borderDark flex gap-3">
            <div className="pt-0.5">
              {item.type === 'alert' && <AlertCircle size={18} className="text-rose-400" />}
              {item.type === 'success' && <CheckCircle2 size={18} className="text-emerald-400" />}
              {item.type === 'info' && <Info size={18} className="text-accentGold" />}
            </div>
            <div className="space-y-1 flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-textPrimary">{item.title}</h3>
                <span className="text-[9px] text-textSecondary">{item.time}</span>
              </div>
              <p className="text-[11px] text-textSecondary leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </main>

    </div>
  );
                }
                                                           
