import React, { useState } from 'react';
import { useProducts, useCategories } from '../../contexts/QueryProvider';
import { ProductQueryParams } from '../../services/productService';
import { Card, CardBody } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Search, Filter, SlidersHorizontal, Grid, List } from 'lucide-react';

export const ProductsPageWithAPI: React.FC = () => {
  // State for filters and pagination
  const [queryParams, setQueryParams] = useState<ProductQueryParams>({
    page: 1,
    limit: 12,
    sort: 'newest'
  });
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  // Fetch products and categories using React Query hooks
  const { data: productsData, isLoading: isLoadingProducts, error: productsError } = useProducts(queryParams);
  const { data: categoriesData, isLoading: isLoadingCategories } = useCategories();
  
  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setQueryParams(prev => ({ ...prev, search: searchTerm, page: 1 }));
  };
  
  // Handle category filter
  const handleCategoryFilter = (categorySlug: string | undefined) => {
    setQueryParams(prev => ({ ...prev, category: categorySlug, page: 1 }));
  };
  
  // Handle sort change
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQueryParams(prev => ({ ...prev, sort: e.target.value, page: 1 }));
  };
  
  // Handle price filter
  const handlePriceFilter = (minPrice?: number, maxPrice?: number) => {
    setQueryParams(prev => ({ ...prev, minPrice, maxPrice, page: 1 }));
  };
  
  // Handle pagination
  const handlePageChange = (newPage: number) => {
    setQueryParams(prev => ({ ...prev, page: newPage }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Loading state
  if (isLoadingProducts && !productsData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      </div>
    );
  }
  
  // Error state
  if (productsError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-error-50 border border-error-200 text-error-800 px-4 py-3 rounded">
          <p>Error loading products. Please try again later.</p>
        </div>
      </div>
    );
  }
  
  // Empty state
  if (productsData?.products.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No products found</h2>
          <p className="text-gray-600 mb-6">Try adjusting your filters or search terms.</p>
          <Button 
            variant="outline" 
            onClick={() => setQueryParams({ page: 1, limit: 12, sort: 'newest' })}
          >
            Clear Filters
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Products</h1>
          <p className="text-gray-600">
            {productsData?.total} products available
          </p>
        </div>
        
        {/* Search and filters */}
        <div className="w-full md:w-auto mt-4 md:mt-0 flex flex-col md:flex-row gap-4">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full md:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </form>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              leftIcon={<Filter className="h-5 w-5" />}
            >
              Filters
            </Button>
            
            <select
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={queryParams.sort}
              onChange={handleSortChange}
            >
              <option value="newest">Newest</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
            
            <div className="flex border border-gray-300 rounded-md overflow-hidden">
              <button
                className={`p-2 ${viewMode === 'grid' ? 'bg-gray-100' : 'bg-white'}`}
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                className={`p-2 ${viewMode === 'list' ? 'bg-gray-100' : 'bg-white'}`}
                onClick={() => setViewMode('list')}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Filters panel */}
      {showFilters && (
        <div className="bg-gray-50 p-4 rounded-md mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">Filters</h3>
            <Button 
              variant="text" 
              size="sm"
              onClick={() => setQueryParams({ page: 1, limit: 12, sort: queryParams.sort })}
            >
              Clear All
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Categories filter */}
            <div>
              <h4 className="font-medium mb-2">Categories</h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="all-categories"
                    name="category"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                    checked={!queryParams.category}
                    onChange={() => handleCategoryFilter(undefined)}
                  />
                  <label htmlFor="all-categories" className="ml-2 text-gray-700">
                    All Categories
                  </label>
                </div>
                
                {isLoadingCategories ? (
                  <div className="animate-pulse h-20 bg-gray-200 rounded"></div>
                ) : (
                  categoriesData?.categories.map((category) => (
                    <div key={category.id} className="flex items-center">
                      <input
                        type="radio"
                        id={`category-${category.id}`}
                        name="category"
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                        checked={queryParams.category === category.slug}
                        onChange={() => handleCategoryFilter(category.slug)}
                      />
                      <label htmlFor={`category-${category.id}`} className="ml-2 text-gray-700">
                        {category.name}
                      </label>
                    </div>
                  ))
                )}
              </div>
            </div>
            
            {/* Price range filter */}
            <div>
              <h4 className="font-medium mb-2">Price Range</h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="price-all"
                    name="price"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                    checked={!queryParams.minPrice && !queryParams.maxPrice}
                    onChange={() => handlePriceFilter(undefined, undefined)}
                  />
                  <label htmlFor="price-all" className="ml-2 text-gray-700">
                    All Prices
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="price-under-50"
                    name="price"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                    checked={queryParams.maxPrice === 50}
                    onChange={() => handlePriceFilter(0, 50)}
                  />
                  <label htmlFor="price-under-50" className="ml-2 text-gray-700">
                    Under $50
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="price-50-100"
                    name="price"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                    checked={queryParams.minPrice === 50 && queryParams.maxPrice === 100}
                    onChange={() => handlePriceFilter(50, 100)}
                  />
                  <label htmlFor="price-50-100" className="ml-2 text-gray-700">
                    Rs 1000 - Rs 5000
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="price-100-200"
                    name="price"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                    checked={queryParams.minPrice === 100 && queryParams.maxPrice === 200}
                    onChange={() => handlePriceFilter(100, 200)}
                  />
                  <label htmlFor="price-100-200" className="ml-2 text-gray-700">
                    Rs 5000 - Rs 10000
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="price-over-200"
                    name="price"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                    checked={queryParams.minPrice === 200}
                    onChange={() => handlePriceFilter(200, undefined)}
                  />
                  <label htmlFor="price-over-200" className="ml-2 text-gray-700">
                    Over $200
                  </label>
                </div>
              </div>
            </div>
            
            {/* Other filters */}
            <div>
              <h4 className="font-medium mb-2">Other Filters</h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="featured"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                    checked={queryParams.featured === true}
                    onChange={(e) => setQueryParams(prev => ({ ...prev, featured: e.target.checked ? true : undefined, page: 1 }))}
                  />
                  <label htmlFor="featured" className="ml-2 text-gray-700">
                    Featured Products
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Products grid/list */}
      <div className={viewMode === 'grid' ? 
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : 
        "space-y-4"
      }>
        {productsData?.products.map((product) => (
          <Card key={product.id} className={viewMode === 'list' ? "overflow-hidden" : ""}>
            <div className={viewMode === 'list' ? "flex" : ""}>
              <div className={viewMode === 'list' ? "w-1/3" : ""}>
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className={`w-full ${viewMode === 'grid' ? 'aspect-square' : 'h-full'} object-cover`}
                />
              </div>
              
              <CardBody className={viewMode === 'list' ? "w-2/3" : ""}>
                <h3 className="font-medium text-gray-900 mb-1">{product.name}</h3>
                
                <div className="flex items-baseline mb-2">
                  <span className="text-lg font-bold text-gray-900">
                    ${product.price.toFixed(2)}
                  </span>
                  
                  {product.compareAtPrice && (
                    <span className="ml-2 text-sm text-gray-500 line-through">
                      ${product.compareAtPrice.toFixed(2)}
                    </span>
                  )}
                </div>
                
                {viewMode === 'list' && (
                  <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                )}
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-xs text-gray-600 ml-1">
                      ({product.reviewCount})
                    </span>
                  </div>
                  
                  <Button variant="primary" size="sm">
                    Add to Cart
                  </Button>
                </div>
              </CardBody>
            </div>
          </Card>
        ))}
      </div>
      
      {/* Pagination */}
      {productsData && productsData.total > productsData.limit && (
        <div className="flex justify-center mt-8">
          <div className="flex space-x-1">
            <Button
              variant="outline"
              size="sm"
              disabled={productsData.page === 1}
              onClick={() => handlePageChange(productsData.page - 1)}
            >
              Previous
            </Button>
            
            {[...Array(Math.ceil(productsData.total / productsData.limit))].map((_, i) => (
              <Button
                key={i}
                variant={productsData.page === i + 1 ? "primary" : "outline"}
                size="sm"
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </Button>
            ))}
            
            <Button
              variant="outline"
              size="sm"
              disabled={productsData.page === Math.ceil(productsData.total / productsData.limit)}
              onClick={() => handlePageChange(productsData.page + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};