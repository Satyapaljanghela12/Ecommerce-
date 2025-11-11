import { User, Coins, Package, Heart, Tag, Gift, Bell, LogOut, ChevronRight, X, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

type UserProfileProps = {
  isOpen: boolean;
  onClose: () => void;
};

type MenuSection = 'main' | 'profile' | 'orders' | 'wishlist' | 'coupons' | 'notifications' | 'coins' | 'gifts';

export default function UserProfile({ isOpen, onClose }: UserProfileProps) {
  const { user, signOut } = useAuth();
  const [currentSection, setCurrentSection] = useState<MenuSection>('main');

  if (!user) {
    return null;
  }

  const userEmail = user.email || 'User';
  const userInitial = userEmail.charAt(0).toUpperCase();
  const userName = userEmail.split('@')[0];

  const menuItems = [
    { icon: User, label: 'My Profile', color: 'text-gray-700', section: 'profile' as MenuSection },
    { icon: Coins, label: 'SuperCoin Zone', color: 'text-yellow-600', bgColor: 'bg-yellow-50', section: 'coins' as MenuSection },
    { icon: Package, label: 'Orders', color: 'text-gray-700', section: 'orders' as MenuSection },
    { icon: Heart, label: 'Wishlist (2)', color: 'text-gray-700', section: 'wishlist' as MenuSection },
    { icon: Tag, label: 'Coupons', color: 'text-gray-700', section: 'coupons' as MenuSection },
    { icon: Gift, label: 'Gift Cards', color: 'text-gray-700', section: 'gifts' as MenuSection },
    { icon: Bell, label: 'Notifications', color: 'text-gray-700', section: 'notifications' as MenuSection },
  ];

  const handleSignOut = async () => {
    await signOut();
    onClose();
  };

  const handleMenuClick = (section: MenuSection) => {
    setCurrentSection(section);
  };

  const handleBack = () => {
    setCurrentSection('main');
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 ${
          isOpen ? 'opacity-30' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed left-0 top-16 h-[calc(100vh-4rem)] w-80 sm:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-out overflow-y-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{
          borderTopRightRadius: '1rem',
          borderBottomRightRadius: '1rem',
          maxWidth: '80vw'
        }}
      >
        <div className="sticky top-0 bg-white z-10 border-b border-gray-100">
          <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 flex items-center space-x-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
              <span className="text-xl font-bold text-green-600">{userInitial}</span>
            </div>
            <div className="flex-1">
              <p className="text-sm text-green-50">Hello,</p>
              <h3 className="text-lg font-bold text-white">{userName}</h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X size={20} className="text-white" />
            </button>
          </div>
        </div>

        <div className="py-2">
          {currentSection === 'main' && (
            <>
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleMenuClick(item.section)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors ${
                    item.bgColor || ''
                  }`}
                >
                  <item.icon size={20} className={item.color} />
                  <span className="flex-1 text-left text-sm font-medium text-gray-800">
                    {item.label}
                  </span>
                  <ChevronRight size={16} className="text-gray-400" />
                </button>
              ))}

              <button
                onClick={handleSignOut}
                className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-red-50 transition-colors border-t border-gray-100 mt-2"
              >
                <LogOut size={20} className="text-red-600" />
                <span className="flex-1 text-left text-sm font-medium text-red-600">
                  Logout
                </span>
                <ChevronRight size={16} className="text-gray-400" />
              </button>
            </>
          )}

          {currentSection === 'profile' && (
            <div className="p-4">
              <button onClick={handleBack} className="flex items-center space-x-2 text-green-600 mb-4 hover:text-green-700">
                <ArrowLeft size={18} />
                <span className="text-sm font-medium">Back</span>
              </button>
              <h3 className="font-bold text-gray-900 mb-3">My Profile</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-gray-600">Email</label>
                  <p className="text-sm text-gray-800">{userEmail}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600">Name</label>
                  <p className="text-sm text-gray-800">{userName}</p>
                </div>
              </div>
            </div>
          )}

          {currentSection === 'coins' && (
            <div className="p-4">
              <button onClick={handleBack} className="flex items-center space-x-2 text-green-600 mb-4 hover:text-green-700">
                <ArrowLeft size={18} />
                <span className="text-sm font-medium">Back</span>
              </button>
              <h3 className="font-bold text-gray-900 mb-3">SuperCoin Zone</h3>
              <div className="bg-yellow-50 p-4 rounded-lg text-center">
                <Coins size={32} className="text-yellow-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-yellow-600">2,450</p>
                <p className="text-xs text-gray-600 mt-1">Your SuperCoins</p>
              </div>
              <button className="w-full mt-4 bg-yellow-600 text-white py-2 rounded-lg font-medium hover:bg-yellow-700 transition-colors">
                Redeem Coins
              </button>
            </div>
          )}

          {currentSection === 'orders' && (
            <div className="p-4">
              <button onClick={handleBack} className="flex items-center space-x-2 text-green-600 mb-4 hover:text-green-700">
                <ArrowLeft size={18} />
                <span className="text-sm font-medium">Back</span>
              </button>
              <h3 className="font-bold text-gray-900 mb-3">Your Orders</h3>
              <div className="text-center py-8">
                <Package size={40} className="text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-600">No orders yet</p>
              </div>
            </div>
          )}

          {currentSection === 'wishlist' && (
            <div className="p-4">
              <button onClick={handleBack} className="flex items-center space-x-2 text-green-600 mb-4 hover:text-green-700">
                <ArrowLeft size={18} />
                <span className="text-sm font-medium">Back</span>
              </button>
              <h3 className="font-bold text-gray-900 mb-3">Your Wishlist</h3>
              <p className="text-xs text-gray-600 mb-3">2 items in your wishlist</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div>
                    <p className="text-sm font-medium text-gray-800">Item 1</p>
                    <p className="text-xs text-gray-600">$29.99</p>
                  </div>
                  <button className="text-green-600 text-xs font-medium hover:text-green-700">Add to Cart</button>
                </div>
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div>
                    <p className="text-sm font-medium text-gray-800">Item 2</p>
                    <p className="text-xs text-gray-600">$39.99</p>
                  </div>
                  <button className="text-green-600 text-xs font-medium hover:text-green-700">Add to Cart</button>
                </div>
              </div>
            </div>
          )}

          {currentSection === 'coupons' && (
            <div className="p-4">
              <button onClick={handleBack} className="flex items-center space-x-2 text-green-600 mb-4 hover:text-green-700">
                <ArrowLeft size={18} />
                <span className="text-sm font-medium">Back</span>
              </button>
              <h3 className="font-bold text-gray-900 mb-3">Available Coupons</h3>
              <div className="space-y-2">
                <div className="border-2 border-dashed border-green-300 p-3 rounded-lg">
                  <p className="text-sm font-bold text-gray-800">SAVE20</p>
                  <p className="text-xs text-gray-600">Get 20% off on orders above $50</p>
                  <p className="text-xs text-green-600 font-medium mt-1">Expires: Dec 31, 2025</p>
                </div>
                <div className="border-2 border-dashed border-green-300 p-3 rounded-lg">
                  <p className="text-sm font-bold text-gray-800">FREESHIP</p>
                  <p className="text-xs text-gray-600">Free shipping on all orders</p>
                  <p className="text-xs text-green-600 font-medium mt-1">Expires: Dec 15, 2025</p>
                </div>
              </div>
            </div>
          )}

          {currentSection === 'gifts' && (
            <div className="p-4">
              <button onClick={handleBack} className="flex items-center space-x-2 text-green-600 mb-4 hover:text-green-700">
                <ArrowLeft size={18} />
                <span className="text-sm font-medium">Back</span>
              </button>
              <h3 className="font-bold text-gray-900 mb-3">Gift Cards</h3>
              <div className="text-center py-8">
                <Gift size={40} className="text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-600">No gift cards</p>
              </div>
              <button className="w-full mt-4 bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition-colors">
                Buy Gift Card
              </button>
            </div>
          )}

          {currentSection === 'notifications' && (
            <div className="p-4">
              <button onClick={handleBack} className="flex items-center space-x-2 text-green-600 mb-4 hover:text-green-700">
                <ArrowLeft size={18} />
                <span className="text-sm font-medium">Back</span>
              </button>
              <h3 className="font-bold text-gray-900 mb-3">Notifications</h3>
              <div className="space-y-2">
                <label className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-green-600 rounded" />
                  <span className="text-sm text-gray-700">Order Updates</span>
                </label>
                <label className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-green-600 rounded" />
                  <span className="text-sm text-gray-700">Promotional Offers</span>
                </label>
                <label className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 text-green-600 rounded" />
                  <span className="text-sm text-gray-700">Newsletter</span>
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
