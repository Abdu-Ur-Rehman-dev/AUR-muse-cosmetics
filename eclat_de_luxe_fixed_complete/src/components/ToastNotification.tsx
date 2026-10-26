import React, { useEffect } from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';

interface ToastNotificationProps {
  message: string | null;
  onClose: () => void;
}

export const ToastNotification: React.FC<ToastNotificationProps> = ({ message, onClose }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, 3500);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
      <div className="bg-[#38252B] text-[#FFF9F5] border border-[#C6A56B] px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 max-w-sm">
        <Sparkles className="w-4 h-4 text-[#C6A56B] shrink-0 animate-pulse" />
        <p className="text-xs font-medium font-sans leading-snug">{message}</p>
      </div>
    </div>
  );
};
