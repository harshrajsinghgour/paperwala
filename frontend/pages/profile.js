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
    <main className="bg-background min-h-screen text-textPrimary flex-col pb-24">
      <Navbar />

      <div className="max-w-4xl w-full mx-auto p-4 md:p-6 my-6 space-y-6">

        {/* Profile Header - Merged Design */}
        <div className="bg-cardBg border-borderDark rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6 shadow-xl">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-accentGold/20 border-2 border-accentGold flex items-center justify-center text-accentGold text-2xl md:text-4xl font-bold shadow-lg">
            {user?.name?.[0] || 'U'}
