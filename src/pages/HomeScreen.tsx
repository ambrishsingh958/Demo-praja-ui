import React from 'react';
import { useApp } from '../context/AppContext';
import { DailyBriefingCard } from '../components/feed/DailyBriefingCard';
import { FeedPostCard } from '../components/feed/FeedPostCard';

export const HomeScreen: React.FC = () => {
  const { user, posts } = useApp();

  return (
    <div className="flex-1 flex flex-col px-3.5 sm:px-4 pt-3 space-y-4">
      {/* Greeting Header */}
      <section className="bg-white rounded-3xl p-4 sm:p-5 border border-[#E7ECE8] shadow-xs">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-lg sm:text-xl font-extrabold text-[#19251E] tracking-tight">
                Good morning, {user.name.split(' ')[0]} 👋
              </h1>
            </div>
            <p className="text-xs text-[#738078] mt-0.5">
              Your community, one step better every day.
            </p>
          </div>

          <span className="text-[11px] font-semibold text-[#155638] bg-[#E4F5E9] px-2.5 py-1 rounded-full shrink-0">
            {user.wardNumber}
          </span>
        </div>
      </section>

      {/* 7:00 AM City Briefing Clickable Banner */}
      <DailyBriefingCard />

      {/* Main Civic Feed Post Cards */}
      <div id="civic-feed-section" className="space-y-4">
        {posts.map((post) => (
          <FeedPostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};
