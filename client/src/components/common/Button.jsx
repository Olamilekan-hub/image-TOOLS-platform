// client/src/components/common/Button.jsx
import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ 
  children, 
  type = 'button', 
  variant = 'primary', 
  size = 'md',
  className = '', 
  disabled = false, 
  loading = false,
  icon = null,
  iconPosition = 'left',
  onClick,
  ...props
}) => {
  // Base classes that apply to all buttons
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-dark-900';
  
  // Size classes
  const sizeClasses = {
    xs: 'px-2 py-1 text-xs',
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-2.5 text-base',
    xl: 'px-6 py-3 text-lg',
  };
  
  // Variant classes with modern styling
  const variantClasses = {
    primary: 'bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white shadow-lg shadow-primary-600/20 hover:shadow-primary-600/30 focus:ring-primary-500',
    
    secondary: 'bg-gradient-to-r from-secondary-600 to-secondary-500 hover:from-secondary-700 hover:to-secondary-600 text-white shadow-lg shadow-secondary-600/20 hover:shadow-secondary-600/30 focus:ring-secondary-500',
    
    accent: 'bg-gradient-to-r from-accent-600 to-accent-500 hover:from-accent-700 hover:to-accent-600 text-white shadow-lg shadow-accent-600/20 hover:shadow-accent-600/30 focus:ring-accent-500',
    
    outline: 'border border-dark-600 hover:border-primary-500 text-white hover:bg-primary-500/10 focus:ring-primary-500',
    
    glass: 'bg-dark-800/50 backdrop-blur-sm border border-dark-700/50 hover:bg-dark-700/50 text-white shadow-glass-sm hover:shadow-glass focus:ring-white/20',
    
    ghost: 'bg-transparent hover:bg-dark-800/50 text-white focus:ring-white/20',
    
    danger: 'bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white shadow-lg shadow-red-600/20 hover:shadow-red-600/30 focus:ring-red-500',
  };
  
  // Disabled classes
  const disabledClasses = 'opacity-60 cursor-not-allowed pointer-events-none';
  
  return (
    <motion.button
      type={type}
      whileTap={{ scale: disabled || loading ? 1 : 0.97 }}
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      disabled={disabled || loading}
      className={`
        ${baseClasses} 
        ${sizeClasses[size]} 
        ${variantClasses[variant]} 
        ${disabled || loading ? disabledClasses : ''} 
        ${className}
      `}
      onClick={onClick}
      {...props}
    >
      {loading ? (
        <>
          <svg className="w-4 h-4 mr-2 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Processing...
        </>
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <span className="mr-2">{icon}</span>
          )}
          {children}
          {icon && iconPosition === 'right' && (
            <span className="ml-2">{icon}</span>
          )}
        </>
      )}
    </motion.button>
  );
};

export default Button;