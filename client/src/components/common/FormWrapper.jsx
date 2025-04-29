// client/src/components/common/FormWrapper.jsx
import React from 'react';
import { motion } from 'framer-motion';
import Card from './Card';

const FormWrapper = ({ 
  children, 
  title, 
  subtitle = '', 
  className = '',
  variant = 'default',
  icon = null,
  badge = null,
  action = null,
  loading = false,
  footer = null
}) => {
  // Define variant styles with light/dark mode support
  const variantClasses = {
    default: 'bg-white dark:bg-dark-800 border border-light-200 dark:border-dark-700',
    glass: 'glass-card',
    elevated: 'bg-white dark:bg-dark-800 border border-light-200 dark:border-dark-700 shadow-xl dark:shadow-2xl',
    minimal: 'bg-light-50/50 dark:bg-dark-900/50 border border-light-200 dark:border-dark-800'
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className={`relative ${className}`}
    >
      {/* Optional loading overlay */}
      {loading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-light-900/30 dark:bg-dark-900/50 backdrop-blur-sm rounded-xl">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-10 h-10 border-t-2 border-solid rounded-full border-primary-500 animate-spin"></div>
            <p className="text-sm text-dark-600 dark:text-dark-300">Processing...</p>
          </div>
        </div>
      )}
      
      <Card
        variant={variant === 'glass' ? 'glass' : 'default'}
        className={`overflow-hidden ${variantClasses[variant]}`}
      >
        {/* Card Header if title exists */}
        {(title || badge || action) && (
          <div className="flex flex-col px-6 py-4 border-b border-light-200/70 dark:border-dark-700/70 sm:flex-row sm:items-center">
            <div className="flex-1">
              {badge && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-500/10 text-primary-600 dark:text-primary-400 border border-primary-500/20 mb-2">
                  {badge}
                </span>
              )}
              
              <div className="flex items-center space-x-2">
                {icon && (
                  <div className="text-primary-500">
                    {icon}
                  </div>
                )}
                <h2 className="text-xl font-semibold text-dark-900 dark:text-white font-display">{title}</h2>
              </div>
              
              {subtitle && (
                <p className="mt-1 text-sm text-dark-600 dark:text-dark-300">
                  {subtitle}
                </p>
              )}
            </div>
            
            {/* Action button/element if provided */}
            {action && (
              <div className="mt-4 sm:mt-0">
                {action}
              </div>
            )}
          </div>
        )}
        
        {/* Card Body with Content */}
        <Card.Body padding={title ? 'default' : 'lg'}>
          {children}
        </Card.Body>
        
        {/* Optional Footer */}
        {footer && (
          <div className="px-6 py-4 border-t bg-light-50/50 dark:bg-dark-800/50 border-light-200/70 dark:border-dark-700/70">
            {footer}
          </div>
        )}
      </Card>
      
      {/* Light glow effect behind card (conditionally applied) */}
      {variant === 'elevated' && (
        <div className="absolute -inset-1 bg-gradient-to-r from-primary-500/5 via-secondary-500/5 to-accent-500/5 rounded-xl blur-xl -z-10"></div>
      )}
    </motion.div>
  );
};

export default FormWrapper;