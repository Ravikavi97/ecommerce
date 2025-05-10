import { User, Address } from '../types';
import { get, post, put, del } from './apiClient';

// Types for API responses
export interface AuthResponse {
  user: User;
  token: string;
}

export interface UserResponse {
  user: User;
}

export interface UsersResponse {
  users: User[];
  total: number;
  page: number;
  limit: number;
}

export interface AddressResponse {
  address: Address;
}

export interface AddressesResponse {
  addresses: Address[];
}

// Login credentials
export interface LoginCredentials {
  email: string;
  password: string;
}

// Registration data
export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

// User service functions
export const userService = {
  // Authentication
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
      return await post<AuthResponse>('/auth/login', credentials);
    } catch (error) {
      console.error('Login error:', error);
      // For development, return mock data
      return getMockAuthResponse(credentials.email);
    }
  },

  register: async (userData: RegisterData): Promise<AuthResponse> => {
    try {
      return await post<AuthResponse>('/auth/register', userData);
    } catch (error) {
      console.error('Registration error:', error);
      // For development, return mock data
      return getMockAuthResponse(userData.email, userData);
    }
  },

  logout: async (): Promise<void> => {
    localStorage.removeItem('auth_token');
    return Promise.resolve();
  },

  // Current user
  getCurrentUser: async (): Promise<UserResponse> => {
    try {
      return await get<UserResponse>('/users/me');
    } catch (error) {
      console.error('Error fetching current user:', error);
      // For development, return mock data based on stored token
      return getMockCurrentUser();
    }
  },

  updateCurrentUser: async (userData: Partial<User>): Promise<UserResponse> => {
    return await put<UserResponse>('/users/me', userData);
  },

  // User management (admin only)
  getUsers: async (page = 1, limit = 10): Promise<UsersResponse> => {
    try {
      return await get<UsersResponse>('/users', { params: { page, limit } });
    } catch (error) {
      console.error('Error fetching users:', error);
      // For development, return mock data
      return getMockUsers(page, limit);
    }
  },

  getUser: async (id: string): Promise<UserResponse> => {
    try {
      return await get<UserResponse>(`/users/${id}`);
    } catch (error) {
      console.error(`Error fetching user ${id}:`, error);
      // For development, return mock data
      return getMockUser(id);
    }
  },

  // Address management
  getUserAddresses: async (): Promise<AddressesResponse> => {
    try {
      return await get<AddressesResponse>('/users/me/addresses');
    } catch (error) {
      console.error('Error fetching addresses:', error);
      // For development, return empty addresses array
      return { addresses: [] };
    }
  },

  addAddress: async (address: Omit<Address, 'id'>): Promise<AddressResponse> => {
    return await post<AddressResponse>('/users/me/addresses', address);
  },

  updateAddress: async (id: string, address: Partial<Address>): Promise<AddressResponse> => {
    return await put<AddressResponse>(`/users/me/addresses/${id}`, address);
  },

  deleteAddress: async (id: string): Promise<void> => {
    return await del<void>(`/users/me/addresses/${id}`);
  },

  setDefaultAddress: async (id: string): Promise<void> => {
    return await post<void>(`/users/me/addresses/${id}/default`);
  },
};

// Mock data functions for development/fallback
import { users } from '../data/mockData';

// Mock function to simulate authentication
const getMockAuthResponse = (email: string, userData?: RegisterData): AuthResponse => {
  // Find existing user or create a new one for registration
  let user = users.find(u => u.email === email);
  
  if (!user && userData) {
    // Create a new user for registration
    user = {
      id: `user_${Date.now()}`,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      role: 'customer',
      createdAt: new Date().toISOString(),
    };
  }
  
  if (!user) {
    throw new Error('Invalid credentials');
  }
  
  // Generate a fake token
  const token = `mock_token_${user.id}_${Date.now()}`;
  
  // Store the token and user ID in localStorage for the mock implementation
  localStorage.setItem('auth_token', token);
  localStorage.setItem('user_id', user.id);
  
  return { user, token };
};

// Mock function to get current user
const getMockCurrentUser = (): UserResponse => {
  const userId = localStorage.getItem('user_id');
  
  if (!userId) {
    throw new Error('Not authenticated');
  }
  
  const user = users.find(u => u.id === userId);
  
  if (!user) {
    throw new Error('User not found');
  }
  
  return { user };
};

// Mock function to get all users with pagination
const getMockUsers = (page: number, limit: number): UsersResponse => {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedUsers = users.slice(startIndex, endIndex);
  
  return {
    users: paginatedUsers,
    total: users.length,
    page,
    limit
  };
};

// Mock function to get a single user
const getMockUser = (id: string): UserResponse => {
  const user = users.find(u => u.id === id);
  
  if (!user) {
    throw new Error(`User with ID ${id} not found`);
  }
  
  return { user };
};