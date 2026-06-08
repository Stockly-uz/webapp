import { useEffect, useState } from 'react';
import { carouselApi } from '../../../api/index';
import type { CarouselItem } from '../../../types';

export default function Carousel() {
  const [items, setItems] = useState<CarouselItem[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    carouselApi.getList().then(setItems);
  }, []);

  useEffect(() => {
    if (items.length <= 1) return;
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % items.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [items.length]);

  if (!items.length) return null;

  return (
    <div className="px-4">
      <div
        style={{
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          position: 'relative',
          height: '160px',
        }}
      >
        {items.map((item, i) => (
          <div
            key={item.id}
            style={{
              position: 'absolute',
              inset: 0,
              opacity: i === active ? 1 : 0,
              transition: 'opacity 0.5s ease',
            }}
          >
            <img
              src={item.image}
              alt={item.title ?? ''}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            {(item.title || item.subtitle) && (
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '24px 16px 16px',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)',
                }}
              >
                {item.title && (
                  <p style={{ color: '#fff', fontWeight: 700, fontSize: '16px' }}>{item.title}</p>
                )}
                {item.subtitle && (
                  <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '13px' }}>{item.subtitle}</p>
                )}
              </div>
            )}
          </div>
        ))}

        {/* Dots */}
        {items.length > 1 && (
          <div className="absolute bottom-3 right-3 flex gap-1">
            {items.map((_, i) => (
              <div
                key={i}
                onClick={() => setActive(i)}
                style={{
                  width: i === active ? '16px' : '6px',
                  height: '6px',
                  borderRadius: '100px',
                  background: i === active ? '#fff' : 'rgba(255,255,255,0.5)',
                  transition: 'all 0.3s ease',
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}