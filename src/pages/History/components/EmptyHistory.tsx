import { useNavigate } from 'react-router-dom';

export default function EmptyHistory() {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col items-center justify-center gap-4 text-center"
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
          <circle cx="12" cy="12" r="9" stroke="var(--color-text-muted)" strokeWidth="1.5" />
          <path d="M12 7v5l3 3" stroke="var(--color-text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <div className="flex flex-col gap-1">
        <p style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-text)' }}>
          Заказов пока нет
        </p>
        <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
          Оформите первый заказ и он появится здесь
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