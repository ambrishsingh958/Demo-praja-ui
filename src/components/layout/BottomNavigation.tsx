import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Search, Plus, PlaySquare, LayoutGrid } from 'lucide-react';

export const BottomNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname;

  const isActive = (path: string) => {
    if (path === '/home' && (currentPath === '/' || currentPath === '/home')) return true;
    return currentPath === path;
  };

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E7ECE8] shadow-[0_-4px_16px_rgba(0,0,0,0.04)] pb-safe"
      role="navigation"
      aria-label="Bottom Navigation"
    >
      <div className="max-w-xl mx-auto px-2">
        <div className="flex items-center justify-between h-16">
          {/* 1. Home */}
          <button
            onClick={() => navigate('/home')}
            className={`flex-1 flex flex-col items-center justify-center py-1 min-h-[48px] transition-colors ${
              isActive('/home') ? 'text-[#155638]' : 'text-[#738078] hover:text-[#19251E]'
            }`}
            aria-label="Home Feed"
          >
            <div className="relative">
              <Home
                className={`w-5 h-5 transition-transform ${
                  isActive('/home') ? 'scale-110 stroke-[2.4]' : 'stroke-[1.8]'
                }`}
              />
              {isActive('/home') && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#155638]" />
              )}
            </div>
            <span
              className={`text-[11px] mt-1 tracking-tight font-medium ${
                isActive('/home') ? 'text-[#155638] font-bold' : 'text-[#738078]'
              }`}
            >
              Home
            </span>
          </button>

          {/* 2. Search */}
          <button
            onClick={() => navigate('/search')}
            className={`flex-1 flex flex-col items-center justify-center py-1 min-h-[48px] transition-colors ${
              isActive('/search') ? 'text-[#155638]' : 'text-[#738078] hover:text-[#19251E]'
            }`}
            aria-label="Search and Explore"
          >
            <div className="relative">
              <Search
                className={`w-5 h-5 transition-transform ${
                  isActive('/search') ? 'scale-110 stroke-[2.4]' : 'stroke-[1.8]'
                }`}
              />
              {isActive('/search') && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#155638]" />
              )}
            </div>
            <span
              className={`text-[11px] mt-1 tracking-tight font-medium ${
                isActive('/search') ? 'text-[#155638] font-bold' : 'text-[#738078]'
              }`}
            >
              Search
            </span>
          </button>

          {/* 3. Central Prominent Plus Button (Create Report) */}
          <div className="flex-1 flex items-center justify-center -mt-5">
            <button
              onClick={() => navigate('/create-report')}
              className="group relative flex items-center justify-center w-13 h-13 rounded-full bg-gradient-to-tr from-[#155638] to-[#237A50] text-white shadow-lg shadow-[#155638]/30 hover:shadow-xl hover:shadow-[#155638]/40 hover:scale-105 active:scale-95 transition-all focus:outline-none"
              aria-label="Create Civic Report"
              title="Report a Civic Issue"
            >
              <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
              <Plus className="w-6 h-6 stroke-[2.6] transition-transform group-hover:rotate-90" />
            </button>
          </div>

          {/* 4. Positive Impact (Reels) */}
          <button
            onClick={() => navigate('/positive-impact')}
            className={`flex-1 flex flex-col items-center justify-center py-1 min-h-[48px] transition-colors ${
              isActive('/positive-impact') ? 'text-[#155638]' : 'text-[#738078] hover:text-[#19251E]'
            }`}
            aria-label="Positive Impact Reels"
          >
            <div className="relative">
              <PlaySquare
                className={`w-5 h-5 transition-transform ${
                  isActive('/positive-impact') ? 'scale-110 stroke-[2.4]' : 'stroke-[1.8]'
                }`}
              />
              {isActive('/positive-impact') && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#155638]" />
              )}
            </div>
            <span
              className={`text-[11px] mt-1 tracking-tight font-medium whitespace-nowrap ${
                isActive('/positive-impact') ? 'text-[#155638] font-bold' : 'text-[#738078]'
              }`}
            >
              Impact
            </span>
          </button>

          {/* 5. Menu */}
          <button
            onClick={() => navigate('/menu')}
            className={`flex-1 flex flex-col items-center justify-center py-1 min-h-[48px] transition-colors ${
              isActive('/menu') ||
              isActive('/vacancies') ||
              isActive('/games') ||
              isActive('/report-analysis') ||
              isActive('/learn-certify') ||
              isActive('/badges-certificates')
                ? 'text-[#155638]'
                : 'text-[#738078] hover:text-[#19251E]'
            }`}
            aria-label="Features Menu"
          >
            <div className="relative">
              <LayoutGrid
                className={`w-5 h-5 transition-transform ${
                  isActive('/menu') ? 'scale-110 stroke-[2.4]' : 'stroke-[1.8]'
                }`}
              />
              {isActive('/menu') && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#155638]" />
              )}
            </div>
            <span
              className={`text-[11px] mt-1 tracking-tight font-medium ${
                isActive('/menu') ? 'text-[#155638] font-bold' : 'text-[#738078]'
              }`}
            >
              Menu
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
};
