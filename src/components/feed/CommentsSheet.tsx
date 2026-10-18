import React, { useState } from 'react';
import { X, Send, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CommentsSheet: React.FC = () => {
  const { selectedPostForComments, setSelectedPostForComments, addComment, user } = useApp();
  const [inputText, setInputText] = useState('');

  if (!selectedPostForComments) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    addComment(selectedPostForComments.id, inputText.trim());
    setInputText('');
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end justify-center transition-all animate-in fade-in duration-200"
      onClick={() => setSelectedPostForComments(null)}
    >
      <div
        className="w-full max-w-lg bg-white rounded-t-3xl shadow-2xl flex flex-col max-h-[85vh] animate-in slide-in-from-bottom duration-300 pb-safe"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Grab Handle */}
        <div className="w-10 h-1.5 bg-[#E7ECE8] rounded-full mx-auto mt-3 mb-1" />

        {/* Sheet Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-[#E7ECE8]">
          <div className="min-w-0 pr-2">
            <h3 className="text-base font-bold text-[#19251E] truncate">
              Community Discussion ({selectedPostForComments.commentsCount})
            </h3>
            <p className="text-xs text-[#738078] truncate">
              {selectedPostForComments.title}
            </p>
          </div>
          <button
            onClick={() => setSelectedPostForComments(null)}
            className="p-1.5 rounded-full text-[#738078] hover:text-[#19251E] hover:bg-[#F7F9F7] transition-colors"
            aria-label="Close comments"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Comments List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
          {selectedPostForComments.comments.length === 0 ? (
            <div className="py-12 text-center text-[#738078]">
              <p className="text-sm font-medium">No comments yet.</p>
              <p className="text-xs mt-1 text-[#98A59E]">
                Be the first to share an update, support, or context on this issue!
              </p>
            </div>
          ) : (
            selectedPostForComments.comments.map((comment) => (
              <div
                key={comment.id}
                className={`flex gap-3 text-sm p-3 rounded-2xl ${
                  comment.isOfficial
                    ? 'bg-[#E4F5E9]/60 border border-[#237A50]/20'
                    : 'bg-[#F7F9F7] border border-[#E7ECE8]'
                }`}
              >
                <img
                  src={comment.avatar}
                  alt={comment.author}
                  className="w-8 h-8 rounded-full object-cover shrink-0 mt-0.5"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-xs text-[#19251E]">
                        {comment.author}
                      </span>
                      {comment.isOfficial && (
                        <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-[#155638] bg-[#E4F5E9] px-1.5 py-0.2 rounded-md">
                          <ShieldCheck className="w-3 h-3" /> Official
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-[#98A59E] shrink-0">
                      {comment.time}
                    </span>
                  </div>
                  <p className="text-xs text-[#19251E] leading-relaxed break-words">
                    {comment.text}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Comment Input */}
        <form
          onSubmit={handleSubmit}
          className="p-3 border-t border-[#E7ECE8] bg-white flex items-center gap-2"
        >
          <img
            src={user.avatar}
            alt={user.name}
            className="w-8 h-8 rounded-full object-cover shrink-0"
          />
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Add to the neighborhood discussion..."
            className="flex-1 text-xs bg-[#F7F9F7] border border-[#E7ECE8] rounded-full px-4 py-2.5 focus:outline-none focus:border-[#155638] focus:bg-white transition-all text-[#19251E] placeholder:text-[#98A59E]"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="p-2.5 rounded-full bg-[#155638] text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#237A50] transition-colors shrink-0"
            aria-label="Send comment"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
