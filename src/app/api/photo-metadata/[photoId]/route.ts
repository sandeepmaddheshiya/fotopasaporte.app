import { NextRequest, NextResponse } from 'next/server';

const AI_BACKEND_URL =
  process.env.AI_BACKEND_URL || 'http://127.0.0.1:8001/api/v1';

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ photoId: string }> }
) {
  try {
    const { photoId } = await context.params;

    const res = await fetch(`${AI_BACKEND_URL}/photo-metadata/${photoId}`, {
      headers: {
        'X-Brand-ID': 'fotopasaporte',
      },
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ detail: 'Metadata no encontrada' }));
      return NextResponse.json(
        { error: err.detail || 'Metadata no encontrada' },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err: unknown) {
    console.error('Error fetching photo metadata:', err);
    return NextResponse.json(
      { error: 'Error al obtener los datos de la foto' },
      { status: 500 }
    );
  }
}
