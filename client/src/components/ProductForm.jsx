import { useEffect, useState } from 'react';

const ProductForm = ({ initial = {}, onSubmit, submitting }) => {
  const [form, setForm] = useState({
    name: '',
    price: '',
    discount: '',
    description: '',
    category: '',
    stock: '',
    isActive: true
  });
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    setForm((f) => ({ ...f, ...initial }));
    if (initial.images) setPreviews(initial.images);
  }, [initial]);

  const handleFile = (e) => {
    const files = Array.from(e.target.files).slice(0, 7);
    setImages(files);
    setPreviews(files.map((file) => URL.createObjectURL(file)));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form, images);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
        <Input label="Category" value={form.category} onChange={(v) => setForm({ ...form, category: v })} required />
        <Input label="Price" type="number" value={form.price} onChange={(v) => setForm({ ...form, price: v })} required />
        <Input label="Discount (%)" type="number" value={form.discount} onChange={(v) => setForm({ ...form, discount: v })} />
        <Input label="Stock" type="number" value={form.stock} onChange={(v) => setForm({ ...form, stock: v })} />
        <div className="flex items-center gap-2">
          <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} />
          <span className="text-sm text-slate-700">Active</span>
        </div>
      </div>
      <div>
        <label className="text-sm text-slate-600 block mb-1">Description</label>
        <textarea
          className="w-full border border-slate-200 rounded-md px-3 py-2"
          rows={4}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />
      </div>
      <div>
        <label className="text-sm text-slate-600 block mb-1">Images (6-7 recommended)</label>
        <input type="file" accept="image/*" multiple onChange={handleFile} className="text-sm" />
        <div className="mt-3 grid grid-cols-3 md:grid-cols-6 gap-3">
          {previews.map((src) => (
            <img key={src} src={src} alt="preview" className="h-20 w-full object-cover rounded-md border" />
          ))}
        </div>
      </div>
      <button
        type="submit"
        className="bg-brand text-white px-4 py-3 rounded-md font-semibold hover:bg-brand/90 disabled:opacity-60"
        disabled={submitting}
      >
        {submitting ? 'Saving...' : 'Save Product'}
      </button>
    </form>
  );
};

const Input = ({ label, value, onChange, type = 'text', required }) => (
  <div>
    <label className="text-sm text-slate-600 block mb-1">{label}</label>
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      type={type}
      required={required}
      className="w-full border border-slate-200 rounded-md px-3 py-2"
    />
  </div>
);

export default ProductForm;

