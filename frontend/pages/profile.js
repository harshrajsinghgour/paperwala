import React from 'react';
import { User, Crown, ShieldCheck, Award, Settings, LogOut, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Navbar from '../components/Navbar';

export default function ProfilePage() {
  const { user } = useApp();

  const menuItems = [
    { label: 'My Enrolled Tests', icon: Award },
    { label: 'Security & Watermarking', icon: ShieldCheck },
    { label: 'App Settings', icon: Settings },
    { label: 'Logout Account', icon: LogOut, color: 'text-rose-400' },
  ];

  return (
    <main className="bg-background min-h-screen text-textPrimary flex flex-col pb-24">
      <Navbar />

      <div className="max-w-4xl w-full mx-auto p-4 md:p-6 my-6 space-y-6">

        {/* Profile Header - Merged Design */}
        <div className="bg-cardBg border-borderDark rounded-2xl p-6 flex-col md:flex-row items-center gap-6 shadow-xl">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-accentGold/20 border-2 border-accentGold flex items-center justify-center text-accentGold text-2xl md:text-4xl font-bold shadow-lg">
            {user?.name?.[0] || 'U'}
          </div>
          <div className="text-center md:text-left flex-1 space-y-2">
            <div className="flex items-center justify-center md:justify-start gap-2 flex-wrap">
              <h2 className="text-base md:text-2xl font-bold text-textPrimary">{user?.name || 'Student User'}</h2>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-accentGold/10 border-accentGold/30 text-accentGold text-xs font-semibold rounded-full">
                <Crown size={14} />
                <span>PRO Pass Active</span>
              </span>
            </div>
            <p className="text-xs md:text-sm text-textSecondary">Aspirant • SSC & Railways</p>
            <p className="text-xs md:text-sm text-textSecondary">Target Exam: SSC CGL 2026</p>
          </div>
        </div>

        {/* Stats Cards - 2 on Mobile, 4 on Desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <div className="p-3 md:p-4 bg-cardBg rounded-xl border border-borderDark text-center">
            <span className="text-lg md:text-2xl font-bold text-accentGold">12</span>
            <p className="text-[10px] md:text-xs text-textSecondary mt-0.5 md:mt-1">Mock Tests Attempted</p>
          </div
