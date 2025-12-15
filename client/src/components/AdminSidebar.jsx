import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, PackagePlus, Package } from 'lucide-react';

const links = [
  { to: '/admin/dashboard', label: 'Overview', icon: LayoutDashboard },
  { to: '/admin/products/new', label: 'Add Product', icon: PackagePlus },
  { to: '/admin/dashboard', label: 'Manage Products', icon: Package }
];

const AdminSidebar = () => {
  const { pathname } = useLocation();
  return (
    <aside className="w-64 bg-white border-r border-slate-200 h-full p-4">
      <div className="mb-6">
        <p className="text-xs uppercase text-slate-500">Admin</p>
        <h2 className="text-xl font-semibold text-slate-800">Dashboard</h2>
      </div>
      <nav className="space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          const active = pathname === link.to;
          return (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center gap-3 px-3 py-2 rounded-md ${active ? 'bg-brand text-white' : 'text-slate-700 hover:bg-slate-100'}`}
            >
              <Icon size={18} />
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default AdminSidebar;

