export function useHaptic() {
  const tg = window.Telegram?.WebApp;

  return {
    light:   () => tg?.HapticFeedback?.impactOccurred('light'),
    medium:  () => tg?.HapticFeedback?.impactOccurred('medium'),
    heavy:   () => tg?.HapticFeedback?.impactOccurred('heavy'),
    success: () => tg?.HapticFeedback?.notificationOccurred('success'),
    error:   () => tg?.HapticFeedback?.notificationOccurred('error'),
    warning: () => tg?.HapticFeedback?.notificationOccurred('warning'),
    select:  () => tg?.HapticFeedback?.selectionChanged(),
  };
}