import { client } from './client';
import type { Category, Brand, CarouselItem, Ad } from '../types';

export const categoriesApi = {
  getList: async (): Promise<Category[]> => {
    const { data } = await client.get<Category[]>('/categories/');
    return data;
  },
};

export const brandsApi = {
  getList: async (): Promise<Brand[]> => {
    const { data } = await client.get<Brand[]>('/brands/');
    return data;
  },
};

export const carouselApi = {
  getList: async (): Promise<CarouselItem[]> => {
    const { data } = await client.get<CarouselItem[]>('/carousels/');
    return data;
  },
};

export const adsApi = {
  getList: async (): Promise<Ad[]> => {
    const { data } = await client.get<Ad[]>('/ads/');
    return data;
  },
};