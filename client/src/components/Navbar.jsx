import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, UserCircle, LogOut, Search } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [term, setTerm] = useState(new URLSearchParams(location.search).get('q') || '');

  const onSearch = (e) => {
    e.preventDefault();
    navigate(`/?q=${encodeURIComponent(term)}`);
  };

  const cartCount = cart?.items?.reduce((acc, item) => acc + (item.quantity || 1), 0) || 0;

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-4">
        <Link to="/" className="text-xl font-bold text-brand flex items-center gap-2">
          <span className="bg-brand text-white px-3 py-1 rounded-md">Ecom</span>
          <span className="text-slate-800">Prime</span>
        </Link>

        <form onSubmit={onSearch} className="flex-1 flex items-center">
          <div className="w-full flex items-center rounded-md overflow-hidden border border-slate-200 bg-slate-50 focus-within:ring-2 focus-within:ring-brand-gold">
            <input
              className="flex-1 bg-transparent px-3 py-2 outline-none"
              placeholder="Search for products"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
            />
            <button className="bg-brand text-white px-3 py-2 flex items-center gap-2">
              <Search size={18} />
              <span className="hidden sm:block">Search</span>
            </button>
          </div>
        </form>

        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-full">
              <UserCircle size={20} className="text-brand" />
              <div className="text-sm">
                <p className="font-semibold text-slate-800">{user.name}</p>
                <p className="text-slate-500 capitalize text-xs">{user.role}</p>
              </div>
              <button onClick={logout} className="text-slate-500 hover:text-brand">
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <Link to="/auth" className="text-sm text-brand font-semibold">Sign In</Link>
          )}

          <Link to="/cart" className="relative">
            <ShoppingCart size={28} className="text-brand" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-brand-gold text-xs font-semibold text-slate-900 rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

