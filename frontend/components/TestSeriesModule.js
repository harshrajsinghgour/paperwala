import React, { useState, useEffect } from 'react';
import { Timer, CheckCircle, Trophy, HelpCircle } from 'lucide-react';

export default function TestSeriesModule({ userId }) {
  const [activeSubTab, setActiveSubTab] = useState('daily_challenge');
  const [activeTest, setActiveTest] = useState(null);
  const [timer, setTimer] = useState(0);
  const [result, setResult] = useState(null);

  // Countdown Timer Logic
  useEffect(() => {
    let interval = null;
    if (activeTest && timer > 0) {
      interval = setInterval(() => setTimer(t => t - 1), 1000);
    } else if (timer === 0 && activeTest) {
      handleTestSubmit();
    }
    return () => clearInterval(interval);
  }, [activeTest, timer]);

  const startTest = (test) => {
    setActiveTest(test);
    setTimer(test.duration_minutes * 60);
  };

  const handleTestSubmit = () => {
    // Simulated Result Submit
    setResult({
      score: "18.5 / 20",
      accuracy: "92%",
      suggestions: "उत्कृष्ट! गणितीय सूत्रों पर पकड़ मजबूत है।"
    });
    setActiveTest(null);
  };

  return (
    <div className="space-y-4">
      {/* Test Sub-Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { id: 'daily_challenge', name: 'Daily Challenge' },
          { id: 'quiz', name: 'Quiz Practice' },
          { id: 'live_test', name: 'Live Tests' },
          { id: 'suggestional', name: 'Suggestional Tests' },
          { id: 'study_material', name: 'Study Material' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-xs font-bold border whitespace-nowrap transition ${
              activeSubTab === tab.id 
                ? 'bg-royal-gold text-royal-dark border-royal-gold' 
                : 'bg-royal-blue/40 text-gray-300 border-royal-gold/20 hover:border-royal-gold'
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Test Active View */}
      {activeTest ? (
        <div className="bg-royal-card border-2 border-royal-gold rounded-xl p-6">
          <div className="flex justify-between items-center mb-4 border-b border-royal-gold/30 pb-2">
            <h2 className="text-lg font-bold text-royal-gold">{activeTest.title}</h2>
            <div className="flex items-center gap-2 bg-royal-dark px-3 py-1 rounded border border-royal-gold text-royal-lightGold font-mono text-sm">
              <Timer className="w-4 h-4 animate-pulse" />
              {Math.floor(timer / 60)}:{('0' + (timer % 60)).slice(-2)}
            </div>
          </div>

          <div className="space-y-4 my-6">
            <p className="text-sm">Q1. यदि $\int x^2 dx = \frac{x^3}{3} + C$, तो $\frac{d}{dx}(\sin x)$ क्या होगा?</p>
            {['$\cos x$', '$-\cos x$', '$\tan x$', '$\sec x$'].map((opt, i) => (
              <label key={i} className="flex items-center gap-3 p-3 bg-royal-dark/60 rounded border border-royal-gold/20 hover:border-royal-gold cursor-pointer text-xs">
                <input type="radio" name="q1" className="accent-royal-gold" /> {opt}
              </label>
            ))}
          </div>

          <button onClick={handleTestSubmit} className="w-full bg-royal-gold text-royal-dark font-extrabold py-3 rounded-lg hover:bg-royal-lightGold transition">
            सबमिट करें (Submit Test)
          </button>
        </div>
      ) : (
        /* Test List */
        <div className="grid gap-3">
          <div className="bg-royal-card border border-royal-gold/30 rounded-lg p-4 flex justify-between items-center">
            <div>
              <h4 className="font-bold text-white text-sm">Rajasthan GK - Live Mock Test</h4>
              <p className="text-xs text-gray-400">15 प्रश्न • 15 मिनट • 30 अंक</p>
            </div>
            <button 
              onClick={() => startTest({ title: "Rajasthan GK Live Mock", duration_minutes: 15 })}
              className="bg-royal-gold text-royal-dark font-bold px-4 py-2 rounded text-xs hover:bg-royal-lightGold"
            >
              शुरू करें
            </button>
          </div>
        </div>
      )}

      {/* AI Result Card */}
      {result && (
        <div className="bg-royal-dark border border-royal-gold p-4 rounded-xl text-center space-y-2">
          <Trophy className="w-8 h-8 text-royal-gold mx-auto" />
          <h3 className="text-base font-bold text-royal-gold">टेस्ट परिणाम (AI Analysis)</h3>
          <p className="text-xs text-gray-300">स्कोर: <span className="font-bold text-white">{result.score}</span> | एक्यूरेसी: <span className="font-bold text-royal-lightGold">{result.accuracy}</span></p>
          <p className="text-xs text-royal-gold italic">{result.suggestions}</p>
        </div>
      )}
    </div>
  );
              }
              
