import React, { useState } from 'react';
import {
  ArrowLeft,
  Bookmark,
  Share2,
  MapPin,
  Calendar,
  Users,
  Star,
  Camera,
  Check,
  CheckCircle2,
  Clock,
  Wrench,
  Building2,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  AlertCircle,
  X,
  Upload,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const PostDetailModal: React.FC = () => {
  const {
    selectedPostForDetail,
    setSelectedPostForDetail,
    toggleBookmark,
    setSelectedPostForShare,
    addToast,
    user,
  } = useApp();

  const [showEvidenceUpload, setShowEvidenceUpload] = useState(false);
  const [evidenceCount, setEvidenceCount] = useState(4);
  const [evidenceAwarded, setEvidenceAwarded] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!selectedPostForDetail) return null;

  const post = selectedPostForDetail;

  const sampleEvidenceImages = [
    post.imageUrl,
    'https://images.unsplash.com/photo-1578991624414-276ef23a534f?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=600&q=80',
  ];

  const detailImages =
    post.images && post.images.length > 0
      ? post.images
      : [post.imageUrl, ...sampleEvidenceImages.slice(1)];

  const getDepartment = (category: string) => {
    switch (category) {
      case 'Roads':
        return 'Public Works Department (BBMP Road Infra)';
      case 'Water':
        return 'Water Supply & Sewerage Board (BWSSB)';
      case 'Sanitation':
        return 'Solid Waste Management Cell (SWM)';
      case 'Streetlights':
        return 'Electricity Supply Company (BESCOM)';
      case 'Public Safety':
        return 'City Police & Traffic Safety Cell';
      case 'Parks':
        return 'Horticulture & Public Parks Dept';
      default:
        return 'Municipal Ward Engineering Cell';
    }
  };

  const handleAddEvidence = () => {
    if (!evidenceAwarded) {
      setEvidenceCount((prev) => prev + 1);
      setEvidenceAwarded(true);
      addToast('Evidence Uploaded! +25 Points', 'Citizen verification recorded for this issue.', 'reward');
    } else {
      addToast('Evidence Already Added', 'Thank you for verifying this civic issue.', 'info');
    }
    setShowEvidenceUpload(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 transition-all animate-in fade-in duration-200"
      onClick={() => setSelectedPostForDetail(null)}
    >
      {/* Screen container: full height mobile screen look matching screenshot */}
      <div
        className="w-full max-w-lg bg-white h-[95vh] sm:h-[90vh] rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-300 pb-safe"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 1. Top Bar */}
        <header className="flex items-center justify-between px-4 py-3 border-b border-[#E7ECE8] shrink-0 bg-white">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSelectedPostForDetail(null)}
              className="p-1.5 -ml-1.5 rounded-full text-[#155638] hover:bg-[#F7F9F7] transition-colors"
              aria-label="Back"
            >
              <ArrowLeft className="w-5 h-5 stroke-[2.4]" />
            </button>
            <h1 className="text-base sm:text-lg font-bold text-[#155638] tracking-tight">
              Issue Details
            </h1>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setSelectedPostForShare(post)}
              className="p-2 rounded-full text-[#19251E] hover:bg-[#F7F9F7] transition-colors"
              title="Share Issue"
            >
              <Share2 className="w-5 h-5" />
            </button>

            <button
              onClick={() => toggleBookmark(post.id)}
              className={`p-2 rounded-full transition-colors ${
                post.isBookmarked
                  ? 'text-[#155638] bg-[#E4F5E9]'
                  : 'text-[#19251E] hover:bg-[#F7F9F7]'
              }`}
              title="Bookmark Issue"
            >
              <Bookmark className={`w-5 h-5 ${post.isBookmarked ? 'fill-current' : ''}`} />
            </button>
          </div>
        </header>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto px-4 py-3.5 space-y-4">
          {/* 2. Hero Image Carousel with Pill Badges and Slide Feature */}
          <div className="relative aspect-[16/10] sm:aspect-video w-full rounded-2xl overflow-hidden bg-slate-900 shadow-xs select-none group">
            {/* Horizontal Slide Carousel Track */}
            <div
              className="flex h-full w-full transition-transform duration-300 ease-out"
              style={{ transform: `translateX(-${activeImageIndex * 100}%)` }}
            >
              {detailImages.map((img, idx) => (
                <div key={idx} className="relative w-full h-full shrink-0 bg-slate-900">
                  <img
                    src={img}
                    alt={`${post.title} - evidence photo ${idx + 1}`}
                    className="w-full h-full object-cover"
                    loading={idx === 0 ? 'eager' : 'lazy'}
                    onError={(e) => {
                      const el = e.target as HTMLElement;
                      el.style.display = 'none';
                      if (el.parentElement) {
                        el.parentElement.style.background = post.imageFallbackGradient;
                      }
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Gradient Scrims */}
            <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/70 via-black/30 to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />

            {/* Top Left Badge: Critical / High Priority */}
            <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10 pointer-events-none">
              <span className="flex items-center gap-1 bg-[#FEE2E2] text-[#DC2626] font-bold text-xs px-3 py-1 rounded-full shadow-xs">
                <span className="w-3.5 h-3.5 rounded-full bg-[#DC2626] text-white flex items-center justify-center text-[10px] font-extrabold">
                  !
                </span>
                <span>{post.priority === 'Urgent' ? 'Critical' : `${post.priority || 'High'}`}</span>
              </span>
            </div>

            {/* Top Right Badge: Status (In Progress, Resolved, etc.) */}
            <div className="absolute top-3 right-3 z-10 pointer-events-none">
              <span
                className={`text-xs font-bold px-3 py-1 rounded-full shadow-xs ${
                  post.status === 'Resolved'
                    ? 'bg-[#E4F5E9] text-[#155638]'
                    : post.status === 'In Progress'
                    ? 'bg-[#E0F2FE] text-[#0284C7]'
                    : 'bg-[#FEF3C7] text-[#D97706]'
                }`}
              >
                {post.status}
              </span>
            </div>

            {/* CHEVRON SLIDE BUTTONS: Left (<) and Right (>) */}
            {detailImages.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() =>
                    setActiveImageIndex((prev) =>
                      prev === 0 ? detailImages.length - 1 : prev - 1
                    )
                  }
                  aria-label="Previous image"
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/55 hover:bg-black/80 active:scale-90 text-white flex items-center justify-center backdrop-blur-md border border-white/25 transition-all shadow-md"
                >
                  <ChevronLeft className="w-4 h-4 stroke-[2.6] -translate-x-0.5" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setActiveImageIndex((prev) =>
                      prev === detailImages.length - 1 ? 0 : prev + 1
                    )
                  }
                  aria-label="Next image"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/55 hover:bg-black/80 active:scale-90 text-white flex items-center justify-center backdrop-blur-md border border-white/25 transition-all shadow-md"
                >
                  <ChevronRight className="w-4 h-4 stroke-[2.6] translate-x-0.5" />
                </button>
              </>
            )}

            {/* Bottom Row Overlay: Evidence Images Counter + Slide Pagination Dots */}
            <div className="absolute bottom-3 inset-x-3 flex items-center justify-between z-10">
              <div className="bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5 border border-white/20 shadow-xs">
                <Camera className="w-3.5 h-3.5" />
                <span>
                  {activeImageIndex + 1}/{detailImages.length} Evidence Photos
                </span>
              </div>

              {detailImages.length > 1 && (
                <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
                  {detailImages.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      className={`transition-all duration-300 rounded-full ${
                        idx === activeImageIndex
                          ? 'w-4 h-1.5 bg-white shadow-xs'
                          : 'w-1.5 h-1.5 bg-white/45 hover:bg-white/80'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 3. Title & Subtitle Section */}
          <div className="space-y-1">
            <h2 className="text-xl font-extrabold text-[#155638] tracking-tight leading-snug">
              {post.title}
            </h2>

            <div className="flex items-center justify-between text-xs text-[#738078] flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 text-[#19251E] font-medium">
                  <MapPin className="w-3.5 h-3.5 text-[#155638]" />
                  {post.reporter.wardOrArea}
                </span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1 text-[#738078]">
                  <Users className="w-3.5 h-3.5 text-[#738078]" />
                  2.5 km away
                </span>
              </div>

              {/* Category Badge on Right */}
              <span className="flex items-center gap-1 bg-[#E4F5E9] text-[#155638] font-bold text-xs px-2.5 py-1 rounded-xl">
                <span>🛣</span>
                <span>{post.category}</span>
              </span>
            </div>
          </div>

          {/* 4. Description Paragraph */}
          <p className="text-xs sm:text-sm text-[#738078] leading-relaxed">
            {post.description}
          </p>

          {/* 5. Three Key Metric Cards in 1 Row */}
          <div className="grid grid-cols-3 gap-2">
            {/* Card 1: Reported */}
            <div className="bg-[#F7F9F7] p-2.5 sm:p-3 rounded-2xl border border-[#E7ECE8] flex items-center gap-2.5">
              <div className="text-[#155638]">
                <Calendar className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] text-[#738078] block">Status</span>
                <span className="text-xs font-bold text-[#19251E] truncate block">
                  Active Issue
                </span>
              </div>
            </div>

            {/* Card 2: Community */}
            <div className="bg-[#F7F9F7] p-2.5 sm:p-3 rounded-2xl border border-[#E7ECE8] flex items-center gap-2.5">
              <div className="text-[#155638]">
                <Users className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] text-[#738078] block">Community</span>
                <span className="text-xs font-bold text-[#19251E] truncate block">
                  {post.upvotes} supporting
                </span>
              </div>
            </div>

            {/* Card 3: Impact */}
            <div className="bg-[#F7F9F7] p-2.5 sm:p-3 rounded-2xl border border-[#E7ECE8] flex items-center gap-2.5">
              <div className="text-[#155638]">
                <Star className="w-4 h-4 fill-current" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] text-[#738078] block">Impact</span>
                <span className="text-xs font-bold text-[#19251E] truncate block">
                  {post.priority || 'High'}
                </span>
              </div>
            </div>
          </div>

          {/* 6. Evidence Gallery Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#155638]">Evidence</h3>
              <button
                onClick={() => addToast('Opening Evidence Gallery', `${evidenceCount} verified photos on record`, 'info')}
                className="text-xs font-semibold text-[#155638] flex items-center gap-0.5 hover:underline"
              >
                <span>View all ({evidenceCount})</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {/* Thumbnail 1: Main */}
              <div className="relative aspect-square rounded-2xl overflow-hidden border border-[#E7ECE8] bg-slate-100 group">
                <img
                  src={sampleEvidenceImages[0]}
                  alt="Main Evidence"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <span className="absolute top-1.5 left-1.5 bg-[#155638] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md flex items-center gap-0.5 shadow-xs">
                  <Camera className="w-2.5 h-2.5" /> Main
                </span>
              </div>

              {/* Thumbnail 2 */}
              <div className="relative aspect-square rounded-2xl overflow-hidden border border-[#E7ECE8] bg-slate-100 group">
                <img
                  src={sampleEvidenceImages[1]}
                  alt="Evidence 2"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>

              {/* Thumbnail 3 */}
              <div className="relative aspect-square rounded-2xl overflow-hidden border border-[#E7ECE8] bg-slate-100 group">
                <img
                  src={sampleEvidenceImages[2]}
                  alt="Evidence 3"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>

              {/* Thumbnail 4: +1 overlay */}
              <div
                onClick={() => setShowEvidenceUpload(true)}
                className="relative aspect-square rounded-2xl overflow-hidden border border-[#E7ECE8] bg-slate-900 group cursor-pointer"
              >
                <img
                  src={sampleEvidenceImages[3]}
                  alt="Evidence 4"
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity"
                />
                <div className="absolute inset-0 flex items-center justify-center text-white font-extrabold text-sm sm:text-base">
                  +1
                </div>
              </div>
            </div>
          </div>

          {/* 7. Location Card Strip */}
          <div className="p-3 bg-[#F7F9F7] rounded-2xl border border-[#E7ECE8] flex items-center gap-3">
            {/* Map Mini Vector Graphic */}
            <div className="w-20 h-16 rounded-xl bg-[#E8EFEA] border border-[#CBD9CF] relative overflow-hidden shrink-0 flex items-center justify-center">
              {/* Subtle road grid lines */}
              <div className="absolute inset-x-0 top-3 h-1.5 bg-white/80 rotate-12" />
              <div className="absolute inset-y-0 left-6 w-1.5 bg-white/80 -rotate-12" />
              <div className="w-6 h-6 rounded-full bg-red-100 border border-red-300 flex items-center justify-center relative z-10 shadow-xs animate-bounce">
                <MapPin className="w-4 h-4 text-red-600 fill-current" />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-bold text-[#738078] uppercase tracking-wider flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#155638]" /> Location
              </span>
              <p className="text-xs font-bold text-[#19251E] truncate mt-0.5">
                {post.reporter.wardOrArea}
              </p>
              <button
                onClick={() => addToast(post.reporter.wardOrArea, 'GPS: 12.9784° N, 77.6408° E', 'info')}
                className="text-xs font-bold text-[#155638] flex items-center gap-0.5 hover:underline mt-1"
              >
                <span>View on Map</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 8. Status & Timeline Section */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-[#155638]">
              Status & Timeline
            </h3>

            <div className="space-y-4 pl-1">
              {/* Step 1: Reported */}
              <div className="flex items-start gap-3 relative">
                <div className="w-6 h-6 rounded-full bg-[#155638] text-white flex items-center justify-center text-xs shrink-0 relative z-10">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                {/* Connecting Line to next step */}
                <div className="absolute top-6 left-3 -ml-px w-0.5 h-9 bg-[#155638]" />

                <div className="min-w-0 flex-1 -mt-0.5">
                  <h4 className="text-xs font-bold text-[#155638]">Reported</h4>
                  <p className="text-[11px] text-[#738078]">
                    3 days ago · By {post.reporter.name}
                  </p>
                </div>
              </div>

              {/* Step 2: Under Review */}
              <div className="flex items-start gap-3 relative">
                <div className="w-6 h-6 rounded-full bg-[#0284C7] text-white flex items-center justify-center text-xs shrink-0 relative z-10">
                  <Clock className="w-3.5 h-3.5" />
                </div>
                {/* Connecting Line to next step */}
                <div className="absolute top-6 left-3 -ml-px w-0.5 h-9 bg-[#F59E0B]" />

                <div className="min-w-0 flex-1 -mt-0.5">
                  <h4 className="text-xs font-bold text-[#0284C7]">Under Review</h4>
                  <p className="text-[11px] text-[#738078]">
                    2 days ago · By Municipal Team
                  </p>
                </div>
              </div>

              {/* Step 3: In Progress */}
              <div className="flex items-start gap-3 relative">
                <div className="w-6 h-6 rounded-full bg-[#F59E0B] text-white flex items-center justify-center text-xs shrink-0 relative z-10 shadow-xs ring-4 ring-amber-100">
                  <Wrench className="w-3 h-3" />
                </div>
                {/* Connecting Line to next step */}
                <div className="absolute top-6 left-3 -ml-px w-0.5 h-9 bg-[#CBD5E1]" />

                <div className="min-w-0 flex-1 -mt-0.5">
                  <h4 className="text-xs font-bold text-[#D97706]">In Progress</h4>
                  <p className="text-[11px] text-[#738078]">
                    Today · Road repair team assigned
                  </p>
                </div>
              </div>

              {/* Step 4: Resolved */}
              <div className="flex items-start gap-3 relative">
                <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center text-xs shrink-0 relative z-10">
                  <span className="w-2 h-2 rounded-full bg-slate-400" />
                </div>

                <div className="min-w-0 flex-1 -mt-0.5">
                  <h4 className="text-xs font-bold text-slate-600">Resolved</h4>
                  <p className="text-[11px] text-[#738078]">
                    Expected in 5-7 days
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 9. Responsible Department Card */}
          <div className="p-3.5 bg-white rounded-2xl border border-[#E7ECE8] flex items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-2xl bg-[#E4F5E9] text-[#155638] flex items-center justify-center shrink-0">
                <Building2 className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] text-[#738078] block font-medium">
                  Responsible Department
                </span>
                <p className="text-xs font-bold text-[#19251E] truncate">
                  {getDepartment(post.category)}
                </p>
              </div>
            </div>

            <button
              onClick={() => addToast(getDepartment(post.category), 'Official Ward Handling Desk', 'info')}
              className="text-xs font-bold text-[#155638] px-3 py-1.5 rounded-full border border-[#E7ECE8] hover:bg-[#F7F9F7] shrink-0 transition-colors"
            >
              View Details &rarr;
            </button>
          </div>

          {/* 10. Community Activity Card */}
          <div className="p-3.5 bg-white rounded-2xl border border-[#E7ECE8] flex items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-2xl bg-[#E4F5E9] text-[#155638] flex items-center justify-center shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] text-[#738078] block font-medium">
                  Community Activity
                </span>
                <p className="text-xs font-bold text-[#19251E] truncate">
                  {post.upvotes} people have supported this issue
                </p>
                {/* Overlapping citizen avatars */}
                <div className="flex items-center -space-x-1.5 mt-1">
                  {[
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=128&q=80',
                    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=128&q=80',
                    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=128&q=80',
                    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=128&q=80',
                  ].map((url, i) => (
                    <img
                      key={i}
                      src={url}
                      alt="Supporter"
                      className="w-5 h-5 rounded-full object-cover border-2 border-white"
                    />
                  ))}
                  <div className="w-5 h-5 rounded-full bg-[#155638] text-white text-[9px] font-bold flex items-center justify-center border-2 border-white">
                    +{Math.max(1, post.upvotes - 4)}
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => addToast('Community Endorsements', `${post.upvotes} citizens logged support for this fix`, 'info')}
              className="text-xs font-bold text-[#155638] px-3 py-1.5 rounded-full border border-[#E7ECE8] hover:bg-[#F7F9F7] shrink-0 transition-colors"
            >
              View all &rarr;
            </button>
          </div>
        </div>

        {/* 11. Bottom Sticky Action Bar */}
        <footer className="p-3.5 border-t border-[#E7ECE8] bg-white flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#E4F5E9] text-[#155638] flex items-center justify-center shrink-0">
              <Star className="w-4 h-4 fill-current text-[#155638]" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-[#19251E] block leading-tight">
                Earn Points
              </span>
              <span className="text-[10px] text-[#738078] font-medium block">
                +25 pts (Verify Evidence)
              </span>
            </div>
          </div>

          <button
            onClick={() => setShowEvidenceUpload(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#155638] hover:bg-[#237A50] text-white text-xs font-bold transition-all shadow-md shadow-[#155638]/20 active:scale-95 shrink-0"
          >
            <Camera className="w-4 h-4" />
            <span>Add Evidence</span>
          </button>
        </footer>

        {/* Quick Add Evidence Modal */}
        {showEvidenceUpload && (
          <div
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
            onClick={() => setShowEvidenceUpload(false)}
          >
            <div
              className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl space-y-4 animate-in zoom-in-95"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-2 border-b border-[#E7ECE8]">
                <h3 className="text-sm font-bold text-[#19251E] flex items-center gap-1.5">
                  <Camera className="w-4 h-4 text-[#155638]" />
                  <span>Verify with Photo Evidence</span>
                </h3>
                <button
                  onClick={() => setShowEvidenceUpload(false)}
                  className="p-1 rounded-full text-[#738078] hover:text-[#19251E]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-xs text-[#738078] leading-relaxed">
                Take a fresh photo from the site to verify current status. Adding verified photo evidence rewards you <strong>+25 Civic Points</strong>.
              </p>

              <label className="border-2 border-dashed border-[#155638]/30 bg-[#F7F9F7] rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-[#155638] transition-colors">
                <Upload className="w-8 h-8 text-[#155638] mb-2" />
                <span className="text-xs font-bold text-[#19251E]">Tap to select camera photo</span>
                <span className="text-[10px] text-[#738078] mt-0.5">JPG, PNG up to 10MB</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAddEvidence}
                  className="hidden"
                />
              </label>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowEvidenceUpload(false)}
                  className="flex-1 py-2.5 rounded-xl border border-[#E7ECE8] text-xs font-semibold text-[#738078]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAddEvidence}
                  className="flex-1 py-2.5 rounded-xl bg-[#155638] text-white text-xs font-bold hover:bg-[#237A50]"
                >
                  Submit Photo (+25 pts)
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
