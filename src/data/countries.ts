import { CountryInfo, DocumentSpec, DocumentType } from '@/types';
import rawData from './countries.json';

interface RawCountryEntry {
  country_code: string;
  country_name: string;
  document_type: string;
  visa_type?: string;
  size_mm: number[];
  size_inches?: number[];
  size_px: number[];
  dpi: number;
  aspect_ratio: number;
  background_color: string;
  bg_rgb_min?: number[];
  bg_rgb_max?: number[];
  face_height_min: number;
  face_height_max: number;
  face_width_min?: number;
  face_width_max?: number;
  eye_height_min?: number;
  eye_height_max?: number;
  max_tilt_degrees?: number;
  color_space?: string;
  glasses_allowed: boolean;
  glasses_notes?: string;
  smile_allowed: boolean;
  teeth_visible_allowed?: boolean;
  teeth_notes?: string;
  eyes_must_open?: boolean;
  head_covering_allowed?: boolean;
  head_covering_notes?: string;
  uniform_allowed?: boolean;
  retouching_allowed?: boolean;
  print_finish?: string;
  file_format?: string;
  file_size_kb_min?: number;
  file_size_kb_max?: number;
  recency_months?: number;
  mouth_closed?: boolean;
  shadow_allowed?: boolean;
  pixel_exact?: boolean;
  pixel_exact_notes?: string;
  source_url?: string;
  lastVerified?: string;
}

// Comprehensive Spanish country names dictionary
const SPANISH_COUNTRY_NAMES: Record<string, string> = {
  US: 'Estados Unidos',
  ES: 'España',
  CA: 'Canadá',
  GB: 'Reino Unido',
  AU: 'Australia',
  DE: 'Alemania',
  FR: 'Francia',
  MX: 'México',
  IT: 'Italia',
  IN: 'India',
  CO: 'Colombia',
  AR: 'Argentina',
  CL: 'Chile',
  PE: 'Perú',
  BR: 'Brasil',
  JP: 'Japón',
  CN: 'China',
  PT: 'Portugal',
  CH: 'Suiza',
  NL: 'Países Bajos',
  IE: 'Irlanda',
  NZ: 'Nueva Zelanda',
  SE: 'Suecia',
  NO: 'Noruega',
  DK: 'Dinamarca',
  FI: 'Finlandia',
  PL: 'Polonia',
  AT: 'Austria',
  BE: 'Bélgica',
  GR: 'Grecia',
  TR: 'Turquía',
  AE: 'Emiratos Árabes Unidos',
  SA: 'Arabia Saudita',
  ZA: 'Sudáfrica',
  KR: 'Corea del Sur',
  SG: 'Singapur',
  TH: 'Tailandia',
  VN: 'Vietnam',
  PH: 'Filipinas',
  EG: 'Egipto',
  MA: 'Marruecos',
  DO: 'República Dominicana',
  EC: 'Ecuador',
  GT: 'Guatemala',
  CU: 'Cuba',
  BO: 'Bolivia',
  CR: 'Costa Rica',
  PA: 'Panamá',
  UY: 'Uruguay',
  PY: 'Paraguay',
  VE: 'Venezuela',
  SV: 'El Salvador',
  NI: 'Nicaragua',
  CZ: 'República Checa',
  RO: 'Rumanía',
  HU: 'Hungría',
  HR: 'Croacia',
  SK: 'Eslovaquia',
  BG: 'Bulgaria',
  IL: 'Israel',
  RU: 'Rusia',
  UA: 'Ucrania',
  ID: 'Indonesia',
  MY: 'Malasia',
  PK: 'Pakistán',
  BD: 'Bangladés',
  NG: 'Nigeria',
  KE: 'Kenia',
  DZ: 'Argelia',
  TN: 'Túnez',
  LB: 'Líbano',
  JO: 'Jordania',
  KW: 'Kuwait',
  QA: 'Catar',
  OM: 'Omán',
  BH: 'Baréin',
  IS: 'Islandia',
  LU: 'Luxemburgo',
  MC: 'Mónaco',
  AD: 'Andorra',
  SM: 'San Marino',
  VA: 'Ciudad del Vaticano',
  LI: 'Liechtenstein',
  MT: 'Malta',
  CY: 'Chipre',
  EE: 'Estonia',
  LV: 'Letonia',
  LT: 'Lituania',
  SI: 'Eslovenia',
  BA: 'Bosnia y Herzegovina',
  RS: 'Serbia',
  ME: 'Montenegro',
  MK: 'Macedonia del Norte',
  AL: 'Albania',
  MD: 'Moldavia',
  BY: 'Bielorrusia',
  GE: 'Georgia',
  AM: 'Armenia',
  AZ: 'Azerbaiyán',
  KZ: 'Kazajistán',
  UZ: 'Uzbekistán',
  TM: 'Turkmenistán',
  KG: 'Kirguistán',
  TJ: 'Tayikistán',
  AF: 'Afganistán',
  IQ: 'Irak',
  IR: 'Irán',
  SY: 'Siria',
  YE: 'Yemen',
  LK: 'Sri Lanka',
  NP: 'Nepal',
  MM: 'Myanmar (Birmania)',
  KH: 'Camboya',
  LA: 'Laos',
  TW: 'Taiwán',
  HK: 'Hong Kong',
  MO: 'Macao',
  MN: 'Mongolia',
};

// Region mapping
const REGION_MAP: Record<string, 'Europa' | 'América' | 'Asia / Oceanía' | 'África'> = {
  ES: 'Europa', GB: 'Europa', DE: 'Europa', FR: 'Europa', IT: 'Europa', PT: 'Europa',
  CH: 'Europa', NL: 'Europa', IE: 'Europa', SE: 'Europa', NO: 'Europa', DK: 'Europa',
  FI: 'Europa', PL: 'Europa', AT: 'Europa', BE: 'Europa', GR: 'Europa', CZ: 'Europa',
  RO: 'Europa', HU: 'Europa', HR: 'Europa', SK: 'Europa', BG: 'Europa', IS: 'Europa',
  LU: 'Europa', AD: 'Europa', MC: 'Europa', MT: 'Europa', CY: 'Europa', EE: 'Europa',
  LV: 'Europa', LT: 'Europa', SI: 'Europa', BA: 'Europa', RS: 'Europa', ME: 'Europa',
  MK: 'Europa', AL: 'Europa', MD: 'Europa', BY: 'Europa', UA: 'Europa', RU: 'Europa',
  SM: 'Europa', VA: 'Europa', LI: 'Europa',

  US: 'América', CA: 'América', MX: 'América', CO: 'América', AR: 'América', CL: 'América',
  PE: 'América', BR: 'América', EC: 'América', GT: 'América', CU: 'América', BO: 'América',
  CR: 'América', PA: 'América', UY: 'América', PY: 'América', VE: 'América', DO: 'América',
  PR: 'América', JM: 'América', BS: 'América', TT: 'América', HN: 'América', SV: 'América',
  NI: 'América', HT: 'América', GY: 'América', SR: 'América', BZ: 'América',

  AU: 'Asia / Oceanía', NZ: 'Asia / Oceanía', JP: 'Asia / Oceanía', CN: 'Asia / Oceanía',
  IN: 'Asia / Oceanía', KR: 'Asia / Oceanía', SG: 'Asia / Oceanía', TH: 'Asia / Oceanía',
  VN: 'Asia / Oceanía', PH: 'Asia / Oceanía', ID: 'Asia / Oceanía', MY: 'Asia / Oceanía',
  AE: 'Asia / Oceanía', SA: 'Asia / Oceanía', TR: 'Asia / Oceanía', IL: 'Asia / Oceanía',
  TW: 'Asia / Oceanía', HK: 'Asia / Oceanía', QA: 'Asia / Oceanía', KW: 'Asia / Oceanía',
  PK: 'Asia / Oceanía', BD: 'Asia / Oceanía', LK: 'Asia / Oceanía', NP: 'Asia / Oceanía',

  ZA: 'África', EG: 'África', MA: 'África', NG: 'África', KE: 'África', GH: 'África',
  DZ: 'África', TN: 'África', ET: 'África', SN: 'África', CI: 'África', CM: 'África',
};

// Background description helper
function formatBackgroundColor(bg: string): { name: string; notes: string } {
  switch (bg?.toLowerCase()) {
    case 'white':
      return {
        name: 'Blanco liso y uniforme',
        notes: 'Fondo blanco sólido sin sombras, texturas ni patrones.',
      };
    case 'light_gray':
      return {
        name: 'Gris claro liso',
        notes: 'Fondo neutro gris claro liso y uniforme.',
      };
    case 'cream_or_light_gray':
      return {
        name: 'Crema o gris claro',
        notes: 'Fondo crema o gris claro (prohibido el blanco puro).',
      };
    case 'light_gray_or_beige':
      return {
        name: 'Gris claro o beige suave',
        notes: 'Fondo claro neutro no blanco.',
      };
    case 'white_or_light_gray':
      return {
        name: 'Blanco o gris claro',
        notes: 'Fondo blanco o gris muy claro uniforme.',
      };
    case 'blue':
      return {
        name: 'Azul liso',
        notes: 'Fondo azul sólido y uniforme.',
      };
    case 'red':
      return {
        name: 'Rojo liso',
        notes: 'Fondo rojo sólido y uniforme.',
      };
    default:
      return {
        name: 'Blanco liso',
        notes: 'Fondo limpio, liso y sin sombras.',
      };
  }
}

// Generate country flag from ISO 3166-1 alpha-2 code
function getFlagEmoji(code: string): string {
  if (!code || code.length !== 2) return '🌐';
  return String.fromCodePoint(...[...code.toUpperCase()].map((c) => 127397 + c.charCodeAt(0)));
}

// Popular country codes priority list
const POPULAR_CODES = [
  'ES', // España
  'US', // Estados Unidos
  'CA', // Canadá
  'GB', // Reino Unido
  'AU', // Australia
  'DE', // Alemania
  'FR', // Francia
  'MX', // México
  'IT', // Italia
  'IN', // India
  'CO', // Colombia
  'AR', // Argentina
  'CL', // Chile
  'PE', // Perú
  'BR', // Brasil
  'JP', // Japón
  'CN', // China
  'PT', // Portugal
  'CH', // Suiza
  'NL', // Países Bajos
];

// Process raw countries data from countries.json
const rawEntries = (rawData.countries || []) as unknown as RawCountryEntry[];

// Group entries by country_code
const countryMap = new Map<string, RawCountryEntry[]>();
for (const entry of rawEntries) {
  const code = entry.country_code.toUpperCase();
  if (!countryMap.has(code)) {
    countryMap.set(code, []);
  }
  countryMap.get(code)!.push(entry);
}

// Build structured CountryInfo array
const parsedCountries: CountryInfo[] = [];

for (const [code, entries] of countryMap.entries()) {
  const first = entries[0];
  const spanishName = SPANISH_COUNTRY_NAMES[code] || first.country_name;
  const region = REGION_MAP[code] || 'Europa';
  const flag = getFlagEmoji(code);
  const isPopular = POPULAR_CODES.includes(code);

  const documents: DocumentSpec[] = entries.map((entry, index) => {
    const docType: DocumentType = entry.document_type === 'visa' ? 'visa' : 'passport';
    const bgInfo = formatBackgroundColor(entry.background_color);

    let docName = 'Pasaporte';
    if (docType === 'visa') {
      docName = entry.visa_type ? `Visado (${entry.visa_type})` : 'Visado';
    } else {
      docName = `Pasaporte (${spanishName})`;
    }

    const notes =
      entry.pixel_exact_notes ||
      entry.glasses_notes ||
      entry.teeth_notes ||
      entry.head_covering_notes ||
      '';

    return {
      id: `${code.toLowerCase()}-${entry.document_type}-${index}`,
      name: docName,
      documentType: docType,
      widthMm: entry.size_mm[0],
      heightMm: entry.size_mm[1],
      widthPx: entry.size_px[0],
      heightPx: entry.size_px[1],
      aspectRatio: entry.aspect_ratio || entry.size_mm[0] / entry.size_mm[1],
      dpi: entry.dpi || 300,
      backgroundColor: bgInfo.name,
      bgNotes: bgInfo.notes,
      faceHeightMinRatio: entry.face_height_min,
      faceHeightMaxRatio: entry.face_height_max,
      eyeHeightMinRatio: entry.eye_height_min ?? 0.55,
      eyeHeightMaxRatio: entry.eye_height_max ?? 0.65,
      glassesAllowed: entry.glasses_allowed ?? false,
      notes,
      fileSizeKbMin: entry.file_size_kb_min,
      fileSizeKbMax: entry.file_size_kb_max,
      sourceUrl: entry.source_url,
      printFinish: entry.print_finish,
      mouthClosed: entry.mouth_closed ?? true,
      sizeInches: entry.size_inches as [number, number] | undefined,
      bgRgbMin: entry.bg_rgb_min,
      bgRgbMax: entry.bg_rgb_max,
      maxTiltDegrees: entry.max_tilt_degrees,
      glassesNotes: entry.glasses_notes,
      smileAllowed: entry.smile_allowed,
      teethVisibleAllowed: entry.teeth_visible_allowed,
      teethNotes: entry.teeth_notes,
      headCoveringAllowed: entry.head_covering_allowed,
      headCoveringNotes: entry.head_covering_notes,
      recencyMonths: entry.recency_months,
      colorSpace: entry.color_space,
      lastVerified: entry.lastVerified,
    };
  });

  // If Spain, add official DNI entry (30x40 mm) as well
  if (code === 'ES') {
    documents.push({
      id: 'es-dni',
      name: 'DNI (Documento Nacional de Identidad)',
      documentType: 'id_card',
      widthMm: 30,
      heightMm: 40,
      widthPx: 354,
      heightPx: 472,
      aspectRatio: 30 / 40,
      dpi: 300,
      backgroundColor: 'Blanco liso y uniforme',
      bgNotes: 'Fondo blanco liso, sin objetos ni personas detrás.',
      faceHeightMinRatio: 0.70,
      faceHeightMaxRatio: 0.80,
      eyeHeightMinRatio: 0.55,
      eyeHeightMaxRatio: 0.65,
      glassesAllowed: false,
      notes: 'Fotografía reciente en color de 30×40 mm con fondo blanco liso para expedición y renovación del DNI.',
      sizeInches: [1.18, 1.57],
      recencyMonths: 6,
      printFinish: 'Papel fotográfico brillo o mate',
      lastVerified: '2026-10-05',
    });
  }

  parsedCountries.push({
    code,
    name: spanishName,
    region,
    flag,
    isPopular,
    documents,
  });
}

// Sort with popular countries first, then alphabetically by Spanish name
parsedCountries.sort((a, b) => {
  const aPopIndex = POPULAR_CODES.indexOf(a.code);
  const bPopIndex = POPULAR_CODES.indexOf(b.code);

  if (aPopIndex !== -1 && bPopIndex !== -1) {
    return aPopIndex - bPopIndex;
  }
  if (aPopIndex !== -1) return -1;
  if (bPopIndex !== -1) return 1;

  return a.name.localeCompare(b.name, 'es');
});

export const COUNTRIES_DATA: CountryInfo[] = parsedCountries;

export const POPULAR_COUNTRIES: CountryInfo[] = COUNTRIES_DATA.filter((c) => c.isPopular);

export function getCountryByCode(code: string): CountryInfo | undefined {
  return COUNTRIES_DATA.find((c) => c.code.toUpperCase() === code.toUpperCase());
}

export function toCountrySlug(country: CountryInfo | string): string {
  const name = typeof country === 'string' ? country : country.name;
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

export function getCountryBySlugOrCode(param: string): CountryInfo | undefined {
  if (!param) return undefined;
  const normalized = param.trim().toLowerCase();

  // 1. Direct code match (e.g. "es", "us", "mx")
  const byCode = COUNTRIES_DATA.find((c) => c.code.toLowerCase() === normalized);
  if (byCode) return byCode;

  // 2. Slug match (e.g. "espana", "estados-unidos", "mexico")
  const bySlug = COUNTRIES_DATA.find((c) => toCountrySlug(c) === normalized);
  if (bySlug) return bySlug;

  // 3. Name match
  return COUNTRIES_DATA.find((c) => c.name.toLowerCase() === normalized);
}

export function getAllCountryParams(): { country: string }[] {
  const params: { country: string }[] = [];
  for (const c of COUNTRIES_DATA) {
    params.push({ country: toCountrySlug(c) });
    params.push({ country: c.code.toLowerCase() });
  }
  return params;
}

export function searchCountries(query: string): CountryInfo[] {
  const q = query.trim().toLowerCase();
  if (!q) return COUNTRIES_DATA;
  return COUNTRIES_DATA.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.code.toLowerCase().includes(q) ||
      c.region.toLowerCase().includes(q) ||
      c.documents.some((d) => d.name.toLowerCase().includes(q))
  );
}
