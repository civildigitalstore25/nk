import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { PackageSearch } from 'lucide-react';
import type { Product } from '../types';
import { PRODUCT_CATEGORIES } from '../data/products';
import { fetchPublicProducts, mediaUrl } from '../services/api';
import { Seo } from '../components/Seo';

export const ProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category') || 'all';
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchPublicProducts({ category: selectedCategory })
      .then(setProducts)
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [selectedCategory]);

  return (
    <div className="bg-[#F7FAFC] min-h-screen pb-16">
      <Seo
        title="Products | NK Constructions"
        description="Browse construction products and service packages from NK Constructions."
        path="/products"
      />

      <section className="bg-[#17243B] text-white pt-12 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#2196E1] font-extrabold text-[11px] uppercase tracking-[0.18em]">Catalogue</p>
          <h1 className="text-3xl sm:text-4xl font-extrabold mt-2">Products</h1>
          <p className="text-slate-300 mt-3 max-w-2xl">
            Explore published products and packages managed from the NK Constructions admin panel.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="bg-white rounded-2xl border border-[#D9E5F0] shadow-sm p-4 mb-8 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setSearchParams({})}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
              selectedCategory === 'all' ? 'bg-[#2196E1] text-white' : 'bg-slate-100 text-slate-600'
            }`}
          >
            All
          </button>
          {PRODUCT_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSearchParams({ category: cat.slug })}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                selectedCategory === cat.slug ? 'bg-[#2196E1] text-white' : 'bg-slate-100 text-slate-600'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-center text-slate-500 py-16 font-semibold">Loading products...</p>
        ) : products.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center">
            <PackageSearch className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h2 className="text-xl font-extrabold text-[#17243B]">No products published yet</h2>
            <p className="text-slate-500 mt-2 text-sm">Published items from admin will appear here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Link
                key={product._id || product.id}
                to={`/product/${encodeURIComponent(product.slug || product.id)}`}
                className="bg-white rounded-2xl border border-[#D9E5F0] overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="aspect-[4/3] bg-slate-100">
                  {product.image ? (
                    <img
                      src={mediaUrl(product.image)}
                      alt={product.imageAlt || product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : null}
                </div>
                <div className="p-5">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#2196E1]">
                    {product.category}
                  </span>
                  <h2 className="text-lg font-extrabold text-[#17243B] mt-1">{product.name}</h2>
                  <p className="text-sm text-slate-500 mt-2 line-clamp-2">{product.shortDescription}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
