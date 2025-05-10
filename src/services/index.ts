// Export all services for easy imports
export * from './apiClient';
export * from './productService';
export * from './userService';
export * from './orderService';
export * from './cartService';

// React Query configuration
import { QueryClient } from '@tanstack/react-query';

// Create a client
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});