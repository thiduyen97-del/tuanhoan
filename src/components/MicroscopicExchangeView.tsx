import React from 'react';
import { ArrowRight, Wind, Sparkles } from 'lucide-react';

interface MicroscopicExchangeViewProps {
  type: 'pulmonary' | 'systemic';
}

export const MicroscopicExchangeView: React.FC<MicroscopicExchangeViewProps> = ({ type }) => {
  if (type === 'pulmonary') {
    return (
      <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-5 shadow-lg border border-slate-800">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
            <h4 className="text-sm font-bold text-cyan-300">
              Kính hiển vi phóng đại: Mao mạch phổi & Phế nang
            </h4>
          </div>
          <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800">
            Độ phóng đại: ×20,000
          </span>
        </div>

        {/* Interactive Alveoli vs Capillary Diagram */}
        <div className="relative bg-slate-950 rounded-xl p-3 border border-slate-800 overflow-hidden">
          <div className="grid grid-cols-2 gap-2 text-center text-xs font-semibold mb-2">
            <div className="bg-sky-950/60 text-sky-300 py-1 px-2 rounded-lg border border-sky-800/60">
              LÒNG PHẾ NANG (Không khí hít vào)
            </div>
            <div className="bg-rose-950/60 text-rose-300 py-1 px-2 rounded-lg border border-rose-800/60">
              LÒNG MAO MẠCH PHỔI (Dòng máu)
            </div>
          </div>

          <svg viewBox="0 0 460 170" className="w-full h-auto">
            {/* Background zones */}
            <rect x="0" y="0" width="220" height="170" fill="#0c4a6e" fillOpacity="0.25" rx="8" />
            <rect x="240" y="0" width="220" height="170" fill="#881337" fillOpacity="0.25" rx="8" />

            {/* Alveolar wall */}
            <path d="M 220 0 L 220 170" stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="4 2" />
            <path d="M 240 0 L 240 170" stroke="#fb7185" strokeWidth="2.5" />

            {/* Intercellular diffusion space */}
            <rect x="220" y="0" width="20" height="170" fill="#1e293b" fillOpacity="0.6" />
            <text x="230" y="88" fill="#94a3b8" fontSize="8" textAnchor="middle" transform="rotate(-90 230 88)">
              MÀNG PHẾ NANG - MAO MẠCH
            </text>

            {/* Left side: In the Alveolus */}
            <circle cx="60" cy="50" r="16" fill="#0284c7" fillOpacity="0.4" />
            <text x="60" y="54" fill="#bae6fd" fontSize="10" fontWeight="bold" textAnchor="middle">O₂</text>
            
            <circle cx="140" cy="40" r="14" fill="#0284c7" fillOpacity="0.4" />
            <text x="140" y="44" fill="#bae6fd" fontSize="10" fontWeight="bold" textAnchor="middle">O₂</text>

            <circle cx="100" cy="115" r="15" fill="#0284c7" fillOpacity="0.4" />
            <text x="100" y="119" fill="#bae6fd" fontSize="10" fontWeight="bold" textAnchor="middle">O₂</text>

            {/* Right side: Capillary with Blood flow */}
            {/* RBC moving and turning from blue-ish to red */}
            {/* Deox RBC */}
            <g transform="translate(350, 30)">
              <ellipse cx="0" cy="0" rx="26" ry="17" fill="#2563eb" stroke="#60a5fa" strokeWidth="1.5" />
              <ellipse cx="0" cy="0" rx="14" ry="9" fill="#1d4ed8" />
              <text x="0" y="3" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">Hồng cầu</text>
              <text x="0" y="12" fill="#93c5fd" fontSize="7" textAnchor="middle">Nghèo O₂</text>
            </g>

            {/* Transition RBC */}
            <g transform="translate(350, 85)">
              <ellipse cx="0" cy="0" rx="26" ry="17" fill="#9333ea" stroke="#c084fc" strokeWidth="1.5" />
              <ellipse cx="0" cy="0" rx="14" ry="9" fill="#7e22ce" />
              <text x="0" y="3" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">Hồng cầu</text>
              <text x="0" y="12" fill="#f5d0fe" fontSize="7" textAnchor="middle">Nhận O₂</text>
            </g>

            {/* Oxygenated RBC */}
            <g transform="translate(350, 140)">
              <ellipse cx="0" cy="0" rx="26" ry="17" fill="#dc2626" stroke="#f87171" strokeWidth="1.5" />
              <ellipse cx="0" cy="0" rx="14" ry="9" fill="#b91c1c" />
              <text x="0" y="3" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">Hồng cầu</text>
              <text x="0" y="12" fill="#fecaca" fontSize="7" textAnchor="middle">Giàu O₂</text>
            </g>

            {/* DIFFUSION ARROWS: STRICTLY O2: Alveolus -> Blood */}
            <g>
              <defs>
                <marker id="arrow-o2" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 8 5 L 0 9 z" fill="#f59e0b" />
                </marker>
                <marker id="arrow-co2" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 8 5 L 0 9 z" fill="#10b981" />
                </marker>
              </defs>

              {/* O2 diffusion arrow 1 */}
              <line x1="160" y1="45" x2="310" y2="70" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrow-o2)" strokeDasharray="5 3" className="animate-pulse" />
              <rect x="200" y="44" width="46" height="18" rx="4" fill="#78350f" fillOpacity="0.9" />
              <text x="223" y="56" fill="#fde68a" fontSize="9" fontWeight="bold" textAnchor="middle">O₂ vào</text>

              {/* O2 diffusion arrow 2 */}
              <line x1="125" y1="115" x2="310" y2="125" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrow-o2)" strokeDasharray="5 3" className="animate-pulse" />
              <rect x="200" y="112" width="46" height="18" rx="4" fill="#78350f" fillOpacity="0.9" />
              <text x="223" y="124" fill="#fde68a" fontSize="9" fontWeight="bold" textAnchor="middle">O₂ vào</text>

              {/* CO2 diffusion arrow: Blood -> Alveolus (Strictly from Blood to Alveoli!) */}
              <line x1="315" y1="40" x2="165" y2="75" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrow-co2)" strokeDasharray="5 3" className="animate-pulse" />
              <rect x="200" y="72" width="52" height="18" rx="4" fill="#064e3b" fillOpacity="0.9" />
              <text x="226" y="84" fill="#a7f3d0" fontSize="9" fontWeight="bold" textAnchor="middle">CO₂ ra</text>
            </g>
          </svg>

          {/* Status summary banner */}
          <div className="mt-2.5 p-2.5 bg-gradient-to-r from-sky-950/70 via-indigo-950/70 to-rose-950/70 rounded-lg border border-slate-700 text-xs text-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-rose-500"></span>
              <span>Trạng thái: <strong>Máu được bổ sung O₂</strong></span>
            </div>
            <div className="text-[11px] text-slate-300 font-mono">
              Chiều trao đổi: O₂ → Máu · CO₂ → Phế nang
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Systemic Capillaries exchange
  return (
    <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-5 shadow-lg border border-slate-800">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-400 animate-ping"></span>
          <h4 className="text-sm font-bold text-rose-300">
            Kính hiển vi phóng đại: Mao mạch cơ quan & Tế bào mô
          </h4>
        </div>
        <span className="text-[11px] font-mono text-rose-400 bg-rose-950/80 px-2 py-0.5 rounded border border-rose-800">
          Độ phóng đại: ×20,000
        </span>
      </div>

      <div className="relative bg-slate-950 rounded-xl p-3 border border-slate-800 overflow-hidden">
        <div className="grid grid-cols-2 gap-2 text-center text-xs font-semibold mb-2">
          <div className="bg-rose-950/60 text-rose-300 py-1 px-2 rounded-lg border border-rose-800/60">
            LÒNG MAO MẠCH CƠ QUAN
          </div>
          <div className="bg-amber-950/60 text-amber-300 py-1 px-2 rounded-lg border border-amber-800/60">
            DỊCH MÔ & TẾ BÀO CƠ THỂ
          </div>
        </div>

        <svg viewBox="0 0 460 170" className="w-full h-auto">
          {/* Background zones */}
          <rect x="0" y="0" width="220" height="170" fill="#881337" fillOpacity="0.25" rx="8" />
          <rect x="240" y="0" width="220" height="170" fill="#78350f" fillOpacity="0.2" rx="8" />

          {/* Capillary endothelial barrier */}
          <path d="M 220 0 L 220 170" stroke="#f43f5e" strokeWidth="2.5" />
          <path d="M 240 0 L 240 170" stroke="#d97706" strokeWidth="2.5" strokeDasharray="3 2" />

          {/* Interstitial space */}
          <rect x="220" y="0" width="20" height="170" fill="#1e293b" fillOpacity="0.6" />
          <text x="230" y="88" fill="#94a3b8" fontSize="8" textAnchor="middle" transform="rotate(-90 230 88)">
            THÀNH MAO MẠCH & DỊCH MÔ
          </text>

          {/* Left: Capillary blood flow with RBC changing red -> purple -> blue */}
          <g transform="translate(100, 30)">
            <ellipse cx="0" cy="0" rx="26" ry="17" fill="#dc2626" stroke="#f87171" strokeWidth="1.5" />
            <ellipse cx="0" cy="0" rx="14" ry="9" fill="#b91c1c" />
            <text x="0" y="3" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">Hồng cầu</text>
            <text x="0" y="12" fill="#fecaca" fontSize="7" textAnchor="middle">Giàu O₂</text>
          </g>

          <g transform="translate(100, 85)">
            <ellipse cx="0" cy="0" rx="26" ry="17" fill="#9333ea" stroke="#c084fc" strokeWidth="1.5" />
            <ellipse cx="0" cy="0" rx="14" ry="9" fill="#7e22ce" />
            <text x="0" y="3" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">Hồng cầu</text>
            <text x="0" y="12" fill="#f5d0fe" fontSize="7" textAnchor="middle">Nhường O₂</text>
          </g>

          <g transform="translate(100, 140)">
            <ellipse cx="0" cy="0" rx="26" ry="17" fill="#2563eb" stroke="#60a5fa" strokeWidth="1.5" />
            <ellipse cx="0" cy="0" rx="14" ry="9" fill="#1d4ed8" />
            <text x="0" y="3" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">Hồng cầu</text>
            <text x="0" y="12" fill="#93c5fd" fontSize="7" textAnchor="middle">Nghèo O₂</text>
          </g>

          {/* Right: Tissue Cells */}
          {/* Cell 1 */}
          <g transform="translate(340, 45)">
            <rect x="-60" y="-25" width="120" height="50" rx="12" fill="#451a03" stroke="#f59e0b" strokeWidth="1.5" />
            <circle cx="15" cy="0" r="10" fill="#b45309" />
            <text x="-15" y="-5" fill="#fde68a" fontSize="9" fontWeight="bold">Tế bào mô</text>
            <text x="-15" y="8" fill="#fef3c7" fontSize="8">Hô hấp tế bào</text>
          </g>

          {/* Cell 2 */}
          <g transform="translate(340, 125)">
            <rect x="-60" y="-25" width="120" height="50" rx="12" fill="#451a03" stroke="#f59e0b" strokeWidth="1.5" />
            <circle cx="-15" cy="0" r="10" fill="#b45309" />
            <text x="10" y="-5" fill="#fde68a" fontSize="9" fontWeight="bold">Tế bào mô</text>
            <text x="10" y="8" fill="#fef3c7" fontSize="8">Sinh năng lượng</text>
          </g>

          {/* EXCHANGE ARROWS:
              Máu -> Tế bào: O2 & Chất dinh dưỡng
              Tế bào -> Máu: CO2 & Nhiều chất thải */}
          <g>
            <defs>
              <marker id="arrow-o2-tissue" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 8 5 L 0 9 z" fill="#f59e0b" />
              </marker>
              <marker id="arrow-waste-tissue" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 8 5 L 0 9 z" fill="#10b981" />
              </marker>
            </defs>

            {/* O2 & Nutrient arrow: Máu -> Tế bào */}
            <line x1="145" y1="40" x2="275" y2="40" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrow-o2-tissue)" strokeDasharray="5 3" className="animate-pulse" />
            <rect x="180" y="16" width="94" height="18" rx="4" fill="#78350f" fillOpacity="0.9" />
            <text x="227" y="28" fill="#fde68a" fontSize="8" fontWeight="bold" textAnchor="middle">O₂ & Dinh dưỡng →</text>

            {/* CO2 & Waste arrow: Tế bào -> Máu */}
            <line x1="280" y1="95" x2="145" y2="95" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrow-waste-tissue)" strokeDasharray="5 3" className="animate-pulse" />
            <rect x="180" y="72" width="96" height="18" rx="4" fill="#064e3b" fillOpacity="0.9" />
            <text x="228" y="84" fill="#a7f3d0" fontSize="8" fontWeight="bold" textAnchor="middle">← CO₂ & Chất thải</text>
          </g>
        </svg>

        <div className="mt-2.5 p-2.5 bg-gradient-to-r from-rose-950/70 via-purple-950/70 to-sky-950/70 rounded-lg border border-slate-700 text-xs text-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 font-medium">
            <span className="w-2 h-2 rounded-full bg-sky-400"></span>
            <span>Trạng thái: <strong>Máu nhường O₂ & nhận CO₂</strong></span>
          </div>
          <div className="text-[11px] text-slate-300 font-mono">
            Máu chuyển từ Đỏ tươi → Đỏ thẫm (Quy ước xanh dương)
          </div>
        </div>
      </div>
    </div>
  );
};
