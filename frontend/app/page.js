import Navbar from '../components/Navbar';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="bg-royal-blue min-h-screen text-white flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="text-center py-16 px-4 bg-gradient-to-b from-royal-blue to-card-blue border-b border-royal-gold/20">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-royal-gold flex items-center justify-center text-royal-blue text-3xl font-black shadow-xl">
          P
        </div>
        <h1 className="text-4xl md:text-5xl font-black mb-3 text-royal-gold tracking-wide">
          TEST PLATFORM
        </h1>
        <p className="text-xl font-bold mb-2 text-gray-100">
          India Ka Preferred Mock Test & Prep Destination
        </p>
        <p className="text-gray-300 text-sm md:text-base max-w-xl mx-auto mb-8">
          SSC, Railways, Banking aur Sarkari Exams ki taiyari karein Royal Style me.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link 
            href="/test-series/1" 
            className="bg-royal-gold text-royal-blue px-8 py-3.5 rounded-xl font-bold text-lg hover:bg-yellow-400 transition-all shadow-lg"
          >
            Start Free Test 🚀
          </Link>
          <Link 
            href="/chat" 
            className="bg-btn-blue text-white px-8 py-3.5 rounded-xl font-bold text-lg hover:bg-blue-600 transition-all shadow-lg"
          >
            Join Group Chat 💬
          </Link>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-6 flex-1 w-full">
        {/* Test Series Card */}
        <Link 
          href="/test-series/1" 
          className="bg-card-blue/60 p-6 rounded-2xl border border-royal-gold/30 hover:border-royal-gold transition-all shadow-lg flex flex-col justify-between"
        >
          <div>
            <div className="text-4xl mb-3">📝</div>
            <h3 className="text-2xl font-bold mb-2 text-royal-gold">Test Series</h3>
            <p className="text-gray-300 text-sm">
              Distraction-Free Test Engine, Daily Quizzes, Full Mock Tests & Previous Year Papers.
            </p>
          </div>
          <span className="mt-6 text-sm font-bold text-btn-blue flex items-center gap-1">
            Explore Tests →
          </span>
        </Link>

        {/* Group Chat Card */}
        <Link 
          href="/chat" 
          className="bg-card-blue/60 p-6 rounded-2xl border border-royal-gold/30 hover:border-royal-gold transition-all shadow-lg flex flex-col justify-between"
        >
          <div>
            <div className="text-4xl mb-3">💬</div>
            <h3 className="text-2xl font-bold mb-2 text-royal-gold">Group Chat</h3>
            <p className="text-gray-300 text-sm">
              Sath me padho, doubts poocho aur toppers ke sath discussion karo.
            </p>
          </div>
          <span className="mt-6 text-sm font-bold text-btn-blue flex items-center gap-1">
            Open Chat Room →
          </span>
        </Link>

        {/* Profile & Analytics Card */}
        <Link 
          href="/profile" 
          className="bg-card-blue/60 p-6 rounded-2xl border border-royal-gold/30 hover:border-royal-gold transition-all shadow-lg flex flex-col justify-between"
        >
          <div>
            <div className="text-4xl mb-3">👑</div>
            <h3 className="text-2xl font-bold mb-2 text-royal-gold">User Profile</h3>
            <p className="text-gray-300 text-sm">
              Apni accuracy, ranks aur performance graphs check karo.
            </p>
          </div>
          <span className="mt-6 text-sm font-bold text-btn-blue flex items-center gap-1">
            View Profile →
          </span>
        </Link>
      </section>
    </main>
  );
}
