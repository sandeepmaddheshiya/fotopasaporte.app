import { SizeFormatPage } from '@/components/SizeFormatPage';
import { getSizeFormatMetadata } from '@/data/size-formats';

export const metadata = getSizeFormatMetadata('50x70-mm');

export default function Page() {
  return <SizeFormatPage slug="50x70-mm" />;
}
