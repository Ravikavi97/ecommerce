import React from 'react';
import { User, ShoppingCart, Package, Settings, LogOut } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

export const AccountPage = () => {
  const { state, dispatch } = useApp();

  if (!state.isAuthenticated) {
    dispatch({ type: 'TOGGLE_AUTH_MODAL', payload: true });
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Account Settings</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
            {/* Navigation */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <nav className="space-y-2">
                <button className="w-full flex items-center space-x-3 p-3 rounded-lg bg-primary-50 text-primary-600">
                  <User className="h-5 w-5" />
                  <span>Profile</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
                  <ShoppingCart className="h-5 w-5" />
                  <span>Orders</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
                  <Package className="h-5 w-5" />
                  <span>Subscriptions</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
                  <Settings className="h-5 w-5" />
                  <span>Settings</span>
                </button>
              </nav>
            </div>

            {/* Profile Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-6">Profile Information</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center">
                    <User className="h-8 w-8 text-gray-500" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium">{state.user?.firstName} {state.user?.lastName}</p>
                    <p className="text-sm text-gray-500">{state.user?.email}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">First Name</label>
                    <input
                      type="text"
                      defaultValue={state.user?.firstName}
                      className="w-full px-4 py-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Last Name</label>
                    <input
                      type="text"
                      defaultValue={state.user?.lastName}
                      className="w-full px-4 py-2 border rounded-md"
                    />
                  </div>
                </div>

                <button className="mt-4 bg-primary-600 text-white px-6 py-2 rounded-md hover:bg-primary-700">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};