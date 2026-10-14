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
}

export interface CountryFAQItem {
  question: string;
  answer: string;
}

export interface CountryRejectionReason {
  title: string;
  description: string;
  riskLevel: 'Crítico' | 'Alto' | 'Moderado';
}

// Rich country-specific authorities and institutional knowledge
const COUNTRY_AUTHORITIES: Record<string, CountryAuthorityInfo> = {
  ES: {
    authorityName: 'Cuerpo Nacional de Policía / Dirección General de la Policía',
    department: 'Ministerio del Interior (Gobierno de España)',
    officialDocName: 'DNIe 4.0 y Pasaporte Biométrico Español',
    regulationsStandard: 'Real Decreto 896/2003 y Estándar OACI (ICAO Doc 9303)',
    typicalProcessingTime: 'Expedición en el acto con cita previa',
    primaryDocumentTypes: ['Pasaporte Ordinario (35×45 mm)', 'DNI / DNIe (30×40 mm)', 'Visado Schengen (35×45 mm)'],
    keyDifferencesText:
      'En España coexisten dos medidas oficiales: el DNI físico tradicional exige un tamaño de 3,0 × 4,0 cm (30 × 40 mm), mientras que el Pasaporte Biométrico y los visados Schengen emplean la norma europea de 3,5 × 4,5 cm (35 × 45 mm). Ambas requieren obligatoriamente fondo blanco liso y uniforme.',
    specificPeculiarities: [
      'El DNI español mide 30×40 mm, mientras que el pasaporte mide 35×45 mm.',
      'Fondo rigurosamente blanco, liso y monocromático. No se admiten fondos grises ni texturados.',
      'El óvalo facial debe ocupar entre el 70% y el 80% de la altura total de la fotografía.',
      'Gafas totalmente desaconsejadas por la Policía Nacional para evitar reflejos del flash en los lectores biométricos.',
    ],
  },
  US: {
    authorityName: 'Bureau of Consular Affairs (U.S. Department of State)',
    department: 'United States Federal Government',
    officialDocName: 'U.S. Passport & Visa (DS-160 / DS-260 / ESTA)',
    regulationsStandard: 'Code of Federal Regulations (22 CFR § 51.26) & ICAO 9303',
    typicalProcessingTime: '6 a 8 semanas (ordinario) / 2 a 3 semanas (urgente)',
    primaryDocumentTypes: ['U.S. Passport Book / Card (2×2 pulgadas)', 'Nonimmigrant Visa DS-160 (600×600 px)', 'Immigrant Visa (2×2 in)'],
    keyDifferencesText:
      'Estados Unidos utiliza el estándar cuadrado de 2 × 2 pulgadas (51 × 51 mm), con un peso de archivo digital estrictamente delimitado entre 100 KB y 240 KB para el formulario consular DS-160. Desde noviembre de 2016, está terminantemente prohibido llevar gafas en las fotos de pasaporte estadounidense.',
    specificPeculiarities: [
      'Formato cuadrado exacto de 2×2 pulgadas (51×51 mm) o 600×600 px a 300 DPI.',
      'Prohibición total de gafas (eyeglasses), incluso con receta médica (salvo cirugía ocular documentada con informe médico firmado).',
      'Para envíos digitales (DS-160), el peso del archivo debe ser menor o igual a 240 KB.',
      'La cabeza debe medir entre 1 pulgada y 1 3/8 pulgadas (25 a 35 mm) desde la barbilla hasta la coronilla.',
    ],
  },
  GB: {
    authorityName: 'His Majesty’s Passport Office (HMPO) / UK Visas and Immigration (UKVI)',
    department: 'Home Office (Reino Unido)',
    officialDocName: 'British Passport & UK Visa',
    regulationsStandard: 'UK Passport Photo Regulations & ICAO Doc 9303',
    typicalProcessingTime: '3 a 10 semanas según modalidad',
    primaryDocumentTypes: ['UK Passport (35×45 mm)', 'UKVI Visa Application', 'BRP / eVisa'],
    keyDifferencesText:
      'A diferencia de la mayoría de países europeos, el Reino Unido PROHÍBE explícitamente el fondo blanco puro. La normativa de HMPO exige un fondo liso de color crema o gris claro para garantizar el contraste con el tono de la piel y el cabello.',
    specificPeculiarities: [
      'Prohibido el fondo blanco puro: debe ser obligatoriamente crema o gris claro.',
      'Altura del rostro entre 29 mm y 34 mm (desde la barbilla hasta la parte superior de la cabeza).',
      'Sin sonreír ni mostrar dientes; boca cerrada y ojos totalmente abiertos.',
      'Para solicitud online, el archivo digital debe tener al menos 600 px de ancho por 750 px de alto.',
    ],
  },
  CA: {
    authorityName: 'Immigration, Refugees and Citizenship Canada (IRCC) / Passport Program',
    department: 'Government of Canada',
    officialDocName: 'Canadian Passport & Electronic Travel Authorization (eTA)',
    regulationsStandard: 'Canadian Passport Order & ISO/IEC 19794-5',
    typicalProcessingTime: '10 a 20 días hábiles',
    primaryDocumentTypes: ['Canadian Passport (50×70 mm)', 'Temporary Resident Visa (35×45 mm)', 'Permanent Resident Card (50×70 mm)'],
    keyDifferencesText:
      'El pasaporte canadiense utiliza un formato vertical grande y único de 50 × 70 mm (2 × 2 3/4 pulgadas), diferente al estándar europeo. La cara debe medir exactamente entre 31 y 36 mm de largo. En solicitudes físicas, el reverso de una de las fotos debe incluir el sello o datos del fotógrafo.',
    specificPeculiarities: [
      'Medidas oficiales grandes de 50×70 mm para pasaporte y tarjeta de residencia.',
      'Altura de la cabeza entre 31 mm y 36 mm desde la barbilla a la coronilla.',
      'Fondo blanco o color claro uniforme sin sombras.',
      'Los visados temporales canadienses suelen utilizar el formato estándar de 35×45 mm.',
    ],
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
  },
  DE: {
    authorityName: 'Bundesministerium des Innern und für Heimat (BMI) / Bundesdruckerei',
    department: 'Bundesrepublik Deutschland',
    officialDocName: 'Deutscher Reisepass & Personalausweis',
    regulationsStandard: 'Passgesetz (PassG) & Passdatenerfassungs- und Prüfverordnung',
    typicalProcessingTime: '3 a 6 semanas',
    primaryDocumentTypes: ['Reisepass (35×45 mm)', 'Personalausweis (35×45 mm)', 'Visum (35×45 mm)'],
    keyDifferencesText:
      'Alemania aplica la estricta Fotomustertafel (matriz de plantilla biométrica). El rostro debe ocupar entre 32 y 36 mm (70-80% de la foto) y el fondo debe ser obligatoriamente gris claro monocromático sin patrones.',
    specificPeculiarities: [
      'Plantilla biométrica alemana (Fotomustertafel) estricta con altura facial de 32 a 36 mm.',
      'Fondo gris claro neutro (no blanco brillante).',
      'Ojos centrados verticalmente en la zona delimitada por la matriz biométrica.',
      'Mirada neutra y boca completamente cerrada.',
    ],
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
  },
  CO: {
    authorityName: 'Ministerio de Relaciones Exteriores (Cancillería de Colombia)',
    department: 'Gobierno de la República de Colombia',
    officialDocName: 'Pasaporte Colombiano con Zona de Lectura Mecánica / Electrónico',
    regulationsStandard: 'Resolución de Pasaportes de la Cancillería & OACI Doc 9303',
    typicalProcessingTime: '24 a 48 horas en Bogotá / 8 días en consulados',
    primaryDocumentTypes: ['Pasaporte Ordinario / Ejecutivo (35×45 mm)', 'Cédula de Ciudadanía Digital (40×50 mm)', 'Visa Colombiana (35×45 mm)'],
    keyDifferencesText:
      'Para trámites consulares y visas, Colombia exige fotos en formato 35×45 mm o 40×50 mm para la cédula, siempre a color con fondo blanco puro y rostro despejado sin brillo ni sombras.',
    specificPeculiarities: [
      'Fondo blanco puro uniforme.',
      'Rostro centrado de frente con ambos hombros visibles.',
      'Sin prendas brillantes ni ropa blanca que se confunda con el fondo.',
      'Orejas y frente descubiertas.',
    ],
  },
  AR: {
    authorityName: 'Registro Nacional de las Personas (RENAPER)',
    department: 'Ministerio del Interior (República Argentina)',
    officialDocName: 'Pasaporte Argentino y DNI Tarjeta',
    regulationsStandard: 'Ley Nacional de Identificación & Normativa OACI',
    typicalProcessingTime: '15 días hábiles (regular) / 48 a 96 h (exprés)',
    primaryDocumentTypes: ['Pasaporte Electrónico (40×40 mm o 35×45 mm)', 'DNI Digital (40×40 mm)', 'Visado Argentino'],
    keyDifferencesText:
      'En Argentina, los trámites físicos presenciales de RENAPER suelen utilizar fotos cuadradas de 4 × 4 cm o el estándar internacional de 35 × 45 mm para trámites consulares en el exterior.',
    specificPeculiarities: [
      'Formato 4×4 cm o 35×45 mm según el centro emisor.',
      'Fondo blanco liso sin sombras.',
      'Busto frontal con cabeza erguida.',
      'Mirada fija a la cámara con expresión neutra.',
    ],
  },
  CL: {
    authorityName: 'Servicio de Registro Civil e Identificación de Chile',
    department: 'Ministerio de Justicia y Derechos Humanos (Chile)',
    officialDocName: 'Pasaporte Chileno Biométrico y Cédula de Identidad',
    regulationsStandard: 'Decreto Supremo de Identificación & OACI',
    typicalProcessingTime: '8 a 15 días hábiles',
    primaryDocumentTypes: ['Pasaporte Chileno (45×45 mm)', 'Cédula de Identidad (45×45 mm)', 'Visa Chilena Consular'],
    keyDifferencesText:
      'Chile emplea frecuentemente el formato cuadrado de 4,5 × 4,5 cm para documentos de identidad física o el estándar OACI de 35 × 45 mm para visas y trámites internacionales.',
    specificPeculiarities: [
      'Medidas estándar de 45×45 mm para Cédula y Pasaporte.',
      'Fondo blanco parejo sin sombras.',
      'Rostro despejado, sin flequillos que tapen las cejas.',
      'Sin sonreír y con expresión relajada.',
    ],
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
  },
  IN: {
    authorityName: 'Passport Seva / Ministry of External Affairs (MEA)',
    department: 'Government of India',
    officialDocName: 'Indian Passport & Indian e-Visa',
    regulationsStandard: 'Passport Rules, 1980 & ICAO 9303',
    typicalProcessingTime: '1 a 3 semanas',
    primaryDocumentTypes: ['Indian Passport (2×2 pulgadas / 51×51 mm)', 'India e-Visa (square JPEG)', 'OCI Card'],
    keyDifferencesText:
      'Para el pasaporte indio y la e-Visa india se utiliza el formato cuadrado de 2 × 2 pulgadas (51 × 51 mm) o 35 × 35 mm. Para la e-Visa online, la foto debe subirse en formato JPEG cuadrado con fondo blanco puro y peso entre 10 KB y 1 MB.',
    specificPeculiarities: [
      'Formato cuadrado 51×51 mm (2×2 pulgadas) o 35×35 mm.',
      'Fondo blanco sólido y uniforme.',
      'Rostro entre el 60% y el 75% del marco.',
      'Para e-Visa online: imagen cuadrada 1:1, formato JPEG.',
    ],
  },
};

export function getCountryAuthorityInfo(country: CountryInfo): CountryAuthorityInfo {
  const custom = COUNTRY_AUTHORITIES[country.code];
  if (custom) return custom;

  // General fallback for any other country based on ICAO 9303 international standards
  const primaryDoc = country.documents[0];
  return {
    authorityName: `Servicio de Inmigración y Documentos de ${country.name}`,
    department: `Ministerio de Asuntos Exteriores / Asuntos Consulares de ${country.name}`,
    officialDocName: `Pasaporte y Visado de ${country.name}`,
    regulationsStandard: 'Normativa Internacional OACI / ICAO Doc 9303',
    typicalProcessingTime: 'Variable según trámite consular',
    primaryDocumentTypes: country.documents.map(
      (d) => `${d.name} (${d.widthMm}×${d.heightMm} mm)`
    ),
    keyDifferencesText: `Para los trámites de ${country.name}, el estándar oficial de fotografía exige unas medidas de ${primaryDoc.widthMm} × ${primaryDoc.heightMm} mm con una resolución mínima de ${primaryDoc.widthPx} × ${primaryDoc.heightPx} px a 300 DPI y fondo ${primaryDoc.backgroundColor.toLowerCase()}.`,
    specificPeculiarities: [
      `Dimensiones oficiales de ${primaryDoc.widthMm}×${primaryDoc.heightMm} mm conforme a la norma consular.`,
      `Fondo ${primaryDoc.backgroundColor.toLowerCase()} sin sombras ni texturas.`,
      `El rostro debe abarcar entre el ${Math.round(primaryDoc.faceHeightMinRatio * 100)}% y el ${Math.round(primaryDoc.faceHeightMaxRatio * 100)}% de la imagen.`,
      primaryDoc.glassesAllowed
        ? 'Gafas permitidas únicamente si los cristales son transparentes y no proyectan reflejos.'
        : 'Gafas no permitidas para evitar destellos y rechazos en lectores biométricos.',
    ],
  };
}

export function getCountryRejectionReasons(country: CountryInfo): CountryRejectionReason[] {
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
      title: 'Ropa blanca o que se funde con el fondo',
      description: `Vestir ropa del mismo color que el fondo elimina el contraste de los hombros y el cuello, provocando el rechazo por parte del software de inspección consular. Utiliza tonos oscuros o de color sólido.`,
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
      answer: `Utiliza la opción «Preparar hoja para imprimir» de nuestra herramienta: generará una plantilla de 10 × 15 cm (4×6") con varias copias a 300 DPI y marcas de corte milimétricas. En la impresora de tu casa o en un quiosco de fotos, selecciona siempre «Escala 100%» o «Tamaño real» (sin ajustar a página).`,
    },
    {
      question: `¿Qué entidad oficial tramita el pasaporte de ${country.name}?`,
      answer: `El organismo responsable es ${auth.authorityName} (${auth.department}), aplicando la normativa ${auth.regulationsStandard}. FotoPasaporte.app es una herramienta independiente que prepara tu archivo conforme a dichas especificaciones públicas.`,
    },
  ];
}
