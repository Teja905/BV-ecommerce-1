import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar.jsx';
import ProductForm from '../components/ProductForm.jsx';
import api from '../services/api';
import { useAuth } from '../context/AuthContext.jsx';

const AdminEditProduct = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get(`/products/${id}`).then(({ data }) => setProduct(data));
  }, [id]);

  const handleSubmit = async (form, images) => {
    setLoading(true);
    setError('');
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (images.length) {
        images.forEach((file) => fd.append('images', file));
      }
      await api.put(`/products/${id}`, fd, { headers: { Authorization: `Bearer ${token}` } });
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!product) return <p className="p-6 text-slate-500">Loading...</p>;

  return (
    <div className="flex min-h-[80vh]">
      <AdminSidebar />
      <main className="flex-1 bg-slate-50 p-6">
        <div className="bg-white rounded-lg shadow-card p-6">
          <h1 className="text-2xl font-semibold text-slate-800 mb-1">Edit Product</h1>
          <p className="text-slate-500 mb-4">Update details or replace images</p>
          {error && <p className="text-rose-500 mb-2 text-sm">{error}</p>}
          <ProductForm onSubmit={handleSubmit} submitting={loading} initial={product} />
        </div>
      </main>
    </div>
  );
};

export default AdminEditProduct;

