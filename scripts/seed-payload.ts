// @ts-nocheck
import '../lib/loadEnv.ts';

import { getPayload } from 'payload';

import configPromise from '../payload.config.ts';
import { blogPosts, categories, productsByCategoryId, projects } from '../data';
import { slugify } from '../lib/slugify.ts';
import { normalizeRichText } from '../lib/rich-text.ts';

function parseDate(date: string) {
  const [day, month, year] = date.split('/');
  if (!day || !month || !year) {
    return new Date().toISOString();
  }

  return new Date(`${year}-${month}-${day}T00:00:00.000Z`).toISOString();
}

async function upsertBySlug(
  payload: Awaited<ReturnType<typeof getPayload>>,
  collection: 'categories' | 'projects' | 'news',
  slug: string,
  data: Record<string, unknown>
) {
  const result = await payload.find({
    collection,
    limit: 1,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  if (result.docs[0]) {
    await payload.update({
      collection,
      id: result.docs[0].id,
      data,
    });
    return result.docs[0].id;
  }

  const created = await payload.create({
    collection,
    data,
  });

  return created.id;
}

async function upsertProductByCode(
  payload: Awaited<ReturnType<typeof getPayload>>,
  code: string,
  data: Record<string, unknown>
) {
  const result = await payload.find({
    collection: 'products',
    limit: 1,
    pagination: false,
    where: {
      code: {
        equals: code,
      },
    },
  });

  if (result.docs[0]) {
    await payload.update({
      collection: 'products',
      id: result.docs[0].id,
      data,
    });
    return;
  }

  await payload.create({
    collection: 'products',
    data,
  });
}

async function main() {
  const payload = await getPayload({ config: configPromise });
  const categoryIds = new Map<string, number | string>();

  for (const [index, category] of categories.entries()) {
    const id = await upsertBySlug(payload, 'categories', category.id, {
      name: category.name,
      slug: category.id,
      iconName: category.iconName,
      imageUrl: category.imageUrl,
      description: normalizeRichText(category.description),
      badge: category.badge,
      sortOrder: index,
    });

    categoryIds.set(category.id, id);
  }

  for (const [index, project] of projects.entries()) {
    await upsertBySlug(payload, 'projects', slugify(project.title), {
      title: project.title,
      slug: slugify(project.title),
      location: project.location,
      imageUrl: project.imageUrl,
      category: project.category,
      year: project.year,
      area: project.area,
      style: project.style,
      description: normalizeRichText(project.description),
      featured: index < 4,
      sortOrder: index,
    });
  }

  for (const [index, post] of blogPosts.entries()) {
    await upsertBySlug(payload, 'news', slugify(post.title), {
      title: post.title,
      slug: slugify(post.title),
      imageUrl: post.imageUrl,
      publishedAt: parseDate(post.date),
      author: post.author,
      summary: normalizeRichText(post.summary),
      content: normalizeRichText(post.content),
      sortOrder: index,
    });
  }

  let productIndex = 0;
  for (const [categorySlug, products] of Object.entries(productsByCategoryId)) {
    const categoryId = categoryIds.get(categorySlug);
    if (!categoryId) {
      continue;
    }

    for (const product of products) {
      await upsertProductByCode(payload, product.code, {
        name: product.name,
        slug: slugify(product.name),
        category: categoryId,
        code: product.code,
        imageUrl: product.imageUrl,
        origin: product.origin,
        material: product.material,
        size: product.size,
        price: product.price,
        description: normalizeRichText(product.description),
        sortOrder: productIndex,
      });
      productIndex += 1;
    }
  }

  await payload.logger.info('Payload seed completed.');
  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
