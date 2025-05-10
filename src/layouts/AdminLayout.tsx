import React, { useState } from 'react';
import { 
  LayoutDashboard, Package, ShoppingCart, Users, Settings, 
  LogOut, Menu, X, Bell, Search, ChevronDown 
} from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { users } from '../data/mockData';

// Use admin user for demo
const adminUser = users.find(user => user.role === 'admin');

interface AdminLayoutProps {
  children: React.ReactNode;
  navigateTo: (path: string) => void;
  currentPath: string;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ 
  children, 
  navigateTo,
  currentPath
}) => {
  const { dispatch } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
    { name: 'Products', icon: Package, path: '/admin/products' },
    { name: 'Orders', icon: ShoppingCart, path: '/admin/orders' },
    { name: 'Customers', icon: Users, path: '/admin/customers' },
    { name: 'Settings', icon: Settings, path: '/admin/settings' },
  ];

  const handleLogout = () => {
    dispatch({ type: 'SET_USER', payload: null });
    navigateTo('/');
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* Mobile sidebar */}
      <div className={`md:hidden fixed inset-0 z-40 flex ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)}></div>
        
        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-primary-900">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-6 w-6 text-white" />
            </button>
          </div>
          
          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 flex items-center px-4">
              <div className="text-xl font-bold text-white">
                <span className="text-primary-400">Admin</span>Panel
              </div>
            </div>
            <nav className="mt-5 px-2 space-y-1">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  onClick={() => {
                    navigateTo(item.path);
                    setSidebarOpen(false);
                  }}
                  className={`${
                    currentPath === item.path
                      ? 'bg-primary-800 text-white'
                      : 'text-primary-100 hover:bg-primary-800'
                  } group flex items-center px-2 py-2 text-base font-medium rounded-md cursor-pointer`}
                >
                  <item.icon className="mr-4 h-6 w-6" />
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-primary-800 p-4">
            <div className="flex items-center">
              <div>
                <img
                  className="inline-block h-10 w-10 rounded-full"
                  src={adminUser?.avatar}
                  alt="Admin avatar"
                />
              </div>
              <div className="ml-3">
                <p className="text-base font-medium text-white">{adminUser?.firstName} {adminUser?.lastName}</p>
                <p className="text-sm font-medium text-primary-200">Administrator</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1 bg-primary-900">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <div className="text-xl font-bold text-white">
                  <span className="text-primary-400">Admin</span>Panel
                </div>
              </div>
              <nav className="mt-5 flex-1 px-2 space-y-1">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    onClick={() => navigateTo(item.path)}
                    className={`${
                      currentPath === item.path
                        ? 'bg-primary-800 text-white'
                        : 'text-primary-100 hover:bg-primary-800'
                    } group flex items-center px-2 py-2 text-sm font-medium rounded-md cursor-pointer`}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </a>
                ))}
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-primary-800 p-4">
              <div className="flex items-center">
                <div>
                  <img
                    className="inline-block h-9 w-9 rounded-full"
                    src={adminUser?.avatar}
                    alt="Admin avatar"
                  />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-white">{adminUser?.firstName} {adminUser?.lastName}</p>
                  <p className="text-xs font-medium text-primary-200">Administrator</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
          <button
            className="px-4 border-r border-gray-200 text-gray-500 md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex">
              <div className="w-full flex md:ml-0">
                <label htmlFor="search-field" className="sr-only">
                  Search
                </label>
                <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                  <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                    <Search className="h-5 w-5" />
                  </div>
                  <input
                    id="search-field"
                    className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
                    placeholder="Search"
                    type="search"
                  />
                </div>
              </div>
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              {/* Notification dropdown */}
              <div className="relative">
                <button
                  className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none"
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                >
                  <Bell className="h-6 w-6" />
                </button>
                {notificationsOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                      </div>
                      <div className="max-h-60 overflow-y-auto">
                        <a href="#" className="block px-4 py-3 hover:bg-gray-50">
                          <div className="flex">
                            <div className="flex-shrink-0">
                              <span className="h-8 w-8 rounded-full bg-primary-500 flex items-center justify-center">
                                <ShoppingCart className="h-4 w-4 text-white" />
                              </span>
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-900">New order received</p>
                              <p className="text-sm text-gray-500">Order #12345 has been placed</p>
                              <p className="mt-1 text-xs text-gray-400">10 minutes ago</p>
                            </div>
                          </div>
                        </a>
                        <a href="#" className="block px-4 py-3 hover:bg-gray-50">
                          <div className="flex">
                            <div className="flex-shrink-0">
                              <span className="h-8 w-8 rounded-full bg-warning-500 flex items-center justify-center">
                                <Package className="h-4 w-4 text-white" />
                              </span>
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-900">Low stock alert</p>
                              <p className="text-sm text-gray-500">5 products are running low on inventory</p>
                              <p className="mt-1 text-xs text-gray-400">2 hours ago</p>
                            </div>
                          </div>
                        </a>
                      </div>
                      <div className="border-t border-gray-100 px-4 py-2 text-center">
                        <a href="#" className="text-sm font-medium text-primary-600 hover:text-primary-700">View all notifications</a>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Profile dropdown */}
              <div className="ml-3 relative">
                <div>
                  <button
                    className="max-w-xs bg-white rounded-full flex items-center text-sm focus:outline-none"
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                  >
                    <span className="sr-only">Open user menu</span>
                    <span className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                      <img 
                        src={adminUser?.avatar} 
                        alt="Admin avatar"
                        className="h-full w-full object-cover"
                      />
                    </span>
                    <ChevronDown className="ml-1 h-4 w-4 text-gray-400" />
                  </button>
                </div>
                {userMenuOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};