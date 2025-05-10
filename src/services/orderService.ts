import { Order } from '../types';
import { get, post, put } from './apiClient';

// Types for API responses
export interface OrdersResponse {
  orders: Order[];
  total: number;
  page: number;
  limit: number;
}

export interface OrderResponse {
  order: Order;
}

// Order status update
export interface OrderStatusUpdate {
  status: Order['status'];
}

// Order service functions
export const orderService = {
  // Get all orders (admin) or current user orders (customer)
  getOrders: async (page = 1, limit = 10): Promise<OrdersResponse> => {
    try {
      return await get<OrdersResponse>('/orders', { params: { page, limit } });
    } catch (error) {
      console.error('Error fetching orders:', error);
      // Return mock data in case of error (for development)
      return getMockOrders(page, limit);
    }
  },

  // Get a single order by ID
  getOrder: async (id: string): Promise<OrderResponse> => {
    try {
      return await get<OrderResponse>(`/orders/${id}`);
    } catch (error) {
      console.error(`Error fetching order ${id}:`, error);
      // Return mock data in case of error (for development)
      return getMockOrder(id);
    }
  },

  // Create a new order
  createOrder: async (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<OrderResponse> => {
    try {
      return await post<OrderResponse>('/orders', orderData);
    } catch (error) {
      console.error('Error creating order:', error);
      // For development, simulate order creation with mock data
      return createMockOrder(orderData);
    }
  },

  // Update order status (admin only)
  updateOrderStatus: async (id: string, statusUpdate: OrderStatusUpdate): Promise<OrderResponse> => {
    return await put<OrderResponse>(`/orders/${id}/status`, statusUpdate);
  },

  // Track an order by ID and email (public)
  trackOrder: async (id: string, email: string): Promise<OrderResponse> => {
    try {
      return await get<OrderResponse>(`/orders/track`, { params: { id, email } });
    } catch (error) {
      console.error(`Error tracking order ${id}:`, error);
      // Return mock data in case of error (for development)
      return getMockOrder(id);
    }
  },
};

// Mock data functions for development/fallback
import { orders, cart } from '../data/mockData';

// Mock function to get all orders with pagination
const getMockOrders = (page: number, limit: number): OrdersResponse => {
  // Check if user is admin or customer based on stored user ID
  const userId = localStorage.getItem('user_id');
  const userRole = userId === '3' ? 'admin' : 'customer'; // User ID 3 is admin in mock data
  
  // Filter orders based on user role
  let filteredOrders = [...orders];
  if (userRole === 'customer' && userId) {
    filteredOrders = filteredOrders.filter(o => o.userId === userId);
  }
  
  // Apply pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedOrders = filteredOrders.slice(startIndex, endIndex);
  
  return {
    orders: paginatedOrders,
    total: filteredOrders.length,
    page,
    limit
  };
};

// Mock function to get a single order
const getMockOrder = (id: string): OrderResponse => {
  const order = orders.find(o => o.id === id);
  
  if (!order) {
    throw new Error(`Order with ID ${id} not found`);
  }
  
  // Check if user has access to this order
  const userId = localStorage.getItem('user_id');
  const userRole = userId === '3' ? 'admin' : 'customer';
  
  if (userRole === 'customer' && order.userId !== userId) {
    throw new Error('Unauthorized access to order');
  }
  
  return { order };
};

// Mock function to create a new order
const createMockOrder = (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): OrderResponse => {
  const newOrder: Order = {
    ...orderData,
    id: `order_${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  return { order: newOrder };
};