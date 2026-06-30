import {
  blogPosts as staticBlogPosts,
  categories as staticCategories,
  productsByCategoryId as staticProductsByCategoryId,
  projects as staticProjects,
} from '@/data';
import { BlogPost, Category, Product, Project } from '@/types';

async function siteFetch<T>(path: string): Promise<T> {
  const res = await fetch(path, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`Site request failed: ${res.status}`);
  }

  return res.json() as Promise<T>;
}

export async function fetchProjects(): Promise<Project[]> {
  try {
    const data = await siteFetch<{ projects: Project[] }>('/api/site/projects');
    if (!data.projects?.length) return staticProjects;
    return data.projects;
  } catch {
    return staticProjects;
  }
}

export async function fetchProjectById(id: string): Promise<Project | undefined> {
  try {
    const data = await siteFetch<{ project: Project }>(`/api/site/projects/${id}`);
    return data.project;
  } catch {
    return staticProjects.find((project) => project.id === id);
  }
}

export async function fetchNews(): Promise<BlogPost[]> {
  try {
    const data = await siteFetch<{ news: BlogPost[] }>('/api/site/news');
    if (!data.news?.length) return staticBlogPosts;
    return data.news;
  } catch {
    return staticBlogPosts;
  }
}

export async function fetchNewsById(id: string): Promise<BlogPost | undefined> {
  try {
    const data = await siteFetch<{ news: BlogPost }>(`/api/site/news/${id}`);
    return data.news;
  } catch {
    return staticBlogPosts.find((post) => post.id === id);
  }
}

export async function fetchCategories(): Promise<Category[]> {
  try {
    const data = await siteFetch<{
      categories: Category[];
      productsByCategoryId: Record<string, Product[]>;
    }>('/api/site/catalog');
    if (!data.categories?.length) return staticCategories;
    return data.categories;
  } catch {
    return staticCategories;
  }
}

export async function fetchProductsByCategoryId(): Promise<Record<string, Product[]>> {
  try {
    const data = await siteFetch<{
      categories: Category[];
      productsByCategoryId: Record<string, Product[]>;
    }>('/api/site/catalog');
    if (!Object.keys(data.productsByCategoryId || {}).length) return staticProductsByCategoryId;
    return data.productsByCategoryId;
  } catch {
    return staticProductsByCategoryId;
  }
}
