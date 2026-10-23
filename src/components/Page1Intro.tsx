import React, { useState } from 'react';
import { ArrowRight, Compass, Heart, Wind, ShieldCheck, Sparkles } from 'lucide-react';
import { APP_INFO } from '../data/circulationData';
import { soundManager } from '../utils/audio';

interface Page1IntroProps {
  onStart: () => void;
}

export const Page1Intro: React.FC<Page1IntroProps> = ({ onStart }) => {
  const [isDeparting, setIsDeparting] = useState(false);

  const handleStartJourney = () => {
    setIsDeparting(true);
    soundManager.playHeartbeat();
    setTimeout(() => {
      onStart();
    }, 450);
  };

  return (
    <div className="w-full h-[calc(100vh-62px)] max-h-[720px] max-w-[1280px] aspect-[16/9] mx-auto p-2 sm:p-3 select-none flex flex-col justify-between overflow-hidden">
      {/* 16:9 Educational Stage Container */}
      <div className="w-full h-full bg-white rounded-2xl shadow-lg border border-slate-200 p-4 sm:p-6 lg:p-8 relative overflow-hidden flex flex-col justify-between">
        
        {/* Soft background ambient gradient rings */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-rose-50 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-sky-50 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center flex-1 min-h-0">
          
          {/* Left / Hero Prose Section (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-3.5 text-left">
            <div className="inline-flex items-center gap-2 text-[11px] font-semibold text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200 w-fit">
              <Compass className="w-3.5 h-3.5" />
              <span>Khoa học tự nhiên Lớp 8 · Sinh học người</span>
            </div>

            {/* MANDATORY EXACT TITLE */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-[1.18] text-balance">
              HÀNH TRÌNH CHU DU CỦA MÁU KHẮP CƠ THỂ NGƯỜI
            </h1>

            {/* MANDATORY EXACT INTRO TEXT */}
            <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-200 shadow-2xs">
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                {APP_INFO.introParagraph}
              </p>
            </div>

            {/* Optional Lead Prompt Question */}
            <p className="text-xs text-slate-500 font-medium italic">
              “{APP_INFO.promptQuestion}”
            </p>

            {/* Core highlights */}
            <div className="grid grid-cols-3 gap-2 pt-0.5 text-center">
              <div className="p-2 bg-rose-50/60 rounded-lg border border-rose-100">
                <span className="text-[11px] font-bold text-rose-800 block">4 Ngăn Tim</span>
                <span className="text-[10px] text-slate-500">2 Nhĩ · 2 Thất</span>
              </div>
              <div className="p-2 bg-sky-50/60 rounded-lg border border-sky-100">
                <span className="text-[11px] font-bold text-sky-800 block">2 Vòng Tuần Hoàn</span>
                <span className="text-[10px] text-slate-500">Vòng nhỏ & lớn</span>
              </div>
              <div className="p-2 bg-purple-50/60 rounded-lg border border-purple-100">
                <span className="text-[11px] font-bold text-purple-800 block">Mao Mạch Vi Diệu</span>
                <span className="text-[10px] text-slate-500">Trao đổi khí & chất</span>
              </div>
            </div>

            {/* MANDATORY START BUTTON */}
            <div className="pt-1">
              <button
                onClick={handleStartJourney}
                disabled={isDeparting}
                className={`group relative inline-flex items-center justify-center gap-2.5 px-6 py-3 text-sm sm:text-base font-bold text-white bg-rose-600 hover:bg-rose-700 active:scale-[0.98] rounded-xl shadow-md shadow-rose-600/25 transition-all focus:outline-none focus-visible:ring-4 focus-visible:ring-rose-400 ${
                  isDeparting ? 'opacity-90 scale-95' : ''
                }`}
              >
                <span>BẮT ĐẦU HÀNH TRÌNH</span>
                <ArrowRight className={`w-4 h-4 transition-transform duration-200 ${isDeparting ? 'translate-x-3' : 'group-hover:translate-x-1'}`} />
              </button>
            </div>
          </div>

          {/* Right / Center Animated Circulatory Artwork (7 cols) */}
          <div className="lg:col-span-6 flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-square bg-gradient-to-b from-slate-50 to-white rounded-3xl border border-slate-200/90 p-4 sm:p-6 shadow-inner flex flex-col items-center justify-between">
              
              {/* Cute top illustration: Lungs & Alveoli */}
              <div className="w-full flex items-center justify-around px-4">
                <div className="flex items-center gap-2 p-2 bg-sky-50 rounded-xl border border-sky-200/80 shadow-2xs">
                  <span className="text-xl">🫁</span>
                  <div className="text-left text-[11px]">
                    <span className="font-bold text-sky-900 block leading-none">Phổi (Lungs)</span>
                    <span className="text-sky-600 text-[10px]">Nhận O₂ · Thải CO₂</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 rounded-lg border border-amber-200 text-amber-800 text-[11px] font-bold animate-pulse">
                  <Wind className="w-3.5 h-3.5" />
                  <span>Trao đổi khí</span>
                </div>
              </div>

              {/* Central Interactive Heart Character */}
              <div className="relative my-auto flex flex-col items-center">
                {/* Looping circulatory flow lines */}
                <svg className="w-64 h-48 pointer-events-none absolute -inset-x-8 -inset-y-4" viewBox="0 0 300 220">
                  {/* Top loop (Pulmonary: Blue up to Lungs, Red back) */}
                  <path
                    d="M 125 100 C 125 40, 80 20, 150 20 C 220 20, 175 40, 175 100"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="5"
                    strokeDasharray="6 4"
                    className="animate-[dash_12s_linear_infinite]"
                  />
                  {/* Bottom loop (Systemic: Red down to Cells, Blue back) */}
                  <path
                    d="M 175 110 C 175 180, 230 200, 150 200 C 70 200, 125 180, 125 110"
                    fill="none"
                    stroke="#f43f5e"
                    strokeWidth="5"
                    strokeDasharray="6 4"
                    className="animate-[dash_12s_linear_infinite]"
                  />
                </svg>

                {/* Friendly beating Heart */}
                <div className="relative w-28 h-28 rounded-full bg-gradient-to-tr from-rose-500 to-rose-400 shadow-xl flex items-center justify-center animate-[pulse_2s_ease-in-out_infinite] border-4 border-white">
                  <Heart className="w-14 h-14 text-white fill-white drop-shadow-md" />
                  
                  {/* Cute mascot eyes */}
                  <div className="absolute top-8 flex items-center gap-4">
                    <span className="w-2.5 h-2.5 bg-slate-900 rounded-full"></span>
                    <span className="w-2.5 h-2.5 bg-slate-900 rounded-full"></span>
                  </div>
                  {/* Happy mouth */}
                  <div className="absolute top-12 w-3.5 h-2 border-b-2 border-slate-900 rounded-full"></div>
                </div>

                {/* Floating Erythrocyte Adventurer mascot */}
                <div className={`mt-3 flex items-center gap-2 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-md border border-rose-200 transition-transform duration-300 ${isDeparting ? 'translate-x-8 opacity-0' : ''}`}>
                  <div className="w-6 h-6 rounded-full bg-rose-600 flex items-center justify-center text-white text-[10px] font-bold">
                    O₂
                  </div>
                  <span className="text-xs font-bold text-slate-800">
                    Bác Hồng Cầu thám hiểm
                  </span>
                </div>
              </div>

              {/* Bottom illustration: Body cells and tissues */}
              <div className="w-full flex items-center justify-around px-4">
                <div className="flex items-center gap-2 p-2 bg-rose-50 rounded-xl border border-rose-200/80 shadow-2xs">
                  <span className="text-xl">🧬</span>
                  <div className="text-left text-[11px]">
                    <span className="font-bold text-rose-900 block leading-none">Tế bào mô (Tissues)</span>
                    <span className="text-rose-600 text-[10px]">Nhận O₂ & Dinh dưỡng</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 rounded-lg border border-emerald-200 text-emerald-800 text-[11px] font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Nuôi dưỡng tế bào</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
