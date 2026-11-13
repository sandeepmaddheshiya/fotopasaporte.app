import { SizeFormatPage } from '@/components/SizeFormatPage';
import { getSizeFormatMetadata } from '@/data/size-formats';

export const metadata = getSizeFormatMetadata('2x2-pulgadas');

export default function Page() {
  return <SizeFormatPage slug="2x2-pulgadas" />;
}
