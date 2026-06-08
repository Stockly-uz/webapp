import { useCartStore } from '../../store/cartStore';
import CartItem from './components/CartItem';
import CartSummary from './components/CartSummary';
import EmptyCart from './components/EmptyCart';

export default function CartPage() {
  const items = useCartStore((s) => s.items);

  return (
    <div className="flex flex-col" style={{ minHeight: '100dvh' }}>
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
          Корзина
        </h1>
        {items.length > 0 && (
          <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginTop: '2px' }}>
            {items.length} {plural(items.length, 'товар', 'товара', 'товаров')}
          </p>
        )}
      </div>

      {items.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="flex flex-col gap-3 p-4">
          {items.map((item) => (
            <CartItem key={item.product.id} item={item} />
          ))}
          <CartSummary />
        </div>
      )}
    </div>
  );
}

function plural(n: number, one: string, few: string, many: string) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return few;
  return many;
}