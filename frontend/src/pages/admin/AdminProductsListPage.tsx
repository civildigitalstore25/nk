import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Search, Edit, Trash2, CheckCircle2, XCircle, X, Package, RefreshCw } from 'lucide-react';
import type { Product } from '../../types';
import { fetchAdminProducts, deleteAdminProduct, mediaUrl } from '../../services/api';
import { PRODUCT_CATEGORIES } from '../../data/products';

export const AdminProductsListPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState('');

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await fetchAdminProducts({ search, category: selectedCategory });
      setProducts(data);
    } catch (err) {
      console.warn('Failed to load products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadProducts();
  }, [search, selectedCategory]);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await deleteAdminProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id && p._id !== id));
      setNotification('Product deleted.');
      setTimeout(() => setNotification(''), 3000);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Failed to delete product.');
    }
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#17243B]">Products</h1>
          <p className="text-slate-500 text-sm mt-0.5">Create, edit, publish, and delete catalogue items.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => void loadProducts()}
            className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-700 shadow-sm"
            type="button"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <Link
            to="/admin/products/new"
            className="inline-flex items-center gap-2 bg-[#2196E1] hover:bg-[#1881c2] text-white font-bold text-sm py-2.5 px-5 rounded-xl shadow"
          >
            <PlusCircle className="w-4 h-4" />
            Add Product
          </Link>
        </div>
      </div>

      {notification && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          {notification}
        </div>
      )}

      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-7 relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2196E1]"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" type="button">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <div className="md:col-span-5">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full py-2.5 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#2196E1]"
          >
            <option value="all">All Categories</option>
            {PRODUCT_CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.slug}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase font-extrabold border-b border-slate-200">
                <th className="py-3.5 px-6">Product</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-slate-400">
                    Loading products...
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-slate-400">
                    <Package className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    No products yet. Add your first product.
                  </td>
                </tr>
              ) : (
                products.map((product) => {
                  const key = product._id || product.id;
                  return (
                    <tr key={key} className="hover:bg-slate-50/80">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden shrink-0">
                            {product.image ? (
                              <img src={mediaUrl(product.image)} alt="" className="w-full h-full object-cover" />
                            ) : null}
                          </div>
                          <div>
                            <div className="font-bold text-[#17243B]">{product.name}</div>
                            <div className="text-xs text-slate-400 line-clamp-1">{product.shortDescription}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-slate-600 font-medium">{product.category}</td>
                      <td className="py-4 px-4">
                        {product.isActive !== false ? (
                          <span className="inline-flex items-center gap-1 text-emerald-700 text-xs font-bold">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Published
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-slate-500 text-xs font-bold">
                            <XCircle className="w-3.5 h-3.5" /> Draft
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="inline-flex items-center gap-2">
                          <Link
                            to={`/admin/products/edit/${encodeURIComponent(product.id || String(product._id))}`}
                            className="p-2 rounded-lg border border-slate-200 hover:bg-white text-[#2196E1]"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>
                          <button
                            type="button"
                            onClick={() => void handleDelete(product.id || String(product._id))}
                            className="p-2 rounded-lg border border-slate-200 hover:bg-white text-red-500"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
