import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';

const CartPage = () => {
  const { cart, updateQuantity, removeItem } = useCart();
  const totals = useMemo(() => {
    const subtotal = (cart.items || []).reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);
    return { subtotal, total: subtotal };
  }, [cart]);

  if (!cart.items || cart.items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10 text-center">
        <p className="text-slate-500">Your cart is empty.</p>
        <Link to="/" className="text-brand font-semibold">Continue shopping</Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">
        {cart.items.map((item) => (
          <div key={item.product} className="bg-white rounded-lg p-4 shadow-sm flex gap-4">
            <img src={item.image} alt={item.name} className="h-24 w-24 object-cover rounded-md bg-slate-50" />
            <div className="flex-1">
              <h3 className="font-semibold text-slate-800">{item.name}</h3>
              <p className="text-brand font-bold text-lg">${(item.price || 0).toFixed(2)}</p>
              <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center border border-slate-200 rounded-md">
                  <button className="px-3 py-1" onClick={() => updateQuantity(item.product, Math.max(1, (item.quantity || 1) - 1))}>-</button>
                  <span className="px-3">{item.quantity || 1}</span>
                  <button className="px-3 py-1" onClick={() => updateQuantity(item.product, (item.quantity || 1) + 1)}>+</button>
                </div>
                <button className="text-rose-500 text-sm" onClick={() => removeItem(item.product)}>Remove</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg p-5 shadow-card h-fit">
        <h3 className="text-lg font-semibold text-slate-800 mb-3">Order Summary</h3>
        <div className="flex justify-between text-sm text-slate-600">
          <span>Subtotal</span>
          <span>${totals.subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-base font-semibold mt-3">
          <span>Total</span>
          <span>${totals.total.toFixed(2)}</span>
        </div>
        <button className="w-full mt-4 bg-brand text-white py-3 rounded-md font-semibold hover:bg-brand/90">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;

