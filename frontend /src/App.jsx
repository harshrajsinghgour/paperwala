import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Trophy, ShieldCheck, Search, Bell, User, Flame, 
  CheckCircle, FileText, MessageSquare, Award, Star, Clock, 
  HelpCircle, ChevronRight, Download, Eye, Sparkles, Filter, 
  Send, Lock, PlayCircle, Layers, Globe, MapPin, Zap, RefreshCw, X, Check
} from 'lucide-react';

export default function App() {
  // Navigation & Screen Flow States
  const [currentScreen, setCurrentScreen] = useState('splash'); // splash, auth, app, cbt, result, noteReader
  const [activeTab, setActiveTab] = useState('testSeries'); // testSeries, info, currentAffairs, groupChat, notes
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  
  // Feature Modals & Filters
  const [selectedState, setSelectedState] = useState('All');
  const [caPeriod, setCaPeriod] = useState('Daily');
  const [activeNote, setActiveNote] = useState(null);
  const [activeTest, setActiveTest] = useState(null);
  const [cbtQuestionIndex, setCbtQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [markedForReview, setMarkedForReview] = useState({});
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'Admin (PaperWala)', text: '🔥 SSC CGL Tier 1 Answer Key out! Check Info section.', isAdmin: true, time: '10:30 AM' },
    { id: 2, sender: 'Rohan Sharma', text: 'Daily Current Affairs Quiz solution code anyone?', isAdmin: false, time: '10:32 AM' },
    { id: 3, sender: 'Priya Verma', text: 'Go to Notes > Polity chapter 4, explanation is given there.', isAdmin: false, time: '10:35 AM' }
  ]);
  const [newChatText, setNewChatText] = useState('');

  // Auto-transition from Splash Screen after 2.5 seconds
  useEffect(() => {
    if (currentScreen === 'splash') {
      const timer = setTimeout(() => {
        if (!isLoggedIn) {
          setCurrentScreen('auth');
        } else {
          setCurrentScreen('app');
        }
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [currentScreen, isLoggedIn]);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setCurrentScreen('app');
  };

  const startCbtTest = (test) => {
    setActiveTest(test);
    setCbtQuestionIndex(0);
    setSelectedAnswers({});
    setMarkedForReview({});
    setCurrentScreen('cbt');
  };

  const submitCbtTest = () => {
    setCurrentScreen('result');
  };

  // ----------------------------------------------------
  // SCREEN 1: SPLASH SCREEN (Royal Blue & Gold Animation)
  // ----------------------------------------------------
  if (currentScreen === 'splash') {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/40 via-slate-950 to-amber-950/20"></div>
        <div className="relative z-10 flex flex-col items-center text-center p-6 animate-fade-in">
          <div className="w-28 h-28 rounded-2xl bg-gradient-to-tr from-amber-600 via-amber-400 to-amber-200 p-1 shadow-2xl shadow-amber-500/20 mb-6">
            <div className="w-full h-full bg-slate-900 rounded-xl flex flex-col items-center justify-center border border-amber-300/30">
              <Trophy className="w-10 h-10 text-amber-400 mb-1" />
              <BookOpen className="w-6 h-6 text-blue-400" />
            </div>
          </div>
          <h1 className="text-4xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 mb-2">
            PaperWala
          </h1>
          <p className="text-amber-200/70 text-sm tracking-widest uppercase font-semibold">
            Royal Way To Success
          </p>
          <div className="mt-12 flex items-center space-x-2">
            <div className="w-2.5 h-2.5 bg-amber-500 rounded-full animate-bounce"></div>
            <div className="w-2.5 h-2.5 bg-amber-400 rounded-full animate-bounce delay-100"></div>
            <div className="w-2.5 h-2.5 bg-amber-300 rounded-full animate-bounce delay-200"></div>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // SCREEN 2: AUTHENTICATION (Login / Sign Up)
  // ----------------------------------------------------
  if (currentScreen === 'auth') {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center px-4 py-8 relative">
        <div className="w-full max-w-md bg-slate-900 border border-amber-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-blue-950/50">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-amber-500/10 border border-amber-500/40 mb-3">
              <BookOpen className="w-8 h-8 text-amber-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">PaperWala Portal</h2>
            <p className="text-slate-400 text-sm mt-1">Sign in to access Test Series & Study Notes</p>
          </div>

          <div className="flex bg-slate-950 rounded-lg p-1 border border-slate-800 mb-6">
            <button 
              onClick={() => setAuthMode('login')} 
              className={`flex-1 py-2 text-sm font-semibold rounded-md transition ${authMode === 'login' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'}`}
            >
              Login
            </button>
            <button 
              onClick={() => setAuthMode('signup')} 
              className={`flex-1 py-2 text-sm font-semibold rounded-md transition ${authMode === 'signup' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'}`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {authMode === 'signup' && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
                <input type="text" required placeholder="Enter full name" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-slate-200 text-sm focus:border-amber-500 outline-none" />
              </div>
            )}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Mobile / Email Address</label>
              <input type="text" required placeholder="Enter Mobile No. or Email" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-slate-200 text-sm focus:border-amber-500 outline-none" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Password / OTP</label>
              <input type="password" required placeholder="••••••••" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-slate-200 text-sm focus:border-amber-500 outline-none" />
            </div>
            
            <button type="submit" className="w-full bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 text-slate-950 font-bold py-3 rounded-lg shadow-lg shadow-amber-500/20 hover:opacity-95 transition">
              {authMode === 'login' ? 'Login to Dashboard' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-slate-500">
            By continuing, you agree to PaperWala's Terms & Conditions.
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // SCREEN 3: CBT TEST ENGINE (Real CBT Interface)
  // ----------------------------------------------------
  if (currentScreen === 'cbt') {
    const mockQuestions = [
      { id: 1, q: "Which Article of the Indian Constitution deals with the Election Commission?", options: ["Article 324", "Article 315", "Article 356", "Article 370"] },
      { id: 2, q: "What is the unit of measure for electrical resistance?", options: ["Watt", "Ohm", "Ampere", "Joule"] },
      { id: 3, q: "Who was appointed as the Chief Justice of India in recent developments?", options: ["Option A", "Option B", "Option C", "Option D"] }
    ];
    const currentQ = mockQuestions[cbtQuestionIndex];

    return (
      <div className="min-h-screen bg-slate-950 flex flex-col">
        {/* CBT Top Header */}
        <header className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <BookOpen className="w-6 h-6 text-amber-400" />
            <span className="font-bold text-slate-100 text-sm sm:text-base">{activeTest?.title || "Mock Test Engine"}</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1.5 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full text-amber-400 text-sm font-semibold">
              <Clock className="w-4 h-4" />
              <span>59:45</span>
            </div>
            <button onClick={submitCbtTest} className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-1.5 rounded-lg text-sm">
              Submit Test
            </button>
          </div>
        </header>

        {/* CBT Body */}
        <div className="flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto p-4 gap-4">
          {/* Question Box */}
          <div className="flex-1 bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center pb-3 border-b border-slate-800 mb-4">
                <span className="text-xs font-semibold text-amber-400">Question {cbtQuestionIndex + 1} of {mockQuestions.length}</span>
                <span className="text-xs text-slate-400">Marks: +2 / -0.5</span>
              </div>
              <h3 className="text-base sm:text-lg font-medium text-slate-100 mb-6">{currentQ.q}</h3>

              <div className="space-y-3">
                {currentQ.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedAnswers({ ...selectedAnswers, [cbtQuestionIndex]: idx })}
                    className={`w-full text-left p-3.5 rounded-lg border text-sm flex items-center justify-between transition ${
                      selectedAnswers[cbtQuestionIndex] === idx
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span>{opt}</span>
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${selectedAnswers[cbtQuestionIndex] === idx ? 'border-amber-400 bg-amber-500' : 'border-slate-600'}`}>
                      {selectedAnswers[cbtQuestionIndex] === idx && <Check className="w-3 h-3 text-slate-950" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* CBT Controls */}
            <div className="flex flex-wrap gap-2 pt-6 border-t border-slate-800 mt-6">
              <button 
                onClick={() => setMarkedForReview({ ...markedForReview, [cbtQuestionIndex]: !markedForReview[cbtQuestionIndex] })}
                className="px-4 py-2 bg-purple-950/60 border border-purple-500/40 text-purple-300 text-xs font-semibold rounded-lg"
              >
                Mark for Review
              </button>
              <button 
                onClick={() => {
                  const updated = { ...selectedAnswers };
                  delete updated[cbtQuestionIndex];
                  setSelectedAnswers(updated);
                }}
                className="px-4 py-2 bg-slate-800 text-slate-300 text-xs font-semibold rounded-lg"
              >
                Clear Response
              </button>
              <div className="flex-1"></div>
              <button 
                disabled={cbtQuestionIndex === 0}
                onClick={() => setCbtQuestionIndex(prev => prev - 1)}
                className="px-4 py-2 bg-slate-800 disabled:opacity-40 text-slate-200 text-xs font-semibold rounded-lg"
              >
                Previous
              </button>
              <button 
                onClick={() => setCbtQuestionIndex(prev => Math.min(prev + 1, mockQuestions.length - 1))}
                className="px-5 py-2 bg-amber-500 text-slate-950 font-bold text-xs rounded-lg"
              >
                Save & Next
              </button>
            </div>
          </div>

          {/* Question Palette Sidebar */}
          <div className="w-full md:w-72 bg-slate-900 border border-slate-800 rounded-xl p-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Question Palette</h4>
            <div className="grid grid-cols-5 gap-2 mb-6">
              {mockQuestions.map((_, idx) => {
                const isAns = selectedAnswers[idx] !== undefined;
                const isReview = markedForReview[idx];
                let btnStyle = "bg-slate-950 text-slate-400 border-slate-800";
                if (isAns) btnStyle = "bg-emerald-600 text-white border-emerald-500";
                if (isReview) btnStyle = "bg-purple-600 text-white border-purple-500";

                return (
                  <button
                    key={idx}
                    onClick={() => setCbtQuestionIndex(idx)}
                    className={`h-9 w-9 rounded-lg border text-xs font-bold flex items-center justify-center ${btnStyle} ${cbtQuestionIndex === idx ? 'ring-2 ring-amber-400' : ''}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-center space-x-2"><div className="w-3 h-3 bg-emerald-600 rounded"></div><span>Answered</span></div>
              <div className="flex items-center space-x-2"><div className="w-3 h-3 bg-purple-600 rounded"></div><span>Marked for Review</span></div>
              <div className="flex items-center space-x-2"><div className="w-3 h-3 bg-slate-950 border border-slate-700 rounded"></div><span>Not Answered</span></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // SCREEN 4: CBT RESULT & AI ANALYSIS
  // ----------------------------------------------------
  if (currentScreen === 'result') {
    return (
      <div className="min-h-screen bg-slate-950 p-4 sm:p-6 flex flex-col items-center justify-center">
        <div className="max-w-2xl w-full bg-slate-900 border border-amber-500/30 rounded-2xl p-6 shadow-2xl">
          <div className="text-center pb-6 border-b border-slate-800">
            <Trophy className="w-12 h-12 text-amber-400 mx-auto mb-2" />
            <h2 className="text-2xl font-bold text-slate-100">Test Submitted Successfully!</h2>
            <p className="text-xs text-amber-400 mt-1">AI-Powered Performance Breakdown</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
              <span className="text-xs text-slate-400">Score</span>
              <p className="text-xl font-black text-amber-400">42 / 50</p>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
              <span className="text-xs text-slate-400">Accuracy</span>
              <p className="text-xl font-black text-emerald-400">84%</p>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
              <span className="text-xs text-slate-400">All India Rank</span>
              <p className="text-xl font-black text-blue-400">#142</p>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
              <span className="text-xs text-slate-400">Time Taken</span>
              <p className="text-xl font-black text-purple-400">22m 10s</p>
            </div>
          </div>

          {/* AI Suggestion Box */}
          <div className="bg-gradient-to-r from-blue-950/60 to-slate-950 p-4 rounded-xl border border-blue-500/30 mb-6">
            <div className="flex items-center space-x-2 text-blue-400 mb-1">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">AI PaperWala Insights</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Great performance in General Awareness! You lost marks in 2 Speed Math questions. We recommend revising **Quantitative Aptitude Chapter 3** from the Notes section.
            </p>
          </div>

          <button onClick={() => setCurrentScreen('app')} className="w-full bg-amber-500 text-slate-950 font-bold py-3 rounded-xl">
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // MAIN APP NAVIGATION (Test Series | Info | CA | Chat | Notes)
  // ----------------------------------------------------
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Main Navigation Header */}
      <header className="bg-slate-900 border-b border-amber-500/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 p-0.5 shadow-lg shadow-amber-500/20">
              <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                <Trophy className="w-5 h-5 text-amber-400" />
              </div>
            </div>
            <div>
              <h1 className="text-lg font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-400">
                PaperWala
              </h1>
              <span className="text-[10px] text-amber-300/60 font-semibold uppercase tracking-wider block -mt-1">
                Premier Prep
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="hidden sm:flex items-center bg-slate-950 border border-slate-800 rounded-full px-3 py-1.5 w-64">
              <Search className="w-4 h-4 text-slate-400 mr-2" />
              <input type="text" placeholder="Search tests, notes, jobs..." className="bg-transparent text-xs outline-none w-full text-slate-200" />
            </div>
            <button className="p-2 bg-slate-950 rounded-lg border border-slate-800 text-slate-300 hover:text-amber-400">
              <Bell className="w-4 h-4" />
            </button>
            <div className="flex items-center space-x-2 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold text-amber-300">PRO Member</span>
            </div>
          </div>
        </div>

        {/* Primary Tabs */}
        <div className="max-w-7xl mx-auto px-4 flex overflow-x-auto space-x-1 no-scrollbar border-t border-slate-800/80">
          {[
            { id: 'testSeries', label: 'Test Series', icon: BookOpen },
            { id: 'info', label: 'Paper Wala Info', icon: FileText },
            { id: 'currentAffairs', label: 'Current Affairs', icon: Globe },
            { id: 'groupChat', label: 'Group Chat', icon: MessageSquare 
