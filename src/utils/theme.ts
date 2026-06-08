import type { OrganizationSettings } from '../types';

export function applyTheme(settings: OrganizationSettings) {
  const root = document.documentElement;

  if (settings.color_primary) {
    root.style.setProperty('--color-primary', settings.color_primary);
    // Генерируем light/dark варианты через opacity
    root.style.setProperty('--color-primary-light', settings.color_primary + 'CC');
    root.style.setProperty('--color-primary-dark', settings.color_primary + '99');
  }
  if (settings.color_background) {
    root.style.setProperty('--color-background', settings.color_background);
  }
  if (settings.color_surface) {
    root.style.setProperty('--color-surface', settings.color_surface);
    root.style.setProperty('--glass-bg', hexToRgba(settings.color_surface, 0.72));
  }
  if (settings.color_text) {
    root.style.setProperty('--color-text', settings.color_text);
  }
}

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}