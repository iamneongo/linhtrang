import { projects } from '@/data';
import { getPayloadClient } from '@/lib/payload';
import { mapProjectDoc } from '@/lib/site-content';

export async function GET() {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: 'projects',
      depth: 1,
      limit: 100,
      pagination: false,
      sort: 'sortOrder',
    });

    return Response.json({
      projects: result.docs.map(mapProjectDoc),
    });
  } catch {
    return Response.json({
      projects,
    });
  }
}
