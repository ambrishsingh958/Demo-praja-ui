import React from 'react';
import { X, Copy, Share2, MessageCircle, Twitter, Users } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ShareModal: React.FC = () => {
  const { selectedPostForShare, setSelectedPostForShare, addToast } = useApp();

  if (!selectedPostForShare) return null;

  const shareUrl = `${window.location.origin}/post/${selectedPostForShare.id}`;
  const shareText = `Check out this civic issue on PrajaPulse: "${selectedPostForShare.title}" (${selectedPostForShare.category}) in ${selectedPostForShare.reporter.wardOrArea}.`;

  const handleCopyLink = () => {
    navigator.clipboard?.writeText?.(shareUrl);
    addToast('Link Copied to Clipboard!', 'Share this civic issue with your neighbors.', 'success');
    setSelectedPostForShare(null);
  };

  const handleWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`;
    window.open(url, '_blank');
    addToast('Opening WhatsApp', undefined, 'info');
    setSelectedPostForShare(null);
  };

  const handleTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank');
    addToast('Opening X / Twitter', undefined, 'info');
    setSelectedPostForShare(null);
  };

  const handleWardGroup = () => {
    addToast('Shared to Ward 112 Citizens Group', 'Your neighbors have been alerted.', 'success');
    setSelectedPostForShare(null);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 transition-all animate-in fade-in duration-200"
      onClick={() => setSelectedPostForShare(null)}
    >
      <div
        className="w-full max-w-sm bg-white rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl flex flex-col gap-4 animate-in slide-in-from-bottom duration-300 pb-safe"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-2 border-b border-[#E7ECE8]">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-[#155638]" />
            <h3 className="text-base font-bold text-[#19251E]">Share Civic Issue</h3>
          </div>
          <button
            onClick={() => setSelectedPostForShare(null)}
            className="p-1 rounded-full text-[#738078] hover:text-[#19251E] hover:bg-[#F7F9F7]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-3 bg-[#F7F9F7] rounded-xl border border-[#E7ECE8]">
          <span className="text-[10px] font-bold text-[#155638] uppercase tracking-wider">
            {selectedPostForShare.category} · {selectedPostForShare.status}
          </span>
          <p className="text-xs font-semibold text-[#19251E] line-clamp-2 mt-0.5">
            {selectedPostForShare.title}
          </p>
        </div>

        <div className="grid grid-cols-4 gap-2 py-2">
          {/* WhatsApp */}
          <button
            onClick={handleWhatsApp}
            className="flex flex-col items-center gap-1.5 p-2 rounded-2xl hover:bg-[#E4F5E9]/50 transition-colors group"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#25D366]/15 text-[#25D366] flex items-center justify-center group-hover:scale-105 transition-transform">
              <MessageCircle className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-medium text-[#19251E]">WhatsApp</span>
          </button>

          {/* Twitter / X */}
          <button
            onClick={handleTwitter}
            className="flex flex-col items-center gap-1.5 p-2 rounded-2xl hover:bg-slate-100 transition-colors group"
          >
            <div className="w-12 h-12 rounded-2xl bg-black/5 text-slate-800 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Twitter className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-medium text-[#19251E]">X / Tweet</span>
          </button>

          {/* Ward Community Group */}
          <button
            onClick={handleWardGroup}
            className="flex flex-col items-center gap-1.5 p-2 rounded-2xl hover:bg-[#E4F5E9]/50 transition-colors group"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#155638]/10 text-[#155638] flex items-center justify-center group-hover:scale-105 transition-transform">
              <Users className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-medium text-[#19251E]">Ward Group</span>
          </button>

          {/* Copy Link */}
          <button
            onClick={handleCopyLink}
            className="flex flex-col items-center gap-1.5 p-2 rounded-2xl hover:bg-[#F7F9F7] transition-colors group"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#738078]/10 text-[#19251E] flex items-center justify-center group-hover:scale-105 transition-transform">
              <Copy className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-medium text-[#19251E]">Copy Link</span>
          </button>
        </div>
      </div>
    </div>
  );
};
