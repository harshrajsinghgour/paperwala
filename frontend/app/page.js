import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import YourProgress from '../components/YourProgress';
import TestSeriesModule from '../components/TestSeriesModule';
import PaperWalaInfoModule from '../components/PaperWalaInfoModule';
import GroupChatModule from '../components/GroupChatModule';

export default function Home() {
  const [activeTier, setActiveTier] = useState('test_series');
  const [searchTerm, setSearchTerm] = useState('');
  
  const user = { username: "Royal_Student", role: "student" };
  const progressData = { totalTestsGiven: 12, averageScore: 42.5, averageAccuracy: "84%" };

  return (
    <div className="min-h-screen bg-royal-dark text-white pb-12">
      {/* Top Navbar with Search Bar */}
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} user={user} />

      <main className="max-w-4xl mx-auto px-4 py-4">
        {/* Royal Hero Banner Section */}
        <section className="text-center py-6 px-4 bg-gradient-to-b from-royal-blue/60 to-royal-card border border-royal-gold/30 rounded-2xl mb-4 shadow-xl">
          <div className="w-14 h-14 mx-auto mb-2 rounded-full bg-royal-gold flex items-center justify-center text-royal-dark text-2xl font-black shadow-lg">
            👑
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-royal-gold tracking-wide mb-1">
            PAPERWALA TEST PLATFORM
          </h1>
          <p className="text-sm font-bold text-gray-100">
            India Ka Preferred Mock Test & Prep Destination
          </p>
          <p className="text-xs text-gray-300 max-w-xl mx-auto mt-1">
            SSC, Railways, Banking aur Sarkari Exams ki taiyari karein Royal Style me.
          </p>
        </section>

        {/* Your Progress Widget Below Search Bar / Hero Section */}
        <YourProgress progressData={progressData} />

        {/* 5 Main Navigation Tiers */}
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
              <span className="text-base">{tier.icon}</span>
              <span>{tier.name}</span>
            </button>
          ))}
        </nav>

        {/* Active Content Area */}
        <div className="mt-6">
          {activeTier === 'test_series' && <TestSeriesModule userId={1} />}
          {activeTier === 'paperwala_info' && <PaperWalaInfoModule />}
          {activeTier === 'group_chat' && <GroupChatModule user={user} />}
          
          {/* Current Affairs Tier Content */}
          {activeTier === 'current_affairs' && (
            <div className="p-6 bg-royal-card border border-royal-gold/30 rounded-xl space-y-3">
              <h3 className="text-base font-bold text-royal-gold">📰 Current Affairs (दैनिक एवं मासिक करेंट अफेयर्स)</h3>
              <p className="text-xs text-gray-300">SSC, State PSC, Banking और Railways की परीक्षाओं के लिए स्पेशल PDF व आर्टिकल्स।</p>
              <div className="grid md:grid-cols-2 gap-3 mt-4">
                <div className="p-3 bg-royal-dark/60 rounded border border-royal-gold/20 text-xs">
                  <p className="font-bold text-white">Daily Current Affairs PDF - Today</p>
                  <button className="mt-2 text-royal-gold underline font-semibold">Download PDF ↓</button>
                </div>
                <div className="p-3 bg-royal-dark/60 rounded border border-royal-gold/20 text-xs">
                  <p className="font-bold text-white">Monthly Capsule PDF - Current Month</p>
                  <button className="mt-2 text-royal-gold underline font-semibold">Download PDF ↓</button>
                </div>
              </div>
            </div>
          )}

          {/* Notes Tier Content */}
          {activeTier === 'notes' && (
            <div className="p-6 bg-royal-card border border-royal-gold/30 rounded-xl space-y-3">
              <h3 className="text-base font-bold text-royal-gold">📚 Study Notes & E-Books</h3>
              <p className="text-xs text-gray-300">विषय-वार हैंडराइटेन एवं डिजिटल नोट्स।</p>
              <div className="grid md:grid-cols-2 gap-3 mt-4">
                <div className="p-3 bg-royal-dark/60 rounded border border-royal-gold/20 text-xs">
                  <p className="font-bold text-white">Maths Complete Formula Sheet</p>
                  <button className="mt-2 text-royal-gold underline font-semibold">View Notes →</button>
                </div>
                <div className="p-3 bg-royal-dark/60 rounded border border-royal-gold/20 text-xs">
                  <p className="font-bold text-white">Rajasthan GK Hand-written Notes</p>
                  <button className="mt-2 text-royal-gold underline font-semibold">View Notes →</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
                                                     }
    
