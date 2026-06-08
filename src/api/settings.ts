import { client } from './client';
import type { OrganizationSettings } from '../types';

export const settingsApi = {
  getSettings: async (): Promise<OrganizationSettings> => {
    const { data } = await client.get<OrganizationSettings>('/settings/');
    return data;
  },
};