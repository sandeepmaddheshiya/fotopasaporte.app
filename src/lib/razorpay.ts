/**
 * Razorpay Checkout Client Utility for FotoPasaporte.app
 */

export interface RazorpayPaymentResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export interface RazorpayOrderData {
  id: string;
  amount: number;
  currency: string;
  receipt?: string;
  status: string;
}

declare global {
  interface Window {
    Razorpay?: any;
  }
}

let razorpayScriptPromise: Promise<void> | null = null;

export function loadRazorpayScript(): Promise<void> {
  if (typeof window === 'undefined') {
    return Promise.resolve();
  }

  if (window.Razorpay) {
    return Promise.resolve();
  }

  if (razorpayScriptPromise) {
    return razorpayScriptPromise;
  }

  razorpayScriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      razorpayScriptPromise = null;
      reject(new Error('No se pudo cargar la pasarela segura de Razorpay.'));
    };
    document.body.appendChild(script);
  });

  return razorpayScriptPromise;
}

export async function createOrder(params: {
  package_id?: string;
  currency?: string;
  country_code?: string;
  country?: string;
  country_name?: string;
  document_type?: string;
  spec?: string;
  email?: string;
  photo_id?: string;
}): Promise<RazorpayOrderData> {
  const res = await fetch('/api/payments/create-order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ error: 'Error desconocido' }));
    throw new Error(errorData.error || `Error al crear la orden (${res.status})`);
  }

  return res.json();
}

export async function verifyPayment(payload: {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  package_id?: string;
  country?: string;
  country_name?: string;
  document_type?: string;
  spec?: string;
  amount?: number;
  currency?: string;
  email?: string;
  photo_id?: string;
}) {
  const res = await fetch('/api/payments/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ error: 'Error desconocido' }));
    throw new Error(errorData.error || `Error al verificar la transacción (${res.status})`);
  }

  return res.json();
}

export async function startRazorpayCheckout(params: {
  packageId?: string;
  currency?: string;
  countryCode?: string;
  countryName?: string;
  documentType?: string;
  spec?: string;
  userEmail?: string;
  photoId?: string;
  onSuccess: (payment: RazorpayPaymentResponse, verifyData?: any) => Promise<void> | void;
  onDismiss?: () => void;
  onError?: (error: Error) => void;
}) {
  await loadRazorpayScript();

  const rzpKey =
    process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_SXM83vhM5r1mfJ';

  const order = await createOrder({
    package_id: params.packageId || 'standard',
    currency: params.currency || 'EUR',
    country_code: params.countryCode || 'ES',
    country: params.countryCode,
    country_name: params.countryName,
    document_type: params.documentType,
    spec: params.spec,
    email: params.userEmail,
    photo_id: params.photoId,
  });

  const options = {
    key: rzpKey,
    amount: order.amount,
    currency: order.currency,
    name: 'FotoPasaporte.app',
    description: `Foto de ${params.documentType || 'Pasaporte'} (${params.countryName || 'Oficial'})`,
    order_id: order.id,
    handler: async (response: RazorpayPaymentResponse) => {
      try {
        const verifyData = await verifyPayment({
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          package_id: params.packageId || 'standard',
          country: params.countryCode,
          country_name: params.countryName,
          document_type: params.documentType,
          spec: params.spec,
          amount: order.amount / 100,
          currency: order.currency,
          email: params.userEmail,
          photo_id: params.photoId,
        });
        await params.onSuccess(response, verifyData);
      } catch (err: unknown) {
        if (params.onError) {
          params.onError(err instanceof Error ? err : new Error(String(err)));
        }
      }
    },
    prefill: {
      email: params.userEmail || '',
      contact: '',
    },
    theme: {
      color: '#0071E3', // Apple Blue
    },
    modal: {
      ondismiss: () => {
        if (params.onDismiss) {
          params.onDismiss();
        }
      },
    },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
}
