import { client } from './client';
import type { Order } from '../types';

interface CreateOrderPayload {
  items: { product_id: number; quantity: number }[];
  comment?: string;
}

export const ordersApi = {
  create: async (payload: CreateOrderPayload): Promise<Order> => {
    const { data } = await client.post<Order>('/orders/', payload);
    return data;
  },

  getHistory: async (): Promise<Order[]> => {
    const { data } = await client.get<Order[]>('/orders/');
    return data;
  },
};