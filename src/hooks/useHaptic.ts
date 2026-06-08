export function useHaptic() {
  const haptic = (type = 'light') => {
    if (window.Telegram?.WebApp?.HapticFeedback) {
      if (type === 'success' || type === 'warning' || type === 'error') {
        window.Telegram.WebApp.HapticFeedback.notificationOccurred(
          type as 'success' | 'warning' | 'error'
        );
      } else {
        window.Telegram.WebApp.HapticFeedback.impactOccurred(
          type as 'light' | 'medium' | 'heavy' | 'rigid' | 'soft'
        );
      }
    } else if (navigator.vibrate) {
      navigator.vibrate(30);
    }
  };

  return {
    light:   () => haptic('light'),
    medium:  () => haptic('medium'),
    heavy:   () => haptic('heavy'),
    success: () => haptic('success'),
    warning: () => haptic('warning'),
    error:   () => haptic('error'),
    select:  () => haptic('light'),
  };
}