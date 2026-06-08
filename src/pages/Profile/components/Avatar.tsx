import type { User } from '../../../types';

interface Props {
  user: User | null;
}

export default function Avatar({ user }: Props) {
  const initials = user
    ? [user.first_name[0], user.last_name?.[0]].filter(Boolean).join('').toUpperCase()
    : '?';

  return (
    <div
      style={{
        width: '88px',
        height: '88px',
        borderRadius: '50%',
        overflow: 'hidden',
        background: 'var(--color-primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 16px var(--color-shadow)',
        flexShrink: 0,
      }}
    >
      {user?.avatar ? (
        <img
          src={user.avatar}
          alt={user.first_name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      ) : (
        <span
          style={{
            fontSize: '32px',
            fontWeight: 700,
            color: '#fff',
            letterSpacing: '-0.5px',
          }}
        >
          {initials}
        </span>
      )}
    </div>
  );
}