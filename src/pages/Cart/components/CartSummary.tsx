import { useState } from 'react';
import { useCartStore } from '../../../store/cartStore';
import { ordersApi } from '../../../api/index';
import { useHaptic } from '../../../hooks/useHaptic';

export default function CartSummary() {
  const { items, totalPrice, totalItems, clear } = useCartStore();
  const [comment, setComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const haptic = useHaptic();

  const handleOrder = async () => {
    setIsLoading(true);
    try {
      await ordersApi.create({
        items: items.map((i) => ({
          product_id: i.product.id,
          quantity: i.quantity,
        })),
        comment: comment.trim() || undefined,
      });

      window.Telegram?.WebApp?.HapticFeedback?.notificationOccurred('success');
      haptic.success();
      clear();
      setSuccess(true);
    } catch (err) {
      window.Telegram?.WebApp?.HapticFeedback?.notificationOccurred('error');
      haptic.error();
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div
        className="flex flex-col items-center gap-3 py-8"
        style={{
          background: 'var(--color-surface)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: '0 1px 4px var(--color-shadow)',
        }}
      >
        <div
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: '#22C55E',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p style={{ fontSize: '17px', fontWeight: 700, color: 'var(--color-text)' }}>
          Заказ оформлен!
        </p>
        <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', textAlign: 'center' }}>
          Мы скоро с вами свяжемся
        </p>
      </div>
    );
  }

  const formatPrice = (p: number) => p.toLocaleString('ru-RU') + ' сум';
  const savings = items.reduce(
    (sum, i) => sum + (i.product.price - i.product.final_price) * i.quantity,
    0
  );

  return (
    <div
      className="flex flex-col gap-4 p-4"
      style={{
        background: 'var(--color-surface)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: '0 1px 4px var(--color-shadow)',
      }}
    >
      {/* Итого */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <span style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>
            Товары ({totalItems()})
          </span>
          <span style={{ fontSize: '14px', color: 'var(--color-text)' }}>
            {formatPrice(totalPrice())}
          </span>
        </div>

        {savings > 0 && (
          <div className="flex justify-between">
            <span style={{ fontSize: '14px', color: '#22C55E' }}>Скидка</span>
            <span style={{ fontSize: '14px', fontWeight: 600, color: '#22C55E' }}>
              -{formatPrice(savings)}
            </span>
          </div>
        )}

        <div
          style={{
            height: '1px',
            background: 'var(--color-border)',
            margin: '4px 0',
          }}
        />

        <div className="flex justify-between">
          <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-text)' }}>
            Итого
          </span>
          <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-primary)' }}>
            {formatPrice(totalPrice())}
          </span>
        </div>
      </div>

      {/* Комментарий */}
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Комментарий к заказу (необязательно)"
        rows={2}
        style={{
          width: '100%',
          background: 'var(--color-surface-secondary)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-sm)',
          padding: '10px 12px',
          fontSize: '14px',
          color: 'var(--color-text)',
          outline: 'none',
          resize: 'none',
          fontFamily: 'inherit',
        }}
      />

      {/* Кнопка заказа */}
      <button
        onClick={handleOrder}
        disabled={isLoading}
        style={{
          width: '100%',
          height: '52px',
          borderRadius: 'var(--radius-md)',
          background: isLoading ? 'var(--color-text-muted)' : 'var(--color-primary)',
          color: '#fff',
          fontSize: '16px',
          fontWeight: 600,
          border: 'none',
          transition: 'opacity 0.2s ease',
          opacity: isLoading ? 0.7 : 1,
        }}
      >
        {isLoading ? 'Оформляем...' : 'Оформить заказ'}
      </button>
    </div>
  );
}