import { User, Coins, Package, Heart, Tag, Gift, Bell, LogOut, ChevronRight, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

type UserProfileProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function UserProfile({ isOpen, onClose }: UserProfileProps) {
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

  const handleSignOut = async () => {
    await signOut();
    onClose();
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
            onClick={handleSignOut}
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
    </>
  );
}
