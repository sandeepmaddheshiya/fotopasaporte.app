export type DocumentType = 'passport' | 'visa' | 'id_card' | 'driving_license';

export interface DocumentSpec {
  id: string;
  name: string;
  documentType: DocumentType;
  widthMm: number;
  heightMm: number;
  widthPx: number;
  heightPx: number;
  aspectRatio: number;
  dpi: number;
  backgroundColor: string;
  bgNotes: string;
  faceHeightMinRatio: number; // e.g. 0.70 (70% of photo height)
  faceHeightMaxRatio: number; // e.g. 0.80 (80% of photo height)
  eyeHeightMinRatio: number;  // min eye position from bottom
  eyeHeightMaxRatio: number;  // max eye position from bottom
  glassesAllowed: boolean;
  notes: string;
  fileSizeKbMin?: number;
  fileSizeKbMax?: number;
  sourceUrl?: string;
  printFinish?: string;
  mouthClosed?: boolean;
}

export interface CountryInfo {
  code: string;
  name: string;
  region: 'Europa' | 'América' | 'Asia / Oceanía' | 'África';
  flag: string;
  isPopular?: boolean;
  documents: DocumentSpec[];
}

export interface EditorSettings {
  zoom: number; // 1.0 to 3.0
  rotation: number; // -15 to +15 deg
  panX: number; // -100 to +100 px
  panY: number; // -100 to +100 px
  brightness: number; // -50 to +50
  contrast: number; // -50 to +50
  backgroundColor: 'original' | 'white' | 'offwhite' | 'lightgray' | 'cream';
  showBiometricGuides: boolean;
  outputFormat: 'image/jpeg' | 'image/png';
  targetFileSizeKb?: number; // optional target KB (e.g. 240KB for US)
  quality: number; // 0.8 to 1.0
}

export interface PrintSheetOptions {
  paperSize: '4x6' | 'a4'; // 4x6 inch (10x15cm) standard photo paper
  photosCount: number;
  includeCropMarks: boolean;
}
