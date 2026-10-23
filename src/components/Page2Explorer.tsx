import React, { useState } from 'react';
import { ComponentId, PageId } from '../types/circulation';
import { COMPONENTS_DATA } from '../data/circulationData';
import { CirculationDiagram } from './CirculationDiagram';
import { ArrowLeft, ArrowRight, CheckCircle2, Eye, EyeOff, Layers, ZoomIn } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface Page2ExplorerProps {
  onNavigate: (page: PageId) => void;
}

export const Page2Explorer: React.FC<Page2ExplorerProps> = ({ onNavigate }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [ultraFocusMode, setUltraFocusMode] = useState<boolean>(true); // Focus clearly and hide/fade others

  const activeComponent = COMPONENTS_DATA[currentStep - 1];

  const handlePrev = () => {
    if (currentStep === 1) {
      onNavigate('intro');
    } else {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentStep === COMPONENTS_DATA.length) {
      onNavigate('simulation');
    } else {
      setCurrentStep(prev => prev + 1);
      soundManager.playHeartbeat();
    }
  };

  const handleSelectStep = (stepNum: number) => {
    setCurrentStep(stepNum);
    soundManager.playHeartbeat();
  };

  return (
    <div className="w-full h-[calc(100vh-62px)] max-h-[720px] max-w-[1280px] aspect-[16/9] mx-auto p-2 sm:p-3 select-none flex flex-col justify-between overflow-hidden">
      
      {/* 16:9 Presentation Frame Container */}
      <div className="w-full h-full bg-white rounded-2xl border border-slate-200 shadow-lg p-3 sm:p-4 flex flex-col justify-between overflow-hidden relative">
        
        {/* Top Header: Title & Step Pills */}
        <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
              Trang 2 · Khám phá thành phần
            </span>
            <span className="text-xs font-bold text-slate-800">
              Thành phần {currentStep}/7: <span className="text-rose-600">{activeComponent.label}</span>
            </span>
          </div>

          {/* Stepper buttons */}
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
            {COMPONENTS_DATA.map((comp) => {
              const isActive = comp.stepNumber === currentStep;
              return (
                <button
                  key={comp.id}
                  onClick={() => handleSelectStep(comp.stepNumber)}
                  className={`h-6 px-2 text-[11px] font-bold rounded-md transition-all flex items-center gap-1 shrink-0 ${
                    isActive
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                  title={comp.name}
                >
                  <span>{comp.stepNumber}.</span>
                  <span>{comp.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2-ZONE SPLIT:
            LEFT: Chú thích thành phần (5 cols)
            RIGHT: Sơ đồ hệ mạch với hiệu ứng FOCUS làm mờ/ẩn các thành phần còn lại (7 cols)
        */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 flex-1 items-stretch min-h-0 overflow-hidden">
          
          {/* LEFT COLUMN: CHÚ THÍCH THÀNH PHẦN (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-slate-50/80 p-3 sm:p-4 rounded-xl border border-slate-200 overflow-y-auto scrollbar-none space-y-2">
            
            <div className="space-y-2.5">
              {/* Badge & Category */}
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-rose-600 uppercase tracking-wider">
                  THÀNH PHẦN {currentStep} TRÊN 7
                </span>
                <span className="text-[10px] font-semibold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                  {activeComponent.anatomicalType === 'heart' ? 'Cơ quan co bóp' :
                   activeComponent.anatomicalType === 'vessel' ? 'Hệ thống mạch máu' :
                   activeComponent.anatomicalType === 'capillary' ? 'Mạng lưới vi mạch' : 'Chu trình tuần hoàn'}
                </span>
              </div>

              {/* Title & Mandatory Description verbatim */}
              <div className="space-y-1">
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-tight">
                  {activeComponent.label}
                </h3>
                <div className="p-3 bg-white rounded-xl border border-rose-200/80 text-slate-800 font-semibold text-xs sm:text-sm leading-relaxed shadow-2xs">
                  “{activeComponent.fullDesc}”
                </div>
              </div>

              {/* Biological features */}
              <div className="space-y-1.5">
                <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Đặc điểm sinh học trọng tâm:
                </h4>
                <ul className="space-y-1 text-xs text-slate-700">
                  {activeComponent.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Focus mode hint */}
              <div className="p-2 bg-rose-50/70 rounded-lg border border-rose-100 text-[11px] text-rose-800 flex items-center justify-between">
                <span className="font-medium">Chế độ hiển thị:</span>
                <button
                  onClick={() => setUltraFocusMode(!ultraFocusMode)}
                  className="flex items-center gap-1 px-2 py-0.5 bg-white text-rose-700 font-bold rounded border border-rose-200 hover:bg-rose-50 transition-colors"
                >
                  {ultraFocusMode ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                  <span>{ultraFocusMode ? 'Đang ẩn mờ các phần khác' : 'Hiện mờ toàn bộ sơ đồ'}</span>
                </button>
              </div>
            </div>

            {/* Bottom Navigation Buttons: TRỞ LẠI & TIẾP THEO */}
            <div className="pt-2 border-t border-slate-200 flex items-center justify-between gap-2 shrink-0">
              <button
                onClick={handlePrev}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 rounded-lg border border-slate-200 transition-all shadow-2xs"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{currentStep === 1 ? 'Về Trang 1' : 'Trở lại'}</span>
              </button>

              <button
                onClick={handleNext}
                className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow-sm transition-all"
              >
                <span>{currentStep === COMPONENTS_DATA.length ? 'Sang Trang 3 (Mô phỏng) →' : 'Tiếp theo'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

          {/* RIGHT COLUMN: SƠ ĐỒ HỆ MẠCH CHUẨN SGK VỚI ULTRA FOCUS (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-2 flex flex-col items-center justify-center relative overflow-hidden min-h-0">
            
            {/* Focus Tag Banner */}
            <div className="absolute top-2 left-2 z-10 flex items-center gap-1.5 bg-rose-50/90 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-rose-200 shadow-2xs text-[11px] font-bold text-rose-700">
              <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping"></span>
              <span>Đang giới thiệu: <strong>{activeComponent.label}</strong></span>
            </div>

            <div className="absolute bottom-2 right-2 z-10 text-[9px] text-slate-400 font-medium">
              Sơ đồ chuẩn SGK · Các phần khác được làm mờ để tập trung
            </div>

            {/* Diagram */}
            <div className="w-full h-full max-h-[440px] flex items-center justify-center p-3">
              <CirculationDiagram
                focusedComponentId={activeComponent.id}
                onSelectComponent={(id) => {
                  const found = COMPONENTS_DATA.find(c => c.id === id);
                  if (found) handleSelectStep(found.stepNumber);
                }}
                showLabels={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
