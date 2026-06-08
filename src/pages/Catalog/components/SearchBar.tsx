import { useState, useCallback } from 'react';
import { useCatalogStore } from '../../../store/catalogStore';

export default function SearchBar() {
  const setSearch = useCatalogStore((s) => s.setSearch);
  const [value, setValue] = useState('');

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      setSearch(e.target.value);
    },
    [setSearch]
  );

  const handleClear = () => {
    setValue('');
    setSearch('');
  };

  return (
    <div className="px-4">
      <div
        className="flex items-center gap-3 px-4"
        style={{
          background: 'var(--color-surface)',
          borderRadius: 'var(--radius-md)',
          height: '44px',
          boxShadow: '0 1px 3px var(--color-shadow)',
        }}
      >
        {/* Иконка поиска */}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
          <circle cx="11" cy="11" r="7" stroke="var(--color-text-muted)" strokeWidth="2" />
          <path d="M16.5 16.5L21 21" stroke="var(--color-text-muted)" strokeWidth="2" strokeLinecap="round" />
        </svg>

        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder="Поиск товаров..."
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            fontSize: '16px', // 16px чтобы iOS не зумил при фокусе
            color: 'var(--color-text)',
          }}
        />

        {value && (
          <button onClick={handleClear} style={{ flexShrink: 0 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" fill="var(--color-text-muted)" fillOpacity="0.3" />
              <path d="M9 9l6 6M15 9l-6 6" stroke="var(--color-text-muted)" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}