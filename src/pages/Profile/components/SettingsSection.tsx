import type { OrganizationSettings } from '../../../types';

interface Props {
  settings: OrganizationSettings | null;
}

interface MenuItem {
  label: string;
  subtitle?: string;
  icon: React.ReactNode;
  onClick?: () => void;
  danger?: boolean;
}

export default function SettingsSection({ settings }: Props) {
  const tg = window.Telegram?.WebApp;

  const items: MenuItem[] = [
    {
      label: 'О магазине',
      subtitle: settings?.name ?? '—',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"
            stroke="var(--color-primary)"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path d="M9 22V12h6v10" stroke="var(--color-primary)" strokeWidth="1.8" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      label: 'Поддержка',
      subtitle: 'Написать в чат',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"
            stroke="var(--color-primary)"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
      ),
      onClick: () => tg?.close(),
    },
    {
      label: 'Версия приложения',
      subtitle: '1.0.0',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke="var(--color-primary)" strokeWidth="1.8" />
          <path d="M12 8v4m0 4h.01" stroke="var(--color-primary)" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      label: 'Закрыть приложение',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"
            stroke="#EF4444"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      onClick: () => tg?.close(),
      danger: true,
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
      {items.map((item, i) => (
        <button
          key={item.label}
          onClick={item.onClick}
          disabled={!item.onClick}
          className="w-full text-left flex items-center gap-3"
          style={{
            padding: '14px 16px',
            borderBottom: i < items.length - 1 ? '1px solid var(--color-border)' : 'none',
            background: 'transparent',
            border: 'none',
            borderBottomColor: i < items.length - 1 ? 'var(--color-border)' : 'transparent',
            borderBottomWidth: i < items.length - 1 ? '1px' : '0',
            borderBottomStyle: 'solid',
            cursor: item.onClick ? 'pointer' : 'default',
          }}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-sm)',
              background: item.danger ? '#FEE2E2' : 'var(--color-surface-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            {item.icon}
          </div>

          <div className="flex flex-col flex-1">
            <span
              style={{
                fontSize: '15px',
                fontWeight: 500,
                color: item.danger ? '#EF4444' : 'var(--color-text)',
              }}
            >
              {item.label}
            </span>
            {item.subtitle && (
              <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                {item.subtitle}
              </span>
            )}
          </div>

          {item.onClick && !item.danger && (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
              <path d="M9 18l6-6-6-6" stroke="var(--color-text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </button>
      ))}
    </div>
  );
}