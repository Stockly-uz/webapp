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
      <SearchBar />
      <FilterTabs />
      <ProductGrid />
    </div>
  );
}

function Header() {
  return (
    <div
      className="glass sticky top-0 z-40 px-4 pb-3"
      style={{
        paddingTop: 'var(--header-top-padding)',
        borderBottom: '1px solid var(--glass-border)',
      }}
    >
      <h1
        style={{
          fontSize: '22px',
          fontWeight: 700,
          color: 'var(--color-text)',
          letterSpacing: '-0.4px',
        }}
      >
        Каталог
      </h1>
    </div>
  );
}