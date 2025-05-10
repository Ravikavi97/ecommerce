import React, { useMemo, useCallback, memo } from 'react';
import { ChevronRight, Award, Package, Truck, CreditCard } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { products, categories } from '../../data/mockData';

// Memoized category card component for better performance
const CategoryCard = memo(({ category, onClick }) => (
  <div 
    className="group relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
    onClick={onClick}
    role="button"
    aria-label={`Browse ${category.name} category`}
  >
    <div className="p-6">
      <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
        {category.name === 'Electronics' && (
          <svg className="w-16 h-16 mx-auto text-primary-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 4L4 8L12 12L20 8L12 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M4 12L12 16L20 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M4 16L12 20L20 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
        {category.name === 'Clothing' && (
          <svg className="w-16 h-16 mx-auto text-primary-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.38 3.46L16 2L12 5L8 2L3.62 3.46C2.64 3.76 2 4.67 2 5.7V20C2 21.1 2.9 22 4 22H20C21.1 22 22 21.1 22 20V5.7C22 4.67 21.36 3.76 20.38 3.46Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
        {category.name === 'Home & Kitchen' && (
          <svg className="w-16 h-16 mx-auto text-primary-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 12L5 6H19L21 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3 12V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
        {category.name === 'Beauty & Personal Care' && (
          <svg className="w-16 h-16 mx-auto text-primary-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 21V5C16 3.93913 15.5786 2.92172 14.8284 2.17157C14.0783 1.42143 13.0609 1 12 1C10.9391 1 9.92172 1.42143 9.17157 2.17157C8.42143 2.92172 8 3.93913 8 5V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </div>
      <h3 className="text-xl font-medium text-gray-900 text-center mb-2">{category.name}</h3>
      <p className="text-gray-600 text-sm text-center mb-4">{category.description}</p>
      <div className="flex items-center justify-center text-primary-600 text-sm font-medium group-hover:text-primary-700">
        Shop Now <ChevronRight className="h-4 w-4 ml-1" />
      </div>
    </div>
  </div>
));

// Memoized product card component
const ProductCard = memo(({ product, onAddToCart }) => (
  <Card className="overflow-hidden group">
    <div className="h-64 overflow-hidden">
      <img
        src={product.images[0]}
        alt={product.name}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
      />
    </div>
    <div className="p-4">
      <h3 className="text-lg font-medium text-gray-900 mb-2">{product.name}</h3>
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-sm text-gray-500 ml-1">({product.reviewCount})</span>
        </div>
        <div>
          {product.compareAtPrice && (
            <span className="line-through text-sm text-gray-500 mr-2">
              ${product.compareAtPrice.toFixed(2)}
            </span>
          )}
          <span className="text-lg font-medium text-gray-900">${product.price.toFixed(2)}</span>
        </div>
      </div>
      <Button 
        variant="primary"
        fullWidth
        onClick={() => onAddToCart(product.id)}
      >
        Add to Cart
      </Button>
    </div>
  </Card>
));

export const HomePage: React.FC = () => {
  const { dispatch } = useApp();

  // Memoize featured products to prevent unnecessary recalculation
  const featuredProducts = useMemo(() => products.filter(product => product.featured), []);
  
  // Memoize addToCart function to prevent unnecessary re-renders
  const addToCart = useCallback((productId: string) => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: { productId, quantity: 1 }
    });
    // Open cart drawer after adding item
    dispatch({ type: 'TOGGLE_CART_DRAWER', payload: true });
  }, [dispatch]);

  return (
    <div className="mb-12">
      {/* Hero Banner */}
      <div className="relative">
        <div className="bg-gray-900 h-[600px] flex items-center">
          <div className="absolute inset-0 overflow-hidden">
            <img
              src="https://images.pexels.com/photos/6347535/pexels-photo-6347535.jpeg"
              alt="Hero"
              className="w-full h-full object-cover opacity-60"
              loading="eager"
              fetchPriority="high"
            />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-lg">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-slide-up">
                Discover Premium Quality Products
              </h1>
              <p className="text-lg text-white opacity-90 mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                Explore our carefully curated collection of premium products for every aspect of your lifestyle.
              </p>
              <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
                <Button 
                  variant="accent" 
                  size="lg"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = '/products';
                  }}
                  role="link"
                  aria-label="Shop Now - Browse all products"
                >
                  Shop Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onClick={(e) => {
                e.preventDefault();
                dispatch({ type: 'SET_SELECTED_CATEGORY', payload: category.name });
                window.location.href = '/products';
              }}
            />
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
              />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button 
              variant="outline"
              size="lg"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = '/products';
              }}
              role="link"
              aria-label="View all products"
            >
              View All Products
            </Button>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="bg-primary-50 p-4 rounded-full inline-block mb-4">
              <Award className="h-8 w-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">Premium Quality</h3>
            <p className="text-gray-600">
              We source the highest quality products to ensure your satisfaction.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-primary-50 p-4 rounded-full inline-block mb-4">
              <Package className="h-8 w-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">Secure Packaging</h3>
            <p className="text-gray-600">
              Products are carefully packaged to ensure safe delivery.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-primary-50 p-4 rounded-full inline-block mb-4">
              <Truck className="h-8 w-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">Fast Shipping</h3>
            <p className="text-gray-600">
              We offer quick and reliable shipping options worldwide.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-primary-50 p-4 rounded-full inline-block mb-4">
              <CreditCard className="h-8 w-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">Secure Payments</h3>
            <p className="text-gray-600">
              Multiple secure payment options for your convenience.
            </p>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "I'm amazed by the quality of products I received. The customer service was exceptional and delivery was faster than expected!"
              </p>
              <div className="flex items-center">
                <img
                  src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
                  alt="Customer"
                  className="h-10 w-10 rounded-full mr-4"
                  loading="lazy"
                />
                <div>
                  <h4 className="font-medium text-gray-900">Robert Johnson</h4>
                  <p className="text-sm text-gray-500">Loyal Customer</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "The product exceeded my expectations. The design is elegant and the functionality is perfect for my needs. Highly recommend LuxeMarket!"
              </p>
              <div className="flex items-center">
                <img
                  src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg"
                  alt="Customer"
                  className="h-10 w-10 rounded-full mr-4"
                  loading="lazy"
                />
                <div>
                  <h4 className="font-medium text-gray-900">Sarah Williams</h4>
                  <p className="text-sm text-gray-500">Happy Customer</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "I've been shopping at LuxeMarket for over a year now, and I'm consistently impressed by their product quality and customer service."
              </p>
              <div className="flex items-center">
                <img
                  src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg"
                  alt="Customer"
                  className="h-10 w-10 rounded-full mr-4"
                  loading="lazy"
                />
                <div>
                  <h4 className="font-medium text-gray-900">David Chen</h4>
                  <p className="text-sm text-gray-500">Repeat Customer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-primary-900 rounded-xl overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 p-8 md:p-12 lg:p-16">
              <h2 className="text-3xl font-bold text-white mb-4">Join Our Community</h2>
              <p className="text-primary-100 mb-8 max-w-md">
                Subscribe to our newsletter to receive exclusive offers, latest product updates, and special discounts.
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-grow px-4 py-3 rounded-md text-gray-900 focus:outline-none"
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  required
                  aria-label="Email address for newsletter"
                  autoComplete="email"
                />
                <Button variant="accent" size="lg">
                  Subscribe
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 bg-primary-800 relative">
              <img
                src="https://images.pexels.com/photos/7679863/pexels-photo-7679863.jpeg"
                alt="Newsletter"
                className="w-full h-full object-cover object-center opacity-50"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};