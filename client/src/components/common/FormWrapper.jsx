// client/src/components/common/FormWrapper.jsx
import React from 'react';
import { motion } from 'framer-motion';
import Card from './Card';

const FormWrapper = ({ 
  children, 
  title, 
  subtitle = '', 
  className = '' 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      <Card>
        <Card.Body>
          {title && (
            <h2 className="text-xl font-bold mb-2 text-white">{title}</h2>
          )}
          
          {subtitle && (
            <p className="text-gray-400 mb-6">{subtitle}</p>
          )}
          
          {children}
        </Card.Body>
      </Card>
    </motion.div>
  );
};

export default FormWrapper;