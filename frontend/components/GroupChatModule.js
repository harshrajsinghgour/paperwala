import React, { useState } from 'react';
import { Send, Shield, Trash2, Ban } from 'lucide-react';

export default function GroupChatModule({ user }) {
  const [messages, setMessages] = useState([
    { id: 1, username: "Rahul_99", text: "Maths Q2 का फॉर्मूला क्या होगा?", is_pinned: false },
    { id: 2, username: "Admin_Official", text: "📢 लाइव टेस्ट शाम 7 बजे शुरू होगा!", is_pinned: true }
  ]);
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (!inputText) return;
    setMessages([...messages, { id: Date.now(), username: user?.username || 'Student', text: inputText }]);
    setInputText('');
  };

  return (
    <div className="bg-royal-card border border-royal-gold/30 rounded-xl h-[450px] flex flex-col">
      {/* Header */}
      <div className="p-3 border-b border-royal-gold/30 flex justify-between items-center bg-royal-dark/60">
        <h3 className="text-xs font-bold text-royal-gold flex items-center gap-2">
          💬 PaperWala Doubts Group Chat
        </h3>
        <span className="text-[10px] text-gray-400">24 घंटे में ऑटो-क्लियर</span>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 p-3 overflow-y-auto space-y-3">
        {messages.map((msg) => (
          <div key={msg.id} className={`p-2.5 rounded-lg text-xs ${msg.is_pinned ? 'bg-royal-gold/20 border border-royal-gold' : 'bg-royal-dark/70 border border-royal-gold/10'}`}>
            <div className="flex justify-between items-center mb-1">
              <span className="font-bold text-royal-lightGold">{msg.username}</span>
              {user?.role === 'admin' && (
                <div className="flex gap-2 text-red-400">
                  <Trash2 className="w-3.3 h-3.3 cursor-pointer" />
                  <Ban className="w-3.3 h-3.3 cursor-pointer" />
                </div>
              )}
            </div>
            <p className="text-gray-200">{msg.text}</p>
          </div>
        ))}
      </div>

      {/* Chat Input */}
      <div className="p-2 border-t border-royal-gold/30 flex gap-2 bg-royal-dark">
        <input 
          type="text" 
          placeholder="अपना सवाल लिखें..." 
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="flex-1 bg-royal-card border border-royal-gold/30 rounded-lg px-3 text-xs text-white focus:outline-none focus:border-royal-gold"
        />
        <button onClick={handleSend} className="bg-royal-gold text-royal-dark p-2 rounded-lg font-bold">
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
