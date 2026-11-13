import { SizeFormatPage } from '@/components/SizeFormatPage';
import { getSizeFormatMetadata } from '@/data/size-formats';

export const metadata = getSizeFormatMetadata('33x48-mm');

export default function Page() {
  return <SizeFormatPage slug="33x48-mm" />;
}
