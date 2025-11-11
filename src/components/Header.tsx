import { Search, ShoppingCart, Heart, User, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

type HeaderProps = {
  cartCount: number;
  onCartClick: () => void;
  onLoginClick: () => void;
  onProfileClick?: () => void;
};

export default function Header({ cartCount, onCartClick, onLoginClick, onProfileClick }: HeaderProps) {
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const userEmail = user?.email || '';
  const userInitial = userEmail.charAt(0).toUpperCase();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900">SHOPCART</h1>
          </div>

          <nav className="hidden md:flex space-x-8">
            <button onClick={scrollToTop} className="text-green-600 font-medium hover:text-green-700 transition-colors">Home</button>
            <button onClick={() => scrollToSection('shop')} className="text-gray-700 hover:text-gray-900 transition-colors">Shop</button>
            <button onClick={() => scrollToSection('blog')} className="text-gray-700 hover:text-gray-900 transition-colors">Blog</button>
            <button onClick={() => scrollToSection('hot-deal')} className="text-gray-700 hover:text-gray-900 transition-colors">Hot Deal</button>
          </nav>

          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-600 hover:text-gray-900"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

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

        {isMobileMenuOpen && (
          <nav className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-3 space-y-2">
              <button
                onClick={scrollToTop}
                className="block w-full text-left px-3 py-2 text-green-600 font-medium hover:bg-gray-100 rounded-lg transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('shop')}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Shop
              </button>
              <button
                onClick={() => scrollToSection('blog')}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Blog
              </button>
              <button
                onClick={() => scrollToSection('hot-deal')}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Hot Deal
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
