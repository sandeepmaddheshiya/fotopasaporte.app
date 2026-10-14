import { NextRequest, NextResponse } from 'next/server';

const AI_BACKEND_URL =
  process.env.AI_BACKEND_URL || 'http://127.0.0.1:8001/api/v1';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const res = await fetch(`${AI_BACKEND_URL}/payments/create-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Brand-ID': 'fotopasaporte',
      },
      body: JSON.stringify({
        package_id: body.package_id || 'standard',
        currency: body.currency || 'EUR',
        country_code: body.country_code || 'ES',
        country: body.country,
        country_name: body.country_name,
        document_type: body.document_type || 'passport',
        spec: body.spec,
        email: body.email,
        photo_id: body.photo_id,
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ detail: 'Error al crear la orden de pago' }));
      return NextResponse.json(
        { error: err.detail || 'Error al iniciar el pago' },
        { status: res.status }
      );
    }

    const orderData = await res.json();
    return NextResponse.json(orderData);
  } catch (err: unknown) {
    console.error('Error in /api/payments/create-order:', err);
    return NextResponse.json(
      {
        error: 'No se pudo comunicar con el servidor de pagos.',
        details: err instanceof Error ? err.message : String(err),
      },
      { status: 503 }
    );
  }
}
