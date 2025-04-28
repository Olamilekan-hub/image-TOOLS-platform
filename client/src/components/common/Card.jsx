// client/src/components/common/Card.jsx
import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  className = '', 
  hover = false, 
  ...props 
}) => {
  return (
    <motion.div
      className={`
        bg-base-200 rounded-xl shadow-lg overflow-hidden
        ${hover ? 'hover:shadow-xl transition-shadow' : ''}
        ${className}
      `}
      whileHover={hover ? { y: -5 } : {}}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Card subcomponents
Card.Body = ({ children, className = '', ...props }) => (
  <div className={`p-6 ${className}`} {...props}>
    {children}
  </div>
);

Card.Title = ({ children, className = '', ...props }) => (
  <h3 className={`text-xl font-bold mb-4 ${className}`} {...props}>
    {children}
  </h3>
);

Card.Footer = ({ children, className = '', ...props }) => (
  <div className={`px-6 py-4 bg-base-300 ${className}`} {...props}>
    {children}
  </div>
);

export default Card;