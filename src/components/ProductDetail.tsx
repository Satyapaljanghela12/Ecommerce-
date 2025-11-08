import { X, ShoppingCart, Heart } from 'lucide-react';
import type { Product } from '../lib/supabase';
import ProductImageSlideshow from './ProductImageSlideshow';

type ProductDetailProps = {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (productId: string) => void;
  onToggleWishlist: (productId: string) => void;
  isInWishlist: boolean;
};

export default function ProductDetail({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isInWishlist,
}: ProductDetailProps) {
  if (!isOpen || !product) return null;

  const hasDiscount = product.original_price && product.original_price > product.price;
  const discountPercentage = hasDiscount
    ? Math.round(((product.original_price! - product.price) / product.original_price!) * 100)
    : 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 flex items-center justify-between p-6">
          <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ProductImageSlideshow
              productId={product.id}
              productName={product.name}
            />

            <div className="space-y-6">
              <div>
                <div className="flex items-baseline space-x-3 mb-2">
                  <p className="text-4xl font-bold text-gray-900">
                    ${product.price.toFixed(2)}
                  </p>
                  {hasDiscount && (
                    <>
                      <p className="text-lg text-gray-400 line-through">
                        ${product.original_price!.toFixed(2)}
                      </p>
                      <span className="text-lg text-orange-600 font-bold">
                        {discountPercentage}% OFF
                      </span>
                    </>
                  )}
                </div>

                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-lg ${
                          i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    ({product.review_count} reviews)
                  </span>
                </div>
              </div>

              {product.badge && (
                <div className="inline-block bg-orange-500 text-white px-4 py-2 rounded-lg font-medium">
                  {product.badge}
                </div>
              )}

              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-700 leading-relaxed">
                  {product.description || 'Premium quality product with excellent features and performance.'}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-700">Stock Available:</span>
                  <span className={`font-bold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {product.stock > 0 ? `${product.stock} units` : 'Out of Stock'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Category:</span>
                  <span className="font-medium text-gray-900">Gadget Accessories</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    onAddToCart(product.id);
                    onClose();
                  }}
                  disabled={product.stock === 0}
                  className="flex-1 bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <ShoppingCart size={20} />
                  <span>Add to Cart</span>
                </button>

                <button
                  onClick={() => onToggleWishlist(product.id)}
                  className={`px-6 py-3 rounded-lg font-bold transition-colors flex items-center justify-center space-x-2 ${
                    isInWishlist
                      ? 'bg-red-100 text-red-600 hover:bg-red-200'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Heart size={20} fill={isInWishlist ? 'currentColor' : 'none'} />
                  <span>{isInWishlist ? 'Saved' : 'Save'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
