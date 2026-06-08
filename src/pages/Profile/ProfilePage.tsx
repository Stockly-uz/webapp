import { useAppStore } from '../../store/appStore';
import Avatar from './components/Avatar';
import InfoCard from './components/InfoCard';
import SettingsSection from './components/SettingsSection';

export default function ProfilePage() {
  const { user, settings } = useAppStore();

  return (
    <div className="flex flex-col gap-4 pb-4">
      {/* Header */}
      <div
        className="sticky top-0 z-40 px-4 pb-3"
          style={{
            paddingTop: 'var(--header-top-padding)',
            background: 'var(--color-header)',
          }}
      >
        <h1
          style={{
            fontSize: '22px',
            fontWeight: 700,
            color: 'var(--color-header-text)',
            letterSpacing: '-0.4px',
          }}
        >
          Профиль
        </h1>
      </div>

      {/* Аватар + имя */}
      <div
        className="flex flex-col items-center gap-3 pt-4 pb-2"
        style={{ padding: '24px 16px 8px' }}
      >
        <Avatar user={user} />

        <div className="flex flex-col items-center gap-1">
          <h2
            style={{
              fontSize: '20px',
              fontWeight: 700,
              color: 'var(--color-text)',
              letterSpacing: '-0.3px',
            }}
          >
            {user
              ? [user.first_name, user.last_name].filter(Boolean).join(' ')
              : '—'}
          </h2>

          {user?.username && (
            <p style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>
              @{user.username}
            </p>
          )}
        </div>
      </div>

      {/* Инфо */}
      <div className="px-4">
        <InfoCard user={user} />
      </div>

      {/* Настройки / о магазине */}
      <div className="px-4">
        <SettingsSection settings={settings} />
      </div>
    </div>
  );
}