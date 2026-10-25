import { CountryInfo } from '@/types';

export interface CountryAuthorityInfo {
  authorityName: string;
  department: string;
  officialDocName: string;
  regulationsStandard: string;
  typicalProcessingTime?: string;
  primaryDocumentTypes: string[];
  keyDifferencesText: string;
  specificPeculiarities: string[];
  officialPortalUrl?: string;
}

export interface CountryFAQItem {
  question: string;
  answer: string;
  link?: {
    href: string;
    text: string;
    prefix?: string;
  };
}

export interface CountryRejectionReason {
  title: string;
  description: string;
  riskLevel: 'Crítico' | 'Alto' | 'Moderado';
}

// ---------------------------------------------------------------------------
// 1. TIER 1 & TIER 2 VERIFIED DESTINATIONS (Anti-Spam Scaled Content Shield)
// Only these 28 curated destinations with deeply researched, bespoke editorial
// content are submitted to search engine sitemaps and marked for indexing.
// All long-tail territories or micronations remain 100% functional in the app
// for users, but are protected with "noindex, follow" to prevent Google's
// "Scaled Content Abuse / Spam Content Expansion" algorithmic penalties.
// ---------------------------------------------------------------------------
export const INDEXABLE_COUNTRY_CODES = new Set([
  'ES', // España
  'US', // Estados Unidos
  'GB', // Reino Unido
  'CA', // Canadá
  'MX', // México
  'DE', // Alemania
  'FR', // Francia
  'IT', // Italia
  'CO', // Colombia
  'AR', // Argentina
  'CL', // Chile
  'PE', // Perú
  'BR', // Brasil
  'IN', // India
  'AU', // Australia
  'PT', // Portugal
  'CH', // Suiza
  'NL', // Países Bajos
  'EC', // Ecuador
  'DO', // República Dominicana
  'CU', // Cuba
  'VE', // Venezuela
  'UY', // Uruguay
  'CR', // Costa Rica
  'PA', // Panamá
  'IE', // Irlanda
  'JP', // Japón
  'CN', // China
  'SV', // El Salvador
  'NI', // Nicaragua
  'PY', // Paraguay
]);

export function isIndexableCountry(code: string): boolean {
  if (!code) return false;
  return INDEXABLE_COUNTRY_CODES.has(code.toUpperCase());
}

// ---------------------------------------------------------------------------
// 2. AUTHENTIC INSTITUTIONAL DIRECTORY (28 Verified Authorities)
// ---------------------------------------------------------------------------
const COUNTRY_AUTHORITIES: Record<string, CountryAuthorityInfo> = {
  ES: {
    authorityName: 'Cuerpo Nacional de Policía / Dirección General de la Policía',
    department: 'Ministerio del Interior (Gobierno de España)',
    officialDocName: 'Pasaporte Biométrico Español',
    regulationsStandard: 'Estándar OACI (ICAO Doc 9303)',
    typicalProcessingTime: 'Consulta la web de la Policía Nacional (cita previa)',
    primaryDocumentTypes: ['Pasaporte Ordinario (35×45 mm)', 'Visado Schengen (35×45 mm)'],
    keyDifferencesText:
      'Para el pasaporte español y los visados Schengen, la foto mide 35 × 45 mm (3,5 × 4,5 cm) con fondo blanco liso y uniforme sin texturas. Si necesitas la foto para el DNI, consulta las medidas en la web oficial de la Policía Nacional, ya que esta página solo cubre pasaporte y visado.',
    specificPeculiarities: [
      'El pasaporte y el visado Schengen usan una foto de 35×45 mm.',
      'Fondo rigurosamente blanco, liso y monocromático. No se admiten fondos grises ni texturados.',
      'El óvalo facial debe ocupar entre el 70% y el 80% de la altura total de la fotografía.',
      'Gafas totalmente desaconsejadas por la Policía Nacional para evitar reflejos del flash en los lectores biométricos.',
    ],
    officialPortalUrl: 'https://www.dnielectronico.es',
  },
  US: {
    authorityName: 'Oficina de Asuntos Consulares (Departamento de Estado de EE. UU.)',
    department: 'Gobierno Federal de Estados Unidos',
    officialDocName: 'Pasaporte estadounidense (libreta/tarjeta) y visa de no inmigrante (DS-160)',
    regulationsStandard: 'Código de Regulaciones Federales (22 CFR § 51.26) y OACI Doc 9303',
    typicalProcessingTime: '6 a 8 semanas (ordinario) / 2 a 3 semanas (urgente)',
    primaryDocumentTypes: ['Pasaporte estadounidense (2×2 pulgadas)', 'Visa de no inmigrante DS-160 (600×600 px)', 'Visa de inmigrante (2×2 pulgadas)'],
    keyDifferencesText:
      'Estados Unidos utiliza el estándar cuadrado de 2 × 2 pulgadas (51 × 51 mm), con un peso de archivo digital estrictamente delimitado entre 100 KB y 240 KB para el formulario consular DS-160. Desde noviembre de 2016, está terminantemente prohibido llevar gafas en las fotos de pasaporte estadounidense.',
    specificPeculiarities: [
      'Formato cuadrado exacto de 2×2 pulgadas (51×51 mm) o 600×600 px a 300 DPI.',
      'Prohibición total de gafas (eyeglasses), incluso con receta médica (salvo informe médico firmado tras cirugía ocular).',
      'Para envíos digitales (DS-160), el peso del archivo debe ser menor o igual a 240 KB.',
      'La cabeza debe medir entre 1 pulgada y 1 3/8 pulgadas (25 a 35 mm) desde la barbilla hasta la coronilla.',
    ],
    officialPortalUrl: 'https://travel.state.gov',
  },
  GB: {
    authorityName: 'Oficina de Pasaportes de Su Majestad (HMPO) / Visados e Inmigración del Reino Unido (UKVI)',
    department: 'Home Office (Reino Unido)',
    officialDocName: 'Pasaporte británico y visado del Reino Unido',
    regulationsStandard: 'Normas de fotografía de pasaporte del Reino Unido y OACI Doc 9303',
    typicalProcessingTime: '3 a 10 semanas según modalidad',
    primaryDocumentTypes: ['Pasaporte británico (35×45 mm)', 'Solicitud de visado UKVI (35×45 mm)'],
    keyDifferencesText:
      'A diferencia de la mayoría de países europeos, el Reino Unido PROHÍBE explícitamente el fondo blanco puro. La normativa de HMPO exige un fondo liso de color crema o gris claro para garantizar el contraste con el tono de la piel y el cabello.',
    specificPeculiarities: [
      'Prohibido el fondo blanco puro: debe ser obligatoriamente crema o gris claro.',
      'Altura del rostro entre 29 mm y 34 mm (desde la barbilla hasta la parte superior de la cabeza).',
      'Sin sonreír ni mostrar dientes; boca cerrada y ojos totalmente abiertos.',
      'Para solicitud online, el archivo digital debe tener al menos 600 px de ancho por 750 px de alto.',
    ],
    officialPortalUrl: 'https://www.gov.uk/photos-for-passports',
  },
  CA: {
    authorityName: 'Inmigración, Refugiados y Ciudadanía de Canadá (IRCC) / Programa de Pasaportes',
    department: 'Gobierno de Canadá',
    officialDocName: 'Pasaporte canadiense y Autorización Electrónica de Viaje (eTA)',
    regulationsStandard: 'Orden del Pasaporte Canadiense e ISO/IEC 19794-5',
    typicalProcessingTime: '10 a 20 días hábiles',
    primaryDocumentTypes: ['Pasaporte canadiense (50×70 mm)', 'Visa de residente temporal (35×45 mm)'],
    keyDifferencesText:
      'El pasaporte canadiense utiliza un formato vertical grande y único de 50 × 70 mm (2 × 2 3/4 pulgadas), sensiblemente superior al estándar europeo. La cara debe medir exactamente entre 31 y 36 mm de largo. En solicitudes físicas, el reverso de una de las fotos debe incluir el sello o datos de identidad del fotógrafo.',
    specificPeculiarities: [
      'Medidas oficiales grandes de 50×70 mm para pasaporte y tarjeta de residencia.',
      'Altura de la cabeza entre 31 mm y 36 mm desde la barbilla a la coronilla.',
      'Fondo blanco o color claro uniforme sin sombras.',
      'Los visados temporales canadienses suelen utilizar el formato estándar de 35×45 mm.',
    ],
    officialPortalUrl: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-passports/photos.html',
  },
  MX: {
    authorityName: 'Secretaría de Relaciones Exteriores (SRE)',
    department: 'Gobierno de México',
    officialDocName: 'Pasaporte Mexicano Biométrico (G-Biométrico)',
    regulationsStandard: 'Reglamento de Pasaportes y del Documento de Identidad y Viaje',
    typicalProcessingTime: 'Entrega el mismo día con cita en delegación SRE',
    primaryDocumentTypes: ['Pasaporte Mexicano (35×45 mm)', 'Visa Mexicana Consular (35×45 mm)', 'Cartilla Militar (35×45 mm)'],
    keyDifferencesText:
      'La Secretaría de Relaciones Exteriores (SRE) exige que la fotografía sea tomada de frente, a color, con fondo blanco liso, cabeza descubierta y sin aretes, collares o gafas. Las orejas y la frente deben estar completamente visibles sin mechones de pelo.',
    specificPeculiarities: [
      'Frente y orejas totalmente despejadas y descubiertas.',
      'Sin aretes, pendientes, collares, piercings ni maquillaje excesivo.',
      'Fondo blanco uniforme y homogéneo sin sombras detrás de la cabeza.',
      'Fotografía reciente con una antigüedad máxima de 30 días.',
    ],
    officialPortalUrl: 'https://www.gob.mx/sre',
  },
  DE: {
    authorityName: 'Bundesministerium des Innern und für Heimat (BMI) / Bundesdruckerei',
    department: 'Bundesrepublik Deutschland',
    officialDocName: 'Deutscher Reisepass & Personalausweis',
    regulationsStandard: 'Passgesetz (PassG) & Passdatenerfassungs- und Prüfverordnung',
    typicalProcessingTime: '3 a 6 semanas',
    primaryDocumentTypes: ['Reisepass (35×45 mm)', 'Personalausweis (35×45 mm)', 'Visum (35×45 mm)'],
    keyDifferencesText:
      'Alemania aplica la estricta Fotomustertafel (matriz de plantilla biométrica oficial). El rostro debe ocupar entre 32 y 36 mm (70-80% de la foto) y el fondo debe ser obligatoriamente gris claro monocromático sin patrones.',
    specificPeculiarities: [
      'Plantilla biométrica alemana (Fotomustertafel) estricta con altura facial de 32 a 36 mm.',
      'Fondo gris claro neutro (no blanco brillante).',
      'Ojos centrados verticalmente en la zona delimitada por la matriz biométrica.',
      'Mirada neutra y boca completamente cerrada.',
    ],
    officialPortalUrl: 'https://www.personalausweisportal.de',
  },
  FR: {
    authorityName: 'Agence Nationale des Titres Sécurisés (ANTS) / Ministère de l’Intérieur',
    department: 'République Française',
    officialDocName: 'Passeport biométrique français & Carte Nationale d’Identité (CNI)',
    regulationsStandard: 'Norme ISO/IEC 19794-5 & Décret n° 2005-1726',
    typicalProcessingTime: '2 a 4 semanas',
    primaryDocumentTypes: ['Passeport (35×45 mm)', 'Carte d’identité CNI (35×45 mm)', 'Visa France (35×45 mm)'],
    keyDifferencesText:
      'Francia prohíbe taxativamente el fondo blanco puro. Debe ser un fondo claro de color gris o azul claro uniforme. El rostro debe medir entre 32 y 36 mm desde la base de la barbilla hasta la coronilla.',
    specificPeculiarities: [
      'Prohibición expresa de fondo blanco puro: debe ser gris claro o azul pastel.',
      'Altura de la cabeza entre 32 y 36 mm (70% al 80% de la imagen).',
      'Sin accesorios en el pelo (diademas, horquillas vistosas) ni cabeza cubierta salvo motivos religiosos.',
      'Boca cerrada sin sonreír y cabeza totalmente recta.',
    ],
    officialPortalUrl: 'https://ants.gouv.fr',
  },
  IT: {
    authorityName: 'Polizia di Stato / Ministero dell’Interno',
    department: 'Repubblica Italiana',
    officialDocName: 'Passaporto Elettronico & Carta d’Identità Elettronica (CIE)',
    regulationsStandard: 'Normativa ICAO Doc 9303 & D.M. 303/2014',
    typicalProcessingTime: '2 a 4 semanas con reserva previa en agenda online',
    primaryDocumentTypes: ['Passaporto Ordinario (35×45 mm)', 'Carta d’Identità CIE (35×45 mm)', 'Visto per l’Italia'],
    keyDifferencesText:
      'En Italia, tanto el pasaporte biométrico como la Carta d’Identità CIE siguen el formato ICAO de 35 × 45 mm con fondo blanco liso. La cabeza debe estar perfectamente centrada y representar entre el 70% y el 80% de la fotografía.',
    specificPeculiarities: [
      'Dimensiones estándar 35×45 mm a 300 DPI.',
      'Fondo blanco uniforme y homogéneo sin sombras detrás del cuello.',
      'Ojos en el eje horizontal central con mirada directa.',
      'Sin adornos que oculten el contorno de la cara.',
    ],
    officialPortalUrl: 'https://www.passaportonline.poliziadistato.it',
  },
  CO: {
    authorityName: 'Ministerio de Relaciones Exteriores (Cancillería de Colombia)',
    department: 'Gobierno de la República de Colombia',
    officialDocName: 'Pasaporte Colombiano y Visa Colombiana',
    regulationsStandard: 'Directrices de la Cancillería & OACI Doc 9303',
    typicalProcessingTime: 'Consulta los plazos en el portal de la Cancillería',
    primaryDocumentTypes: ['Pasaporte (30×40 mm)', 'Visa Colombiana (30×40 mm)'],
    keyDifferencesText:
      'Para el pasaporte y la visa de Colombia, la foto mide 30 × 40 mm, a color, con fondo blanco liso y rostro despejado sin brillo ni sombras.',
    specificPeculiarities: [
      'Fondo blanco puro uniforme.',
      'Rostro centrado de frente con ambos hombros visibles.',
      'Sin prendas brillantes ni ropa blanca que se confunda con el fondo.',
      'Orejas y frente descubiertas.',
    ],
    officialPortalUrl: 'https://www.cancilleria.gov.co/tramites_servicios/pasaportes',
  },
  AR: {
    authorityName: 'Registro Nacional de las Personas (RENAPER)',
    department: 'Ministerio del Interior (República Argentina)',
    officialDocName: 'Pasaporte Argentino y DNI Tarjeta',
    regulationsStandard: 'Ley Nacional de Identificación & Normativa OACI',
    typicalProcessingTime: '15 días hábiles (regular) / 48 a 96 h (exprés)',
    primaryDocumentTypes: ['Pasaporte (35×45 mm)', 'Visado (35×45 mm)'],
    keyDifferencesText:
      'Para el pasaporte y el visado de Argentina, la foto mide 35 × 45 mm (3,5 × 4,5 cm) con fondo blanco liso. Si necesitas la foto para el DNI, consulta las medidas en la web oficial de RENAPER, ya que esta página solo cubre pasaporte y visado.',
    specificPeculiarities: [
      'Formato 35×45 mm para pasaporte y visado.',
      'Fondo blanco liso sin sombras.',
      'Busto frontal con cabeza erguida.',
      'Mirada fija a la cámara con expresión neutra.',
    ],
    officialPortalUrl: 'https://www.argentina.gob.ar/interior/renaper/pasaporte',
  },
  CL: {
    authorityName: 'Servicio de Registro Civil e Identificación de Chile',
    department: 'Ministerio de Justicia y Derechos Humanos (Chile)',
    officialDocName: 'Pasaporte Chileno Biométrico y Cédula de Identidad',
    regulationsStandard: 'Decreto Supremo de Identificación & OACI',
    typicalProcessingTime: '8 a 15 días hábiles',
    primaryDocumentTypes: ['Pasaporte (35×45 mm)', 'Visa (35×45 mm)'],
    keyDifferencesText:
      'Para el pasaporte y la visa de Chile, la foto mide 35 × 45 mm (3,5 × 4,5 cm) con fondo blanco liso. Si necesitas la foto para la cédula de identidad, consulta las medidas en la web del Registro Civil, ya que esta página solo cubre pasaporte y visa.',
    specificPeculiarities: [
      'Medidas de 35×45 mm para pasaporte y visa.',
      'Fondo blanco parejo sin sombras.',
      'Rostro despejado, sin flequillos que tapen las cejas.',
      'Sin sonreír y con expresión relajada.',
    ],
    officialPortalUrl: 'https://www.registrocivil.cl',
  },
  PE: {
    authorityName: 'Superintendencia Nacional de Migraciones / RENIEC',
    department: 'Ministerio del Interior (Perú)',
    officialDocName: 'Pasaporte Electrónico Peruano y DNI Electrónico (DNIe)',
    regulationsStandard: 'Directiva de Emisión de Pasaportes & OACI',
    typicalProcessingTime: 'Entrega el mismo día de la cita',
    primaryDocumentTypes: ['Pasaporte Electrónico (35×45 mm)', 'DNI Electrónico (35×45 mm)', 'Visa Peruana'],
    keyDifferencesText:
      'Migraciones Perú y RENIEC exigen fotografías de tamaño carné / pasaporte de 35 × 45 mm con fondo blanco liso, sin gafas, sin prendas oscuras en la cabeza y con las orejas visibles.',
    specificPeculiarities: [
      'Dimensiones 35×45 mm.',
      'Fondo blanco liso sin sombras.',
      'Orejas y frente descubiertas.',
      'Sin lentes ni prendas en la cabeza.',
    ],
    officialPortalUrl: 'https://www.gob.pe/migraciones',
  },
  IN: {
    authorityName: 'Passport Seva / Ministerio de Asuntos Exteriores (MEA)',
    department: 'Gobierno de la India',
    officialDocName: 'Pasaporte indio y e-Visa de la India',
    regulationsStandard: 'Reglamento de Pasaportes de 1980 y OACI Doc 9303',
    typicalProcessingTime: '1 a 3 semanas',
    primaryDocumentTypes: ['Pasaporte indio (35×45 mm)', 'Visa de la India (51×51 mm)'],
    keyDifferencesText:
      'Para el pasaporte indio la foto mide 35 × 45 mm, y para la visa de la India se usa el formato cuadrado de 51 × 51 mm (2 × 2 pulgadas). Para la e-Visa en línea, la foto debe subirse en formato JPEG cuadrado. Comprueba el peso y los requisitos exactos en el portal oficial.',
    specificPeculiarities: [
      'Pasaporte: 35×45 mm. Visa: formato cuadrado 51×51 mm (2×2 pulgadas).',
      'Fondo blanco sólido y uniforme.',
      'Rostro entre el 60% y el 75% del marco.',
      'Para e-Visa online: imagen cuadrada 1:1, formato JPEG.',
    ],
    officialPortalUrl: 'https://portal2.passportindia.gov.in',
  },
  AU: {
    authorityName: 'Oficina de Pasaportes de Australia (APO)',
    department: 'Departamento de Asuntos Exteriores y Comercio (DFAT)',
    officialDocName: 'Pasaporte australiano y visas ETA / eVisitor',
    regulationsStandard: 'Determinación de Pasaportes de Australia 2015 y OACI Doc 9303',
    typicalProcessingTime: '6 a 10 semanas',
    primaryDocumentTypes: ['Pasaporte australiano (35×45 mm)', 'Visa australiana (35×45 mm)'],
    keyDifferencesText:
      'Australia exige fotografías de 35 × 45 mm donde el rostro (desde la barbilla hasta la coronilla) mida obligatoriamente entre 32 mm y 36 mm. El fondo debe ser blanco o gris muy claro uniforme.',
    specificPeculiarities: [
      'Altura del rostro estricta: entre 32 mm y 36 mm.',
      'Fondo blanco o gris muy claro sin sombras.',
      'Sin gafas para evitar reflejos o sombras en los ojos.',
      'Impresión en papel satinado o mate de calidad fotográfica.',
    ],
    officialPortalUrl: 'https://www.passports.gov.au',
  },
  BR: {
    authorityName: 'Polícia Federal (PF)',
    department: 'Ministério da Justiça e Segurança Pública (Brasil)',
    officialDocName: 'Passaporte Brasileiro Biométrico',
    regulationsStandard: 'Instrução Normativa da Polícia Federal & Padrão ICAO',
    typicalProcessingTime: '6 a 10 días hábiles',
    primaryDocumentTypes: ['Pasaporte brasileño (35×45 mm)', 'Visa de Brasil (35×45 mm)'],
    keyDifferencesText:
      'Para el pasaporte y la visa de Brasil, la foto mide 35 × 45 mm (3,5 × 4,5 cm) con fondo blanco liso. Consulta siempre los requisitos vigentes en el portal de la Polícia Federal.',
    specificPeculiarities: [
      'Formato 35×45 mm para pasaporte y visa.',
      'Fondo blanco liso y uniforme.',
      'Rostro centrado con hombros descubiertos de accesorios voluminosos.',
      'Sin gafas de montura ancha ni tintes.',
    ],
    officialPortalUrl: 'https://www.gov.br/pf/pt-br/assuntos/passaporte',
  },
  PT: {
    authorityName: 'Agência para a Integração, Migrações e Asilo (AIMA) / IRN',
    department: 'Ministério da Justiça (Portugal)',
    officialDocName: 'Passaporte Electrónico Português (PEP) e Cartão de Cidadão',
    regulationsStandard: 'Decreto-Lei n.º 83/2000 e Norma ICAO Doc 9303',
    typicalProcessingTime: '5 a 10 días laborables',
    primaryDocumentTypes: ['Passaporte Português (35×45 mm)', 'Cartão de Cidadão (35×45 mm)', 'Visto Nacional / Schengen'],
    keyDifferencesText:
      'Portugal aplica la norma biométrica europea ICAO de 35 × 45 mm con fondo blanco o gris muy claro homogéneo. La cara debe ocupar entre 32 y 36 mm con ojos plenamente visibles y expresión estrictamente neutra.',
    specificPeculiarities: [
      'Medidas estándar europeas 35×45 mm a 300 DPI.',
      'Fondo blanco o gris muy claro uniforme sin sombras.',
      'Rostro erguido centrado horizontalmente.',
      'Sin gafas reflectantes ni flequillo sobre las cejas.',
    ],
    officialPortalUrl: 'https://justica.gov.pt/Servicos/Pedir-Passaporte-Eletronico-Portugues',
  },
  CH: {
    authorityName: 'Oficina Federal de Policía (fedpol)',
    department: 'Departamento Federal de Justicia y Policía (Suiza)',
    officialDocName: 'Schweizer Pass (Pass 10) & Identitätskarte',
    regulationsStandard: 'Kriterien für die Annahme von Passfotos (fedpol) & ICAO',
    typicalProcessingTime: '10 a 15 días hábiles',
    primaryDocumentTypes: ['Schweizer Pass (35×45 mm)', 'Identitätskarte (35×45 mm)', 'Visum Schweiz'],
    keyDifferencesText:
      'La Oficina Federal de Policía helvética aplica criterios milimétricos: 35 × 45 mm, con una altura de rostro entre 29 y 34 mm para adultos y fondo monocromático liso en gris claro (se rechazan fondos oscuros o texturas).',
    specificPeculiarities: [
      'Fondo liso gris claro uniforme sin sombras.',
      'Altura de la cabeza entre 29 mm y 34 mm.',
      'Mirada frontal neutra con boca cerrada sin sonreír.',
      'Sin brillo en la frente o mejillas por iluminación directa.',
    ],
    officialPortalUrl: 'https://www.fedpol.admin.ch',
  },
  NL: {
    authorityName: 'Ministerie van Binnenlandse Zaken en Koninkrijksrelaties / Rijksoverheid',
    department: 'Gobierno de los Países Bajos',
    officialDocName: 'Nederlands Paspoort & Nederlandse Identiteitskaart (ID-kaart)',
    regulationsStandard: 'Fotomatrix Model 2020 & Paspoortwet',
    typicalProcessingTime: '5 días hábiles',
    primaryDocumentTypes: ['Nederlands Paspoort (35×45 mm)', 'ID-kaart (35×45 mm)', 'Schengenvisum'],
    keyDifferencesText:
      'Los Países Bajos se rigen por la estricta Fotomatrix 2020: 35 × 45 mm, ancho de la cara entre 16 y 20 mm (de oreja a oreja) y altura del rostro entre 26 y 30 mm (desde la base de la barbilla a la coronilla). Fondo gris claro o azul pastel uniforme.',
    specificPeculiarities: [
      'Norma estricta Fotomatrix 2020 con ancho y largo facial milimétrico.',
      'Fondo gris claro, azul claro o blanco roto uniforme.',
      'Ambos ojos completamente abiertos y nivelados.',
      'Gafas totalmente transparentes sin reflejos de flash.',
    ],
    officialPortalUrl: 'https://www.rijksoverheid.nl/onderwerpen/paspoort-en-identiteitskaart',
  },
  EC: {
    authorityName: 'Ministerio de Relaciones Exteriores y Movilidad Humana (Cancillería de Ecuador)',
    department: 'Gobierno de la República del Ecuador',
    officialDocName: 'Pasaporte Ecuatoriano y Visa',
    regulationsStandard: 'Directrices de la Cancillería & OACI Doc 9303',
    typicalProcessingTime: 'Consulta los plazos en el portal oficial',
    primaryDocumentTypes: ['Pasaporte (51×51 mm)', 'Visa (51×51 mm)'],
    keyDifferencesText:
      'Para el pasaporte y la visa de Ecuador, la foto es cuadrada de 51 × 51 mm (2 × 2 pulgadas), a color, con fondo blanco, frente y orejas descubiertas y sin gafas.',
    specificPeculiarities: [
      'Formato cuadrado de 51×51 mm (2×2 pulgadas) a 300 DPI.',
      'Fondo blanco nítido sin sombras detrás de los hombros.',
      'Frente y orejas despejadas; cabello recogido.',
      'Expresión facial neutra sin sonrisa.',
    ],
    officialPortalUrl: 'https://www.cancilleria.gob.ec/',
  },
  DO: {
    authorityName: 'Dirección General de Pasaportes (DGP)',
    department: 'Ministerio de Relaciones Exteriores (República Dominicana)',
    officialDocName: 'Libreta de Pasaporte de Lectura Mecánica / Biométrico Dominicano',
    regulationsStandard: 'Reglamento de Pasaportes de la DGP & Norma OACI',
    typicalProcessingTime: '3 a 6 días hábiles (ordinario) / mismo día (VIP)',
    primaryDocumentTypes: ['Pasaporte Dominicano (2×2 pulgadas / 51×51 mm)', 'Cédula de Identidad', 'Visa Dominicana'],
    keyDifferencesText:
      'La Dirección General de Pasaportes de República Dominicana utiliza el formato cuadrado internacional de 2 × 2 pulgadas (51 × 51 mm), idéntico al estándar estadounidense, con fondo blanco impecable y rostro ocupando el 70% del cuadro.',
    specificPeculiarities: [
      'Formato cuadrado oficial de 2×2 pulgadas (51×51 mm) o 600×600 px.',
      'Fondo blanco sólido sin sombras ni degradados.',
      'Sin aretes grandes, cadenas vistosas ni prendas en la cabeza.',
      'Rostro centrado con mirada fija a la cámara.',
    ],
    officialPortalUrl: 'https://pasaportes.gob.do',
  },
  CU: {
    authorityName: 'Dirección de Identificación, Inmigración y Extranjería (DIIE)',
    department: 'Ministerio del Interior (República de Cuba)',
    officialDocName: 'Pasaporte Oficial de la República de Cuba',
    regulationsStandard: 'Ley de Migración & Normas Consulares Cubanas',
    typicalProcessingTime: '2 a 8 semanas según país de tramitación',
    primaryDocumentTypes: ['Pasaporte cubano (45×45 mm)', 'Visa (35×45 mm)'],
    keyDifferencesText:
      'Para trámites consulares de pasaporte cubano en embajadas y consulados en el extranjero, se exige formato a color con fondo blanco puro, ropa oscura de cuello cerrado y rostro totalmente descubierto sin lentes.',
    specificPeculiarities: [
      'Pasaporte: formato cuadrado 45×45 mm. Visa: 35×45 mm.',
      'Fondo blanco uniforme sin sombras en la pared.',
      'Vestimenta formal de color oscuro para garantizar contraste.',
      'Sin gafas, aretes ni cabello tapando el óvalo facial.',
    ],
    officialPortalUrl: 'https://misiones.cubaminrex.cu',
  },
  VE: {
    authorityName: 'Servicio Administrativo de Identificación, Migración y Extranjería (SAIME)',
    department: 'Ministerio del Poder Popular para Relaciones Interiores (Venezuela)',
    officialDocName: 'Pasaporte Biométrico y Prórroga de Pasaporte Venezolano',
    regulationsStandard: 'Gaceta Oficial de la República Bolivariana de Venezuela & OACI',
    typicalProcessingTime: 'Variable según citas SAIME y valija consular',
    primaryDocumentTypes: ['Pasaporte Venezolano (35×45 mm)', 'Cédula de Identidad', 'Prórroga de Pasaporte'],
    keyDifferencesText:
      'Para citas consulares y solicitudes del SAIME, la foto debe cumplir el estándar de 35 × 45 mm, fondo blanco puro, vestimenta formal sin escotes pronunciados ni hombros descubiertos, orejas visibles y mirada frontal.',
    specificPeculiarities: [
      'Tamaño 35×45 mm en alta resolución (300 DPI).',
      'Fondo blanco liso sin sombras.',
      'Ropa de color oscuro con cuello (prohibido blanco o escotes).',
      'Frente y orejas despejadas, sin piercing ni lentes.',
    ],
    officialPortalUrl: 'http://www.saime.gob.ve',
  },
  UY: {
    authorityName: 'Dirección Nacional de Identificación Civil (DNIC)',
    department: 'Ministerio del Interior (República Oriental del Uruguay)',
    officialDocName: 'Pasaporte Uruguayo con Chip Biométrico y Cédula de Identidad',
    regulationsStandard: 'Decreto del Poder Ejecutivo sobre Documento de Viaje & OACI',
    typicalProcessingTime: 'Entrega en el acto con audiencia agendada',
    primaryDocumentTypes: ['Pasaporte Uruguayo (35×45 mm)', 'Cédula de Identidad Digital (35×45 mm)', 'Visado'],
    keyDifferencesText:
      'Uruguay aplica el formato estándar de 35 × 45 mm con fondo blanco liso. La persona debe ubicarse de frente con hombros rectos, ojos abiertos a la altura media y sin accesorios que modifiquen los rasgos biométricos.',
    specificPeculiarities: [
      'Dimensiones 35×45 mm a 300 DPI.',
      'Fondo blanco parejo sin reflejos.',
      'Sin lentes ni prendas en la cabeza.',
      'Expresión facial neutra con boca cerrada.',
    ],
    officialPortalUrl: 'https://dnic.minterior.gub.uy',
  },
  CR: {
    authorityName: 'Dirección General de Migración y Extranjería',
    department: 'Ministerio de Gobernación y Policía (Costa Rica)',
    officialDocName: 'Pasaporte Biométrico Costarricense y Cédula de Residencia (DIMEX)',
    regulationsStandard: 'Reglamento General a la Ley de Migración & OACI',
    typicalProcessingTime: '8 a 15 días hábiles (oficinas de Correos o Banco)',
    primaryDocumentTypes: ['Pasaporte biométrico (35×45 mm)', 'Visa costarricense (35×45 mm)'],
    keyDifferencesText:
      'Para el pasaporte y la visa de Costa Rica, la foto mide 35 × 45 mm. Fondo blanco liso, rostro descubierto, sin gafas y sin prendas que cubran la cabeza.',
    specificPeculiarities: [
      'Formato 35×45 mm para pasaporte y visa.',
      'Fondo blanco uniforme y homogéneo.',
      'Mirada frontal directa con ojos descubiertos.',
      'Sin accesorios reflectantes ni maquillaje excesivo.',
    ],
    officialPortalUrl: 'https://www.migracion.go.cr',
  },
  PA: {
    authorityName: 'Autoridad de Pasaportes de Panamá (APAP)',
    department: 'Gobierno de la República de Panamá',
    officialDocName: 'Pasaporte Electrónico Panameño con Chip Biométrico',
    regulationsStandard: 'Ley Orgánica de la Autoridad de Pasaportes & OACI Doc 9303',
    typicalProcessingTime: '24 horas hábiles (sede central)',
    primaryDocumentTypes: ['Pasaporte panameño (35×45 mm)', 'Visa panameña (51×51 mm)'],
    keyDifferencesText:
      'Para el pasaporte panameño la foto mide 35 × 45 mm y para la visa 51 × 51 mm, con fondo blanco sin sombras, cabello peinado detrás de las orejas y sin lentes ni accesorios llamativos.',
    specificPeculiarities: [
      'Pasaporte: 35×45 mm. Visa: 51×51 mm.',
      'Fondo blanco sin ningún tipo de sombra o degradado.',
      'Hombros cubiertos con vestimenta de color oscuro.',
      'Sin sonreír ni mostrar dientes.',
    ],
    officialPortalUrl: 'https://www.pasaporte.gob.pa',
  },
  IE: {
    authorityName: 'Servicio de Pasaportes (Departamento de Asuntos Exteriores)',
    department: 'Gobierno de Irlanda',
    officialDocName: 'Pasaporte irlandés (libreta y tarjeta, solicitud en línea)',
    regulationsStandard: 'Ley de Pasaportes 2008 y OACI Doc 9303',
    typicalProcessingTime: '10 a 20 días laborables vía Passport Online',
    primaryDocumentTypes: ['Pasaporte irlandés (35×45 mm)', 'Visado (35×45 mm)'],
    keyDifferencesText:
      'Irlanda cuenta con el sistema «Passport Online», que valida digitalmente la fotografía. El fondo debe ser gris claro o crema uniforme (nunca blanco puro ni oscuro), y la cabeza debe medir entre 32 y 36 mm.',
    specificPeculiarities: [
      'Fondo liso gris claro o crema (se rechazan fondos blancos brillantes).',
      'Medidas oficiales 35×45 mm o archivo digital con ancho mínimo de 715 px y alto de 951 px.',
      'Sin gafas de montura gruesa ni reflejos.',
      'Ojos centrados en la mitad superior con mirada directa.',
    ],
    officialPortalUrl: 'https://www.dfa.ie/passports',
  },
  JP: {
    authorityName: 'Ministerio de Asuntos Exteriores de Japón (MOFA)',
    department: 'Gobierno de Japón',
    officialDocName: 'Pasaporte Japonés Biométrico (Tabiken)',
    regulationsStandard: 'Ley de Pasaportes de Japón y OACI Doc 9303',
    typicalProcessingTime: '6 a 8 días hábiles',
    primaryDocumentTypes: ['Pasaporte Japonés (35×45 mm)', 'Visado para Japón', 'Certificado de Elegibilidad'],
    keyDifferencesText:
      'Japón aplica una de las normativas de recorte más rigurosas del mundo: formato 35 × 45 mm, distancia de 2 a 6 mm desde el borde superior de la foto a la coronilla, y altura de la cabeza de 32 a 36 mm. Fondo blanco o azul muy claro uniforme.',
    specificPeculiarities: [
      'Tolerancia de 2 a 6 mm de margen entre la coronilla y el borde superior.',
      'Altura del rostro estricta de 32 mm a 36 mm.',
      'Fondo liso y uniforme sin sombras.',
      'Sin gafas con reflejos ni accesorios en el cabello.',
    ],
    officialPortalUrl: 'https://www.mofa.go.jp/mofaj/toko/passport/index.html',
  },
  CN: {
    authorityName: 'Administración Nacional de Inmigración (NIA) / MPS',
    department: 'República Popular China',
    officialDocName: 'Pasaporte Chino Biométrico y Visado Consular Chino',
    regulationsStandard: 'Ley de Pasaportes de la RPC y Estándar Nacional Chino',
    typicalProcessingTime: '7 a 15 días laborables',
    primaryDocumentTypes: ['Pasaporte Chino (33×48 mm)', 'Visado Consular Chino (33×48 mm)', 'Residencia'],
    keyDifferencesText:
      'China utiliza un tamaño único en el mundo de 33 × 48 mm (diferente al estándar occidental de 35×45 mm). La cabeza debe medir entre 28 y 33 mm de largo y entre 15 y 22 mm de ancho. El fondo debe ser rigurosamente blanco puro.',
    specificPeculiarities: [
      'Dimensiones especiales de 33×48 mm (proporción propia china).',
      'Altura de la cabeza entre 28 mm y 33 mm; ancho facial entre 15 mm y 22 mm.',
      'Distancia de 3 a 5 mm desde el borde superior hasta la coronilla.',
      'Fondo rigurosamente blanco sin sombras.',
    ],
    officialPortalUrl: 'https://en.nia.gov.cn',
  },
  SV: {
    authorityName: 'Dirección General de Migración y Extranjería (DGME) / RNPN',
    department: 'Ministerio de Justicia y Seguridad Pública (Gobierno de El Salvador)',
    officialDocName: 'Pasaporte Biométrico Salvadoreño y Documento Único de Identidad (DUI)',
    regulationsStandard: 'Ley Especial de Migración y de Extranjería & ICAO Doc 9303',
    typicalProcessingTime: 'Expedición en el mismo día con cita en sucursales DGME',
    primaryDocumentTypes: ['Pasaporte biométrico (51×51 mm)', 'Visa (51×51 mm)'],
    keyDifferencesText:
      'Para el pasaporte y la visa de El Salvador, la foto es cuadrada de 51 × 51 mm (2 × 2 pulgadas), con fondo blanco liso, orejas y frente totalmente despejadas y sin gafas. Si necesitas la foto para el DUI, consulta las medidas en el portal oficial, ya que esta página solo cubre pasaporte y visa.',
    specificPeculiarities: [
      'Pasaporte y visa: formato cuadrado de 51×51 mm (2×2 pulgadas).',
      'Resolución recomendada de 300 DPI.',
      'Fondo rigurosamente blanco liso, sin sombras detrás de los hombros.',
      'Orejas, frente y cejas descubiertas; sin aretes llamativos ni gafas.',
    ],
    officialPortalUrl: 'https://www.migracion.gob.sv',
  },
  NI: {
    authorityName: 'Dirección General de Migración y Extranjería (DGME Nicaragua)',
    department: 'Ministerio del Interior (Gobierno de Nicaragua)',
    officialDocName: 'Pasaporte Ordinario Nicaragüense y Cédula de Identidad',
    regulationsStandard: 'Ley General de Migración y Extranjería (Ley N°. 761) & OACI',
    typicalProcessingTime: '8 a 15 días hábiles',
    primaryDocumentTypes: ['Pasaporte Nicaragüense (50×50 mm o 35×45 mm)', 'Cédula Ciudadana', 'Visa Nicaragüense'],
    keyDifferencesText:
      'La DGME de Nicaragua y los consulados en el extranjero exigen fotografías a color, recientes, en formato de 50 × 50 mm (2 × 2 pulgadas) o 35 × 45 mm según la sede, con fondo blanco sólido, vestimenta formal de color oscuro y vista frontal recta con expresión neutra.',
    specificPeculiarities: [
      'Medidas oficiales: 50×50 mm (2×2 pulgadas) o estándar OACI 35×45 mm a 300 DPI.',
      'Fondo blanco sólido y uniforme sin sombras ni texturas.',
      'Vestimenta formal de cuello cerrado y color oscuro para contraste.',
      'Sin gorras, pañuelos, aretes vistosos ni lentes.',
    ],
    officialPortalUrl: 'https://www.migob.gob.ni',
  },
  PY: {
    authorityName: 'Departamento de Identificaciones de la Policía Nacional',
    department: 'Ministerio del Interior (República del Paraguay)',
    officialDocName: 'Pasaporte Electrónico Policial y Cédula de Identidad Civil',
    regulationsStandard: 'Ley N° 222/1993 Orgánica de la Policía Nacional & Estándar OACI',
    typicalProcessingTime: '15 a 20 días hábiles',
    primaryDocumentTypes: ['Pasaporte Electrónico (35×45 mm)', 'Cédula de Identidad Civil (35×45 mm)', 'Visa Consular'],
    keyDifferencesText:
      'El Departamento de Identificaciones de la Policía Nacional de Paraguay estipula que la foto para pasaporte y cédula de identidad civil debe cumplir el formato de 35 × 45 mm con fondo blanco puro liso, expresión facial neutra, hombros paralelos a la cámara y sin prendas que oculten las facciones.',
    specificPeculiarities: [
      'Medidas oficiales de 35×45 mm (tamaño pasaporte y cédula paraguaya).',
      'Fondo blanco homogéneo sin sombras detrás del sujeto.',
      'Frente y orejas despejadas, sin gafas oscuras ni de montura gruesa.',
      'Expresión seria con la boca cerrada y mirada frontal.',
    ],
    officialPortalUrl: 'https://www.identificaciones.gov.py',
  },
};

// ---------------------------------------------------------------------------
// 3. BESPOKE COUNTRY REJECTION REASONS (Anti-Duplicate Content Guard)
// ---------------------------------------------------------------------------
const COUNTRY_SPECIFIC_REJECTION_REASONS: Record<string, CountryRejectionReason[]> = {
  US: [
    {
      title: 'Uso de gafas (incluso con receta médica graduada)',
      description:
        'Desde el 1 de noviembre de 2016, el Departamento de Estado de EE.UU. prohíbe terminantemente el uso de gafas en fotos de pasaporte y visa americana (DS-160). Es la causa número uno de rechazo automático consular.',
      riskLevel: 'Crítico',
    },
    {
      title: 'Peso de archivo superior a 240 KB en el formulario DS-160',
      description:
        'Para solicitudes digitales en el portal CEAC consular estadounidense, la foto no puede exceder 240 KB ni tener una resolución menor a 600×600 px. Nuestra herramienta exporta el archivo comprimido a menos de 240 KB automáticamente.',
      riskLevel: 'Crítico',
    },
    {
      title: 'Formato rectangular en lugar del cuadrado 2×2 pulgadas',
      description:
        'A diferencia del estándar europeo de 35×45 mm, Estados Unidos exige una proporción cuadrada perfecta 1:1 de 51×51 mm (2×2 pulgadas). Subir fotos rectangulares distorsionará la imagen.',
      riskLevel: 'Crítico',
    },
    {
      title: 'Sombras visibles tras la cabeza o en el cuello',
      description:
        'El fondo debe ser blanco sólido o blanquecino sin sombras proyectadas por iluminación cenital directa. Es vital colocarse a 50 cm de la pared para evitar sombras tras la nuca.',
      riskLevel: 'Alto',
    },
    {
      title: 'Prendas con aspecto de uniforme militar o laboral',
      description:
        'Las directrices de 22 CFR § 51.26 prohíben prendas de uniforme o camuflaje, así como vestimenta institucional en la foto de pasaporte estadounidense.',
      riskLevel: 'Moderado',
    },
    {
      title: 'Sonrisa exagerada o dientes a la vista',
      description:
        'El sistema biométrico del U.S. State Department exige una expresión facial neutra o una leve sonrisa natural con labios cerrados y ambos ojos totalmente abiertos.',
      riskLevel: 'Moderado',
    },
  ],
  GB: [
    {
      title: 'Uso de fondo blanco puro (prohibido por HMPO)',
      description:
        'A diferencia de otros países, la oficina de pasaportes británica (HMPO) PROHÍBE el fondo blanco brillante. Debe ser un fondo liso crema o gris claro para asegurar suficiente contraste biométrico.',
      riskLevel: 'Crítico',
    },
    {
      title: 'Rostro menor a 29 mm o mayor a 34 mm',
      description:
        'La distancia desde la parte inferior de la barbilla hasta la coronilla debe situarse estrictamente entre 29 y 34 mm. Fotos con encuadres demasiado lejanos o recortados son desestimadas.',
      riskLevel: 'Crítico',
    },
    {
      title: 'Sonrisa visible o boca entreabierta',
      description:
        'HMPO rechaza cualquier imagen en la que la boca no esté perfectamente cerrada o los dientes sean visibles. La expresión debe ser completamente seria y relajada.',
      riskLevel: 'Alto',
    },
    {
      title: 'Reflejos en las gafas o monturas sobre los ojos',
      description:
        'Aunque HMPO permite gafas por necesidad médica, si la montura cubre los ojos o el flash genera destellos en los cristales, la foto es devuelta.',
      riskLevel: 'Alto',
    },
    {
      title: 'Resolución digital menor a 600 × 750 píxeles',
      description:
        'Para tramitar la solicitud online en gov.uk, la imagen digital debe tener un mínimo de 600 px de ancho y 750 px de alto, pesando entre 50 KB y 10 MB.',
      riskLevel: 'Moderado',
    },
    {
      title: 'Cabello cayendo sobre el rostro u ojos',
      description:
        'Los ojos y el óvalo facial deben estar totalmente despejados sin mechones de pelo que proyecten sombras sobre las mejillas.',
      riskLevel: 'Moderado',
    },
  ],
  CA: [
    {
      title: 'Medidas incorrectas (no usar 35×45 mm en lugar de 50×70 mm)',
      description:
        'Canadá es uno de los pocos países con un tamaño grande de 50 × 70 mm (2 × 2 3/4 pulgadas). Usar el tamaño europeo de 35×45 mm es el error más recurrente de los solicitantes fuera de Canadá.',
      riskLevel: 'Crítico',
    },
    {
      title: 'Falta de datos del fotógrafo/declaración en el reverso',
      description:
        'En solicitudes impresas físicas de pasaporte canadiense, una de las dos fotos debe incluir en el reverso el nombre y dirección del estudio/fotógrafo, la fecha y la firma del garante (guarantor).',
      riskLevel: 'Crítico',
    },
    {
      title: 'Altura del rostro fuera del rango de 31 a 36 mm',
      description:
        'La cabeza de barbilla a coronilla debe medir entre 31 mm y 36 mm en la copia impresa de 50×70 mm. Nuestra plantilla asegura este intervalo con exactitud milimétrica.',
      riskLevel: 'Alto',
    },
    {
      title: 'Fotos con más de 6 meses de antigüedad',
      description:
        'Passport Canada exige fotos tomadas dentro de los últimos 6 meses para reflejar el aspecto físico actual del solicitante.',
      riskLevel: 'Alto',
    },
    {
      title: 'Gafas de sol o cristales tintados',
      description:
        'Los ojos deben verse clara y nítidamente sin monturas gruesas ni reflejos de luz artificial.',
      riskLevel: 'Moderado',
    },
    {
      title: 'Sombras bajo la barbilla o en los pómulos',
      description:
        'La iluminación frontal uniforme es obligatoria para garantizar la lectura de los algoritmos biométricos de IRCC.',
      riskLevel: 'Moderado',
    },
  ],
  ES: [
    {
      title: 'Usar un tamaño distinto de 35×45 mm',
      description:
        'El pasaporte y el visado Schengen exigen una foto de 35 × 45 mm. Una foto de otro tamaño, como la de otro documento, puede ser rechazada. Para el DNI, consulta las medidas en la web oficial de la Policía Nacional.',
      riskLevel: 'Crítico',
    },
    {
      title: 'Fondo no homogéneo o con sombras',
      description:
        'La Policía Nacional exige fondo blanco liso y uniforme. Fondos grisáceos, paredes con gotelé visible o sombras detrás de la cabeza son motivo directo de denegación.',
      riskLevel: 'Crítico',
    },
    {
      title: 'Rostro que ocupa menos del 70% del encuadre',
      description:
        'La normativa biométrica exige que el óvalo facial ocupe entre el 70% y el 80% de la altura total de la fotografía, con hombros visibles en la base.',
      riskLevel: 'Alto',
    },
    {
      title: 'Gafas con montura ancha o reflejos del flash',
      description:
        'Aunque la ley no prohíbe absolutamente las gafas graduadas, la Policía Nacional recomienda retirárselas para evitar reflejos de luz que bloqueen la pupila.',
      riskLevel: 'Alto',
    },
    {
      title: 'Prendas blancas que se camuflan con el fondo',
      description:
        'Vestir camiseta o camisa blanca dificulta que el lector biométrico recorte la silueta de los hombros. Viste ropa oscura o de color sólido.',
      riskLevel: 'Moderado',
    },
    {
      title: 'Fotografía en papel común o de baja resolución',
      description:
        'Las comisarías de expedición exigen fotografías impresas en papel fotográfico de alta calidad a 300 DPI mínimo, sin píxeles ni grano visible.',
      riskLevel: 'Moderado',
    },
  ],
  MX: [
    {
      title: 'Orejas o frente cubiertas por el cabello',
      description:
        'La Secretaría de Relaciones Exteriores (SRE) de México es sumamente estricta: las orejas y la frente deben estar 100% visibles sin flequillos ni mechones.',
      riskLevel: 'Crítico',
    },
    {
      title: 'Uso de aretes, collares o piercings visibles',
      description:
        'No se permiten aretes (pendientes), cadenas, diademas ni ningún tipo de accesorio de joyería en el rostro o cuello para el pasaporte mexicano.',
      riskLevel: 'Crítico',
    },
    {
      title: 'Antigüedad mayor a 30 días naturales',
      description:
        'La SRE exige que la fotografía sea reciente, tomada como máximo 30 días antes del día de tu cita consular o delegación.',
      riskLevel: 'Alto',
    },
    {
      title: 'Fondo de color gris o con sombras proyectadas',
      description:
        'El fondo debe ser blanco sólido e impecable sin sombras tras la cabeza ni bordes desalineados.',
      riskLevel: 'Alto',
    },
    {
      title: 'Uso de lentes o anteojos de cualquier clase',
      description:
        'Debes quitarte los lentes para la fotografía del pasaporte mexicano, incluso si los utilizas a diario para ver.',
      riskLevel: 'Alto',
    },
    {
      title: 'Expresión sonriente o boca entreabierta',
      description:
        'La cabeza debe estar completamente recta, boca cerrada y mirada frontal directa a la cámara con expresión neutral.',
      riskLevel: 'Moderado',
    },
  ],
  CN: [
    {
      title: 'Usar medidas estándar de 35×45 mm en lugar de 33×48 mm',
      description:
        'China exige de manera exclusiva el formato 33 × 48 mm. Llevar o subir fotos recortadas a 35×45 mm provoca el rechazo automático del visado o pasaporte por el sistema de la NIA.',
      riskLevel: 'Crítico',
    },
    {
      title: 'Altura de cabeza fuera del rango de 28 a 33 mm',
      description:
        'La distancia desde la barbilla hasta la coronilla debe estar calibrada entre 28 y 33 mm, con una distancia de 3 a 5 mm desde la parte superior de la cabeza al borde superior de la foto.',
      riskLevel: 'Crítico',
    },
    {
      title: 'Fondo no blanco puro',
      description:
        'El fondo debe ser rigurosamente blanco puro (RGB 255, 255, 255). No se admiten fondos azules ni grises en las directrices consulares actuales.',
      riskLevel: 'Alto',
    },
    {
      title: 'Joyería visible o aretes en las orejas',
      description:
        'Las autoridades consulares chinas prohíben aretes, collares vistosos y prendas en la cabeza salvo estricta confesión religiosa acreditada.',
      riskLevel: 'Alto',
    },
    {
      title: 'Orejas o cejas cubiertas por el pelo',
      description:
        'Ambas cejas y ambas orejas deben apreciarse de forma clara y simétrica.',
      riskLevel: 'Moderado',
    },
    {
      title: 'Prendas de color blanco',
      description:
        'La ropa debe ser de color oscuro o con cuello contrastado para que el software consular diferencie con precisión los hombros del fondo.',
      riskLevel: 'Moderado',
    },
  ],
  SV: [
    {
      title: 'Usar un tamaño distinto de 51×51 mm',
      description:
        'El pasaporte y la visa de El Salvador usan el formato cuadrado 2×2 pulgadas (51×51 mm). Presentar otro tamaño, como el de otro documento, puede provocar el rechazo. Para el DUI, consulta las medidas en el portal oficial.',
      riskLevel: 'Crítico',
    },
    {
      title: 'Orejas, frente o cejas cubiertas por el cabello',
      description:
        'La DGME salvadoreña exige que la frente completa y ambas orejas estén 100% despejadas. Cabello suelto sobre el rostro invalida el registro biométrico.',
      riskLevel: 'Crítico',
    },
    {
      title: 'Uso de gafas o lentes de sol',
      description:
        'No se permiten gafas en la foto del pasaporte salvadoreño ni en el DUI. Debes retirarlas antes de la captura.',
      riskLevel: 'Alto',
    },
    {
      title: 'Fondo con sombras o tonalidades no homogéneas',
      description:
        'El fondo debe ser blanco sólido absoluto. Se descartan fotos tomadas con sombras de la cabeza proyectadas en la pared.',
      riskLevel: 'Alto',
    },
  ],
  NI: [
    {
      title: 'Vestimenta de color blanco o escotada',
      description:
        'La DGME de Nicaragua exige expresamente ropa formal de color oscuro con cuello cerrado. Vestir prendas claras que se mezclen con el fondo blanco es motivo directo de inadmisión.',
      riskLevel: 'Crítico',
    },
    {
      title: 'Tamaño no conforme (50×50 mm vs 35×45 mm)',
      description:
        'El pasaporte nicaragüense requiere 50×50 mm (2×2 pulgadas) o 35×45 mm según el consulado emisor. FotoPasaporte calibra automáticamente la plantilla según la sede.',
      riskLevel: 'Crítico',
    },
    {
      title: 'Aretes vistosos, collares o gafas',
      description:
        'No se permiten aretes colgantes, collares grandes, accesorios en el cabello ni lentes de ningún tipo.',
      riskLevel: 'Alto',
    },
  ],
  PY: [
    {
      title: 'Uso de gafas o sombras en los ojos',
      description:
        'El Departamento de Identificaciones de la Policía Nacional de Paraguay desestima fotos donde los ojos estén obstruidos por monturas, reflejos de flash o gafas graduadas.',
      riskLevel: 'Crítico',
    },
    {
      title: 'Fondo grisáceo o con textura de pared',
      description:
        'El estándar oficial exige fondo blanco liso y uniforme sin rugosidades ni sombras tras los hombros.',
      riskLevel: 'Alto',
    },
    {
      title: 'Desviación del tamaño estándar (35×45 mm)',
      description:
        'Tanto el pasaporte paraguayo como la cédula civil exigen 35 × 45 mm con rostro ocupando entre el 70% y el 80% de la altura.',
      riskLevel: 'Alto',
    },
  ],
};

// ---------------------------------------------------------------------------
// 4. BESPOKE COUNTRY FAQS (Anti-Boilerplate Value Shield)
// ---------------------------------------------------------------------------
const COUNTRY_SPECIFIC_FAQS: Record<string, CountryFAQItem[]> = {
  US: [
    {
      question: '¿Por qué están prohibidas las gafas en la foto del pasaporte de EE.UU.?',
      answer:
        'Desde noviembre de 2016, el Departamento de Estado de EE.UU. (22 CFR § 51.26) prohibió las gafas graduadas y de sol porque los reflejos en los cristales y las sombras de las monturas alteraban los sistemas de reconocimiento facial biométrico consular. Solo se aceptan si aportas un certificado médico firmado por un cirujano tras una intervención ocular reciente.',
    },
    {
      question: '¿Cuál es la diferencia entre la foto de pasaporte físico y la del formulario DS-160?',
      answer:
        'Las dimensiones y proporciones son idénticas: 2 × 2 pulgadas cuadradas (51 × 51 mm) con rostro entre 25 y 35 mm. La diferencia es el formato: para el pasaporte impreso requieres 2 copias físicas en papel fotográfico, mientras que para el formulario consular DS-160 requieres un archivo JPEG cuadrado de 600×600 px a 300 DPI y con un peso estricto menor o igual a 240 KB.',
    },
    {
      question: '¿Cuál es el tamaño oficial de la foto para pasaporte y visado de Estados Unidos?',
      answer:
        'Tanto para el pasaporte americano como para la visa de EE.UU. (visado de no inmigrante DS-160 o de inmigrante), el tamaño estándar es de 2 × 2 pulgadas (51 × 51 mm / 600 × 600 píxeles a 300 DPI). La cabeza debe medir entre el 50% y el 69% de la altura total de la imagen (entre 25 y 35 mm).',
    },
    {
      question: '¿Dónde tomar fotos para pasaporte americano o visa DS-160?',
      answer:
        'Puedes tomarte la fotografía en casa con la cámara de tu teléfono móvil frente a una pared blanca y procesarla con FotoPasaporte.app. La herramienta ajusta la proporción a 2×2 pulgadas y exporta el archivo digital optimizado por debajo de 240 KB o una hoja de impresión (A4 o 10×15 cm) con dos fotos. Revisa siempre las directrices del Departamento de Estado en travel.state.gov.',
    },
    {
      question: '¿Cómo preparo fotos 2x2 de pasaporte para imprimir?',
      answer:
        'Sube tu foto a FotoPasaporte.app, selecciona el perfil «Estados Unidos - Pasaporte (2x2")» y genera la hoja de impresión (A4 o 10 × 15 cm). Incluye copias con marcas de corte que puedes imprimir en un quiosco fotográfico o en una impresora doméstica a escala 100%. La descarga final sin marca de agua es de pago.',
    },
    {
      question: '¿Cómo garantizo que mi foto para el formulario DS-160 pese menos de 240 KB?',
      answer:
        'Nuestra herramienta optimiza automáticamente el peso del archivo JPEG durante la exportación para que cumpla exactamente la horquilla de 100 KB a 240 KB que exige la plataforma CEAC del consulado estadounidense.',
    },
    {
      question: '¿Puedo llevar ropa religiosa o turbante en la foto de visa americana?',
      answer:
        'Sí, se permite la vestimenta religiosa de uso diario acreditado (como hiyab, turbante o kipá) siempre que no cubra ninguna parte del rostro desde la barbilla hasta la coronilla y no proyecte sombras sobre las mejillas.',
    },
    {
      question: '¿Cómo imprimo mi foto de pasaporte de EE.UU. al tamaño exacto de 2×2 pulgadas?',
      answer:
        'Genera la hoja de impresión (A4 o 10 × 15 cm) desde nuestro editor. Contiene dos fotos cuadradas de 2×2 pulgadas con marcas de corte. Llévala a un quiosco fotográfico o imprímela en casa seleccionando «Tamaño real / Escala 100%».',
    },
    {
      question: '¿Qué fondo es aceptado por el U.S. Department of State?',
      answer:
        'El fondo debe ser blanco liso o blanco roto uniforme, sin patrones, texturas, muebles ni sombras detrás de la cabeza.',
    },
  ],
  GB: [
    {
      question: '¿Por qué el Reino Unido (HMPO) prohíbe el fondo blanco?',
      answer:
        'A diferencia de la mayoría de países, la Oficina de Pasaportes de Su Majestad (HMPO) exige un fondo de color crema o gris claro uniforme. La razón técnica es que el fondo blanco brillante resta contraste al contorno de personas de tez clara o cabello rubio/cano en los escáneres automáticos británicos.',
    },
    {
      question: '¿Qué es el código digital de foto para el pasaporte británico?',
      answer:
        'Es un código que generan algunos fotógrafos físicos autorizados en el Reino Unido. Sin embargo, no es obligatorio: la web oficial gov.uk permite expresamente subir un archivo digital JPEG/JPG directamente desde tu dispositivo siempre que cumpla las medidas mínimas de 600 × 750 píxeles y fondo claro uniforme.',
    },
    {
      question: '¿Cuáles son las medidas exactas de la foto para pasaporte británico?',
      answer:
        'Para solicitud impresa: 35 mm de ancho por 45 mm de alto, con una altura facial (de barbilla a coronilla) de entre 29 mm y 34 mm. Para solicitud online: un mínimo de 600 px de ancho por 750 px de alto.',
    },
    {
      question: '¿Puedo sonreír en la foto del pasaporte de Reino Unido?',
      answer:
        'No. HMPO exige una expresión completamente neutra, boca cerrada sin mostrar dientes ni sonreír, y ambos ojos plenamente abiertos mirando directamente a la cámara.',
    },
    {
      question: '¿Se aceptan fotos tomadas con el teléfono móvil para el pasaporte de UK?',
      answer:
        'Sí, gov.uk permite fotos tomadas con teléfono siempre que otra persona tome la captura a 1,5–2 metros de distancia (no selfies) y utilices un editor biométrico como FotoPasaporte para calibrar el fondo crema/gris y el encuadre exacto.',
    },
  ],
  ES: [
    {
      question: '¿Cuáles son las medidas exactas de la foto para el pasaporte español?',
      answer:
        'Para el pasaporte español y los visados Schengen la medida es de 35 × 45 mm (3,5 × 4,5 cm / 413 × 531 px a 300 DPI), con fondo blanco liso y uniforme.',
    },
    {
      question: '¿Sirve esta foto para el DNI?',
      answer:
        'Esta página cubre pasaporte y visado (35×45 mm). Para el DNI español la fotografía tradicional es más pequeña (30×40 mm). Conoce al detalle las',
      link: {
        href: '/medidas-foto-pasaporte',
        text: 'diferencias entre foto carnet y foto de pasaporte',
      },
    },
    {
      question: '¿Acepta la Policía Nacional fotos impresas en casa para el pasaporte?',
      answer:
        'Normalmente sí, siempre que estén impresas en papel fotográfico de calidad y respeten las medidas de 35×45 mm. Consulta los requisitos de presentación en la web de la Policía Nacional. Nuestra hoja de impresión (A4 o 10×15 cm) te permite imprimir varias copias idénticas en cualquier tienda de fotografía.',
    },
    {
      question: '¿Puedo llevar la foto en un pendrive o en el móvil a la comisaría?',
      answer:
        'No. Para la expedición presencial en los equipos del Cuerpo Nacional de Policía debes aportar una fotografía física reciente en papel. No se aceptan archivos en memoria USB ni fotos mostradas en la pantalla del teléfono.',
    },
    {
      question: '¿Puedo usar gafas en la foto del pasaporte español?',
      answer:
        'La Policía Nacional desaconseja llevar gafas para evitar reflejos del flash que dificulten la lectura biométrica. Lo más seguro es quitártelas.',
    },
    {
      question: '¿Qué ropa se recomienda vestir para la foto del pasaporte?',
      answer:
        'Se recomienda vestir prendas oscuras o de colores vivos con cuello cerrado. Evita terminantemente camisas o camisetas blancas, ya que se funden con el fondo blanco exigido y desdibujan los hombros.',
    },
  ],
  CA: [
    {
      question: '¿Por qué la foto del pasaporte canadiense mide 50×70 mm en lugar de 35×45 mm?',
      answer:
        'Canadá mantiene su propio estándar histórico y biométrico, con dimensiones verticales de 50 × 70 mm (2 × 2 3/4 pulgadas) para el pasaporte. Los visados canadienses temporales usan 35×45 mm.',
    },
    {
      question: '¿Cuál es el tamaño oficial de foto para la visa canadiense?',
      answer:
        'Para la solicitud de visa canadiense (visa de visitante, permiso de estudio o de trabajo) ante Inmigración, Refugiados y Ciudadanía de Canadá (IRCC), la foto mide 35 × 45 mm si es impresa, con fondo blanco o claro homogéneo. Consulta en el portal oficial los requisitos de la foto digital.',
    },
    {
      question: '¿Qué requisito tiene el reverso de la foto de pasaporte canadiense?',
      answer:
        'Para solicitudes impresas, el reverso de una de las dos fotos debe llevar impresos o escritos el nombre y dirección del estudio/fotógrafo y la fecha de la toma. Si solicitas el pasaporte regular, el garante (guarantor) también debe firmar el reverso de esa copia.',
    },
    {
      question: '¿Cuál es la proporción facial obligatoria en Canadá?',
      answer:
        'La distancia vertical entre la barbilla y la coronilla debe ser de entre 31 y 36 mm dentro de la foto de 50×70 mm.',
    },
    {
      question: '¿Se aceptan fotos con fondo gris en Canadá?',
      answer:
        'El fondo oficial debe ser blanco o de color claro uniforme sin ninguna sombra en la cara o en el fondo.',
    },
  ],
  MX: [
    {
      question: '¿Cuáles son las medidas oficiales del pasaporte mexicano (SRE)?',
      answer:
        'El tamaño oficial para el pasaporte mexicano ante la Secretaría de Relaciones Exteriores (SRE) es de 35 × 45 mm (3,5 × 4,5 cm / 413 × 531 píxeles a 300 DPI), a color con fondo rigurosamente blanco liso, frente y orejas totalmente despejadas.',
    },
    {
      question: '¿Cuáles son los requisitos de la foto para visa mexicana en 2026?',
      answer:
        'Para la visa consular mexicana, el Instituto Nacional de Migración (INM) y la SRE exigen una fotografía reciente (máximo 30 días de antigüedad), a color, tamaño 35 × 45 mm (o en algunos consulados en EE.UU. 2 × 2 pulgadas / 51 × 51 mm), fondo blanco sin sombras, sin aretes, sin collares y con la cabeza totalmente descubierta.',
    },
    {
      question: '¿Se necesita pasaporte para viajar a Cancún (México)?',
      answer:
        'Sí. Todos los viajeros internacionales (incluidos ciudadanos de Estados Unidos, Canadá y Europa) deben presentar un pasaporte vigente con al menos 6 meses de validez para entrar a Cancún y a cualquier aeropuerto o puerto de México. Los ciudadanos extranjeros no pueden viajar a México con solo una licencia de conducir o acta de nacimiento.',
    },
    {
      question: '¿Por qué la SRE de México exige tener las orejas y frente completamente descubiertas?',
      answer:
        'El Reglamento de Pasaportes de la Secretaría de Relaciones Exteriores (SRE) establece que la fisonomía facial debe ser verificable sin obstrucciones. Cabello sobre las orejas o flequillo sobre la frente altera los puntos de referencia biométricos y es causa inmediata de rechazo.',
    },
    {
      question: '¿Puedo usar aretes o collares en la foto del pasaporte mexicano?',
      answer:
        'No. La SRE prohíbe aretes (pendientes), piercings, collares y cadenas en el cuello. Debes retirar cualquier accesorio antes de la fotografía.',
    },
    {
      question: '¿Dónde se toma la foto del pasaporte en México y cuándo debo llevar fotos impresas?',
      answer:
        'En la gran mayoría de delegaciones de la SRE en México la foto digital se toma directamente en la ventanilla durante la cita. Sin embargo, debes llevar 2 fotos impresas de 35×45 mm en casos de menores de edad o trámites consulares en el extranjero. Consulta nuestra comparativa sobre',
      link: {
        href: '/donde-sacar-foto-pasaporte',
        text: 'dónde se toma la foto del pasaporte en México',
      },
    },
    {
      question: '¿Qué antigüedad máxima permite la SRE para la fotografía?',
      answer:
        'La foto debe haber sido tomada dentro de los 30 días anteriores al día de tu cita en la oficina de la SRE.',
    },
  ],
  CR: [
    {
      question: '¿Cuál es el tamaño oficial de la foto para pasaporte en Costa Rica?',
      answer:
        'En Costa Rica, el pasaporte biométrico y la visa usan el tamaño de 35 × 45 mm (3,5 × 4,5 cm / 413 × 531 px a 300 DPI). Confirma siempre los requisitos en el portal de Migración.',
    },
    {
      question: '¿Dónde sacar fotos de pasaporte en San José (Costa Rica)?',
      answer:
        'En San José y en cualquier lugar de Costa Rica puedes preparar tu fotografía desde tu teléfono con FotoPasaporte.app. Nuestra herramienta verifica las dimensiones biométricas de la DGME y genera la hoja para imprimir que puedes llevar a cualquier centro de copiado o papelería en San José para obtener tus fotos impresas al instante por un costo mínimo.',
    },
    {
      question: '¿Qué requisitos exige Migración de Costa Rica para la fotografía?',
      answer:
        'Fondo blanco uniforme y homogéneo sin sombras, rostro de frente ocupando entre el 70% y el 80% de la altura, orejas y frente descubiertas, sin gafas de sol ni monturas gruesas, y boca cerrada con expresión neutra.',
    },
  ],
  EC: [
    {
      question: '¿Cuál es el tamaño oficial de la foto de pasaporte de Ecuador?',
      answer:
        'Según los datos oficiales que manejamos, la foto del pasaporte ecuatoriano es cuadrada de 51 × 51 mm (2 × 2 pulgadas / 600 × 600 px a 300 DPI), con fondo blanco. Confirma siempre en el portal de la Cancillería antes de presentar el trámite.',
    },
    {
      question: '¿Cuáles son los requisitos de la foto para visa de Ecuador?',
      answer:
        'Para la visa se usa el mismo formato cuadrado de 51 × 51 mm con fondo blanco liso, frente y orejas despejadas y sin gafas. Revisa la página oficial de visas de la Cancillería para requisitos adicionales.',
    },
  ],
  SV: [
    {
      question: '¿Cuáles son las medidas y requisitos de la foto de pasaporte en El Salvador?',
      answer:
        'Para el pasaporte y la visa de El Salvador, la foto es cuadrada de 2 × 2 pulgadas (51 × 51 mm / 600 × 600 px a 300 DPI), con fondo blanco sólido. Confirma siempre los requisitos en el portal oficial.',
    },
    {
      question: '¿Sirve esta foto para el DUI?',
      answer:
        'Esta página cubre pasaporte y visa. Para el Documento Único de Identidad (DUI), consulta las medidas vigentes en el portal oficial antes de imprimir.',
    },
    {
      question: '¿Dónde tomar fotos para pasaporte o DUI salvadoreño?',
      answer:
        'Puedes tomarte la fotografía en casa con un smartphone utilizando FotoPasaporte.app. Nuestra herramienta encuadra el rostro a la proporción exacta requerida por la DGME y genera la plantilla lista para imprimir en papel fotográfico.',
    },
  ],
  NI: [
    {
      question: '¿Cuál es el tamaño oficial de la foto para pasaporte en Nicaragua?',
      answer:
        'El tamaño oficial de la foto para pasaporte en Nicaragua ante la DGME y sedes consulares en el extranjero es de 50 × 50 mm (2 × 2 pulgadas / 600 × 600 px a 300 DPI) o 35 × 45 mm según la oficina de trámite. Fondo rigurosamente blanco.',
    },
    {
      question: '¿Qué requisitos de vestimenta y fondo exige la DGME de Nicaragua?',
      answer:
        'Fondo blanco sólido sin sombras. Es obligatorio vestir ropa formal de color oscuro con cuello cerrado (evitar prendas blancas que se fundan con el fondo). La frente y ambas orejas deben estar despejadas, sin accesorios vistosos ni anteojos.',
    },
  ],
  PA: [
    {
      question: '¿Cuáles son las medidas de la foto de pasaporte de Panamá?',
      answer:
        'Para el pasaporte panameño, la foto mide 35 × 45 mm (3,5 × 4,5 cm / 413 × 531 px a 300 DPI) con fondo blanco liso. Para la visa se usa el formato cuadrado de 51 × 51 mm. Confirma siempre los requisitos en el portal de la autoridad.',
    },
    {
      question: '¿Cuáles son los requisitos de las fotos de pasaporte panameño?',
      answer:
        'La fotografía para el pasaporte de Panamá debe medir 35 × 45 mm a 300 DPI con fondo blanco absoluto. No se permiten sonrisas, la vestimenta debe ser formal de color oscuro para garantizar contraste con el fondo, y el cabello debe estar colocado detrás de las orejas.',
    },
  ],
  CN: [
    {
      question: '¿Cuáles son las medidas oficiales de la foto para pasaporte chino y visado consular?',
      answer:
        'China exige una medida única y propia: 33 × 48 mm (3,3 × 4,8 cm / 390 × 567 px a 300 DPI), con altura de cabeza de 28 a 33 mm y ancho de cabeza de 15 a 22 mm. No se admiten fotos con el tamaño estándar occidental de 35×45 mm ni de 2×2 pulgadas.',
    },
    {
      question: '¿Qué fondo y normas biométricas aplica la Administración Nacional de Inmigración (NIA) de China?',
      answer:
        'El fondo debe ser rigurosamente blanco puro sin sombras. Las cejas y orejas deben ser plenamente visibles, la distancia desde la coronilla al borde superior debe situarse entre 3 y 5 mm, y están prohibidos aretes y gafas reflectantes.',
    },
  ],
  FR: [
    {
      question: '¿Por qué está prohibido el fondo blanco en la foto del pasaporte francés?',
      answer:
        'El Ministerio del Interior de Francia y la ANTS (Décret n° 2005-1726) PROHÍBEN expresamente el fondo blanco puro. La fotografía debe tomarse con fondo gris claro o azul pastel uniforme. El tamaño oficial es de 35 × 45 mm con rostro entre 32 y 36 mm.',
    },
    {
      question: '¿Cuáles son las normas para el pasaporte y visado francés?',
      answer:
        'Tamaño 35 × 45 mm, resolución mínima 300 DPI, cabeza descubierta sin adornos en el pelo, expresión neutra con la boca cerrada y ojos perfectamente abiertos mirando de frente.',
    },
  ],
  DE: [
    {
      question: '¿Cómo es la foto biométrica para pasaporte alemán (Fotomustertafel)?',
      answer:
        'Alemania aplica la plantilla biométrica obligatoria (Fotomustertafel) del Ministerio Federal del Interior (BMI): tamaño 35 × 45 mm, altura de cabeza entre 32 y 36 mm (70–80%), ojos alineados en la franja biométrica superior, fondo gris claro neutro (no blanco puro) y boca completamente cerrada.',
    },
    {
      question: '¿Cuáles son las causas más habituales de rechazo en el pasaporte alemán?',
      answer:
        'Usar fondo blanco brillante en lugar de gris claro neutro, sonreír o mostrar dientes, ojos tapados por el flequillo o reflejos en las gafas graduadas.',
    },
  ],
  AR: [
    {
      question: '¿Cuál es el tamaño oficial de la foto para el pasaporte argentino?',
      answer:
        'Para el pasaporte y el visado de Argentina, la foto mide 35 × 45 mm (3,5 × 4,5 cm), a color, con fondo blanco liso y sin lentes. Para el DNI, consulta las medidas en la web oficial de RENAPER.',
    },
  ],
  CU: [
    {
      question: '¿Cuáles son las medidas y requisitos de las fotos para pasaporte cubano?',
      answer:
        'Para el pasaporte cubano, la foto mide 45 × 45 mm, y para la visa 35 × 45 mm, con fondo blanco liso, vestimenta formal de cuello cerrado y color oscuro, sin aretes grandes ni gafas. Confirma los requisitos con la autoridad.',
    },
  ],
  PY: [
    {
      question: '¿Cuáles son las medidas de foto para pasaporte y cédula en Paraguay?',
      answer:
        'El Departamento de Identificaciones de la Policía Nacional de Paraguay establece un tamaño oficial de 35 × 45 mm (3,5 × 4,5 cm / 413 × 531 px a 300 DPI) tanto para el pasaporte electrónico como para la cédula de identidad civil. El fondo debe ser blanco sólido, sin sombras, con expresión seria y vestimenta formal.',
    },
  ],
  CL: [
    {
      question: '¿Cuál es el tamaño de foto para pasaporte y visa en Chile?',
      answer:
        'Para el pasaporte y la visa de Chile, la foto mide 35 × 45 mm (3,5 × 4,5 cm / 413 × 531 px a 300 DPI), con fondo blanco liso y uniforme sin sombras. Para la cédula, consulta las medidas en el Registro Civil.',
    },
  ],
};

// ---------------------------------------------------------------------------
// 5. PUBLIC ACCESSOR FUNCTIONS WITH FALLBACKS
// ---------------------------------------------------------------------------
export function getCountryAuthorityInfo(country: CountryInfo): CountryAuthorityInfo {
  const custom = COUNTRY_AUTHORITIES[country.code.toUpperCase()];
  if (custom) return custom;

  const primaryDoc = country.documents[0];
  const isSquare = primaryDoc.widthMm === primaryDoc.heightMm;
  const isLarge = primaryDoc.heightMm >= 60;

  let shapeDescription = `estándar internacional de ${primaryDoc.widthMm} × ${primaryDoc.heightMm} mm`;
  if (isSquare) {
    shapeDescription = `formato cuadrado oficial de ${primaryDoc.widthMm} × ${primaryDoc.heightMm} mm (proporción 1:1)`;
  } else if (isLarge) {
    shapeDescription = `formato vertical de grandes dimensiones (${primaryDoc.widthMm} × ${primaryDoc.heightMm} mm)`;
  }

  let officialDomain = '';
  if (primaryDoc.sourceUrl) {
    try {
      const parsedUrl = new URL(primaryDoc.sourceUrl);
      officialDomain = parsedUrl.hostname.replace('www.', '');
    } catch {
      // ignore
    }
  }

  return {
    authorityName: `Servicio Consular y de Documentación de ${country.name}`,
    department: `Ministerio de Relaciones Exteriores / Inmigración de ${country.name}`,
    officialDocName: `Pasaporte y Visado de ${country.name}`,
    regulationsStandard: 'Normativa Internacional OACI (Doc 9303 / ISO/IEC 19794-5)',
    typicalProcessingTime: 'Variable según modalidad consular',
    primaryDocumentTypes: country.documents.map(
      (d) => `${d.name} (${d.widthMm}×${d.heightMm} mm)`
    ),
    keyDifferencesText: `Para los trámites oficiales de ${country.name}, el estándar de fotografía exige un ${shapeDescription} con una resolución mínima de ${primaryDoc.widthPx} × ${primaryDoc.heightPx} px a 300 DPI y fondo ${primaryDoc.backgroundColor.toLowerCase()}.${
      primaryDoc.notes ? ` Directriz oficial: ${primaryDoc.notes}` : ''
    }${officialDomain ? ` Consulta el portal oficial en ${officialDomain}.` : ''}`,
    specificPeculiarities: [
      `Dimensiones exactas: ${primaryDoc.widthMm} × ${primaryDoc.heightMm} mm a ${primaryDoc.dpi} DPI.`,
      `Fondo ${primaryDoc.backgroundColor.toLowerCase()}${
        primaryDoc.bgNotes ? ` (${primaryDoc.bgNotes})` : ' uniforme y homogéneo'
      }.`,
      `El rostro debe abarcar entre el ${Math.round(primaryDoc.faceHeightMinRatio * 100)}% y el ${Math.round(primaryDoc.faceHeightMaxRatio * 100)}% de la altura total.`,
      primaryDoc.glassesAllowed
        ? 'Gafas permitidas únicamente si los cristales son 100% transparentes y no ocultan los ojos.'
        : 'Gafas prohibidas para evitar destellos y rechazos en lectores biométricos.',
    ],
    officialPortalUrl: primaryDoc.sourceUrl,
  };
}

export function getCountryRejectionReasons(country: CountryInfo): CountryRejectionReason[] {
  const custom = COUNTRY_SPECIFIC_REJECTION_REASONS[country.code.toUpperCase()];
  if (custom) return custom;

  const primaryDoc = country.documents[0];
  const isNoGlasses = !primaryDoc.glassesAllowed;
  const isWhiteBg = primaryDoc.backgroundColor.toLowerCase().includes('blanco');

  return [
    {
      title: 'Fondo incorrecto, con sombras o textura',
      description: isWhiteBg
        ? `En ${country.name} se requiere un fondo blanco liso y uniforme. Fondos con sombras tras la nuca, degradados o paredes rugosas causan el rechazo inmediato del lector biométrico consular.`
        : `En ${country.name} se prohíbe el fondo blanco puro (se exige ${primaryDoc.backgroundColor.toLowerCase()}). Usar un fondo erróneo es la principal causa de desestimación.`,
      riskLevel: 'Crítico',
    },
    {
      title: isNoGlasses ? 'Uso de gafas o reflejos en cristales' : 'Reflejos o monturas sobre los ojos',
      description: isNoGlasses
        ? `Las autoridades de ${country.name} prohíben el uso de gafas para trámites oficiales. Aunque uses gafas graduadas a diario, debes retirarlas al tomarte la fotografía.`
        : `Los ojos deben ser totalmente visibles. Si utilizas gafas, los cristales no pueden tener brillos de luz ni la montura puede tapar parte de los ojos.`,
      riskLevel: 'Crítico',
    },
    {
      title: 'Proporción facial fuera del estándar oficial',
      description: `La altura de la cabeza (de coronilla a barbilla) debe ocupar exactamente entre el ${Math.round(primaryDoc.faceHeightMinRatio * 100)}% y el ${Math.round(primaryDoc.faceHeightMaxRatio * 100)}% del encuadre. Fotos tomadas demasiado lejos o primeros planos excesivamente cerrados son rechazados.`,
      riskLevel: 'Alto',
    },
    {
      title: 'Fotos tipo selfie con distorsión angular',
      description: `Hacerse un selfie a corta distancia con la cámara frontal altera la perspectiva del rostro (haciendo que la nariz parezca más ancha y las orejas queden ocultas). La foto debe tomarse a 1,5–2 metros de distancia con una cámara a la altura de los ojos.`,
      riskLevel: 'Alto',
    },
    {
      title: 'Ropa del mismo tono que el fondo',
      description: `Vestir ropa del mismo color que el fondo (${primaryDoc.backgroundColor.toLowerCase()}) elimina el contraste de los hombros y el cuello, provocando el rechazo por parte del software de inspección consular. Utiliza tonos oscuros o de color sólido.`,
      riskLevel: 'Moderado',
    },
    {
      title: 'Expresión sonriente o boca abierta',
      description: `La norma biométrica internacional exige neutralidad estricta: labios cerrados, sin sonreír y sin fruncir el ceño, con la mirada directa a la lente.`,
      riskLevel: 'Moderado',
    },
  ];
}

export function getCountryFAQs(country: CountryInfo): CountryFAQItem[] {
  const custom = COUNTRY_SPECIFIC_FAQS[country.code.toUpperCase()];
  if (custom) return custom;

  const primaryDoc = country.documents[0];
  const auth = getCountryAuthorityInfo(country);

  return [
    {
      question: `¿Cuáles son las medidas oficiales exactas para la foto de pasaporte de ${country.name}?`,
      answer: `Para ${country.name}, el tamaño oficial del pasaporte es de ${primaryDoc.widthMm} × ${primaryDoc.heightMm} mm (${primaryDoc.widthPx} × ${primaryDoc.heightPx} píxeles a 300 DPI). La altura del rostro debe ocupar entre el ${Math.round(primaryDoc.faceHeightMinRatio * 100)}% y el ${Math.round(primaryDoc.faceHeightMaxRatio * 100)}% de la imagen, con los ojos situados en el tercio superior.`,
    },
    {
      question: `¿Qué color de fondo se exige en la fotografía para ${country.name}?`,
      answer: `El fondo oficial requerido es: ${primaryDoc.backgroundColor}. ${primaryDoc.bgNotes} Asegúrate de que no haya sombras proyectadas detrás de la cabeza ni objetos o estampados en la pared.`,
    },
    {
      question: `¿Puedo usar gafas en mi foto para ${country.name}?`,
      answer: primaryDoc.glassesAllowed
        ? `Se permite el uso de gafas siempre que los cristales sean totalmente transparentes, no tengan tintes oscuros ni produzcan reflejos de luz y la montura no tape ninguna parte de los ojos.`
        : `No. En ${country.name} no se permite el uso de gafas en las fotografías para pasaporte o visado oficial. Las autoridades recomiendan retirarlas siempre para evitar el rechazo automático del expediente.`,
    },
    {
      question: `¿Puedo tomarme la foto con mi teléfono móvil en casa?`,
      answer: `Sí, siempre que la tomes a la luz del día, frente a una pared lisa y sin sombras, a una distancia de 1,5 a 2 metros con la cámara a la altura de los ojos. Luego puedes subirla a nuestro creador online para recortarla y ajustarla automáticamente a los ${primaryDoc.widthMm} × ${primaryDoc.heightMm} mm exactos de ${country.name}.`,
    },
    {
      question: `¿Cómo imprimo la foto para que mantenga las medidas exactas de ${country.name}?`,
      answer: `Utiliza la opción «Preparar hoja para imprimir» de nuestra herramienta: generará una hoja de impresión (A4 o 10 × 15 cm) con varias copias a 300 DPI y marcas de corte. En la impresora de tu casa o en un quiosco de fotos, selecciona siempre «Escala 100%» o «Tamaño real» (sin ajustar a página).`,
    },
    {
      question: `¿Qué entidad oficial tramita el pasaporte de ${country.name}?`,
      answer: `El organismo responsable es ${auth.authorityName} (${auth.department}), aplicando la normativa ${auth.regulationsStandard}. FotoPasaporte.app es una herramienta independiente que prepara tu archivo conforme a dichas especificaciones públicas.`,
    },
  ];
}

// ---------------------------------------------------------------------------
// 4. REGIONAL NEIGHBOR CLUSTERS (Contextual internal linking plan L-13 - L-23)
// ---------------------------------------------------------------------------
export interface RegionalClusterInfo {
  clusterTitle: string;
  clusterSubtitle: string;
  neighborCodes: string[];
}

const REGIONAL_CLUSTERS: Record<string, RegionalClusterInfo> = {
  // Andes / Región Andina (L-13, L-14, L-15, L-16)
  CO: {
    clusterTitle: 'Países vecinos (Andes)',
    clusterSubtitle: 'Compara las medidas oficiales de pasaporte en la región andina y países vecinos.',
    neighborCodes: ['EC', 'PE', 'VE', 'PA', 'BR'],
  },
  EC: {
    clusterTitle: 'Países vecinos (Andes)',
    clusterSubtitle: 'Compara las medidas oficiales de pasaporte con los países limítrofes andinos.',
    neighborCodes: ['CO', 'PE', 'VE', 'CL', 'AR'],
  },
  PE: {
    clusterTitle: 'Países vecinos (Andes)',
    clusterSubtitle: 'Requisitos y medidas biométricas en países vecinos de la región andina y el Pacífico.',
    neighborCodes: ['EC', 'CO', 'CL', 'AR', 'BR'],
  },
  VE: {
    clusterTitle: 'Países vecinos (Andes y Caribe)',
    clusterSubtitle: 'Requisitos oficiales en países vecinos y destinos de la comunidad venezolana.',
    neighborCodes: ['CO', 'EC', 'PE', 'ES', 'US'],
  },

  // Cono Sur (L-17, L-18, L-19, L-20)
  AR: {
    clusterTitle: 'Países vecinos (Cono Sur)',
    clusterSubtitle: 'Medidas oficiales y requisitos en los países limítrofes del Cono Sur.',
    neighborCodes: ['UY', 'CL', 'PY', 'BR', 'ES'],
  },
  CL: {
    clusterTitle: 'Países vecinos (Cono Sur)',
    clusterSubtitle: 'Compara especificaciones con países vecinos del Cono Sur y la región andina.',
    neighborCodes: ['AR', 'PE', 'UY', 'ES', 'US'],
  },
  UY: {
    clusterTitle: 'Países vecinos (Cono Sur)',
    clusterSubtitle: 'Normativa biométrica en los países limítrofes de la cuenca del Plata.',
    neighborCodes: ['AR', 'BR', 'CL', 'PY', 'ES'],
  },
  PY: {
    clusterTitle: 'Países vecinos (Cono Sur)',
    clusterSubtitle: 'Requisitos oficiales en los países limítrofes del Cono Sur.',
    neighborCodes: ['AR', 'BR', 'UY', 'CL', 'ES'],
  },
  BR: {
    clusterTitle: 'Países vecinos (América del Sur)',
    clusterSubtitle: 'Medidas oficiales en países vecinos de Sudamérica.',
    neighborCodes: ['AR', 'UY', 'PY', 'CL', 'PT'],
  },

  // Centroamérica (L-21, L-22)
  SV: {
    clusterTitle: 'Países vecinos (Centroamérica)',
    clusterSubtitle: 'Directrices oficiales de foto de pasaporte y documento en América Central.',
    neighborCodes: ['CR', 'PA', 'NI', 'MX', 'US'],
  },
  CR: {
    clusterTitle: 'Países vecinos (Centroamérica)',
    clusterSubtitle: 'Medidas y normativa en países vecinos de América Central.',
    neighborCodes: ['PA', 'SV', 'NI', 'CO', 'US'],
  },
  PA: {
    clusterTitle: 'Países vecinos (Centroamérica)',
    clusterSubtitle: 'Especificaciones oficiales en países limítrofes de América Central y el Caribe.',
    neighborCodes: ['CR', 'CO', 'SV', 'NI', 'US'],
  },
  NI: {
    clusterTitle: 'Países vecinos (Centroamérica)',
    clusterSubtitle: 'Requisitos oficiales en los países vecinos de Centroamérica.',
    neighborCodes: ['CR', 'SV', 'PA', 'MX', 'US'],
  },

  // Caribe (L-23)
  CU: {
    clusterTitle: 'Países vecinos (Caribe)',
    clusterSubtitle: 'Especificaciones de foto consular y pasaporte en el Caribe y destinos habituales.',
    neighborCodes: ['DO', 'MX', 'US', 'ES', 'PA'],
  },
  DO: {
    clusterTitle: 'Países vecinos (Caribe)',
    clusterSubtitle: 'Requisitos consulares en países del Caribe, Estados Unidos y Europa.',
    neighborCodes: ['CU', 'US', 'ES', 'MX', 'CO'],
  },

  // Norteamérica
  MX: {
    clusterTitle: 'América del Norte y destinos frecuentes',
    clusterSubtitle: 'Medidas oficiales en Norteamérica y los principales destinos internacionales.',
    neighborCodes: ['US', 'CA', 'ES', 'CO', 'AR'],
  },
  US: {
    clusterTitle: 'América del Norte y destinos frecuentes',
    clusterSubtitle: 'Normativa para visas y pasaportes en los principales destinos de viaje.',
    neighborCodes: ['CA', 'MX', 'GB', 'ES', 'CO'],
  },
  CA: {
    clusterTitle: 'América del Norte y destinos frecuentes',
    clusterSubtitle: 'Medidas consulares en Norteamérica y Europa.',
    neighborCodes: ['US', 'GB', 'FR', 'MX', 'ES'],
  },

  // Europa Occidental
  ES: {
    clusterTitle: 'Unión Europea y países vecinos',
    clusterSubtitle: 'Compara las especificaciones del pasaporte español con los socios europeos.',
    neighborCodes: ['PT', 'FR', 'IT', 'DE', 'GB', 'US'],
  },
  PT: {
    clusterTitle: 'Península Ibérica y Unión Europea',
    clusterSubtitle: 'Medidas oficiales en Portugal, España y la Unión Europea.',
    neighborCodes: ['ES', 'FR', 'IT', 'BR', 'GB'],
  },
  FR: {
    clusterTitle: 'Unión Europea y países vecinos',
    clusterSubtitle: 'Especificaciones biométricas en Francia y países miembros de la UE.',
    neighborCodes: ['ES', 'DE', 'IT', 'CH', 'GB'],
  },
  DE: {
    clusterTitle: 'Unión Europea y países vecinos',
    clusterSubtitle: 'Normativa biométrica en Alemania y países limítrofes.',
    neighborCodes: ['CH', 'FR', 'NL', 'IT', 'ES'],
  },
  IT: {
    clusterTitle: 'Unión Europea y países vecinos',
    clusterSubtitle: 'Requisitos de fotografía en Italia y el espacio Schengen.',
    neighborCodes: ['ES', 'FR', 'DE', 'CH', 'GB'],
  },
  CH: {
    clusterTitle: 'Europa Central y Schengen',
    clusterSubtitle: 'Medidas en Suiza y los países vecinos del espacio Schengen.',
    neighborCodes: ['DE', 'FR', 'IT', 'ES'],
  },
  NL: {
    clusterTitle: 'Unión Europea y países vecinos',
    clusterSubtitle: 'Requisitos oficiales en Países Bajos y la región europea.',
    neighborCodes: ['DE', 'FR', 'GB', 'ES'],
  },
  IE: {
    clusterTitle: 'Islas Británicas y Unión Europea',
    clusterSubtitle: 'Especificaciones en Irlanda, Reino Unido y Europa.',
    neighborCodes: ['GB', 'FR', 'ES', 'US', 'DE'],
  },
  GB: {
    clusterTitle: 'Reino Unido y destinos frecuentes',
    clusterSubtitle: 'Medidas oficiales en el Reino Unido, Irlanda, Europa y Norteamérica.',
    neighborCodes: ['IE', 'FR', 'ES', 'US', 'CA'],
  },

  // Asia / Pacífico
  CN: {
    clusterTitle: 'Asia y destinos frecuentes',
    clusterSubtitle: 'Especificaciones para visas y pasaportes en Asia y destinos principales.',
    neighborCodes: ['JP', 'IN', 'US', 'GB', 'CA'],
  },
  JP: {
    clusterTitle: 'Asia-Pacífico y destinos frecuentes',
    clusterSubtitle: 'Medidas oficiales en Japón y principales socios internacionales.',
    neighborCodes: ['CN', 'US', 'AU', 'GB', 'FR'],
  },
  IN: {
    clusterTitle: 'Asia y destinos frecuentes',
    clusterSubtitle: 'Medidas de visa y pasaporte en India y destinos internacionales.',
    neighborCodes: ['US', 'GB', 'CA', 'CN'],
  },
  AU: {
    clusterTitle: 'Oceanía y destinos internacionales',
    clusterSubtitle: 'Medidas de pasaporte en Australia, Reino Unido y Norteamérica.',
    neighborCodes: ['GB', 'US', 'CA', 'IE'],
  },
};

export function getRegionalCluster(countryCode: string): RegionalClusterInfo {
  const code = (countryCode || '').toUpperCase();
  const cluster = REGIONAL_CLUSTERS[code];
  if (cluster) return cluster;

  return {
    clusterTitle: 'Países y destinos relacionados',
    clusterSubtitle: 'Consulta las directrices consulares de otros países con medidas oficiales verificadas.',
    neighborCodes: ['ES', 'US', 'CO', 'MX', 'AR', 'CL'],
  };
}
