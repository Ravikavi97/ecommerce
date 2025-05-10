import React, { useState, useEffect } from 'react';
import { Product } from '../../../types';
import { Button } from '../../../components/ui/Button';
import { X, Upload, Plus, Trash2 } from 'lucide-react';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Partial<Product>) => void;
  product?: Product;
  title: string;
}

const initialProductState: Partial<Product> = {
  name: '',
  description: '',
  price: 0,
  compareAtPrice: 0,
  category: '',
  brand: '',
  inStock: true,
  sku: '',
  images: [],
  tags: [],
  featured: false
};

export const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  onClose,
  onSave,
  product,
  title
}) => {
  const [formData, setFormData] = useState<Partial<Product>>(initialProductState);
  const [tagInput, setTagInput] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Initialize form data when product changes
  useEffect(() => {
    if (product) {
      setFormData(product);
    } else {
      setFormData(initialProductState);
    }
  }, [product]);

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'number') {
      setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // In a real app, you would upload these files to a server
    // For this demo, we'll create fake URLs
    const newImages = Array.from(files).map(file => {
      return URL.createObjectURL(file);
    });

    setFormData(prev => ({
      ...prev,
      images: [...(prev.images || []), ...newImages]
    }));

    // Reset the input
    e.target.value = '';
  };

  const handleRemoveImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images?.filter((_, i) => i !== index)
    }));
  };

  const handleAddTag = () => {
    if (!tagInput.trim()) return;
    
    setFormData(prev => ({
      ...prev,
      tags: [...(prev.tags || []), tagInput.trim()]
    }));
    
    setTagInput('');
  };

  const handleRemoveTag = (index: number) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags?.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.price || formData.price <= 0) newErrors.price = 'Valid price is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.sku) newErrors.sku = 'SKU is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Product Name */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">
                Product Name *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className={`w-full rounded-md ${errors.name ? 'border-red-300' : 'border-gray-300'} shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm`}
                value={formData.name || ''}
                onChange={handleInputChange}
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="description">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                className={`w-full rounded-md ${errors.description ? 'border-red-300' : 'border-gray-300'} shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm`}
                value={formData.description || ''}
                onChange={handleInputChange}
              />
              {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="price">
                Price *
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  min="0"
                  className={`pl-7 w-full rounded-md ${errors.price ? 'border-red-300' : 'border-gray-300'} shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm`}
                  value={formData.price || ''}
                  onChange={handleInputChange}
                />
              </div>
              {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
            </div>

            {/* Compare At Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="compareAtPrice">
                Compare At Price
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  id="compareAtPrice"
                  name="compareAtPrice"
                  type="number"
                  step="0.01"
                  min="0"
                  className="pl-7 w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  value={formData.compareAtPrice || ''}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="category">
                Category *
              </label>
              <select
                id="category"
                name="category"
                className={`w-full rounded-md ${errors.category ? 'border-red-300' : 'border-gray-300'} shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm`}
                value={formData.category || ''}
                onChange={handleInputChange}
              >
                <option value="">Select a category</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Home & Kitchen">Home & Kitchen</option>
                <option value="Books">Books</option>
                <option value="Toys">Toys</option>
              </select>
              {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
            </div>

            {/* Brand */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="brand">
                Brand
              </label>
              <input
                id="brand"
                name="brand"
                type="text"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                value={formData.brand || ''}
                onChange={handleInputChange}
              />
            </div>

            {/* SKU */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="sku">
                SKU *
              </label>
              <input
                id="sku"
                name="sku"
                type="text"
                className={`w-full rounded-md ${errors.sku ? 'border-red-300' : 'border-gray-300'} shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm`}
                value={formData.sku || ''}
                onChange={handleInputChange}
              />
              {errors.sku && <p className="mt-1 text-sm text-red-600">{errors.sku}</p>}
            </div>

            {/* In Stock */}
            <div className="flex items-center">
              <input
                id="inStock"
                name="inStock"
                type="checkbox"
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                checked={formData.inStock}
                onChange={handleInputChange}
              />
              <label htmlFor="inStock" className="ml-2 block text-sm text-gray-900">
                In Stock
              </label>
            </div>

            {/* Featured */}
            <div className="flex items-center">
              <input
                id="featured"
                name="featured"
                type="checkbox"
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                checked={formData.featured}
                onChange={handleInputChange}
              />
              <label htmlFor="featured" className="ml-2 block text-sm text-gray-900">
                Featured Product
              </label>
            </div>
          </div>

          {/* Images */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Images
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {formData.images?.map((image, index) => (
                <div key={index} className="relative group">
                  <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200">
                    <img
                      src={image}
                      alt={`Product image ${index + 1}`}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </button>
                </div>
              ))}
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md border-2 border-dashed border-gray-300 p-2 flex items-center justify-center">
                <label className="cursor-pointer text-center">
                  <div className="flex flex-col items-center">
                    <Upload className="h-8 w-8 text-gray-400 mb-1" />
                    <span className="text-sm text-gray-500">Upload Image</span>
                  </div>
                  <input
                    type="file"
                    className="sr-only"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Tags
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {formData.tags?.map((tag, index) => (
                <div key={index} className="bg-gray-100 rounded-full px-3 py-1 text-sm flex items-center">
                  <span>{tag}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(index)}
                    className="ml-1 text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex">
              <input
                type="text"
                placeholder="Add a tag"
                className="flex-1 rounded-l-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-gray-700 text-sm"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save Product
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};