import { useState } from 'react';
import type { Order, OrderStatus } from '../../../types';

interface Props {
  order: Order;
}

const STATUS_CONFIG: Record<OrderStatus, { label: string; color: string; bg: string }> = {
  pending:    { label: 'Ожидает',    color: '#F59E0B', bg: '#FEF3C7' },
  confirmed:  { label: 'Подтверждён', color: '#3B82F6', bg: '#DBEAFE' },
  processing: { label: 'В обработке', color: '#8B5CF6', bg: '#EDE9FE' },
  shipped:    { label: 'В доставке', color: '#06B6D4', bg: '#CFFAFE' },
  delivered:  { label: 'Доставлен',  color: '#22C55E', bg: '#DCFCE7' },
  cancelled:  { label: 'Отменён',    color: '#EF4444', bg: '#FEE2E2' },
};

export default function OrderCard({ order }: Props) {
  const [expanded, setExpanded] = useState(false);
  const status = STATUS_CONFIG[order.status];
  const formatPrice = (p: number) => p.toLocaleString('ru-RU') + ' сум';

  const date = new Date(order.created_at).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const time = new Date(order.created_at).toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div
      style={{
        background: 'var(--color-surface)',
        borderRadius: 'var(--radius-md)',
        boxShadow: '0 1px 4px var(--color-shadow)',
        overflow: 'hidden',
      }}
    >
      {/* Шапка карточки */}
      <button
        onClick={() => setExpanded((p) => !p)}
        className="w-full text-left"
        style={{ padding: '14px 16px' }}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-1">
            <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-text)' }}>
              Заказ №{order.id}
            </span>
            <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
              {date}, {time}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Статус */}
            <span
              style={{
                fontSize: '12px',
                fontWeight: 600,
                color: status.color,
                background: status.bg,
                padding: '4px 10px',
                borderRadius: '100px',
              }}
            >
              {status.label}
            </span>

            {/* Стрелка */}
            <svg
              width="16" height="16" viewBox="0 0 24 24" fill="none"
              style={{
                transition: 'transform 0.25s ease',
                transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                flexShrink: 0,
              }}
            >
              <path d="M6 9l6 6 6-6" stroke="var(--color-text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Превью товаров */}
        {!expanded && (
          <div className="flex gap-2 mt-3">
            {order.items.slice(0, 4).map((item, i) => (
              <div
                key={i}
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: 'var(--radius-sm)',
                  overflow: 'hidden',
                  background: 'var(--color-surface-secondary)',
                  flexShrink: 0,
                  position: 'relative',
                }}
              >
                {item.product.image ? (
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <rect x="3" y="3" width="18" height="18" rx="3" stroke="var(--color-text-muted)" strokeWidth="1.5" />
                    </svg>
                  </div>
                )}
                {/* +N если больше 4 */}
                {i === 3 && order.items.length > 4 && (
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ background: 'rgba(0,0,0,0.45)' }}
                  >
                    <span style={{ color: '#fff', fontSize: '12px', fontWeight: 700 }}>
                      +{order.items.length - 4}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </button>

      {/* Раскрытый список */}
      {expanded && (
        <div style={{ borderTop: '1px solid var(--color-border)' }}>
          <div className="flex flex-col">
            {order.items.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3"
                style={{
                  padding: '10px 16px',
                  borderBottom: i < order.items.length - 1 ? '1px solid var(--color-border)' : 'none',
                }}
              >
                {/* Фото */}
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: 'var(--radius-sm)',
                    overflow: 'hidden',
                    background: 'var(--color-surface-secondary)',
                    flexShrink: 0,
                  }}
                >
                  {item.product.image && (
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  )}
                </div>

                {/* Название + объём */}
                <div className="flex flex-col flex-1 gap-0.5">
                  <p style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-text)', lineHeight: 1.3 }}>
                    {item.product.name}
                  </p>
                  {item.product.volume && (
                    <p style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                      {item.product.volume}
                    </p>
                  )}
                </div>

                {/* Кол-во + цена */}
                <div className="flex flex-col items-end gap-0.5">
                  <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text)' }}>
                    {formatPrice(item.final_price * item.quantity)}
                  </span>
                  <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                    {item.quantity} шт × {formatPrice(item.final_price)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Комментарий */}
          {order.comment && (
            <div
              style={{
                margin: '0 16px 12px',
                padding: '10px 12px',
                background: 'var(--color-surface-secondary)',
                borderRadius: 'var(--radius-sm)',
              }}
            >
              <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: '2px' }}>
                Комментарий
              </p>
              <p style={{ fontSize: '13px', color: 'var(--color-text)' }}>
                {order.comment}
              </p>
            </div>
          )}

          {/* Итого */}
          <div
            className="flex items-center justify-between"
            style={{
              padding: '12px 16px',
              borderTop: '1px solid var(--color-border)',
            }}
          >
            <span style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>
              Итого
            </span>
            <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-primary)' }}>
              {formatPrice(order.total)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}