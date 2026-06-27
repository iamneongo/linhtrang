import { delay } from '@admin/constants/mock-api';
import { AreaGraph } from '@admin/features/overview/components/area-graph';

export default async function AreaStats() {
  await delay(2000);
  return <AreaGraph />;
}

