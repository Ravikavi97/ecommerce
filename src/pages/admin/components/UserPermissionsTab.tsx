import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../../../contexts/AppContext';
import { User, Permission } from '../../../types';
import { Search, Check, X, RefreshCw, UserCog, Filter } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { getUserPermissions, updateUserPermissions, resetUserPassword, searchUsers } from '../../../services/userPermissionService';

// Default empty permissions array for new users
const defaultPermissions: Permission[] = [];

export const UserPermissionsTab: React.FC = () => {
  const { state } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userPermissions, setUserPermissions] = useState<Permission[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'all' | 'customer' | 'admin'>('all');

  // State for search results
  const [searchResults, setSearchResults] = useState<User[]>([]);
  
  // Available roles for filtering
  const roles = [
    { value: 'all', label: 'All Roles' },
    { value: 'admin', label: 'Admin' },
    { value: 'customer', label: 'Customer' }
  ];
  
  // Effect to handle search
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }
    
    // Debounce search to avoid too many API calls
    const handler = setTimeout(async () => {
      try {
        const results = await searchUsers(searchQuery);
        
        // Filter results by role if a specific role is selected
        const filteredResults = selectedRole === 'all' 
          ? results 
          : results.filter(user => user.role === selectedRole);
          
        setSearchResults(filteredResults);
      } catch (error) {
        console.error('Error searching users:', error);
      }
    }, 300);
    
    return () => clearTimeout(handler);
  }, [searchQuery, selectedRole]);

  // Handle user selection
  const handleSelectUser = async (user: User) => {
    setSelectedUser(user);
    setIsLoading(true);
    
    try {
      const userPerm = await getUserPermissions(user.id);
      setUserPermissions(userPerm.permissions);
    } catch (error) {
      console.error('Error fetching user permissions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle permission
  const handleTogglePermission = (permissionId: string) => {
    setUserPermissions(prevPermissions =>
      prevPermissions.map(permission =>
        permission.id === permissionId
          ? { ...permission, enabled: !permission.enabled }
          : permission
      )
    );
  };

  // Save permissions
  const handleSavePermissions = async () => {
    if (!selectedUser) return;
    
    setIsLoading(true);
    
    try {
      await updateUserPermissions(selectedUser.id, userPermissions);
      setIsSaved(true);
      
      // Reset saved message after 3 seconds
      setTimeout(() => {
        setIsSaved(false);
      }, 3000);
    } catch (error) {
      console.error('Error saving user permissions:', error);
      alert('Failed to save permissions. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Reset password
  const handleResetPassword = async () => {
    if (!selectedUser) return;
    
    setIsResetPasswordModalOpen(true);
    
    try {
      const result = await resetUserPassword(selectedUser.id, selectedUser.email);
      setIsResetPasswordModalOpen(false);
      
      // Show success message
      alert(result.message);
    } catch (error) {
      console.error('Error resetting password:', error);
      alert('Failed to reset password. Please try again.');
      setIsResetPasswordModalOpen(false);
    }
  };

  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">User Permissions</h3>
      <p className="text-gray-500 mb-6">
        Manage user access and permissions for the system.
      </p>
      
      {/* Search and User Selection */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search users by name or email..."
              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="w-full md:w-48">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-4 w-4 text-gray-400" />
              </div>
              <select
                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value as 'all' | 'customer' | 'admin')}
              >
                {roles.map(role => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        {searchQuery && searchResults.length > 0 && (
          <div className="mt-2 bg-white shadow-md rounded-md max-h-60 overflow-y-auto">
            {searchResults.map(user => (
              <div
                key={user.id}
                className="p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                onClick={() => handleSelectUser(user)}
              >
                <div className="flex items-center">
                  <div className="h-10 w-10 flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full object-cover"
                      src={user.avatar || `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=random`}
                      alt={`${user.firstName} ${user.lastName}`}
                    />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{user.firstName} {user.lastName}</div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {searchQuery && searchQuery.length > 0 && searchResults.length === 0 && (
          <div className="mt-2 p-3 text-center text-gray-500 bg-gray-50 rounded-md">
            No users found matching your search.
          </div>
        )}
      </div>
      
      {/* Selected User Permissions */}
      {selectedUser && (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="h-12 w-12 flex-shrink-0">
                <img
                  className="h-12 w-12 rounded-full object-cover"
                  src={selectedUser.avatar || `https://ui-avatars.com/api/?name=${selectedUser.firstName}+${selectedUser.lastName}&background=random`}
                  alt={`${selectedUser.firstName} ${selectedUser.lastName}`}
                />
              </div>
              <div className="ml-4">
                <div className="text-lg font-medium text-gray-900">{selectedUser.firstName} {selectedUser.lastName}</div>
                <div className="text-sm text-gray-500">{selectedUser.email}</div>
              </div>
            </div>
            <Button
              variant="outline"
              leftIcon={<RefreshCw className="h-4 w-4" />}
              onClick={handleResetPassword}
            >
              Reset Password
            </Button>
          </div>
          
          {isLoading ? (
            <div className="py-4 text-center text-gray-500">
              Loading permissions...
            </div>
          ) : (
            <>
              <h4 className="font-medium text-gray-900 mb-4">Permissions</h4>
              <div className="space-y-4 mb-6">
                {userPermissions.map(permission => (
                  <div key={permission.id} className="flex items-center justify-between p-4 border rounded-md">
                    <div>
                      <h5 className="font-medium text-gray-900">{permission.name}</h5>
                      <p className="text-sm text-gray-500">{permission.description}</p>
                    </div>
                    <div className="flex items-center">
                      <button
                        onClick={() => handleTogglePermission(permission.id)}
                        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${permission.enabled ? 'bg-primary-600' : 'bg-gray-200'}`}
                      >
                        <span
                          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${permission.enabled ? 'translate-x-5' : 'translate-x-0'}`}
                        />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex items-center justify-end space-x-4">
                {isSaved && (
                  <div className="flex items-center text-green-600">
                    <Check className="h-4 w-4 mr-1" />
                    <span>Permissions saved</span>
                  </div>
                )}
                <Button
                  variant="primary"
                  onClick={handleSavePermissions}
                  disabled={isLoading}
                >
                  {isLoading ? 'Saving...' : 'Save Permissions'}
                </Button>
              </div>
            </>
          )}
        </div>
      )}
      
      {!selectedUser && !searchQuery && (
        <div className="bg-gray-50 p-8 rounded-lg text-center">
          <UserCog className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h4 className="text-lg font-medium text-gray-900 mb-2">No User Selected</h4>
          <p className="text-gray-500">
            Search for a user above to manage their permissions.
          </p>
        </div>
      )}
    </div>
  );
};