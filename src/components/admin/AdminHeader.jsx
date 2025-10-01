import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaBars, 
  FaBell, 
  FaUser, 
  FaCog, 
  FaSignOutAlt,
  FaChevronDown,
  FaUserCircle
} from 'react-icons/fa';

const AdminHeader = ({ onMenuClick, admin, onLogout }) => {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const profileRef = useRef(null);
  const notificationsRef = useRef(null);

  // Mock notifications - in real app, fetch from API
  const notifications = [
    {
      id: 1,
      title: 'New Contact Form Submission',
      message: 'Sarah Johnson submitted a contact form',
      time: '5 minutes ago',
      unread: true
    },
    {
      id: 2,
      title: 'New Review Posted',
      message: 'A new 5-star review was posted',
      time: '1 hour ago',
      unread: true
    },
    {
      id: 3,
      title: 'Gallery Updated',
      message: '5 new images added to gallery',
      time: '2 hours ago',
      unread: false
    }
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setNotificationsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Left side */}
        <div className="flex items-center">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
          >
            <FaBars className="h-5 w-5" />
          </button>
          
          <div className="ml-4 lg:ml-0">
            <h1 className="text-xl font-semibold text-gray-900">
              Admin Dashboard
            </h1>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative" ref={notificationsRef}>
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-full"
            >
              <FaBell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            <AnimatePresence>
              {notificationsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50"
                >
                  <div className="p-4">
                    <h3 className="text-sm font-medium text-gray-900 mb-3">
                      Notifications
                    </h3>
                    <div className="space-y-3">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-3 rounded-lg border ${
                            notification.unread 
                              ? 'bg-primary-50 border-primary-200' 
                              : 'bg-gray-50 border-gray-200'
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900">
                                {notification.title}
                              </p>
                              <p className="text-sm text-gray-600 mt-1">
                                {notification.message}
                              </p>
                            </div>
                            {notification.unread && (
                              <div className="w-2 h-2 bg-primary-500 rounded-full ml-2 mt-1"></div>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 mt-2">
                            {notification.time}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-3 border-t border-gray-200">
                      <Link
                        to="/admin/notifications"
                        className="text-sm text-primary-600 hover:text-primary-500 font-medium"
                        onClick={() => setNotificationsOpen(false)}
                      >
                        View all notifications
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile Dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              <div className="flex items-center space-x-2">
                {admin?.avatar ? (
                  <img
                    src={admin.avatar}
                    alt={admin.name}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-8 w-8 bg-primary-500 rounded-full flex items-center justify-center">
                    <FaUserCircle className="h-5 w-5 text-white" />
                  </div>
                )}
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-gray-900">
                    {admin?.name || 'Admin'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {admin?.role || 'Administrator'}
                  </p>
                </div>
              </div>
              <FaChevronDown className="h-3 w-3 text-gray-400" />
            </button>

            <AnimatePresence>
              {profileDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50"
                >
                  <div className="py-1">
                    <div className="px-4 py-3 border-b border-gray-200">
                      <p className="text-sm font-medium text-gray-900">
                        {admin?.name || 'Admin'}
                      </p>
                      <p className="text-sm text-gray-500">
                        {admin?.email}
                      </p>
                    </div>
                    
                    <Link
                      to="/admin/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      <FaUser className="mr-3 h-4 w-4" />
                      Your Profile
                    </Link>
                    
                    <Link
                      to="/admin/settings"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      <FaCog className="mr-3 h-4 w-4" />
                      Settings
                    </Link>
                    
                    <div className="border-t border-gray-200">
                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          onLogout();
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <FaSignOutAlt className="mr-3 h-4 w-4" />
                        Sign out
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Password Change Warning */}
      {admin?.requirePasswordChange && (
        <div className="bg-yellow-50 border-b border-yellow-200 px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FaBell className="h-5 w-5 text-yellow-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-800">
                  <strong>Action Required:</strong> You need to change your password for security reasons.
                </p>
              </div>
            </div>
            <div className="flex-shrink-0">
              <Link
                to="/admin/change-password"
                className="text-sm font-medium text-yellow-800 hover:text-yellow-900 underline"
              >
                Change Password
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default AdminHeader;
