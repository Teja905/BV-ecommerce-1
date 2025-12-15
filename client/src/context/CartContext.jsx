import { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';
import { useAuth } from './AuthContext.jsx';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { token } = useAuth();
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart')) || { items: [] });
  const authHeader = token ? { Authorization: `Bearer ${token}` } : {};

  useEffect(() => {
    if (token) {
      api.get('/cart', { headers: authHeader })
        .then(({ data }) => {
          setCart(data);
          localStorage.setItem('cart', JSON.stringify(data));
        })
        .catch(() => {});
    }
  }, [token]);

  const syncLocal = (data) => {
    setCart(data);
    localStorage.setItem('cart', JSON.stringify(data));
  };

  const addItem = async (product, quantity = 1) => {
    const productId = product._id || product.product || product.id || product;
    if (token) {
      const { data } = await api.post('/cart', { productId, quantity }, { headers: authHeader });
      syncLocal(data);
    } else {
      const items = [...(cart.items || [])];
      const found = items.find((i) => i.product === productId);
      if (found) found.quantity += quantity;
      else items.push({
        product: productId,
        quantity,
        name: product.name,
        price: product.price,
        image: product.images?.[0]
      });
      syncLocal({ items });
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (token) {
      const { data } = await api.put('/cart', { productId, quantity }, { headers: authHeader });
      syncLocal(data);
    } else {
      const items = (cart.items || []).map((i) => (i.product === productId ? { ...i, quantity } : i));
      syncLocal({ items });
    }
  };

  const removeItem = async (productId) => {
    if (token) {
      const { data } = await api.delete('/cart', { headers: authHeader, data: { productId } });
      syncLocal(data);
    } else {
      const items = (cart.items || []).filter((i) => i.product !== productId);
      syncLocal({ items });
    }
  };

  return (
    <CartContext.Provider value={{ cart, addItem, updateQuantity, removeItem, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

