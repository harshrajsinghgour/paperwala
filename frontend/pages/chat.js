import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, Users, Shield } from 'lucide-react';
import Navbar from '../components/Navbar';

export default function ChatPage() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, user: 'Admin', role: 'Official', text: 'Welcome to PaperWala Community! Maintain decorum.', time: '10:00 AM', isUser: false },
    { id: 2, user: 'Rohan', role: 'Student', text: 'SSC CGL Tier-1 admit card link released for North Region.', time: '10:05 AM', isUser: false },
    { id: 3, user: 'You', role: 'Student', text: 'Yeh wala Distraction-Free engine kafi badiya hai, isme time waste nahi hota.', time: 'Just now', isUser: true },
  ]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e) => {
    e?.preventDefault();
    if (!input.trim()) return;
    setMessages((prev) => [
     ...prev,
      { id: Date.now(), user: 'You', role: 'Student', text: input, time: 'Just now', isUser: true }
    ]);
    setInput('');
  };

  return (
    <main className="bg-background min-h-screen text-textPrimary flex-col h-screen overflow-hidden">
      <Navbar />

      {/* Chat Container */}
      <div className="flex-1 max-w-5xl w-full mx-auto p-2 md:p-4 flex flex-col my-2 h-[calc(100vh-80px)]">

        {/* Header - Merged */}
        <div className="bg-cardBg border border-borderDark p-4 rounded-t-2xl flex justify-between items-center shadow-md sticky top-0 z-50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-accentGold/10 text-accentGold rounded-lg">
              <Users size={18} />
            </div>
            <div>
              <h2 className="text-sm md:text-lg font-bold text-textPrimary">SSC & Railway Aspirant Discussion</h2>
              <p className="text-[10px] md:text-xs text-emerald-400 font-medium">● 1,240 Online Members</p>
            </div>
          </div>
        </div>

        {/* Messages Feed */}
        <div className="flex-1 bg-background/50 border-x border-borderDark p-3 md:p-4 overflow-y-auto space-y-3">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex flex-col ${msg.isUser? 'items-end' : 'items-start'}`}>

              {/* Sender Name + Role */}
              <span className="text-[10px] md:text-xs text-textSecondary mb-1 px-1 font-bold flex items-center gap-1">
                {msg.user}
                {msg.role === 'Official' && <Shield size={12} className="text-emerald-400" />}
              </span>

              {/* Message Bubble */}
              <div className={`max-w-[85%] md:max-w-md p-3 rounded-2xl text-xs md:text-sm leading-relaxed border ${
                msg.isUser
                 ? 'bg-accentGold text-background border-accentGold/40 rounded-br-none'
                  : 'bg-cardBg text-textPrimary border-borderDark rounded-bl-none'
              }`}>
                <p>{msg.text}</p>
                <span className={`block text-right text-[9px] md:text-[10px] mt-1 ${msg.isUser? 'text-background/70' : 'text-textSecondary'}`}>
                  {msg.time}
                </span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input - Merged */}
        <form onSubmit={handleSend} className="bg-cardBg border-borderDark p-3 rounded-b-2xl flex gap-2 sticky bottom-0">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Share study update or ask query... / अपना संदेश या प्रश्न लिखें..."
            className="flex-1 bg-background border-borderDark rounded-xl px-3.5 md:px-4 py-2 text-xs md:text-sm text-textPrimary focus:outline-none focus:border-accentGold"
          />
          <button type="submit" className="p-2 md:px-6 bg-accentGold text-background rounded-xl font-bold hover:bg-yellow-400 transition">
            <Send size={16} className="md:hidden" />
            <span className="hidden md:inline">भेजें (Send)</span>
          </button>
        </form>
      </div>
    </main>
  );
    }
