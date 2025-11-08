import { Search, ShoppingCart, Heart, User } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

type HeaderProps = {
  cartCount: number;
  onCartClick: () => void;
  onLoginClick: () => void;
  onProfileClick?: () => void;
};

export default function Header({ cartCount, onCartClick, onLoginClick, onProfileClick }: HeaderProps) {
  const { user } = useAuth();

  const userEmail = user?.email || '';
  const userInitial = userEmail.charAt(0).toUpperCase();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900">SHOPCART</h1>
          </div>

          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-green-600 font-medium">Home</a>
            <a href="#" className="text-gray-700 hover:text-gray-900">Shop</a>
            <a href="#" className="text-gray-700 hover:text-gray-900">Blog</a>
            <a href="#" className="text-gray-700 hover:text-gray-900">Hot Deal</a>
          </nav>

          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-gray-900">
              <Search size={20} />
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-900 relative">
              <Heart size={20} />
            </button>
            <button
              onClick={onCartClick}
              className="p-2 text-gray-600 hover:text-gray-900 relative"
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={user ? onProfileClick : onLoginClick}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {user ? (
                <>
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-white">{userInitial}</span>
                  </div>
                  <span className="text-sm text-gray-700 hidden sm:inline">Account</span>
                </>
              ) : (
                <>
                  <User size={20} />
                  <span className="text-sm">Login</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
