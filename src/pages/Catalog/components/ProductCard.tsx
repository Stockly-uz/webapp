import { useCartStore } from '../../../store/cartStore';
import type { Product } from '../../../types';
import { useHaptic } from '../../../hooks/useHaptic';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { add, items } = useCartStore();
  const inCart = items.some((i) => i.product.id === product.id);
  const hasDiscount = product.final_price < product.price;
  const haptic = useHaptic();
  const formatPrice = (p: number) =>
    p.toLocaleString('ru-RU') + ' сум';

  return (
    <div
      className="flex flex-col"
      style={{
        borderRadius: 'var(--radius-md)',
        background: 'var(--color-surface)',
        overflow: 'hidden',
        boxShadow: '0 1px 4px var(--color-shadow)',
        position: 'relative',
      }}
    >
      {/* Бейджи */}
      <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
        {product.is_new && <Badge label="NEW" color="var(--color-primary)" />}
        {product.is_hit && <Badge label="ХИТ" color="#F59E0B" />}
        {hasDiscount && product.discount && (
          <Badge label={`-${product.discount}%`} color="#EF4444" />
        )}
      </div>

      {/* Фото */}
      <div style={{ height: '160px', background: 'var(--color-surface-secondary)', overflow: 'hidden' }}>
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="18" height="18" rx="3" stroke="var(--color-text-muted)" strokeWidth="1.5" />
              <circle cx="8.5" cy="8.5" r="1.5" fill="var(--color-text-muted)" />
              <path d="M21 15l-5-5L5 21" stroke="var(--color-text-muted)" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
          </div>
        )}
      </div>

      {/* Инфо */}
      <div className="flex flex-col gap-1 p-3">
        {product.brand && (
          <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {product.brand.name}
          </span>
        )}

        <p style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-text)', lineHeight: 1.3 }}>
          {product.name}
        </p>

        {product.volume && (
          <p style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
            {product.volume}
          </p>
        )}

        {/* Цена */}
        <div className="flex items-center justify-between mt-1">
          <div className="flex flex-col">
            <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-text)' }}>
              {formatPrice(product.final_price)}
            </span>
            {hasDiscount && (
              <span style={{ fontSize: '12px', color: 'var(--color-text-muted)', textDecoration: 'line-through' }}>
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          {/* Кнопка добавить */}
          <button
            onClick={() => { haptic.light(); add(product); }}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: inCart ? 'var(--color-primary)' : 'var(--color-primary)',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: inCart ? 0.6 : 1,
              transition: 'transform 0.15s ease',
              flexShrink: 0,
            }}
            onTouchStart={(e) => (e.currentTarget.style.transform = 'scale(0.9)')}
            onTouchEnd={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            {inCart ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 5v14M5 12h14" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function Badge({ label, color }: { label: string; color: string }) {
  return (
    <span
      style={{
        background: color,
        color: '#fff',
        fontSize: '10px',
        fontWeight: 700,
        padding: '2px 6px',
        borderRadius: '100px',
        letterSpacing: '0.04em',
      }}
    >
      {label}
    </span>
  );
}