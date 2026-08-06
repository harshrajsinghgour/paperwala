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
      {/* Top Navbar */}
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} user={user} />

      <main className="max-w-4xl mx-auto px-4">
        {/* Your Progress Widget Below Search Bar */}
        <YourProgress progressData={progressData} />

        {/* 5 Main Navigation Tiers */}
        <nav className="grid grid-cols-5 gap-2 my-4">
          {[
            { id: 'test_series', name: 'Test Series' },
            { id: 'paperwala_info', name: 'PaperWala Info' },
            { id: 'current_affairs', name: 'Current Affairs' },
            { id: 'group_chat', name: 'Group Chat' },
            { id: 'notes', name: 'Notes' }
          ].map(tier => (
            <button
              key={tier.id}
              onClick={() => setActiveTier(tier.id)}
              className={`py-3 px-2 rounded-xl text-xs font-bold text-center border transition ${
                activeTier === tier.id 
                  ? 'bg-gradient-to-b from-royal-gold to-yellow-600 text-royal-dark border-royal-lightGold shadow-lg' 
                  : 'bg-royal-card/80 text-gray-300 border-royal-gold/20 hover:border-royal-gold'
              }`}
            >
              {tier.name}
            </button>
          ))}
        </nav>

        {/* Active Content Area */}
        <div className="mt-6">
          {activeTier === 'test_series' && <TestSeriesModule userId={1} />}
          {activeTier === 'paperwala_info' && <PaperWalaInfoModule />}
          {activeTier === 'group_chat' && <GroupChatModule user={user} />}
          {activeTier === 'current_affairs' && <div className="p-4 bg-royal-card border border-royal-gold/30 rounded-xl text-xs text-gray-300">Daily & Monthly Current Affairs PDFs Available.</div>}
          {activeTier === 'notes' && <div className="p-4 bg-royal-card border border-royal-gold/30 rounded-xl text-xs text-gray-300">Subject-wise Handwritten & Digital Notes PDFs.</div>}
        </div>
      </main>
    </div>
  );
          }
           
