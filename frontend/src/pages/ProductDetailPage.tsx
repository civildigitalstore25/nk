import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import type { Product } from '../types';
import { fetchPublicProductByIdOrSlug, mediaUrl } from '../services/api';
import { Seo } from '../components/Seo';
import { RichText } from '../components/RichText';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetchPublicProductByIdOrSlug(id)
      .then(setProduct)
      .catch((err: unknown) => setError(err instanceof Error ? err.message : 'Product not found.'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <p className="text-center text-slate-500 py-24 font-semibold">Loading product...</p>;
  }

  if (error || !product) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-extrabold text-[#17243B]">Product not found</h1>
        <p className="text-slate-500 mt-2">{error || 'This product is unavailable.'}</p>
        <Link to="/products" className="inline-flex items-center gap-1.5 mt-6 text-[#2196E1] font-bold text-sm">
          <ArrowLeft className="w-4 h-4" /> Back to products
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#F7FAFC] min-h-screen pb-16">
      <Seo
        title={`${product.name} | NK Constructions`}
        description={product.shortDescription}
        path={`/product/${product.slug || product.id}`}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <Link to="/products" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#2196E1]">
          <ArrowLeft className="w-3.5 h-3.5" /> All products
        </Link>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-2xl border border-[#D9E5F0] overflow-hidden shadow-sm">
          <div className="aspect-[4/3] bg-slate-100">
            {product.image ? (
              <img
                src={mediaUrl(product.image)}
                alt={product.imageAlt || product.name}
                className="w-full h-full object-cover"
              />
            ) : null}
          </div>
          <div className="p-6 sm:p-8">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#2196E1]">
              {product.category}
            </span>
            <h1 className="text-3xl font-extrabold text-[#17243B] mt-2">{product.name}</h1>
            {product.brand && <p className="text-sm text-slate-500 mt-1">{product.brand}</p>}
            <p className="text-slate-600 mt-4 leading-relaxed">{product.shortDescription}</p>
            <Link
              to="/contact"
              className="inline-flex mt-6 px-5 py-2.5 rounded-xl bg-[#2196E1] text-white text-sm font-bold hover:bg-[#1881c2]"
            >
              Enquire about this product
            </Link>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-2xl border border-[#D9E5F0] p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-extrabold text-[#17243B] mb-4">Details</h2>
          <RichText html={product.description || product.fullDescription || ''} />
        </div>
      </div>
    </div>
  );
};
