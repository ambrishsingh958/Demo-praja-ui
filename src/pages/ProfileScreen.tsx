import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  MapPin,
  Calendar,
  Trophy,
  ShieldCheck,
  Edit3,
  Settings,
  Bookmark,
  FileText,
  Award,
  ChevronRight,
  LogOut,
  X,
  Check,
  Bell,
  Globe,
  Sliders,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CivicBadgeIcon, CivicLevelIcon } from '../components/common/CivicBadges';

export const ProfileScreen: React.FC = () => {
  const navigate = useNavigate();
  const { user, posts, badges, logout, updateUserProfile, setSelectedPostForDetail, addToast } = useApp();

  const [activeTab, setActiveTab] = useState<'reports' | 'saved' | 'badges'>('reports');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  // Edit fields
  const [editName, setEditName] = useState(user.name);
  const [editNeighborhood, setEditNeighborhood] = useState(user.neighborhood);
  const [editWard, setEditWard] = useState(user.wardNumber);

  // Settings fields
  const [pushEnabled, setPushEnabled] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [language, setLanguage] = useState<'English' | 'Kannada'>('English');

  const myReports = posts.filter(
    (p) => p.reporter.id === user.id || p.reporter.name === user.name
  );

  const bookmarkedPosts = posts.filter((p) => p.isBookmarked);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name: editName,
      neighborhood: editNeighborhood,
      wardNumber: editWard,
    });
    setShowEditModal(false);
  };

  const handleSaveSettings = () => {
    addToast('Preferences Saved', 'Language and notification choices updated.', 'success');
    setShowSettingsModal(false);
  };

  return (
    <div className="flex-1 flex flex-col px-3.5 sm:px-4 pt-3 pb-8 space-y-4">
      {/* Top Header Actions */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-[#155638] uppercase tracking-wider">
          Citizen Profile
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setShowEditModal(true)}
            className="p-2 rounded-full text-[#738078] hover:text-[#19251E] hover:bg-[#F7F9F7]"
            title="Edit Profile"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setShowSettingsModal(true)}
            className="p-2 rounded-full text-[#738078] hover:text-[#19251E] hover:bg-[#F7F9F7]"
            title="App Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Profile Header Card */}
      <div className="bg-white rounded-3xl p-5 border border-[#E7ECE8] shadow-xs space-y-4">
        <div className="flex items-start gap-4">
          <div className="relative">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-16 h-16 rounded-3xl object-cover border-2 border-white shadow-md"
            />
            <div className="absolute -bottom-1 -right-1 bg-[#155638] rounded-full p-1 text-white shadow-xs">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <h1 className="text-base sm:text-lg font-bold text-[#19251E] truncate">
                {user.name}
              </h1>
            </div>
            <p className="text-xs text-[#738078] flex items-center gap-1 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-[#155638]" />
              {user.neighborhood} ({user.wardNumber})
            </p>
            <p className="text-[11px] text-[#98A59E] flex items-center gap-1 mt-0.5">
              <Calendar className="w-3 h-3" />
              Member since {user.joinedDate}
            </p>
          </div>
        </div>

        {/* 4 Quantitative Profile Counters */}
        <div className="grid grid-cols-4 gap-1.5 pt-3 border-t border-[#E7ECE8] text-center">
          <div className="bg-[#F7F9F7] p-2 rounded-2xl">
            <span className="text-sm sm:text-base font-extrabold text-[#19251E] tabular-nums block">
              {user.stats.reportsCount}
            </span>
            <span className="text-[10px] text-[#738078]">Reports</span>
          </div>

          <div className="bg-[#F7F9F7] p-2 rounded-2xl">
            <span className="text-sm sm:text-base font-extrabold text-[#19251E] tabular-nums block">
              {user.stats.supportedCount}
            </span>
            <span className="text-[10px] text-[#738078]">Supported</span>
          </div>

          <div className="bg-[#F7F9F7] p-2 rounded-2xl">
            <span className="text-sm sm:text-base font-extrabold text-[#155638] tabular-nums block">
              {user.stats.resolvedCount}
            </span>
            <span className="text-[10px] text-[#738078]">Resolved</span>
          </div>

          <div className="bg-[#F7F9F7] p-2 rounded-2xl">
            <span className="text-sm sm:text-base font-extrabold text-[#F2A65A] tabular-nums block">
              {user.stats.volunteerHours}h
            </span>
            <span className="text-[10px] text-[#738078]">Volunteer</span>
          </div>
        </div>
      </div>

      {/* Rewards Status Banner */}
      <div
        onClick={() => navigate('/rewards')}
        className="bg-gradient-to-r from-[#155638] to-[#237A50] text-white rounded-3xl p-4 shadow-sm flex items-center justify-between cursor-pointer hover:shadow-md transition-all"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-[#F2A65A]">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-white">
                {user.level}
              </span>
              <span className="text-[10px] bg-[#F2A65A] text-[#19251E] font-bold px-1.5 py-0.2 rounded-md">
                {user.points} pts
              </span>
            </div>
            <p className="text-[11px] text-[#E4F5E9] mt-0.5">
              {user.nextLevelPoints - user.points} points until Gold Champion status
            </p>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-white/80" />
      </div>

      {/* Profile Tabs: My Reports | Bookmarks | Badges */}
      <div className="space-y-3">
        <div className="flex items-center p-1 bg-white rounded-2xl border border-[#E7ECE8]">
          <button
            onClick={() => setActiveTab('reports')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'reports'
                ? 'bg-[#155638] text-white shadow-xs'
                : 'text-[#738078] hover:text-[#19251E]'
            }`}
          >
            My Reports ({myReports.length})
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'saved'
                ? 'bg-[#155638] text-white shadow-xs'
                : 'text-[#738078] hover:text-[#19251E]'
            }`}
          >
            Bookmarks ({bookmarkedPosts.length})
          </button>
          <button
            onClick={() => setActiveTab('badges')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'badges'
                ? 'bg-[#155638] text-white shadow-xs'
                : 'text-[#738078] hover:text-[#19251E]'
            }`}
          >
            Badges
          </button>
        </div>

        {/* Tab 1: My Reports */}
        {activeTab === 'reports' && (
          <div className="space-y-2.5">
            {myReports.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-3xl border border-[#E7ECE8]">
                <p className="text-xs text-[#738078]">No reports filed yet.</p>
              </div>
            ) : (
              myReports.map((report) => (
                <div
                  key={report.id}
                  onClick={() => setSelectedPostForDetail(report)}
                  className="bg-white rounded-2xl p-3 border border-[#E7ECE8] hover:border-[#155638]/40 shadow-xs transition-all cursor-pointer flex items-center justify-between gap-3"
                >
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-bold text-[#155638] uppercase">
                      {report.category} · {report.formattedTime}
                    </span>
                    <h4 className="text-xs font-bold text-[#19251E] truncate">
                      {report.title}
                    </h4>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${
                      report.status === 'Resolved'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : 'bg-amber-50 text-amber-800 border-amber-200'
                    }`}
                  >
                    {report.status}
                  </span>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 2: Bookmarks */}
        {activeTab === 'saved' && (
          <div className="space-y-2.5">
            {bookmarkedPosts.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-3xl border border-[#E7ECE8]">
                <p className="text-xs text-[#738078]">No saved civic issues yet.</p>
              </div>
            ) : (
              bookmarkedPosts.map((post) => (
                <div
                  key={post.id}
                  onClick={() => setSelectedPostForDetail(post)}
                  className="bg-white rounded-2xl p-3 border border-[#E7ECE8] hover:border-[#155638]/40 shadow-xs transition-all cursor-pointer flex items-center justify-between gap-3"
                >
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-bold text-[#155638] uppercase">
                      {post.category} · {post.reporter.wardOrArea}
                    </span>
                    <h4 className="text-xs font-bold text-[#19251E] truncate">
                      {post.title}
                    </h4>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#738078] shrink-0" />
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 3: Badges & Level Milestone Showcase */}
        {activeTab === 'badges' && (
          <div className="space-y-3">
            {/* Current Tier Medal Box */}
            <div className="bg-[#FEFBF0] rounded-3xl p-4 border border-[#F6E6B8] flex items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-3">
                <CivicLevelIcon levelId="gold" size={56} />
                <div>
                  <span className="text-[10px] font-bold text-[#D69E2E] uppercase tracking-wider block">
                    Current Civic Tier
                  </span>
                  <h4 className="text-sm font-extrabold text-[#19251E]">
                    {user.level} Citizen
                  </h4>
                  <span className="text-[11px] text-[#738078]">
                    {user.points} points · 300 – 749 milestone
                  </span>
                </div>
              </div>
              <button
                onClick={() => navigate('/badges-certificates')}
                className="text-xs font-bold text-[#155638] bg-white px-3 py-1.5 rounded-xl border border-[#E7ECE8] hover:bg-[#E4F5E9] shadow-2xs"
              >
                All Milestones &rarr;
              </button>
            </div>

            {/* Badges Grid */}
            <div className="bg-white rounded-3xl p-4 border border-[#E7ECE8] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#19251E]">
                  Civic Achievement Badges
                </span>
                <button
                  onClick={() => navigate('/badges-certificates')}
                  className="text-xs font-bold text-[#155638] hover:underline"
                >
                  View certificates &rarr;
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {badges.map((badge) => (
                  <div
                    key={badge.id}
                    onClick={() => navigate('/badges-certificates')}
                    className={`p-3 rounded-2xl border text-center flex flex-col items-center cursor-pointer transition-all ${
                      badge.isUnlocked
                        ? 'bg-white border-[#E7ECE8] hover:border-[#155638]/40 shadow-2xs'
                        : 'bg-[#F7F9F7] border-[#E7ECE8] opacity-75'
                    }`}
                  >
                    <CivicBadgeIcon badgeId={badge.id} size={48} />
                    <span className="text-xs font-bold text-[#19251E] mt-1.5 leading-tight">
                      {badge.name}
                    </span>
                    <span className="text-[10px] text-[#738078] mt-0.5 line-clamp-1">
                      {badge.requirement}
                    </span>
                    <div className="mt-1.5">
                      {badge.isUnlocked ? (
                        <span className="text-[9px] font-bold text-[#155638] bg-[#E4F5E9] px-2 py-0.5 rounded-md">
                          Unlocked
                        </span>
                      ) : (
                        <span className="text-[9px] font-semibold text-[#738078]">
                          {badge.progress}% done
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setShowEditModal(false)}
        >
          <div
            className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-[#E7ECE8]">
              <h3 className="text-sm font-bold text-[#19251E]">
                Edit Profile
              </h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="p-1 rounded-full text-[#738078] hover:text-[#19251E]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-[#19251E] block mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full text-xs bg-[#F7F9F7] border border-[#E7ECE8] rounded-xl px-3 py-2 text-[#19251E]"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#19251E] block mb-1">
                  Neighborhood
                </label>
                <input
                  type="text"
                  required
                  value={editNeighborhood}
                  onChange={(e) => setEditNeighborhood(e.target.value)}
                  className="w-full text-xs bg-[#F7F9F7] border border-[#E7ECE8] rounded-xl px-3 py-2 text-[#19251E]"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#19251E] block mb-1">
                  Ward Number
                </label>
                <input
                  type="text"
                  required
                  value={editWard}
                  onChange={(e) => setEditWard(e.target.value)}
                  className="w-full text-xs bg-[#F7F9F7] border border-[#E7ECE8] rounded-xl px-3 py-2 text-[#19251E]"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-[#E7ECE8] text-xs font-semibold text-[#738078]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#155638] text-white text-xs font-bold hover:bg-[#237A50]"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettingsModal && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setShowSettingsModal(false)}
        >
          <div
            className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-[#E7ECE8]">
              <h3 className="text-sm font-bold text-[#19251E]">
                App Preferences
              </h3>
              <button
                onClick={() => setShowSettingsModal(false)}
                className="p-1 rounded-full text-[#738078] hover:text-[#19251E]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-2.5 bg-[#F7F9F7] rounded-xl">
                <div>
                  <span className="font-bold text-[#19251E] block">
                    Ward Dispatch Alerts
                  </span>
                  <span className="text-[10px] text-[#738078]">
                    Push notifications on critical emergencies
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={pushEnabled}
                  onChange={(e) => setPushEnabled(e.target.checked)}
                  className="w-4 h-4 accent-[#155638]"
                />
              </div>

              <div className="flex items-center justify-between p-2.5 bg-[#F7F9F7] rounded-xl">
                <div>
                  <span className="font-bold text-[#19251E] block">
                    Status SMS Notifications
                  </span>
                  <span className="text-[10px] text-[#738078]">
                    Updates when BBMP repairs your report
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={smsAlerts}
                  onChange={(e) => setSmsAlerts(e.target.checked)}
                  className="w-4 h-4 accent-[#155638]"
                />
              </div>

              <div className="p-2.5 bg-[#F7F9F7] rounded-xl space-y-1.5">
                <span className="font-bold text-[#19251E] block">
                  Language Preference
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setLanguage('English')}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                      language === 'English'
                        ? 'bg-[#155638] text-white border-[#155638]'
                        : 'bg-white text-[#738078] border-[#E7ECE8]'
                    }`}
                  >
                    English
                  </button>
                  <button
                    type="button"
                    onClick={() => setLanguage('Kannada')}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                      language === 'Kannada'
                        ? 'bg-[#155638] text-white border-[#155638]'
                        : 'bg-white text-[#738078] border-[#E7ECE8]'
                    }`}
                  >
                    ಕನ್ನಡ (Kannada)
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={handleSaveSettings}
              className="w-full py-2.5 bg-[#155638] text-white text-xs font-bold rounded-xl hover:bg-[#237A50]"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Sign Out Button */}
      <button
        onClick={() => {
          logout();
          navigate('/login');
        }}
        className="w-full py-3 rounded-2xl border border-rose-200 text-rose-700 bg-rose-50/50 hover:bg-rose-100 text-xs font-bold transition-colors flex items-center justify-center gap-2"
      >
        <LogOut className="w-4 h-4" />
        <span>Sign Out of Account</span>
      </button>
    </div>
  );
};
