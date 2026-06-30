import { projects as staticProjects, blogPosts as staticBlogPosts, categories as staticCategories, productsByCategoryId as staticProductsByCategoryId } from '@/data';
import { Project, BlogPost, Category, Product } from '@/types';

const MEDUSA_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || '';
const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || '';

interface RawProject {
  id: string;
  title: string;
  location: string | null;
  image_url: string | null;
  category: string | null;
  year: string | null;
  area: string | null;
  style: string | null;
  description: string | null;
}

interface RawNews {
  id: string;
  title: string;
  image_url: string | null;
  date: string | null;
  author: string | null;
  summary: string | null;
  content: string | null;
}

function mapProject(raw: RawProject): Project {
  return {
    id: raw.id,
    title: raw.title,
    location: raw.location || '',
    imageUrl: raw.image_url || '',
    category: raw.category || '',
    year: raw.year || '',
    area: raw.area || '',
    style: raw.style || '',
    description: raw.description || '',
  };
}

function mapNews(raw: RawNews): BlogPost {
  return {
    id: raw.id,
    title: raw.title,
    imageUrl: raw.image_url || '',
    date: raw.date || '',
    author: raw.author || '',
    summary: raw.summary || '',
    content: raw.content || '',
  };
}

interface RawCategory {
  id: string;
  name: string;
  description: string | null;
  metadata: { icon_name?: string; image_url?: string; badge?: string } | null;
}

interface RawMedusaProduct {
  id: string;
  title: string;
  description: string | null;
  thumbnail: string | null;
  material: string | null;
  origin_country: string | null;
  categories: { id: string; name: string }[] | null;
  metadata: { code?: string; size?: string; price_text?: string } | null;
}

function mapCategory(raw: RawCategory): Category {
  return {
    id: raw.id,
    name: raw.name,
    iconName: raw.metadata?.icon_name || 'HelpCircle',
    imageUrl: raw.metadata?.image_url || '',
    description: raw.description || '',
    badge: raw.metadata?.badge || '',
  };
}

function mapMedusaProduct(raw: RawMedusaProduct, categoryId: string): Product {
  return {
    id: raw.id,
    categoryId,
    name: raw.title,
    code: raw.metadata?.code || '',
    imageUrl: raw.thumbnail || '',
    origin: raw.origin_country || '',
    material: raw.material || '',
    size: raw.metadata?.size || '',
    price: raw.metadata?.price_text || 'Liên hệ',
    description: raw.description || '',
  };
}

async function medusaFetch(path: string): Promise<unknown> {
  if (!MEDUSA_URL || !PUBLISHABLE_KEY) {
    throw new Error('Medusa backend not configured');
  }
  const res = await fetch(`${MEDUSA_URL}${path}`, {
    headers: { 'x-publishable-api-key': PUBLISHABLE_KEY },
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error(`Medusa request failed: ${res.status}`);
  }
  return res.json();
}

export async function fetchProjects(): Promise<Project[]> {
  try {
    const data = (await medusaFetch('/store/projects')) as { projects: RawProject[] };
    if (!data.projects?.length) return staticProjects;
    return data.projects.map(mapProject);
  } catch {
    return staticProjects;
  }
}

export async function fetchProjectById(id: string): Promise<Project | undefined> {
  try {
    const data = (await medusaFetch(`/store/projects/${id}`)) as { project: RawProject };
    return mapProject(data.project);
  } catch {
    return staticProjects.find((p) => p.id === id);
  }
}

export async function fetchNews(): Promise<BlogPost[]> {
  try {
    const data = (await medusaFetch('/store/news')) as { news: RawNews[] };
    if (!data.news?.length) return staticBlogPosts;
    return data.news.map(mapNews);
  } catch {
    return staticBlogPosts;
  }
}

export async function fetchNewsById(id: string): Promise<BlogPost | undefined> {
  try {
    const data = (await medusaFetch(`/store/news/${id}`)) as { news: RawNews };
    return mapNews(data.news);
  } catch {
    return staticBlogPosts.find((p) => p.id === id);
  }
}

export async function fetchCategories(): Promise<Category[]> {
  try {
    const data = (await medusaFetch('/store/product-categories?limit=100')) as {
      product_categories: RawCategory[];
    };
    if (!data.product_categories?.length) return staticCategories;
    return data.product_categories.map(mapCategory);
  } catch {
    return staticCategories;
  }
}

export async function fetchProductsByCategoryId(): Promise<Record<string, Product[]>> {
  try {
    const catData = (await medusaFetch('/store/product-categories?limit=100')) as {
      product_categories: RawCategory[];
    };
    if (!catData.product_categories?.length) return staticProductsByCategoryId;

    const result: Record<string, Product[]> = {};
    for (const cat of catData.product_categories) {
      const prodData = (await medusaFetch(
        `/store/products?category_id[]=${cat.id}&limit=100`
      )) as { products: RawMedusaProduct[] };
      result[cat.id] = (prodData.products || []).map((p) => mapMedusaProduct(p, cat.id));
    }
    return result;
  } catch {
    return staticProductsByCategoryId;
  }
}
