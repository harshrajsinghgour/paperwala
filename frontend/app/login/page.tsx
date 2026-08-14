'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function AuthPage() {
  // 'login' या 'signup' मोड स्विच करने के लिए
  const [isSignUp, setIsSignUp] = useState(false);

  // फॉर्म स्टेट्स
  const [phone, setPhone] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');

  // Google Login हैंडलर
  const handleGoogleAuth = () => {
    // यहाँ आप NextAuth.js / Firebase / Supabase Google Provider का लॉजिक जोड़ेंगे
    alert('Google Login Initiated');
  };

  // OTP भेजने का हैंडलर
  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 10) {
      alert('कृपया 10 अंकों का सही मोबाइल नंबर दर्ज करें!');
      return;
    }
    setOtpSent(true);
  };

  // Login / Signup Submit हैंडलर
  const handleVerifyAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 4) {
      alert('कृपया 4 अंकों का सही OTP दर्ज करें!');
      return;
    }
    alert(isSignUp ? 'Account Successfully Created!' : 'Successfully Logged In!');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-4 relative overflow-hidden">
      
      {/* बैकग्राउंड डेकोरेशन (Glow Effects) */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-sky-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-slate-900/90 border border-slate-800 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-2xl z-10">
        
        {/* ---- TOP SECTION: GOL LOGO & NAME ---- */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="relative mb-3 group">
            {/* Logo Outer Glow Ring */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 opacity-70 blur-md group-hover:opacity-100 transition" />
            
            {/* Circular Logo */}
            <div className="relative w-20 h-20 rounded-full bg-white p-1 border-2 border-sky-400 shadow-lg flex items-center justify-center overflow-hidden">
              <Image
                src="/logo.png"
                alt="Paper Wala Logo"
                width={70}
                height={70}
                className="object-contain p-1"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              {/* Fallback Icon if image missing */}
              <svg
                className="w-10 h-10 text-sky-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
              </svg>
            </div>
          </div>

          <h1 className="text-2xl font-black tracking-wider uppercase text-white">
            PAPER <span className="text-sky-400">WALA</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1 font-medium">
            {isSignUp ? 'नया अकाउंट बनाएँ' : 'अपने अकाउंट में लॉगिन करें'}
          </p>
        </div>

        {/* ---- LOGIN / SIGNUP TOGGLE TABS ---- */}
        <div className="grid grid-cols-2 gap-1 bg-slate-800/80 p-1 rounded-xl mb-6 text-sm font-semibold">
          <button
            type="button"
            onClick={() => {
              setIsSignUp(false);
              setOtpSent(false);
            }}
            className={`py-2 rounded-lg transition-all ${
              !isSignUp
                ? 'bg-sky-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Login (लॉगिन)
          </button>
          <button
            type="button"
            onClick={() => {
              setIsSignUp(true);
              setOtpSent(false);
            }}
            className={`py-2 rounded-lg transition-all ${
              isSignUp
                ? 'bg-sky-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Sign Up (साइन अप)
          </button>
        </div>

        {/* ---- GOOGLE AUTH BUTTON ---- */}
        <button
          type="button"
          onClick={handleGoogleAuth}
          className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-100 text-slate-800 font-semibold py-3 px-4 rounded-xl transition duration-200 shadow-md mb-5"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          Google (Gmail) से जारी रखें
        </button>

        {/* ---- DIVIDER ---- */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 h-[1px] bg-slate-800" />
          <span className="text-xs text-slate-500 font-medium">या Mobile से</span>
          <div className="flex-1 h-[1px] bg-slate-800" />
        </div>

        {/* ---- FORM SECTION ---- */}
        <form onSubmit={otpSent ? handleVerifyAndSubmit : handleSendOtp} className="space-y-4">
          
          {/* अगर SIGN UP चुन रखा है तो नाम व ईमेल फ़ील्ड भी दिखेंगी */}
          {isSignUp && !otpSent && (
            <>
              <div>
                <label className="block text-xs text-slate-300 font-medium mb-1">
                  पूरा नाम (Full Name)
                </label>
                <input
                  type="text"
                  required
                  placeholder="अपना नाम दर्ज करें"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-300 font-medium mb-1">
                  ईमेल आईडी (Optional Email)
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition"
                />
              </div>
            </>
          )}

          {/* PHONE NUMBER INPUT */}
          {!otpSent ? (
            <div>
              <label className="block text-xs text-slate-300 font-medium mb-1">
                मोबाइल नंबर (Mobile Number)
              </label>
              <div className="flex gap-2">
                <span className="bg-slate-800 border border-slate-700 text-slate-300 text-sm font-semibold rounded-xl px-3 flex items-center">
                  +91
                </span>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  placeholder="10 अंकों का नंबर"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition"
                />
              </div>
            </div>
          ) : (
            /* OTP INPUT FIELD */
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs text-sky-400 font-medium">
                  +91 {phone} पर भेजा गया OTP दर्ज करें
                </label>
                <button
                  type="button"
                  onClick={() => setOtpSent(false)}
                  className="text-xs text-slate-400 underline hover:text-white"
                >
                  नंबर बदलें
                </button>
              </div>
              <input
                type="text"
                required
                maxLength={6}
                placeholder="OTP कोड दर्ज करें"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full text-center tracking-widest text-lg font-bold bg-slate-800/80 border border-sky-500 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none transition"
              />
            </div>
          )}

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg transition duration-200 mt-2"
          >
            {otpSent
              ? isSignUp
                ? 'Sign Up & Verify OTP'
                : 'Login & Verify OTP'
              : 'Send OTP (ओटीपी भेजें)'}
          </button>
        </form>

        {/* FOOTER TERMS */}
        <p className="text-[10px] text-center text-slate-500 mt-6">
          जारी रखकर, आप Paper Wala की{' '}
          <Link href="/terms" className="text-sky-400 underline">
            सेवा शर्तों
          </Link>{' '}
          और{' '}
          <Link href="/privacy" className="text-sky-400 underline">
            गोपनीयता नीति
          </Link>{' '}
          से सहमत होते हैं।
        </p>

      </div>
    </div>
  );
        }
            
