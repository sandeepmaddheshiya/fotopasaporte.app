import { NextRequest, NextResponse } from 'next/server';

const AI_BACKEND_URL =
  process.env.AI_BACKEND_URL || 'http://127.0.0.1:8001/api/v1';

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ photoId: string }> }
) {
  try {
    const { photoId } = await context.params;
    const url = new URL(req.url);
    const quality = url.searchParams.get('quality') || 'hd';

    const backendRes = await fetch(
      `${AI_BACKEND_URL}/download-clean/${photoId}?quality=${quality}`,
      {
        headers: {
          'X-Brand-ID': 'fotopasaporte',
        },
      }
    );

    if (!backendRes.ok) {
      return NextResponse.json(
        { error: 'Foto no encontrada o expirada' },
        { status: backendRes.status }
      );
    }

    const blob = await backendRes.blob();
    return new NextResponse(blob, {
      status: 200,
      headers: {
        'Content-Type': 'image/jpeg',
        'Content-Disposition': `attachment; filename=fotopasaporte_${photoId.slice(0, 8)}.jpg`,
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch (err: unknown) {
    console.error('Error downloading clean photo:', err);
    return NextResponse.json(
      { error: 'Error al descargar la foto' },
      { status: 500 }
    );
  }
}
