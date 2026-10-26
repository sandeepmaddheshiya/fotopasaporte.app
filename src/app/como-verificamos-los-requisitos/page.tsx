import type { Metadata } from 'next';
import { LegalPage } from '@/components/LegalPage';

export const metadata: Metadata = {
  title: 'Cómo verificamos los requisitos de la foto | FotoPasaporte.app',
  description:
    'Cómo recogemos y revisamos las medidas y requisitos de la foto de pasaporte de cada país, y qué significa la fecha de verificación.',
  alternates: { canonical: 'https://fotopasaporte.app/como-verificamos-los-requisitos' },
};

export default function ComoVerificamosPage() {
  return (
    <LegalPage
      title="Cómo verificamos los requisitos"
      intro="Cada página de país muestra las medidas, el fondo y el formato de la foto junto con su fuente y la fecha de la última revisión."
      updated="25 de octubre de 2026"
    >
      <section>
        <h2>De dónde salen los datos</h2>
        <p>
          Partimos de las instrucciones publicadas por la autoridad que expide el documento y de la norma internacional
          OACI (ICAO Doc 9303). Cada entrada guarda un enlace a su fuente y la fecha en que se revisó.
        </p>
      </section>
      <section>
        <h2>Qué significa la fecha de verificación</h2>
        <p>
          Es el día en que revisamos por última vez esa especificación. Las autoridades pueden cambiar sus requisitos sin
          previo aviso, por eso te recomendamos confirmar siempre en la fuente oficial antes de imprimir.
        </p>
      </section>
      <section>
        <h2>Pasaporte, documento de identidad y visado</h2>
        <p>
          Un mismo país puede pedir medidas distintas según el documento. Cada página indica a qué documento se refiere
          cada medida. Si detectas un error, escríbenos a{' '}
          <a href="mailto:soporte@fotopasaporte.app">soporte@fotopasaporte.app</a> y lo revisaremos.
        </p>
      </section>
    </LegalPage>
  );
}
