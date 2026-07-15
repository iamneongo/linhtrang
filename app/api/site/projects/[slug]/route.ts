import { projects } from '@/data';
import { slugify } from '@/lib/slugify';
import { getPayloadClient } from '@/lib/payload';
import { mapProjectDoc } from '@/lib/site-content';

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
      collection: 'projects',
      depth: 1,
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
      project: mapProjectDoc(result.docs[0]),
    });
  } catch {
    const fallbackProject = projects.find(
      (project) => project.id === slug || slugify(project.title) === slug
    );

    if (!fallbackProject) {
      return Response.json({ message: 'Not found' }, { status: 404 });
    }

    return Response.json({
      project: {
        ...fallbackProject,
        id: slugify(fallbackProject.title),
      },
    });
  }
}
