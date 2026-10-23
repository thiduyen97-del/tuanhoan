/**
 * Parametric path and spline interpolation for the human circulatory loop.
 * Matches the exact geometry of the Vietnamese Grade 8 textbook schematic.
 * The loop is mathematically closed: t = 0 to 1.
 */

export interface PathPoint {
  t: number;
  x: number;
  y: number;
  oxygen: number; // 0 to 100
  stage: number; // 1 to 9
  name: string;
}

// Exact waypoints along the textbook figure-8 circulatory loop (540x680 canvas)
export const CIRCULATION_WAYPOINTS: PathPoint[] = [
  // STAGE 1: Tâm thất phải bơm máu (t: 0.00 - 0.08)
  { t: 0.00, x: 260, y: 435, oxygen: 5, stage: 1, name: 'Tâm thất phải' },
  { t: 0.05, x: 265, y: 400, oxygen: 5, stage: 1, name: 'Tâm thất phải co bóp' },

  // STAGE 2: Động mạch phổi (t: 0.08 - 0.23)
  { t: 0.09, x: 268, y: 370, oxygen: 5, stage: 2, name: 'Gốc động mạch phổi' },
  { t: 0.13, x: 235, y: 290, oxygen: 5, stage: 2, name: 'Động mạch phổi' },
  { t: 0.17, x: 205, y: 210, oxygen: 5, stage: 2, name: 'Động mạch phổi hướng lên' },
  { t: 0.21, x: 210, y: 130, oxygen: 5, stage: 2, name: 'Đến mao mạch phổi' },
  { t: 0.23, x: 235, y: 75, oxygen: 10, stage: 2, name: 'Cửa vào mao mạch phổi' },

  // STAGE 3: Mao mạch phổi — trao đổi khí (t: 0.24 - 0.36)
  // Transition: Blue (low O2) -> Purple -> Bright Red (high O2)
  { t: 0.26, x: 250, y: 65, oxygen: 30, stage: 3, name: 'Mao mạch phổi - nhận O₂' },
  { t: 0.30, x: 270, y: 65, oxygen: 65, stage: 3, name: 'Mao mạch phổi - O₂ vào máu, CO₂ ra phế nang' },
  { t: 0.34, x: 290, y: 68, oxygen: 95, stage: 3, name: 'Mao mạch phổi - máu chuyển đỏ tươi' },
  { t: 0.36, x: 305, y: 75, oxygen: 100, stage: 3, name: 'Rời mao mạch phổi' },

  // STAGE 4: Tĩnh mạch phổi (t: 0.37 - 0.47)
  { t: 0.39, x: 330, y: 130, oxygen: 100, stage: 4, name: 'Tĩnh mạch phổi' },
  { t: 0.42, x: 335, y: 210, oxygen: 100, stage: 4, name: 'Tĩnh mạch phổi dẫn về tim' },
  { t: 0.45, x: 305, y: 290, oxygen: 100, stage: 4, name: 'Tiến về tim trái' },
  { t: 0.47, x: 275, y: 350, oxygen: 100, stage: 4, name: 'Đổ vào tâm nhĩ trái' },

  // STAGE 5: Tâm nhĩ trái và tâm thất trái (t: 0.48 - 0.55)
  { t: 0.49, x: 278, y: 375, oxygen: 100, stage: 5, name: 'Tâm nhĩ trái' },
  { t: 0.52, x: 280, y: 435, oxygen: 100, stage: 5, name: 'Tâm thất trái' },
  { t: 0.55, x: 278, y: 395, oxygen: 100, stage: 5, name: 'Tâm thất trái co bóp mạnh' },

  // STAGE 6: Động mạch chủ và các động mạch (t: 0.56 - 0.70)
  { t: 0.57, x: 290, y: 355, oxygen: 100, stage: 6, name: 'Gốc động mạch chủ' },
  { t: 0.60, x: 320, y: 325, oxygen: 100, stage: 6, name: 'Quai động mạch' },
  { t: 0.63, x: 350, y: 410, oxygen: 100, stage: 6, name: 'Động mạch' },
  { t: 0.67, x: 345, y: 490, oxygen: 100, stage: 6, name: 'Động mạch dẫn xuống cơ quan' },
  { t: 0.70, x: 310, y: 575, oxygen: 100, stage: 6, name: 'Đến mao mạch cơ quan' },

  // STAGE 7: Mao mạch ở các cơ quan — trao đổi chất (t: 0.71 - 0.83)
  // Transition: Bright Red -> Purple -> Blue (giving O2 & nutrients, taking CO2 & waste)
  { t: 0.72, x: 290, y: 610, oxygen: 85, stage: 7, name: 'Mao mạch cơ quan - nhường O₂' },
  { t: 0.75, x: 275, y: 635, oxygen: 50, stage: 7, name: 'Mao mạch cơ quan - nhận CO₂ & chất thải' },
  { t: 0.79, x: 260, y: 645, oxygen: 20, stage: 7, name: 'Mao mạch cơ quan - máu nghèo O₂' },
  { t: 0.83, x: 250, y: 610, oxygen: 5, stage: 7, name: 'Rời mao mạch cơ quan' },

  // STAGE 8: Tĩnh mạch và tĩnh mạch chủ (t: 0.84 - 0.94)
  { t: 0.85, x: 225, y: 570, oxygen: 5, stage: 8, name: 'Tĩnh mạch' },
  { t: 0.88, x: 190, y: 490, oxygen: 5, stage: 8, name: 'Tĩnh mạch dẫn về tim' },
  { t: 0.91, x: 190, y: 410, oxygen: 5, stage: 8, name: 'Tĩnh mạch' },
  { t: 0.93, x: 220, y: 325, oxygen: 5, stage: 8, name: 'Uốn vào tim' },
  { t: 0.94, x: 252, y: 350, oxygen: 5, stage: 8, name: 'Cửa vào tâm nhĩ phải' },

  // STAGE 9: Tâm nhĩ phải — hoàn thành chu trình (t: 0.95 - 1.00)
  { t: 0.96, x: 260, y: 365, oxygen: 5, stage: 9, name: 'Tâm nhĩ phải' },
  { t: 0.98, x: 260, y: 395, oxygen: 5, stage: 9, name: 'Xuống tâm thất phải' },
  { t: 1.00, x: 260, y: 435, oxygen: 5, stage: 9, name: 'Trở lại tâm thất phải' },
];

/**
 * Get interpolated position and biological properties for a given t in [0, 1]
 */
export function getCirculationPoint(rawT: number): { x: number; y: number; oxygen: number; stage: number; name: string } {
  // Wrap rawT into [0, 1]
  const t = ((rawT % 1) + 1) % 1;

  // Find surrounding waypoints
  let i = 0;
  while (i < CIRCULATION_WAYPOINTS.length - 1 && CIRCULATION_WAYPOINTS[i + 1].t <= t) {
    i++;
  }

  const p0 = CIRCULATION_WAYPOINTS[i];
  const p1 = CIRCULATION_WAYPOINTS[Math.min(i + 1, CIRCULATION_WAYPOINTS.length - 1)];

  if (p1.t === p0.t) {
    return { x: p0.x, y: p0.y, oxygen: p0.oxygen, stage: p0.stage, name: p0.name };
  }

  // Smoothstep interpolation
  const fraction = (t - p0.t) / (p1.t - p0.t);
  const smoothFraction = fraction * fraction * (3 - 2 * fraction);

  const x = p0.x + (p1.x - p0.x) * smoothFraction;
  const y = p0.y + (p1.y - p0.y) * smoothFraction;
  const oxygen = p0.oxygen + (p1.oxygen - p0.oxygen) * fraction;

  return {
    x,
    y,
    oxygen,
    stage: p0.stage,
    name: p0.name,
  };
}

/** Stage start t-values */
export const STAGE_T_START: Record<number, number> = {
  1: 0.00,
  2: 0.09,
  3: 0.24,
  4: 0.37,
  5: 0.48,
  6: 0.56,
  7: 0.71,
  8: 0.84,
  9: 0.95,
};
