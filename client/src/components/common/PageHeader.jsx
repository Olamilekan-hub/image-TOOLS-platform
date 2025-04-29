// client/src/components/common/PageHeader.jsx
import React from 'react';
import { motion } from 'framer-motion';

const PageHeader = ({ 
  title, 
  subtitle = '', 
  icon = null, 
  className = '',
  badge = null,
  action = null
}) => {
  return (
    <div className={`mb-12 ${className}`}>
      <div className="max-w-5xl">
        <motion.div 
          className="flex flex-col space-y-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Optional Badge */}
          {badge && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="inline-flex self-start"
            >
              <span className="inline-flex items-center px-3 py-1 text-xs font-medium border rounded-full bg-primary-500/10 text-primary-600 dark:text-primary-400 border-primary-500/20">
                {badge}
              </span>
            </motion.div>
          )}
          
          {/* Title and Icon */}
          <div className="flex items-center space-x-3">
            {icon && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.2
                }}
                className="p-3 text-primary-600 dark:text-primary-500 bg-primary-500/10 rounded-xl"
              >
                {icon}
              </motion.div>
            )}
            <h1 className="text-3xl font-bold tracking-tight text-dark-900 dark:text-white md:text-4xl font-display">
              {title}
            </h1>
            
            {/* Optional action button */}
            {action && (
              <div className="hidden ml-auto sm:block">
                {action}
              </div>
            )}
          </div>
          
          {/* Subtitle text */}
          {subtitle && (
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="max-w-3xl mt-2 text-lg text-dark-600 dark:text-dark-300"
            >
              {subtitle}
            </motion.p>
          )}
          
          {/* Mobile action button */}
          {action && (
            <div className="mt-4 sm:hidden">
              {action}
            </div>
          )}
        </motion.div>
        
        {/* Decorative accent line with gradient */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "100%", opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="relative h-px max-w-md mt-6"
        >
          <div className="absolute inset-0 rounded bg-gradient-to-r from-primary-500 via-secondary-500 to-transparent"></div>
        </motion.div>
      </div>
    </div>
  );
};

export default PageHeader;