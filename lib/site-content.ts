import { getRichTextContent } from '@/lib/rich-text';
import type { BlogPost, Category, Product, Project } from '@/types';

function asText(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

function resolveImageUrl(value: unknown): string {
  if (typeof value === 'string') {
    return value;
  }

  if (!value || typeof value !== 'object') {
    return '';
  }

  const image = value as {
    url?: unknown;
    sizes?: Record<string, { url?: unknown } | undefined>;
  };

  if (typeof image.url === 'string') {
    return image.url;
  }

  if (image.sizes) {
    for (const size of Object.values(image.sizes)) {
      if (size && typeof size.url === 'string') {
        return size.url;
      }
    }
  }

  return '';
}

function formatDate(value: unknown): string {
  if (!value || typeof value !== 'string') {
    return '';
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  const day = `${date.getDate()}`.padStart(2, '0');
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

type CategoryDoc = {
  name?: string;
  slug?: string;
  iconName?: string;
  imageUrl?: unknown;
  description?: unknown;
  badge?: string;
};

type ProductDoc = {
  name?: string;
  slug?: string;
  code?: string;
  imageUrl?: unknown;
  origin?: string;
  material?: string;
  size?: string;
  price?: string;
  description?: unknown;
  category?:
    | number
    | string
    | {
        slug?: string;
      };
};

type ProjectDoc = {
  title?: string;
  slug?: string;
  location?: string;
  imageUrl?: unknown;
  category?: string;
  year?: string;
  area?: string;
  style?: string;
  description?: unknown;
};

type NewsDoc = {
  title?: string;
  slug?: string;
  imageUrl?: unknown;
  publishedAt?: string;
  author?: string;
  summary?: unknown;
  content?: unknown;
};

export function mapCategoryDoc(doc: CategoryDoc): Category {
  const description = getRichTextContent(doc.description);

  return {
    id: asText(doc.slug),
    name: asText(doc.name),
    iconName: asText(doc.iconName) || 'HelpCircle',
    imageUrl: resolveImageUrl(doc.imageUrl),
    description: description.text,
    descriptionHTML: description.html,
    badge: asText(doc.badge),
  };
}

export function mapProductDoc(doc: ProductDoc): Product {
  const description = getRichTextContent(doc.description);
  const categorySlug =
    typeof doc.category === 'object' && doc.category
      ? asText(doc.category.slug)
      : asText(doc.category);

  return {
    id: asText(doc.slug),
    categoryId: categorySlug,
    name: asText(doc.name),
    code: asText(doc.code),
    imageUrl: resolveImageUrl(doc.imageUrl),
    origin: asText(doc.origin),
    material: asText(doc.material),
    size: asText(doc.size),
    price: asText(doc.price) || 'Lien he',
    description: description.text,
    descriptionHTML: description.html,
  };
}

export function mapProjectDoc(doc: ProjectDoc): Project {
  const description = getRichTextContent(doc.description);

  return {
    id: asText(doc.slug),
    title: asText(doc.title),
    location: asText(doc.location),
    imageUrl: resolveImageUrl(doc.imageUrl),
    category: asText(doc.category),
    year: asText(doc.year),
    area: asText(doc.area),
    style: asText(doc.style),
    description: description.text,
    descriptionHTML: description.html,
  };
}

export function mapNewsDoc(doc: NewsDoc): BlogPost {
  const summary = getRichTextContent(doc.summary);
  const content = getRichTextContent(doc.content);

  return {
    id: asText(doc.slug),
    title: asText(doc.title),
    imageUrl: resolveImageUrl(doc.imageUrl),
    date: formatDate(doc.publishedAt),
    author: asText(doc.author),
    summary: summary.text,
    summaryHTML: summary.html,
    content: content.text,
    contentHTML: content.html,
  };
}
