/**
 * FotoPasaporte.app — AI Backend Integration Layer
 * Integrates with photoresizer-ai-backend for:
 * 1. Biometric Validator (/api/v1/analyze)
 * 2. AI Auto-Creation & Fix (/api/v1/analyze-and-fix)
 */

export interface AIIssue {
  id: string;
  category: string;
  issue: string;
  description: string;
  severity: 'critical' | 'warning' | 'info' | string;
  auto_fixable: boolean;
  user_message: string;
  confidence: number;
  metric?: Record<string, unknown>;
}

export interface AIAnalysisSummary {
  total_issues: number;
  critical_issues: number;
  warnings: number;
  passed_checks: number;
}

export interface AIAnalysisResult {
  overall_status: 'pass' | 'warn' | 'fail' | string;
  issues: AIIssue[];
  passed_checks: string[];
  summary: AIAnalysisSummary;
  metrics?: Record<string, unknown>;
  is_auto_fixable?: boolean;
  clean_photo_id?: string;
  country?: string;
  processing_time_ms?: number;
}

export interface AIFixResult {
  overall_status: 'pass' | 'warn' | 'fail' | string;
  corrected_image_base64: string | null;
  changes_applied: string[];
  clean_photo_id: string;
  issues: AIIssue[];
  passed_checks: string[];
  summary: AIAnalysisSummary;
  country?: string;
  document_type?: string;
}

// Spanish translations for analysis categories
export const CATEGORY_LABELS_ES: Record<string, string> = {
  face_detection: 'Detección del rostro',
  face_size: 'Proporción y tamaño de la cabeza',
  face_position: 'Centrado del rostro',
  head_tilt: 'Inclinación de la cabeza',
  head_pose: 'Orientación frontal',
  eyes: 'Ojos abiertos y pupilas visibles',
  expression: 'Expresión facial neutra',
  background: 'Fondo reglamentario',
  lighting: 'Iluminación y sombras',
  quality: 'Resolución y nitidez',
};

// Spanish translations for passed checks
export const PASSED_CHECK_LABELS_ES: Record<string, string> = {
  face_detected: 'Rostro humano detectado con claridad',
  single_face: 'Una sola persona en la imagen',
  eyes_open: 'Ambos ojos abiertos y mirando a la cámara',
  mouth_closed: 'Boca cerrada y labios juntos',
  neutral_expression: 'Expresión facial relajada y neutra',
  head_straight: 'Cabeza nivelada sin inclinación',
  face_centered: 'Rostro centrado en el encuadre',
  lighting_uniform: 'Iluminación homogénea en ambos lados',
  no_severe_shadows: 'Sin sombras duras en el fondo ni el cuello',
  background_uniform: 'Fondo uniforme y conforme a la norma',
  resolution_ok: 'Resolución adecuada para 300 DPI',
  aspect_ratio_ok: 'Proporción y relación de aspecto correcta',
  sharpness_ok: 'Enfoque nítido sin desenfoque ni trepidación',
};

// Spanish translations for applied changes
export const CHANGE_TRANSLATIONS_ES: Record<string, string> = {
  'Removed background and replaced with pure white': 'Fondo eliminado y sustituido por blanco uniforme',
  'Removed background and replaced with off-white': 'Fondo sustituido por blanco roto homogéneo',
  'Removed background and replaced with light grey': 'Fondo sustituido por gris claro reglamentario',
  'Removed background and replaced with light blue': 'Fondo sustituido por azul claro uniforme',
  'Cropped and resized': 'Encuadre facial y recorte ajustado a medidas oficiales',
  'Face centered': 'Rostro centrado biométricamente',
  'Lighting balanced': 'Iluminación y brillo calibrados automáticamente',
};

export function translateChange(change: string): string {
  for (const [key, val] of Object.entries(CHANGE_TRANSLATIONS_ES)) {
    if (change.toLowerCase().includes(key.toLowerCase())) {
      return val;
    }
  }
  return change;
}

export function dataUrlToBlob(dataUrl: string): Blob {
  const parts = dataUrl.split(';base64,');
  const contentType = parts[0].split(':')[1] || 'image/jpeg';
  const raw = window.atob(parts[1]);
  const rawLength = raw.length;
  const uInt8Array = new Uint8Array(rawLength);

  for (let i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }

  return new Blob([uInt8Array], { type: contentType });
}

/**
 * 1. AI Validator: Call /api/ai/analyze
 * Checks face geometry, lighting, background, eyes, expression, etc.
 */
export async function analyzePhotoWithAI(
  image: Blob | string,
  countryCode: string = 'ES'
): Promise<AIAnalysisResult> {
  const blob = typeof image === 'string' ? dataUrlToBlob(image) : image;
  const formData = new FormData();
  formData.append('file', blob, 'photo.jpg');
  formData.append('country', countryCode.toUpperCase());

  const res = await fetch('/api/ai/analyze', {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ error: 'Error desconocido' }));
    throw new Error(errorData.error || `Error del servidor (${res.status})`);
  }

  return res.json();
}

/**
 * 2. AI Auto-Create & Fix: Call /api/ai/analyze-and-fix
 * Automatically removes background, centers face, and resizes to country rules.
 */
export async function analyzeAndFixWithAI(
  image: Blob | string,
  countryCode: string = 'ES'
): Promise<AIFixResult> {
  const blob = typeof image === 'string' ? dataUrlToBlob(image) : image;
  const formData = new FormData();
  formData.append('file', blob, 'photo.jpg');
  formData.append('country', countryCode.toUpperCase());

  const res = await fetch('/api/ai/analyze-and-fix', {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ error: 'Error desconocido' }));
    throw new Error(errorData.error || `Error del servidor (${res.status})`);
  }

  return res.json();
}
