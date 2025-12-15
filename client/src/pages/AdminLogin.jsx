import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const AdminLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@shop.com');
  const [password, setPassword] = useState('Admin@123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await login(email, password);
      if (res.user.role !== 'admin') {
        setError('Admin account required');
        return;
      }
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-xl shadow-card w-full max-w-md">
        <h1 className="text-2xl font-semibold text-slate-800 mb-1">Admin Sign In</h1>
        <p className="text-slate-500 mb-4">Use the seeded admin credentials</p>
        {error && <p className="text-rose-500 text-sm mb-3">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-slate-600">Email</label>
            <input
              className="w-full border border-slate-200 rounded-md px-3 py-2 mt-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
            />
          </div>
          <div>
            <label className="text-sm text-slate-600">Password</label>
            <input
              className="w-full border border-slate-200 rounded-md px-3 py-2 mt-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand text-white py-3 rounded-md font-semibold hover:bg-brand/90 disabled:opacity-60"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;

