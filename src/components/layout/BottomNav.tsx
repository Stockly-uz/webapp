import { NavLink } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';
import { useHaptic } from '../../hooks/useHaptic';

export default function BottomNav() {
  const totalItems = useCartStore((s) => s.totalItems());
  const haptic = useHaptic();

  return (
    <nav
      className="glass fixed bottom-0 left-0 right-0 z-50"
      style={{
        paddingBottom: 'env(safe-area-inset-bottom)',
        borderTop: '1px solid var(--glass-border)',
      }}
    >
      <div className="flex items-center justify-around h-16">
        {tabs.map((tab) => (
          <NavLink
            key={tab.path}
            to={tab.path}
            onClick={() => haptic.select()}  // вибрация при тапе
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
                <span
                  style={{
                    fontSize: '10px',
                    fontWeight: isActive ? 600 : 400,
                    letterSpacing: '0.01em',
                  }}
                >
                  {tab.label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}