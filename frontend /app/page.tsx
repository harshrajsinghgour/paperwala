'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function SplashScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 3 सेकंड बाद Splash Screen हटेगी और मुख्य वेबसाइट खुलेगी
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!loading) {
    // 🎯 3 सेकंड बाद मुख्य Home Page (Test Series Landing) का लेआउट
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col items-center justify-center p-6">
        <header className="w-full max-w-7xl mx-auto flex justify-between items-center py-4 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-sky-600 flex items-center justify-center text-white font-bold text-xl shadow-md">
              P
            </div>
            <h1 className="text-2xl font-black tracking-wider text-slate-900">
              PAPER <span className="text-sky-600">WALA</span>
            </h1>
          </div>
          <button className="bg-sky-600 hover:bg-sky-700 text-white font-medium px-5 py-2 rounded-lg transition">
            Login / Register
          </button>
        </header>

        <main className="flex-1 flex flex-col items-center justify-center text-center my-12">
          <span className="bg-sky-100 text-sky-700 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
            India's #1 CBT Test Series Platform
          </span>
          <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-4 max-w-3xl leading-tight">
            Prepare for Govt Exams with <span className="text-sky-600">Paper Wala</span>
          </h2>
          <p className="text-slate-600 max-w-xl text-lg mb-8">
            Attempt Live CBT Tests, PYQs, AI Progress Analytics & Real-Time Leaderboards.
          </p>
          <div className="flex gap-4">
            <button className="bg-sky-600 hover:bg-sky-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-sky-200 transition">
              Explore Test Series
            </button>
            <button className="bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-semibold px-8 py-3 rounded-xl transition">
              Free Daily Quiz
            </button>
          </div>
        </main>
      </div>
    );
  }

  // 🚀 OPENING SPLASH SCREEN LAYOUT
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-gradient-to-b from-slate-950 via-slate-900 to-sky-950 text-white p-6 select-none">
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        
        {/* ---- GOL LOGO WITH GLOW EFFECT ---- */}
        <div className="relative mb-8 group">
          {/* Outer Glowing Ring */}
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 opacity-75 blur-lg group-hover:opacity-100 transition duration-1000 animate-pulse" />
          
          {/* Circular Logo Container */}
          <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-full bg-white p-2 border-4 border-sky-400 shadow-2xl flex items-center justify-center overflow-hidden transform transition duration-500 hover:scale-105">
            <Image
              src="/logo.png" // public/logo.png फ़ाइल रखें
              alt="Paper Wala Logo"
              width={150}
              height={150}
              priority
              className="object-contain p-2"
              onError={(e) => {
                // यदि लोगो इमेज न हो तो फॉलबैक आइकॉन
                e.currentTarget.style.display = 'none';
              }}
            />
            {/* Fallback Icon if image missing */}
            <svg
              className="w-20 h-20 text-sky-600"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
            </svg>
          </div>
        </div>

        {/* ---- APP / WEBSITE NAME ---- */}
        <h1 className="text-4xl md:text-6xl font-black tracking-widest uppercase mb-3 animate-fade-in">
          PAPER <span className="text-sky-400 drop-shadow-[0_0_15px_rgba(56,189,248,0.5)]">WALA</span>
        </h1>

        {/* ---- TAGLINE ---- */}
        <p className="text-slate-300 text-sm md:text-base font-medium tracking-wide max-w-md">
          Smartest CBT Exam & Test Series Platform[span_3](start_span)[span_3](end_span)[span_4](start_span)[span_4](end_span)
        </p>

      </div>

      {/* ---- BOTTOM LOADER & FOOTER BRANDING ---- */}
      <div className="flex flex-col items-center gap-4 mb-6">
        {/* Spinner */}
        <div className="w-8 h-8 border-4 border-sky-400/30 border-t-sky-400 rounded-full animate-spin" />
        
        <p className="text-slate-400 text-xs font-semibold tracking-wider uppercase">
          Powered by PaperWala AI Engine
        </p>
      </div>
    </div>
  );
}
