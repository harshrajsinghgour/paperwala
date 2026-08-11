import React, { useState } from 'react';
import { Trophy, Award, Flame, User, ChevronRight } from 'lucide-react';

export default function LeaderboardScreen() {
  const [timeframe, setTimeframe] = useState('weekly');

  const leaders = [
    { rank: 1, name: "Rahul Sharma", score: "194/200", exam: "SSC CGL", badge: "🥇" },
    { rank: 2, name: "Priya Verma", score: "188/200", exam: "RRB NTPC", badge: "🥈" },
    { rank: 3, name: "Aman Gupta", score: "182/200", exam: "SSC CHSL", badge: "🥉" },
    { rank: 4, name: "Vikram Singh", score: "176/200", exam: "RPF SI", badge: "4" },
    { rank: 5, name: "Neha Rathore", score: "172/200", exam: "SSC CGL", badge: "5" },
  ];

  return (
    <div className="min-h-screen bg-background text-textPrimary pb-24 max-w-md mx-auto border-x border-borderDark">
      
      {/* Header */}
      <div className="p-4 bg-cardBg sticky top-0 z-50 border-b border-borderDark space-y-3">
        <h1 className="text-base font-bold text-textPrimary flex items-center gap-2">
          <Trophy size={18} className="text-accentGold" /> All-India Aspirant Leaderboard
        </h1>
        
        <div className="flex bg-background p-1 rounded-xl border border-borderDark">
          {['daily', 'weekly', 'allTime'].map((t) => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg capitalize transition ${
                timeframe === t ? 'bg-accentGold text-background' : 'text-textSecondary'
              }`}
            >
              {t === 'allTime' ? 'All Time' : t}
            </button>
          ))}
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="p-4 grid grid-cols-3 gap-2 items-end pt-6">
        {/* Rank 2 */}
        <div className="bg-cardBg p-3 rounded-xl border border-borderDark text-center space-y-1">
          <span className="text-xl">🥈</span>
          <p className="text-xs font-bold text-textPrimary truncate">{leaders[1].name}</p>
          <span className="text-[10px] text-accentGold font-medium">{leaders[1].score}</span>
        </div>
        
        {/* Rank 1 */}
        <div className="bg-cardBg p-4 rounded-xl border-2 border-accentGold text-center space-y-1 -translate-y-2 shadow-lg">
          <span className="text-2xl">🥇</span>
          <p className="text-xs font-black text-textPrimary truncate">{leaders[0].name}</p>
          <span className="text-[10px] text-accentGold font-bold">{leaders[0].score}</span>
        </div>

        {/* Rank 3 */}
        <div className="bg-cardBg p-3 rounded-xl border border-borderDark text-center space-y-1">
          <span className="text-xl">🥉</span>
          <p className="text-xs font-bold text-textPrimary truncate">{leaders[2].name}</p>
          <span className="text-[10px] text-accentGold font-medium">{leaders[2].score}</span>
        </div>
      </div>

      {/* Rest Ranks List */}
      <div className="p-4 space-y-2">
        {leaders.slice(3).map((item) => (
          <div key={item.rank} className="p-3 bg-cardBg rounded-xl border border-borderDark flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-6 text-center font-bold text-xs text-textSecondary">#{item.rank}</span>
              <div>
                <h4 className="text-xs font-bold text-textPrimary">{item.name}</h4>
                <p className="text-[10px] text-textSecondary">{item.exam}</p>
              </div>
            </div>
            <span className="text-xs font-bold text-accentGold">{item.score}</span>
          </div>
        ))}
      </div>

    </div>
  );
    }
    
