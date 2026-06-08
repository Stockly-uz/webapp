import { useNavigate } from 'react-router-dom';

export default function EmptyCart() {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col items-center justify-center gap-4 flex-1"
      style={{ minHeight: '60dvh', padding: '0 32px' }}
    >
      <div
        style={{
          width: '80px',
          height: '80px',
          borderRadius: 'var(--radius-lg)',
          background: 'var(--color-surface)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 16px var(--color-shadow)',
        }}
      >
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
          <path
            d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"
            stroke="var(--color-text-muted)"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path d="M3 6h18M16 10a4 4 0 01-8 0" stroke="var(--color-text-muted)" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>

      <div className="flex flex-col items-center gap-1 text-center">
        <p style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-text)' }}>
          Корзина пуста
        </p>
        <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
          Добавьте товары из каталога
        </p>
      </div>

      <button
        onClick={() => navigate('/catalog')}
        style={{
          padding: '12px 28px',
          borderRadius: 'var(--radius-md)',
          background: 'var(--color-primary)',
          color: '#fff',
          fontSize: '15px',
          fontWeight: 600,
          border: 'none',
        }}
      >
        Перейти в каталог
      </button>
    </div>
  );
}