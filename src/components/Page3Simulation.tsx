import React, { useState, useEffect, useRef } from 'react';
import { PageId } from '../types/circulation';
import { SIMULATION_STAGES } from '../data/circulationData';
import { CirculationDiagram } from './CirculationDiagram';
import { MicroscopicExchangeView } from './MicroscopicExchangeView';
import { getCirculationPoint, STAGE_T_START } from '../utils/circulationPath';
import { soundManager } from '../utils/audio';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  RotateCcw,
  Gauge,
  ArrowLeft,
  Home,
  CheckCircle,
} from 'lucide-react';

interface Page3SimulationProps {
  onNavigate: (page: PageId) => void;
  onOpenQuiz: () => void;
}

export const Page3Simulation: React.FC<Page3SimulationProps> = ({ onNavigate, onOpenQuiz }) => {
  // Current active stage (1 to 9)
  const [currentStageId, setCurrentStageId] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  
  // Default speed: Rất chậm ("Tốc độ rất rất chậm để kịp đọc nội dung chú thích")
  const [speed, setSpeed] = useState<'slowest' | 'slow' | 'normal'>('slowest');
  const [showCompletionModal, setShowCompletionModal] = useState<boolean>(false);

  // Global time progress along the loop [0, 1]
  const progressRef = useRef<number>(0);
  const animFrameIdRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  // Single red blood cell tracking position
  const [rbcPositions, setRbcPositions] = useState<{ x: number; y: number; oxygenPercent: number; id: number }[]>([]);

  // Speed rates:
  // slowest: ~65 seconds for full loop (approx 7-8 seconds per stage to easily read annotations!)
  // slow: ~35 seconds
  // normal: ~18 seconds
  const speedMultipliers = {
    slowest: 0.015,
    slow: 0.03,
    normal: 0.06,
  };

  // Stage boundaries in terms of t matching circulationPath.ts
  const getStageFromT = (t: number): number => {
    const wrapped = ((t % 1) + 1) % 1;
    if (wrapped < 0.08) return 1;
    if (wrapped < 0.23) return 2;
    if (wrapped < 0.36) return 3;
    if (wrapped < 0.47) return 4;
    if (wrapped < 0.55) return 5;
    if (wrapped < 0.70) return 6;
    if (wrapped < 0.83) return 7;
    if (wrapped < 0.94) return 8;
    return 9;
  };

  useEffect(() => {
    // EXACTLY 1 single red blood cell traveling along the loop
    const animate = (time: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = time;
      }
      const delta = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;

      if (isPlaying) {
        const rate = speedMultipliers[speed];
        progressRef.current = (progressRef.current + delta * rate) % 1;

        // Auto-update stage in direct sync with the single RBC's location
        const autoStage = getStageFromT(progressRef.current);
        if (autoStage !== currentStageId) {
          if (autoStage === 1 || autoStage === 5) {
            soundManager.playHeartbeat();
          } else if (autoStage === 3 || autoStage === 7) {
            soundManager.playExchange();
          }
          setCurrentStageId(autoStage);

          if (autoStage === 1 && currentStageId === 9) {
            soundManager.playChime();
          }
        }
      }

      // Single RBC position
      const pt = getCirculationPoint(progressRef.current);
      setRbcPositions([
        {
          x: pt.x,
          y: pt.y,
          oxygenPercent: pt.oxygen,
          id: 1,
        },
      ]);

      animFrameIdRef.current = requestAnimationFrame(animate);
    };

    animFrameIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [isPlaying, speed, currentStageId]);

  // Jump to specific stage
  const jumpToStage = (stageId: number) => {
    setCurrentStageId(stageId);
    setShowCompletionModal(false);
    const targetT = STAGE_T_START[stageId] || 0;
    progressRef.current = targetT;
    if (stageId === 1 || stageId === 5) {
      soundManager.playHeartbeat();
    } else if (stageId === 3 || stageId === 7) {
      soundManager.playExchange();
    }
  };

  const handlePrevStage = () => {
    if (currentStageId === 1) {
      onNavigate('explorer');
    } else {
      jumpToStage(currentStageId - 1);
    }
  };

  const handleNextStage = () => {
    if (currentStageId === 9) {
      setShowCompletionModal(true);
      soundManager.playChime();
    } else {
      jumpToStage(currentStageId + 1);
    }
  };

  const handleRestart = () => {
    jumpToStage(1);
    setIsPlaying(true);
    setShowCompletionModal(false);
  };

  const currentStage = SIMULATION_STAGES[currentStageId - 1];

  return (
    <div className="w-full h-[calc(100vh-62px)] max-h-[720px] max-w-[1280px] aspect-[16/9] mx-auto p-2 sm:p-3 select-none flex flex-col justify-between overflow-hidden">
      
      {/* 16:9 Presentation Frame Container */}
      <div className="w-full h-full bg-white rounded-2xl border border-slate-200 shadow-lg p-3 sm:p-4 flex flex-col justify-between overflow-hidden relative">
        
        {/* Top Header: Compact Stage Switcher */}
        <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
              Trang 3 · Mô phỏng lưu thông
            </span>
            <span className="text-xs font-bold text-slate-800">
              Giai đoạn {currentStageId}/9: <span className="text-rose-600">{currentStage.label}</span>
            </span>
          </div>

          {/* Stepper Pills for 9 Stages */}
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
            {SIMULATION_STAGES.map((st) => {
              const isCurrent = st.id === currentStageId;
              const isPast = st.id < currentStageId;
              return (
                <button
                  key={st.id}
                  onClick={() => jumpToStage(st.id)}
                  className={`h-6 px-2 text-[11px] font-bold rounded-md transition-all flex items-center gap-1 shrink-0 ${
                    isCurrent
                      ? 'bg-rose-600 text-white shadow-xs'
                      : isPast
                      ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      : 'bg-slate-50 text-slate-400 hover:text-slate-600'
                  }`}
                  title={`${st.id}. ${st.label}`}
                >
                  <span>{st.id}</span>
                  <span className="hidden xl:inline">{st.label.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* MAIN BODY: 
            LEFT COLUMN: Chú thích về quá trình (Annotation Deck - Synchronized with RBC)
            RIGHT COLUMN: Sơ đồ hệ mạch chuẩn SGK với 1 tế bào hồng cầu di chuyển
        */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 flex-1 items-stretch min-h-0 overflow-hidden">
          
          {/* LEFT: Chú thích về quá trình (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-slate-50/80 p-3 sm:p-4 rounded-xl border border-slate-200 overflow-y-auto scrollbar-none space-y-2.5">
            
            <div className="space-y-2.5">
              {/* Header Badge */}
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-rose-600 uppercase tracking-wider">
                  GIAI ĐOẠN {currentStageId} TRÊN 9
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                  currentStage.bloodType === 'rich'
                    ? 'bg-rose-50 text-rose-700 border-rose-200'
                    : currentStage.bloodType === 'poor'
                    ? 'bg-sky-50 text-sky-700 border-sky-200'
                    : 'bg-purple-50 text-purple-700 border-purple-200'
                }`}>
                  {currentStage.oxygenLabel}
                </span>
              </div>

              {/* Title & Caption */}
              <div className="space-y-1">
                <h3 className="text-base sm:text-lg font-extrabold text-slate-900 leading-tight">
                  {currentStage.label}
                </h3>
                <div className="p-3 bg-white rounded-xl border border-rose-200/80 text-slate-800 font-semibold text-xs sm:text-sm leading-relaxed shadow-2xs">
                  “{currentStage.caption}”
                </div>
              </div>

              {/* Microscopic Inset for Stage 3 & 7 (Pulmonary gas exchange & Systemic nutrient exchange) */}
              {currentStageId === 3 && (
                <div className="animate-in fade-in duration-200">
                  <MicroscopicExchangeView type="pulmonary" />
                </div>
              )}

              {currentStageId === 7 && (
                <div className="animate-in fade-in duration-200">
                  <MicroscopicExchangeView type="systemic" />
                </div>
              )}
            </div>

            {/* CONTROLS (At bottom of left panel) */}
            <div className="pt-2 border-t border-slate-200 space-y-2 shrink-0">
              {/* Primary Buttons */}
              <div className="flex items-center justify-between gap-1.5">
                <button
                  onClick={handlePrevStage}
                  className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 rounded-lg border border-slate-200 transition-all"
                  title="Giai đoạn trước"
                >
                  <SkipBack className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Trước</span>
                </button>

                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold text-white rounded-lg shadow-sm transition-all ${
                    isPlaying
                      ? 'bg-amber-600 hover:bg-amber-700'
                      : 'bg-rose-600 hover:bg-rose-700'
                  }`}
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5 fill-white" /> : <Play className="w-3.5 h-3.5 fill-white" />}
                  <span>{isPlaying ? 'TẠM DỪNG' : 'PHÁT TIẾP'}</span>
                </button>

                <button
                  onClick={handleNextStage}
                  className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 rounded-lg border border-slate-200 transition-all"
                  title="Giai đoạn tiếp theo"
                >
                  <span className="hidden sm:inline">Sau</span>
                  <SkipForward className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={handleRestart}
                  className="p-1.5 text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-100 rounded-lg border border-slate-200 transition-all"
                  title="Xem lại từ đầu"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Speed Buttons with Default Rất Chậm */}
              <div className="flex items-center justify-between gap-1 pt-1 text-[11px]">
                <div className="flex items-center gap-1 bg-white p-0.5 rounded-lg border border-slate-200">
                  <span className="font-semibold text-slate-500 px-1 flex items-center gap-1 text-[10px]">
                    <Gauge className="w-3 h-3" />
                    Tốc độ:
                  </span>
                  <button
                    onClick={() => setSpeed('slowest')}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
                      speed === 'slowest' ? 'bg-rose-600 text-white shadow-2xs' : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    Rất chậm (Đọc)
                  </button>
                  <button
                    onClick={() => setSpeed('slow')}
                    className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition-all ${
                      speed === 'slow' ? 'bg-rose-600 text-white shadow-2xs' : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    Chậm
                  </button>
                  <button
                    onClick={() => setSpeed('normal')}
                    className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition-all ${
                      speed === 'normal' ? 'bg-rose-600 text-white shadow-2xs' : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    Chuẩn
                  </button>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onNavigate('explorer')}
                    className="flex items-center gap-1 px-2 py-1 text-[10px] font-semibold text-slate-600 hover:text-slate-900 bg-white rounded border border-slate-200"
                    title="Về Trang 2 khám phá"
                  >
                    <ArrowLeft className="w-3 h-3" />
                    <span>Khám phá</span>
                  </button>
                  <button
                    onClick={() => onNavigate('intro')}
                    className="p-1 text-slate-500 hover:text-slate-900 bg-white rounded border border-slate-200"
                    title="Về Trang chủ"
                  >
                    <Home className="w-3 h-3" />
                  </button>
                </div>
              </div>

            </div>

          </div>

          {/* RIGHT: Sơ đồ hệ mạch chuẩn SGK với đúng 1 tế bào hồng cầu di chuyển (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-2 flex flex-col items-center justify-center relative overflow-hidden min-h-0">
            
            {/* Status indicator top left */}
            <div className="absolute top-2 left-2 z-10 flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-slate-200 shadow-2xs text-[11px] font-bold text-slate-800">
              <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'}`}></span>
              <span>1 Tế bào hồng cầu đang qua: {currentStage.label}</span>
            </div>

            {/* Subtitle bottom right */}
            <div className="absolute bottom-2 right-2 z-10 text-[9px] text-slate-400 font-medium">
              Sơ đồ SGK · 1 Hồng cầu du hành · Mũi tên chỉ dòng chảy
            </div>

            {/* Exact SVG Circulation Diagram */}
            <div className="w-full h-full max-h-[440px] flex items-center justify-center p-3">
              <CirculationDiagram
                focusedStageId={currentStageId}
                isSimulating={isPlaying}
                rbcPositions={rbcPositions}
                showLabels={true}
              />
            </div>
          </div>

        </div>

      </div>

      {/* Completion Modal */}
      {showCompletionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-md w-full p-5 text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-lg font-extrabold text-slate-900">
                Hồng cầu đã hoàn tất một vòng chu du!
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Sẵn sàng cho chu trình tiếp theo. Máu đã hoàn thành trọn vẹn vòng tuần hoàn nhỏ (phổi) và vòng tuần hoàn lớn (các cơ quan).
              </p>
            </div>

            <div className="p-2.5 bg-slate-50 rounded-xl text-xs text-slate-600 text-left space-y-1">
              <p>✅ <strong>Vòng tuần hoàn nhỏ:</strong> Tâm thất phải → ĐM phổi → Mao mạch phổi → TM phổi → Tâm nhĩ trái.</p>
              <p>✅ <strong>Vòng tuần hoàn lớn:</strong> Tâm thất trái → ĐM chủ → Động mạch → Mao mạch cơ quan → Tĩnh mạch → TM chủ → Tâm nhĩ phải.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 pt-1">
              <button
                onClick={handleRestart}
                className="flex-1 py-2 px-3 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-md transition-colors"
              >
                Phát lại từ đầu
              </button>
              <button
                onClick={() => {
                  setShowCompletionModal(false);
                  onOpenQuiz();
                }}
                className="flex-1 py-2 px-3 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-xl border border-emerald-200 transition-colors"
              >
                Làm trắc nghiệm
              </button>
            </div>

            <button
              onClick={() => setShowCompletionModal(false)}
              className="text-[11px] text-slate-400 hover:text-slate-600 font-medium block mx-auto pt-0.5"
            >
              Đóng thông báo
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
