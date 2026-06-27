import { delay } from '@admin/constants/mock-api';
import { RecentSales } from '@admin/features/overview/components/recent-sales';

export default async function Sales() {
  await delay(3000);
  return <RecentSales />;
}

