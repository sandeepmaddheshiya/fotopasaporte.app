import jsPDF from 'jspdf';

export interface CertificateData {
  photoId: string;
  countryName: string;
  countryCode: string;
  docTitle: string;
  widthMm: number;
  heightMm: number;
  backgroundColor: string;
  photoBase64?: string | null;
  customerEmail?: string;
  invoiceNumber?: string;
}

export interface InvoiceData {
  orderId: string;
  paymentId: string;
  invoiceNumber: string;
  amount: number;
  currency: string;
  dateStr: string;
  customerEmail: string;
  countryName: string;
  docTitle: string;
  spec: string;
}

export function generatePdfCertificate(data: CertificateData): jsPDF {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const certId = `FP-CERT-${(data.photoId || '984210').substring(0, 8).toUpperCase()}`;
  const dateStr = new Date().toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  // 1. Double Border (Apple Blue #0071E3)
  doc.setLineWidth(1);
  doc.setDrawColor(0, 113, 227);
  doc.rect(10, 10, 190, 277);

  doc.setLineWidth(0.3);
  doc.setDrawColor(210, 210, 215);
  doc.rect(12, 12, 186, 273);

  // 2. Header Banner
  doc.setFillColor(245, 245, 247);
  doc.rect(12.5, 12.5, 185, 30, 'F');

  // Header Brand Logo text
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(29, 29, 31);
  doc.text('FotoPasaporte', 20, 27);

  doc.setTextColor(0, 113, 227);
  doc.text('.app', 73, 27);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(110, 110, 115);
  doc.text('Sistema de Verificación Biométrica Oficial OACI Doc 9303', 20, 35);

  // Status Badge
  doc.setFillColor(220, 252, 231);
  doc.setDrawColor(187, 247, 208);
  doc.roundedRect(132, 18, 58, 9, 2, 2, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(22, 101, 52);
  doc.text('VALIDACIÓN BIOMÉTRICA CONFORME', 161, 23.5, { align: 'center' });

  // Main Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(0, 113, 227);
  doc.text('CERTIFICADO OFICIAL DE CONFORMIDAD BIOMÉTRICA', 105, 52, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(110, 110, 115);
  doc.text(
    `N.º de Certificado: ${certId}  |  Fecha de emisión: ${dateStr}`,
    105,
    58,
    { align: 'center' }
  );

  // Specs Overview Box
  doc.setFillColor(250, 250, 252);
  doc.setDrawColor(229, 229, 234);
  doc.roundedRect(18, 65, 174, 38, 3, 3, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(29, 29, 31);

  doc.text('Destino y Documento:', 24, 73);
  doc.setFont('helvetica', 'normal');
  doc.text(`${data.countryName} (${data.countryCode}) — ${data.docTitle}`, 72, 73);

  doc.setFont('helvetica', 'bold');
  doc.text('Dimensiones oficiales:', 24, 81);
  doc.setFont('helvetica', 'normal');
  doc.text(`${data.widthMm} × ${data.heightMm} mm (Resolución calibrada a 300 DPI)`, 72, 81);

  doc.setFont('helvetica', 'bold');
  doc.text('Fondo oficial exigido:', 24, 89);
  doc.setFont('helvetica', 'normal');
  doc.text(`${data.backgroundColor || 'Blanco uniforme liso'}`, 72, 89);

  doc.setFont('helvetica', 'bold');
  doc.text('Estado de auditoría:', 24, 97);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(22, 101, 52);
  doc.text('APROBADO — Listo para trámite oficial sin rechazos', 72, 97);

  // Photo Preview embed if provided
  const startAuditY = 112;
  if (data.photoBase64) {
    try {
      const imgData = data.photoBase64.startsWith('data:')
        ? data.photoBase64
        : `data:image/jpeg;base64,${data.photoBase64}`;
      const imgW = 35;
      const imgH = (data.heightMm / data.widthMm) * imgW;
      doc.setDrawColor(210, 210, 215);
      doc.rect(148, 112, imgW, imgH);
      doc.addImage(imgData, 'JPEG', 148, 112, imgW, imgH);
    } catch (e) {
      console.warn('Could not embed photo in certificate', e);
    }
  }

  // Audit Checklist Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(29, 29, 31);
  doc.text('Auditoría Biométrica de Cumplimiento (8 Puntos Clave)', 20, startAuditY);

  const checks = [
    { title: 'Fondo reglamentario', desc: 'Fondo blanco liso y uniforme sin sombras ni imperfecciones.' },
    { title: 'Encuadre y proporciones', desc: 'Rostro entre el 70% y el 80% de la altura total según OACI Doc 9303.' },
    { title: 'Orientación y simetría', desc: 'Rostro perfectamente centrado con vista y hombros frontales.' },
    { title: 'Ojos y mirada directa', desc: 'Ambos ojos abiertos, nivelados y pupilas nítidas mirando a cámara.' },
    { title: 'Expresión facial neutra', desc: 'Expresión relajada con boca cerrada y labios juntos sin muecas.' },
    { title: 'Iluminación uniforme', desc: 'Sin reflejos de flash, brillos especulares ni sombras en rostro o cuello.' },
    { title: 'Resolución nativa a 300 DPI', desc: 'Nitidez ultra-alta optimizada para impresión física y lectura biométrica.' },
    { title: 'Normas consulares internacionales', desc: 'Aceptable para consulados, comisarías, embajadas y solicitudes online.' },
  ];

  let currentY = startAuditY + 8;
  const maxW = data.photoBase64 ? 122 : 170;

  checks.forEach((item) => {
    // Green check circle
    doc.setFillColor(34, 197, 94);
    doc.circle(24, currentY + 1.5, 2.5, 'F');
    doc.setDrawColor(255, 255, 255);
    doc.setLineWidth(0.6);
    doc.line(22.8, currentY + 1.5, 23.7, currentY + 2.5);
    doc.line(23.7, currentY + 2.5, 25.2, currentY + 0.5);

    // Text
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(29, 29, 31);
    doc.text(item.title, 29, currentY + 2);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(110, 110, 115);
    doc.text(item.desc, 29, currentY + 6, { maxWidth: maxW });

    currentY += 12;
  });

  // Guarantee Box at Bottom
  const boxY = 224;
  doc.setFillColor(240, 249, 255);
  doc.setDrawColor(186, 230, 253);
  doc.roundedRect(18, boxY, 174, 28, 3, 3, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(3, 105, 161);
  doc.text('Garantía de Aceptación del 100% FotoPasaporte.app', 24, boxY + 8);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  doc.text(
    'Este documento certifica que la fotografía adjunta cumple rigurosamente con los requisitos oficiales y biométricos vigentes. Si la fotografía fuese rechazada por cualquier autoridad competente, te reembolsamos el 100% del importe de manera inmediata y sin preguntas.',
    24,
    boxY + 14,
    { maxWidth: 162 }
  );

  // Footer
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(142, 142, 147);
  doc.text(
    'FotoPasaporte.app — Tecnología de Inteligencia Artificial para Fotografía Oficial y Biometría Consular.',
    105,
    265,
    { align: 'center' }
  );

  return doc;
}

export function generatePdfInvoice(data: InvoiceData): jsPDF {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  // Outer Border
  doc.setLineWidth(0.5);
  doc.setDrawColor(210, 210, 215);
  doc.rect(15, 15, 180, 267);

  // Header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(29, 29, 31);
  doc.text('FotoPasaporte', 25, 32);
  doc.setTextColor(0, 113, 227);
  doc.text('.app', 78, 32);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(29, 29, 31);
  doc.text('FACTURA Y RECIBO DE COMPRA', 185, 32, { align: 'right' });

  // Divider
  doc.setDrawColor(229, 229, 234);
  doc.line(25, 40, 185, 40);

  // Order Details
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(110, 110, 115);
  doc.text('DATOS DE LA FACTURA:', 25, 50);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(29, 29, 31);
  doc.text(`N.º de Factura: ${data.invoiceNumber}`, 25, 57);
  doc.text(`ID de Pedido: ${data.orderId}`, 25, 63);
  doc.text(`ID de Transacción: ${data.paymentId}`, 25, 69);
  doc.text(`Fecha: ${data.dateStr}`, 25, 75);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(110, 110, 115);
  doc.text('CLIENTE:', 115, 50);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(29, 29, 31);
  doc.text(`Email: ${data.customerEmail || 'Cliente registrado'}`, 115, 57);
  doc.text(`Método: Pasarela Segura Razorpay`, 115, 63);
  doc.text(`Estado: PAGADO Y CONFIRMADO`, 115, 69);

  // Table Header
  doc.setFillColor(245, 245, 247);
  doc.rect(25, 88, 160, 8, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(29, 29, 31);
  doc.text('DESCRIPCIÓN', 28, 93);
  doc.text('CANT.', 135, 93, { align: 'center' });
  doc.text('TOTAL', 180, 93, { align: 'right' });

  // Line item
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(29, 29, 31);
  doc.text(`Pack Oficial FotoPasaporte (${data.countryName} - ${data.docTitle})`, 28, 104);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(110, 110, 115);
  doc.text(`Foto digital 300 DPI + Plantilla 10x15cm (4x6") + Certificado OACI (${data.spec})`, 28, 109);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(29, 29, 31);
  doc.text('1', 135, 104, { align: 'center' });

  const symbol = data.currency === 'EUR' ? '€' : data.currency === 'INR' ? '₹' : '$';
  const totalStr = `${data.amount.toFixed(2)} ${symbol}`;
  doc.text(totalStr, 180, 104, { align: 'right' });

  // Divider
  doc.setDrawColor(229, 229, 234);
  doc.line(25, 118, 185, 118);

  // Summary
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(29, 29, 31);
  doc.text('TOTAL PAGADO:', 135, 127);
  doc.setTextColor(0, 113, 227);
  doc.text(totalStr, 180, 127, { align: 'right' });

  // Confirmation stamp
  doc.setFillColor(220, 252, 231);
  doc.setDrawColor(187, 247, 208);
  doc.roundedRect(25, 140, 160, 20, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(22, 101, 52);
  doc.text('✓ PAGO COMPLETADO CON ÉXITO', 30, 149);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(22, 101, 52);
  doc.text(
    'Todos los archivos han sido procesados y están listos para descarga inmediata.',
    30,
    155
  );

  return doc;
}
