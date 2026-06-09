import { useEffect } from 'react';
import { useCatalogStore } from '../../store/catalogStore';
import SearchBar from './components/SearchBar';
import FilterTabs from './components/FilterTabs';
import ProductGrid from './components/ProductGrid';
import Carousel from './components/Carousel';

export default function CatalogPage() {
  const fetchProducts = useCatalogStore((s) => s.fetchProducts);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col gap-4 pb-4">
      <Header />
      <Carousel />
      <FilterTabs />
      <ProductGrid />
    </div>
  );
}

function Header() {
  return (
    <div
      className="sticky top-0 z-40 px-4"
      style={{
        paddingTop: 'var(--header-top-padding)',
        paddingBottom: '12px',
        background: 'var(--color-header)',
      }}
    >
      <div className="flex items-center gap-3">
        <h1
          style={{
            fontSize: '20px',
            fontWeight: 700,
            letterSpacing: '-0.4px',
            color: '#fff',
            flexShrink: 0,
          }}
        >
          Каталог
        </h1>

        <div
          className="flex items-center gap-2 flex-1 px-3"
          style={{
            background: 'rgba(255,255,255,0.95)',
            borderRadius: 'var(--radius-md)',
            height: '38px',
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
            <circle cx="11" cy="11" r="7" stroke="var(--color-text-muted)" strokeWidth="2" />
            <path d="M16.5 16.5L21 21" stroke="var(--color-text-muted)" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <SearchBar />
        </div>
      </div>
    </div>
  );
}