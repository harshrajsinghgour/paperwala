import React from 'react';
import { Crown, CheckCircle2, X, Zap } from 'lucide-react';

export default function ProPlanModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-cardBg border border-accentGold/40 w-full max-w-sm rounded-2xl p-5 relative shadow-2xl space-y-4 animate-in fade-in zoom-in duration-200">
        
        {/* Close Button */}
        <button onClick={onClose} className="absolute right-4 top-4 text-textSecondary hover:text-textPrimary">
          <X size={18} />
        </button>

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 mx-auto rounded-full bg-accentGold/20 border border-accentGold flex items-center justify-center text-accentGold">
            <Crown size={24} />
          </div>
          <h2 className="text-lg font-bold text-textPrimary">Upgrade to PaperWala PRO</h2>
          <p className="text-xs text-textSecondary">Get Unlimited Access to All Exam Series & Notes</p>
        </div>

        {/* Features List */}
        <div className="space-y-2 py-2">
          {[
            '500+ Full-Length CBT Mock Tests',
            'AI Analytical Performance Scorecard',
            'Ad-Free Reading Experience',
            'Downloadable Offline PDF Notes'
          ].map((feature, idx) => (
            <div key={idx} className="flex items-center gap-2.5 text-xs text-textPrimary">
              <CheckCircle2 size={16} className="text-accentGold shrink-0" />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        {/* Pricing & CTA */}
        <div className="pt-2 border-t border-borderDark space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-textSecondary">Special Aspirant Pass</span>
            <span className="text-lg font-black text-accentGold">₹199 / year</span>
          </div>
          <button className="w-full py-2.5 bg-accentGold hover:bg-accentGoldDark text-background font-bold text-xs rounded-xl shadow-lg transition flex items-center justify-center gap-1.5">
            <Zap size={16} /> Unlock PRO Pass Now
          </button>
        </div>

      </div>
    </div>
  );
                }
