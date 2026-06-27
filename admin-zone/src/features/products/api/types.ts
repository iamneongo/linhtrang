export type { Product } from '@admin/constants/mock-api';

export type ProductFilters = {
  page?: number;
  limit?: number;
  categories?: string;
  search?: string;
  sort?: string;
};

export type ProductsResponse = {
  success: boolean;
  time: string;
  message: string;
  total_products: number;
  offset: number;
  limit: number;
  products: import('@admin/constants/mock-api').Product[];
};

export type ProductByIdResponse = {
  success: boolean;
  time: string;
  message: string;
  product: import('@admin/constants/mock-api').Product;
};

export type ProductMutationPayload = {
  name: string;
  category: string;
  price: number;
  description: string;
};

