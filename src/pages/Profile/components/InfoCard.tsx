import { useState } from 'react'
import type { User } from '../../../types'
import {
  Phone, Mail, MapPin, Globe, User as UserIcon,
  Calendar, Pencil, Check, X
} from 'lucide-react'

interface Props {
  user: User | null
  onUpdate: (data: Partial<User>) => Promise<void>
}

interface Row {
  key: keyof User
  label: string
  icon: React.ReactNode
  editable: boolean
  type?: string
  options?: { value: string; label: string }[]
}

const GENDER_OPTIONS = [
  { value: 'male', label: 'Мужской' },
  { value: 'female', label: 'Женский' },
]

const LANG_OPTIONS = [
  { value: 'ru', label: 'Русский' },
  { value: 'uz', label: 'O\'zbekcha' },
  { value: 'en', label: 'English' },
]

const rows: Row[] = [
  { key: 'full_name', label: 'Имя', icon: <UserIcon size={16} />, editable: true },
  { key: 'phone_number', label: 'Телефон', icon: <Phone size={16} />, editable: false },
  { key: 'email', label: 'Email', icon: <Mail size={16} />, editable: true, type: 'email' },
  { key: 'address', label: 'Адрес', icon: <MapPin size={16} />, editable: true },
  { key: 'birth_date', label: 'Дата рождения', icon: <Calendar size={16} />, editable: true, type: 'date' },
  { key: 'gender', label: 'Пол', icon: <UserIcon size={16} />, editable: true, options: GENDER_OPTIONS },
  { key: 'lang', label: 'Язык', icon: <Globe size={16} />, editable: true, options: LANG_OPTIONS },
]

export default function InfoCard({ user, onUpdate }: Props) {
  const [editingKey, setEditingKey] = useState<keyof User | null>(null)
  const [editValue, setEditValue] = useState<string>('')
  const [saving, setSaving] = useState(false)

  const getValue = (row: Row): string => {
    const val = user?.[row.key]
    if (!val) return ''
    if (row.options) {
      return row.options.find(o => o.value === val)?.label ?? String(val)
    }
    return String(val)
  }

  const startEdit = (row: Row) => {
    if (!row.editable) return
    setEditingKey(row.key)
    setEditValue(String(user?.[row.key] ?? ''))
  }

  const cancelEdit = () => {
    setEditingKey(null)
    setEditValue('')
  }

  const saveEdit = async () => {
    if (!editingKey) return
    setSaving(true)
    try {
      await onUpdate({ [editingKey]: editValue || null })
      setEditingKey(null)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div
      style={{
        background: 'var(--color-surface)',
        borderRadius: 'var(--radius-md)',
        boxShadow: '0 1px 4px var(--color-shadow)',
        overflow: 'hidden',
      }}
    >
      {rows.map((row, i) => {
        const value = getValue(row)
        const isEditing = editingKey === row.key

        return (
          <div
            key={row.key}
            style={{
              padding: '14px 16px',
              borderBottom: i < rows.length - 1 ? '1px solid var(--color-border)' : 'none',
            }}
          >
            <div className="flex items-center gap-3">
              {/* Иконка */}
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
                  color: 'var(--color-primary)',
                }}
              >
                {row.icon}
              </div>

              {/* Контент */}
              <div className="flex-1 min-w-0">
                <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                  {row.label}
                </span>

                {isEditing ? (
                  row.options ? (
                    <select
                      value={editValue}
                      onChange={e => setEditValue(e.target.value)}
                      autoFocus
                      style={{
                        display: 'block',
                        width: '100%',
                        fontSize: '15px',
                        fontWeight: 500,
                        color: 'var(--color-text)',
                        background: 'var(--color-surface-secondary)',
                        border: 'none',
                        outline: 'none',
                        borderRadius: '8px',
                        padding: '4px 8px',
                        marginTop: '2px',
                      }}
                    >
                      <option value="">Не указано</option>
                      {row.options.map(o => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={row.type ?? 'text'}
                      value={editValue}
                      onChange={e => setEditValue(e.target.value)}
                      autoFocus
                      style={{
                        display: 'block',
                        width: '100%',
                        fontSize: '15px',
                        fontWeight: 500,
                        color: 'var(--color-text)',
                        background: 'var(--color-surface-secondary)',
                        border: 'none',
                        outline: 'none',
                        borderRadius: '8px',
                        padding: '4px 8px',
                        marginTop: '2px',
                      }}
                    />
                  )
                ) : (
                  <p
                    style={{
                      fontSize: '15px',
                      fontWeight: 500,
                      color: value ? 'var(--color-text)' : 'var(--color-text-muted)',
                    }}
                  >
                    {value || 'Указать'}
                  </p>
                )}
              </div>

              {/* Кнопки */}
              {row.editable && (
                isEditing ? (
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={saveEdit}
                      disabled={saving}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: 'var(--color-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      <Check size={15} color="#fff" />
                    </button>
                    <button
                      onClick={cancelEdit}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: 'var(--color-surface-secondary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      <X size={15} color="var(--color-text-muted)" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => startEdit(row)}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: 'var(--color-surface-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: 'none',
                      cursor: 'pointer',
                      flexShrink: 0,
                    }}
                  >
                    <Pencil size={14} color="var(--color-text-muted)" />
                  </button>
                )
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}