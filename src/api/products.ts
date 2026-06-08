import { client } from './client';
import type { Product, ProductQueryParams } from '../types';

export const productsApi = {
  getList: async (params?: ProductQueryParams): Promise<Product[]> => {
    const { data } = await client.get<Product[]>('/products/', { params });
    return data;
  },

  getOne: async (id: number): Promise<Product> => {
    const { data } = await client.get<Product>(`/products/${id}/`);
    return data;
  },
};