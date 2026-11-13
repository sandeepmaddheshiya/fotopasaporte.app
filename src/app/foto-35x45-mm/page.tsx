import { SizeFormatPage } from '@/components/SizeFormatPage';
import { getSizeFormatMetadata } from '@/data/size-formats';

export const metadata = getSizeFormatMetadata('35x45-mm');

export default function Page() {
  return <SizeFormatPage slug="35x45-mm" />;
}
