import React from 'react';
import { X, Info, Heart, Activity } from 'lucide-react';

interface LegendModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LegendModal: React.FC<LegendModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full p-6 text-slate-800"
        role="dialog"
        aria-modal="true"
        aria-labelledby="legend-title"
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Info className="w-5 h-5 text-indigo-600" />
            <h3 id="legend-title" className="text-lg font-bold text-slate-900">
              Quy ước màu sắc & Ký hiệu sinh học
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Đóng bảng quy ước"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 space-y-4 text-sm">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <p className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-600 inline-block"></span>
              Quy ước màu máu
            </p>
            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex items-start gap-2">
                <span className="w-3.5 h-3.5 rounded-full bg-rose-500 shrink-0 mt-0.5"></span>
                <div>
                  <strong className="text-slate-800">Màu đỏ:</strong> Máu giàu oxy (O₂), màu đỏ tươi. Đi từ phổi về tim trái và từ tim trái đến các cơ quan.
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-3.5 h-3.5 rounded-full bg-sky-600 shrink-0 mt-0.5"></span>
                <div>
                  <strong className="text-slate-800">Màu xanh dương:</strong> Máu nghèo oxy (O₂), màu đỏ thẫm (quy ước trực quan bằng màu xanh dương). Đi từ cơ quan về tim phải và từ tim phải lên phổi.
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-3.5 h-3.5 rounded-full bg-purple-500 shrink-0 mt-0.5"></span>
                <div>
                  <strong className="text-slate-800">Màu tím hồng:</strong> Mạng mao mạch, biểu thị vùng chuyển tiếp diễn ra trao đổi chất và khí.
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-100 text-xs">
            <p className="font-semibold text-amber-900 mb-1 flex items-center gap-2">
              <Activity className="w-4 h-4 text-amber-600" />
              Lưu ý khoa học quan trọng:
            </p>
            <p className="text-amber-800 leading-relaxed">
              Máu trong cơ thể người luôn có màu đỏ (đỏ tươi khi giàu O₂ và đỏ thẫm khi nghèo O₂). Màu xanh dương trong sách giáo khoa và mô phỏng chỉ là <strong>quy ước trực quan</strong> để học sinh dễ nhận biết hàm lượng oxy tương đối!
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-orange-50 rounded-xl border border-orange-100">
              <div className="flex items-center gap-1.5 font-bold text-orange-700 mb-1">
                <span className="px-1.5 py-0.5 bg-orange-500 text-white font-mono text-[10px] rounded">O₂</span>
                Khí Oxy (O₂)
              </div>
              <p className="text-slate-600">
                Từ phế nang → Máu (tại phổi).<br/>
                Từ máu → Tế bào (tại cơ quan).
              </p>
            </div>
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
              <div className="flex items-center gap-1.5 font-bold text-emerald-700 mb-1">
                <span className="px-1.5 py-0.5 bg-emerald-600 text-white font-mono text-[10px] rounded">CO₂</span>
                Khí Carbon dioxide & Rác thải
              </div>
              <p className="text-slate-600">
                Từ tế bào → Máu (tại cơ quan).<br/>
                Từ máu → Phế nang (tại phổi).
              </p>
            </div>
          </div>

          <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-100 text-xs">
            <p className="font-semibold text-blue-900 mb-1 flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-rose-500" />
              Quy ước vị trí giải phẫu:
            </p>
            <p className="text-blue-800">
              Trong sơ đồ giải phẫu, <strong>nửa tim phải</strong> của cơ thể người được thể hiện ở <strong>phía bên trái màn hình</strong> (góc nhìn đối diện người bệnh).
            </p>
          </div>
        </div>

        <div className="mt-5 pt-3 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors"
          >
            Đã hiểu, quay lại học tập
          </button>
        </div>
      </div>
    </div>
  );
};
