import { Cart, CartItem, Product } from '../types';
import { get, post, put, del } from './apiClient';

// Types for API responses
export interface CartResponse {
  cart: Cart;
}

// Cart item data for adding to cart
export interface AddToCartData {
  productId: string;
  quantity: number;
}

// Cart item update data
export interface UpdateCartItemData {
  quantity: number;
}

// Cart service functions
export const cartService = {
  // Get current cart
  getCart: async (): Promise<CartResponse> => {
    try {
      return await get<CartResponse>('/cart');
    } catch (error) {
      console.error('Error fetching cart:', error);
      // Return mock data in case of error (for development)
      return getMockCart();
    }
  },

  // Add item to cart
  addToCart: async (item: AddToCartData): Promise<CartResponse> => {
    try {
      return await post<CartResponse>('/cart/items', item);
    } catch (error) {
      console.error('Error adding item to cart:', error);
      // For development, simulate adding to cart with mock data
      return addItemToMockCart(item);
    }
  },

  // Update cart item quantity
  updateCartItem: async (itemId: string, data: UpdateCartItemData): Promise<CartResponse> => {
    try {
      return await put<CartResponse>(`/cart/items/${itemId}`, data);
    } catch (error) {
      console.error(`Error updating cart item ${itemId}:`, error);
      // For development, simulate updating cart with mock data
      return updateMockCartItem(itemId, data);
    }
  },

  // Remove item from cart
  removeFromCart: async (itemId: string): Promise<CartResponse> => {
    try {
      return await del<CartResponse>(`/cart/items/${itemId}`);
    } catch (error) {
      console.error(`Error removing item ${itemId} from cart:`, error);
      // For development, simulate removing from cart with mock data
      return removeItemFromMockCart(itemId);
    }
  },

  // Clear cart
  clearCart: async (): Promise<CartResponse> => {
    try {
      return await del<CartResponse>('/cart/items');
    } catch (error) {
      console.error('Error clearing cart:', error);
      // For development, simulate clearing cart with mock data
      return clearMockCart();
    }
  },

  // Apply coupon code
  applyCoupon: async (code: string): Promise<CartResponse> => {
    return await post<CartResponse>('/cart/coupon', { code });
  },

  // Remove coupon
  removeCoupon: async (): Promise<CartResponse> => {
    return await del<CartResponse>('/cart/coupon');
  },
};

// Mock data functions for development/fallback
import { cart as mockCart, products } from '../data/mockData';

// In-memory cart for mock operations
let currentMockCart: Cart = { ...mockCart };

// Calculate cart totals
const calculateCartTotals = (items: CartItem[]): Pick<Cart, 'subtotal' | 'tax' | 'shipping' | 'total'> => {
  const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const tax = subtotal * 0.08; // 8% tax rate
  const shipping = subtotal > 100 ? 0 : 10; // Free shipping over $100
  
  return {
    subtotal,
    tax,
    shipping,
    total: subtotal + tax + shipping
  };
};

// Mock function to get current cart
const getMockCart = (): CartResponse => {
  return { cart: currentMockCart };
};

// Mock function to add item to cart
const addItemToMockCart = (item: AddToCartData): CartResponse => {
  const { productId, quantity } = item;
  
  // Find product
  const product = products.find(p => p.id === productId);
  if (!product) {
    throw new Error(`Product with ID ${productId} not found`);
  }
  
  // Check if item already exists in cart
  const existingItemIndex = currentMockCart.items.findIndex(i => i.productId === productId);
  
  if (existingItemIndex >= 0) {
    // Update quantity if item exists
    currentMockCart.items[existingItemIndex].quantity += quantity;
  } else {
    // Add new item if it doesn't exist
    const newItem: CartItem = {
      id: `item_${Date.now()}`,
      productId,
      product,
      quantity
    };
    currentMockCart.items.push(newItem);
  }
  
  // Recalculate totals
  const totals = calculateCartTotals(currentMockCart.items);
  currentMockCart = {
    ...currentMockCart,
    ...totals,
    updatedAt: new Date().toISOString()
  };
  
  return { cart: currentMockCart };
};

// Mock function to update cart item
const updateMockCartItem = (itemId: string, data: UpdateCartItemData): CartResponse => {
  const { quantity } = data;
  
  // Find item in cart
  const itemIndex = currentMockCart.items.findIndex(i => i.id === itemId);
  
  if (itemIndex < 0) {
    throw new Error(`Cart item with ID ${itemId} not found`);
  }
  
  if (quantity <= 0) {
    // Remove item if quantity is 0 or negative
    currentMockCart.items.splice(itemIndex, 1);
  } else {
    // Update quantity
    currentMockCart.items[itemIndex].quantity = quantity;
  }
  
  // Recalculate totals
  const totals = calculateCartTotals(currentMockCart.items);
  currentMockCart = {
    ...currentMockCart,
    ...totals,
    updatedAt: new Date().toISOString()
  };
  
  return { cart: currentMockCart };
};

// Mock function to remove item from cart
const removeItemFromMockCart = (itemId: string): CartResponse => {
  // Find item in cart
  const itemIndex = currentMockCart.items.findIndex(i => i.id === itemId);
  
  if (itemIndex < 0) {
    throw new Error(`Cart item with ID ${itemId} not found`);
  }
  
  // Remove item
  currentMockCart.items.splice(itemIndex, 1);
  
  // Recalculate totals
  const totals = calculateCartTotals(currentMockCart.items);
  currentMockCart = {
    ...currentMockCart,
    ...totals,
    updatedAt: new Date().toISOString()
  };
  
  return { cart: currentMockCart };
};

// Mock function to clear cart
const clearMockCart = (): CartResponse => {
  // Reset cart items
  currentMockCart.items = [];
  
  // Recalculate totals
  const totals = calculateCartTotals([]);
  currentMockCart = {
    ...currentMockCart,
    ...totals,
    updatedAt: new Date().toISOString()
  };
  
  return { cart: currentMockCart };
};