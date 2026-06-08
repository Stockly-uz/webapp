import { create } from 'zustand';
import type { Product, ProductFilter, ProductQueryParams } from '../types';
import { productsApi } from '../api';

interface CatalogState {
  products: Product[];
  isLoading: boolean;
  search: string;
  activeFilter: ProductFilter;
  activeBrandId: number | null;

  // Actions
  fetchProducts: () => Promise<void>;
  setSearch: (query: string) => void;
  setFilter: (filter: ProductFilter) => void;
  setBrand: (brandId: number | null) => void;
}

export const useCatalogStore = create<CatalogState>((set, get) => ({
  products: [],
  isLoading: false,
  search: '',
  activeFilter: 'all',
  activeBrandId: null,

  fetchProducts: async () => {
    set({ isLoading: true });

    const { search, activeFilter, activeBrandId } = get();

    const params: ProductQueryParams = {};
    if (search) params.search = search;
    if (activeFilter === 'new') params.is_new = true;
    if (activeFilter === 'hit') params.is_hit = true;
    if (activeFilter === 'sale') params.has_discount = true;
    if (activeFilter === 'brand' && activeBrandId) params.brand = activeBrandId;

    try {
      const products = await productsApi.getList(params);
      set({ products });
    } finally {
      set({ isLoading: false });
    }
  },

  setSearch: (search) => {
    set({ search });
    get().fetchProducts();
  },

  setFilter: (activeFilter) => {
    set({ activeFilter, activeBrandId: null });
    get().fetchProducts();
  },

  setBrand: (activeBrandId) => {
    set({ activeBrandId, activeFilter: 'brand' });
    get().fetchProducts();
  },
}));