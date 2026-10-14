import { NextRequest, NextResponse } from 'next/server';

const AI_BACKEND_URL =
  process.env.AI_BACKEND_URL || 'http://127.0.0.1:8001/api/v1';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');
    const country = formData.get('country') || 'ES';

    if (!file) {
      return NextResponse.json(
        { error: 'No se ha proporcionado ninguna imagen' },
        { status: 400 }
      );
    }

    // Forward to FastAPI photoresizer-ai-backend
    const backendFormData = new FormData();
    backendFormData.append('file', file);
    backendFormData.append('country', country.toString());

    const res = await fetch(`${AI_BACKEND_URL}/analyze-and-fix`, {
      method: 'POST',
      headers: {
        'X-Brand-ID': 'fotopasaporte',
      },
      body: backendFormData,
    });

    if (!res.ok) {
      const errorText = await res.text();
      return NextResponse.json(
        { error: `Error del motor de IA (${res.status}): ${errorText}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err: unknown) {
    console.error('Error proxying to AI backend /analyze-and-fix:', err);
    return NextResponse.json(
      {
        error:
          'No se pudo conectar con el motor de auto-corrección IA. Se usará el editor local.',
        details: err instanceof Error ? err.message : String(err),
      },
      { status: 503 }
    );
  }
}
