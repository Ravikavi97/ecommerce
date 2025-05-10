import React, { useState } from 'react';
import { useApp } from '../../../contexts/AppContext';
import { Store } from '../../../types';
import { Button } from '../../../components/ui/Button';
import { storeService, CreateStoreData } from '../../../services/storeService';
import { Check, X, Upload } from 'lucide-react';

interface StoreCreationFormProps {
  onStoreCreated?: (store: Store) => void;
}

export const StoreCreationForm: React.FC<StoreCreationFormProps> = ({ onStoreCreated }) => {
  const { state } = useApp();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Form state
  const [formData, setFormData] = useState<CreateStoreData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    description: '',
    logo: ''
  });

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle logo upload (mock implementation)
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // In a real app, you would upload the file to a server and get a URL back
    // For this demo, we'll create a fake URL
    const reader = new FileReader();
    reader.onload = () => {
      setFormData(prev => ({
        ...prev,
        logo: reader.result as string
      }));
    };
    reader.readAsDataURL(file);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Validate form
      if (!formData.name || !formData.email || !formData.phone || !formData.address) {
        throw new Error('Please fill in all required fields');
      }

      // Create store
      const response = await storeService.createStore(formData);
      
      // Show success message
      setIsSuccess(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          address: '',
          description: '',
          logo: ''
        });
      }, 3000);

      // Call onStoreCreated callback if provided
      if (onStoreCreated) {
        onStoreCreated(response.store);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Create New Store</h3>
      <p className="text-gray-500 mb-6">
        Create a new store that will be visible to customers.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">
              Store Name *
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
              Store Email *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="phone">
              Store Phone *
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="address">
              Store Address *
            </label>
            <input
              id="address"
              name="address"
              type="text"
              required
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              value={formData.address}
              onChange={handleInputChange}
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="description">
              Store Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Store Logo
            </label>
            <div className="flex items-center space-x-4">
              {formData.logo && (
                <div className="h-16 w-16 rounded-md overflow-hidden bg-gray-100">
                  <img 
                    src={formData.logo} 
                    alt="Store logo preview" 
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
              <label className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
                <Upload className="h-4 w-4 mr-2" />
                Upload Logo
                <input
                  type="file"
                  className="sr-only"
                  accept="image/*"
                  onChange={handleLogoUpload}
                />
              </label>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md flex items-center">
            <X className="h-5 w-5 mr-2 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {isSuccess && (
          <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-md flex items-center">
            <Check className="h-5 w-5 mr-2 flex-shrink-0" />
            <span>Store created successfully!</span>
          </div>
        )}

        <div className="flex justify-end">
          <Button
            type="submit"
            variant="primary"
            disabled={isLoading}
          >
            {isLoading ? 'Creating...' : 'Create Store'}
          </Button>
        </div>
      </form>
    </div>
  );
};