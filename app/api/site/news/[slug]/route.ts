import { blogPosts } from '@/data';
import { slugify } from '@/lib/slugify';
import { getPayloadClient } from '@/lib/payload';
import { mapNewsDoc } from '@/lib/site-content';

type Args = {
  params: Promise<{
    slug: string;
  }>;
};

export async function GET(_: Request, { params }: Args) {
  const { slug } = await params;
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: 'news',
      limit: 1,
      pagination: false,
      where: {
        slug: {
          equals: slug,
        },
      },
    });

    if (!result.docs[0]) {
      return Response.json({ message: 'Not found' }, { status: 404 });
    }

    return Response.json({
      news: mapNewsDoc(result.docs[0]),
    });
  } catch {
    const fallbackNews = blogPosts.find((post) => post.id === slug || slugify(post.title) === slug);

    if (!fallbackNews) {
      return Response.json({ message: 'Not found' }, { status: 404 });
    }

    return Response.json({
      news: {
        ...fallbackNews,
        id: slugify(fallbackNews.title),
      },
    });
  }
}
