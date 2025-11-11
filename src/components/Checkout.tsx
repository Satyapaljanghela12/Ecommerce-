import { useState } from 'react';
import { X, CreditCard, Wallet, Truck } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';
import type { CartItem, Product } from '../lib/supabase';

type CheckoutProps = {
  isOpen: boolean;
  onClose: () => void;
  cartItems: (CartItem & { products: Product })[];
  onCheckoutComplete: () => void;
};

type PaymentMethod = 'card' | 'cod' | 'wallet';

export default function Checkout({
  isOpen,
  onClose,
  cartItems,
  onCheckoutComplete,
}: CheckoutProps) {
  const { user } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
  });

  if (!isOpen) return null;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.products?.price || 0) * item.quantity,
    0
  );
  const tax = subtotal * 0.1;
  const shipping = subtotal > 50 ? 0 : 9.99;
  const total = subtotal + tax + shipping;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!user) {
      setError('Please sign in to complete your purchase');
      setLoading(false);
      return;
    }

    if (!shippingInfo.fullName || !shippingInfo.phone || !shippingInfo.address || !shippingInfo.city || !shippingInfo.state || !shippingInfo.zipCode) {
      setError('Please fill in all shipping details');
      setLoading(false);
      return;
    }

    try {
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          total_amount: total,
          status: 'pending',
          payment_status: 'pending',
          shipping_address: shippingInfo,
        })
        .select()
        .single();

      if (orderError) throw orderError;

      const orderItems = cartItems.map((item) => ({
        order_id: order.id,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.products.price,
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      const { error: paymentError } = await supabase
        .from('payments')
        .insert({
          order_id: order.id,
          payment_method: paymentMethod,
          amount: total,
          status: paymentMethod === 'cod' ? 'pending' : 'succeeded',
          metadata: {
            shipping_info: shippingInfo,
          },
        });

      if (paymentError) throw paymentError;

      const { error: updateOrderError } = await supabase
        .from('orders')
        .update({
          status: 'processing',
          payment_status: paymentMethod === 'cod' ? 'pending' : 'paid',
        })
        .eq('id', order.id);

      if (updateOrderError) throw updateOrderError;

      alert('Order placed successfully! Order ID: ' + order.id.substring(0, 8));
      onCheckoutComplete();
      onClose();
    } catch (err) {
      console.error('Checkout error:', err);
      setError('Failed to process order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-4xl shadow-2xl">
            <div className="sticky top-0 bg-white border-b border-gray-200 flex items-center justify-between p-6 rounded-t-xl">
              <h2 className="text-2xl font-bold text-gray-900">Checkout</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Truck size={20} className="text-green-600" />
                        Shipping Information
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            value={shippingInfo.fullName}
                            onChange={(e) =>
                              setShippingInfo({ ...shippingInfo, fullName: e.target.value })
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email *
                          </label>
                          <input
                            type="email"
                            value={shippingInfo.email}
                            onChange={(e) =>
                              setShippingInfo({ ...shippingInfo, email: e.target.value })
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            value={shippingInfo.phone}
                            onChange={(e) =>
                              setShippingInfo({ ...shippingInfo, phone: e.target.value })
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Street Address *
                          </label>
                          <input
                            type="text"
                            value={shippingInfo.address}
                            onChange={(e) =>
                              setShippingInfo({ ...shippingInfo, address: e.target.value })
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                            required
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              City *
                            </label>
                            <input
                              type="text"
                              value={shippingInfo.city}
                              onChange={(e) =>
                                setShippingInfo({ ...shippingInfo, city: e.target.value })
                              }
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              State *
                            </label>
                            <input
                              type="text"
                              value={shippingInfo.state}
                              onChange={(e) =>
                                setShippingInfo({ ...shippingInfo, state: e.target.value })
                              }
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                              required
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              ZIP Code *
                            </label>
                            <input
                              type="text"
                              value={shippingInfo.zipCode}
                              onChange={(e) =>
                                setShippingInfo({ ...shippingInfo, zipCode: e.target.value })
                              }
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Country
                            </label>
                            <input
                              type="text"
                              value={shippingInfo.country}
                              onChange={(e) =>
                                setShippingInfo({ ...shippingInfo, country: e.target.value })
                              }
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <CreditCard size={20} className="text-green-600" />
                        Payment Method
                      </h3>
                      <div className="space-y-3">
                        <button
                          type="button"
                          onClick={() => setPaymentMethod('card')}
                          className={`w-full flex items-center gap-3 p-4 border-2 rounded-lg transition-all ${
                            paymentMethod === 'card'
                              ? 'border-green-600 bg-green-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <CreditCard size={24} className={paymentMethod === 'card' ? 'text-green-600' : 'text-gray-400'} />
                          <div className="flex-1 text-left">
                            <p className="font-medium text-gray-900">Credit/Debit Card</p>
                            <p className="text-xs text-gray-500">Pay securely with your card</p>
                          </div>
                          {paymentMethod === 'card' && (
                            <div className="w-5 h-5 rounded-full bg-green-600 flex items-center justify-center">
                              <div className="w-2 h-2 bg-white rounded-full" />
                            </div>
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => setPaymentMethod('wallet')}
                          className={`w-full flex items-center gap-3 p-4 border-2 rounded-lg transition-all ${
                            paymentMethod === 'wallet'
                              ? 'border-green-600 bg-green-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <Wallet size={24} className={paymentMethod === 'wallet' ? 'text-green-600' : 'text-gray-400'} />
                          <div className="flex-1 text-left">
                            <p className="font-medium text-gray-900">Digital Wallet</p>
                            <p className="text-xs text-gray-500">Apple Pay, Google Pay</p>
                          </div>
                          {paymentMethod === 'wallet' && (
                            <div className="w-5 h-5 rounded-full bg-green-600 flex items-center justify-center">
                              <div className="w-2 h-2 bg-white rounded-full" />
                            </div>
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => setPaymentMethod('cod')}
                          className={`w-full flex items-center gap-3 p-4 border-2 rounded-lg transition-all ${
                            paymentMethod === 'cod'
                              ? 'border-green-600 bg-green-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <Truck size={24} className={paymentMethod === 'cod' ? 'text-green-600' : 'text-gray-400'} />
                          <div className="flex-1 text-left">
                            <p className="font-medium text-gray-900">Cash on Delivery</p>
                            <p className="text-xs text-gray-500">Pay when you receive</p>
                          </div>
                          {paymentMethod === 'cod' && (
                            <div className="w-5 h-5 rounded-full bg-green-600 flex items-center justify-center">
                              <div className="w-2 h-2 bg-white rounded-full" />
                            </div>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="bg-gray-50 rounded-lg p-6 sticky top-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h3>

                      <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                        {cartItems.map((item) => (
                          <div key={item.id} className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-2xl">
                              📱
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {item.products?.name}
                              </p>
                              <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                            </div>
                            <p className="text-sm font-bold text-gray-900">
                              ${((item.products?.price || 0) * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className="border-t border-gray-200 pt-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Subtotal:</span>
                          <span className="font-medium">${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Tax (10%):</span>
                          <span className="font-medium">${tax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Shipping:</span>
                          <span className="font-medium">
                            {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                          </span>
                        </div>
                        {shipping === 0 && (
                          <p className="text-xs text-green-600">Free shipping on orders over $50</p>
                        )}
                        <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-2">
                          <span>Total:</span>
                          <span className="text-green-600">${total.toFixed(2)}</span>
                        </div>
                      </div>

                      {error && (
                        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                          {error}
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                      >
                        {loading ? 'Processing...' : `Place Order - $${total.toFixed(2)}`}
                      </button>

                      <p className="text-xs text-gray-500 text-center mt-3">
                        By placing your order, you agree to our Terms & Conditions
                      </p>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
