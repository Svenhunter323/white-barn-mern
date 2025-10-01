import { motion } from 'framer-motion';
import { FaExclamationTriangle, FaRedo } from 'react-icons/fa';

const ErrorMessage = ({ 
  message = 'Something went wrong. Please try again.', 
  onRetry = null,
  className = '' 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-red-50 border border-red-200 rounded-lg p-6 text-center ${className}`}
    >
      <FaExclamationTriangle className="text-red-500 text-3xl mx-auto mb-3" />
      <p className="text-red-700 mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <FaRedo className="text-sm" />
          <span>Try Again</span>
        </button>
      )}
    </motion.div>
  );
};

export default ErrorMessage;
