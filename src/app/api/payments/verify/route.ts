import { NextRequest, NextResponse } from 'next/server';

const AI_BACKEND_URL =
  process.env.AI_BACKEND_URL || 'http://127.0.0.1:8001/api/v1';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const res = await fetch(`${AI_BACKEND_URL}/payments/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Brand-ID': 'fotopasaporte',
      },
      body: JSON.stringify({
        razorpay_order_id: body.razorpay_order_id,
        razorpay_payment_id: body.razorpay_payment_id,
        razorpay_signature: body.razorpay_signature,
        package_id: body.package_id || 'standard',
        country: body.country,
        country_name: body.country_name,
        document_type: body.document_type,
        spec: body.spec,
        amount: body.amount,
        currency: body.currency,
        email: body.email,
        photo_id: body.photo_id,
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ detail: 'Verificación de pago fallida' }));
      return NextResponse.json(
        { error: err.detail || 'Fallo en la verificación del pago' },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err: unknown) {
    console.error('Error in /api/payments/verify:', err);
    return NextResponse.json(
      {
        error: 'Error al verificar la transacción.',
        details: err instanceof Error ? err.message : String(err),
      },
      { status: 503 }
    );
  }
}
