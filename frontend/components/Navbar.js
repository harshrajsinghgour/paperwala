import React from 'react';
import { Search, ShieldAlert, User } from 'lucide-react';

export default function Navbar({ searchTerm, setSearchTerm, user }) {
  return (
    <header className="bg-royal-blue/90 backdrop-blur-md border-b border-royal-gold/30 p-4 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        {/* Crown Logo Section */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-royal-gold/20 border border-royal-gold flex items-center justify-center font-bold text-royal-gold text-xl">
            👑
          </div>
          <span className="text-2xl font-extrabold text-royal-gold tracking-wide">PaperWala</span>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md relative">
          <input 
            type="text" 
            placeholder="PaperWala पर खोजें (Tests, Notes, Vacancies)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-royal-dark border border-royal-gold/40 rounded-full py-2 px-10 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-royal-gold"
          />
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-royal-gold" />
        </div>

        {/* User Badge */}
        <div className="flex items-center gap-2 bg-royal-dark/60 border border-royal-gold/30 px-3 py-1.5 rounded-full">
          <User className="w-4 h-4 text-royal-gold" />
          <span className="text-xs font-semibold text-royal-gold">{user?.username || 'Student'}</span>
        </div>
      </div>
    </header>
  );
}
