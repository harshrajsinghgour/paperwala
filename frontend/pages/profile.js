import React from "react";
import {
  Crown,
  ShieldCheck,
  Award,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";

import { useApp } from "../context/AppContext";
import Navbar from "../components/Navbar";

export default function ProfilePage() {
  const { user } = useApp();

  const userName = user?.name || "Student User";
  const userInitial = userName.charAt(0).toUpperCase();

  const coins = user?.coins ?? 120;

  const enrolledTests = Array.isArray(user?.enrolledTests)
    ? user.enrolledTests.length
    : 0;

  const menuItems = [
    {
      title: "My Enrolled Tests",
      icon: Award,
    },
    {
      title: "Security & Watermarking",
      icon: ShieldCheck,
    },
    {
      title: "App Settings",
      icon: Settings,
    },
  ];

  return (
    <main className="min-h-screen bg-background text-textPrimary flex flex-col pb-24">
      <Navbar />

      <div className="w-full max-w-4xl mx-auto p-4 md:p-6 my-6 space-y-6">

        {/* Profile Header */}
        <section className="bg-cardBg border border-borderDark rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6 shadow-xl">
          
          {/* Avatar */}
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-accentGold/20 border-2 border-accentGold flex items-center justify-center text-accentGold text-2xl md:text-4xl font-bold shadow-lg">
            {userInitial}
          </div>

          {/* User Information */}
          <div className="flex-1 text-center md:text-left space-y-2">
            
            <div className="flex items-center justify-center md:justify-start gap-2 flex-wrap">
              <h2 className="text-base md:text-2xl font-bold text-textPrimary">
                {userName}
              </h2>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-accentGold/10 border border-accentGold/30 text-accentGold text-xs font-semibold rounded-full">
                <Crown size={14} />
                <span>PRO Pass Active</span>
              </span>
            </div>

            <p className="text-xs md:text-sm text-textSecondary">
              Aspirant • SSC & Railways
            </p>

            <p className="text-xs md:text-sm text-textSecondary">
              Target Exam: SSC CGL 2026
            </p>
          </div>
        </section>

        {/* Stats Cards */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">

          {/* Mock Tests */}
          <div className="p-3 md:p-4 bg-cardBg rounded-xl border border-borderDark text-center">
            <span className="block text-lg md:text-2xl font-bold text-accentGold">
              12
            </span>

            <p className="text-[10px] md:text-xs text-textSecondary mt-1">
              Mock Tests Attempted
            </p>
          </div>

          {/* Coins */}
          <div className="p-3 md:p-4 bg-cardBg rounded-xl border border-borderDark text-center">
            <span className="block text-lg md:text-2xl font-bold text-accentGold">
              {coins}
            </span>

            <p className="text-[10px] md:text-xs text-textSecondary mt-1">
              Coins
            </p>
          </div>

          {/* Enrolled Tests */}
          <div className="p-3 md:p-4 bg-cardBg rounded-xl border border-borderDark text-center">
            <span className="block text-lg md:text-2xl font-bold text-accentGold">
              {enrolledTests}
            </span>

            <p className="text-[10px] md:text-xs text-textSecondary mt-1">
              Enrolled Tests
            </p>
          </div>

          {/* Accuracy */}
          <div className="p-3 md:p-4 bg-cardBg rounded-xl border border-borderDark text-center">
            <span className="block text-lg md:text-2xl font-bold text-accentGold">
              85%
            </span>

            <p className="text-[10px] md:text-xs text-textSecondary mt-1">
              Avg Accuracy
            </p>
          </div>
        </section>

        {/* Menu List */}
        <section className="bg-cardBg rounded-2xl border border-borderDark overflow-hidden divide-y divide-borderDark">

          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.title}
                type="button"
                onClick={() => console.log(item.title)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-accentGold/5 transition"
              >
                <div className="flex items-center gap-3">
                  <Icon
                    size={20}
                    className="text-textSecondary"
                  />

                  <span className="text-sm font-medium text-textPrimary">
                    {item.title}
                  </span>
                </div>

                <ChevronRight
                  size={18}
                  className="text-textSecondary"
                />
              </button>
            );
          })}

          {/* Logout */}
          <button
            type="button"
            onClick={() => console.log("Logout")}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-rose-500/5 transition"
          >
            <div className="flex items-center gap-3">
              <LogOut
                size={20}
                className="text-rose-400"
              />

              <span className="text-sm font-medium text-rose-400">
                Logout Account
              </span>
            </div>

            <ChevronRight
              size={18}
              className="text-textSecondary"
            />
          </button>
        </section>
      </div>
    </main>
  );
        }
