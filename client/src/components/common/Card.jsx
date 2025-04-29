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
  // Different card styles
  const variantClasses = {
    default: 'bg-dark-800 border border-dark-700 shadow-xl',
    glass: 'bg-dark-800/70 backdrop-blur-md border border-dark-700/50 shadow-glass',
    gradient: 'bg-gradient-to-br from-dark-800 to-dark-900 border border-dark-700 shadow-xl',
    outlined: 'bg-dark-900/50 border border-dark-700 shadow-lg',
    elevated: 'bg-dark-800 border border-dark-700 shadow-2xl',
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
  <div className={`px-6 py-4 border-b border-dark-700 ${className}`} {...props}>
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
    <h3 className={`font-display font-semibold mb-3 ${sizeClasses[size]} ${className}`} {...props}>
      {children}
    </h3>
  );
};

Card.Footer = ({ children, className = '', ...props }) => (
  <div className={`px-6 py-4 bg-dark-800/50 border-t border-dark-700 ${className}`} {...props}>
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
    primary: 'bg-primary-500/10 text-primary-400 border-primary-500/20',
    secondary: 'bg-secondary-500/10 text-secondary-400 border-secondary-500/20',
    accent: 'bg-accent-500/10 text-accent-400 border-accent-500/20',
    success: 'bg-green-500/10 text-green-400 border-green-500/20',
    warning: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    danger: 'bg-red-500/10 text-red-400 border-red-500/20',
    info: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
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