import { useMemo, useState } from 'react';
import Input from '../../../components/ui/Input';
import ProductCard from './ProductCard';
import { SearchIcon } from '../../../components/ui/icons';
import { CATEGORIES } from '../data/products';

export default function ProductCatalog({ products, quantities, onChangeQuantity }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Semua');

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = category === 'Semua' || product.category === category;
      const matchesSearch = product.name.toLowerCase().includes(search.trim().toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, search, category]);

  return (
    <section aria-labelledby="catalog-heading" className="flex flex-col gap-5">
      <div className="flex items-baseline justify-between">
        <h2 id="catalog-heading" className="font-display text-xl text-ink">
          Katalog produk
        </h2>
        <span className="text-sm text-slate-light">{filteredProducts.length} produk</span>
      </div>

      <Input
        id="search-product"
        label="Cari produk"
        hideLabel
        icon={SearchIcon}
        placeholder="Cari nama produk..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div
        className="flex gap-1 overflow-x-auto border-b border-border pb-px"
        role="group"
        aria-label="Filter kategori"
      >
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setCategory(cat)}
            aria-pressed={category === cat}
            className={`shrink-0 whitespace-nowrap border-b-2 px-3 py-2.5 text-sm font-medium transition-colors ${
              category === cat
                ? 'border-accent text-ink'
                : 'border-transparent text-slate-light hover:text-ink'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filteredProducts.length === 0 ? (
        <p
          className="rounded-2xl border border-dashed border-border bg-surface py-10 text-center text-sm text-slate"
          style={{ animation: 'fade-in 0.3s ease both' }}
        >
          Produk tidak ditemukan.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              style={{ animation: `fade-in-up 0.4s ease ${Math.min(index * 0.05, 0.3)}s both` }}
            >
              <ProductCard
                product={product}
                quantity={quantities[product.id] ?? 0}
                onChangeQuantity={onChangeQuantity}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
