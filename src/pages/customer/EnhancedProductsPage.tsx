import React, { useState, useMemo, useCallback, memo } from 'react';
import { ShoppingCart, Search, Filter, X, ChevronDown, Star } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { Card, CardImage, CardContent } from '../../components/ui/EnhancedCard';
import EnhancedButton from '../../components/ui/EnhancedButton';

// Memoized filter badge component
const FilterBadge = memo(({ label, onRemove }: { label: string; onRemove: () => void }) => (
  <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-800 mr-2 mb-2">
    <span>{label}</span>
    <button onClick={onRemove} className="ml-1.5 text-primary-600 hover:text-primary-800">
      <X size={14} />
    </button>
  </div>
));

// Memoized star rating component
const StarRating = memo(({ rating, reviewCount }: { rating: number; reviewCount: number }) => (
  <div className="flex items-center">
    <div className="flex text-yellow-400">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={16}
          fill={i < Math.floor(rating) ? 'currentColor' : 'none'}
          className={i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}
        />
      ))}
    </div>
    <span className="text-sm text-gray-500 ml-1">({reviewCount})</span>
  </div>
));

// Memoized product card component
const ProductCard = memo(({ product, onAddToCart }: { product: any; onAddToCart: (id: string) => void }) => {
  const handleAddToCart = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product.id);
  }, [product.id, onAddToCart]);

  const handleProductClick = useCallback(() => {
    window.history.pushState({}, '', `/product/${product.id}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
  }, [product.id]);

  return (
    <Card 
      className="group flex flex-col h-full transition-all duration-300" 
      hoverEffect
      onClick={handleProductClick}
    >
      <CardImage 
        src={product.imageUrl || product.images?.[0] || 'https://via.placeholder.com/300'} 
        alt={product.name}
        aspectRatio="3:2"
        className="rounded-t-lg"
      />
      <CardContent className="p-4 flex-1 flex flex-col">
        <div className="mb-2">
          <span className="text-xs font-medium text-primary-600 uppercase tracking-wider">{product.category}</span>
        </div>
        <h3 className="text-lg font-semibold mb-2 group-hover:text-primary-600 transition-colors">{product.name}</h3>
        <div className="mb-3">
          <StarRating rating={product.rating || 4} reviewCount={product.reviewCount || 0} />
        </div>
        <p className="text-gray-600 mb-4 flex-1 text-sm line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            {product.compareAtPrice && (
              <span className="line-through text-sm text-gray-500">
                ${product.compareAtPrice.toFixed(2)}
              </span>
            )}
            <span className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
          </div>
          <EnhancedButton 
            variant="primary"
            size="sm"
            onClick={handleAddToCart}
            rounded="full"
            className="shadow-md hover:shadow-lg"
            leftIcon={<ShoppingCart size={16} />}
          >
            Add
          </EnhancedButton>
        </div>
      </CardContent>
    </Card>
  );
});

export function EnhancedProductsPage() {
  const { state, dispatch } = useApp();
  const products = state.products || [];

  // State for filters
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortBy, setSortBy] = useState('featured');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  // Extract unique categories from products
  const categories = useMemo(() => {
    return Array.from(new Set(products.map(p => p.category)));
  }, [products]);

  // Filter products by category, search, and price range
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) || 
                           product.description.toLowerCase().includes(search.toLowerCase());
      const matchesPriceRange = product.price >= priceRange[0] && product.price <= priceRange[1];
      return matchesCategory && matchesSearch && matchesPriceRange;
    });
  }, [products, selectedCategory, search, priceRange]);

  // Sort products
  const sortedProducts = useMemo(() => {
    const productsToSort = [...filteredProducts];
    switch (sortBy) {
      case 'price_asc':
        return productsToSort.sort((a, b) => a.price - b.price);
      case 'price_desc':
        return productsToSort.sort((a, b) => b.price - a.price);
      case 'newest':
        return productsToSort.sort((a, b) => 
          new Date(b.createdAt || Date.now()).getTime() - new Date(a.createdAt || Date.now()).getTime());
      case 'rating':
        return productsToSort.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case 'featured':
      default:
        return productsToSort;
    }
  }, [filteredProducts, sortBy]);

  // Handle adding to cart
  const handleAddToCart = useCallback((productId: string) => {
    dispatch({ 
      type: 'ADD_TO_CART', 
      payload: { productId, quantity: 1 } 
    });
    dispatch({ type: 'TOGGLE_CART_DRAWER', payload: true });
  }, [dispatch]);

  // Handle category change
  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
    if (category !== 'All' && !activeFilters.includes(`Category: ${category}`)) {
      setActiveFilters(prev => [...prev, `Category: ${category}`]);
    }
  }, [activeFilters]);

  // Handle search change
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }, []);

  // Handle price range change
  const handlePriceRangeChange = useCallback((min: number, max: number) => {
    setPriceRange([min, max]);
    const filterLabel = `Price: $${min} - $${max}`;
    if (!activeFilters.includes(filterLabel)) {
      setActiveFilters(prev => [...prev, filterLabel]);
    }
  }, [activeFilters]);

  // Handle removing a filter
  const handleRemoveFilter = useCallback((filter: string) => {
    setActiveFilters(prev => prev.filter(f => f !== filter));
    
    // Reset the corresponding filter
    if (filter.startsWith('Category:')) {
      setSelectedCategory('All');
    } else if (filter.startsWith('Price:')) {
      setPriceRange([0, 1000]);
    }
  }, []);

  // Clear all filters
  const clearAllFilters = useCallback(() => {
    setSelectedCategory('All');
    setSearch('');
    setPriceRange([0, 1000]);
    setSortBy('featured');
    setActiveFilters([]);
  }, []);

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Our Products</h1>
        <p className="text-gray-600">Discover our high-quality products</p>
      </div>
      
      {/* Search and Filter Bar */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-8 transition-all duration-300">
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search products..."
              className="pl-10 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
              value={search}
              onChange={handleSearchChange}
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <div className="relative">
              <select
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
              >
                <option value="All">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <ChevronDown size={16} className="text-gray-500" />
              </div>
            </div>
            
            <div className="relative">
              <select
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="newest">Newest</option>
                <option value="rating">Top Rated</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <ChevronDown size={16} className="text-gray-500" />
              </div>
            </div>
            
            <EnhancedButton
              variant="outline"
              size="sm"
              leftIcon={<Filter size={16} />}
              onClick={() => handlePriceRangeChange(0, 1000)}
            >
              More Filters
            </EnhancedButton>
          </div>
        </div>
        
        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div className="mt-4">
            <div className="flex flex-wrap items-center">
              <span className="text-sm font-medium text-gray-700 mr-2">Active Filters:</span>
              {activeFilters.map(filter => (
                <FilterBadge 
                  key={filter} 
                  label={filter} 
                  onRemove={() => handleRemoveFilter(filter)} 
                />
              ))}
              <button 
                onClick={clearAllFilters}
                className="text-sm text-primary-600 hover:text-primary-800 ml-2"
              >
                Clear All
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedProducts.length === 0 ? (
          <div className="col-span-full py-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <Search size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria</p>
            <EnhancedButton 
              variant="primary" 
              onClick={clearAllFilters}
            >
              Clear Filters
            </EnhancedButton>
          </div>
        ) : (
          sortedProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={handleAddToCart} 
            />
          ))
        )}
      </div>
      
      {/* Pagination - simplified for demo */}
      {sortedProducts.length > 0 && (
        <div className="mt-12 flex justify-center">
          <nav className="inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              <span className="sr-only">Previous</span>
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" aria-current="page" className="relative inline-flex items-center px-4 py-2 border border-primary-500 bg-primary-50 text-sm font-medium text-primary-600 hover:bg-primary-100">
              1
            </a>
            <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
              2
            </a>
            <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
              3
            </a>
            <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              <span className="sr-only">Next</span>
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </a>
          </nav>
        </div>
      )}
    </div>
  );
}