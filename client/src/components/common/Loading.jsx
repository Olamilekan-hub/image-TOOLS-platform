// client/src/components/common/Loading.jsx
import React from 'react';
import { motion } from 'framer-motion';

/**
 * Modern Loading component with multiple variants
 * 
 * @param {Object} props
 * @param {string} props.type - Type of loading indicator: 'spinner', 'dots', 'pulse', or 'progress'
 * @param {string} props.size - Size of the loading indicator: 'xs', 'sm', 'md', 'lg', 'xl'
 * @param {string} props.color - Color variant: 'primary', 'secondary', 'accent', 'white'
 * @param {string} props.text - Optional text to display beneath the loading indicator
 * @param {boolean} props.fullscreen - Whether the loading indicator should take up the full screen
 * @param {boolean} props.overlay - Whether to display a backdrop overlay
 * @param {string} props.className - Additional classes to apply
 */
const Loading = ({ 
  type = 'spinner',
  size = 'md',
  color = 'primary',
  text = '',
  fullscreen = false,
  overlay = false,
  className = '',
  ...props 
}) => {
  // Determine the size class
  const sizeClasses = {
    xs: 'w-4 h-4',
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };
  
  // Determine the color class
  const colorClasses = {
    primary: 'text-primary-500',
    secondary: 'text-secondary-500',
    accent: 'text-accent-500',
    white: 'text-white',
  };
  
  // Create the container class
  const containerClasses = `
    ${fullscreen ? 'fixed inset-0 z-50' : 'relative'} 
    ${overlay ? 'bg-dark-900/70 backdrop-blur-sm' : ''}
    flex flex-col items-center justify-center
    ${className}
  `;
  
  // Render the appropriate loading type
  const renderLoadingIndicator = () => {
    switch (type) {
      case 'spinner':
        return (
          <div className={`${sizeClasses[size]} ${colorClasses[color]}`}>
            <svg className="animate-spin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        );
        
      case 'dots':
        return (
          <div className="flex space-x-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className={`rounded-full ${colorClasses[color]} bg-current`}
                initial={{ width: sizeClasses[size].split(' ')[0], height: sizeClasses[size].split(' ')[1] }}
                animate={{ scale: [1, 1.2, 1], opacity: [1, 0.6, 1] }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  repeatType: 'loop',
                  delay: i * 0.2,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>
        );
        
      case 'pulse':
        return (
          <motion.div
            className={`${sizeClasses[size]} ${colorClasses[color]} bg-current rounded-full`}
            animate={{ scale: [1, 1.2, 1], opacity: [1, 0.6, 1] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'easeInOut',
            }}
          />
        );
        
      case 'progress':
        return (
          <div className={`h-1 bg-dark-700 rounded-full overflow-hidden ${size === 'xs' ? 'w-20' : size === 'sm' ? 'w-32' : size === 'md' ? 'w-48' : size === 'lg' ? 'w-64' : 'w-80'}`}>
            <motion.div
              className={`h-full ${colorClasses[color]} bg-current`}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                repeatType: 'loop',
                ease: 'easeInOut',
              }}
            />
          </div>
        );
        
      default:
        return (
          <div className={`${sizeClasses[size]} ${colorClasses[color]}`}>
            <svg className="animate-spin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        );
    }
  };
  
  // Render a full page loader or an inline loader
  return (
    <div className={containerClasses} {...props}>
      {renderLoadingIndicator()}
      
      {text && (
        <p className={`mt-4 text-${size === 'xs' || size === 'sm' ? 'xs' : 'sm'} ${colorClasses[color === 'white' ? 'white' : 'primary']}`}>
          {text}
        </p>
      )}
    </div>
  );
};

// Specialized component variants for common use cases
Loading.FullPage = (props) => (
  <Loading 
    type="spinner" 
    size="lg" 
    color="primary" 
    fullscreen={true} 
    overlay={true} 
    text="Loading..." 
    {...props} 
  />
);

Loading.Overlay = ({ children, loading, ...props }) => (
  <div className="relative">
    {children}
    {loading && (
      <div className="absolute inset-0 flex items-center justify-center bg-dark-900/70 backdrop-blur-sm rounded-lg z-10">
        <Loading {...props} />
      </div>
    )}
  </div>
);

Loading.Inline = (props) => (
  <Loading 
    type="spinner" 
    size="sm" 
    color="primary" 
    className="inline-flex mx-2" 
    {...props} 
  />
);

Loading.Button = ({ text = 'Loading...', ...props }) => (
  <div className="inline-flex items-center">
    <Loading 
      type="spinner" 
      size="xs" 
      color="white" 
      className="mr-2" 
      {...props} 
    />
    <span>{text}</span>
  </div>
);

Loading.Progress = (props) => (
  <Loading 
    type="progress" 
    size="md" 
    color="primary" 
    {...props} 
  />
);

export default Loading;