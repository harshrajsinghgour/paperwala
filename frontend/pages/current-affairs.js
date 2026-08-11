import React, { useState } from 'react';
import { BookOpen, Search, Download, Bookmark, Share2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function CurrentAffairsScreen() {
  const { currentAffairs } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'National', 'Exams', 'Science & Tech', 'Sports'];

  return (
    <div className="min-h-screen bg-background text-textPrimary pb-24 max-w-md mx-auto border-x border-borderDark">
      
      {/* Header */}
      <div className="p-4 bg-cardBg sticky top-0 z-50 border-b border-borderDark space-y-3">
        <h1 className="text-base font-bold text-textPrimary flex items-center gap-2">
          <BookOpen size={18} className="text-accentGold" /> Daily Current Affairs & Notes
        </h1>
        
        {/* Category Selector */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition ${
                selectedCategory === cat 
                  ? 'bg-accentGold text-background font-bold' 
                  : 'bg-background border border-borderDark text-textSecondary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Content Feed */}
      <main className="p-4 space-y-3">
        {currentAffairs.map((item) => (
          <article key={item.id} className="p-4 bg-cardBg rounded-xl border border-borderDark space-y-3">
            <div className="flex items-center justify-between text-[10px] text-textSecondary">
              <span className="px-2 py-0.5 bg-borderDark text-accentGold rounded font-semibold">{item.category}</span>
              <span>{item.date}</span>
            </div>

            <h2 className="text-xs font-bold text-textPrimary leading-snug">{item.title}</h2>
            <p className="text-[11px] text-textSecondary line-clamp-2">
              Key highlights for upcoming SSC, Railway, and State PSC examinations with detailed analytical insights.
            </p>

            <div className="flex items-center justify-between pt-2 border-t border-borderDark/60 text-textSecondary">
              <button className="flex items-center gap-1 text-[11px] hover:text-accentGold transition">
                <Bookmark size={14} /> Save
              </button>
              <button className="flex items-center gap-1 text-[11px] hover:text-accentGold transition">
                <Download size={14} /> PDF
              </button>
              <button className="flex items-center gap-1 text-[11px] hover:text-accentGold transition">
                <Share2 size={14} /> Share
              </button>
            </div>
          </article>
        ))}
      </main>

    </div>
  );
}
