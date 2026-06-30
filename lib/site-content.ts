import type { Category, Product, Project, BlogPost } from '@/types';

function asText(value: unknown): string {
  return typeof value === 'string' ? value : '';
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
  imageUrl?: string;
  description?: string;
  badge?: string;
};

type ProductDoc = {
  name?: string;
  slug?: string;
  code?: string;
  imageUrl?: string;
  origin?: string;
  material?: string;
  size?: string;
  price?: string;
  description?: string;
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
  imageUrl?: string;
  category?: string;
  year?: string;
  area?: string;
  style?: string;
  description?: string;
};

type NewsDoc = {
  title?: string;
  slug?: string;
  imageUrl?: string;
  publishedAt?: string;
  author?: string;
  summary?: string;
  content?: string;
};

export function mapCategoryDoc(doc: CategoryDoc): Category {
  return {
    id: asText(doc.slug),
    name: asText(doc.name),
    iconName: asText(doc.iconName) || 'HelpCircle',
    imageUrl: asText(doc.imageUrl),
    description: asText(doc.description),
    badge: asText(doc.badge),
  };
}

export function mapProductDoc(doc: ProductDoc): Product {
  const categorySlug =
    typeof doc.category === 'object' && doc.category
      ? asText(doc.category.slug)
      : asText(doc.category);

  return {
    id: asText(doc.slug),
    categoryId: categorySlug,
    name: asText(doc.name),
    code: asText(doc.code),
    imageUrl: asText(doc.imageUrl),
    origin: asText(doc.origin),
    material: asText(doc.material),
    size: asText(doc.size),
    price: asText(doc.price) || 'Liên hệ',
    description: asText(doc.description),
  };
}

export function mapProjectDoc(doc: ProjectDoc): Project {
  return {
    id: asText(doc.slug),
    title: asText(doc.title),
    location: asText(doc.location),
    imageUrl: asText(doc.imageUrl),
    category: asText(doc.category),
    year: asText(doc.year),
    area: asText(doc.area),
    style: asText(doc.style),
    description: asText(doc.description),
  };
}

export function mapNewsDoc(doc: NewsDoc): BlogPost {
  return {
    id: asText(doc.slug),
    title: asText(doc.title),
    imageUrl: asText(doc.imageUrl),
    date: formatDate(doc.publishedAt),
    author: asText(doc.author),
    summary: asText(doc.summary),
    content: asText(doc.content),
  };
}
