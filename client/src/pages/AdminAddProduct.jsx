import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar.jsx';
import ProductForm from '../components/ProductForm.jsx';
import api from '../services/api';
import { useAuth } from '../context/AuthContext.jsx';

const AdminAddProduct = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (form, images) => {
    setLoading(true);
    setError('');
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      images.forEach((file) => fd.append('images', file));
      await api.post('/products', fd, { headers: { Authorization: `Bearer ${token}` } });
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[80vh]">
      <AdminSidebar />
      <main className="flex-1 bg-slate-50 p-6">
        <div className="bg-white rounded-lg shadow-card p-6">
          <h1 className="text-2xl font-semibold text-slate-800 mb-1">Add Product</h1>
          <p className="text-slate-500 mb-4">Upload 6-7 images and fill product details</p>
          {error && <p className="text-rose-500 mb-2 text-sm">{error}</p>}
          <ProductForm onSubmit={handleSubmit} submitting={loading} />
        </div>
      </main>
    </div>
  );
};

export default AdminAddProduct;

