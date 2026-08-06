import Navbar from '../../components/Navbar';

export default function ProfilePage() {
  return (
    <main className="bg-royal-blue min-h-screen text-white flex flex-col">
      <Navbar />

      <div className="max-w-4xl w-full mx-auto p-6 my-6 space-y-6">
        {/* User Card */}
        <div className="bg-card-blue border border-royal-gold/40 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6 shadow-xl">
          <div className="w-24 h-24 rounded-full bg-royal-gold flex items-center justify-center text-royal-blue font-black text-4xl border-4 border-white/10">
            U
          </div>
          <div className="text-center md:text-left flex-1">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <h2 className="text-2xl font-bold text-white">Student User</h2>
              <span className="bg-royal-gold/20 text-royal-gold border border-royal-gold text-xs px-2.5 py-0.5 rounded-full font-bold">
                PRO MEMBER 👑
              </span>
            </div>
            <p className="text-gray-300 text-sm mt-1">Target Exam: SSC CGL 2026</p>
          </div>
        </div>

        {/* Performance Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-card-blue/50 border border-royal-gold/20 p-4 rounded-xl text-center">
            <span className="text-2xl font-bold text-royal-gold">12</span>
            <p className="text-xs text-gray-400 mt-1">Tests Attempted</p>
          </div>
          <div className="bg-card-blue/50 border border-royal-gold/20 p-4 rounded-xl text-center">
            <span className="text-2xl font-bold text-green-400">84%</span>
            <p className="text-xs text-gray-400 mt-1">Avg Accuracy</p>
          </div>
          <div className="bg-card-blue/50 border border-royal-gold/20 p-4 rounded-xl text-center">
            <span className="text-2xl font-bold text-btn-blue">142.5</span>
            <p className="text-xs text-gray-400 mt-1">Avg Score</p>
          </div>
          <div className="bg-card-blue/50 border border-royal-gold/20 p-4 rounded-xl text-center">
            <span className="text-2xl font-bold text-yellow-400">#48</span>
            <p className="text-xs text-gray-400 mt-1">Global Rank</p>
          </div>
        </div>
      </div>
    </main>
  );
}
