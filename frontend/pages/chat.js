import { useState } from 'react';
import Navbar from '../components/Navbar';

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Rohan (SSC Aspirant)', text: 'Bhai GS ke liye best mock test kaun sa hai?', isUser: false },
    { id: 2, sender: 'You', text: 'Yeh wala Distraction-Free engine kafi badiya hai, isme time waste nahi hota.', isUser: true },
  ]);
  const [inputText, setInputText] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    setMessages([...messages, { id: Date.now(), sender: 'You', text: inputText, isUser: true }]);
    setInputText('');
  };

  return (
    <main className="bg-royal-dark min-h-screen text-white flex flex-col h-screen overflow-hidden">
      <Navbar />

      <div className="flex-1 max-w-5xl w-full mx-auto p-4 flex flex-col my-2 h-[calc(100vh-80px)]">
        <div className="bg-royal-card border border-royal-gold/30 p-4 rounded-t-2xl flex justify-between items-center shadow-md">
          <div>
            <h2 className="text-lg font-bold text-royal-gold">SSC CGL 2026 Discussion Group</h2>
            <p className="text-xs text-green-400">● 142 Members Online</p>
          </div>
        </div>

        <div className="flex-1 bg-royal-dark/80 border-x border-royal-gold/20 p-4 overflow-y-auto space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex flex-col ${msg.isUser ? 'items-end' : 'items-start'}`}>
              <span className="text-xs text-gray-400 mb-1 px-1">{msg.sender}</span>
              <div className={`max-w-xs md:max-w-md p-3 rounded-2xl text-sm leading-relaxed ${
                msg.isUser 
                  ? 'bg-royal-blue text-white border border-royal-gold/40 rounded-br-none' 
                  : 'bg-royal-card text-gray-100 border border-royal-gold/20 rounded-bl-none'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSend} className="bg-royal-card border border-royal-gold/30 p-3 rounded-b-2xl flex gap-2">
          <input 
            type="text" 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="अपना संदेश या प्रश्न लिखें..."
            className="flex-1 bg-royal-dark border border-royal-gold/30 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-royal-gold"
          />
          <button type="submit" className="bg-royal-gold text-royal-dark px-6 py-2 rounded-xl font-bold text-sm hover:bg-yellow-400">
            भेजें (Send)
          </button>
        </form>
      </div>
    </main>
  );
    }
