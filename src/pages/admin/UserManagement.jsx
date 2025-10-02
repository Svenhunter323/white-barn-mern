import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaUser, 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaEye,
  FaUserShield,
  FaUserTie,
  FaEnvelope,
  FaCalendarAlt,
  FaToggleOn,
  FaToggleOff
} from 'react-icons/fa';
import { format } from 'date-fns';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Modal from '../../components/ui/Modal';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { useAuth } from '../../contexts/AuthContext';
import apiService from '../../services/api';
import toast from 'react-hot-toast';

const UserManagement = () => {
  const { admin } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await apiService.request('/admin/users', {
        method: 'GET'
      });
      setUsers(response.data.users || []);
    } catch (error) {
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (userData) => {
    try {
      const response = await apiService.request('/admin/users', {
        method: 'POST',
        body: JSON.stringify(userData)
      });
      setUsers(prev => [...prev, response.data.user]);
      toast.success('User created successfully');
      setShowCreateModal(false);
    } catch (error) {
      toast.error(error.message || 'Failed to create user');
    }
  };

  const handleUpdateUser = async (userData) => {
    try {
      const response = await apiService.request(`/admin/users/${selectedUser._id}`, {
        method: 'PUT',
        body: JSON.stringify(userData)
      });
      setUsers(prev => 
        prev.map(user => 
          user._id === selectedUser._id ? response.data.user : user
        )
      );
      toast.success('User updated successfully');
      setShowEditModal(false);
    } catch (error) {
      toast.error(error.message || 'Failed to update user');
    }
  };

  const handleToggleStatus = async (userId, currentStatus) => {
    try {
      const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
      await apiService.request(`/admin/users/${userId}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status: newStatus })
      });
      setUsers(prev => 
        prev.map(user => 
          user._id === userId ? { ...user, status: newStatus } : user
        )
      );
      toast.success(`User ${newStatus === 'active' ? 'activated' : 'deactivated'} successfully`);
    } catch (error) {
      toast.error('Failed to update user status');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (userId === admin._id) {
      toast.error('You cannot delete your own account');
      return;
    }

    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      await apiService.request(`/admin/users/${userId}`, {
        method: 'DELETE'
      });
      setUsers(prev => prev.filter(user => user._id !== userId));
      toast.success('User deleted successfully');
    } catch (error) {
      toast.error('Failed to delete user');
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleIcon = (role) => {
    switch (role) {
      case 'super_admin': return FaUserShield;
      case 'admin': return FaUserTie;
      default: return FaUser;
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'super_admin': return 'bg-purple-100 text-purple-800';
      case 'admin': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800';
  };

  if (loading) {
    return <LoadingSpinner fullScreen text="Loading users..." />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600">Manage admin users and permissions</p>
        </div>
        {admin.role === 'super_admin' && (
          <Button 
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2"
          >
            <FaPlus className="w-4 h-4" />
            Add User
          </Button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { 
            label: 'Total Users', 
            value: users.length, 
            color: 'bg-blue-500' 
          },
          { 
            label: 'Active Users', 
            value: users.filter(u => u.status === 'active').length, 
            color: 'bg-green-500' 
          },
          { 
            label: 'Super Admins', 
            value: users.filter(u => u.role === 'super_admin').length, 
            color: 'bg-purple-500' 
          },
          { 
            label: 'Admins', 
            value: users.filter(u => u.role === 'admin').length, 
            color: 'bg-yellow-500' 
          }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${stat.color}`}></div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </CardContent>
      </Card>

      {/* Users List */}
      <div className="space-y-4">
        <AnimatePresence>
          {filteredUsers.map((user, index) => {
            const RoleIcon = getRoleIcon(user.role);
            return (
              <motion.div
                key={user._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full flex items-center justify-center">
                          <RoleIcon className="w-6 h-6 text-white" />
                        </div>
                        
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {user.name}
                            </h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                              {user.role.replace('_', ' ')}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                              {user.status}
                            </span>
                            {user._id === admin._id && (
                              <span className="px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium">
                                You
                              </span>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-6 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <FaEnvelope className="w-4 h-4" />
                              <span>{user.email}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <FaCalendarAlt className="w-4 h-4" />
                              <span>Joined {format(new Date(user.createdAt), 'MMM dd, yyyy')}</span>
                            </div>
                            {user.lastLogin && (
                              <div className="flex items-center gap-2">
                                <span>Last login: {format(new Date(user.lastLogin), 'MMM dd, yyyy')}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {admin.role === 'super_admin' && user._id !== admin._id && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleToggleStatus(user._id, user.status)}
                            className="flex items-center gap-2"
                          >
                            {user.status === 'active' ? (
                              <>
                                <FaToggleOff className="w-4 h-4" />
                                Deactivate
                              </>
                            ) : (
                              <>
                                <FaToggleOn className="w-4 h-4" />
                                Activate
                              </>
                            )}
                          </Button>
                        )}
                        
                        {(admin.role === 'super_admin' || user._id === admin._id) && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedUser(user);
                              setShowEditModal(true);
                            }}
                            className="flex items-center gap-2"
                          >
                            <FaEdit className="w-4 h-4" />
                            Edit
                          </Button>
                        )}
                        
                        {admin.role === 'super_admin' && user._id !== admin._id && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteUser(user._id)}
                            className="flex items-center gap-2 text-red-600 hover:text-red-700"
                          >
                            <FaTrash className="w-4 h-4" />
                            Delete
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>
        
        {filteredUsers.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <FaUser className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
              <p className="text-gray-500">
                {searchTerm ? 'Try adjusting your search criteria' : 'No users available'}
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Create User Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create New User"
        size="lg"
      >
        <UserForm
          onSubmit={handleCreateUser}
          onCancel={() => setShowCreateModal(false)}
          isCreate={true}
        />
      </Modal>

      {/* Edit User Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit User"
        size="lg"
      >
        {selectedUser && (
          <UserForm
            user={selectedUser}
            onSubmit={handleUpdateUser}
            onCancel={() => setShowEditModal(false)}
            isCreate={false}
            isOwnProfile={selectedUser._id === admin._id}
          />
        )}
      </Modal>
    </div>
  );
};

const UserForm = ({ user, onSubmit, onCancel, isCreate, isOwnProfile }) => {
  const { admin } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role || 'admin',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isCreate && formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (isCreate && formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      const submitData = { ...formData };
      if (!isCreate && !formData.password) {
        delete submitData.password;
        delete submitData.confirmPassword;
      }
      await onSubmit(submitData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Full Name"
          required
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          placeholder="Enter full name"
        />
        
        <Input
          label="Email Address"
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          placeholder="Enter email address"
        />
        
        {admin.role === 'super_admin' && !isOwnProfile && (
          <div className="space-y-2">
            <label className="text-sm font-medium">Role</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="admin">Admin</option>
              <option value="super_admin">Super Admin</option>
            </select>
          </div>
        )}
        
        <Input
          label={isCreate ? "Password" : "New Password (leave blank to keep current)"}
          type="password"
          required={isCreate}
          value={formData.password}
          onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
          placeholder={isCreate ? "Enter password" : "Enter new password"}
        />
        
        {(isCreate || formData.password) && (
          <Input
            label="Confirm Password"
            type="password"
            required={isCreate || !!formData.password}
            value={formData.confirmPassword}
            onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
            placeholder="Confirm password"
          />
        )}
      </div>
      
      <div className="flex gap-3 pt-4 border-t">
        <Button 
          type="submit" 
          loading={loading}
          className="flex items-center gap-2"
        >
          {isCreate ? 'Create User' : 'Update User'}
        </Button>
        <Button 
          type="button" 
          variant="outline" 
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default UserManagement;
