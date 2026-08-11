import React from 'react';
import { Award, Target, Clock, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';

export default function AnalyticsScreen() {
  return (
    <div className="min-h-screen bg-background text-textPrimary pb-24 max-w-md mx-auto border-x border-borderDark p-4 space-y-4">
      
      {/* Title */}
      <div className="space-y-1">
        <h1 className="text-base font-bold flex items-center gap-2">
          <Award size={18} className="text-accentGold" /> CBT Mock Scorecard
        </h1>
        <p className="text-xs text-textSecondary">SSC CGL Tier-1 Full Length Mock #04</p>
      </div>

      {/* Score Box */}
      <div className="p-5 bg-cardBg rounded-2xl border border-accentGold/40 text-center space-y-3 relative overflow-hidden">
        <div className="space-y-1">
          <span className="text-xs text-textSecondary">Your Total Score</span>
          <h2 className="text-3xl font-black text-accentGold">154.5 <span className="text-sm font-normal text-textSecondary">/ 200</span></h2>
        </div>

        <div className="grid grid-cols-3 gap-2 pt-3 border-t border-borderDark text-center">
          <div>
            <span className="text-[10px] text-textSecondary">Rank</span>
            <p className="text-xs font-bold text-textPrimary">#42 / 4,120</p>
          </div>
          <div>
            <span className="text-[10px] text-textSecondary">Percentile</span>
            <p className="text-xs font-bold text-emerald-400">98.9%</p>
          </div>
          <div>
            <span className="text-[10px] text-textSecondary">Accuracy</span>
            <p className="text-xs font-bold text-amber-400">89.2%</p>
          </div>
        </div>
      </div>

      {/* Breakdown */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 bg-cardBg rounded-xl border border-borderDark flex items-center gap-3">
          <CheckCircle2 size={20} className="text-emerald-400 shrink-0" />
          <div>
            <span className="text-[10px] text-textSecondary">Correct</span>
            <p className="text-xs font-bold text-textPrimary">82 Questions</p>
          </div>
        </div>
        <div className="p-3 bg-cardBg rounded-xl border border-borderDark flex items-center gap-3">
          <XCircle size={20} className="text-rose-400 shrink-0" />
          <div>
            <span className="text-[10px] text-textSecondary">Incorrect</span>
            <p className="text-xs font-bold text-textPrimary">10 Questions</p>
          </div>
        </div>
      </div>

    </div>
  );
    }
        
