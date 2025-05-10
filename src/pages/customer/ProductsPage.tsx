import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ShoppingCart } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

export function ProductsPage() {
  const { state, dispatch } = useApp();
  const products = state.products || [];

  // Extract unique categories from products
  const categories = Array.from(new Set(products.map(p => p.category)));
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');

  // Filter products by category and search
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>
      {/* Filter & Category UI */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
        <div>
          <label className="font-medium mr-2">Category:</label>
          <select
            className="border rounded px-3 py-2"
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
          >
            <option value="All">All</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search products..."
            className="border rounded px-3 py-2 w-full"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.length === 0 ? (
          <div className="col-span-full text-center text-gray-500">No products found.</div>
        ) : (
          filteredProducts.map((product) => (
            <Card 
              key={product.id} 
              className="flex flex-col cursor-pointer" 
              onClick={(e) => {
                // Prevent navigation when clicking the Add to Cart button
                if (!(e.target as HTMLElement).closest('button')) {
                  window.history.pushState({}, '', `/product/${product.id}`);
                  window.dispatchEvent(new PopStateEvent('popstate'));
                }
              }}
            >
              <img 
                src={product.imageUrl} 
                alt={product.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4 flex-1">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold">${product.price}</span>
                  <Button 
                    onClick={() => {
                      dispatch({ 
                        type: 'ADD_TO_CART', 
                        payload: { productId: product.id, quantity: 1 } 
                      });
                      dispatch({ type: 'TOGGLE_CART_DRAWER', payload: true });
                    }}
                    className="flex items-center gap-2"
                  >
                    <ShoppingCart size={20} />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}