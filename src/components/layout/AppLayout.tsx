import React from 'react';
import { useLocation } from 'react-router-dom';
import { AppHeader } from './AppHeader';
import { BottomNavigation } from './BottomNavigation';
import { ToastContainer } from '../common/ToastContainer';
import { PostDetailModal } from '../feed/PostDetailModal';
import { CommentsSheet } from '../feed/CommentsSheet';
import { ShareModal } from '../feed/ShareModal';
import { CivicChatbot } from '../chat/CivicChatbot';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const isReelsPage = location.pathname === '/positive-impact';

  if (isLoginPage) {
    return (
      <div className="min-h-screen bg-[#F7F9F7] text-[#19251E] flex flex-col justify-center">
        <ToastContainer />
        {children}
        {/* Floating Chatbot present on every screen */}
        <CivicChatbot />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#EEF2EF] flex justify-center text-[#19251E]">
      {/* Phone container shell: max-w-lg on larger screens with subtle border and elevation */}
      <div className="w-full max-w-lg min-h-screen bg-[#F7F9F7] relative flex flex-col shadow-2xl border-x border-[#E7ECE8]">
        <ToastContainer />
        <PostDetailModal />
        <CommentsSheet />
        <ShareModal />

        {/* Top Header - hidden on full-screen reels for cinematic vertical experience, or shown compactly */}
        {!isReelsPage && <AppHeader />}

        {/* Main Content Area with bottom safe padding */}
        <main className={`flex-1 flex flex-col ${isReelsPage ? 'pb-16' : 'pb-24'}`}>
          {children}
        </main>

        {/* Fixed Bottom Navigation */}
        <BottomNavigation />

        {/* Floating Chatbot present on every screen in the bottom right corner */}
        <CivicChatbot isReelsPage={isReelsPage} />
      </div>
    </div>
  );
};
