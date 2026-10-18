import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Bell, Trophy, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AppHeader: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, unreadNotificationsCount } = useApp();

  const isNotificationsActive = location.pathname === '/notifications';
  const isRewardsActive = location.pathname === '/rewards';
  const isProfileActive = location.pathname === '/profile';

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#E7ECE8] px-4 py-2.5 transition-all">
      <div className="flex items-center justify-between max-w-full">
        {/* Left: Brand Icon + Wordmark */}
        <button
          onClick={() => navigate('/home')}
          className="flex items-center gap-2 group text-left focus:outline-none"
          title="PrajaPulse Home"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#155638] to-[#237A50] flex items-center justify-center text-white shadow-sm shadow-[#155638]/20 group-hover:scale-105 transition-transform">
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold text-[#19251E] tracking-tight leading-tight group-hover:text-[#155638] transition-colors">
              PrajaPulse
            </span>
            <span className="text-[10px] font-medium text-[#738078] leading-none hidden sm:block">
              {user.wardNumber}
            </span>
          </div>
        </button>

        {/* Right side: Notifications, Rewards Trophy, Avatar */}
        <div className="flex items-center gap-2">
          {/* Rewards Points Pill */}
          <button
            onClick={() => navigate('/rewards')}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-semibold transition-all border ${
              isRewardsActive
                ? 'bg-[#E4F5E9] text-[#155638] border-[#155638]/30 shadow-xs'
                : 'bg-[#F7F9F7] text-[#19251E] border-[#E7ECE8] hover:bg-[#E4F5E9] hover:border-[#155638]/20'
            }`}
            title="Your Civic Reward Points"
          >
            <Trophy className="w-3.5 h-3.5 text-[#F2A65A]" />
            <span className="tabular-nums font-bold text-[#155638]">{user.points}</span>
            <span className="text-[10px] text-[#738078] font-medium hidden xs:inline">pts</span>
          </button>

          {/* Notification Bell */}
          <button
            onClick={() => navigate('/notifications')}
            className={`relative p-2 rounded-full transition-colors ${
              isNotificationsActive
                ? 'bg-[#E4F5E9] text-[#155638]'
                : 'text-[#19251E] hover:bg-[#F7F9F7]'
            }`}
            title="Notifications"
            aria-label="View notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#F2A65A] ring-2 ring-white animate-pulse" />
            )}
          </button>

          {/* User Profile Avatar */}
          <button
            onClick={() => navigate('/profile')}
            className={`relative p-0.5 rounded-full transition-all focus:outline-none ${
              isProfileActive ? 'ring-2 ring-[#155638]' : 'hover:ring-1 hover:ring-[#237A50]'
            }`}
            title={`View profile for ${user.name}`}
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="w-7 h-7 rounded-full object-cover border border-white"
              onError={(e) => {
                // Fallback avatar
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div className="absolute -bottom-0.5 -right-0.5 bg-[#155638] rounded-full p-0.5 text-white">
              <ShieldCheck className="w-2.5 h-2.5" />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
