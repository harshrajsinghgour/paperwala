import React from 'react';
import { Award, Target, Clock, Zap } from 'lucide-react';

export default function YourProgress({ progressData }) {
  return (
    <div className="bg-gradient-to-r from-royal-blue via-royal-card to-royal-dark border border-royal-gold/40 rounded-xl p-4 my-4 shadow-xl">
      <div className="flex items-center justify-between mb-3 border-b border-royal-gold/20 pb-2">
        <h3 className="text-sm font-bold text-royal-gold flex items-center gap-2">
          <Award className="w-4 h-4" /> Your Progress (आपकी प्रगति रिपोर्ट)
        </h3>
        <span className="text-xs bg-royal-gold/20 text-royal-gold px-2 py-0.5 rounded border border-royal-gold/40">AI Analysis Active</span>
      </div>

      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="bg-royal-dark/50 p-2 rounded-lg border border-royal-gold/10">
          <Target className="w-4 h-4 text-royal-gold mx-auto mb-1" />
          <p className="text-xs text-gray-400">कुल टेस्ट</p>
          <p className="text-base font-extrabold text-white">{progressData?.totalTestsGiven || 0}</p>
        </div>

        <div className="bg-royal-dark/50 p-2 rounded-lg border border-royal-gold/10">
          <Zap className="w-4 h-4 text-royal-lightGold mx-auto mb-1" />
          <p className="text-xs text-gray-400">औसत एक्यूरेसी</p>
          <p className="text-base font-extrabold text-royal-lightGold">{progressData?.averageAccuracy || '0%'}</p>
        </div>

        <div className="bg-royal-dark/50 p-2 rounded-lg border border-royal-gold/10">
          <Clock className="w-4 h-4 text-royal-gold mx-auto mb-1" />
          <p className="text-xs text-gray-400">औसत स्कोर</p>
          <p className="text-base font-extrabold text-white">{progressData?.averageScore || 0}</p>
        </div>
      </div>
    </div>
  );
  }
  
