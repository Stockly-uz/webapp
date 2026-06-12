import { useAppStore } from '../../store/appStore'
import InfoCard from './components/InfoCard'
import SettingsSection from './components/SettingsSection'
import type { User } from '../../types'
import { client } from '../../api/client'

export default function ProfilePage() {
  const { user, settings, setUser } = useAppStore()

  const handleUpdate = async (data: Partial<User>) => {
    try {
      const res = await client.patch('/users/me', data)
      setUser(res.data)
    } catch {
      console.error('Ошибка при обновлении профиля')
    }
  }

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

      {/* Имя */}
      <div
        className="flex flex-col items-center gap-1"
        style={{ padding: '16px 16px 4px' }}
      >
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '20px',
            background: 'var(--color-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            fontWeight: 700,
            color: '#fff',
            marginBottom: '8px',
          }}
        >
          {user?.full_name?.charAt(0).toUpperCase() ?? '?'}
        </div>

        <h2
          style={{
            fontSize: '20px',
            fontWeight: 700,
            color: 'var(--color-text)',
            letterSpacing: '-0.3px',
          }}
        >
          {user?.full_name ?? '—'}
        </h2>

        {user?.username && (
          <p style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>
            @{user.username}
          </p>
        )}
      </div>

      {/* Инфо */}
      <div className="px-4">
        <InfoCard user={user} onUpdate={handleUpdate} />
      </div>

      {/* Настройки / о магазине */}
      <div className="px-4">
        <SettingsSection settings={settings} />
      </div>
    </div>
  )
}