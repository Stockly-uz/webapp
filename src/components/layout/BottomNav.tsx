import { NavLink } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';
import { useHaptic } from '../../hooks/useHaptic';

const tabs = [
  {
    path: '/catalog',
    label: 'Каталог',
    icon: (active: boolean) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect
          x="3" y="3" width="7" height="7" rx="2"
          fill={active ? 'var(--color-primary)' : 'none'}
          stroke={active ? 'var(--color-primary)' : 'currentColor'}
          strokeWidth="1.8"
        />
        <rect
          x="14" y="3" width="7" height="7" rx="2"
          fill={active ? 'var(--color-primary)' : 'none'}
          stroke={active ? 'var(--color-primary)' : 'currentColor'}
          strokeWidth="1.8"
        />
        <rect
          x="3" y="14" width="7" height="7" rx="2"
          fill={active ? 'var(--color-primary)' : 'none'}
          stroke={active ? 'var(--color-primary)' : 'currentColor'}
          strokeWidth="1.8"
        />
        <rect
          x="14" y="14" width="7" height="7" rx="2"
          fill={active ? 'var(--color-primary)' : 'none'}
          stroke={active ? 'var(--color-primary)' : 'currentColor'}
          strokeWidth="1.8"
        />
      </svg>
    ),
  },
  {
    path: '/cart',
    label: 'Корзина',
    icon: (active: boolean) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"
          stroke={active ? 'var(--color-primary)' : 'currentColor'}
          strokeWidth="1.8"
          strokeLinejoin="round"
          fill={active ? 'var(--color-primary)' : 'none'}
          fillOpacity={active ? 0.12 : 0}
        />
        <path
          d="M3 6h18M16 10a4 4 0 01-8 0"
          stroke={active ? 'var(--color-primary)' : 'currentColor'}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    path: '/history',
    label: 'История',
    icon: (active: boolean) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle
          cx="12" cy="12" r="9"
          stroke={active ? 'var(--color-primary)' : 'currentColor'}
          strokeWidth="1.8"
          fill={active ? 'var(--color-primary)' : 'none'}
          fillOpacity={active ? 0.12 : 0}
        />
        <path
          d="M12 7v5l3 3"
          stroke={active ? 'var(--color-primary)' : 'currentColor'}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    path: '/profile',
    label: 'Профиль',
    icon: (active: boolean) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle
          cx="12" cy="8" r="4"
          stroke={active ? 'var(--color-primary)' : 'currentColor'}
          strokeWidth="1.8"
          fill={active ? 'var(--color-primary)' : 'none'}
          fillOpacity={active ? 0.12 : 0}
        />
        <path
          d="M4 20c0-4 3.6-7 8-7s8 3 8 7"
          stroke={active ? 'var(--color-primary)' : 'currentColor'}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export default function BottomNav() {
  const totalItems = useCartStore((s) => s.totalItems());
  const haptic = useHaptic();

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 flex justify-center"
      style={{
        paddingBottom: 'calc(env(safe-area-inset-bottom) + 12px)',
        paddingLeft: '16px',
        paddingRight: '16px',
        pointerEvents: 'none',
      }}
    >
      {/* Островок */}
      <nav
        className="glass flex items-center justify-around"
        style={{
          width: '100%',
          maxWidth: '400px',
          height: '60px',
          borderRadius: '20px',
          boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
          border: '1px solid var(--glass-border)',
          pointerEvents: 'all',
          padding: '0 8px',
        }}
      >
        {tabs.map((tab) => (
          <NavLink
            key={tab.path}
            to={tab.path}
            onClick={() => haptic.select()}
            className="flex flex-col items-center justify-center gap-1 flex-1 h-full relative"
            style={({ isActive }) => ({
              color: isActive ? 'var(--color-primary)' : 'var(--color-text-muted)',
            })}
          >
            {({ isActive }) => (
              <>
                <div className="relative">
                  {tab.icon(isActive)}
                  {tab.path === '/cart' && totalItems > 0 && (
                    <span
                      className="absolute -top-1 -right-1 min-w-4 h-4 rounded-full flex items-center justify-center text-white"
                      style={{
                        fontSize: '10px',
                        fontWeight: 700,
                        background: 'var(--color-primary)',
                        padding: '0 3px',
                      }}
                    >
                      {totalItems > 99 ? '99+' : totalItems}
                    </span>
                  )}
                </div>
                <span style={{ fontSize: '10px', fontWeight: isActive ? 600 : 400 }}>
                  {tab.label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}