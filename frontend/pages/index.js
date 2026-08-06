import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import YourProgress from '../components/YourProgress';
import TestSeriesModule from '../components/TestSeriesModule';
import PaperWalaInfoModule from '../components/PaperWalaInfoModule';
import GroupChatModule from '../components/GroupChatModule';
import Link from 'next/link';

export default function Home() {
  const [activeTier, setActiveTier] = useState('test_series');
  const [searchTerm, setSearchTerm] = useState('');
  
  const user = { username: "Royal_Student", role: "student" };
  const progressData = { totalTestsGiven: 12, averageScore: 42.5, averageAccuracy: "84%" };

  return (
    <div className="min-h-screen bg-royal-dark text-white pb-12">
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} user={user} />

      <main className="max-w-4xl mx-auto px-4 py-4">
        {/* Hero Section */}
        <section className="text-center py-6 px-4 bg-gradient-to-b from-royal-blue/60 to-royal-card border border-royal-gold/30 rounded-2xl mb-4 shadow-xl">
          <div className="w-14 h-14 mx-auto mb-2 rounded-full bg-royal-gold flex items-center justify-center text-royal-dark text-2xl font-black shadow-lg">
            👑
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-royal-gold tracking-wide mb-1">
            PAPERWALA TEST PLATFORM
          </h1>
          <p className="text-sm font-bold text-gray-100">India Ka Preferred Mock Test & Prep Destination</p>
          <p className="text-xs text-gray-300 max-w-xl mx-auto mt-1 mb-4">
            SSC, Railways, Banking aur Sarkari Exams ki taiyari karein Royal Style me.
          </p>
          
          <div className="flex justify-center gap-3">
            <Link href="/test-series/1" className="bg-royal-gold text-royal-dark text-xs font-bold px-4 py-2 rounded-lg hover:bg-yellow-400">
              Start Test 🚀
            </Link>
            <Link href="/chat" className="bg-royal-blue border border-royal-gold/40 text-white text-xs font-bold px-4 py-2 rounded-lg hover:border-royal-gold">
              Join Chat 💬
            </Link>
          </div>
        </section>

        {/* Your Progress Bar */}
        <YourProgress progressData={progressData} />

        {/* 5 Main Tiers */}
        <nav className="grid grid-cols-5 gap-2 my-5">
          {[
            { id: 'test_series', name: 'Test Series', icon: '📝' },
            { id: 'paperwala_info', name: 'PaperWala Info', icon: '📢' },
            { id: 'current_affairs', name: 'Current Affairs', icon: '📰' },
            { id: 'group_chat', name: 'Group Chat', icon: '💬' },
            { id: 'notes', name: 'Notes', icon: '📚' }
          ].map(tier => (
            <button
              key={tier.id}
              onClick={() => setActiveTier(tier.id)}
              className={`py-3 px-2 rounded-xl text-xs md:text-sm font-bold text-center border transition flex flex-col md:flex-row items-center justify-center gap-1.5 ${
                activeTier === tier.id 
                  ? 'bg-gradient-to-b from-royal-gold to-yellow-600 text-royal-dark border-royal-lightGold shadow-lg scale-105' 
                  : 'bg-royal-card/80 text-gray-300 border-royal-gold/20 hover:border-royal-gold'
              }`}
            >
              <span>{tier.icon}</span>
              <span>{tier.name}</span>
            </button>
          ))}
        </nav>

        {/* Active Content */}
        <div className="mt-6">
          {activeTier === 'test_series' && <TestSeriesModule userId={1} />}
          {activeTier === 'paperwala_info' && <PaperWalaInfoModule />}
          {activeTier === 'group_chat' && <GroupChatModule user={user} />}
          {activeTier === 'current_affairs' && (
            <div className="p-6 bg-royal-card border border-royal-gold/30 rounded-xl space-y-3">
              <h3 className="text-base font-bold text-royal-gold">📰 Current Affairs (दैनिक व मासिक)</h3>
              <p className="text-xs text-gray-300">SSC, State PSC, Banking और Railways के लिए डेली PDFs।</p>
            </div>
          )}
          {activeTier === 'notes' && (
            <div className="p-6 bg-royal-card border border-royal-gold/30 rounded-xl space-y-3">
              <h3 className="text-base font-bold text-royal-gold">📚 Study Notes & E-Books</h3>
              <p className="text-xs text-gray-300">विषय-वार हैंडराइटेन एवं डिजिटल नोट्स।</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
    }
    
