import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, AlertCircle, CheckCircle2 } from 'lucide-react';
import {
  createAdminProduct,
  fetchAdminProductById,
  mediaUrl,
  updateAdminProduct,
  uploadProductImage,
} from '../../services/api';
import { CATEGORY_OPTIONS } from '../../data/products';
import { RichTextEditor } from '../../components/RichTextEditor';
import { plainTextFromHtml } from '../../components/RichText';

export const AdminProductFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    category: CATEGORY_OPTIONS[0] || 'General',
    brand: '',
    shortDescription: '',
    description: '',
    image: '',
    imageAlt: '',
    isActive: true,
    isPopular: false,
  });
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEditMode);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!id) return;
    async function loadProduct() {
      try {
        const prod = await fetchAdminProductById(id!);
        setFormData({
          name: prod.name || '',
          category: prod.category || CATEGORY_OPTIONS[0] || 'General',
          brand: prod.brand || '',
          shortDescription: prod.shortDescription || '',
          description: prod.description || prod.fullDescription || '',
          image: prod.image || '',
          imageAlt: prod.imageAlt || '',
          isActive: prod.isActive !== false,
          isPopular: Boolean(prod.isPopular),
        });
        setImagePreview(mediaUrl(prod.image));
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Could not load product.');
      } finally {
        setFetching(false);
      }
    }
    void loadProduct();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const url = await uploadProductImage(file);
      setFormData((prev) => ({ ...prev, image: url }));
      setImagePreview(mediaUrl(url));
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Image upload failed.');
    }
  };

  const handleSubmit = async (e: React.FormEvent, publish?: boolean) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    const shortDescription =
      formData.shortDescription.trim() ||
      plainTextFromHtml(formData.description).slice(0, 120);

    const payload = {
      ...formData,
      shortDescription,
      isActive: typeof publish === 'boolean' ? publish : formData.isActive,
    };

    try {
      if (isEditMode && id) {
        await updateAdminProduct(id, payload);
        setSuccess('Product updated.');
      } else {
        const created = await createAdminProduct(payload);
        setSuccess('Product created.');
        navigate(`/admin/products/edit/${encodeURIComponent(created.id || String(created._id))}`, {
          replace: true,
        });
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Save failed.');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <p className="text-slate-500 font-semibold py-16 text-center">Loading product...</p>;
  }

  return (
    <div className="space-y-6 max-w-4xl font-sans">
      <div className="flex items-center justify-between gap-4">
        <div>
          <Link to="/admin/products" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#2196E1]">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to products
          </Link>
          <h1 className="text-2xl font-extrabold text-[#17243B] mt-1">
            {isEditMode ? 'Edit Product' : 'New Product'}
          </h1>
        </div>
      </div>

      {error && (
        <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}
      {success && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          {success}
        </div>
      )}

      <form onSubmit={(e) => void handleSubmit(e)} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">Name *</label>
          <input
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2196E1]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2196E1]"
            >
              {CATEGORY_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">Brand / Label</label>
            <input
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              placeholder="Optional"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2196E1]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">Short description</label>
          <textarea
            name="shortDescription"
            rows={2}
            value={formData.shortDescription}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2196E1]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">Full description</label>
          <RichTextEditor
            value={formData.description}
            onChange={(html) => setFormData((prev) => ({ ...prev, description: html }))}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">Image</label>
            <input type="file" accept="image/*" onChange={(e) => void handleImageUpload(e)} className="text-sm" />
            {imagePreview && (
              <img src={imagePreview} alt="" className="mt-3 w-40 h-28 object-cover rounded-xl border border-slate-200" />
            )}
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">Image alt text</label>
            <input
              name="imageAlt"
              value={formData.imageAlt}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2196E1]"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <label className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700">
            <input type="checkbox" name="isPopular" checked={formData.isPopular} onChange={handleChange} />
            Mark as popular
          </label>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            type="button"
            disabled={loading}
            onClick={(e) => void handleSubmit(e, true)}
            className="inline-flex items-center gap-2 bg-[#2196E1] hover:bg-[#1881c2] text-white font-bold text-sm py-2.5 px-5 rounded-xl disabled:opacity-60"
          >
            <Save className="w-4 h-4" />
            {loading ? 'Saving...' : 'Publish'}
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={(e) => void handleSubmit(e, false)}
            className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white font-bold text-sm py-2.5 px-5 rounded-xl disabled:opacity-60"
          >
            Save as draft
          </button>
        </div>
      </form>
    </div>
  );
};
