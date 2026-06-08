import { useEffect, useState } from 'react';
import { ordersApi } from '../../api/index';
import type { Order } from '../../types';
import OrderCard from './components/OrderCard';
import EmptyHistory from './components/EmptyHistory';

export default function HistoryPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    ordersApi.getHistory()
      .then(setOrders)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="flex flex-col">
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
          История заказов
        </h1>
      </div>

      <div className="flex flex-col gap-3 p-4">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => <SkeletonOrder key={i} />)
        ) : orders.length === 0 ? (
          <EmptyHistory />
        ) : (
          orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))
        )}
      </div>
    </div>
  );
}

function SkeletonOrder() {
  return (
    <div
      style={{
        background: 'var(--color-surface)',
        borderRadius: 'var(--radius-md)',
        padding: '16px',
        boxShadow: '0 1px 4px var(--color-shadow)',
      }}
    >
      <div className="flex justify-between mb-3">
        <div className="animate-pulse h-4 rounded-full w-24" style={{ background: 'var(--color-surface-secondary)' }} />
        <div className="animate-pulse h-4 rounded-full w-16" style={{ background: 'var(--color-surface-secondary)' }} />
      </div>
      <div className="flex gap-2 mb-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="animate-pulse rounded-lg w-12 h-12" style={{ background: 'var(--color-surface-secondary)' }} />
        ))}
      </div>
      <div className="animate-pulse h-4 rounded-full w-32" style={{ background: 'var(--color-surface-secondary)' }} />
    </div>
  );
}