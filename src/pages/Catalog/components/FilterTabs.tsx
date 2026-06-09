import { useCatalogStore } from '../../../store/catalogStore';
import { brandsApi } from '../../../api/index';
import { useEffect, useState } from 'react';
import type { Brand } from '../../../types';
import type { ProductFilter } from '../../../types';
import { useHaptic } from '../../../hooks/useHaptic';
import { Sparkles, Flame, Tag, Bookmark } from 'lucide-react';

const FILTERS: { key: ProductFilter; label: string; icon?: React.ReactNode }[] = [
  { key: 'all',   label: 'Все' },
  { key: 'new',   label: 'Новинки', icon: <Sparkles size={13} /> },
  { key: 'hit',   label: 'Хиты',    icon: <Flame size={13} /> },
  { key: 'sale',  label: 'Скидки',  icon: <Tag size={13} /> },
  { key: 'brand', label: 'Бренды',  icon: <Bookmark size={13} /> },
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

      {/* Островок фильтров */}
      <div className="px-4">
        <div
          className="flex items-center"
          style={{
            background: 'var(--color-surface)',
            borderRadius: 'var(--radius-lg)',
            padding: '4px',
            boxShadow: '0 1px 4px var(--color-shadow)',
            gap: '2px',
          }}
        >
          {FILTERS.map((f) => {
            const isActive = f.key === 'brand'
              ? activeFilter === 'brand'
              : activeFilter === f.key;

            return (
              <button
                key={f.key}
                onClick={() => handleFilter(f.key)}
                className="flex items-center justify-center gap-1"
                style={{
                  flex: 1,
                  padding: '7px 4px',
                  borderRadius: '10px',
                  fontSize: '12px',
                  fontWeight: isActive ? 600 : 400,
                  background: isActive ? 'var(--color-primary)' : 'transparent',
                  color: isActive ? '#fff' : 'var(--color-text-secondary)',
                  border: 'none',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap',
                }}
              >
                {f.icon && (
                  <span style={{ display: 'flex', alignItems: 'center', opacity: isActive ? 1 : 0.6 }}>
                    {f.icon}
                  </span>
                )}
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Островок брендов */}
      {showBrands && brands.length > 0 && (
        <div
          className="px-4 overflow-x-auto"
          style={{ scrollbarWidth: 'none' }}
        >
          <div
            className="flex gap-1 w-fit"
            style={{
              background: 'var(--color-surface)',
              borderRadius: 'var(--radius-lg)',
              padding: '4px',
              boxShadow: '0 1px 4px var(--color-shadow)',
            }}
          >
            {brands.map((brand) => {
              const isActive = activeBrandId === brand.id;
              return (
                <button
                  key={brand.id}
                  onClick={() => { haptic.select(); setBrand(brand.id); }}
                  className="flex items-center gap-1"
                  style={{
                    flexShrink: 0,
                    padding: '6px 12px',
                    borderRadius: '10px',
                    fontSize: '13px',
                    fontWeight: isActive ? 600 : 400,
                    background: isActive ? 'var(--color-primary)' : 'transparent',
                    color: isActive ? '#fff' : 'var(--color-text-secondary)',
                    border: 'none',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {brand.logo && (
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      style={{ width: 16, height: 16, borderRadius: '50%', objectFit: 'cover' }}
                    />
                  )}
                  {brand.name}
                </button>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
}