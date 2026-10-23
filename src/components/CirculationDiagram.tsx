import React from 'react';
import { ComponentId } from '../types/circulation';

interface CirculationDiagramProps {
  focusedComponentId?: ComponentId | null;
  focusedStageId?: number | null;
  onSelectComponent?: (id: ComponentId) => void;
  isSimulating?: boolean;
  rbcPositions?: { x: number; y: number; oxygenPercent: number; id: number }[];
  showLabels?: boolean;
}

export const CirculationDiagram: React.FC<CirculationDiagramProps> = ({
  focusedComponentId = null,
  focusedStageId = null,
  onSelectComponent,
  isSimulating = false,
  rbcPositions = [],
  showLabels = true,
}) => {
  // If focusedComponentId is set (Page 2), we want ultra-high focus:
  // ONLY show the focused component clearly, while other components are nearly invisible (opacity ~0.08)!
  const hasFocus = focusedComponentId !== null;

  const isHeartActive =
    !hasFocus ||
    focusedComponentId === 'heart' ||
    focusedStageId === 1 ||
    focusedStageId === 5 ||
    focusedStageId === 9;

  const isArteryActive =
    !hasFocus ||
    focusedComponentId === 'artery' ||
    focusedComponentId === 'systemic-circuit' ||
    focusedStageId === 2 ||
    focusedStageId === 6;

  const isVeinActive =
    !hasFocus ||
    focusedComponentId === 'vein' ||
    focusedComponentId === 'pulmonary-circuit' ||
    focusedStageId === 4 ||
    focusedStageId === 8;

  const isPulmonaryCapActive =
    !hasFocus ||
    focusedComponentId === 'pulmonary-capillaries' ||
    focusedComponentId === 'pulmonary-circuit' ||
    focusedStageId === 3;

  const isSystemicCapActive =
    !hasFocus ||
    focusedComponentId === 'systemic-capillaries' ||
    focusedComponentId === 'systemic-circuit' ||
    focusedStageId === 7;

  const isPulmonaryCircuitActive =
    !hasFocus ||
    focusedComponentId === 'pulmonary-circuit' ||
    (focusedStageId !== null && focusedStageId >= 1 && focusedStageId <= 4);

  const isSystemicCircuitActive =
    !hasFocus ||
    focusedComponentId === 'systemic-circuit' ||
    (focusedStageId !== null && focusedStageId >= 5 && focusedStageId <= 9);

  // Helper opacity class when focus mode is active
  const getOpacityClass = (isActive: boolean) => {
    if (!hasFocus && focusedStageId === null) return 'opacity-100 transition-opacity duration-300';
    if (hasFocus) {
      return isActive
        ? 'opacity-100 filter drop-shadow-[0_0_12px_rgba(225,29,72,0.5)] transition-all duration-300'
        : 'opacity-10 pointer-events-none transition-all duration-300';
    }
    // Simulation stage focus
    return isActive
      ? 'opacity-100 filter drop-shadow-[0_0_8px_rgba(239,68,68,0.4)] transition-all duration-300'
      : 'opacity-70 transition-all duration-300';
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center p-1 sm:p-2 select-none overflow-hidden">
      <svg
        viewBox="-40 -25 620 740"
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-full max-h-[450px] drop-shadow-xs transition-all duration-300"
      >
        <defs>
          {/* Gradients matching the textbook image */}
          <linearGradient id="pulmonaryCapillaryMeshGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0284c7" />
            <stop offset="35%" stopColor="#862d59" />
            <stop offset="65%" stopColor="#991b58" />
            <stop offset="100%" stopColor="#e11d48" />
          </linearGradient>

          <linearGradient id="systemicCapillaryMeshGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0284c7" />
            <stop offset="40%" stopColor="#862d59" />
            <stop offset="70%" stopColor="#991b58" />
            <stop offset="100%" stopColor="#e11d48" />
          </linearGradient>

          {/* White arrow marker for vessels */}
          <marker id="white-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto">
            <path d="M 0 1.5 L 7 5 L 0 8.5 z" fill="#ffffff" />
          </marker>
        </defs>

        {/* 1. TOP CIRCUIT: VÒNG TUẦN HOÀN NHỎ (Label in the loop center) */}
        <g className={getOpacityClass(isPulmonaryCircuitActive)}>
          <text
            x="270"
            y="235"
            textAnchor="middle"
            fill="#1e293b"
            fontSize="14"
            fontWeight="bold"
            fontFamily="sans-serif"
          >
            Vòng tuần hoàn
          </text>
          <text
            x="270"
            y="255"
            textAnchor="middle"
            fill="#1e293b"
            fontSize="14"
            fontWeight="bold"
            fontFamily="sans-serif"
          >
            nhỏ
          </text>
        </g>

        {/* 2. BOTTOM CIRCUIT: VÒNG TUẦN HOÀN LỚN (Label in the loop center) */}
        <g className={getOpacityClass(isSystemicCircuitActive)}>
          <text
            x="270"
            y="490"
            textAnchor="middle"
            fill="#1e293b"
            fontSize="14"
            fontWeight="bold"
            fontFamily="sans-serif"
          >
            Vòng tuần hoàn
          </text>
          <text
            x="270"
            y="510"
            textAnchor="middle"
            fill="#1e293b"
            fontSize="14"
            fontWeight="bold"
            fontFamily="sans-serif"
          >
            lớn
          </text>
        </g>

        {/* 3. MAO MẠCH PHỔI (Top capillary network - Maroon/Purple with mesh openings) */}
        <g
          className={`cursor-pointer ${getOpacityClass(isPulmonaryCapActive || isPulmonaryCircuitActive)}`}
          onClick={() => onSelectComponent && onSelectComponent('pulmonary-capillaries')}
        >
          {/* Main capillary mesh outline */}
          <path
            d="M 235 60 C 235 35, 305 35, 305 60 C 320 60, 335 70, 325 90 C 315 105, 290 105, 270 105 C 245 105, 220 100, 215 85 C 210 70, 225 60, 235 60 Z"
            fill="url(#pulmonaryCapillaryMeshGrad)"
            stroke="#1e293b"
            strokeWidth="2.5"
          />
          {/* Internal open pores/mesh loops exactly like the textbook */}
          <g fill="#ffffff" stroke="#1e293b" strokeWidth="2">
            <ellipse cx="270" cy="52" rx="14" ry="7" />
            <ellipse cx="250" cy="72" rx="13" ry="8" />
            <ellipse cx="290" cy="74" rx="14" ry="7.5" />
            <ellipse cx="270" cy="90" rx="15" ry="6.5" />
          </g>
        </g>

        {/* 4. ĐỘNG MẠCH PHỔI (Pulmonary Artery - Blue tube, Viewer's Left, carrying deox blood from RV to Lungs) */}
        <g
          className={`cursor-pointer ${getOpacityClass(
            focusedStageId === 2 ||
            focusedComponentId === 'artery' ||
            (focusedComponentId === 'pulmonary-circuit' && isPulmonaryCircuitActive)
          )}`}
          onClick={() => onSelectComponent && onSelectComponent('artery')}
        >
          {/* Outer stroke / tube */}
          <path
            id="path-pa-tube"
            d="M 268 375 C 265 310, 210 250, 205 185 C 200 125, 225 75, 238 68"
            fill="none"
            stroke="#0284c7"
            strokeWidth="24"
            strokeLinecap="round"
          />
          <path
            d="M 268 375 C 265 310, 210 250, 205 185 C 200 125, 225 75, 238 68"
            fill="none"
            stroke="#1e293b"
            strokeWidth="2.5"
          />
          {/* White flow arrows inside vessel pointing UP towards lungs */}
          <g stroke="#ffffff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M 205 230 L 205 210 M 200 217 L 205 210 L 210 217" />
            <path d="M 208 170 L 210 150 M 205 157 L 210 150 L 215 157" />
          </g>
        </g>

        {/* 5. TĨNH MẠCH PHỔI (Pulmonary Vein - Red tube, Viewer's Right, carrying ox blood from Lungs to LA) */}
        <g
          className={`cursor-pointer ${getOpacityClass(
            focusedStageId === 4 ||
            focusedComponentId === 'vein' ||
            (focusedComponentId === 'pulmonary-circuit' && isPulmonaryCircuitActive)
          )}`}
          onClick={() => onSelectComponent && onSelectComponent('vein')}
        >
          {/* Outer tube */}
          <path
            id="path-pv-tube"
            d="M 302 68 C 315 75, 340 125, 335 185 C 330 250, 275 310, 272 375"
            fill="none"
            stroke="#e11d48"
            strokeWidth="24"
            strokeLinecap="round"
          />
          <path
            d="M 302 68 C 315 75, 340 125, 335 185 C 330 250, 275 310, 272 375"
            fill="none"
            stroke="#1e293b"
            strokeWidth="2.5"
          />
          {/* White flow arrows inside vessel pointing DOWN towards heart */}
          <g stroke="#ffffff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M 333 190 L 331 210 M 326 203 L 331 210 L 336 203" />
            <path d="M 330 140 L 328 160 M 323 153 L 328 160 L 333 153" />
          </g>
        </g>

        {/* 6. AORTA & ĐỘNG MẠCH (Aorta / Systemic Arteries - Red tube, Viewer's Right, carrying ox blood from LV to Body) */}
        <g
          className={`cursor-pointer ${getOpacityClass(
            focusedStageId === 6 ||
            focusedComponentId === 'artery' ||
            (focusedComponentId === 'systemic-circuit' && isSystemicCircuitActive)
          )}`}
          onClick={() => onSelectComponent && onSelectComponent('artery')}
        >
          {/* Aorta arching out of LV and over to the right */}
          <path
            id="path-aorta-tube"
            d="M 285 365 C 285 310, 310 300, 330 325 C 348 350, 355 410, 350 460 C 345 525, 305 570, 288 605"
            fill="none"
            stroke="#e11d48"
            strokeWidth="24"
            strokeLinecap="round"
          />
          <path
            d="M 285 365 C 285 310, 310 300, 330 325 C 348 350, 355 410, 350 460 C 345 525, 305 570, 288 605"
            fill="none"
            stroke="#1e293b"
            strokeWidth="2.5"
          />
          {/* White flow arrows inside vessel pointing DOWN towards body capillaries */}
          <g stroke="#ffffff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M 305 320 L 316 332 M 307 332 L 316 332 L 316 322" />
            <path d="M 347 425 L 344 445 M 340 438 L 344 445 L 349 438" />
            <path d="M 320 535 L 305 550 M 307 540 L 305 550 L 315 550" />
          </g>
        </g>

        {/* 7. TĨNH MẠCH (Systemic Veins / Vena Cava - Blue tube, Viewer's Left, carrying deox blood from Body to RA) */}
        <g
          className={`cursor-pointer ${getOpacityClass(
            focusedStageId === 8 ||
            focusedComponentId === 'vein' ||
            (focusedComponentId === 'systemic-circuit' && isSystemicCircuitActive)
          )}`}
          onClick={() => onSelectComponent && onSelectComponent('vein')}
        >
          {/* Blue tube curving up into Right Atrium */}
          <path
            id="path-vc-tube"
            d="M 252 605 C 235 570, 195 525, 190 460 C 185 410, 192 350, 210 325 C 230 300, 255 310, 255 365"
            fill="none"
            stroke="#0284c7"
            strokeWidth="24"
            strokeLinecap="round"
          />
          <path
            d="M 252 605 C 235 570, 195 525, 190 460 C 185 410, 192 350, 210 325 C 230 300, 255 310, 255 365"
            fill="none"
            stroke="#1e293b"
            strokeWidth="2.5"
          />
          {/* White flow arrows inside vessel pointing UP towards heart */}
          <g stroke="#ffffff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M 225 550 L 210 535 M 220 535 L 210 535 L 210 545" />
            <path d="M 193 445 L 196 425 M 191 432 L 196 425 L 201 432" />
            <path d="M 224 332 L 235 320 M 224 322 L 235 320 L 233 332" />
          </g>
        </g>

        {/* 8. MAO MẠCH Ở CÁC CƠ QUAN (Bottom capillary network - Maroon/Purple with mesh openings) */}
        <g
          className={`cursor-pointer ${getOpacityClass(isSystemicCapActive || isSystemicCircuitActive)}`}
          onClick={() => onSelectComponent && onSelectComponent('systemic-capillaries')}
        >
          {/* Main capillary mesh outline */}
          <path
            d="M 270 595 C 285 595, 305 605, 300 625 C 295 645, 310 655, 300 670 C 285 685, 255 685, 240 670 C 230 655, 245 645, 240 625 C 235 605, 255 595, 270 595 Z"
            fill="url(#systemicCapillaryMeshGrad)"
            stroke="#1e293b"
            strokeWidth="2.5"
          />
          {/* Internal open pores/mesh loops */}
          <g fill="#ffffff" stroke="#1e293b" strokeWidth="2">
            <ellipse cx="270" cy="618" rx="14" ry="7" />
            <ellipse cx="252" cy="642" rx="13" ry="8" />
            <ellipse cx="288" cy="642" rx="14" ry="7.5" />
            <ellipse cx="270" cy="664" rx="15" ry="6.5" />
          </g>
        </g>

        {/* 9. TIM (Heart - 4 chambers at center, exactly matching the textbook style) */}
        <g
          id="heart-group"
          className={`cursor-pointer ${getOpacityClass(isHeartActive)}`}
          onClick={() => onSelectComponent && onSelectComponent('heart')}
        >
          {/* Heart outer muscular silhouette / cardiac muscle shadow */}
          <path
            d="M 270 330 C 240 325, 225 350, 225 390 C 225 435, 255 465, 270 478 C 285 465, 315 435, 315 390 C 315 350, 300 325, 270 330 Z"
            fill="#e11d48"
            fillOpacity="0.15"
            stroke="#1e293b"
            strokeWidth="2.5"
          />

          {/* RIGHT HEART (Anatomical Right, Viewer's Left - BLUE) */}
          <path
            d="M 270 335 C 248 335, 233 355, 233 390 C 233 430, 258 455, 270 465 L 270 335 Z"
            fill="#0284c7"
            stroke="#1e293b"
            strokeWidth="2.5"
          />
          {/* Internal atria flap dividing valve */}
          <path d="M 240 375 C 248 380, 255 375, 260 375" fill="none" stroke="#1e293b" strokeWidth="2" />
          {/* White arrow in Right Ventricle pointing UP into pulmonary trunk */}
          <g stroke="#ffffff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M 264 425 L 268 395 M 262 405 L 268 395 L 272 405" />
          </g>

          {/* LEFT HEART (Anatomical Left, Viewer's Right - RED) */}
          <path
            d="M 270 335 C 292 335, 307 355, 307 390 C 307 430, 282 455, 270 465 L 270 335 Z"
            fill="#e11d48"
            stroke="#1e293b"
            strokeWidth="2.5"
          />
          {/* Internal atria flap dividing valve */}
          <path d="M 280 375 C 285 375, 292 380, 300 375" fill="none" stroke="#1e293b" strokeWidth="2" />
          {/* White arrow in Left Ventricle pointing UP into aorta */}
          <g stroke="#ffffff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M 276 425 L 272 395 M 268 405 L 272 395 L 278 405" />
          </g>

          {/* Central Septum (Vách ngăn tim) */}
          <line x1="270" y1="335" x2="270" y2="465" stroke="#1e293b" strokeWidth="3" />
        </g>

        {/* 10. EXACTLY 1 TRAVELING RED BLOOD CELL (Tế bào hồng cầu du hành) */}
        {rbcPositions && rbcPositions.length > 0 && (
          <g id="traveling-rbc" className="transition-transform duration-100">
            {rbcPositions.map((rbc) => {
              // Interpolate color cleanly
              const isRed = rbc.oxygenPercent > 70;
              const isTransition = rbc.oxygenPercent >= 30 && rbc.oxygenPercent <= 70;
              const cellColor = isRed ? '#e11d48' : isTransition ? '#9333ea' : '#0284c7';
              const ringColor = isRed ? '#fecdd3' : isTransition ? '#f5d0fe' : '#bae6fd';
              const label = isRed ? 'O₂' : isTransition ? '±' : 'CO₂';

              return (
                <g key={rbc.id} transform={`translate(${rbc.x}, ${rbc.y})`}>
                  {/* Outer pulsating tracking beacon ring */}
                  <circle cx="0" cy="0" r="18" fill={cellColor} fillOpacity="0.2" className="animate-ping" />
                  <circle cx="0" cy="0" r="15" fill={cellColor} fillOpacity="0.15" />

                  {/* Main Erythrocyte Disc */}
                  <ellipse cx="0" cy="0" rx="13" ry="10" fill={cellColor} stroke={ringColor} strokeWidth="2.5" />
                  {/* Concave center */}
                  <ellipse cx="0" cy="0" rx="6.5" ry="5" fill="#ffffff" fillOpacity="0.4" />
                  
                  {/* Molecule symbol */}
                  <text x="0" y="3.5" fill="#ffffff" fontSize="7.5" fontWeight="extrabold" textAnchor="middle">
                    {label}
                  </text>

                  {/* Cute small tracking pointer pill */}
                  <g transform="translate(16, -14)">
                    <rect x="0" y="0" width="62" height="18" rx="6" fill="#0f172a" fillOpacity="0.85" />
                    <text x="31" y="12" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">
                      {isRed ? 'Hồng cầu (O₂)' : isTransition ? 'Trao đổi khí' : 'Hồng cầu (CO₂)'}
                    </text>
                  </g>
                </g>
              );
            })}
          </g>
        )}

        {/* 11. LABELS MATCHING THE EXACT TEXTBOOK IMAGE */}
        {showLabels && (
          <g id="textbook-labels" className="text-xs font-sans">
            {/* 1. Mao mạch phổi (Top) */}
            <g className={getOpacityClass(isPulmonaryCapActive || isPulmonaryCircuitActive)}>
              <text x="270" y="22" fill="#1e293b" fontSize="13" fontWeight="bold" textAnchor="middle">
                Mao mạch phổi
              </text>
              <line x1="270" y1="26" x2="270" y2="38" stroke="#1e293b" strokeWidth="1.5" />
            </g>

            {/* 2. Động mạch phổi (Top-Left) */}
            <g className={getOpacityClass(
              focusedStageId === 2 ||
              focusedComponentId === 'artery' ||
              (focusedComponentId === 'pulmonary-circuit' && isPulmonaryCircuitActive)
            )}>
              <text x="130" y="150" fill="#1e293b" fontSize="13" fontWeight="bold" textAnchor="middle">
                Động mạch
              </text>
              <text x="130" y="168" fill="#1e293b" fontSize="13" fontWeight="bold" textAnchor="middle">
                phổi
              </text>
              <line x1="170" y1="160" x2="195" y2="175" stroke="#1e293b" strokeWidth="1.5" />
            </g>

            {/* 3. Tĩnh mạch phổi (Top-Right) */}
            <g className={getOpacityClass(
              focusedStageId === 4 ||
              focusedComponentId === 'vein' ||
              (focusedComponentId === 'pulmonary-circuit' && isPulmonaryCircuitActive)
            )}>
              <text x="410" y="150" fill="#1e293b" fontSize="13" fontWeight="bold" textAnchor="middle">
                Tĩnh mạch
              </text>
              <text x="410" y="168" fill="#1e293b" fontSize="13" fontWeight="bold" textAnchor="middle">
                phổi
              </text>
              <line x1="370" y1="160" x2="345" y2="175" stroke="#1e293b" strokeWidth="1.5" />
            </g>

            {/* 4. Tim (Center) */}
            <g className={getOpacityClass(isHeartActive)}>
              <text x="420" y="380" fill="#1e293b" fontSize="13" fontWeight="bold" textAnchor="middle">
                Tim
              </text>
              <line x1="400" y1="378" x2="295" y2="400" stroke="#1e293b" strokeWidth="1.5" />
            </g>

            {/* 5. Động mạch (Center-Right) */}
            <g className={getOpacityClass(
              focusedStageId === 6 ||
              focusedComponentId === 'artery' ||
              (focusedComponentId === 'systemic-circuit' && isSystemicCircuitActive)
            )}>
              <text x="425" y="275" fill="#1e293b" fontSize="13" fontWeight="bold" textAnchor="middle">
                Động mạch
              </text>
              <line x1="380" y1="272" x2="348" y2="350" stroke="#1e293b" strokeWidth="1.5" />
            </g>

            {/* 6. Tĩnh mạch (Center-Left) */}
            <g className={getOpacityClass(
              focusedStageId === 8 ||
              focusedComponentId === 'vein' ||
              (focusedComponentId === 'systemic-circuit' && isSystemicCircuitActive)
            )}>
              <text x="120" y="295" fill="#1e293b" fontSize="13" fontWeight="bold" textAnchor="middle">
                Tĩnh mạch
              </text>
              <line x1="160" y1="292" x2="195" y2="340" stroke="#1e293b" strokeWidth="1.5" />
            </g>

            {/* 7. Mao mạch ở các cơ quan (Bottom) */}
            <g className={getOpacityClass(isSystemicCapActive || isSystemicCircuitActive)}>
              <text x="140" y="635" fill="#1e293b" fontSize="13" fontWeight="bold" textAnchor="middle">
                Mao mạch ở
              </text>
              <text x="140" y="653" fill="#1e293b" fontSize="13" fontWeight="bold" textAnchor="middle">
                các cơ quan
              </text>
              <line x1="190" y1="645" x2="235" y2="645" stroke="#1e293b" strokeWidth="1.5" />
            </g>
          </g>
        )}
      </svg>
    </div>
  );
};
