import { useCatalogStore } from '../../../store/catalogStore';
import { brandsApi } from '../../../api/index';
import { useEffect, useState } from 'react';
import type { Brand } from '../../../types';
import type { ProductFilter } from '../../../types';
import { useHaptic } from '../../../hooks/useHaptic';

const FILTERS: { key: ProductFilter; label: string }[] = [
  { key: 'all',  label: 'Все' },
  { key: 'new',  label: '🆕 Новинки' },
  { key: 'hit',  label: '🔥 Хиты' },
  { key: 'sale', label: '🏷 Скидки' },
  { key: 'brand', label: 'Бренды' },
];

export default function FilterTabs() {
  const { activeFilter, setFilter, setBrand, activeBrandId } = useCatalogStore();
  const [brands, setBrands] = useState<Brand[]>([]);
  const [showBrands, setShowBrands] = useState(false);
  const haptic = useHaptic();

  useEffect(() => {
    brandsApi.getList().then(setBrands);
  }, []);

  const handleFilter = (key: ProductFilter) => {
    haptic.select();
    if (key === 'brand') {
      setShowBrands((prev) => !prev);
      return;
    }
    setShowBrands(false);
    setFilter(key);
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Основные фильтры */}
      <div className="flex gap-2 px-4 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
        {FILTERS.map((f) => {
          const isActive = f.key === 'brand'
            ? activeFilter === 'brand'
            : activeFilter === f.key;

          return (
            <button
              key={f.key}
              onClick={() => handleFilter(f.key)}
              style={{
                flexShrink: 0,
                padding: '8px 16px',
                borderRadius: '100px',
                fontSize: '14px',
                fontWeight: isActive ? 600 : 400,
                background: isActive ? 'var(--color-primary)' : 'var(--color-surface)',
                color: isActive ? '#fff' : 'var(--color-text)',
                border: 'none',
                boxShadow: isActive ? 'none' : '0 1px 3px var(--color-shadow)',
                transition: 'all 0.2s ease',
              }}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {/* Список брендов */}
      {showBrands && brands.length > 0 && (
        <div className="flex gap-2 px-4 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          {brands.map((brand) => {
            const isActive = activeBrandId === brand.id;
            return (
              <button
                key={brand.id}
                onClick={() => setBrand(brand.id)}
                className="flex items-center gap-2"
                style={{
                  flexShrink: 0,
                  padding: '6px 14px',
                  borderRadius: '100px',
                  fontSize: '13px',
                  fontWeight: isActive ? 600 : 400,
                  background: isActive ? 'var(--color-primary)' : 'var(--color-surface)',
                  color: isActive ? '#fff' : 'var(--color-text-secondary)',
                  border: `1.5px solid ${isActive ? 'var(--color-primary)' : 'var(--color-border)'}`,
                  transition: 'all 0.2s ease',
                }}
              >
                {brand.logo && (
                  <img src={brand.logo} alt={brand.name} style={{ width: 18, height: 18, borderRadius: '50%', objectFit: 'cover' }} />
                )}
                {brand.name}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}