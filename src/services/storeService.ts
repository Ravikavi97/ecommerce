import { Store } from '../types';
import { get, post, put, del } from './apiClient';

// Types for API responses
export interface StoreResponse {
  store: Store;
}

export interface StoresResponse {
  stores: Store[];
  total: number;
  page: number;
  limit: number;
}

// Store creation data
export interface CreateStoreData {
  name: string;
  email: string;
  phone: string;
  address: string;
  description?: string;
  logo?: string;
}

// Store service functions
export const storeService = {
  // Get all stores
  getStores: async (page = 1, limit = 10): Promise<StoresResponse> => {
    try {
      return await get<StoresResponse>('/stores', { params: { page, limit } });
    } catch (error) {
      console.error('Error fetching stores:', error);
      // For development, return mock data
      return getMockStores(page, limit);
    }
  },

  // Get store by ID
  getStore: async (id: string): Promise<StoreResponse> => {
    try {
      return await get<StoreResponse>(`/stores/${id}`);
    } catch (error) {
      console.error('Error fetching store:', error);
      // For development, return mock data
      return getMockStore(id);
    }
  },

  // Create new store
  createStore: async (storeData: CreateStoreData): Promise<StoreResponse> => {
    try {
      return await post<StoreResponse>('/stores', storeData);
    } catch (error) {
      console.error('Error creating store:', error);
      // For development, return mock data
      return getMockCreateStore(storeData);
    }
  },

  // Update store
  updateStore: async (id: string, storeData: Partial<CreateStoreData>): Promise<StoreResponse> => {
    try {
      return await put<StoreResponse>(`/stores/${id}`, storeData);
    } catch (error) {
      console.error('Error updating store:', error);
      // For development, return mock data
      return getMockUpdateStore(id, storeData);
    }
  },

  // Delete store
  deleteStore: async (id: string): Promise<{ success: boolean }> => {
    try {
      return await del<{ success: boolean }>(`/stores/${id}`);
    } catch (error) {
      console.error('Error deleting store:', error);
      // For development, return mock success
      return { success: true };
    }
  },

  // Get stores by admin user ID
  getStoresByAdmin: async (adminId: string): Promise<StoresResponse> => {
    try {
      return await get<StoresResponse>(`/stores/admin/${adminId}`);
    } catch (error) {
      console.error('Error fetching admin stores:', error);
      // For development, return mock data
      return getMockStoresByAdmin(adminId);
    }
  }
};

// Mock data functions
const getMockStores = (page: number, limit: number): StoresResponse => {
  const stores: Store[] = [
    {
      id: '1',
      name: 'Main Store',
      email: 'main@example.com',
      phone: '+1 (555) 123-4567',
      address: '123 Main St, New York, NY 10001',
      logo: 'https://via.placeholder.com/150',
      description: 'Our flagship store with all products',
      createdBy: '1',
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '2',
      name: 'Downtown Branch',
      email: 'downtown@example.com',
      phone: '+1 (555) 987-6543',
      address: '456 Market St, San Francisco, CA 94103',
      description: 'Our downtown location specializing in premium products',
      createdBy: '1',
      createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '3',
      name: 'East Side Shop',
      email: 'east@example.com',
      phone: '+1 (555) 456-7890',
      address: '789 East Ave, Chicago, IL 60601',
      logo: 'https://via.placeholder.com/150',
      description: 'Serving the east side with quality products',
      createdBy: '2',
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];

  const startIndex = (page - 1) * limit;
  const paginatedStores = stores.slice(startIndex, startIndex + limit);

  return {
    stores: paginatedStores,
    total: stores.length,
    page,
    limit
  };
};

const getMockStore = (id: string): StoreResponse => {
  const stores = getMockStores(1, 10).stores;
  const store = stores.find(s => s.id === id) || stores[0];
  
  return {
    store
  };
};

const getMockCreateStore = (storeData: CreateStoreData): StoreResponse => {
  const newStore: Store = {
    id: Math.random().toString(36).substring(2, 9),
    ...storeData,
    createdBy: '1', // Assuming current user ID
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  return {
    store: newStore
  };
};

const getMockUpdateStore = (id: string, storeData: Partial<CreateStoreData>): StoreResponse => {
  const { store } = getMockStore(id);
  
  const updatedStore: Store = {
    ...store,
    ...storeData,
    updatedAt: new Date().toISOString()
  };

  return {
    store: updatedStore
  };
};

const getMockStoresByAdmin = (adminId: string): StoresResponse => {
  const allStores = getMockStores(1, 10).stores;
  const adminStores = allStores.filter(store => store.createdBy === adminId);
  
  return {
    stores: adminStores,
    total: adminStores.length,
    page: 1,
    limit: 10
  };
};