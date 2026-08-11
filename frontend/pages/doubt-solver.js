import React, { useState } from 'react';
import { Bot, Send, User, Sparkles } from 'lucide-react';

export default function AIDoubtSolver() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Namaste! Ask me any question related to SSC, Railway, or State Exams.' }
  ]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMsg = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    // AI Response simulation
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: 'ai', text: `Detailed solution for your query regarding "${input}": Step-by-step analytical breakdown attached.` }
      ]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background text-textPrimary max-w-md mx-auto flex flex-col justify-between border-x border-borderDark">
      
      {/* Header */}
      <header className="p-4 bg-cardBg border-b border-borderDark sticky top-0 z-50 flex items-center gap-2">
        <div className="p-2 bg-accentGold/10 rounded-lg text-accentGold">
          <Sparkles size={18} />
        </div>
        <div>
          <h1 className="text-sm font-bold">PaperWala AI Doubt Assistant</h1>
          <p className="text-[10px] text-textSecondary">Instant Math & Reasoning Solutions</p>
        </div>
      </header>

      {/* Chat Messages */}
      <main className="p-4 flex-1 space-y-3 overflow-y-auto">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.sender === 'ai' && (
              <div className="w-7 h-7 rounded-full bg-accentGold/20 border border-accentGold/40 text-accentGold flex items-center justify-center shrink-0">
                <Bot size={14} />
              </div>
            )}
            <div className={`p-3 rounded-2xl max-w-[80%] text-xs leading-relaxed ${
              msg.sender === 'user' 
                ? 'bg-accentGold text-background font-medium rounded-tr-none' 
                : 'bg-cardBg border border-borderDark text-textPrimary rounded-tl-none'
            }`}>
              {msg.text}
            </div>
            {msg.sender === 'user' && (
              <div className="w-7 h-7 rounded-full bg-borderDark text-textSecondary flex items-center justify-center shrink-0">
                <User size={14} />
              </div>
            )}
          </div>
        ))}
      </main>

      {/* Input Box */}
      <div className="p-3 bg-cardBg border-t border-borderDark flex items-center gap-2 sticky bottom-0">
        <input 
          type="text" 
          placeholder="Type your question or formula..." 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="flex-1 bg-background border border-borderDark rounded-xl px-3.5 py-2 text-xs text-textPrimary focus:outline-none focus:border-accentGold"
        />
        <button onClick={handleSend} className="p-2 bg-accentGold text-background rounded-xl font-bold hover:bg-accentGoldDark transition">
          <Send size={16} />
        </button>
      </div>

    </div>
  );
            }
