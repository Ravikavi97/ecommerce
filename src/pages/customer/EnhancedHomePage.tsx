import React, { useState, useCallback, useMemo, memo } from 'react';
import { ChevronRight, Award, Package, Truck, CreditCard, ArrowRight, Star } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { Card, CardImage, CardContent } from '../../components/ui/EnhancedCard';
import EnhancedButton from '../../components/ui/EnhancedButton';
import { products, categories } from '../../data/mockData';

// Memoized category card component for better performance
const CategoryCard = memo(({ category, onClick }: { category: any; onClick: () => void }) => (
  <Card
    className="group relative overflow-hidden cursor-pointer hover-lift"
    onClick={onClick}
    hoverEffect
    elevation="md"
  >
    <div className="p-6">
      <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
        {category.name === 'Electronics' && (
          <div className="w-16 h-16 mx-auto text-primary-600 bg-primary-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 4L4 8L12 12L20 8L12 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4 12L12 16L20 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4 16L12 20L20 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        )}
        {category.name === 'Clothing' && (
          <div className="w-16 h-16 mx-auto text-primary-600 bg-primary-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.38 3.46L16 2L12 5L8 2L3.62 3.46C2.64 3.76 2 4.67 2 5.7V20C2 21.1 2.9 22 4 22H20C21.1 22 22 21.1 22 20V5.7C22 4.67 21.36 3.76 20.38 3.46Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        )}
        {category.name === 'Home & Kitchen' && (
          <div className="w-16 h-16 mx-auto text-primary-600 bg-primary-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 12L5 6H19L21 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 12V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        )}
        {category.name === 'Beauty & Personal Care' && (
          <div className="w-16 h-16 mx-auto text-primary-600 bg-primary-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 21V5C16 3.93913 15.5786 2.92172 14.8284 2.17157C14.0783 1.42143 13.0609 1 12 1C10.9391 1 9.92172 1.42143 9.17157 2.17157C8.42143 2.92172 8 3.93913 8 5V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        )}
      </div>
      <h3 className="text-xl font-medium text-gray-900 text-center mb-2">{category.name}</h3>
      <p className="text-gray-600 text-sm text-center mb-4">{category.description}</p>
      <div className="flex items-center justify-center text-primary-600 text-sm font-medium group-hover:text-primary-700">
        Shop Now <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
      </div>
    </div>
  </Card>
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
      elevation="md"
    >
      <div className="relative">
        {product.compareAtPrice && (
          <div className="absolute top-2 left-2 bg-accent-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
            {Math.round((1 - product.price / product.compareAtPrice) * 100)}% OFF
          </div>
        )}
        {product.featured && (
          <div className="absolute top-2 right-2 bg-primary-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
            Featured
          </div>
        )}
        <CardImage 
          src={product.images[0]} 
          alt={product.name}
          aspectRatio="3:2"
          className="rounded-t-lg"
        />
      </div>
      <CardContent className="p-4 flex-1 flex flex-col">
        <div className="mb-2">
          <span className="text-xs font-medium text-primary-600 uppercase tracking-wider">{product.category}</span>
        </div>
        <h3 className="text-lg font-semibold mb-2 group-hover:text-primary-600 transition-colors">{product.name}</h3>
        <div className="mb-3">
          <StarRating rating={product.rating} reviewCount={product.reviewCount} />
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
            leftIcon={<Package size={16} />}
          >
            Add
          </EnhancedButton>
        </div>
      </CardContent>
    </Card>
  );
});

// Memoized feature card component
const FeatureCard = memo(({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 mb-4">
      {icon}
    </div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>
));

// Memoized testimonial card component
const TestimonialCard = memo(({ name, role, content, avatar }: { name: string; role: string; content: string; avatar: string }) => (
  <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
    <div className="flex items-center mb-4">
      <img src={avatar} alt={name} className="w-12 h-12 rounded-full object-cover mr-4" loading="lazy" />
      <div>
        <h4 className="font-semibold">{name}</h4>
        <p className="text-sm text-gray-600">{role}</p>
      </div>
    </div>
    <p className="text-gray-700 italic mb-4">{content}</p>
    <div className="flex text-yellow-400">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={14}
          fill="currentColor"
          className="text-yellow-400"
        />
      ))}
    </div>
  </div>
));

// Memoized brand logo component
const BrandLogo = memo(({ logo, name }: { logo: string; name: string }) => (
  <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center h-24">
    <img src={logo} alt={name} className="max-h-12 max-w-full" loading="lazy" />
  </div>
));

// Newsletter form with validation
const NewsletterForm = memo(() => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email) {
      setError('Email is required');
      return;
    }
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      setEmail('');
    }, 500);
  };

  return (
    <div className="bg-white rounded-xl p-8 shadow-lg">
      {isSubmitted ? (
        <div className="text-center py-4">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 mx-auto mb-4">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
          <p className="text-gray-600">You've been successfully subscribed to our newsletter.</p>
          <button 
            onClick={() => setIsSubmitted(false)} 
            className="mt-4 text-primary-600 hover:text-primary-700 font-medium"
          >
            Subscribe another email
          </button>
        </div>
      ) : (
        <>
          <h3 className="text-xl font-semibold mb-2">Subscribe to Our Newsletter</h3>
          <p className="text-gray-600 mb-4">Get the latest updates, deals and exclusive offers.</p>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className={`w-full px-4 py-3 rounded-lg border ${error ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-primary-500`}
                  aria-label="Email address"
                />
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              </div>
              <EnhancedButton
                type="submit"
                variant="primary"
                size="lg"
                className="whitespace-nowrap"
              >
                Subscribe
              </EnhancedButton>
            </div>
          </form>
        </>
      )}
    </div>
  );
});

export function EnhancedHomePage() {
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

  // Mock testimonial data
  const testimonials = useMemo(() => [
    {
      id: '1',
      name: 'Sarah Johnson',
      role: 'Verified Customer',
      content: 'The quality of the products exceeded my expectations. Fast shipping and excellent customer service!',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg'
    },
    {
      id: '2',
      name: 'Michael Chen',
      role: 'Verified Customer',
      content: 'I've been shopping here for years and have never been disappointed. The new website makes it even easier to find what I need.',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'
    },
    {
      id: '3',
      name: 'Emma Rodriguez',
      role: 'Verified Customer',
      content: 'The premium wireless headphones I purchased are amazing! The sound quality is outstanding and they're so comfortable.',
      avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg'
    }
  ], []);

  // Mock brand logos
  const brands = useMemo(() => [
    { id: '1', name: 'TechLife', logo: 'https://via.placeholder.com/150x50?text=TechLife' },
    { id: '2', name: 'SoundMaster', logo: 'https://via.placeholder.com/150x50?text=SoundMaster' },
    { id: '3', name: 'Urban Style', logo: 'https://via.placeholder.com/150x50?text=UrbanStyle' },
    { id: '4', name: 'KitchenPro', logo: 'https://via.placeholder.com/150x50?text=KitchenPro' },
    { id: '5', name: 'PureGlow', logo: 'https://via.placeholder.com/150x50?text=PureGlow' },
    { id: '6', name: 'FitTech', logo: 'https://via.placeholder.com/150x50?text=FitTech' },
  ], []);

  const handleCategoryClick = useCallback((category: any) => {
    dispatch({ type: 'SET_SELECTED_CATEGORY', payload: category.name });
    window.history.pushState({}, '', '/products');
    window.dispatchEvent(new PopStateEvent('popstate'));
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
                <EnhancedButton 
                  variant="accent" 
                  size="lg"
                  onClick={() => {
                    window.history.pushState({}, '', '/products');
                    window.dispatchEvent(new PopStateEvent('popstate'));
                  }}
                  rounded="md"
                  className="shadow-lg hover:shadow-xl"
                  rightIcon={<ArrowRight size={16} />}
                >
                  Shop Now
                </EnhancedButton>
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
              onClick={() => handleCategoryClick(category)}
            />
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
              />
            ))}
          </div>
          <div className="text-center mt-12">
            <EnhancedButton 
              variant="outline"
              size="lg"
              onClick={() => {
                window.history.pushState({}, '', '/products');
                window.dispatchEvent(new PopStateEvent('popstate'));
              }}
              rounded="md"
              rightIcon={<ChevronRight size={16} />}
            >
              View All Products
            </EnhancedButton>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Why Choose Us</h2>
        <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">We're committed to providing the best shopping experience with premium products and exceptional service.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard 
            icon={<Award size={24} />}
            title="Premium Quality"
            description="All our products are carefully selected to ensure the highest quality standards."
          />
          <FeatureCard 
            icon={<Package size={24} />}
            title="Free Shipping"
            description="Enjoy free shipping on all orders over $50 within the continental US."
          />
          <FeatureCard 
            icon={<Truck size={24} />}
            title="Fast Delivery"
            description="Get your products delivered within 2-3 business days with our express shipping."
          />
          <FeatureCard 
            icon={<CreditCard size={24} />}
            title="Secure Payment"
            description="Shop with confidence with our secure payment processing system."
          />
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">What Our Customers Say</h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">Don't just take our word for it. Here's what our customers have to say about their shopping experience.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                name={testimonial.name}
                role={testimonial.role}
                content={testimonial.content}
                avatar={testimonial.avatar}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Featured Brands */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Featured Brands</h2>
        <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">We partner with the best brands to bring you premium quality products.</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {brands.map((brand) => (
            <BrandLogo
              key={brand.id}
              logo={brand.logo}
              name={brand.name}
            />
          ))}
        </div>
      </div>

      {/* Newsletter & CTA */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <NewsletterForm />
          </div>
          <div className="bg-primary-600 rounded-xl p-8 text-white shadow-lg flex flex-col justify-center">
            <h3 className="text-2xl font-bold mb-4">Ready to Elevate Your Shopping Experience?</h3>
            <p className="mb-6 opacity-90">Join thousands of satisfied customers who have discovered the perfect products for their lifestyle.</p>
            <div>
              <EnhancedButton
                variant="accent"
                size="lg"
                onClick={() => {
                  window.history.pushState({}, '', '/products');
                  window.dispatchEvent(new PopStateEvent('popstate'));
                }}
                rounded="md"
                className="shadow-md hover:shadow-lg"
                rightIcon={<ArrowRight size={16} />}
              >
                Shop Now
              </EnhancedButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}