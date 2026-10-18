import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Briefcase,
  Gamepad2,
  BarChart3,
  GraduationCap,
  Award,
  ChevronRight,
  ShieldCheck,
  Trophy,
  User,
  Settings,
  Bell,
  LogOut,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const MenuScreen: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useApp();

  const menuSections = [
    {
      group: 'Opportunities & Community',
      items: [
        {
          id: 'vacancies',
          title: 'Vacancies & Volunteering',
          description: 'Browse NGO roles, ward fellowships, and community initiatives.',
          icon: Briefcase,
          path: '/vacancies',
          badge: '4 Openings',
          color: 'bg-emerald-50 text-[#155638] border-emerald-200',
        },
      ],
    },
    {
      group: 'Interactive Civic Engagement',
      items: [
        {
          id: 'games',
          title: 'Civic Games & Quizzes',
          description: 'Earn points with waste segregation and water conservation mini-challenges.',
          icon: Gamepad2,
          path: '/games',
          badge: '+40 pts ready',
          color: 'bg-amber-50 text-amber-800 border-amber-200',
        },
        {
          id: 'report-analysis',
          title: 'Report & Analysis',
          description: 'View your submitted issues, resolution timelines, and ward analytics.',
          icon: BarChart3,
          path: '/report-analysis',
          badge: '18 Reports',
          color: 'bg-blue-50 text-blue-800 border-blue-200',
        },
      ],
    },
    {
      group: 'Citizen Development',
      items: [
        {
          id: 'learn-certify',
          title: 'Learn & Certify',
          description: 'Interactive civic modules on waste management, RTI, and pedestrian safety.',
          icon: GraduationCap,
          path: '/learn-certify',
          badge: '1 Certified',
          color: 'bg-teal-50 text-teal-800 border-teal-200',
        },
        {
          id: 'badges-certificates',
          title: 'Badges & Certificates',
          description: 'View earned civic honors, milestones, and your official certificate.',
          icon: Award,
          path: '/badges-certificates',
          badge: '4 Badges',
          color: 'bg-purple-50 text-purple-800 border-purple-200',
        },
      ],
    },
  ];

  return (
    <div className="flex-1 flex flex-col px-3.5 sm:px-4 pt-3 pb-8 space-y-4">
      {/* Top Profile Summary Card */}
      <div
        onClick={() => navigate('/profile')}
        className="bg-white rounded-3xl p-4 sm:p-5 border border-[#E7ECE8] shadow-xs cursor-pointer hover:border-[#155638]/30 transition-all group"
      >
        <div className="flex items-center gap-3.5">
          <div className="relative">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-md group-hover:scale-102 transition-transform"
            />
            <div className="absolute -bottom-1 -right-1 bg-[#155638] rounded-full p-1 text-white">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-[#19251E] truncate group-hover:text-[#155638] transition-colors">
                {user.name}
              </h2>
              <ChevronRight className="w-5 h-5 text-[#738078] group-hover:text-[#155638] group-hover:translate-x-0.5 transition-all" />
            </div>
            <p className="text-xs text-[#738078] truncate">
              {user.neighborhood} · {user.wardNumber}
            </p>

            {/* Profile Completion Indicator */}
            <div className="mt-2 flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-[#F7F9F7] rounded-full overflow-hidden border border-[#E7ECE8]">
                <div className="h-full bg-[#155638] rounded-full w-[85%]" />
              </div>
              <span className="text-[10px] font-bold text-[#155638] tabular-nums">
                85% Profile
              </span>
            </div>
          </div>
        </div>

        {/* Mini Stats strip */}
        <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-[#E7ECE8]">
          <div className="flex items-center gap-1.5 text-xs text-[#19251E]">
            <Trophy className="w-4 h-4 text-[#F2A65A]" />
            <span className="font-extrabold text-[#155638] tabular-nums">
              {user.points} pts
            </span>
            <span className="text-[#738078]">({user.level.split(' ')[0]})</span>
          </div>
          <div className="text-right text-xs text-[#738078]">
            <strong className="text-[#19251E]">{user.stats.reportsCount}</strong> reports logged
          </div>
        </div>
      </div>

      {/* Feature Menu Groups */}
      <div className="space-y-4">
        {menuSections.map((section) => (
          <div key={section.group} className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#738078] px-1 block">
              {section.group}
            </span>

            <div className="space-y-2">
              {section.items.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => navigate(item.path)}
                    className="w-full text-left bg-white rounded-2xl p-3.5 border border-[#E7ECE8] shadow-xs hover:border-[#155638]/40 hover:shadow-sm transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border mt-0.5 group-hover:scale-105 transition-transform ${item.color}`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="min-w-0 pr-2">
                        <div className="flex items-center gap-2">
                          <h3 className="text-xs sm:text-sm font-bold text-[#19251E] group-hover:text-[#155638] transition-colors truncate">
                            {item.title}
                          </h3>
                          {item.badge && (
                            <span className="text-[10px] font-semibold bg-[#E4F5E9] text-[#155638] px-2 py-0.5 rounded-full shrink-0">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-[#738078] mt-0.5 leading-snug line-clamp-1">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <ChevronRight className="w-4 h-4 text-[#738078] group-hover:text-[#155638] group-hover:translate-x-0.5 transition-all shrink-0" />
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Additional Quick Utility Links */}
      <div className="bg-white rounded-2xl p-3 border border-[#E7ECE8] space-y-1">
        <button
          onClick={() => navigate('/notifications')}
          className="w-full text-left py-2 px-3 rounded-xl hover:bg-[#F7F9F7] text-xs font-semibold text-[#19251E] flex items-center justify-between"
        >
          <span className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#738078]" />
            Notification Settings
          </span>
          <ChevronRight className="w-4 h-4 text-[#738078]" />
        </button>

        <button
          onClick={() => navigate('/rewards')}
          className="w-full text-left py-2 px-3 rounded-xl hover:bg-[#F7F9F7] text-xs font-semibold text-[#19251E] flex items-center justify-between"
        >
          <span className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-[#F2A65A]" />
            Civic Perks & Rewards Store
          </span>
          <ChevronRight className="w-4 h-4 text-[#738078]" />
        </button>

        <button
          onClick={() => {
            logout();
            navigate('/login');
          }}
          className="w-full text-left py-2 px-3 rounded-xl hover:bg-rose-50 text-xs font-semibold text-rose-700 flex items-center justify-between"
        >
          <span className="flex items-center gap-2">
            <LogOut className="w-4 h-4 text-rose-700" />
            Sign Out
          </span>
          <ChevronRight className="w-4 h-4 text-rose-700" />
        </button>
      </div>
    </div>
  );
};
