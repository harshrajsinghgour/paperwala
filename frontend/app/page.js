'use client'
import React, { useState } from 'react';
import Link from 'next/link';

// Temporary components - baad me alag file bana lena
const Navbar = ({searchTerm, setSearchTerm, user}) => <div className="p-4 bg-[#002B7F]">Navbar</div>
const YourProgress = ({progressData}) => <div className="p-4 bg-[#002B7F] border-[#FFD700]/30 rounded-xl mb-4">Progress: {progressData.totalTestsGiven} Tests</div>
const TestSeriesModule = () => <div>Test Series Module</div>
const PaperWalaInfoModule = () => <div>PaperWala Info Module</div>
const GroupChatModule = () => <div>Group Chat Module</div>

export default function Home() {
  const [activeTier, setActiveTier] = useState('test_series');
  const [searchTerm, setSearchTerm] = useState('');
  
  const user = { username: "Royal_Student", role: "student" };
  const progressData = { totalTestsGiven: 12, averageScore: 42.5, averageAccuracy: "84%" };

  return (
    <div className="min-h-screen text-white pb-12" style={{backgroundColor: '#001A4D'}}>
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} user={user} />

      <main className="max-w-4xl mx-auto px-4 py-4">
        {/* Hero Section */}
        <section className="text-center py-6 px-4 rounded-2xl mb-4 shadow-xl" 
          style={{background: 'linear-gradient(to bottom, #002B7F60, #001F3F)', border: '1px solid #FFD70030'}}>
          <div className="w-14 h-14 mx-auto mb-2 rounded-full flex items-center justify-center text-2xl font-black shadow-lg"
            style={{backgroundColor: '#FFD700', color: '#001A4D'}}>
            👑
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-wide mb-1" style={{color: '#FFD700'}}>
            PAPERWALA TEST PLATFORM
          </h1>
          <p className="text-sm font-bold text-gray-100">India Ka Preferred Mock Test & Prep Destination</p>
          <p className="text-xs text-gray-300 max-w-xl mx-auto mt-1 mb-4">
            SSC, Railways, Banking aur Sarkari Exams ki taiyari karein Royal Style me.
          </p>
          
          <div className="flex justify-center gap-3">
            <Link href="/test-series/1" className="text-xs font-bold px-4 py-2 rounded-lg"
              style={{backgroundColor: '#FFD700', color: '#001A4D'}}>
              Start Test 🚀
            </Link>
            <Link href="/chat" className="text-xs font-bold px-4 py-2 rounded-lg border"
              style={{backgroundColor: '#002B7F', borderColor: '#FFD70040', color: 'white'}}>
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
              className="py-3 px-2 rounded-xl text-xs md:text-sm font-bold text-center border transition flex-col items-center justify-center gap-1.5"
              style={{
                background: activeTier === tier.id 
                  ? 'linear-gradient(to bottom, #FFD700, #FFC700)' 
                  : '#001F3FCC',
                color: activeTier === tier.id ? '#001A4D' : '#D1D5DB',
                borderColor: activeTier === tier.id ? '#FFD700' : '#FFD70020',
                transform: activeTier === tier.id ? 'scale(1.05)' : 'scale(1)'
              }}
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
            <div className="p-6 border rounded-xl space-y-3" style={{backgroundColor: '#001F3F', borderColor: '#FFD70030'}}>
              <h3 className="text-base font-bold" style={{color: '#FFD700'}}>📰 Current Affairs (दैनिक व मासिक)</h3>
              <p className="text-xs text-gray-300">SSC, State PSC, Banking और Railways के लिए डेली PDFs।</p>
            </div>
          )}
          {activeTier === 'notes' && (
            <div className="p-6 border rounded-xl space-y-3" style={{backgroundColor: '#001F3F', borderColor: '#FFD70030'}}>
              <h3 className="text-base font-bold" style={{color: '#FFD700'}}>📚 Study Notes & E-Books</h3>
              <p className="text-xs text-gray-300">विषय-वार हैंडराइटेन एवं डिजिटल नोट्स।</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
    }
