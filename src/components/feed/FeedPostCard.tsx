import React, { useState, useRef } from 'react';
import {
  ThumbsUp,
  MessageCircle,
  Share2,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Camera,
} from 'lucide-react';
import { CivicPost } from '../../types';
import { useApp } from '../../context/AppContext';

interface FeedPostCardProps {
  post: CivicPost;
}

export const FeedPostCard: React.FC<FeedPostCardProps> = ({ post }) => {
  const {
    toggleUpvote,
    setSelectedPostForDetail,
    setSelectedPostForComments,
    setSelectedPostForShare,
    addToast,
  } = useApp();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const categoryFallbackImages: Record<string, string[]> = {
    Roads: [
      post.imageUrl,
      'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=800&q=80',
    ],
    Water: [
      post.imageUrl,
      'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=800&q=80',
    ],
    Sanitation: [
      post.imageUrl,
      'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=800&q=80',
    ],
    Streetlights: [
      post.imageUrl,
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?auto=format&fit=crop&w=800&q=80',
    ],
    'Public Safety': [
      post.imageUrl,
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1590496793929-36417d3117de?auto=format&fit=crop&w=800&q=80',
    ],
    Parks: [
      post.imageUrl,
      'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
    ],
    Community: [
      post.imageUrl,
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1476820865390-c52aeebb9891?auto=format&fit=crop&w=800&q=80',
    ],
  };

  const postImages =
    post.images && post.images.length > 1
      ? post.images
      : (categoryFallbackImages[post.category] || [
          post.imageUrl,
          'https://images.unsplash.com/photo-1578991624414-276ef23a534f?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80',
        ]);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? postImages.length - 1 : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === postImages.length - 1 ? 0 : prev + 1));
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
        // Swiped left -> next
        setCurrentImageIndex((prev) => (prev === postImages.length - 1 ? 0 : prev + 1));
      } else {
        // Swiped right -> prev
        setCurrentImageIndex((prev) => (prev === 0 ? postImages.length - 1 : prev - 1));
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const getCategoryStyles = (category: string) => {
    switch (category) {
      case 'Roads':
        return 'bg-amber-100/90 text-amber-950 border-amber-300';
      case 'Water':
        return 'bg-blue-100/90 text-blue-950 border-blue-300';
      case 'Sanitation':
        return 'bg-emerald-100/90 text-emerald-950 border-emerald-300';
      case 'Streetlights':
        return 'bg-yellow-100/90 text-yellow-950 border-yellow-300';
      case 'Public Safety':
        return 'bg-rose-100/90 text-rose-950 border-rose-300';
      case 'Parks':
        return 'bg-teal-100/90 text-teal-950 border-teal-300';
      default:
        return 'bg-green-100/90 text-green-950 border-green-300';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Resolved':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E4F5E9] text-[#155638] border border-[#237A50]/30">
            <CheckCircle2 className="w-3 h-3" /> Resolved
          </span>
        );
      case 'In Progress':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-300">
            <Clock className="w-3 h-3 animate-spin" /> In Progress
          </span>
        );
      case 'Under Review':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
            <Clock className="w-3 h-3" /> Under Review
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
            Reported
          </span>
        );
    }
  };

  return (
    <article className="bg-white rounded-3xl border border-[#E7ECE8] shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden transition-all hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
      {/* Media Carousel Box with Chevrons, Dots, and Photo Counter */}
      <div
        className="relative aspect-[16/10] sm:aspect-video w-full bg-slate-900 overflow-hidden cursor-pointer select-none group"
        onClick={() => setSelectedPostForDetail(post)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Horizontal Slide Carousel Track */}
        <div
          className="flex h-full w-full transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
        >
          {postImages.map((img, idx) => (
            <div key={idx} className="relative w-full h-full shrink-0 bg-slate-900">
              <img
                src={img}
                alt={`${post.title} - photo ${idx + 1}`}
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

        {/* Gradient Scrims for Top & Bottom Legibility */}
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />

        {/* TOP OVERLAY: User Name on Left, Photo Counter & Location Symbol on Right */}
        <div className="absolute top-3 inset-x-3.5 flex items-center justify-between z-10 pointer-events-none">
          {/* User Name & Avatar ON the Image */}
          <div className="flex items-center gap-2 drop-shadow-md pointer-events-auto">
            <img
              src={post.reporter.avatar}
              alt={post.reporter.name}
              className="w-8 h-8 rounded-full object-cover border-2 border-white shadow-sm"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div className="flex items-center gap-1">
              <span className="text-xs sm:text-sm font-bold text-white tracking-tight drop-shadow-sm">
                {post.reporter.name}
              </span>
              {post.reporter.isVerified && (
                <span title="Verified Citizen" className="inline-flex items-center">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#E4F5E9] drop-shadow-xs" />
                </span>
              )}
            </div>
          </div>

          {/* RIGHT SIDE: Photo Counter & Location symbol */}
          <div className="flex items-center gap-1.5 pointer-events-auto">
            {postImages.length > 1 && (
              <div
                className="px-2 py-0.5 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold tracking-wider flex items-center gap-1 shadow-sm"
                title={`${currentImageIndex + 1} of ${postImages.length} photos`}
              >
                <Camera className="w-3 h-3 text-white/90" />
                <span>
                  {currentImageIndex + 1}/{postImages.length}
                </span>
              </div>
            )}

            {/* Symbol of Location - icon only, no text */}
            <button
              type="button"
              className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-sm hover:bg-black/60 transition-colors"
              title={post.reporter.wardOrArea}
              onClick={(e) => {
                e.stopPropagation();
                addToast(post.reporter.wardOrArea, 'Location tagged', 'info');
              }}
            >
              <MapPin className="w-4 h-4 text-white drop-shadow-xs" />
            </button>
          </div>
        </div>

        {/* CHEVRON SLIDE BUTTONS: Left (<) and Right (>) */}
        {postImages.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrevImage}
              aria-label="Previous photo"
              className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/55 hover:bg-black/80 active:scale-90 text-white flex items-center justify-center backdrop-blur-md border border-white/25 transition-all shadow-md"
            >
              <ChevronLeft className="w-4 h-4 stroke-[2.6] -translate-x-0.5" />
            </button>
            <button
              type="button"
              onClick={handleNextImage}
              aria-label="Next photo"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/55 hover:bg-black/80 active:scale-90 text-white flex items-center justify-center backdrop-blur-md border border-white/25 transition-all shadow-md"
            >
              <ChevronRight className="w-4 h-4 stroke-[2.6] translate-x-0.5" />
            </button>
          </>
        )}

        {/* BOTTOM OVERLAY: Category Badge (Time removed!) and Slide Pagination Dots */}
        <div className="absolute bottom-3 inset-x-3.5 flex items-center justify-between z-10">
          {/* Category Badge only - time removed as requested */}
          <span
            className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border shadow-xs backdrop-blur-md ${getCategoryStyles(
              post.category
            )}`}
          >
            {post.category}
          </span>

          {/* SLIDE PAGINATION DOTS */}
          {postImages.length > 1 && (
            <div
              className="flex items-center gap-1 px-2 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              {postImages.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex(idx);
                  }}
                  className={`transition-all duration-300 rounded-full ${
                    idx === currentImageIndex
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

      {/* Post Title & Status */}
      <div className="p-4 pt-3.5 pb-2">
        <div className="flex items-start justify-between gap-2">
          <h3
            onClick={() => setSelectedPostForDetail(post)}
            className="text-sm sm:text-base font-bold text-[#19251E] hover:text-[#155638] transition-colors leading-snug cursor-pointer flex-1"
          >
            {post.title}
          </h3>
          <div className="shrink-0">{getStatusBadge(post.status)}</div>
        </div>
      </div>

      {/* 1. Engagement Row: Upvote, Comment, and Share */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-t border-[#E7ECE8] bg-[#F7F9F7]/60">
        {/* Upvote */}
        <button
          onClick={() => toggleUpvote(post.id)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
            post.hasUpvoted
              ? 'bg-[#155638] text-white border-[#155638] shadow-xs'
              : 'bg-white text-[#19251E] border-[#E7ECE8] hover:bg-[#E4F5E9] hover:text-[#155638]'
          }`}
          title="Upvote / Endorse"
        >
          <ThumbsUp
            className={`w-3.5 h-3.5 ${post.hasUpvoted ? 'fill-current' : ''}`}
          />
          <span className="tabular-nums">{post.upvotes}</span>
        </button>

        {/* Comment */}
        <button
          onClick={() => setSelectedPostForComments(post)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white text-[#19251E] border border-[#E7ECE8] hover:bg-[#F7F9F7] transition-colors"
          title="Discuss"
        >
          <MessageCircle className="w-3.5 h-3.5 text-[#738078]" />
          <span className="tabular-nums">{post.commentsCount}</span>
        </button>

        {/* Share */}
        <button
          onClick={() => setSelectedPostForShare(post)}
          className="p-2 rounded-xl bg-white text-[#738078] border border-[#E7ECE8] hover:text-[#19251E] hover:bg-[#F7F9F7] transition-colors"
          title="Share"
        >
          <Share2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </article>
  );
};

