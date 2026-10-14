import { DocumentSpec, EditorSettings, PrintSheetOptions } from '@/types';

/**
 * Render the edited photograph onto an HTML5 Canvas at full document resolution
 */
export function renderToCanvas(
  img: HTMLImageElement,
  spec: DocumentSpec,
  settings: EditorSettings,
  targetCanvas: HTMLCanvasElement
): void {
  const targetWidth = spec.widthPx;
  const targetHeight = spec.heightPx;

  targetCanvas.width = targetWidth;
  targetCanvas.height = targetHeight;

  const ctx = targetCanvas.getContext('2d');
  if (!ctx) return;

  ctx.save();
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  // 1. Draw background tone if selected
  if (settings.backgroundColor === 'white') {
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, targetWidth, targetHeight);
  } else if (settings.backgroundColor === 'offwhite') {
    ctx.fillStyle = '#FAFAFA';
    ctx.fillRect(0, 0, targetWidth, targetHeight);
  } else if (settings.backgroundColor === 'lightgray') {
    ctx.fillStyle = '#E5E5EA';
    ctx.fillRect(0, 0, targetWidth, targetHeight);
  } else if (settings.backgroundColor === 'cream') {
    ctx.fillStyle = '#F5F5EC';
    ctx.fillRect(0, 0, targetWidth, targetHeight);
  }

  // 2. Setup image transformations (pan, zoom, rotation)
  const centerX = targetWidth / 2;
  const centerY = targetHeight / 2;

  ctx.translate(centerX + settings.panX, centerY + settings.panY);
  ctx.rotate((settings.rotation * Math.PI) / 180);

  // Apply brightness and contrast filters
  const brightnessVal = 100 + settings.brightness;
  const contrastVal = 100 + settings.contrast;
  ctx.filter = `brightness(${brightnessVal}%) contrast(${contrastVal}%)`;

  // Scale calculations to cover the canvas
  const imgAspect = img.naturalWidth / img.naturalHeight;
  const docAspect = targetWidth / targetHeight;

  let baseWidth: number;
  let baseHeight: number;

  if (imgAspect > docAspect) {
    // Image is wider than document: fit height
    baseHeight = targetHeight;
    baseWidth = baseHeight * imgAspect;
  } else {
    // Image is taller than document: fit width
    baseWidth = targetWidth;
    baseHeight = baseWidth / imgAspect;
  }

  const drawWidth = baseWidth * settings.zoom;
  const drawHeight = baseHeight * settings.zoom;

  ctx.drawImage(
    img,
    -drawWidth / 2,
    -drawHeight / 2,
    drawWidth,
    drawHeight
  );

  ctx.restore();
}

/**
 * Draw Apple-style subtle biometric alignment overlay
 */
export function drawBiometricGuides(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  spec: DocumentSpec
): void {
  ctx.save();

  const centerX = width / 2;

  // Face height bounding guides
  const minHeadH = height * spec.faceHeightMinRatio;
  const maxHeadH = height * spec.faceHeightMaxRatio;
  const avgHeadH = (minHeadH + maxHeadH) / 2;

  // Chin & Crown levels
  const crownY = height * 0.12;
  const chinY = crownY + avgHeadH;
  const headCenterY = crownY + avgHeadH / 2;
  const headRadiusX = (avgHeadH * 0.38);
  const headRadiusY = avgHeadH / 2;

  // 1. Center vertical dashed line
  ctx.beginPath();
  ctx.setLineDash([4, 6]);
  ctx.strokeStyle = 'rgba(0, 113, 227, 0.45)'; // Apple blue translucent
  ctx.lineWidth = 1.5;
  ctx.moveTo(centerX, 0);
  ctx.lineTo(centerX, height);
  ctx.stroke();

  // 2. Head oval guide (outer limit & inner limit)
  ctx.beginPath();
  ctx.setLineDash([6, 6]);
  ctx.strokeStyle = 'rgba(0, 113, 227, 0.65)';
  ctx.lineWidth = 2;
  ctx.ellipse(centerX, headCenterY, headRadiusX, headRadiusY, 0, 0, Math.PI * 2);
  ctx.stroke();

  // 3. Eye line guide
  const eyeY = height * (1 - (spec.eyeHeightMinRatio + spec.eyeHeightMaxRatio) / 2);
  ctx.beginPath();
  ctx.setLineDash([3, 4]);
  ctx.strokeStyle = 'rgba(52, 199, 89, 0.75)'; // Muted success green
  ctx.lineWidth = 1.5;
  ctx.moveTo(centerX - headRadiusX * 1.1, eyeY);
  ctx.lineTo(centerX + headRadiusX * 1.1, eyeY);
  ctx.stroke();

  // Eye line label
  ctx.font = '10px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillStyle = 'rgba(52, 199, 89, 0.9)';
  ctx.textAlign = 'right';
  ctx.fillText('Línea de ojos', centerX - headRadiusX * 1.15, eyeY + 3);

  // Chin line label
  ctx.beginPath();
  ctx.strokeStyle = 'rgba(0, 113, 227, 0.4)';
  ctx.moveTo(centerX - headRadiusX * 0.8, chinY);
  ctx.lineTo(centerX + headRadiusX * 0.8, chinY);
  ctx.stroke();

  ctx.fillStyle = 'rgba(0, 113, 227, 0.75)';
  ctx.textAlign = 'right';
  ctx.fillText('Barbilla', centerX - headRadiusX * 0.85, chinY + 3);

  ctx.restore();
}

/**
 * Export a canvas to a Blob with target file size optimization if specified
 */
export async function exportPhotoBlob(
  canvas: HTMLCanvasElement,
  format: 'image/jpeg' | 'image/png' = 'image/jpeg',
  initialQuality: number = 0.92,
  targetSizeKb?: number
): Promise<{ blob: Blob; sizeKb: number }> {
  if (format === 'image/png' || !targetSizeKb) {
    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (b) => (b ? resolve(b) : reject(new Error('No se pudo generar el archivo'))),
        format,
        initialQuality
      );
    });
    return { blob, sizeKb: Math.round(blob.size / 1024) };
  }

  // Target size in KB specified: binary search for optimal quality <= targetSizeKb
  let minQ = 0.35;
  let maxQ = 0.96;
  let bestBlob: Blob | null = null;

  for (let i = 0; i < 6; i++) {
    const q = (minQ + maxQ) / 2;
    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob((b) => resolve(b), 'image/jpeg', q);
    });

    if (!blob) break;
    const kb = blob.size / 1024;

    if (kb <= targetSizeKb) {
      bestBlob = blob;
      minQ = q; // try to get better quality
    } else {
      maxQ = q; // reduce quality
    }
  }

  if (!bestBlob) {
    bestBlob = await new Promise<Blob>((resolve) => {
      canvas.toBlob((b) => resolve(b!), 'image/jpeg', minQ);
    });
  }

  return { blob: bestBlob, sizeKb: Math.round(bestBlob.size / 1024) };
}

/**
 * Generate a printable photo sheet at 300 DPI
 * Supports both standard A4 (210×297 mm, 2480×3508 px) and 4×6 inch (10×15 cm, 1800×1200 px)
 * with corner crop marks and document metadata
 */
export function generatePrintSheetCanvas(
  singleCanvas: HTMLCanvasElement,
  spec: DocumentSpec,
  options: PrintSheetOptions
): HTMLCanvasElement {
  const isA4 = options.paperSize === 'a4';
  const sheet = document.createElement('canvas');

  // Dimensions at 300 DPI (1 mm ≈ 11.811 px)
  const pxPerMm = 300 / 25.4;
  const photoW = Math.round(spec.widthMm * pxPerMm);
  const photoH = Math.round(spec.heightMm * pxPerMm);

  // A4: 210 x 297 mm -> 2480 x 3508 px
  // 4x6: 152.4 x 101.6 mm -> 1800 x 1200 px
  const sheetWidth = isA4 ? 2480 : 1800;
  const sheetHeight = isA4 ? 3508 : 1200;

  sheet.width = sheetWidth;
  sheet.height = sheetHeight;

  const ctx = sheet.getContext('2d');
  if (!ctx) return sheet;

  // Background is pure clean photo paper white
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, sheetWidth, sheetHeight);

  let cols = 3;
  let rows = 2;
  let gapX = Math.round(3 * pxPerMm);
  let gapY = Math.round(3 * pxPerMm);

  if (isA4) {
    gapX = Math.round(4 * pxPerMm); // 4mm gap
    gapY = Math.round(4 * pxPerMm);
    if (spec.widthMm >= 50 || spec.heightMm >= 50) {
      if (spec.heightMm > 60) {
        cols = 3;
        rows = 3; // 9 photos (e.g. 50x70mm)
      } else {
        cols = 3;
        rows = 4; // 12 photos (e.g. 50x50mm US)
      }
    } else {
      cols = 4;
      rows = 4; // 16 photos (e.g. 35x45mm Schengen/Spain)
    }
  } else {
    // 4x6 inch (10x15 cm)
    if (spec.widthMm >= 50 && spec.heightMm >= 50) {
      if (spec.heightMm > 60) {
        cols = 2;
        rows = 1;
      } else {
        cols = 2;
        rows = 2;
      }
    } else {
      cols = 3;
      rows = 2;
    }
  }

  const fullW = cols * photoW + (cols - 1) * gapX;
  const fullH = rows * photoH + (rows - 1) * gapY;

  const startX = Math.round((sheetWidth - fullW) / 2);
  const startY = isA4
    ? Math.round((sheetHeight - fullH) / 2) + 20
    : Math.round((sheetHeight - fullH) / 2) - 20;

  // Render photos into grid
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = startX + c * (photoW + gapX);
      const y = startY + r * (photoH + gapY);

      // Draw photo
      ctx.drawImage(singleCanvas, x, y, photoW, photoH);

      // Draw thin delicate crop marks if requested
      if (options.includeCropMarks) {
        ctx.strokeStyle = '#94A3B8';
        ctx.lineWidth = isA4 ? 1.5 : 1;
        const markLen = isA4 ? 18 : 14;
        const offset = isA4 ? 6 : 4;

        // Top-left
        ctx.beginPath();
        ctx.moveTo(x - offset, y);
        ctx.lineTo(x - markLen, y);
        ctx.moveTo(x, y - offset);
        ctx.lineTo(x, y - markLen);
        ctx.stroke();

        // Top-right
        ctx.beginPath();
        ctx.moveTo(x + photoW + offset, y);
        ctx.lineTo(x + photoW + markLen, y);
        ctx.moveTo(x + photoW, y - offset);
        ctx.lineTo(x + photoW, y - markLen);
        ctx.stroke();

        // Bottom-left
        ctx.beginPath();
        ctx.moveTo(x - offset, y + photoH);
        ctx.lineTo(x - markLen, y + photoH);
        ctx.moveTo(x, y + photoH + offset);
        ctx.lineTo(x, y + photoH + markLen);
        ctx.stroke();

        // Bottom-right
        ctx.beginPath();
        ctx.moveTo(x + photoW + offset, y + photoH);
        ctx.lineTo(x + photoW + markLen, y + photoH);
        ctx.moveTo(x + photoW, y + photoH + offset);
        ctx.lineTo(x + photoW, y + photoH + markLen);
        ctx.stroke();
      }
    }
  }

  if (isA4) {
    // Header for A4
    ctx.font = 'bold 30px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillStyle = '#0F172A';
    ctx.textAlign = 'center';
    ctx.fillText(
      'FotoPasaporte.app — Plantilla de Impresión Oficial A4 (210 × 297 mm)',
      sheetWidth / 2,
      startY - 90
    );

    ctx.font = '20px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillStyle = '#64748B';
    ctx.fillText(
      `${spec.name} (${spec.widthMm} × ${spec.heightMm} mm) · Calibración 300 DPI · ${cols * rows} fotos con marcas de corte`,
      sheetWidth / 2,
      startY - 50
    );

    // Footer for A4
    ctx.font = 'bold 20px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillStyle = '#334155';
    ctx.fillText(
      'INSTRUCCIONES: Imprimir en papel A4 (estándar o fotográfico) al 100% de escala (tamaño real, sin ajustar ni reducir).',
      sheetWidth / 2,
      startY + fullH + 90
    );

    ctx.font = '16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillStyle = '#94A3B8';
    ctx.fillText(
      'Normativa oficial OACI Doc 9303 · Recortar por las líneas guía perimetrales.',
      sheetWidth / 2,
      startY + fullH + 125
    );
  } else {
    // Footer notes for 4x6 printing
    ctx.font = '14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillStyle = '#8E8E93';
    ctx.textAlign = 'center';
    ctx.fillText(
      `FotoPasaporte.app · ${spec.name} (${spec.widthMm} × ${spec.heightMm} mm) · Hoja 10 × 15 cm (4×6") a 300 DPI · Imprimir a escala 100% sin ajustar`,
      sheetWidth / 2,
      sheetHeight - 35
    );
  }

  return sheet;
}
