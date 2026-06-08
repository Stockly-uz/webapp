import { useCatalogStore } from '../../../store/catalogStore';
import ProductCard from './ProductCard';

export default function ProductGrid() {
  const { products, isLoading } = useCatalogStore();

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-3 px-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (!products.length) {
    return (
      <div
        className="flex flex-col items-center justify-center gap-2 py-16"
        style={{ color: 'var(--color-text-muted)' }}
      >
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
          <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <p style={{ fontSize: '15px' }}>Ничего не найдено</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 px-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

function SkeletonCard() {
  return (
    <div
      style={{
        borderRadius: 'var(--radius-md)',
        background: 'var(--color-surface)',
        overflow: 'hidden',
      }}
    >
      <div
        className="animate-pulse"
        style={{ height: '160px', background: 'var(--color-surface-secondary)' }}
      />
      <div className="p-3 flex flex-col gap-2">
        <div className="animate-pulse h-3 rounded-full" style={{ background: 'var(--color-surface-secondary)', width: '80%' }} />
        <div className="animate-pulse h-3 rounded-full" style={{ background: 'var(--color-surface-secondary)', width: '50%' }} />
        <div className="animate-pulse h-4 rounded-full" style={{ background: 'var(--color-surface-secondary)', width: '60%' }} />
      </div>
    </div>
  );
}