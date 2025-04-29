// client/src/components/common/Card.jsx
import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  className = '', 
  variant = 'default',
  hover = false,
  glow = false,
  ...props 
}) => {
  // Different card styles with proper light/dark mode support
  const variantClasses = {
    default: 'bg-white dark:bg-dark-800 border border-light-200 dark:border-dark-700 shadow-md dark:shadow-xl',
    glass: 'bg-white/70 dark:bg-dark-800/70 backdrop-blur-md border border-light-200/50 dark:border-dark-700/50 shadow-glass',
    gradient: 'bg-gradient-to-br from-light-50 to-light-100 dark:from-dark-800 dark:to-dark-900 border border-light-200 dark:border-dark-700 shadow-md dark:shadow-xl',
    outlined: 'bg-light-50/50 dark:bg-dark-900/50 border border-light-200 dark:border-dark-700 shadow-md dark:shadow-lg',
    elevated: 'bg-white dark:bg-dark-800 border border-light-200 dark:border-dark-700 shadow-xl dark:shadow-2xl',
  };

  // Optional glow effect
  const glowStyles = glow ? {
    boxShadow: `0 0 20px 0 rgba(14, 165, 233, 0.1), 0 0 40px 0 rgba(14, 165, 233, 0.06)`,
  } : {};

  return (
    <motion.div
      className={`
        rounded-xl overflow-hidden
        ${variantClasses[variant]}
        ${className}
      `}
      whileHover={hover ? { y: -5, transition: { duration: 0.2 } } : {}}
      style={glowStyles}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Card subcomponents with modern styling
Card.Body = ({ children, className = '', padding = 'default', ...props }) => {
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    default: 'p-6',
    lg: 'p-8'
  };

  return (
    <div className={`${paddingClasses[padding]} ${className}`} {...props}>
      {children}
    </div>
  );
};

Card.Header = ({ children, className = '', ...props }) => (
  <div className={`px-6 py-4 border-b border-light-200 dark:border-dark-700 ${className}`} {...props}>
    {children}
  </div>
);

Card.Title = ({ children, className = '', size = 'default', ...props }) => {
  const sizeClasses = {
    sm: 'text-lg',
    default: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <h3 className={`font-display font-semibold mb-3 text-dark-900 dark:text-white ${sizeClasses[size]} ${className}`} {...props}>
      {children}
    </h3>
  );
};

Card.Footer = ({ children, className = '', ...props }) => (
  <div className={`px-6 py-4 bg-light-50/50 dark:bg-dark-800/50 border-t border-light-200 dark:border-dark-700 ${className}`} {...props}>
    {children}
  </div>
);

Card.Image = ({ src, alt, className = '', ...props }) => (
  <div className="w-full overflow-hidden">
    <img 
      src={src} 
      alt={alt || 'Card image'} 
      className={`w-full h-auto object-cover ${className}`}
      {...props} 
    />
  </div>
);

Card.Badge = ({ children, className = '', color = 'primary', ...props }) => {
  const colorClasses = {
    primary: 'bg-primary-500/10 text-primary-600 dark:text-primary-400 border-primary-500/20',
    secondary: 'bg-secondary-500/10 text-secondary-600 dark:text-secondary-400 border-secondary-500/20',
    accent: 'bg-accent-500/10 text-accent-600 dark:text-accent-400 border-accent-500/20',
    success: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20',
    warning: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    danger: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20',
    info: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
  };

  return (
    <span 
      className={`
        inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
        border ${colorClasses[color]} ${className}
      `}
      {...props}
    >
      {children}
    </span>
  );
};

export default Card;