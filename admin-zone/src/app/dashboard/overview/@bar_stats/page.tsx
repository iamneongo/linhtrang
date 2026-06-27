import { delay } from '@admin/constants/mock-api';
import { BarGraph } from '@admin/features/overview/components/bar-graph';

export default async function BarStats() {
  await delay(1000);

  return <BarGraph />;
}

