import type { Metadata } from 'next';
import { LegalPage } from '@/components/LegalPage';

export const metadata: Metadata = {
  title: 'Política de privacidad | FotoPasaporte.app',
  description:
    'Qué datos trata FotoPasaporte.app, qué ocurre con la foto que subes, con quién se comparte y cómo contactarnos para solicitar su eliminación.',
  alternates: { canonical: '/privacidad' },
};

export default function PrivacidadPage() {
  return (
    <LegalPage
      title="Política de privacidad"
      intro="Explicamos con claridad qué ocurre con tu fotografía y con tus datos cuando usas FotoPasaporte.app."
      updated="25 de octubre de 2026"
    >
      <section>
        <h2>Qué ocurre con tu foto</h2>
        <p>
          Para ofrecerte la vista previa, el análisis automático y la descarga del resultado, la imagen que subes se envía
          a nuestros servidores. El ajuste manual del encuadre se realiza en tu dispositivo.
        </p>
      </section>
      <section>
        <h2>Uso de tus datos</h2>
        <ul>
          <li>Usamos tu foto únicamente para prestar el servicio que solicitas.</li>
          <li>No la utilizamos con fines publicitarios ni la vendemos.</li>
          <li>No creamos una cuenta de usuario para usar la herramienta.</li>
        </ul>
      </section>
      <section>
        <h2>Pagos</h2>
        <p>
          Los pagos se procesan a través de un proveedor de pagos externo. FotoPasaporte.app no almacena los datos de tu
          tarjeta.
        </p>
      </section>
      <section>
        <h2>Analítica y cookies</h2>
        <p>
          Usamos estadísticas de visitas y herramientas de analítica (como Microsoft Clarity) para entender cómo se usa el
          sitio y mejorarlo.
        </p>
      </section>
      <section>
        <h2>Tus derechos y eliminación</h2>
        <p>
          Puedes solicitar el acceso, la rectificación o la eliminación de tus datos y de tus fotografías escribiendo a{' '}
          <a href="mailto:soporte@fotopasaporte.app">soporte@fotopasaporte.app</a>. Indica el identificador de tu foto o
          del pago si lo tienes.
        </p>
      </section>
    </LegalPage>
  );
}
