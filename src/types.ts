export interface Category {
  id: string;
  name: string;
  iconName: string; // Lucide icon name or React component
  imageUrl: string;
  description: string;
  badge: string;
}

export interface Project {
  id: string;
  title: string;
  location: string;
  imageUrl: string;
  category: string;
  year: string;
  area: string;
  style: string;
  description: string;
}

export interface Product {
  id: string;
  categoryId: string;
  name: string;
  code: string;
  imageUrl: string;
  origin: string;
  material: string;
  size: string;
  price: string;
  description: string;
}

export interface BlogPost {
  id: string;
  title: string;
  imageUrl: string;
  date: string;
  author: string;
  summary: string;
  content: string;
}

export interface ConsultationRequest {
  fullName: string;
  phone: string;
  message: string;
}
