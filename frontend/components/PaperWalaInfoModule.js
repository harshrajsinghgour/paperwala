import React from 'react';
import { Bell, FileText, CheckSquare } from 'lucide-react';

export default function PaperWalaInfoModule() {
  const infoItems = [
    { type: "Vacancy", title: "Rajasthan Police Constable Recruitment 2026", posts: "3500 Posts", date: "Last Date: 30 Aug 2026" },
    { type: "Admit Card", title: "SSC CGL Tier-1 Admit Card Released", posts: "All Regions", date: "Exam: Sep 2026" }
  ];

  return (
    <div className="space-y-3">
      <div className="bg-royal-gold/10 border border-royal-gold/30 rounded-lg p-3 text-xs text-royal-gold font-semibold animate-pulse">
        🔔 नई भर्तियाँ, एडमिट कार्ड और उत्तर कुंजी की ताज़ा अपडेट्स नीचे देखें।
      </div>

      {infoItems.map((item, idx) => (
        <div key={idx} className="bg-royal-card border border-royal-gold/20 rounded-lg p-4 hover:border-royal-gold transition">
          <div className="flex justify-between items-start">
            <span className="bg-royal-gold/20 text-royal-gold text-[10px] font-bold px-2 py-0.5 rounded border border-royal-gold/40">
              {item.type}
            </span>
            <span className="text-[10px] text-gray-400">{item.date}</span>
          </div>
          <h4 className="font-bold text-white text-sm mt-2">{item.title}</h4>
          <p className="text-xs text-gray-300 mt-1">कुल पद: {item.posts}</p>
          <button className="mt-3 text-xs text-royal-gold underline font-semibold">पूरा विवरण व लिंक देखें →</button>
        </div>
      ))}
    </div>
  );
                     }
