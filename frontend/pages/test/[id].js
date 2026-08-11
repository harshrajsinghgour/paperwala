import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ArrowLeft, Clock, ShieldAlert, CheckCircle2, ChevronRight, ChevronLeft } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function CBTExamScreen() {
  const router = useRouter();
  const { user } = useApp();
  
  const [timeLeft, setTimeLeft] = useState(3600); // 60 minutes
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const questions = [
    {
      id: 1,
      question: "Which Indian state launched the 'Mukhya Mantri Yuva Kosh' scheme in 2026?",
      options: ["Rajasthan", "Madhya Pradesh", "Uttar Pradesh", "Bihar"],
      correct: 0
    },
    {
      id: 2,
      question: "What is the speed of light in vacuum?",
      options: ["3 x 10^8 m/s", "3 x 10^6 m/s", "3 x 10^10 m/s", "3 x 10^5 m/s"],
      correct: 0
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (index) => {
    setSelectedAnswers({ ...selectedAnswers, [currentQuestion]: index });
  };

  return (
    <div className="min-h-screen bg-background text-textPrimary max-w-md mx-auto relative flex flex-col justify-between border-x border-borderDark select-none">
      
      {/* Anti-Piracy Dynamic Watermark Overlay */}
      <div className="pointer-events-none absolute inset-0 z-40 flex items-center justify-center opacity-10 rotate-45 text-sm font-bold text-textSecondary tracking-widest">
        {user.name} • PAPER WALA CBT
      </div>

      {/* Header Bar */}
      <header className="p-4 bg-cardBg border-b border-borderDark flex items-center justify-between sticky top-0 z-50">
        <button onClick={() => router.back()} className="text-textSecondary hover:text-textPrimary">
          <ArrowLeft size={20} />
        </button>
        <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-accentGold rounded-full text-xs font-bold">
          <Clock size={14} />
          <span>{formatTime(timeLeft)}</span>
        </div>
        <button className="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-lg text-xs font-semibold">
          Submit
        </button>
      </header>

      {/* Question Canvas */}
      <main className="p-4 flex-1 space-y-4">
        <div className="flex items-center justify-between text-xs text-textSecondary">
          <span>Question {currentQuestion + 1} of {questions.length}</span>
          <span className="text-emerald-400 font-medium">+2.0 / -0.50 Marks</span>
        </div>

        <div className="p-4 bg-cardBg rounded-xl border border-borderDark font-medium text-sm leading-relaxed">
          {questions[currentQuestion].question}
        </div>

        {/* Options List */}
        <div className="space-y-2.5">
          {questions[currentQuestion].options.map((opt, idx) => {
            const isSelected = selectedAnswers[currentQuestion] === idx;
            return (
              <button
                key={idx}
                onClick={() => handleSelectOption(idx)}
                className={`w-full p-3.5 rounded-xl border text-left text-xs font-medium transition flex items-center justify-between ${
                  isSelected 
                    ? 'bg-accentGold/10 border-accentGold text-accentGold' 
                    : 'bg-cardBg border-borderDark text-textPrimary hover:border-borderDark/80'
                }`}
              >
                <span>{opt}</span>
                {isSelected && <CheckCircle2 size={16} className="text-accentGold" />}
              </button>
            );
          })}
        </div>
      </main>

      {/* Footer Navigation */}
      <footer className="p-4 bg-cardBg border-t border-borderDark flex items-center justify-between z-50">
        <button 
          disabled={currentQuestion === 0}
          onClick={() => setCurrentQuestion((prev) => prev - 1)}
          className="px-4 py-2 bg-background border border-borderDark text-textSecondary disabled:opacity-40 text-xs font-semibold rounded-xl flex items-center gap-1"
        >
          <ChevronLeft size={16} /> Prev
        </button>

        <button 
          disabled={currentQuestion === questions.length - 1}
          onClick={() => setCurrentQuestion((prev) => prev + 1)}
          className="px-4 py-2 bg-accentGold text-background font-bold text-xs rounded-xl flex items-center gap-1"
        >
          Next <ChevronRight size={16} />
        </button>
      </footer>

    </div>
  );
        }
        
