import React, { useState } from 'react';
import { Search, X, SlidersHorizontal, Check } from 'lucide-react';

export default function SearchFilterModal({ isOpen, onClose, onApply }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSort, setSelectedSort] = useState('latest');

  if (!isOpen) return null;

  const categories = ['All', 'SSC', 'Railway', 'Defence', 'State Exams'];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-0 sm:p-4">
      <div className="bg-cardBg border border-borderDark w-full max-w-md rounded-t-2xl sm:rounded-2xl p-5 space-y-4 animate-in slide-in-from-bottom duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-borderDark pb-3">
          <h3 className="text-sm font-bold flex items-center gap-2">
            <SlidersHorizontal size={16} className="text-accentGold" /> Search & Filter Tests
          </h3>
          <button onClick={onClose} className="text-textSecondary hover:text-textPrimary">
            <X size={18} />
          </button>
        </div>

        {/* Categories */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-textSecondary">Exam Category</label>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
                  selectedCategory === cat 
                    ? 'bg-accentGold/10 border-accentGold text-accentGold' 
                    : 'bg-background border-borderDark text-textSecondary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Sorting */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-textSecondary">Sort By</label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'latest', label: 'Most Recent' },
              { id: 'popular', label: 'Most Attempted' }
            ].map((sort) => (
              <button
                key={sort.id}
                onClick={() => setSelectedSort(sort.id)}
                className={`p-2.5 rounded-xl border text-xs font-medium flex items-center justify-between transition ${
                  selectedSort === sort.id 
                    ? 'bg-accentGold/10 border-accentGold text-accentGold' 
                    : 'bg-background border-borderDark text-textSecondary'
                }`}
              >
                <span>{sort.label}</span>
                {selectedSort === sort.id && <Check size={14} />}
              </button>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button 
          onClick={() => {
            onApply({ category: selectedCategory, sort: selectedSort });
            onClose();
          }}
          className="w-full py-2.5 bg-accentGold text-background font-bold text-xs rounded-xl hover:bg-accentGoldDark transition"
        >
          Apply Filters
        </button>

      </div>
    </div>
  );
                }
