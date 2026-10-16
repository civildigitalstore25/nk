import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Newspaper, PlusCircle, ShieldCheck, RefreshCw } from 'lucide-react';
import { fetchAdminProducts } from '../../services/api';
import { fetchAdminBlogs } from '../../services/blogApi';

export const AdminDashboardPage: React.FC = () => {
  const [productCount, setProductCount] = useState(0);
  const [publishedProducts, setPublishedProducts] = useState(0);
  const [blogCount, setBlogCount] = useState(0);
  const [publishedBlogs, setPublishedBlogs] = useState(0);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const [products, blogs] = await Promise.all([fetchAdminProducts(), fetchAdminBlogs()]);
      setProductCount(products.length);
      setPublishedProducts(products.filter((p) => p.isActive !== false).length);
      setBlogCount(blogs.length);
      setPublishedBlogs(blogs.filter((b) => b.status === 'published').length);
    } catch (err) {
      console.warn('Dashboard load failed:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  return (
    <div className="space-y-8 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[#2196E1] font-extrabold text-xs uppercase tracking-widest flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" />
            NK Constructions Admin
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17243B] mt-1">Dashboard</h1>
        </div>
        <button
          type="button"
          onClick={() => void load()}
          className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-700 shadow-sm"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">Products</span>
          <h2 className="text-3xl font-extrabold text-[#17243B] mt-1">{productCount}</h2>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">Published Products</span>
          <h2 className="text-3xl font-extrabold text-emerald-600 mt-1">{publishedProducts}</h2>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">Blog Posts</span>
          <h2 className="text-3xl font-extrabold text-[#17243B] mt-1">{blogCount}</h2>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">Published Blogs</span>
          <h2 className="text-3xl font-extrabold text-emerald-600 mt-1">{publishedBlogs}</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          to="/admin/products/new"
          className="flex items-center gap-3 bg-white border border-slate-200 rounded-2xl p-5 hover:border-[#2196E1] shadow-sm"
        >
          <div className="w-11 h-11 rounded-xl bg-[#E8F4FC] text-[#2196E1] flex items-center justify-center">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-[#17243B] flex items-center gap-1.5">
              <PlusCircle className="w-4 h-4" /> Add Product
            </div>
            <p className="text-xs text-slate-500">Create a new catalogue item</p>
          </div>
        </Link>
        <Link
          to="/admin/blogs/new"
          className="flex items-center gap-3 bg-white border border-slate-200 rounded-2xl p-5 hover:border-[#2196E1] shadow-sm"
        >
          <div className="w-11 h-11 rounded-xl bg-[#E8F4FC] text-[#2196E1] flex items-center justify-center">
            <Newspaper className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-[#17243B] flex items-center gap-1.5">
              <PlusCircle className="w-4 h-4" /> Write Blog Post
            </div>
            <p className="text-xs text-slate-500">Draft or publish an article</p>
          </div>
        </Link>
      </div>
    </div>
  );
};
