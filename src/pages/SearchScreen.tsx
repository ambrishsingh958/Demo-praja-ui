import React, { useState, useMemo } from 'react';
import {
  Search,
  X,
  TrendingUp,
  Clock,
  Sparkles,
  ChevronRight,
  MapPin,
  CheckCircle2,
  AlertCircle,
  ThumbsUp,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CivicCategory } from '../types';

export const SearchScreen: React.FC = () => {
  const { posts, setSelectedPostForDetail, user } = useApp();

  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'All' | 'Issues' | 'Resolved' | 'Events' | 'People'>('All');
  const [recentSearches, setRecentSearches] = useState<string[]>([
    '100ft road potholes',
    'Water leakage HAL',
    'Defense Colony park',
    'Streetlight repair',
  ]);

  const trendingTopics = [
    { tag: '#CleanIndiranagar', count: '142 reports', category: 'Sanitation' },
    { tag: '#Ward112Potholes', count: '89 upvotes', category: 'Roads' },
    { tag: '#CauveryWaterAlert', count: '64 updates', category: 'Water' },
    { tag: '#PedestrianSafety12thMain', count: '310 votes', category: 'Community' },
    { tag: '#SolarLightsDefenseColony', count: 'Resolved', category: 'Streetlights' },
  ];

  const popularCategories: { label: CivicCategory; count: number; color: string }[] = [
    { label: 'Roads', count: 38, color: 'bg-amber-50 text-amber-900 border-amber-200' },
    { label: 'Water', count: 24, color: 'bg-blue-50 text-blue-900 border-blue-200' },
    { label: 'Sanitation', count: 46, color: 'bg-emerald-50 text-emerald-900 border-emerald-200' },
    { label: 'Streetlights', count: 19, color: 'bg-yellow-50 text-yellow-900 border-yellow-200' },
    { label: 'Public Safety', count: 15, color: 'bg-rose-50 text-rose-900 border-rose-200' },
    { label: 'Parks', count: 12, color: 'bg-teal-50 text-teal-900 border-teal-200' },
  ];

  const searchResults = useMemo(() => {
    if (!query.trim() && activeFilter === 'All') return [];

    let filtered = posts.filter((post) => {
      const matchText = `${post.title} ${post.description} ${post.category} ${post.reporter.wardOrArea} ${post.reporter.name}`.toLowerCase();
      const q = query.toLowerCase().trim();
      const matchesQuery = !q || matchText.includes(q);

      if (!matchesQuery) return false;

      if (activeFilter === 'Issues') return post.status !== 'Resolved';
      if (activeFilter === 'Resolved') return post.status === 'Resolved';
      if (activeFilter === 'Events') return post.category === 'Community' || post.isPositiveStory;
      if (activeFilter === 'People') return post.reporter.isVerified;

      return true;
    });

    return filtered;
  }, [posts, query, activeFilter]);

  const handleSelectRecent = (term: string) => {
    setQuery(term);
  };

  const handleSelectTrending = (tag: string) => {
    const clean = tag.replace('#', '').toLowerCase();
    setQuery(clean);
  };

  const handleClearQuery = () => {
    setQuery('');
  };

  return (
    <div className="flex-1 flex flex-col px-3.5 sm:px-4 pt-3 space-y-4">
      {/* Search Input Bar */}
      <div className="relative">
        <div className="relative flex items-center">
          <Search className="absolute left-3.5 w-4 h-4 text-[#738078]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search civic issues, ward updates, or localities..."
            className="w-full text-xs bg-white border border-[#E7ECE8] rounded-2xl pl-10 pr-10 py-3 text-[#19251E] focus:outline-none focus:border-[#155638] focus:ring-1 focus:ring-[#155638] shadow-xs transition-all placeholder:text-[#98A59E]"
          />
          {query && (
            <button
              onClick={handleClearQuery}
              className="absolute right-3 p-1 rounded-full text-[#738078] hover:text-[#19251E] hover:bg-[#F7F9F7]"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Quick Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {(['All', 'Issues', 'Resolved', 'Events', 'People'] as const).map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap shrink-0 transition-all border ${
              activeFilter === filter
                ? 'bg-[#155638] text-white border-[#155638] shadow-xs'
                : 'bg-white text-[#738078] border-[#E7ECE8] hover:border-[#155638]/30 hover:text-[#19251E]'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* When Query is active OR quick filter applied, show results */}
      {query.trim() || activeFilter !== 'All' ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-[#738078]">
            <span>
              Found <strong>{searchResults.length}</strong> results for &ldquo;{query || activeFilter}&rdquo;
            </span>
            {query && (
              <button
                onClick={handleClearQuery}
                className="text-[#155638] font-semibold hover:underline"
              >
                Clear
              </button>
            )}
          </div>

          {searchResults.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-3xl border border-[#E7ECE8] space-y-2">
              <Search className="w-8 h-8 text-[#98A59E] mx-auto" />
              <p className="text-xs font-bold text-[#19251E]">
                No matching reports found
              </p>
              <p className="text-[11px] text-[#738078]">
                Try adjusting your search terms or exploring trending topics below.
              </p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {searchResults.map((post) => (
                <div
                  key={post.id}
                  onClick={() => setSelectedPostForDetail(post)}
                  className="bg-white rounded-2xl p-3 border border-[#E7ECE8] shadow-xs hover:border-[#155638]/40 transition-all cursor-pointer flex gap-3"
                >
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-16 h-16 rounded-xl object-cover shrink-0"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-[10px] font-bold text-[#155638] uppercase">
                        {post.category}
                      </span>
                      <span className="text-[10px] text-[#738078]">·</span>
                      <span className="text-[10px] text-[#738078] truncate">
                        {post.reporter.wardOrArea}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-[#19251E] truncate">
                      {post.title}
                    </h4>
                    <p className="text-[11px] text-[#738078] line-clamp-1 mt-0.5">
                      {post.description}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5 text-[10px] text-[#155638] font-semibold">
                      <span className="flex items-center gap-1">
                        <ThumbsUp className="w-3 h-3" /> {post.upvotes}
                      </span>
                      <span>·</span>
                      <span
                        className={
                          post.status === 'Resolved'
                            ? 'text-[#237A50]'
                            : 'text-amber-800'
                        }
                      >
                        {post.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : null}

      {/* Discovery Sections when not actively searching */}
      {(!query.trim() && activeFilter === 'All') && (
        <div className="space-y-4">
          {/* Recent Searches */}
          <div className="bg-white rounded-3xl p-4 border border-[#E7ECE8] shadow-xs">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-bold text-[#19251E] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#738078]" />
                Recent Searches
              </span>
              <button
                onClick={() => setRecentSearches([])}
                className="text-[10px] text-[#738078] hover:text-[#19251E]"
              >
                Clear all
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {recentSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => handleSelectRecent(term)}
                  className="px-3 py-1.5 rounded-full bg-[#F7F9F7] text-[11px] font-medium text-[#19251E] hover:bg-[#E4F5E9] hover:text-[#155638] border border-[#E7ECE8] transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>

          {/* Trending Community Topics */}
          <div className="bg-white rounded-3xl p-4 border border-[#E7ECE8] shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-[#19251E] flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-[#155638]" />
                Trending Around Ward 112
              </span>
              <span className="text-[10px] text-[#155638] font-bold">
                Live Pulse
              </span>
            </div>

            <div className="space-y-2">
              {trendingTopics.map((topic, idx) => (
                <button
                  key={topic.tag}
                  onClick={() => handleSelectTrending(topic.tag)}
                  className="w-full text-left p-2.5 rounded-2xl hover:bg-[#F7F9F7] border border-transparent hover:border-[#E7ECE8] transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-[#738078] tabular-nums">
                      {idx + 1}
                    </span>
                    <div>
                      <p className="text-xs font-bold text-[#19251E] group-hover:text-[#155638] transition-colors">
                        {topic.tag}
                      </p>
                      <span className="text-[10px] text-[#738078]">
                        {topic.category} · {topic.count}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#738078] group-hover:text-[#155638] group-hover:translate-x-0.5 transition-all" />
                </button>
              ))}
            </div>
          </div>

          {/* Popular Civic Categories */}
          <div className="bg-white rounded-3xl p-4 border border-[#E7ECE8] shadow-xs">
            <span className="text-xs font-bold text-[#19251E] block mb-3">
              Popular Civic Categories
            </span>
            <div className="grid grid-cols-2 gap-2">
              {popularCategories.map((cat) => (
                <button
                  key={cat.label}
                  onClick={() => {
                    setQuery(cat.label);
                  }}
                  className={`p-3 rounded-2xl border text-left transition-all hover:scale-101 ${cat.color}`}
                >
                  <span className="text-xs font-bold block">{cat.label}</span>
                  <span className="text-[10px] opacity-80 mt-0.5 block">
                    {cat.count} verified cases
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
