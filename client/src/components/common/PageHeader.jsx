// client/src/components/common/PageHeader.jsx
import React from 'react';
import { motion } from 'framer-motion';

const PageHeader = ({ 
  title, 
  subtitle = '', 
  icon = null, 
  className = '' 
}) => {
  return (
    <motion.div 
      className={`mb-8 ${className}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center space-x-3">
        {icon && (
          <div className="text-accent">{icon}</div>
        )}
        <h1 className="text-3xl font-bold text-white">{title}</h1>
      </div>
      
      {subtitle && (
        <p className="mt-2 text-gray-400 max-w-2xl">{subtitle}</p>
      )}
      
      <div className="mt-4 h-1 w-20 bg-gradient-to-r from-primary to-accent rounded"></div>
    </motion.div>
  );
};

export default PageHeader;