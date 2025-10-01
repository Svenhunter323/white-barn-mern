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
      path: '/admin/dashboard'
    },
    {
      title: 'Contacts',
      icon: FaEnvelope,
      path: '/admin/contacts'
    },
    {
      title: 'Gallery',
      icon: FaImages,
      path: '/admin/gallery'
    },
    {
      title: 'Reviews',
      icon: FaStar,
      path: '/admin/reviews'
    },
    {
      title: 'Content',
      icon: FaFileAlt,
      path: '/admin/content',
      submenu: [
        { title: 'Home Page', path: '/admin/content/home' },
        { title: 'About Page', path: '/admin/content/about' },
        { title: 'Contact Details', path: '/admin/content/contact' },
        { title: 'Social Links', path: '/admin/content/social' }
      ]
    },
    {
      title: 'Admins',
      icon: FaUsers,
      path: '/admin/admins'
    },
    {
      title: 'Settings',
      icon: FaCog,
      path: '/admin/settings'
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

        <nav className="mt-8">
          <div className="px-4 space-y-2">
            {menuItems.map((item, index) => (
              <div key={index}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                      isActive
                        ? 'bg-primary-600 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`
                  }
                  onClick={() => !item.submenu && onClose()}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.title}
                </NavLink>
                
                {/* Submenu */}
                {item.submenu && (
                  <div className="ml-8 mt-2 space-y-1">
                    {item.submenu.map((subItem, subIndex) => (
                      <NavLink
                        key={subIndex}
                        to={subItem.path}
                        className={({ isActive }) =>
                          `block px-4 py-2 text-sm rounded-lg transition-colors duration-200 ${
                            isActive
                              ? 'bg-primary-500 text-white'
                              : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                          }`
                        }
                        onClick={onClose}
                      >
                        {subItem.title}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
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
