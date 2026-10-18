import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Trophy,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Gift,
  Award,
  CheckCircle2,
  TrendingUp,
  Ticket,
  TreePine,
  Coffee,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { LEVEL_MILESTONES } from '../mockData/initialData';
import { CivicLevelIcon } from '../components/common/CivicBadges';

export const RewardsScreen: React.FC = () => {
  const navigate = useNavigate();
  const { user, addToast } = useApp();

  const progressPercentage = Math.round((user.points / user.nextLevelPoints) * 100);

  const perks = [
    {
      id: 'perk-1',
      title: 'BMTC / Namma Metro Green Transit Voucher',
      pointsCost: 250,
      description: '₹100 discount coupon for sustainable electric bus or metro recharge.',
      icon: Ticket,
      available: user.points >= 250,
    },
    {
      id: 'perk-2',
      title: 'Native Sapling Adoption Certificate',
      pointsCost: 300,
      description: 'Plant a tagged indigenous tree in Indiranagar Ward 112 with your nameplate.',
      icon: TreePine,
      available: user.points >= 300,
    },
    {
      id: 'perk-3',
      title: 'Municipal Citizen Champion Commemorative Mug',
      pointsCost: 450,
      description: 'Ceramic reusable mug awarded at the annual Ward Committee ceremony.',
      icon: Coffee,
      available: user.points >= 450,
    },
  ];

  const pointsLog = [
    { label: 'Reported Urgent Road Hazard (#POST-1)', points: '+50 pts', time: 'Today, 7:15 AM' },
    { label: '89 Community Upvotes Milestone', points: '+25 pts', time: 'Today, 8:30 AM' },
    { label: 'Completed Solid Waste Segregation Quiz', points: '+40 pts', time: 'Yesterday' },
    { label: 'Volunteered in Sunday Cleanliness Drive', points: '+60 pts', time: 'Oct 12' },
  ];

  const handleClaimPerk = (title: string, cost: number) => {
    addToast('Perk Claimed!', `Voucher code generated for "${title}". -${cost} pts applied in demo.`, 'reward');
  };

  return (
    <div className="flex-1 flex flex-col px-3.5 sm:px-4 pt-3 pb-8 space-y-4">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-xs font-bold text-[#155638] hover:underline"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
        <span className="text-xs text-[#738078] font-medium">
          Civic Rewards
        </span>
      </div>

      {/* Main Points Card */}
      <div className="bg-gradient-to-br from-[#155638] via-[#1b6843] to-[#237A50] text-white rounded-3xl p-5 shadow-lg shadow-[#155638]/20 border border-[#237A50]/40 relative overflow-hidden">
        <div className="flex items-start justify-between relative z-10">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#F2A65A] block">
              Civic Influence Balance
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl sm:text-4xl font-extrabold tabular-nums tracking-tight">
                {user.points}
              </span>
              <span className="text-xs text-[#E4F5E9] font-medium">Points</span>
            </div>
            <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-xs font-bold text-white">
              <Sparkles className="w-3.5 h-3.5 text-[#F2A65A]" />
              <span>{user.level} Level Tier</span>
            </div>
          </div>

          <div className="drop-shadow-md">
            <CivicLevelIcon levelId={user.level.toLowerCase() as any} size={70} />
          </div>
        </div>

        {/* Level Progression */}
        <div className="mt-4 pt-4 border-t border-white/15 relative z-10 space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-white">
              Current: {user.level} (300 – 749 pts)
            </span>
            <span className="text-[11px] text-[#E4F5E9]">
              Next: Platinum ({user.nextLevelPoints} pts)
            </span>
          </div>

          <div className="h-2 bg-black/20 rounded-full overflow-hidden border border-white/20">
            <div
              className="h-full bg-gradient-to-r from-[#F2A65A] to-amber-300 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, Math.max(10, ((user.points - 300) / (750 - 300)) * 100))}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[10px] text-[#E4F5E9]/80 pt-0.5">
            <span>{user.points} / {user.nextLevelPoints} pts</span>
            <span>{user.nextLevelPoints - user.points} pts until Platinum</span>
          </div>
        </div>
      </div>

      {/* Levels and Achievement Milestones Mini Banner */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-[#E7ECE8] shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[#19251E] flex items-center gap-1.5">
            <Award className="w-4 h-4 text-[#155638]" />
            Levels and Achievement Milestones
          </span>
          <button
            onClick={() => navigate('/badges')}
            className="text-[11px] font-bold text-[#155638] hover:underline"
          >
            View All Badges &rarr;
          </button>
        </div>

        <div className="grid grid-cols-5 gap-1.5 pt-1">
          {LEVEL_MILESTONES.map((m) => {
            const isCurrent = user.level.toLowerCase() === m.id;
            return (
              <div
                key={m.id}
                onClick={() => navigate('/badges')}
                style={{ backgroundColor: m.bgColor }}
                className={`p-2 rounded-2xl border text-center flex flex-col items-center cursor-pointer transition-all ${
                  isCurrent ? 'ring-2 ring-[#155638] shadow-xs' : 'border-black/5 opacity-80'
                }`}
              >
                <CivicLevelIcon levelId={m.id} size={36} />
                <span className="text-[10px] font-extrabold text-[#19251E] mt-1 leading-tight">
                  {m.name}
                </span>
                <span className="text-[8px] text-[#738078]">{m.pointsRange}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Claimable Community Perks */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-[#E7ECE8] shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[#19251E] flex items-center gap-1.5">
            <Gift className="w-4 h-4 text-[#155638]" />
            Redeem Civic Perks
          </span>
          <span className="text-[11px] text-[#738078]">Instant digital claim</span>
        </div>

        <div className="space-y-2.5">
          {perks.map((perk) => {
            const Icon = perk.icon;
            return (
              <div
                key={perk.id}
                className="p-3.5 rounded-2xl border border-[#E7ECE8] bg-[#F7F9F7] flex items-start justify-between gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-white border border-[#E7ECE8] text-[#155638] flex items-center justify-center shrink-0 mt-0.5">
                  <Icon className="w-5 h-5" />
                </div>

                <div className="flex-1 min-w-0 pr-1">
                  <h4 className="text-xs font-bold text-[#19251E] leading-tight">
                    {perk.title}
                  </h4>
                  <p className="text-[11px] text-[#738078] mt-0.5 leading-snug">
                    {perk.description}
                  </p>
                  <span className="text-[11px] font-extrabold text-[#155638] block mt-1.5 tabular-nums">
                    {perk.pointsCost} points
                  </span>
                </div>

                <button
                  onClick={() => handleClaimPerk(perk.title, perk.pointsCost)}
                  disabled={!perk.available}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                    perk.available
                      ? 'bg-[#155638] hover:bg-[#237A50] text-white shadow-xs'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  {perk.available ? 'Claim' : 'Locked'}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Points Log */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-[#E7ECE8] shadow-xs space-y-3">
        <span className="text-xs font-bold text-[#19251E] flex items-center gap-1.5">
          <TrendingUp className="w-3.5 h-3.5 text-[#155638]" />
          Recent Points Activity
        </span>

        <div className="space-y-2">
          {pointsLog.map((log, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F7F9F7] border-b border-[#E7ECE8] last:border-b-0 text-xs"
            >
              <div>
                <p className="font-semibold text-[#19251E] text-xs leading-snug">
                  {log.label}
                </p>
                <span className="text-[10px] text-[#738078]">{log.time}</span>
              </div>
              <span className="text-xs font-bold text-[#155638] bg-[#E4F5E9] px-2 py-0.5 rounded-lg shrink-0">
                {log.points}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
