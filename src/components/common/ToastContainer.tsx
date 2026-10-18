import React from 'react';
import { CheckCircle2, Sparkles, Info, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm px-4 pointer-events-none flex flex-col gap-2">
      {toasts.map((toast) => {
        const isReward = toast.type === 'reward';
        const isInfo = toast.type === 'info';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-2xl shadow-xl border backdrop-blur-md transition-all animate-in fade-in slide-in-from-top-4 duration-200 ${
              isReward
                ? 'bg-[#155638] text-white border-[#237A50] shadow-[#155638]/25'
                : isInfo
                ? 'bg-[#19251E] text-white border-[#738078]/30 shadow-black/20'
                : 'bg-white text-[#19251E] border-[#E7ECE8] shadow-black/10'
            }`}
            role="status"
            aria-live="polite"
          >
            <div className="shrink-0 mt-0.5">
              {isReward ? (
                <div className="w-6 h-6 rounded-full bg-[#F2A65A] text-[#155638] flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5 fill-current" />
                </div>
              ) : isInfo ? (
                <div className="w-6 h-6 rounded-full bg-white/10 text-white flex items-center justify-center">
                  <Info className="w-3.5 h-3.5" />
                </div>
              ) : (
                <div className="w-6 h-6 rounded-full bg-[#E4F5E9] text-[#155638] flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0 pr-1">
              <p
                className={`text-xs font-bold leading-tight ${
                  isReward || isInfo ? 'text-white' : 'text-[#19251E]'
                }`}
              >
                {toast.title}
              </p>
              {toast.description && (
                <p
                  className={`text-[11px] mt-0.5 leading-snug line-clamp-2 ${
                    isReward ? 'text-[#E4F5E9]' : isInfo ? 'text-slate-300' : 'text-[#738078]'
                  }`}
                >
                  {toast.description}
                </p>
              )}
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className={`shrink-0 p-1 rounded-full hover:bg-black/10 transition-colors ${
                isReward || isInfo ? 'text-white/70 hover:text-white' : 'text-[#738078] hover:text-[#19251E]'
              }`}
              aria-label="Dismiss toast"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
