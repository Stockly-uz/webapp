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
    <div className="flex items-center flex-1 gap-2">
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Поиск..."
        style={{
          flex: 1,
          background: 'transparent',
          border: 'none',
          outline: 'none',
          fontSize: '15px',
          color: 'var(--color-text)',
        }}
      />
      {value && (
        <button onClick={handleClear}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9" fill="var(--color-text-muted)" fillOpacity="0.3" />
            <path d="M9 9l6 6M15 9l-6 6" stroke="var(--color-text-muted)" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </div>
  );
}