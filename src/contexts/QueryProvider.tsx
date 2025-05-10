import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from '../services';

interface QueryProviderProps {
  children: React.ReactNode;
}

/**
 * QueryProvider component that wraps the application with React Query's QueryClientProvider
 * and includes the ReactQueryDevtools in development mode.
 */
export const QueryProvider: React.FC<QueryProviderProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* Only show React Query Devtools in development */}
      {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
};

/**
 * Custom hooks for data fetching using the API services
 * These hooks can be imported and used in components to fetch data
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productService, ProductQueryParams } from '../services/productService';
import { userService, LoginCredentials, RegisterData } from '../services/userService';
import { orderService } from '../services/orderService';
import { cartService, AddToCartData, UpdateCartItemData } from '../services/cartService';

// Product hooks
export const useProducts = (params?: ProductQueryParams) => {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => productService.getProducts(params),
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => productService.getProduct(id),
    enabled: !!id,
  });
};

export const useProductReviews = (productId: string, page = 1, limit = 5) => {
  return useQuery({
    queryKey: ['productReviews', productId, page, limit],
    queryFn: () => productService.getProductReviews(productId, page, limit),
    enabled: !!productId,
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => productService.getCategories(),
  });
};

// User hooks
export const useCurrentUser = () => {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: () => userService.getCurrentUser(),
    retry: false,
    onError: () => {
      // Clear token if user fetch fails
      localStorage.removeItem('auth_token');
    },
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (credentials: LoginCredentials) => userService.login(credentials),
    onSuccess: (data) => {
      // Store token in localStorage
      localStorage.setItem('auth_token', data.token);
      // Invalidate current user query to refetch
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    },
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (userData: RegisterData) => userService.register(userData),
    onSuccess: (data) => {
      // Store token in localStorage
      localStorage.setItem('auth_token', data.token);
      // Invalidate current user query to refetch
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: () => userService.logout(),
    onSuccess: () => {
      // Clear all queries from cache
      queryClient.clear();
    },
  });
};

// Order hooks
export const useOrders = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ['orders', page, limit],
    queryFn: () => orderService.getOrders(page, limit),
  });
};

export const useOrder = (id: string) => {
  return useQuery({
    queryKey: ['order', id],
    queryFn: () => orderService.getOrder(id),
    enabled: !!id,
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: orderService.createOrder,
    onSuccess: () => {
      // Invalidate orders query to refetch
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      // Clear cart after successful order
      cartService.clearCart();
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};

// Cart hooks
export const useCart = () => {
  return useQuery({
    queryKey: ['cart'],
    queryFn: () => cartService.getCart(),
  });
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (item: AddToCartData) => cartService.addToCart(item),
    onSuccess: () => {
      // Invalidate cart query to refetch
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};

export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ itemId, data }: { itemId: string; data: UpdateCartItemData }) => 
      cartService.updateCartItem(itemId, data),
    onSuccess: () => {
      // Invalidate cart query to refetch
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (itemId: string) => cartService.removeFromCart(itemId),
    onSuccess: () => {
      // Invalidate cart query to refetch
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};

export const useClearCart = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: () => cartService.clearCart(),
    onSuccess: () => {
      // Invalidate cart query to refetch
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};