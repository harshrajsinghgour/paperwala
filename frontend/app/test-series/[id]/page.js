'use client';
import { useState } from 'react';

export default function TestEnginePage() {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const totalQuestions = 20;

  return (
    <main className="bg-royal-blue min-h-screen text-white flex flex-col h-screen overflow-hidden">
      
      {/* 1. DISTRACTION-FREE HEADER */}
      <header className="bg-card-blue border-b border-royal-gold/30 px-6 py-3 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-royal-gold">SSC CGL - Full Mock Test 01</h1>
          <p className="text-xs text-gray-300">Section: General Awareness</p>
        </div>
        
        {/* Timer Box */}
        <div className="bg-royal-blue border border-royal-gold px-4 py-1.5 rounded-lg flex items-center gap-2">
          <span className="text-xs text-gray-400">Time Left:</span>
          <span className="text-lg font-mono font-bold text-royal-gold">59:45</span>
        </div>

        {/* Submit Test Button */}
        <button className="bg-red-600 hover:bg-red-700 text-white font-bold px-5 py-2 rounded-lg transition-colors">
          Submit Test
        </button>
      </header>

      {/* 2. MAIN TEST CONTENT */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Side: Question Panel (75% Width) */}
        <section className="flex-1 p-6 flex flex-col justify-between overflow-y-auto border-r border-royal-gold/20">
          <div>
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-700">
              <span className="font-bold text-lg text-royal-gold">Question {currentQuestion}</span>
              <span className="text-xs text-green-400 bg-green-950/60 border border-green-800 px-2.5 py-1 rounded">
                +2.0 Marks | -0.5 Negative
              </span>
            </div>

            <p className="text-lg text-gray-100 mb-6 leading-relaxed">
              निम्नलिखित में से किस राज्य में हाल ही में नए राष्ट्रीय उद्यान की घोषणा की गई है?
            </p>

            {/* Options */}
            <div className="space-y-3">
              {['राजस्थान (Rajasthan)', 'मध्य प्रदेश (Madhya Pradesh)', 'उत्तर प्रदेश (Uttar Pradesh)', 'गुजरात (Gujarat)'].map((option, idx) => (
                <label 
                  key={idx} 
                  className="flex items-center gap-3 bg-card-blue/50 hover:bg-card-blue border border-royal-gold/30 p-4 rounded-xl cursor-pointer transition-all"
                >
                  <input type="radio" name="option" className="w-4 h-4 accent-[#D4AF37]" />
                  <span className="text-gray-200">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center pt-4 border-t border-gray-700 mt-6">
            <button className="bg-yellow-600/20 text-yellow-400 border border-yellow-600/50 hover:bg-yellow-600/30 px-4 py-2 rounded-lg font-semibold text-sm">
              Mark for Review
            </button>
            
            <div className="flex gap-3">
              <button 
                disabled={currentQuestion === 1}
                onClick={() => setCurrentQuestion(prev => Math.max(1, prev - 1))}
                className="bg-card-blue hover:bg-btn-blue text-white px-5 py-2 rounded-lg font-bold disabled:opacity-40"
              >
                Previous
              </button>
              <button 
                onClick={() => setCurrentQuestion(prev => Math.min(totalQuestions, prev + 1))}
                className="bg-royal-gold text-royal-blue hover:bg-yellow-400 font-bold px-6 py-2 rounded-lg"
              >
                Save & Next
              </button>
            </div>
          </div>
        </section>

        {/* Right Side: Question Palette (25% Width) */}
        <aside className="w-80 bg-card-blue/40 p-5 flex flex-col justify-between hidden md:flex">
          <div>
            <h3 className="font-bold text-royal-gold mb-3 border-b border-royal-gold/20 pb-2">Question Palette</h3>
            
            <div className="grid grid-cols-2 gap-2 text-xs mb-4 text-gray-300">
              <div className="flex items-center gap-1.5"><span className="w-3 h-3 bg-green-500 rounded-full"></span> Answered</div>
              <div className="flex items-center gap-1.5"><span className="w-3 h-3 bg-yellow-500 rounded-full"></span> Review</div>
              <div className="flex items-center gap-1.5"><span className="w-3 h-3 bg-gray-600 rounded-full"></span> Not Visited</div>
            </div>

            <div className="grid grid-cols-5 gap-2 max-h-[350px] overflow-y-auto p-1">
              {Array.from({ length: totalQuestions }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  onClick={() => setCurrentQuestion(num)}
                  className={`h-10 rounded-lg font-bold text-sm flex items-center justify-center transition-all ${
                    currentQuestion === num 
                      ? 'ring-2 ring-royal-gold bg-btn-blue text-white' 
                      : 'bg-royal-blue text-gray-300 hover:border hover:border-royal-gold/50'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
        </aside>

      </div>
    </main>
  );
                    }
                    
