import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Check, ShieldAlert, ArrowRight } from 'lucide-react';

export default function OnboardingScreen() {
  const router = useRouter();
  const [selectedExams, setSelectedExams] = useState(['SSC CGL']);

  const examCategories = [
    'SSC CGL', 'SSC CHSL', 'SSC GD', 
    'Railway RRB NTPC', 'Railway Group D', 'RPF SI & Constable',
    'State PSC', 'Rajasthan CET', 'Police Constable'
  ];

  const toggleExam = (exam) => {
    setSelectedExams((prev) => 
      prev.includes(exam) ? prev.filter((e) => e !== exam) : [...prev, exam]
    );
  };

  const handleContinue = () => {
    localStorage.setItem('pw_target_exams', JSON.stringify(selectedExams));
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-background text-textPrimary max-w-md mx-auto p-6 flex flex-col justify-between border-x border-borderDark">
      
      <div className="space-y-6 pt-6">
        <div className="space-y-2">
          <span className="px-2.5 py-1 bg-accentGold/10 text-accentGold border border-accentGold/30 text-xs font-bold rounded-md">
            PaperWala 2026
          </span>
          <h1 className="text-xl font-black text-textPrimary">Select Your Target Exams</h1>
          <p className="text-xs text-textSecondary">We will customize your mock tests and job alerts based on your selection.</p>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {examCategories.map((exam) => {
            const isSelected = selectedExams.includes(exam);
            return (
              <button
                key={exam}
                onClick={() => toggleExam(exam)}
                className={`p-3 rounded-xl border text-left text-xs font-medium flex items-center justify-between transition ${
                  isSelected 
                    ? 'bg-accentGold/10 border-accentGold text-accentGold' 
                    : 'bg-cardBg border-borderDark text-textSecondary'
                }`}
              >
                <span>{exam}</span>
                {isSelected && <Check size={14} className="text-accentGold shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      <button 
        onClick={handleContinue}
        className="w-full py-3 bg-accentGold hover:bg-accentGoldDark text-background font-black text-xs rounded-xl shadow-lg transition flex items-center justify-center gap-2 mt-6"
      >
        <span>Start Exam Preparation</span>
        <ArrowRight size={16} />
      </button>

    </div>
  );
}
