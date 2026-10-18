import React, { useState } from 'react';
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  ChevronUp,
  ChevronDown,
  Sparkles,
  Award,
  CheckCircle2,
  MapPin,
  Clock,
  X,
  Send,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const PositiveImpactScreen: React.FC = () => {
  const {
    reels,
    toggleReelLike,
    toggleReelSave,
    addReelComment,
    addToast,
    user,
  } = useApp();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showImpactDrawer, setShowImpactDrawer] = useState(false);
  const [showCommentsDrawer, setShowCommentsDrawer] = useState(false);
  const [reelCommentInput, setReelCommentInput] = useState('');

  const currentReel = reels[currentIndex] || reels[0];

  const handleNext = () => {
    if (currentIndex < reels.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0); // loop
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      setCurrentIndex(reels.length - 1);
    }
  };

  const handleShareReel = () => {
    navigator.clipboard?.writeText?.(window.location.href);
    addToast('Reel Link Copied!', 'Shared positive community impact with neighbors.', 'success');
  };

  const handlePostReelComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reelCommentInput.trim()) return;
    addReelComment(currentReel.id, reelCommentInput.trim());
    setReelCommentInput('');
  };

  return (
    <div className="relative w-full h-[calc(100vh-4rem)] max-w-lg mx-auto bg-black text-white overflow-hidden flex flex-col justify-between select-none">
      {/* Background Media with Gradient Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={currentReel.mediaUrl}
          alt={currentReel.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            const el = e.target as HTMLElement;
            el.style.display = 'none';
          }}
        />

        {/* Deep bottom and top gradient scrims for maximum legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/90 pointer-events-none" />
      </div>

      {/* Top Overlay Bar */}
      <div className="relative z-10 flex items-center justify-between p-4 pt-3">
        <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15">
          <Sparkles className="w-4 h-4 text-[#F2A65A]" />
          <span className="text-xs font-bold text-white tracking-wide">
            Positive Impact
          </span>
          <span className="text-[10px] text-[#E4F5E9]/80 font-mono">
            {currentIndex + 1}/{reels.length}
          </span>
        </div>

        {/* Before / After Chip if available */}
        {currentReel.beforeAfter && (
          <button
            onClick={() => setShowImpactDrawer(true)}
            className="flex items-center gap-1.5 text-[11px] font-bold bg-[#155638]/80 hover:bg-[#155638] text-white px-3 py-1.5 rounded-full backdrop-blur-md border border-white/20 transition-all shadow-md"
          >
            <Award className="w-3.5 h-3.5 text-[#F2A65A]" />
            <span>Before & After</span>
          </button>
        )}
      </div>

      {/* Middle Reel Navigation Buttons (Up / Down) */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2">
        <button
          onClick={handlePrev}
          className="w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all active:scale-95"
          aria-label="Previous story"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
        <button
          onClick={handleNext}
          className="w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all active:scale-95"
          aria-label="Next story"
        >
          <ChevronDown className="w-5 h-5" />
        </button>
      </div>

      {/* Bottom Main Content & Engagement Column */}
      <div className="relative z-10 p-4 pb-6 flex items-end justify-between gap-3">
        {/* Left Side: Creator, Title, Caption & Impact tag */}
        <div className="flex-1 min-w-0 pr-2 space-y-2">
          {/* Creator Lockup */}
          <div className="flex items-center gap-2">
            <img
              src={currentReel.creator.avatar}
              alt={currentReel.creator.name}
              className="w-9 h-9 rounded-full object-cover border-2 border-white/80 shadow-md"
            />
            <div>
              <div className="flex items-center gap-1">
                <span className="text-xs font-bold text-white leading-tight">
                  {currentReel.creator.name}
                </span>
                <span className="text-[10px] bg-white/20 px-1.5 py-0.2 rounded text-[#E4F5E9] font-medium">
                  {currentReel.creator.role}
                </span>
              </div>
              <span className="text-[11px] text-white/80 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#F2A65A]" />
                {currentReel.locality}
              </span>
            </div>
          </div>

          {/* Reel Title & Caption */}
          <div>
            <h2 className="text-base sm:text-lg font-extrabold text-white leading-snug drop-shadow-md">
              {currentReel.title}
            </h2>
            <p className="text-xs text-white/90 leading-relaxed mt-1 line-clamp-3 drop-shadow-sm font-normal">
              {currentReel.caption}
            </p>
          </div>

          {/* Impact Metric & Resolution Pill */}
          <div className="flex items-center gap-2 flex-wrap pt-1">
            <div className="flex items-center gap-1 bg-[#155638]/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-xl backdrop-blur-md border border-white/20">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#F2A65A]" />
              <span>{currentReel.impactStat}</span>
            </div>

            {currentReel.daysToResolve && (
              <span className="text-[10px] text-white/90 bg-black/40 px-2 py-1 rounded-xl backdrop-blur-xs font-medium">
                {currentReel.daysToResolve}
              </span>
            )}
          </div>
        </div>

        {/* Right Side: Social Action Icons (Like, Comment, Share, Bookmark, Impact) */}
        <div className="flex flex-col items-center gap-3.5 shrink-0">
          {/* Like */}
          <button
            onClick={() => toggleReelLike(currentReel.id)}
            className="flex flex-col items-center gap-1 group"
          >
            <div
              className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
                currentReel.hasLiked
                  ? 'bg-rose-600 text-white scale-110 shadow-lg shadow-rose-600/30'
                  : 'bg-black/50 text-white backdrop-blur-md border border-white/20 hover:bg-black/70'
              }`}
            >
              <Heart
                className={`w-5 h-5 ${currentReel.hasLiked ? 'fill-current' : ''}`}
              />
            </div>
            <span className="text-[11px] font-bold text-white drop-shadow-md tabular-nums">
              {currentReel.likes}
            </span>
          </button>

          {/* Comment */}
          <button
            onClick={() => setShowCommentsDrawer(true)}
            className="flex flex-col items-center gap-1 group"
          >
            <div className="w-11 h-11 rounded-full bg-black/50 text-white backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-black/70 transition-colors">
              <MessageCircle className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-white drop-shadow-md tabular-nums">
              {currentReel.commentsCount}
            </span>
          </button>

          {/* Share */}
          <button
            onClick={handleShareReel}
            className="flex flex-col items-center gap-1 group"
          >
            <div className="w-11 h-11 rounded-full bg-black/50 text-white backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-black/70 transition-colors">
              <Share2 className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-white drop-shadow-md tabular-nums">
              {currentReel.shares}
            </span>
          </button>

          {/* Bookmark */}
          <button
            onClick={() => toggleReelSave(currentReel.id)}
            className="flex flex-col items-center gap-1 group"
          >
            <div
              className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
                currentReel.isSaved
                  ? 'bg-[#155638] text-white border border-[#237A50]'
                  : 'bg-black/50 text-white backdrop-blur-md border border-white/20 hover:bg-black/70'
              }`}
            >
              <Bookmark
                className={`w-5 h-5 ${currentReel.isSaved ? 'fill-current' : ''}`}
              />
            </div>
          </button>

          {/* See Impact Button */}
          <button
            onClick={() => setShowImpactDrawer(true)}
            className="w-11 h-11 rounded-full bg-[#F2A65A] text-[#19251E] flex items-center justify-center font-bold shadow-lg hover:scale-105 active:scale-95 transition-all"
            title="See Impact Breakdown"
          >
            <Award className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* "See the Impact" Detailed Drawer */}
      {showImpactDrawer && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-end justify-center p-0 animate-in fade-in"
          onClick={() => setShowImpactDrawer(false)}
        >
          <div
            className="w-full max-w-lg bg-white rounded-t-3xl p-5 text-[#19251E] space-y-4 max-h-[80vh] overflow-y-auto animate-in slide-in-from-bottom pb-safe"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-10 h-1.5 bg-[#E7ECE8] rounded-full mx-auto" />
            <div className="flex items-center justify-between pb-2 border-b border-[#E7ECE8]">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-[#155638]" />
                <h3 className="text-base font-bold text-[#19251E]">
                  Civic Transformation Story
                </h3>
              </div>
              <button
                onClick={() => setShowImpactDrawer(false)}
                className="p-1 rounded-full text-[#738078] hover:text-[#19251E]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-bold text-[#155638]">
                {currentReel.title}
              </h4>
              <p className="text-xs text-[#738078] leading-relaxed">
                {currentReel.caption}
              </p>

              {currentReel.beforeAfter && (
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <div className="p-3 bg-red-50 border border-red-200 rounded-2xl">
                    <span className="text-[10px] font-bold text-red-700 uppercase tracking-wider block">
                      Before
                    </span>
                    <p className="text-xs font-semibold text-red-900 mt-0.5">
                      {currentReel.beforeAfter.beforeLabel}
                    </p>
                  </div>
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl">
                    <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">
                      After
                    </span>
                    <p className="text-xs font-semibold text-emerald-900 mt-0.5">
                      {currentReel.beforeAfter.afterLabel}
                    </p>
                  </div>
                </div>
              )}

              <div className="p-3.5 bg-[#E4F5E9] rounded-2xl text-xs text-[#155638] flex items-center justify-between">
                <span className="font-bold">Verified Community Impact</span>
                <span className="font-bold text-[#19251E]">{currentReel.impactStat}</span>
              </div>
            </div>

            <button
              onClick={() => {
                toggleReelLike(currentReel.id);
                setShowImpactDrawer(false);
              }}
              className="w-full py-3 bg-[#155638] text-white text-xs font-bold rounded-xl hover:bg-[#237A50] transition-colors"
            >
              Celebrate This Win (+5 Pts)
            </button>
          </div>
        </div>
      )}

      {/* Reel Comments Drawer */}
      {showCommentsDrawer && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-end justify-center p-0 animate-in fade-in"
          onClick={() => setShowCommentsDrawer(false)}
        >
          <div
            className="w-full max-w-lg bg-white rounded-t-3xl p-5 text-[#19251E] flex flex-col max-h-[75vh] animate-in slide-in-from-bottom pb-safe"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-10 h-1.5 bg-[#E7ECE8] rounded-full mx-auto mb-2" />
            <div className="flex items-center justify-between pb-2 border-b border-[#E7ECE8]">
              <h3 className="text-sm font-bold text-[#19251E]">
                Story Reactions ({currentReel.commentsCount})
              </h3>
              <button
                onClick={() => setShowCommentsDrawer(false)}
                className="p-1 rounded-full text-[#738078] hover:text-[#19251E]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-3 space-y-2.5">
              {currentReel.comments.map((c) => (
                <div key={c.id} className="p-2.5 bg-[#F7F9F7] rounded-xl text-xs">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="font-bold text-[#19251E]">{c.author}</span>
                    <span className="text-[10px] text-[#738078]">{c.time}</span>
                  </div>
                  <p className="text-[#19251E]">{c.text}</p>
                </div>
              ))}
            </div>

            <form onSubmit={handlePostReelComment} className="flex gap-2 pt-2 border-t border-[#E7ECE8]">
              <input
                type="text"
                value={reelCommentInput}
                onChange={(e) => setReelCommentInput(e.target.value)}
                placeholder="Share your appreciation..."
                className="flex-1 text-xs bg-[#F7F9F7] border border-[#E7ECE8] rounded-xl px-3 py-2 text-[#19251E]"
              />
              <button
                type="submit"
                disabled={!reelCommentInput.trim()}
                className="p-2.5 bg-[#155638] text-white rounded-xl disabled:opacity-40"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
