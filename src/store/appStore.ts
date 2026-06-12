import { create } from 'zustand';
import type { OrganizationSettings, User } from '../types';
import { authApi, settingsApi } from '../api/index';
import { applyTheme } from '../utils/theme';

interface AppState {
  token: string | null;
  user: User | null;
  settings: OrganizationSettings | null;
  isLoading: boolean;
  isSubscriptionActive: boolean;
  error: string | null;
  deepLinkProductId: number | null; 

  init: () => Promise<void>;
  setToken: (token: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  token: localStorage.getItem('token'),
  user: null,
  settings: null,
  isLoading: true,
  isSubscriptionActive: true,
  error: null,
  deepLinkProductId: null, 

  setToken: (token) => {
    localStorage.setItem('token', token);
    set({ token });
  },

  init: async () => {
    set({ isLoading: true, error: null });

    try {
      const tg = window.Telegram?.WebApp;

      tg?.ready();
      tg?.expand();
      tg?.disableVerticalSwipes();

      if (tg?.platform === 'android' || tg?.platform === 'ios') {
        tg.requestFullscreen?.();

        await new Promise<void>((resolve) => {
          const handler = () => {
            tg.offEvent('fullscreenChanged', handler);
            resolve();
          };
          tg.onEvent('fullscreenChanged', handler);
          setTimeout(resolve, 500);
        });

        document.documentElement.style.setProperty('--header-top-padding', '96px');
      } else {
        tg?.exitFullscreen?.();
        document.documentElement.style.setProperty('--header-top-padding', '24px');
      }

      // 3. Deep link
      const startParam = tg?.initDataUnsafe?.start_param;
      if (startParam?.startsWith('product_')) {
        const productId = Number(startParam.replace('product_', ''));
        set({ deepLinkProductId: productId });
      }

      // 4. Auth
      const initData = tg?.initData ?? '';
      const { access, user } = await authApi.login(initData);
      localStorage.setItem('token', access);
      set({ token: access, user });

      // 5. Org settings + тема
      const settings = await settingsApi.getSettings();
      applyTheme(settings);
      set({ settings });

      set({ settings, isSubscriptionActive: settings.is_active });

    } catch (err) {
      console.error('Init failed:', err);
      set({ error: 'Не удалось загрузить приложение' });
    } finally {
      set({ isLoading: false });
    }
  },
}));