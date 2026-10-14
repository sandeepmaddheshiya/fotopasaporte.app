import { NextRequest, NextResponse } from 'next/server';

const AI_BACKEND_URL =
  process.env.AI_BACKEND_URL || 'http://127.0.0.1:8001/api/v1';

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ photoId: string }> }
) {
  try {
    const { photoId } = await context.params;

    const backendRes = await fetch(
      `${AI_BACKEND_URL}/download-watermarked/${photoId}?brand_id=fotopasaporte`,
      {
        headers: {
          'X-Brand-ID': 'fotopasaporte',
        },
      }
    );

    if (!backendRes.ok) {
      return NextResponse.json(
        { error: 'Vista previa no encontrada' },
        { status: backendRes.status }
      );
    }

    const blob = await backendRes.blob();
    return new NextResponse(blob, {
      status: 200,
      headers: {
        'Content-Type': 'image/jpeg',
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch (err: unknown) {
    console.error('Error fetching watermarked photo:', err);
    return NextResponse.json(
      { error: 'Error al obtener la vista previa' },
      { status: 500 }
    );
  }
}
