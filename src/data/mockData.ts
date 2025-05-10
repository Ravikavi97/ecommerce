import { Product, Category, User, Cart, Order, Review, DashboardStats } from '../types';

// Mock Categories
export const categories: Category[] = [
  {
    id: '1',
    name: 'Electronics',
    description: 'Latest electronic devices and gadgets',
    image: 'https://images.pexels.com/photos/3178938/pexels-photo-3178938.jpeg',
    slug: 'electronics'
  },
  {
    id: '2',
    name: 'Clothing',
    description: 'Trendy apparel for all seasons',
    image: 'https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg',
    slug: 'clothing'
  },
  {
    id: '3',
    name: 'Home & Kitchen',
    description: 'Everything you need for your home',
    image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg',
    slug: 'home-kitchen'
  },
  {
    id: '4',
    name: 'Beauty & Personal Care',
    description: 'Self-care products and cosmetics',
    image: 'https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg',
    slug: 'beauty-personal-care'
  }
];

// Mock Products
export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    description: 'High-quality sound with noise cancellation technology.',
    price: 199.99,
    compareAtPrice: 249.99,
    images: [
      'https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg',
      'https://images.pexels.com/photos/8534088/pexels-photo-8534088.jpeg'
    ],
    category: 'Electronics',
    brand: 'SoundMaster',
    inStock: true,
    sku: 'SM-WH-001',
    rating: 4.8,
    reviewCount: 124,
    featured: true,
    tags: ['wireless', 'headphones', 'audio', 'premium'],
    createdAt: '2025-01-15T10:30:00Z',
    updatedAt: '2025-03-20T15:45:00Z'
  },
  {
    id: '2',
    name: 'Slim Fit Casual T-Shirt',
    description: 'Comfortable cotton t-shirt for everyday wear.',
    price: 29.99,
    images: [
      'https://images.pexels.com/photos/5872361/pexels-photo-5872361.jpeg',
      'https://images.pexels.com/photos/5709665/pexels-photo-5709665.jpeg'
    ],
    category: 'Clothing',
    brand: 'Urban Style',
    inStock: true,
    sku: 'US-TS-101',
    rating: 4.5,
    reviewCount: 89,
    featured: false,
    tags: ['t-shirt', 'casual', 'cotton', 'men'],
    createdAt: '2025-02-10T09:15:00Z',
    updatedAt: '2025-03-15T11:20:00Z'
  },
  {
    id: '3',
    name: 'Smart Home Assistant',
    description: 'Voice-controlled smart assistant for your home.',
    price: 129.99,
    compareAtPrice: 149.99,
    images: [
      'https://images.pexels.com/photos/4790255/pexels-photo-4790255.jpeg',
      'https://images.pexels.com/photos/3785927/pexels-photo-3785927.jpeg'
    ],
    category: 'Electronics',
    brand: 'TechLife',
    inStock: true,
    sku: 'TL-SHA-201',
    rating: 4.7,
    reviewCount: 156,
    featured: true,
    tags: ['smart home', 'assistant', 'voice control', 'tech'],
    createdAt: '2025-01-05T14:45:00Z',
    updatedAt: '2025-03-10T16:30:00Z'
  },
  {
    id: '4',
    name: 'Stainless Steel Cookware Set',
    description: 'Complete 10-piece cookware set for your kitchen.',
    price: 199.99,
    compareAtPrice: 249.99,
    images: [
      'https://images.pexels.com/photos/6996204/pexels-photo-6996204.jpeg',
      'https://images.pexels.com/photos/6996202/pexels-photo-6996202.jpeg'
    ],
    category: 'Home & Kitchen',
    brand: 'KitchenPro',
    inStock: true,
    sku: 'KP-CS-301',
    rating: 4.6,
    reviewCount: 75,
    featured: false,
    tags: ['cookware', 'kitchen', 'stainless steel', 'set'],
    createdAt: '2025-02-20T12:10:00Z',
    updatedAt: '2025-03-25T09:45:00Z'
  },
  {
    id: '5',
    name: 'Natural Facial Cleanser',
    description: 'Gentle formula with natural ingredients for all skin types.',
    price: 24.99,
    images: [
      'https://images.pexels.com/photos/5069438/pexels-photo-5069438.jpeg',
      'https://images.pexels.com/photos/6812457/pexels-photo-6812457.jpeg'
    ],
    category: 'Beauty & Personal Care',
    brand: 'PureGlow',
    inStock: true,
    sku: 'PG-FC-401',
    rating: 4.4,
    reviewCount: 62,
    featured: false,
    tags: ['skincare', 'cleanser', 'natural', 'facial'],
    createdAt: '2025-03-01T10:20:00Z',
    updatedAt: '2025-03-28T14:15:00Z'
  },
  {
    id: '6',
    name: 'Fitness Tracker Watch',
    description: 'Monitor your health and activity with this smart fitness tracker.',
    price: 89.99,
    compareAtPrice: 109.99,
    images: [
      'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg',
      'https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg'
    ],
    category: 'Electronics',
    brand: 'FitTech',
    inStock: true,
    sku: 'FT-FTW-501',
    rating: 4.6,
    reviewCount: 118,
    featured: true,
    tags: ['fitness', 'tracker', 'watch', 'health'],
    createdAt: '2025-01-25T16:40:00Z',
    updatedAt: '2025-03-18T13:50:00Z'
  }
];

// Mock Users
export const users: User[] = [
  {
    id: '1',
    email: 'john.doe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    role: 'customer',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    createdAt: '2025-01-10T08:30:00Z'
  },
  {
    id: '2',
    email: 'jane.smith@example.com',
    firstName: 'Jane',
    lastName: 'Smith',
    role: 'customer',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
    createdAt: '2025-01-15T14:45:00Z'
  },
  {
    id: '3',
    email: 'admin@luxemarket.com',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
    avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg',
    createdAt: '2024-12-05T10:15:00Z'
  }
];

// Mock Cart
export const cart: Cart = {
  id: '1',
  userId: '1',
  items: [
    {
      id: '1',
      productId: '1',
      product: products[0],
      quantity: 1
    },
    {
      id: '2',
      productId: '3',
      product: products[2],
      quantity: 2
    }
  ],
  subtotal: 459.97,
  tax: 36.80,
  shipping: 10.00,
  total: 506.77,
  createdAt: '2025-03-28T09:45:00Z',
  updatedAt: '2025-03-28T09:45:00Z'
};

// Mock Orders
export const orders: Order[] = [
  {
    id: '1',
    userId: '1',
    items: [
      {
        id: '1',
        productId: '1',
        product: products[0],
        quantity: 1
      },
      {
        id: '2',
        productId: '4',
        product: products[3],
        quantity: 1
      }
    ],
    status: 'delivered',
    subtotal: 399.98,
    tax: 32.00,
    shipping: 10.00,
    total: 441.98,
    shippingAddress: {
      firstName: 'John',
      lastName: 'Doe',
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'United States',
      phone: '123-456-7890'
    },
    billingAddress: {
      firstName: 'John',
      lastName: 'Doe',
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'United States',
      phone: '123-456-7890'
    },
    paymentMethod: 'Credit Card',
    paymentStatus: 'paid',
    createdAt: '2025-03-01T14:30:00Z',
    updatedAt: '2025-03-05T10:15:00Z'
  },
  {
    id: '2',
    userId: '2',
    items: [
      {
        id: '1',
        productId: '2',
        product: products[1],
        quantity: 2
      },
      {
        id: '2',
        productId: '5',
        product: products[4],
        quantity: 1
      }
    ],
    status: 'shipped',
    subtotal: 84.97,
    tax: 6.80,
    shipping: 5.00,
    total: 96.77,
    shippingAddress: {
      firstName: 'Jane',
      lastName: 'Smith',
      street: '456 Elm St',
      city: 'Los Angeles',
      state: 'CA',
      postalCode: '90001',
      country: 'United States',
      phone: '987-654-3210'
    },
    billingAddress: {
      firstName: 'Jane',
      lastName: 'Smith',
      street: '456 Elm St',
      city: 'Los Angeles',
      state: 'CA',
      postalCode: '90001',
      country: 'United States',
      phone: '987-654-3210'
    },
    paymentMethod: 'PayPal',
    paymentStatus: 'paid',
    createdAt: '2025-03-15T09:45:00Z',
    updatedAt: '2025-03-18T16:20:00Z'
  }
];

// Mock Reviews
export const reviews: Review[] = [
  {
    id: '1',
    productId: '1',
    userId: '1',
    userName: 'John D.',
    rating: 5,
    comment: 'Excellent sound quality and comfortable to wear for long periods. The noise cancellation works great!',
    createdAt: '2025-03-10T15:30:00Z'
  },
  {
    id: '2',
    productId: '1',
    userId: '2',
    userName: 'Jane S.',
    rating: 4,
    comment: 'Very good headphones. Battery life is impressive, but they\'re a bit tight on my head.',
    createdAt: '2025-03-12T11:45:00Z'
  },
  {
    id: '3',
    productId: '3',
    userId: '1',
    userName: 'John D.',
    rating: 5,
    comment: 'This smart assistant is a game changer! Easy to set up and very responsive to voice commands.',
    createdAt: '2025-03-05T09:20:00Z'
  }
];

// Mock Dashboard Stats
export const dashboardStats: DashboardStats = {
  totalSales: 15879.45,
  totalOrders: 124,
  totalCustomers: 89,
  averageOrderValue: 128.06,
  pendingOrders: 12,
  lowStockProducts: 5
};