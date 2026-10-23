import React from 'react';
import { PageId } from '../types/circulation';
import { BookOpen, Volume2, VolumeX, HelpCircle, HeartPulse } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenLegend: () => void;
  onOpenQuiz: () => void;
  isAudioOn: boolean;
  onToggleAudio: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenLegend,
  onOpenQuiz,
  isAudioOn,
  onToggleAudio,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 py-3">
        {/* Zone 1: Single text element wordmark */}
        <button 
          onClick={() => onNavigate('intro')}
          className="flex items-center gap-2.5 text-left text-slate-900 hover:text-rose-600 transition-colors whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 rounded-lg p-0.5"
          title="Về trang giới thiệu"
        >
          <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center text-rose-600 border border-rose-200">
            <HeartPulse className="w-5 h-5 animate-pulse text-rose-600" />
          </div>
          <div>
            <span className="font-extrabold text-base sm:text-lg tracking-tight text-slate-900 block leading-tight">
              HÀNH TRÌNH CHU DU CỦA MÁU
            </span>
            <span className="text-[11px] text-slate-500 font-medium hidden sm:block leading-none">
              Khoa học tự nhiên Lớp 8 · Sinh học cơ thể người
            </span>
          </div>
        </button>

        {/* Zone 2: Concise single-line navigation links */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => onNavigate('intro')}
            className={`px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              currentPage === 'intro'
                ? 'bg-rose-50 text-rose-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Trang 1: Giới thiệu
          </button>
          <button
            onClick={() => onNavigate('explorer')}
            className={`px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              currentPage === 'explorer'
                ? 'bg-rose-50 text-rose-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Trang 2: Khám phá thành phần
          </button>
          <button
            onClick={() => onNavigate('simulation')}
            className={`px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              currentPage === 'simulation'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Trang 3: Mô phỏng lưu thông
          </button>
        </nav>

        {/* Zone 3: Actions (Quiz, Legend, Audio) */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            onClick={onOpenQuiz}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors whitespace-nowrap shrink-0"
            title="Kiểm tra kiến thức nhanh"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Trắc nghiệm</span>
          </button>

          <button
            onClick={onOpenLegend}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0"
            title="Xem bảng chú giải ký hiệu và màu sắc"
          >
            <HelpCircle className="w-3.5 h-3.5 text-indigo-600" />
            <span className="hidden sm:inline">Quy ước màu</span>
          </button>

          <button
            onClick={onToggleAudio}
            className={`p-1.5 rounded-lg border transition-colors whitespace-nowrap shrink-0 ${
              isAudioOn
                ? 'bg-rose-50 text-rose-600 border-rose-200 hover:bg-rose-100'
                : 'bg-slate-50 text-slate-400 border-slate-200 hover:text-slate-700 hover:bg-slate-100'
            }`}
            title={isAudioOn ? 'Tắt âm thanh hiệu ứng' : 'Bật âm thanh hiệu ứng (co bóp tim, trao đổi chất)'}
            aria-label={isAudioOn ? 'Mute audio' : 'Unmute audio'}
          >
            {isAudioOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
