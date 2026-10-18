import React, { useState, useRef } from 'react';
import {
  Star,
  ArrowRight,
  Sunrise,
  Calendar,
  X,
  Droplets,
  Truck,
  Leaf,
  CheckCircle2,
  Sparkles,
  Trophy,
  ChevronRight,
  ChevronLeft,
  AlertCircle,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DailyBriefingCard: React.FC = () => {
  const { briefing, posts, setSelectedPostForDetail } = useApp();
  // Default to 1 (Your 7 AM City Briefing) to match the user's screenshot exactly
  const [activeDot, setActiveDot] = useState(1);
  const [showFullModal, setShowFullModal] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handlePrevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveDot((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveDot((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        setActiveDot((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      } else {
        setActiveDot((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // 4 slide options for interactive dots, with Slide 1 matching the user's uploaded 7 AM City Briefing screenshot
  const slides = [
    {
      badge: 'Featured',
      badgeIcon: 'star',
      titleLine1: 'Real Change',
      titleLine2: 'Starts with You',
      subtitle: 'Report issues  •  Support causes  •  Build a better tomorrow',
      buttonText: 'Explore Issues',
      actionType: 'explore',
    },
    {
      badge: '7:00 AM City Briefing',
      badgeIcon: 'sunrise',
      titleLine1: 'Your 7 AM',
      titleLine2: 'City Briefing',
      subtitle: 'Morning Ward Dispatch • Sunday, October 18, 2026 • BBMP Active',
      buttonText: 'View Briefing',
      actionType: 'briefing',
    },
    {
      badge: 'Priority Civic Alert',
      badgeIcon: 'alert',
      titleLine1: 'Road Cavity Fix',
      titleLine2: '100ft Road Sector',
      subtitle: 'Cold mix leveling in progress  •  Caution cones placed',
      buttonText: 'Track Repair',
      actionType: 'priority',
    },
    {
      badge: 'Positive Impact',
      badgeIcon: 'trophy',
      titleLine1: 'Pocket Park Revamp',
      titleLine2: 'Complete & Open',
      subtitle: 'Dumping strip transformed into sensory community garden',
      buttonText: 'See Impact Story',
      actionType: 'positive',
    },
  ];

  const current = slides[activeDot];

  const handleAction = (type: string) => {
    if (type === 'explore') {
      const feed = document.getElementById('civic-feed-section');
      if (feed) {
        feed.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollBy({ top: 320, behavior: 'smooth' });
      }
    } else if (type === 'briefing') {
      setShowFullModal(true);
    } else if (type === 'priority') {
      const p = posts.find((item) => item.id === briefing.priorityIssue.id) || posts[0];
      setSelectedPostForDetail(p);
    } else if (type === 'positive') {
      const p = posts.find((item) => item.isPositiveStory) || posts[2] || posts[0];
      setSelectedPostForDetail(p);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Water':
        return <Droplets className="w-3.5 h-3.5 text-blue-600" />;
      case 'Roads':
        return <Truck className="w-3.5 h-3.5 text-amber-600" />;
      case 'Sanitation':
        return <Leaf className="w-3.5 h-3.5 text-emerald-600" />;
      default:
        return <Sparkles className="w-3.5 h-3.5 text-[#155638]" />;
    }
  };

  return (
    <>
      {/* Centered wrapper with reduced, tailored width matching the user's screenshot */}
      <div className="w-full flex justify-center">
        <div
          className="relative w-full max-w-[365px] sm:max-w-[390px] rounded-[28px] overflow-hidden shadow-lg border border-[#155638]/25 bg-[#072719] min-h-[220px] sm:min-h-[235px] flex flex-col justify-between p-5 select-none transition-all group"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Layer 1: High Fidelity Architectural SVG of Twilight City Skyline, Spires & Golden Street Lights */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <svg
              className="w-full h-full object-cover object-right"
              viewBox="0 0 800 480"
              preserveAspectRatio="xMaxYMid slice"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Twilight Horizon Sky Gradient */}
              <rect width="800" height="480" fill="url(#twilightGradient)" />
              <defs>
                <linearGradient id="twilightGradient" x1="400" y1="0" x2="400" y2="480" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#111827" />
                  <stop offset="35%" stopColor="#1E293B" />
                  <stop offset="65%" stopColor="#334155" />
                  <stop offset="85%" stopColor="#475569" />
                  <stop offset="100%" stopColor="#1E293B" />
                </linearGradient>

                <linearGradient id="towerGradient1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#374151" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#111827" stopOpacity="0.95" />
                </linearGradient>

                <linearGradient id="goldenGlow" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.85" />
                  <stop offset="50%" stopColor="#FBBF24" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#D97706" stopOpacity="0.7" />
                </linearGradient>
              </defs>

              {/* Distant Spire Towers (matching the silhouette in user's screenshot) */}
              <g opacity="0.6">
                {/* Spire Tower 1 */}
                <polygon points="560,70 550,150 570,150" fill="#4B5563" />
                <rect x="548" y="150" width="24" height="200" fill="url(#towerGradient1)" />

                {/* Spire Tower 2 (Taller Main Spire) */}
                <polygon points="630,45 618,135 642,135" fill="#4B5563" />
                <line x1="630" y1="20" x2="630" y2="45" stroke="#9CA3AF" strokeWidth="2.5" />
                <rect x="616" y="135" width="28" height="220" fill="url(#towerGradient1)" />

                {/* Spire Tower 3 */}
                <polygon points="700,60 688,140 712,140" fill="#4B5563" />
                <rect x="686" y="140" width="28" height="210" fill="url(#towerGradient1)" />

                {/* Spire Tower 4 (Far Right) */}
                <polygon points="765,75 754,155 776,155" fill="#4B5563" />
                <rect x="752" y="155" width="26" height="195" fill="url(#towerGradient1)" />
              </g>

              {/* Glowing Golden Highways & City Traffic Lights across the lower half */}
              <g opacity="0.75">
                {/* Curved Winding Illuminated Avenue 1 */}
                <path
                  d="M420 480 C 470 380, 520 320, 600 290 C 680 260, 740 280, 800 270"
                  stroke="url(#goldenGlow)"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                {/* Curved Winding Avenue 2 */}
                <path
                  d="M480 480 C 530 400, 570 350, 660 330 C 720 310, 770 320, 800 315"
                  stroke="#F59E0B"
                  strokeWidth="4"
                  strokeDasharray="12 6"
                />
                {/* Lower Traffic Hub Stream */}
                <path
                  d="M520 480 Q 580 410 650 390 Q 720 370 800 365"
                  stroke="#FBBF24"
                  strokeWidth="5"
                />
              </g>

              {/* City Light Clusters */}
              <g fill="#FDE68A" opacity="0.6">
                <circle cx="580" cy="310" r="2.5" />
                <circle cx="605" cy="295" r="3" />
                <circle cx="620" cy="305" r="2" />
                <circle cx="645" cy="285" r="3" />
                <circle cx="670" cy="275" r="3" />
                <circle cx="710" cy="280" r="2.5" />
                <circle cx="740" cy="275" r="3" />
                <circle cx="770" cy="290" r="2.5" />
                <circle cx="540" cy="370" r="2" />
                <circle cx="560" cy="360" r="3" />
                <circle cx="590" cy="345" r="2.5" />
                <circle cx="630" cy="340" r="3" />
                <circle cx="665" cy="330" r="2.5" />
                <circle cx="700" cy="325" r="3" />
                <circle cx="730" cy="335" r="2" />
                <circle cx="760" cy="320" r="3" />
              </g>
            </svg>
          </div>

          {/* Layer 2: High Resolution Night Cityscape Photo with Golden Highway Lights */}
          <img
            src="https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1200&q=80"
            alt="City Aerial Lights"
            className="absolute inset-0 w-full h-full object-cover object-right pointer-events-none opacity-80 mix-blend-screen"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />

          {/* Layer 3: Deep Forest Green Seamless Gradient on Left Half */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#072719] via-[#093220]/95 via-48% to-transparent pointer-events-none" />

          {/* Content Top: Pill Badge */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-[#19251E] font-bold text-xs sm:text-[12.5px] shadow-sm">
              {current.badgeIcon === 'star' && (
                <Star className="w-3.5 h-3.5 fill-[#EAB308] text-[#EAB308]" />
              )}
              {current.badgeIcon === 'sunrise' && (
                <Sunrise className="w-4 h-4 text-[#F59E0B]" />
              )}
              {current.badgeIcon === 'alert' && (
                <AlertCircle className="w-3.5 h-3.5 text-[#DC2626]" />
              )}
              {current.badgeIcon === 'trophy' && (
                <Trophy className="w-3.5 h-3.5 text-[#F59E0B]" />
              )}
              <span>{current.badge}</span>
            </div>

            {/* Quick Slide Navigation Buttons */}
            <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-1.5 py-0.5 rounded-full border border-white/10">
              <button
                type="button"
                onClick={handlePrevSlide}
                className="w-6 h-6 rounded-full hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
                title="Previous highlight"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
              <button
                type="button"
                onClick={handleNextSlide}
                className="w-6 h-6 rounded-full hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
                title="Next highlight"
                aria-label="Next slide"
              >
                <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* Content Middle: Headline & Subtitle */}
          <div className="relative z-10 my-2.5 max-w-[260px] sm:max-w-[280px]">
            <h2 className="text-[25px] sm:text-[27px] font-black text-white tracking-tight leading-[1.15] drop-shadow-sm">
              {current.titleLine1}
              <br />
              {current.titleLine2}
            </h2>

            <p className="text-[11px] sm:text-[11.5px] text-white/90 font-medium leading-relaxed mt-2 drop-shadow-xs">
              {current.subtitle}
            </p>
          </div>

          {/* Content Bottom: Action Button on Left & 4 Pagination Dots on Right */}
          <div className="relative z-10 flex items-center justify-between pt-1">
            {/* Action Button: View Briefing -> */}
            <button
              type="button"
              onClick={() => handleAction(current.actionType)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-[#155638] font-bold text-xs sm:text-[13px] hover:bg-[#E4F5E9] active:scale-95 transition-all shadow-md cursor-pointer"
            >
              <span>{current.buttonText}</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>

            {/* 4 Pagination Dots in Bottom Right Corner (Dot 2 active to match user's screenshot) */}
            <div className="flex items-center gap-1.5" title="Featured Highlights">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveDot(idx)}
                  aria-label={`Highlight ${idx + 1}`}
                  className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    activeDot === idx
                      ? 'bg-white scale-125 shadow-xs'
                      : 'bg-white/40 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Full 7 AM Briefing Modal */}
      {showFullModal && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 transition-all animate-in fade-in"
          onClick={() => setShowFullModal(false)}
        >
          <div
            className="w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col pb-safe"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-[#155638] text-white p-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Sunrise className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-sm leading-tight">Your 7 AM City Briefing</h3>
                  <p className="text-[11px] text-white/80">Ward 112 • Daily Civic Intelligence</p>
                </div>
              </div>
              <button
                onClick={() => setShowFullModal(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs text-[#19251E]">
              {/* Headline & Summary */}
              <div className="bg-[#F0F7F3] border border-[#D7E8DD] rounded-2xl p-3.5 space-y-1.5">
                <div className="flex items-center gap-1.5 text-[#155638] font-bold text-xs">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Sunday, October 18, 2026 • 07:00 AM Dispatch</span>
                </div>
                <h4 className="font-extrabold text-sm text-[#19251E] leading-snug">
                  {briefing.headline}
                </h4>
                <p className="text-xs text-[#47544C] leading-relaxed">
                  {briefing.aiSummary}
                </p>
              </div>

              {/* Priority Fix Section */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h5 className="font-bold text-xs uppercase tracking-wider text-[#738078]">
                    Priority Fix of the Day
                  </h5>
                  <span className="text-[10px] bg-red-100 text-red-800 font-bold px-2 py-0.5 rounded-full">
                    High Urgency
                  </span>
                </div>
                <div className="bg-white border border-[#E7ECE8] rounded-2xl p-3 shadow-xs space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-bold text-xs text-[#19251E]">
                        {briefing.priorityIssue.title}
                      </p>
                      <p className="text-[11px] text-[#738078]">
                        {briefing.priorityIssue.area} • {briefing.priorityIssue.reportsCount} citizen reports
                      </p>
                    </div>
                  </div>
                  <p className="text-[11px] text-[#47544C]">
                    BBMP Road Infrastructure Cell has assigned rapid cold-mix patching. Excavation leveled; final asphalt seal scheduled before evening commute.
                  </p>
                  <button
                    onClick={() => {
                      setShowFullModal(false);
                      const p = posts.find((item) => item.id === briefing.priorityIssue.id) || posts[0];
                      setSelectedPostForDetail(p);
                    }}
                    className="w-full py-2 bg-[#155638] text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1 hover:bg-[#0E3E26] cursor-pointer"
                  >
                    <span>View Inspection Report</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>

              {/* Top Ward Updates */}
              <div className="space-y-2">
                <h5 className="font-bold text-xs uppercase tracking-wider text-[#738078]">
                  Key Ward Updates
                </h5>
                <div className="space-y-2">
                  {briefing.topUpdates.map((update) => (
                    <div
                      key={update.id}
                      className="bg-white border border-[#E7ECE8] rounded-2xl p-2.5 flex items-start gap-2.5 shadow-xs"
                    >
                      <div className="w-7 h-7 rounded-xl bg-[#F0F5F2] flex items-center justify-center shrink-0 mt-0.5">
                        {getCategoryIcon(update.category)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <p className="font-bold text-xs text-[#19251E] truncate">{update.title}</p>
                          <span className="text-[10px] text-[#155638] font-semibold shrink-0">
                            {update.category}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#738078] mt-0.5">{update.impact}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Positive Story */}
              <div className="bg-[#EAF6ED] border border-[#C5E8CF] rounded-2xl p-3 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#155638] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-xs text-[#155638]">
                    Yesterday's Impact: {briefing.positiveStory.title}
                  </p>
                  <p className="text-[11px] text-[#2F6B48] mt-0.5">
                    {briefing.positiveStory.outcome} ({briefing.positiveStory.area})
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-3 bg-white border-t border-[#E7ECE8] flex items-center justify-between shrink-0">
              <span className="text-[11px] text-[#738078]">Next Briefing: Tomorrow at 7:00 AM</span>
              <button
                onClick={() => setShowFullModal(false)}
                className="px-4 py-1.5 bg-[#155638] text-white rounded-xl text-xs font-bold hover:bg-[#0E3E26] cursor-pointer"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
