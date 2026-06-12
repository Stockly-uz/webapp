import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppStore } from './store/appStore';
import { LockKeyhole } from 'lucide-react'

import BottomNav from './components/layout/BottomNav';
import CatalogPage from './pages/Catalog/CatalogPage';
import CartPage from './pages/Cart/CartPage';
import HistoryPage from './pages/History/HistoryPage';
import ProfilePage from './pages/Profile/ProfilePage';

export default function App() {
  const { init, isLoading, isSubscriptionActive } = useAppStore();

  useEffect(() => {
    init();
  }, []);

  if (isLoading) {
    return <Splash />;
  }

  if (!isSubscriptionActive) {
    return <SubscriptionExpired />;
  }

  return (
    <HashRouter>
      <div className="flex flex-col" style={{ minHeight: '100dvh' }}>

        <main
          className="flex-1 overflow-y-auto"
          style={{ paddingBottom: 'var(--bottom-nav-height)' }}
        >
          <Routes>
            <Route path="*" element={<Navigate to="/catalog" replace />} />
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


function Splash() {
  const settings = useAppStore((s) => s.settings);

  return (
    <div
      className="flex flex-col items-center justify-center gap-4"
      style={{
        height: '100dvh',
        background: 'var(--color-header)',
      }}
    >
      {settings?.name ? (
        <h1
          style={{
            fontSize: '28px',
            fontWeight: 700,
            color: '#fff',
            letterSpacing: '-0.5px',
          }}
        >
          {settings.name}
        </h1>
      ) : (
        <div
          className="animate-pulse"
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '16px',
            background: 'rgba(255,255,255,0.3)',
          }}
        />
      )}

      <div
        style={{
          width: '32px',
          height: '3px',
          borderRadius: '100px',
          background: 'rgba(255,255,255,0.3)',
          overflow: 'hidden',
          position: 'absolute',
          bottom: '48px',
        }}
      >
        <div
          style={{
            height: '100%',
            borderRadius: '100px',
            background: '#fff',
            animation: 'slide 1.2s ease-in-out infinite',
          }}
        />
      </div>

      <style>{`
        @keyframes slide {
          0% { width: 0%; margin-left: 0%; }
          50% { width: 100%; margin-left: 0%; }
          100% { width: 0%; margin-left: 100%; }
        }
      `}</style>
    </div>
  );
}

function SubscriptionExpired() {
  const settings = useAppStore((s) => s.settings);

  return (
    <div
      className="flex flex-col items-center justify-center gap-4 px-8 text-center"
      style={{
        height: '100dvh',
        background: 'var(--color-header)',
      }}
    >
      <div
        style={{
          width: '64px',
          height: '64px',
          borderRadius: '20px',
          background: 'rgba(255,255,255,0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '28px',
        }}
      >
        <LockKeyhole size={28} color="#fff" />
      </div>

      <div className="flex flex-col gap-2">
        <h1
          style={{
            fontSize: '20px',
            fontWeight: 700,
            color: '#fff',
            letterSpacing: '-0.3px',
          }}
        >
          {settings?.name ?? 'Магазин'}
        </h1>
        <p
          style={{
            fontSize: '14px',
            color: 'rgba(255,255,255,0.7)',
            lineHeight: '1.5',
          }}
        >
          У магазина истекла подписка.{'\n'}
          Пожалуйста, продлите её чтобы активировать магазин.
        </p>
      </div>
    </div>
  )
}