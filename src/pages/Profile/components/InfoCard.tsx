import type { User } from '../../../types';

interface Props {
  user: User | null;
}

interface Row {
  label: string;
  value: string | null | undefined;
  icon: React.ReactNode;
}

export default function InfoCard({ user }: Props) {
  const rows: Row[] = [
    {
      label: 'Телефон',
      value: user?.phone ?? 'Не указан',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M6.6 10.8a15.15 15.15 0 006.6 6.6l2.2-2.2a1 1 0 011.02-.24 11.36 11.36 0 003.56.57 1 1 0 011 1v3.5a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1.02L6.6 10.8z"
            stroke="var(--color-primary)"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      label: 'Telegram ID',
      value: user?.telegram_id ? String(user.telegram_id) : '—',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M21 5L2 12.5l7 1M21 5l-2.5 15L9 13.5M21 5L9 13.5m0 0v5.5l3.5-3"
            stroke="var(--color-primary)"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
  ];

  return (
    <div
      style={{
        background: 'var(--color-surface)',
        borderRadius: 'var(--radius-md)',
        boxShadow: '0 1px 4px var(--color-shadow)',
        overflow: 'hidden',
      }}
    >
      {rows.map((row, i) => (
        <div
          key={row.label}
          className="flex items-center gap-3"
          style={{
            padding: '14px 16px',
            borderBottom: i < rows.length - 1 ? '1px solid var(--color-border)' : 'none',
          }}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--color-surface-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            {row.icon}
          </div>

          <div className="flex flex-col flex-1">
            <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
              {row.label}
            </span>
            <span style={{ fontSize: '15px', fontWeight: 500, color: 'var(--color-text)' }}>
              {row.value}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}