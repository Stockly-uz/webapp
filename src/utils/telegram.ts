export const tg = window.Telegram?.WebApp;

if (tg) {
  tg.ready();
  tg.expand();
  tg.disableVerticalSwipes();

  if (tg.platform === "android" || tg.platform === "ios") {
    tg.requestFullscreen?.();
  }
}