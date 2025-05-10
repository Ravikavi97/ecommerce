import React, { useState, useEffect } from 'react';
import { 
  Search, ShoppingCart, User, Menu, X, Heart, 
  ChevronDown, Facebook, Twitter, Instagram, Linkedin, Mail 
} from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { products, categories } from '../data/mockData';

interface CustomerLayoutProps {
  children: React.ReactNode;
  navigateTo: (path: string) => void;
  currentPath: string;
}

export const CustomerLayout: React.FC<CustomerLayoutProps> = ({ 
  children, 
  navigateTo,
  currentPath
}) => {
  const { state, dispatch } = useApp();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle search functionality
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    dispatch({ type: 'SET_SEARCH_QUERY', payload: query });
    
    if (query.trim() === '') {
      dispatch({ type: 'SET_SEARCH_RESULTS', payload: [] });
      return;
    }
    
    const results = products.filter((product) => 
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase())
    );
    
    dispatch({ type: 'SET_SEARCH_RESULTS', payload: results });
  };

  const openAuthModal = () => {
    dispatch({ type: 'TOGGLE_AUTH_MODAL', payload: true });
  };

  const openCart = () => {
    dispatch({ type: 'TOGGLE_CART_DRAWER', payload: true });
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className={`sticky top-0 z-30 w-full transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}>
        {/* Top Bar */}
        <div className="bg-primary-900 text-white px-4 py-2 text-sm">
          <div className="container mx-auto flex justify-between items-center">
            <p>Free shipping on orders over Rs 5000</p>
            <div className="hidden md:flex space-x-4">
              <a 
                onClick={() => navigateTo('/faqs')} 
                className="hover:text-primary-200 transition-colors cursor-pointer"
              >
                Help
              </a>
              <a 
                onClick={() => navigateTo('/track-order')} 
                className="hover:text-primary-200 transition-colors cursor-pointer"
              >
                Track Order
              </a>
              <a 
                onClick={() => navigateTo('/contact')} 
                className="hover:text-primary-200 transition-colors cursor-pointer"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
        
        {/* Main Header */}
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div 
              className="font-bold text-2xl cursor-pointer flex items-center" 
              onClick={() => navigateTo('/')}
            >
              <span className="text-primary-600">White</span>
              <span className="text-gray-800">Label Product</span>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6">
              <a 
                onClick={() => navigateTo('/')} 
                className={`nav-link cursor-pointer ${currentPath === '/' ? 'text-primary-600 font-medium' : 'text-gray-700'}`}
              >
                Home
              </a>
              <div className="relative group">
                <a 
                  onClick={() => navigateTo('/products')} 
                  className={`nav-link flex items-center cursor-pointer ${currentPath === '/products' ? 'text-primary-600 font-medium' : 'text-gray-700'}`}
                >
                  Shop <ChevronDown size={16} className="ml-1" />
                </a>
                <div className="absolute z-20 left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="py-1">
                    {categories.map((category) => (
                      <a 
                        key={category.id} 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => navigateTo('/products')}
                      >
                        {category.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <a 
                onClick={() => navigateTo('/features')} 
                className={`nav-link cursor-pointer ${currentPath.includes('/features') ? 'text-primary-600 font-medium' : 'text-gray-700'}`}
              >
                Featured
              </a>
              {/* <a 
                onClick={() => navigateTo('/features')}
                className={`nav-link ${currentPath === '/features' ? 'text-primary-600 font-medium' : 'text-gray-700'}`}
              >
                Features
              </a> */}
              <a 
                onClick={() => navigateTo('/about')} 
                className={`nav-link cursor-pointer ${currentPath.includes('/about') ? 'text-primary-600 font-medium' : 'text-gray-700'}`}
              >
                  About</a>
              <a 
  onClick={() => navigateTo('/contact')} 
  className={`nav-link cursor-pointer ${currentPath === '/contact' ? 'text-primary-600 font-medium' : 'text-gray-700'}`}
>
  Contact
</a>
            </nav>
            
            {/* Search, Cart, Account */}
            <div className="flex items-center space-x-4">
              <div className={`${isSearchExpanded ? 'w-64' : 'w-10'} transition-all duration-300 flex items-center relative`}>
                {isSearchExpanded && (
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    onChange={handleSearch}
                    value={state.searchQuery}
                    autoFocus
                  />
                )}
                <Search 
                  size={20} 
                  className={`${isSearchExpanded ? 'absolute left-3 text-gray-500' : 'text-gray-700 cursor-pointer'}`}
                  onClick={() => setIsSearchExpanded(!isSearchExpanded)}
                />
                {isSearchExpanded && state.searchResults.length > 0 && (
                  <div className="absolute top-full mt-1 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20">
                    <div className="py-1 max-h-64 overflow-y-auto">
                      {state.searchResults.map((product) => (
                        <div 
                          key={product.id} 
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            navigateTo(`/product/${product.id}`);
                            setIsSearchExpanded(false);
                            dispatch({ type: 'SET_SEARCH_QUERY', payload: '' });
                            dispatch({ type: 'SET_SEARCH_RESULTS', payload: [] });
                          }}
                        >
                          <div className="flex items-center">
                            <img 
                              src={product.images[0]} 
                              alt={product.name} 
                              className="w-10 h-10 object-cover rounded-md"
                            />
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-900">{product.name}</p>
                              <p className="text-sm text-gray-500">${product.price.toFixed(2)}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <Heart size={20} className="text-gray-700 cursor-pointer hidden md:block" onClick={() => {
                // Show login if not authenticated
                if (!state.user) {
                  openAuthModal();
                } else {
                  navigateTo('/account');
                }
              }} />
              
              <div className="relative" onClick={openCart}>
                <ShoppingCart size={20} className="text-gray-700 cursor-pointer" />
                {state.cart.items.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {state.cart.items.reduce((total, item) => total + item.quantity, 0)}
                  </span>
                )}
              </div>
              
              <User 
                size={20} 
                className="text-gray-700 cursor-pointer" 
                onClick={() => {
                  if (!state.user) {
                    openAuthModal();
                  } else {
                    navigateTo('/account');
                  }
                }}
              />
              
              <button 
                className="md:hidden text-gray-700"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center mb-6">
              <div className="font-bold text-2xl">
                <span className="text-primary-600">Luxe</span>
                <span className="text-gray-800">Market</span>
              </div>
              <button onClick={() => setIsMenuOpen(false)}>
                <X size={24} className="text-gray-700" />
              </button>
            </div>
            
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                onChange={handleSearch}
                value={state.searchQuery}
              />
            </div>
            
            <nav className="flex flex-col space-y-4">
              <a 
                onClick={() => {
                  navigateTo('/');
                  setIsMenuOpen(false);
                }} 
                className={`text-lg ${currentPath === '/' ? 'text-primary-600 font-medium' : 'text-gray-700'}`}
              >
                Home
              </a>
              <a 
                onClick={() => {
                  navigateTo('/products');
                  setIsMenuOpen(false);
                }} 
                className={`text-lg ${currentPath === '/products' ? 'text-primary-600 font-medium' : 'text-gray-700'}`}
              >
                Shop
              </a>
              <div className="pl-4 flex flex-col space-y-2">
                {categories.map((category) => (
                  <a 
                    key={category.id} 
                    className="text-gray-600"
                    onClick={() => {
                      navigateTo('/products');
                      setIsMenuOpen(false);
                    }}
                  >
                    {category.name}
                  </a>
                ))}
              </div>
              <a 
                onClick={() => {
                  navigateTo('/products');
                  setIsMenuOpen(false);
                }} 
                className="text-lg text-gray-700"
              >
                Featured
              </a>
              <a 
  onClick={() => navigateTo('/about')} 
  className="text-lg text-gray-700 hover:text-primary-600"
>
  About
</a>
              <a 
                onClick={() => {
                  navigateTo('/contact');
                  setIsMenuOpen(false);
                }} 
                className="text-lg text-gray-700 cursor-pointer"
              >
                Contact
              </a>
              <a 
                onClick={() => {
                  navigateTo('/faqs');
                  setIsMenuOpen(false);
                }} 
                className="text-lg text-gray-700 cursor-pointer"
              >
                FAQs
              </a>
              <a 
                onClick={() => {
                  navigateTo('/shipping-returns');
                  setIsMenuOpen(false);
                }} 
                className="text-lg text-gray-700 cursor-pointer"
              >
                Shipping & Returns
              </a>
              <a 
                onClick={() => {
                  navigateTo('/privacy-policy');
                  setIsMenuOpen(false);
                }} 
                className="text-lg text-gray-700 cursor-pointer"
              >
                Privacy Policy
              </a>
              <a 
                onClick={() => {
                  navigateTo('/terms-conditions');
                  setIsMenuOpen(false);
                }} 
                className="text-lg text-gray-700 cursor-pointer"
              >
                Terms & Conditions
              </a>
              <a 
                onClick={() => {
                  if (!state.user) {
                    openAuthModal();
                  } else {
                    navigateTo('/account');
                  }
                  setIsMenuOpen(false);
                }} 
                className="text-lg text-gray-700 cursor-pointer"
              >
                My Account
              </a>
            </nav>
          </div>
        </div>
      )}
      
      {/* Main Content */}
      <main className="flex-grow">{children}</main>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        {/* Newsletter */}
        {/* <div className="bg-primary-800 py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-xl mx-auto text-center">
              <h3 className="text-2xl font-semibold mb-2">Subscribe to our newsletter</h3>
              <p className="text-primary-100 mb-6">Stay updated with our latest products and offers</p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-grow px-4 py-3 rounded-md text-gray-900 focus:outline-none"
                />
                <button className="bg-accent-500 text-white px-6 py-3 rounded-md font-medium hover:bg-accent-600 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div> */}
        
        {/* Footer Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h4 className="font-bold text-xl mb-6">
                <span className="text-primary-400">Luxe</span>Market
              </h4>
              <p className="text-gray-400 mb-6">
                Your premium shopping destination for high-quality products. Discover the best in fashion, electronics, home goods, and more.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Facebook size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Instagram size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-lg mb-6">Shop</h4>
              <ul className="space-y-3">
                {categories.map((category) => (
                  <li key={category.id}>
                    <a 
                      className="text-gray-400 hover:text-white transition-colors"
                      onClick={() => navigateTo('/products')}
                    >
                      {category.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-lg mb-6">Customer Service</h4>
              <ul className="space-y-3">
                <li><a onClick={() => navigateTo('/contact')} className="text-gray-400 hover:text-white transition-colors cursor-pointer">Contact Us</a></li>
                <li><a onClick={() => navigateTo('/faqs')} className="text-gray-400 hover:text-white transition-colors cursor-pointer">FAQs</a></li>
                <li><a onClick={() => navigateTo('/shipping-returns')} className="text-gray-400 hover:text-white transition-colors cursor-pointer">Shipping & Returns</a></li>
                <li><a onClick={() => navigateTo('/track-order')} className="text-gray-400 hover:text-white transition-colors cursor-pointer">Order Tracking</a></li>
                <li><a onClick={() => navigateTo('/privacy-policy')} className="text-gray-400 hover:text-white transition-colors cursor-pointer">Privacy Policy</a></li>
                <li><a onClick={() => navigateTo('/terms-conditions')} className="text-gray-400 hover:text-white transition-colors cursor-pointer">Terms & Conditions</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-lg mb-6">Contact</h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Mail size={18} className="mr-2 mt-1 text-primary-400" />
                  <span className="text-gray-400">support@luxemarket.com</span>
                </li>
                <li className="text-gray-400">
                  1234 Market Street<br />
                  San Francisco, CA 94103<br />
                  United States
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-800 py-6">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-500 text-sm">
                © {new Date().getFullYear()} LuxeMarket. All rights reserved.
              </p>
              <div className="flex space-x-4 mt-4 md:mt-0">
                <img src="https://images.pexels.com/photos/5076516/pexels-photo-5076516.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=40" alt="Payment methods" className="h-6" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};