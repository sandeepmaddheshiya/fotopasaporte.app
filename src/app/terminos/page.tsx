import type { Metadata } from 'next';
import { LegalPage } from '@/components/LegalPage';

export const metadata: Metadata = {
  title: 'Términos de uso | FotoPasaporte.app',
  description:
    'Condiciones de uso de FotoPasaporte.app: qué ofrece el servicio, precios, limitaciones y por qué no garantizamos la aceptación de tu foto.',
  alternates: { canonical: 'https://fotopasaporte.app/terminos' },
};

export default function TerminosPage() {
  return (
    <LegalPage
      title="Términos de uso"
      intro="Condiciones que aplican al usar FotoPasaporte.app."
      updated="25 de octubre de 2026"
    >
      <section>
        <h2>Qué es FotoPasaporte.app</h2>
        <p>
          Es un servicio independiente que te ayuda a preparar tu fotografía con las medidas y el encuadre indicados para
          cada país y documento. No representa a ningún gobierno, embajada, consulado ni autoridad de inmigración.
        </p>
      </section>
      <section>
        <h2>Precios</h2>
        <ul>
          <li>Puedes subir tu foto y ver una vista previa con marca de agua sin pagar.</li>
          <li>La descarga final sin marca de agua requiere comprar un pack. El precio se muestra antes de pagar.</li>
        </ul>
      </section>
      <section>
        <h2>Aceptación de la foto</h2>
        <p>
          Las medidas y requisitos que mostramos se basan en fuentes oficiales y pueden cambiar. La aceptación definitiva
          de tu foto depende siempre de la autoridad que tramite el documento, y no podemos garantizarla. Antes de
          imprimir, comprueba los requisitos en la fuente oficial de tu país.
        </p>
      </section>
      <section>
        <h2>Uso adecuado</h2>
        <p>
          Debes subir únicamente fotografías sobre las que tengas derecho a hacerlo y usar el servicio de forma lícita.
        </p>
      </section>
      <section>
        <h2>Contacto</h2>
        <p>
          Para cualquier consulta escribe a <a href="mailto:soporte@fotopasaporte.app">soporte@fotopasaporte.app</a>.
          Consulta también la <a href="/privacidad">política de privacidad</a>.
        </p>
      </section>
    </LegalPage>
  );
}
