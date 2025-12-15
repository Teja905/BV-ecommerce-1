import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const AuthPage = () => {
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (mode === 'login') {
        await login(form.email, form.password);
      } else {
        await register(form.name, form.email, form.password);
      }
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-card w-full max-w-md p-6 space-y-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMode('login')}
            className={`flex-1 py-2 rounded-md font-semibold ${mode === 'login' ? 'bg-brand text-white' : 'bg-slate-100 text-slate-700'}`}
          >
            Login
          </button>
          <button
            onClick={() => setMode('register')}
            className={`flex-1 py-2 rounded-md font-semibold ${mode === 'register' ? 'bg-brand text-white' : 'bg-slate-100 text-slate-700'}`}
          >
            Register
          </button>
        </div>
        {error && <p className="text-rose-500 text-sm">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-3">
          {mode === 'register' && (
            <div>
              <label className="text-sm text-slate-600">Name</label>
              <input
                className="w-full border border-slate-200 rounded-md px-3 py-2 mt-1"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
          )}
          <div>
            <label className="text-sm text-slate-600">Email</label>
            <input
              className="w-full border border-slate-200 rounded-md px-3 py-2 mt-1"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              type="email"
              required
            />
          </div>
          <div>
            <label className="text-sm text-slate-600">Password</label>
            <input
              className="w-full border border-slate-200 rounded-md px-3 py-2 mt-1"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              type="password"
              required
            />
          </div>
          <button className="w-full bg-brand text-white py-3 rounded-md font-semibold hover:bg-brand/90">
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>
        <p className="text-xs text-slate-500 text-center">Admin? <a href="/admin/login" className="text-brand font-semibold">Go to admin login</a></p>
      </div>
    </div>
  );
};

export default AuthPage;

