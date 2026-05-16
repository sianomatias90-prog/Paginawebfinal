import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useState, useMemo, useEffect } from 'react';
import { Product, Page } from '../types';
import ProductCard from '../components/ProductCard';
import { buildCategoryFilters, getCategoryLabel } from '../lib/categories';

interface CatalogProps {
  products: Product[];
  onViewProduct: (product: Product) => void;
  onNavigate: (page: Page) => void;
  initialCategory?: string;
}

export default function Catalog({ products, onViewProduct, initialCategory }: CatalogProps) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState(initialCategory ?? 'Todos');

  useEffect(() => {
    if (initialCategory) setActiveCategory(initialCategory);
  }, [initialCategory]);

  const categories = useMemo(() => buildCategoryFilters(products), [products]);

  const filtered = useMemo(() => {
    return products.filter(p => {
      const label = getCategoryLabel(p.category);
      const matchCat = activeCategory === 'Todos' || label === activeCategory;
      const matchSearch = search === '' ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [products, activeCategory, search]);

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <p className="text-teal-400 text-sm font-medium mb-2">Catálogo</p>
          <h1 className="font-['Space_Grotesk'] font-bold text-3xl sm:text-4xl text-white mb-2">
            Todos los productos
          </h1>
          <p className="text-[#5c5c6e]">
            {products.length} productos disponibles para personalizar
          </p>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5c5c6e]" />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-[#13131a] border border-[#1e1e2e] text-white placeholder-[#8a8a9a] rounded-xl pl-10 pr-10 py-3 focus:outline-none focus:border-teal-500/50 transition-colors text-sm shadow-sm"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#5c5c6e] hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-1 bg-[#13131a] border border-[#1e1e2e] rounded-xl px-2 overflow-x-auto scrollbar-hide">
            <SlidersHorizontal className="w-4 h-4 text-[#5c5c6e] flex-shrink-0 ml-1" />
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? 'bg-teal-500/15 text-teal-400'
                    : 'text-[#5c5c6e] hover:text-white hover:bg-[#1a1a24]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        {(search || activeCategory !== 'Todos') && (
          <p className="text-[#5c5c6e] text-sm mb-6">
            {filtered.length} resultado{filtered.length !== 1 ? 's' : ''}
            {search && ` para "${search}"`}
            {activeCategory !== 'Todos' && ` en ${activeCategory}`}

          </p>
        )}

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetail={onViewProduct}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#1a1a24] border border-[#1e1e2e] flex items-center justify-center">
              <Search className="w-7 h-7 text-[#3a3a50]" />
            </div>
            <div>
              <p className="text-white font-medium mb-1">Sin resultados</p>
              <p className="text-[#5c5c6e] text-sm">
                Probá con otro término o categoría
              </p>
            </div>
            <button
              onClick={() => { setSearch(''); setActiveCategory('Todos'); }}
              className="text-teal-400 hover:text-teal-300 text-sm font-medium transition-colors"
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
