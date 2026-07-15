// @ts-nocheck
import '../lib/loadEnv.ts';

import crypto from 'crypto';
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

function getFileExtension(contentType: string) {
  switch (contentType.split(';')[0]?.trim()) {
    case 'image/jpeg':
      return '.jpg';
    case 'image/png':
      return '.png';
    case 'image/webp':
      return '.webp';
    case 'image/gif':
      return '.gif';
    case 'image/avif':
      return '.avif';
    case 'image/svg+xml':
      return '.svg';
    default:
      return '.jpg';
  }
}

function getStableFilename(url: string, contentType: string) {
  const hash = crypto.createHash('sha1').update(url).digest('hex').slice(0, 20);
  return `seed-${hash}${getFileExtension(contentType)}`;
}

function escapeXml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function createPlaceholderSvg(label: string) {
  const safeLabel = escapeXml(label || 'Linh Trang Home');
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800" role="img" aria-label="${safeLabel}">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#1f4f42" />
          <stop offset="100%" stop-color="#0d241d" />
        </linearGradient>
      </defs>
      <rect width="1200" height="800" fill="url(#bg)" />
      <rect x="70" y="70" width="1060" height="660" rx="36" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.14)" />
      <text x="600" y="370" text-anchor="middle" font-family="Arial, sans-serif" font-size="44" font-weight="700" fill="#ffffff">${safeLabel}</text>
      <text x="600" y="445" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" fill="#c9ddd7">Hinh anh du phong</text>
    </svg>`
  );
}

const mediaCache = new Map<string, Promise<number | string>>();

async function ensureMediaFromUrl(
  payload: Awaited<ReturnType<typeof getPayload>>,
  url: string,
  alt: string
) {
  if (!mediaCache.has(url)) {
    mediaCache.set(
      url,
      (async () => {
        let contentType = 'image/jpeg';
        let buffer: Buffer;

        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`);
          }

          contentType = response.headers.get('content-type') || 'image/jpeg';
          buffer = Buffer.from(await response.arrayBuffer());
        } catch (error) {
          payload.logger.warn(`Using placeholder image for ${url}: ${String(error)}`);
          contentType = 'image/svg+xml';
          buffer = createPlaceholderSvg(alt);
        }

        const filename = getStableFilename(url, contentType);

        const existing = await payload.find({
          collection: 'media',
          limit: 1,
          pagination: false,
          where: {
            filename: {
              equals: filename,
            },
          },
        });

        if (existing.docs[0]) {
          return existing.docs[0].id;
        }

        const created = await payload.create({
          collection: 'media',
          data: {
            alt,
          },
          file: {
            data: buffer,
            mimetype: contentType.split(';')[0]?.trim() || 'image/jpeg',
            name: filename,
            size: buffer.length,
          },
        });

        return created.id;
      })()
    );
  }

  return mediaCache.get(url)!;
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
    const imageId = await ensureMediaFromUrl(payload, category.imageUrl, category.name);
    const id = await upsertBySlug(payload, 'categories', category.id, {
      name: category.name,
      slug: category.id,
      iconName: category.iconName,
      imageUrl: imageId,
      description: normalizeRichText(category.description),
      badge: category.badge,
      sortOrder: index,
    });

    categoryIds.set(category.id, id);
  }

  for (const [index, project] of projects.entries()) {
    const imageId = await ensureMediaFromUrl(payload, project.imageUrl, project.title);
    await upsertBySlug(payload, 'projects', slugify(project.title), {
      title: project.title,
      slug: slugify(project.title),
      location: project.location,
      imageUrl: imageId,
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
    const imageId = await ensureMediaFromUrl(payload, post.imageUrl, post.title);
    await upsertBySlug(payload, 'news', slugify(post.title), {
      title: post.title,
      slug: slugify(post.title),
      imageUrl: imageId,
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
      const imageId = await ensureMediaFromUrl(payload, product.imageUrl, product.name);
      await upsertProductByCode(payload, product.code, {
        name: product.name,
        slug: slugify(product.name),
        category: categoryId,
        code: product.code,
        imageUrl: imageId,
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
