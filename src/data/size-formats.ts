import type { Metadata } from 'next';
import { COUNTRIES_DATA } from '@/data/countries';
import type { CountryInfo, DocumentSpec } from '@/types';

// ---------------------------------------------------------------------------
// SIZE FORMAT DEFINITIONS
// Served as static routes: /foto-35x45-mm, /foto-2x2-pulgadas, /foto-50x70-mm,
// /foto-33x48-mm (see src/app/foto-<slug>/page.tsx).
//
// Country lists are NOT hard-coded: they are derived from countries.json via
// getCountriesForFormat() so these pages can never contradict the country pages.
// ---------------------------------------------------------------------------
export interface SizeFormat {
  slug: SizeFormatSlug;
  widthMm: number;
  heightMm: number;
  widthPx: number;
  heightPx: number;
  sizeInches: string;
  sizeCm: string;
  standard: string;
  standardCode: string;
  title: string;
  h1: string;
  description: string;
  intro: string;
  useCases: string[];
  faqs: { q: string; a: string }[];
}

export type SizeFormatSlug = '35x45-mm' | '2x2-pulgadas' | '50x70-mm' | '33x48-mm';

export const SIZE_FORMATS: SizeFormat[] = [
  {
    slug: '35x45-mm',
    widthMm: 35,
    heightMm: 45,
    widthPx: 413,
    heightPx: 531,
    sizeInches: '1,38 × 1,77 pulgadas',
    sizeCm: '3,5 × 4,5 cm',
    standard: 'OACI Doc 9303 / Estándar europeo e internacional',
    standardCode: 'OACI 9303',
    title: 'Foto 35×45 mm: países, medidas en cm, px y requisitos',
    h1: 'Foto 35 × 45 mm: medidas, píxeles y países que la exigen',
    description:
      'Guía completa sobre la foto de 35×45 mm (3,5×4,5 cm / 413×531 px a 300 DPI). Descubre qué países la exigen para pasaporte y visado, y prepara tu foto online.',
    intro:
      'El formato de 35 × 45 mm es el estándar biométrico más utilizado del mundo. Lo exigen la Unión Europea, el espacio Schengen, el Reino Unido, México y numerosos países de América Latina para pasaportes y visados. Consulta abajo la lista de países según nuestra base de requisitos verificados.',
    useCases: [
      'Pasaporte biométrico (Unión Europea, Reino Unido y numerosos países de América Latina)',
      'Visado Schengen (todos los países miembros)',
      'Visado de Canadá (el pasaporte canadiense usa 50 × 70 mm)',
      'Solicitud de residencia (visado familiar / laboral)',
    ],
    faqs: [
      {
        q: '¿Cuántos píxeles tiene una foto de 35×45 mm?',
        a: 'A 300 DPI (la resolución estándar para impresión oficial), una foto de 35 × 45 mm equivale exactamente a 413 × 531 píxeles.',
      },
      {
        q: '¿35×45 mm es lo mismo que foto carnet?',
        a: 'No exactamente. La foto carnet tradicional española mide 30 × 40 mm (3 × 4 cm), que es 5 mm más estrecha y 5 mm más corta. La foto de pasaporte de 35×45 mm tiene requisitos biométricos más estrictos (proporción facial, fondo, expresión).',
      },
      {
        q: '¿Puedo usar una foto 35×45 mm para un visado de EE.UU.?',
        a: 'No. Estados Unidos exige un formato cuadrado de 2 × 2 pulgadas (51 × 51 mm / 600 × 600 px). Las medidas de 35×45 mm no son válidas para el formulario DS-160 ni para el pasaporte estadounidense.',
      },
    ],
  },
  {
    slug: '2x2-pulgadas',
    widthMm: 51,
    heightMm: 51,
    widthPx: 600,
    heightPx: 600,
    sizeInches: '2 × 2 pulgadas',
    sizeCm: '5,1 × 5,1 cm',
    standard: '22 CFR § 51.26 (Código de Regulaciones Federales de EE. UU.)',
    standardCode: '22 CFR § 51',
    title: 'Foto 2×2 pulgadas (51×51 mm): países, px y requisitos',
    h1: 'Foto 2 × 2 pulgadas (51 × 51 mm): medidas y países',
    description:
      'Guía completa de la foto de 2×2 pulgadas (51×51 mm / 600×600 px). Necesaria para pasaporte y visa de EE.UU. (DS-160) y para otros países que usan el formato cuadrado.',
    intro:
      'El formato cuadrado de 2 × 2 pulgadas (51 × 51 mm) es el estándar oficial de Estados Unidos, tanto para el pasaporte como para todas las categorías de visa (DS-160, inmigrante y no inmigrante). Otros países también lo utilizan para su pasaporte o visado: consulta la lista de abajo.',
    useCases: [
      'Pasaporte estadounidense (libreta y tarjeta)',
      'Visa de no inmigrante DS-160 (turista B1/B2, estudiante F-1, trabajo H-1B)',
      'Visa de inmigrante (Diversidad DV, familiar)',
      'e-Visa de la India',
    ],
    faqs: [
      {
        q: '¿Cuántos píxeles tiene una foto de 2×2 pulgadas?',
        a: 'A 300 DPI, una foto de 2 × 2 pulgadas equivale a 600 × 600 píxeles. Para la solicitud digital DS-160 de EE.UU., el archivo debe pesar entre 100 KB y 240 KB en formato JPEG.',
      },
      {
        q: '¿La foto de 2×2 es la misma que la de 51×51 mm?',
        a: 'Sí. 2 pulgadas equivalen a 50,8 mm, redondeado a 51 mm. Son el mismo formato expresado en distintas unidades de medida.',
      },
      {
        q: '¿El fondo tiene que ser blanco para la foto de 2×2?',
        a: 'Para EE.UU., el fondo debe ser blanco o blanco roto, liso y sin sombras. India exige blanco puro. Algunos países aceptan un fondo claro uniforme.',
      },
    ],
  },
  {
    slug: '50x70-mm',
    widthMm: 50,
    heightMm: 70,
    widthPx: 591,
    heightPx: 827,
    sizeInches: '2 × 2,75 pulgadas',
    sizeCm: '5,0 × 7,0 cm',
    standard: 'Canadian Passport Order (SOR/81-586)',
    standardCode: 'Passport Order',
    title: 'Foto 50×70 mm: requisitos del pasaporte canadiense',
    h1: 'Foto 50 × 70 mm (5 × 7 cm): pasaporte de Canadá',
    description:
      'Guía de la foto de 50×70 mm (5×7 cm / 591×827 px) para pasaporte y documentos canadienses. Medidas, fondo, proporción facial y cómo prepararla online.',
    intro:
      'El formato de 50 × 70 mm es el que exige Canadá para su pasaporte. Es el más grande entre los estándares principales y su orientación vertical y mayores dimensiones lo hacen incompatible con el estándar europeo o estadounidense.',
    useCases: [
      'Pasaporte canadiense (libreta)',
      'Tarjeta de residencia permanente (PR Card)',
      'Solicitud de ciudadanía canadiense',
      'Permiso de trabajo y estudio',
    ],
    faqs: [
      {
        q: '¿Cuántos píxeles tiene una foto de 50×70 mm?',
        a: 'A 300 DPI, una foto de 50 × 70 mm equivale a 591 × 827 píxeles.',
      },
      {
        q: '¿Puedo usar una foto 50×70 para un pasaporte europeo?',
        a: 'No. El estándar europeo es de 35 × 45 mm, que es significativamente más pequeño. Cada país exige su propio formato.',
      },
      {
        q: '¿Qué fondo necesita la foto canadiense?',
        a: 'El fondo debe ser blanco o de color claro uniforme, sin sombras ni texturas. Se recomienda blanco puro para máxima compatibilidad.',
      },
    ],
  },
  {
    slug: '33x48-mm',
    widthMm: 33,
    heightMm: 48,
    widthPx: 390,
    heightPx: 567,
    sizeInches: '1,3 × 1,89 pulgadas',
    sizeCm: '3,3 × 4,8 cm',
    standard: 'Administración Nacional de Inmigración (NIA) de China',
    standardCode: 'NIA / MPS',
    title: 'Foto 33×48 mm: requisitos del pasaporte chino y visado',
    h1: 'Foto 33 × 48 mm (3,3 × 4,8 cm): pasaporte y visa de China',
    description:
      'Guía de la foto de 33×48 mm (3,3×4,8 cm / 390×567 px) para pasaporte chino y solicitud de visado consular. Medidas, fondo blanco y requisitos.',
    intro:
      'El formato de 33 × 48 mm es el de la República Popular China. Se utiliza tanto para el pasaporte biométrico chino como para la solicitud de visado consular en embajadas y consulados de China en el extranjero. Sus medidas no coinciden con ningún otro estándar principal.',
    useCases: [
      'Pasaporte biométrico chino',
      'Visado consular para China (turismo, negocios, estudios)',
      'Permiso de residencia en China',
      'Tarjeta de identidad de residencia temporal',
    ],
    faqs: [
      {
        q: '¿Cuántos píxeles tiene una foto de 33×48 mm?',
        a: 'A 300 DPI, una foto de 33 × 48 mm equivale a 390 × 567 píxeles.',
      },
      {
        q: '¿El fondo de la foto para China debe ser blanco?',
        a: 'Sí. La NIA (Administración Nacional de Inmigración) exige fondo blanco puro, liso y sin sombras, sin excepción.',
      },
      {
        q: '¿Puedo usar la foto de 33×48 para un pasaporte europeo?',
        a: 'No. El estándar europeo/OACI es de 35 × 45 mm. Aunque las medidas parezcan similares, difieren en anchura y altura, y serían rechazadas.',
      },
    ],
  },
];

export function getSizeFormat(slug: SizeFormatSlug): SizeFormat {
  const format = SIZE_FORMATS.find((f) => f.slug === slug);
  if (!format) throw new Error(`Unknown size format: ${slug}`);
  return format;
}

/** URL path of the size guide matching exact dimensions, or null if no guide exists. */
export function getSizeFormatPath(widthMm: number, heightMm: number): string | null {
  const format = SIZE_FORMATS.find((f) => f.widthMm === widthMm && f.heightMm === heightMm);
  return format ? `/foto-${format.slug}` : null;
}

export interface CountryFormatMatch {
  country: CountryInfo;
  /** Documents of this country whose photo uses exactly this format. */
  documents: DocumentSpec[];
}

/** Countries (from countries.json) with at least one document using exactly this format. */
export function getCountriesForFormat(format: SizeFormat): CountryFormatMatch[] {
  return COUNTRIES_DATA.map((country) => ({
    country,
    documents: country.documents.filter(
      (d) => d.widthMm === format.widthMm && d.heightMm === format.heightMm
    ),
  })).filter((m) => m.documents.length > 0);
}

export function getSizeFormatMetadata(slug: SizeFormatSlug): Metadata {
  const format = getSizeFormat(slug);
  const url = `https://fotopasaporte.app/foto-${format.slug}`;
  return {
    title: format.title,
    description: format.description,
    alternates: { canonical: url },
    openGraph: {
      title: format.title,
      description: format.description,
      url,
      locale: 'es_ES',
      type: 'article',
    },
  };
}
