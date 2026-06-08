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
    <div
      className="flex items-center gap-3 px-4"
      style={{
        background: 'rgba(255,255,255,0.15)',
        borderRadius: 'var(--radius-md)',
        height: '40px',
        border: '1px solid rgba(255,255,255,0.2)',
      }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
        <circle cx="11" cy="11" r="7" stroke="rgba(255,255,255,0.7)" strokeWidth="2" />
        <path d="M16.5 16.5L21 21" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" />
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
          fontSize: '16px',
          color: '#fff',
        }}
      />

      {value && (
        <button onClick={handleClear} style={{ flexShrink: 0 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9" fill="rgba(255,255,255,0.3)" />
            <path d="M9 9l6 6M15 9l-6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </div>
  );
}