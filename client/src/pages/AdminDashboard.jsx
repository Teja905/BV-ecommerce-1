import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import AdminSidebar from '../components/AdminSidebar.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const AdminDashboard = () => {
  const { token } = useAuth();
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const { data } = await api.get('/products/admin/all', { headers: { Authorization: `Bearer ${token}` } });
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const stats = useMemo(() => {
    const totalStock = products.reduce((s, p) => s + (p.stock || 0), 0);
    const active = products.filter((p) => p.isActive).length;
    return { total: products.length, totalStock, active };
  }, [products]);

  const toggleProduct = async (id) => {
    await api.patch(`/products/${id}/toggle`, {}, { headers: { Authorization: `Bearer ${token}` } });
    fetchProducts();
  };

  const deleteProduct = async (id) => {
    await api.delete(`/products/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    fetchProducts();
  };

  return (
    <div className="flex min-h-[80vh]">
      <AdminSidebar />
      <main className="flex-1 bg-slate-50 p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">Overview</h1>
          <p className="text-slate-500">Quick glance at catalog performance</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <p className="text-slate-500 text-sm">Products</p>
            <p className="text-3xl font-semibold text-slate-800">{stats.total}</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <p className="text-slate-500 text-sm">Active</p>
            <p className="text-3xl font-semibold text-emerald-600">{stats.active}</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <p className="text-slate-500 text-sm">Total Stock</p>
            <p className="text-3xl font-semibold text-brand">{stats.totalStock}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-card overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-800">Product Management</h2>
            <Link to="/admin/products/new" className="bg-brand text-white px-4 py-2 rounded-md">Add Product</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="text-left px-4 py-2">Product</th>
                  <th className="text-left px-4 py-2">Price</th>
                  <th className="text-left px-4 py-2">Stock</th>
                  <th className="text-left px-4 py-2">Status</th>
                  <th className="text-right px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p._id} className="border-t border-slate-100">
                    <td className="px-4 py-2 flex items-center gap-3">
                      <img src={p.images?.[0]} className="h-12 w-12 object-cover rounded-md bg-slate-100" />
                      <div>
                        <p className="font-semibold text-slate-800">{p.name}</p>
                        <p className="text-xs text-slate-500">{p.category}</p>
                      </div>
                    </td>
                    <td className="px-4 py-2">${p.price.toFixed(2)}</td>
                    <td className="px-4 py-2">{p.stock}</td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${p.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-600'}`}>
                        {p.isActive ? 'Active' : 'Hidden'}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-right space-x-2">
                      <button onClick={() => toggleProduct(p._id)} className="text-sm text-brand">Toggle</button>
                      <Link to={`/admin/products/${p._id}/edit`} className="text-sm text-amber-600">Edit</Link>
                      <button onClick={() => deleteProduct(p._id)} className="text-sm text-rose-500">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;

