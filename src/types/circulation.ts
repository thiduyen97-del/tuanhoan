/**
 * Types for the Human Blood Circulation Educational Simulation
 * Grade 8 Natural Sciences (Khoa học tự nhiên Lớp 8)
 */

export type PageId = 'intro' | 'explorer' | 'simulation';

export type ComponentId = 
  | 'heart' 
  | 'artery' 
  | 'vein' 
  | 'pulmonary-capillaries' 
  | 'systemic-capillaries' 
  | 'pulmonary-circuit' 
  | 'systemic-circuit';

export interface CirculatoryComponent {
  id: ComponentId;
  stepNumber: number;
  label: string;
  name: string;
  shortDesc: string;
  fullDesc: string;
  features: string[];
  anatomicalType: 'heart' | 'vessel' | 'capillary' | 'circuit';
  oxygenStatus: 'rich' | 'poor' | 'mixed' | 'dual';
  focusRegion: {
    cx: number;
    cy: number;
    r: number;
    highlightIds: string[];
  };
}

export interface SimulationStage {
  id: number;
  label: string;
  name: string;
  caption: string;
  bloodType: 'poor' | 'rich' | 'transition-blue-red' | 'transition-red-blue';
  oxygenLabel: string;
  exchangeSummary?: {
    title: string;
    inflow: string[]; // into blood
    outflow: string[]; // from blood
    directionNotes: string;
  };
  highlightRegion: {
    cx: number;
    cy: number;
    zoomScale: number;
  };
  activePathSegment: 'rv-pa' | 'pa' | 'pulmonary-cap' | 'pv' | 'left-heart' | 'aorta' | 'systemic-cap' | 'vc' | 'ra';
}

export interface RBCParticle {
  id: number;
  progress: number; // 0 to 1 along full circulatory loop
  speedMultiplier: number;
  offset: number; // slight lane offset for natural flow
  hasOxygen: boolean;
  hasCo2: boolean;
}
