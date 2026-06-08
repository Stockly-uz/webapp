import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppStore } from './store/appStore';

import BottomNav from './components/layout/BottomNav';
import CatalogPage from './pages/Catalog/CatalogPage';
import CartPage from './pages/Cart/CartPage';
import HistoryPage from './pages/History/HistoryPage';
import ProfilePage from './pages/Profile/ProfilePage';

export default function App() {
  const { init, isLoading } = useAppStore();

  useEffect(() => {
    init(); // Telegram initData → JWT + загрузка настроек организации
  }, []);

  // Применяем цвета организации в CSS переменные
  // (логика внутри init, но на случай SSR/dev — дефолты уже в index.css)

  if (isLoading) {
    return <Splash />;
  }

  return (
    <HashRouter>
      <div className="flex flex-col" style={{ minHeight: '100dvh' }}>

        {/* Основной контент — скролл не доходит до bottom nav */}
        <main
          className="flex-1 overflow-y-auto"
          style={{ paddingBottom: 'var(--bottom-nav-height)' }}
        >
          <Routes>
            <Route path="/" element={<Navigate to="/catalog" replace />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </main>

        <BottomNav />
      </div>
    </HashRouter>
  );
}

// Сплэш пока грузится initData / настройки
function Splash() {
  return (
    <div
      className="flex items-center justify-center"
      style={{ height: '100dvh', background: 'var(--color-background)' }}
    >
      <div
        className="w-12 h-12 rounded-2xl animate-pulse"
        style={{ background: 'var(--color-primary)' }}
      />
    </div>
  );
}