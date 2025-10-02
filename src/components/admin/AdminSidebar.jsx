import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaHome, 
  FaUsers, 
  FaEnvelope, 
  FaImages, 
  FaStar, 
  FaCog, 
  FaFileAlt,
  FaChartBar,
  FaTimes,
  FaUpload
} from 'react-icons/fa';

const AdminSidebar = ({ isOpen, onClose }) => {
  const menuItems = [
    {
      title: 'Dashboard',
      icon: FaHome,
      path: '/admin/dashboard',
      description: 'Overview & Analytics'
    },
    {
      title: 'Contact Forms',
      icon: FaEnvelope,
      path: '/admin/contacts',
      description: 'Customer Inquiries',
      badge: 'new'
    },
    {
      title: 'Gallery',
      icon: FaImages,
      path: '/admin/gallery',
      description: 'Photo Management'
    },
    {
      title: 'Reviews',
      icon: FaStar,
      path: '/admin/reviews',
      description: 'Customer Testimonials'
    },
    {
      title: 'Content',
      icon: FaFileAlt,
      path: '/admin/content',
      description: 'Website Content'
    },
    {
      title: 'Admin Users',
      icon: FaUsers,
      path: '/admin/users',
      description: 'User Management'
    },
    {
      title: 'Analytics',
      icon: FaChartBar,
      path: '/admin/analytics',
      description: 'Site Statistics'
    },
    {
      title: 'Settings',
      icon: FaCog,
      path: '/admin/settings',
      description: 'System Configuration'
    }
  ];

  return (
    <>
      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white transform lg:translate-x-0 lg:static lg:inset-0"
      >
        <div className="flex items-center justify-between h-16 px-4 bg-gray-800">
          <div className="flex items-center">
            <img
              src="/images/logo.png"
              alt="The White Barn FL"
              className="h-8 w-auto"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <span 
              className="ml-2 text-lg font-serif font-semibold hidden"
              style={{ display: 'none' }}
            >
              White Barn FL
            </span>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            <FaTimes size={20} />
          </button>
        </div>

        <nav className="mt-8 flex-1 overflow-y-auto">
          <div className="px-4 space-y-1">
            {menuItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 relative overflow-hidden ${
                      isActive
                        ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white hover:shadow-md'
                    }`
                  }
                  onClick={onClose}
                >
                  {({ isActive }) => (
                    <>
                      {/* Background animation */}
                      <div className={`absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-600 transform transition-transform duration-300 ${
                        isActive ? 'scale-100' : 'scale-0 group-hover:scale-100'
                      }`} />
                      
                      {/* Content */}
                      <div className="relative flex items-center w-full">
                        <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="truncate">{item.title}</span>
                            {item.badge && (
                              <span className="ml-2 px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          {item.description && (
                            <p className="text-xs opacity-75 truncate mt-0.5">
                              {item.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </NavLink>
              </motion.div>
            ))}
          </div>
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 w-full p-4 bg-gray-800">
          <div className="text-xs text-gray-400 text-center">
            <p>&copy; 2024 The White Barn FL</p>
            <p>Admin Dashboard</p>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default AdminSidebar;
