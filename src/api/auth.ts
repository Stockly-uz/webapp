import { client } from './client';
import type { AuthResponse } from '../types';

export const authApi = {
  login: async (initData: string): Promise<AuthResponse> => {
    const { data } = await client.post<AuthResponse>('/auth/telegram/', {
      init_data: initData,
    });
    return data;
  },
};