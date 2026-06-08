import { useCartStore } from '../../../store/cartStore';
import type { CartItem as CartItemType } from '../../../types';
import { useHaptic } from '../../../hooks/useHaptic';

interface Props {
  item: CartItemType;
}

export default function CartItem({ item }: Props) {
  const { increment, decrement } = useCartStore();
  const { product, quantity } = item;
  const haptic = useHaptic();
  const hasDiscount = product.final_price < product.price;

  const formatPrice = (p: number) => p.toLocaleString('ru-RU') + ' сум';

  return (
    <div
      className="flex gap-3"
      style={{
        background: 'var(--color-surface)',
        borderRadius: 'var(--radius-md)',
        padding: '12px',
        boxShadow: '0 1px 4px var(--color-shadow)',
      }}
    >
      {/* Фото */}
      <div
        style={{
          width: '80px',
          height: '80px',
          borderRadius: 'var(--radius-sm)',
          overflow: 'hidden',
          flexShrink: 0,
          background: 'var(--color-surface-secondary)',
        }}
      >
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="18" height="18" rx="3" stroke="var(--color-text-muted)" strokeWidth="1.5" />
              <circle cx="8.5" cy="8.5" r="1.5" fill="var(--color-text-muted)" />
              <path d="M21 15l-5-5L5 21" stroke="var(--color-text-muted)" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
          </div>
        )}
      </div>

      {/* Инфо */}
      <div className="flex flex-col flex-1 gap-1">
        {product.brand && (
          <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {product.brand.name}
          </span>
        )}

        <p style={{ fontSize: '14px', fontWeight: 500, color: 'var(--color-text)', lineHeight: 1.3 }}>
          {product.name}
        </p>

        {product.volume && (
          <p style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
            {product.volume}
          </p>
        )}

        {/* Цена + Счётчик */}
        <div className="flex items-center justify-between mt-auto pt-1">
          <div className="flex flex-col">
            <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-text)' }}>
              {formatPrice(product.final_price * quantity)}
            </span>
            {hasDiscount && (
              <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', textDecoration: 'line-through' }}>
                {formatPrice(product.price * quantity)}
              </span>
            )}
          </div>

          {/* Счётчик */}
          <div
            className="flex items-center gap-3"
            style={{
              background: 'var(--color-surface-secondary)',
              borderRadius: '100px',
              padding: '4px 4px',
            }}
          >
            <button
              onClick={() => { haptic.light(); decrement(product.id); }}
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: quantity === 1 ? '#EF4444' : 'var(--color-surface)',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 1px 3px var(--color-shadow)',
              }}
            >
              {quantity === 1 ? (
                // Иконка удалить
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14" stroke="var(--color-text)" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              )}
            </button>

            <span style={{ fontSize: '15px', fontWeight: 600, minWidth: '16px', textAlign: 'center', color: 'var(--color-text)' }}>
              {quantity}
            </span>

            <button
              onClick={() => { haptic.light(); increment(product.id); }}
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: 'var(--color-primary)',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 1px 3px var(--color-shadow)',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M12 5v14M5 12h14" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}