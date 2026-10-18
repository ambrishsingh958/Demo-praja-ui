import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  ChevronLeft,
  Share2,
  Download,
  X,
  Sparkles,
  Trophy,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { LEVEL_MILESTONES } from '../mockData/initialData';
import {
  CivicLevelIcon,
  CivicBadgeIcon,
} from '../components/common/CivicBadges';

export const BadgesCertificatesScreen: React.FC = () => {
  const navigate = useNavigate();
  const { badges, user, addToast } = useApp();

  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState<string | null>(null);

  const unlockedCount = badges.filter((b) => b.isUnlocked).length;

  const handleShareCertificate = () => {
    addToast('Certificate Link Copied!', 'Ready to share on LinkedIn, WhatsApp, or Twitter.', 'success');
  };

  return (
    <div className="flex-1 flex flex-col px-3.5 sm:px-4 pt-3 pb-10 space-y-5">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/menu')}
          className="flex items-center gap-1 text-xs font-bold text-[#155638] hover:underline cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Menu</span>
        </button>
        <span className="text-xs text-[#738078] font-medium">
          {unlockedCount} of {badges.length} Badges Unlocked
        </span>
      </div>

      {/* ============================================================ */}
      {/* 1. LEVELS AND ACHIEVEMENT MILESTONES (EXACTLY AS PER IMAGE) */}
      {/* ============================================================ */}
      <section className="space-y-3">
        {/* Section Header Title Bar */}
        <div className="bg-[#EAF5EE] text-[#155638] px-4 py-2.5 rounded-2xl border border-[#237A50]/20 flex items-center justify-between">
          <h2 className="text-sm sm:text-base font-extrabold tracking-tight">
            Levels and Achievement Milestones
          </h2>
          <span className="text-[11px] font-bold bg-[#155638] text-white px-2.5 py-0.5 rounded-full">
            Your Tier: {user.level}
          </span>
        </div>

        {/* 5 Level Milestone Cards (Responsive Scrollable / Grid) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {LEVEL_MILESTONES.map((milestone) => {
            const isCurrent = user.level.toLowerCase() === milestone.id;
            const isPassed = user.points >= milestone.minPoints;

            return (
              <div
                key={milestone.id}
                style={{ backgroundColor: milestone.bgColor, borderColor: milestone.borderColor }}
                className={`p-3.5 rounded-3xl border flex flex-col items-center text-center relative transition-all shadow-xs ${
                  isCurrent
                    ? 'ring-2 ring-[#155638] ring-offset-2 scale-[1.02] shadow-md'
                    : ''
                }`}
              >
                {/* Active Level Tag */}
                {isCurrent && (
                  <span className="absolute -top-2.5 bg-[#155638] text-white text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shadow-xs">
                    Current Level
                  </span>
                )}

                {/* Level Medal Icon */}
                <div className="my-1 drop-shadow-sm">
                  <CivicLevelIcon levelId={milestone.id} size={70} />
                </div>

                {/* Level Name */}
                <h3 className="text-sm sm:text-base font-extrabold text-[#19251E] mt-1">
                  {milestone.name}
                </h3>

                {/* Points Range */}
                <span className="text-xs font-bold text-[#738078] mt-0.5">
                  {milestone.pointsRange}
                </span>

                {/* Divider */}
                <div className="w-full my-2 border-t border-black/10" />

                {/* Perk Description */}
                <p className="text-[11px] text-[#4A5568] leading-tight font-medium flex-1 flex items-center justify-center">
                  {milestone.perk}
                </p>

                {/* Status Indicator at bottom */}
                <div className="mt-2.5 pt-1.5 w-full flex items-center justify-center">
                  {isCurrent ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-[#155638] bg-[#E4F5E9] px-2 py-0.5 rounded-md">
                      <CheckCircle2 className="w-3 h-3" /> Active
                    </span>
                  ) : isPassed ? (
                    <span className="text-[10px] font-bold text-[#237A50] opacity-90">
                      Achieved
                    </span>
                  ) : (
                    <span className="text-[10px] font-semibold text-[#A0AEC0]">
                      Locked ({milestone.minPoints} pts)
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. EXAMPLE BADGES (7 EXACT BADGES AS PER DESIGN IMAGE)       */}
      {/* ============================================================ */}
      <section className="space-y-3 pt-2">
        {/* Section Header Title Bar */}
        <div className="bg-[#EAF5EE] text-[#155638] px-4 py-2.5 rounded-2xl border border-[#237A50]/20 flex items-center justify-between">
          <h2 className="text-sm sm:text-base font-extrabold tracking-tight">
            Example Badges
          </h2>
          <span className="text-[11px] font-semibold text-[#155638]">
            {unlockedCount} / {badges.length} Unlocked
          </span>
        </div>

        {/* 7 Badge Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {badges.map((badge) => {
            return (
              <div
                key={badge.id}
                onClick={() => setSelectedBadge(badge.id)}
                className={`bg-white rounded-3xl p-3.5 sm:p-4 border border-[#E7ECE8] flex flex-col items-center text-center relative transition-all cursor-pointer hover:shadow-md hover:border-[#237A50]/40 ${
                  badge.isUnlocked
                    ? 'shadow-xs'
                    : 'bg-slate-50/70 border-slate-200'
                }`}
              >
                {/* Badge Icon */}
                <div className={`relative my-1 drop-shadow-sm transition-transform hover:scale-105 ${
                  badge.isUnlocked ? '' : 'filter grayscale opacity-75'
                }`}>
                  <CivicBadgeIcon badgeId={badge.id} size={76} />

                  {!badge.isUnlocked && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-7 h-7 rounded-full bg-slate-900/75 text-white flex items-center justify-center shadow-md">
                        <Lock className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Badge Name */}
                <h3 className="text-xs sm:text-sm font-extrabold text-[#19251E] mt-2 leading-tight">
                  {badge.name}
                </h3>

                {/* Badge Requirement (Exact Text from Image) */}
                <p className="text-[11px] sm:text-xs text-[#738078] leading-snug mt-1 flex-1 flex items-center justify-center">
                  {badge.requirement}
                </p>

                {/* Progress or Unlock Status */}
                <div className="mt-2.5 w-full pt-1.5 border-t border-[#E7ECE8]">
                  {badge.isUnlocked ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#155638] bg-[#E4F5E9] px-2.5 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3" /> Unlocked
                    </span>
                  ) : (
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[10px] text-[#738078] font-semibold">
                        <span>Progress</span>
                        <span>{badge.progress}%</span>
                      </div>
                      <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#155638] rounded-full"
                          style={{ width: `${badge.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Official Certificate Showcase Banner */}
      <div className="bg-gradient-to-br from-[#155638] via-[#1b6843] to-[#237A50] text-white rounded-3xl p-5 shadow-lg shadow-[#155638]/15 border border-[#237A50]/40 relative overflow-hidden mt-2">
        <div className="relative z-10 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#F2A65A] bg-white/10 px-2.5 py-1 rounded-full backdrop-blur-xs">
              Verified Citizen Credential
            </span>
            <ShieldCheck className="w-5 h-5 text-[#F2A65A]" />
          </div>

          <div>
            <h2 className="text-base sm:text-lg font-extrabold tracking-tight">
              Certificate of Civic Excellence
            </h2>
            <p className="text-xs text-[#E4F5E9] mt-0.5">
              Issued to <strong className="text-white">{user.name}</strong> for active participation in Ward 112 Indiranagar.
            </p>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-white/15">
            <span className="text-[11px] text-[#E4F5E9]/80 font-medium">
              Score: {user.points} Points · {user.level} Level
            </span>
            <button
              onClick={() => setShowCertificateModal(true)}
              className="px-4 py-1.5 rounded-full bg-white text-[#155638] font-bold text-xs hover:bg-[#E4F5E9] transition-colors shadow-xs cursor-pointer"
            >
              View Certificate
            </button>
          </div>
        </div>
      </div>

      {/* Certificate Modal */}
      {showCertificateModal && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3.5 sm:p-4 animate-in fade-in"
          onClick={() => setShowCertificateModal(false)}
        >
          <div
            className="w-full max-w-lg bg-[#FAF8F5] rounded-3xl p-6 border-4 border-[#D4AF37] shadow-2xl relative text-center space-y-4 animate-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowCertificateModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-black/5 text-[#738078]"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 rounded-full bg-[#155638] text-[#F2A65A] mx-auto flex items-center justify-center shadow-md">
              <Trophy className="w-8 h-8" />
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#738078]">
                Municipal Civic Council · PrajaPulse
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#155638] mt-1">
                Certificate of Civic Excellence
              </h2>
              <p className="text-xs text-[#738078] mt-1">
                This official credential certifies that
              </p>
              <h3 className="text-lg font-bold text-[#19251E] mt-2 underline decoration-[#D4AF37] decoration-2 underline-offset-4">
                {user.name}
              </h3>
              <p className="text-xs text-[#4A5568] max-w-md mx-auto mt-2 leading-relaxed">
                has achieved <strong className="text-[#155638]">{user.level} Level</strong> status with{' '}
                <strong className="text-[#155638]">{user.points} verified impact points</strong>, demonstrating outstanding civic responsibility and active community leadership in Ward 112 Indiranagar.
              </p>
            </div>

            <div className="pt-4 border-t border-[#E7ECE8] flex items-center justify-between text-left text-xs text-[#738078]">
              <div>
                <span className="block font-bold text-[#19251E]">Ward 112 Civic Officer</span>
                <span className="text-[10px]">Verified Digital Signature</span>
              </div>
              <div className="text-right">
                <span className="block font-bold text-[#19251E]">October 2026</span>
                <span className="text-[10px]">Credential #PRAJ-2026-8841</span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2 justify-center">
              <button
                onClick={handleShareCertificate}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#155638] text-white font-bold text-xs hover:bg-[#237A50] shadow-sm"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share Credential</span>
              </button>
              <button
                onClick={() => addToast('Certificate Saved', 'PDF ready in downloads.', 'success')}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-[#E7ECE8] text-[#19251E] font-bold text-xs hover:bg-[#F7F9F7]"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
