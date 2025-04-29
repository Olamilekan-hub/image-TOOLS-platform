// client/src/context/ToastContext.jsx
import { createContext, useState, useContext, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaCheck, 
  FaExclamationCircle, 
  FaInfoCircle, 
  FaTimes,
  FaBell
} from 'react-icons/fa';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const toastsTimeoutsRef = useRef({});
  
  // Add a new toast notification
  const addToast = useCallback((message, type = 'success', duration = 5000) => {
    const id = Math.random().toString(36).substring(2, 9);
    
    // Add new toast to the array
    setToasts(prevToasts => [...prevToasts, { id, message, type, duration }]);
    
    // Set up auto-dismiss timeout if duration is not infinite
    if (duration !== Infinity) {
      toastsTimeoutsRef.current[id] = setTimeout(() => {
        removeToast(id);
      }, duration);
    }
    
    return id;
  }, []);

  // Remove a toast by ID
  const removeToast = useCallback((id) => {
    // Clear the timeout to prevent memory leaks
    if (toastsTimeoutsRef.current[id]) {
      clearTimeout(toastsTimeoutsRef.current[id]);
      delete toastsTimeoutsRef.current[id];
    }
    
    // Remove the toast from state
    setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
  }, []);

  // Get the appropriate icon based on toast type
  const getToastIcon = (type) => {
    switch (type) {
      case 'success':
        return <FaCheck className="text-green-500" />;
      case 'error':
        return <FaExclamationCircle className="text-red-500" />;
      case 'info':
        return <FaInfoCircle className="text-primary-500" />;
      case 'warning':
        return <FaBell className="text-amber-500" />;
      default:
        return <FaInfoCircle className="text-primary-500" />;
    }
  };

  // Get the appropriate styling based on toast type
  const getToastClass = (type) => {
    switch (type) {
      case 'success':
        return 'bg-green-900/80 backdrop-blur-md border-l-4 border-green-500 shadow-lg shadow-green-900/20';
      case 'error':
        return 'bg-red-900/80 backdrop-blur-md border-l-4 border-red-500 shadow-lg shadow-red-900/20';
      case 'info':
        return 'bg-primary-900/80 backdrop-blur-md border-l-4 border-primary-500 shadow-lg shadow-primary-900/20';
      case 'warning':
        return 'bg-amber-900/80 backdrop-blur-md border-l-4 border-amber-500 shadow-lg shadow-amber-900/20';
      default:
        return 'bg-primary-900/80 backdrop-blur-md border-l-4 border-primary-500 shadow-lg shadow-primary-900/20';
    }
  };

  // Animation variants for toasts
  const toastVariants = {
    hidden: { opacity: 0, x: 100, scale: 0.9 },
    visible: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: 100, scale: 0.9, transition: { duration: 0.2 } }
  };

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      
      {/* Toast container - fixed at the top right */}
      <div className="fixed z-50 flex flex-col max-w-md gap-3 pointer-events-none top-20 right-4">
        <AnimatePresence>
          {toasts.map(toast => (
            <motion.div
              key={toast.id}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={toastVariants}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className={`
                pointer-events-auto rounded-lg text-white 
                flex items-start p-4 w-full max-w-md
                ${getToastClass(toast.type)}
              `}
            >
              <div className="flex-shrink-0 mr-3 mt-0.5">
                {getToastIcon(toast.type)}
              </div>
              <div className="flex-1 mr-2">
                <p className="text-sm font-medium">{toast.message}</p>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="flex-shrink-0 transition-colors text-dark-300 hover:text-white"
                aria-label="Close notification"
              >
                <FaTimes size={16} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export default ToastProvider;