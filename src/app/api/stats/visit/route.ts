import { NextRequest, NextResponse } from 'next/server';

const AI_BACKEND_URL =
  process.env.AI_BACKEND_URL || 'https://api.photoresizer.us/api/v1';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const clientIp =
      req.headers.get('cf-connecting-ip') ||
      req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      req.headers.get('x-real-ip') ||
      '';
    const cfCountry = req.headers.get('cf-ipcountry') || '';

    const backendHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      'X-Brand-ID': 'fotopasaporte',
      'Origin': 'https://fotopasaporte.app',
      'Referer': 'https://fotopasaporte.app',
    };

    if (clientIp) {
      backendHeaders['CF-Connecting-IP'] = clientIp;
      backendHeaders['X-Forwarded-For'] = clientIp;
    }
    if (cfCountry) {
      backendHeaders['CF-IPCountry'] = cfCountry;
    }

    const res = await fetch(`${AI_BACKEND_URL}/stats/visit`, {
      method: 'POST',
      headers: backendHeaders,
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      return NextResponse.json({ status: 'ignored' }, { status: 200 });
    }

    const data = await res.json().catch(() => ({ status: 'ok' }));
    return NextResponse.json(data);
  } catch (err: unknown) {
    console.debug('Error proxying /api/stats/visit:', err);
    return NextResponse.json({ status: 'ignored' }, { status: 200 });
  }
}
