import React, { useState, useEffect } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Settings as SettingsIcon, Globe, DollarSign, Users, Tag, Check, X, UserCog } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { UserPermissionsTab } from './components/UserPermissionsTab';
import { StoreCreationForm } from './components/StoreCreationForm';
import { Store } from '../../types';

interface TabProps {
  label: string;
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
}

const Tab: React.FC<TabProps> = ({ label, icon, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-2 px-4 py-3 w-full text-left ${active
        ? 'bg-primary-50 text-primary-600 border-r-2 border-primary-600'
        : 'text-gray-600 hover:bg-gray-50'
        }`}
    >
      <span className="flex-shrink-0">{icon}</span>
      <span>{label}</span>
    </button>
  );
};

interface SettingsState {
  currency: {
    code: string;
    symbol: string;
    name: string;
  };
  country: string;
  approvalSettings: {
    requireCustomerApproval: boolean;
    requireAgentApproval: boolean;
    autoApproveOrders: boolean;
  };
  productSettings: {
    enableImageUploads: boolean;
    enableTagging: boolean;
    maxImagesPerProduct: number;
  };
}

export const AdminSettingsPage: React.FC = () => {
  const { state } = useApp();
  const [activeTab, setActiveTab] = useState('general');
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [stores, setStores] = useState<Store[]>([]);
  
  // Check if current user is admin
  useEffect(() => {
    if (state.currentUser && state.currentUser.role === 'admin') {
      setIsAdmin(true);
    }
  }, [state.currentUser]);
  
  // Settings state
  const [settings, setSettings] = useState<SettingsState>({
    currency: {
      code: 'USD',
      symbol: '$',
      name: 'US Dollar'
    },
    country: 'United States',
    approvalSettings: {
      requireCustomerApproval: false,
      requireAgentApproval: true,
      autoApproveOrders: false
    },
    productSettings: {
      enableImageUploads: true,
      enableTagging: true,
      maxImagesPerProduct: 5
    }
  });

  // Available currencies
  const currencies = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'LKR', symbol: 'Rs', name: 'Sri Lankan Rupee' },
    { code: 'INR', symbol: '₹', name: 'Indian Rupee' }
  ];

  // Available countries
  const countries = [
    'United States',
    'Sri Lanka',
    'India',
    'United Kingdom',
    'Canada',
    'Australia'
  ];

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCurrency = currencies.find(c => c.code === e.target.value) || currencies[0];
    setSettings(prev => ({
      ...prev,
      currency: selectedCurrency
    }));
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSettings(prev => ({
      ...prev,
      country: e.target.value
    }));
  };

  const handleToggleSetting = (section: 'approvalSettings' | 'productSettings', key: string) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: !prev[section][key as keyof typeof prev[section]]
      }
    }));
  };

  const handleMaxImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 1;
    setSettings(prev => ({
      ...prev,
      productSettings: {
        ...prev.productSettings,
        maxImagesPerProduct: Math.max(1, Math.min(10, value))
      }
    }));
  };

  const handleSaveSettings = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSaved(true);
      
      // Reset saved message after 3 seconds
      setTimeout(() => {
        setIsSaved(false);
      }, 3000);
    }, 800);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 pb-8">
      <div className="sm:flex sm:items-center sm:justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Settings
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Configure system settings and preferences
          </p>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar */}
          <div className="w-full md:w-64 border-r border-gray-200">
            <div className="py-4">
              <Tab
                label="General"
                icon={<SettingsIcon className="h-5 w-5" />}
                active={activeTab === 'general'}
                onClick={() => setActiveTab('general')}
              />
              <Tab
                label="Currency"
                icon={<DollarSign className="h-5 w-5" />}
                active={activeTab === 'currency'}
                onClick={() => setActiveTab('currency')}
              />
              <Tab
                label="Location"
                icon={<Globe className="h-5 w-5" />}
                active={activeTab === 'location'}
                onClick={() => setActiveTab('location')}
              />
              <Tab
                label="User Permissions"
                icon={<UserCog className="h-5 w-5" />}
                active={activeTab === 'permissions'}
                onClick={() => setActiveTab('permissions')}
              />
              <Tab
                label="Approval Workflow"
                icon={<Users className="h-5 w-5" />}
                active={activeTab === 'approval'}
                onClick={() => setActiveTab('approval')}
              />
              <Tab
                label="Product Settings"
                icon={<Tag className="h-5 w-5" />}
                active={activeTab === 'product'}
                onClick={() => setActiveTab('product')}
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-6">
            {/* General Settings */}
            {activeTab === 'general' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">General Settings</h3>
                <p className="text-gray-500 mb-6">
                  Configure basic system settings and preferences.
                </p>
                
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Store Name</label>
                    <input 
                      type="text" 
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                      defaultValue="Bolt Commerce"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Store Email</label>
                    <input 
                      type="email" 
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                      defaultValue="contact@boltcommerce.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Support Phone</label>
                    <input 
                      type="tel" 
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                      defaultValue="+1 (555) 123-4567"
                    />
                  </div>
                </div>
                
                {/* Store Creation Form - Only visible to admin users */}
                {isAdmin && (
                  <div className="mt-8">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Store Management</h3>
                    <p className="text-gray-500 mb-6">
                      Create and manage stores that will be visible to customers.
                    </p>
                    
                    <StoreCreationForm 
                      onStoreCreated={(store) => {
                        setStores(prev => [...prev, store]);
                      }}
                    />
                  </div>
                )}
              </div>
            )}

            {/* Currency Settings */}
            {activeTab === 'currency' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Currency Settings</h3>
                <p className="text-gray-500 mb-6">
                  Configure the currency used throughout the store.
                </p>
                
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Default Currency</label>
                    <select
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                      value={settings.currency.code}
                      onChange={handleCurrencyChange}
                    >
                      {currencies.map(currency => (
                        <option key={currency.code} value={currency.code}>
                          {currency.name} ({currency.symbol})
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price Display Format</label>
                    <select
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                      defaultValue="symbol_first"
                    >
                      <option value="symbol_first">{settings.currency.symbol}100.00</option>
                      <option value="symbol_last">100.00{settings.currency.symbol}</option>
                      <option value="code_first">{settings.currency.code} 100.00</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Decimal Separator</label>
                    <select
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                      defaultValue="dot"
                    >
                      <option value="dot">Dot (.)</option>
                      <option value="comma">Comma (,)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Location Settings */}
            {activeTab === 'location' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Location Settings</h3>
                <p className="text-gray-500 mb-6">
                  Configure the store location and regional settings.
                </p>
                
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Default Country</label>
                    <select
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                      value={settings.country}
                      onChange={handleCountryChange}
                    >
                      {countries.map(country => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Time Zone</label>
                    <select
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                      defaultValue="UTC-5"
                    >
                      <option value="UTC-8">Pacific Time (UTC-8)</option>
                      <option value="UTC-7">Mountain Time (UTC-7)</option>
                      <option value="UTC-6">Central Time (UTC-6)</option>
                      <option value="UTC-5">Eastern Time (UTC-5)</option>
                      <option value="UTC+0">Greenwich Mean Time (UTC+0)</option>
                      <option value="UTC+5.5">India Standard Time (UTC+5:30)</option>
                      <option value="UTC+5.5">Sri Lanka Standard Time (UTC+5:30)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date Format</label>
                    <select
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                      defaultValue="MM/DD/YYYY"
                    >
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Approval Workflow Settings */}
            {activeTab === 'approval' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Approval Workflow Settings</h3>
                <p className="text-gray-500 mb-6">
                  Configure approval workflows for customers, agents, and orders.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-md">
                    <div>
                      <h4 className="font-medium text-gray-900">Require Customer Approval</h4>
                      <p className="text-sm text-gray-500">New customer accounts require admin approval before they can log in</p>
                    </div>
                    <div className="flex items-center">
                      <button 
                        onClick={() => handleToggleSetting('approvalSettings', 'requireCustomerApproval')}
                        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${settings.approvalSettings.requireCustomerApproval ? 'bg-primary-600' : 'bg-gray-200'}`}
                      >
                        <span 
                          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${settings.approvalSettings.requireCustomerApproval ? 'translate-x-5' : 'translate-x-0'}`}
                        />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-md">
                    <div>
                      <h4 className="font-medium text-gray-900">Require Agent Approval</h4>
                      <p className="text-sm text-gray-500">New agent accounts require admin approval before they can access the system</p>
                    </div>
                    <div className="flex items-center">
                      <button 
                        onClick={() => handleToggleSetting('approvalSettings', 'requireAgentApproval')}
                        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${settings.approvalSettings.requireAgentApproval ? 'bg-primary-600' : 'bg-gray-200'}`}
                      >
                        <span 
                          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${settings.approvalSettings.requireAgentApproval ? 'translate-x-5' : 'translate-x-0'}`}
                        />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-md">
                    <div>
                      <h4 className="font-medium text-gray-900">Auto-Approve Orders</h4>
                      <p className="text-sm text-gray-500">Automatically approve new orders without manual review</p>
                    </div>
                    <div className="flex items-center">
                      <button 
                        onClick={() => handleToggleSetting('approvalSettings', 'autoApproveOrders')}
                        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${settings.approvalSettings.autoApproveOrders ? 'bg-primary-600' : 'bg-gray-200'}`}
                      >
                        <span 
                          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${settings.approvalSettings.autoApproveOrders ? 'translate-x-5' : 'translate-x-0'}`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* User Permissions */}
            {activeTab === 'permissions' && <UserPermissionsTab />}

            {/* Product Settings */}
            {activeTab === 'product' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Product Settings</h3>
                <p className="text-gray-500 mb-6">
                  Configure product management settings and features.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-md">
                    <div>
                      <h4 className="font-medium text-gray-900">Enable Image Uploads</h4>
                      <p className="text-sm text-gray-500">Allow uploading product images when creating or editing products</p>
                    </div>
                    <div className="flex items-center">
                      <button 
                        onClick={() => handleToggleSetting('productSettings', 'enableImageUploads')}
                        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${settings.productSettings.enableImageUploads ? 'bg-primary-600' : 'bg-gray-200'}`}
                      >
                        <span 
                          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${settings.productSettings.enableImageUploads ? 'translate-x-5' : 'translate-x-0'}`}
                        />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-md">
                    <div>
                      <h4 className="font-medium text-gray-900">Enable Product Tagging</h4>
                      <p className="text-sm text-gray-500">Allow adding tags to products for better categorization</p>
                    </div>
                    <div className="flex items-center">
                      <button 
                        onClick={() => handleToggleSetting('productSettings', 'enableTagging')}
                        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${settings.productSettings.enableTagging ? 'bg-primary-600' : 'bg-gray-200'}`}
                      >
                        <span 
                          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${settings.productSettings.enableTagging ? 'translate-x-5' : 'translate-x-0'}`}
                        />
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-md">
                    <h4 className="font-medium text-gray-900 mb-2">Maximum Images Per Product</h4>
                    <p className="text-sm text-gray-500 mb-3">Set the maximum number of images allowed per product</p>
                    <div className="flex items-center">
                      <input 
                        type="number" 
                        min="1" 
                        max="10" 
                        value={settings.productSettings.maxImagesPerProduct}
                        onChange={handleMaxImagesChange}
                        className="w-20 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                      />
                      <span className="ml-2 text-sm text-gray-500">images</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="mt-8 flex items-center justify-end space-x-4">
              {isSaved && (
                <div className="flex items-center text-green-600">
                  <Check className="h-4 w-4 mr-1" />
                  <span>Settings saved</span>
                </div>
              )}
              <Button 
                variant="primary" 
                onClick={handleSaveSettings}
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : 'Save Settings'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};