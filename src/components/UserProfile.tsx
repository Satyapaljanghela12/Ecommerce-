import { User, Mail, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function UserProfile() {
  const { user, signOut } = useAuth();

  if (!user) {
    return null;
  }

  const userEmail = user.email || 'User';
  const userInitial = userEmail.charAt(0).toUpperCase();

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
          <span className="text-2xl font-bold text-white">{userInitial}</span>
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900">My Account</h3>
          <p className="text-sm text-gray-600 mt-1">{userEmail}</p>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4 space-y-3">
        <div className="flex items-center space-x-3 text-gray-700">
          <User size={20} className="text-green-600" />
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">Email</p>
            <p className="text-sm font-medium text-gray-900">{userEmail}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 text-gray-700">
          <Mail size={20} className="text-green-600" />
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">Account Status</p>
            <p className="text-sm font-medium text-green-600">Active</p>
          </div>
        </div>
      </div>

      <button
        onClick={signOut}
        className="w-full flex items-center justify-center space-x-2 bg-red-50 hover:bg-red-100 text-red-600 py-2 rounded-lg font-medium transition-colors mt-6"
      >
        <LogOut size={18} />
        <span>Sign Out</span>
      </button>
    </div>
  );
}
