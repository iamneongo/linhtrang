import { delay } from '@admin/constants/mock-api';
import { PieGraph } from '@admin/features/overview/components/pie-graph';

export default async function Stats() {
  await delay(1000);
  return <PieGraph />;
}

