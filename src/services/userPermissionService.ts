import { User, Permission } from '../types';

// Types for the service
export interface UserPermission {
  userId: string;
  permissions: Permission[];
}

export interface UserSearchParams {
  query: string;
  role?: 'customer' | 'admin' | 'all';
}

// Base URL for API calls
const API_BASE_URL = '/api';

/**
 * Fetch permissions for a specific user
 * @param userId - The ID of the user to fetch permissions for
 * @returns Promise with user permissions
 */
export const getUserPermissions = async (userId: string): Promise<UserPermission> => {
  try {
    // In a real app, this would be an actual API call
    // const response = await fetch(`${API_BASE_URL}/users/${userId}/permissions`);
    // if (!response.ok) throw new Error('Failed to fetch user permissions');
    // return await response.json();
    
    // For demo purposes, we'll simulate the API call with a delay
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock data - in a real app this would come from the API
        const permissions: Permission[] = [
          { id: 'view_products', name: 'View Products', description: 'Can view product listings', enabled: true },
          { id: 'edit_products', name: 'Edit Products', description: 'Can create and edit products', enabled: false },
          { id: 'view_orders', name: 'View Orders', description: 'Can view order details', enabled: true },
          { id: 'manage_orders', name: 'Manage Orders', description: 'Can update order status and details', enabled: false },
          { id: 'view_customers', name: 'View Customers', description: 'Can view customer information', enabled: true },
          { id: 'manage_customers', name: 'Manage Customers', description: 'Can edit customer information', enabled: false },
          { id: 'view_reports', name: 'View Reports', description: 'Can access analytics and reports', enabled: false },
          { id: 'manage_settings', name: 'Manage Settings', description: 'Can change system settings', enabled: false },
        ];
        
        resolve({
          userId,
          permissions: permissions.map(p => ({
            ...p,
            // Simulate different permissions for different users
            enabled: userId === '3' ? true : p.id.startsWith('view_')
          }))
        });
      }, 500);
    });
  } catch (error) {
    console.error('Error fetching user permissions:', error);
    throw error;
  }
};

/**
 * Update permissions for a specific user
 * @param userId - The ID of the user to update permissions for
 * @param permissions - The updated permissions
 * @returns Promise with updated user permissions
 */
export const updateUserPermissions = async (
  userId: string,
  permissions: Permission[]
): Promise<UserPermission> => {
  try {
    // In a real app, this would be an actual API call
    // const response = await fetch(`${API_BASE_URL}/users/${userId}/permissions`, {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ permissions }),
    // });
    // if (!response.ok) throw new Error('Failed to update user permissions');
    // return await response.json();
    
    // For demo purposes, we'll simulate the API call with a delay
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Updated permissions for user:', userId, permissions);
        resolve({
          userId,
          permissions,
        });
      }, 800);
    });
  } catch (error) {
    console.error('Error updating user permissions:', error);
    throw error;
  }
};

/**
 * Search users by name or email with optional role filtering
 * @param query - The search query
 * @param role - Optional role filter ('customer', 'admin', or 'all')
 * @returns Promise with array of matching users
 */
export const searchUsers = async (query: string, role: 'customer' | 'admin' | 'all' = 'all'): Promise<User[]> => {
  try {
    // In a real app, this would be an actual API call with role filtering
    // const response = await fetch(`${API_BASE_URL}/users/search?query=${query}&role=${role}`);
    // if (!response.ok) throw new Error('Failed to search users');
    // return await response.json();
    
    // For demo purposes, we'll simulate the API call with a delay
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock data - in a real app this would come from the API
        const users: User[] = [
          { id: '1', email: 'admin@example.com', firstName: 'Admin', lastName: 'User', role: 'admin', createdAt: new Date().toISOString() },
          { id: '2', email: 'john@example.com', firstName: 'John', lastName: 'Doe', role: 'customer', createdAt: new Date().toISOString() },
          { id: '3', email: 'jane@example.com', firstName: 'Jane', lastName: 'Smith', role: 'admin', createdAt: new Date().toISOString() },
          { id: '4', email: 'bob@example.com', firstName: 'Bob', lastName: 'Johnson', role: 'customer', createdAt: new Date().toISOString() },
          { id: '5', email: 'alice@example.com', firstName: 'Alice', lastName: 'Williams', role: 'customer', createdAt: new Date().toISOString() },
        ];
        
        // Filter users by query and role
        const filteredUsers = users.filter(user => {
          const matchesQuery = 
            user.firstName.toLowerCase().includes(query.toLowerCase()) ||
            user.lastName.toLowerCase().includes(query.toLowerCase()) ||
            user.email.toLowerCase().includes(query.toLowerCase());
          
          const matchesRole = role === 'all' || user.role === role;
          
          return matchesQuery && matchesRole;
        });
        
        resolve(filteredUsers);
      }, 500);
    });
  } catch (error) {
    console.error('Error searching users:', error);
    throw error;
  }
};

/**
 * Reset password for a specific user
 * @param userId - The ID of the user to reset password for
 * @param email - The email of the user
 * @returns Promise with success status
 */
export const resetUserPassword = async (userId: string, email: string): Promise<{ success: boolean; message: string }> => {
  try {
    // In a real app, this would be an actual API call
    // const response = await fetch(`${API_BASE_URL}/users/${userId}/reset-password`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ email }),
    // });
    // if (!response.ok) throw new Error('Failed to reset user password');
    // return await response.json();
    
    // For demo purposes, we'll simulate the API call with a delay
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Password reset requested for user:', userId, email);
        resolve({
          success: true,
          message: `Password reset email sent to ${email}`,
        });
      }, 1000);
    });
  } catch (error) {
    console.error('Error resetting user password:', error);
    throw error;
  }
};

/**
 * Search users by query
 * @param query - The search query
 * @param limit - Maximum number of results to return
 * @returns Promise with array of matching users
 */
export const searchUsers = async (query: string, limit: number = 10): Promise<User[]> => {
  try {
    // In a real app, this would be an actual API call
    // const response = await fetch(`${API_BASE_URL}/users/search?q=${encodeURIComponent(query)}&limit=${limit}`);
    // if (!response.ok) throw new Error('Failed to search users');
    // return await response.json();
    
    // For demo purposes, we'll use the mock data
    return new Promise((resolve) => {
      setTimeout(() => {
        // This would normally come from the API
        const mockUsers: User[] = [
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
        
        const filteredUsers = mockUsers.filter(user => 
          user.firstName.toLowerCase().includes(query.toLowerCase()) ||
          user.lastName.toLowerCase().includes(query.toLowerCase()) ||
          user.email.toLowerCase().includes(query.toLowerCase())
        ).slice(0, limit);
        
        resolve(filteredUsers);
      }, 300);
    });
  } catch (error) {
    console.error('Error searching users:', error);
    throw error;
  }
};