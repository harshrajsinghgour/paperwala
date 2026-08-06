import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-card-blue border-b border-royal-gold/40 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo Branding */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-royal-gold flex items-center justify-center font-bold text-royal-blue text-xl">
            P
          </div>
          <h1 className="text-2xl font-black text-royal-gold tracking-wider">TEST PLATFORM</h1>
        </div>

        {/* Links */}
        <div className="hidden md:flex gap-8 font-semibold text-gray-200">
          <Link href="/" className="hover:text-royal-gold transition-colors">Home</Link>
          <Link href="/test-series" className="hover:text-royal-gold transition-colors">Test Series</Link>
          <Link href="/chat" className="hover:text-royal-gold transition-colors">Group Chat</Link>
          <Link href="/profile" className="hover:text-royal-gold transition-colors">Profile</Link>
        </div>

        {/* Action Button */}
        <button className="bg-royal-gold text-royal-blue px-5 py-2 rounded-lg font-bold hover:bg-yellow-400 transition-all shadow-md">
          Login / Signup
        </button>
      </div>
    </nav>
  );
}
