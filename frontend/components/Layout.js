import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Home, Briefcase, HelpCircle, Trophy, User } from 'lucide-react';

export default function Layout({ children }) {
  const router = useRouter();

  // Hide bottom navigation on test engine and onboarding pages
  const isFullscreenPage = router.pathname.startsWith('/test') || router.pathname === '/onboarding';

  const navItems = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Jobs', path: '/jobs', icon: Briefcase },
    { label: 'AI Doubt', path: '/doubt-solver', icon: HelpCircle },
    { label: 'Rank', path: '/leaderboard', icon: Trophy },
    { label: 'Profile', path: '/profile', icon: User },
  ];

  return (
    <div className="min-h-screen bg-background text-textPrimary flex flex-col justify-between">
      <main className="flex-1">{children}</main>

      {!isFullscreenPage && (
        <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-cardBg border-t border-borderDark z-50 flex justify-around items-center py-2">
          {navItems.map((item) => {
            const isActive = router.pathname === item.path;
            return (
              <Link key={item.path} href={item.path} className="flex flex-col items-center gap-1">
                <item.icon
                  size={20}
                  className={isActive ? 'text-accentGold' : 'text-textSecondary'}
                />
                <span
                  className={`text-[10px] font-semibold ${
                    isActive ? 'text-accentGold' : 'text-textSecondary'
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
      )}
    </div>
  );
}
