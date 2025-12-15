import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import ProductPage from './pages/ProductPage.jsx';
import CartPage from './pages/CartPage.jsx';
import AdminLogin from './pages/AdminLogin.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import AdminAddProduct from './pages/AdminAddProduct.jsx';
import AdminEditProduct from './pages/AdminEditProduct.jsx';
import { useAuth } from './context/AuthContext.jsx';
import AuthPage from './pages/AuthPage.jsx';

const AdminRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/admin/login" />;
  if (user.role !== 'admin') return <Navigate to="/" />;
  return children;
};

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/products/new"
          element={
            <AdminRoute>
              <AdminAddProduct />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/products/:id/edit"
          element={
            <AdminRoute>
              <AdminEditProduct />
            </AdminRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
