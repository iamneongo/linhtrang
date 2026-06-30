import { blogPosts } from '@/data';
import { getPayloadClient } from '@/lib/payload';
import { mapNewsDoc } from '@/lib/site-content';

export async function GET() {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: 'news',
      limit: 100,
      pagination: false,
      sort: '-publishedAt',
    });

    return Response.json({
      news: result.docs.map(mapNewsDoc),
    });
  } catch {
    return Response.json({
      news: blogPosts,
    });
  }
}
