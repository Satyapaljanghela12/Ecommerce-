import { User, Coins, Package, Heart, Tag, Gift, Bell, LogOut, ChevronRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function UserProfile() {
  const { user, signOut } = useAuth();

  if (!user) {
    return null;
  }

  const userEmail = user.email || 'User';
  const userInitial = userEmail.charAt(0).toUpperCase();
  const userName = userEmail.split('@')[0];

  const menuItems = [
    { icon: User, label: 'My Profile', color: 'text-gray-700' },
    { icon: Coins, label: 'SuperCoin Zone', color: 'text-yellow-600', bgColor: 'bg-yellow-50' },
    { icon: Package, label: 'Orders', color: 'text-gray-700' },
    { icon: Heart, label: 'Wishlist (2)', color: 'text-gray-700' },
    { icon: Tag, label: 'Coupons', color: 'text-gray-700' },
    { icon: Gift, label: 'Gift Cards', color: 'text-gray-700' },
    { icon: Bell, label: 'Notifications', color: 'text-gray-700' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-sm">
      <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 flex items-center space-x-3">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
          <span className="text-xl font-bold text-green-600">{userInitial}</span>
        </div>
        <div className="flex-1">
          <p className="text-sm text-green-50">Hello,</p>
          <h3 className="text-lg font-bold text-white">{userName}</h3>
        </div>
      </div>

      <div className="py-2">
        {menuItems.map((item, index) => (
          <button
            key={index}
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
          onClick={signOut}
          className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-red-50 transition-colors border-t border-gray-100 mt-2"
        >
          <LogOut size={20} className="text-red-600" />
          <span className="flex-1 text-left text-sm font-medium text-red-600">
            Logout
          </span>
          <ChevronRight size={16} className="text-gray-400" />
        </button>
      </div>
    </div>
  );
}
