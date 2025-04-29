// client/src/components/common/TextArea.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const TextArea = ({ 
  label, 
  id, 
  className = '', 
  error = '', 
  helpText = '',
  rows = 4,
  maxLength,
  showCount = false,
  variant = 'default',
  required = false,
  ...props 
}) => {
  const [focused, setFocused] = useState(false);
  const [charCount, setCharCount] = useState(props.value?.length || 0);
  
  // Define variant styles with proper light/dark mode support
  const variantClasses = {
    default: 'bg-white dark:bg-dark-800 border border-light-300 dark:border-dark-600 focus:border-primary-500 focus:ring-primary-500',
    filled: 'bg-light-100 dark:bg-dark-700 border-0 focus:bg-white dark:focus:bg-dark-800 focus:ring-primary-500',
    glass: 'bg-white/70 dark:bg-dark-800/70 backdrop-blur-sm border border-light-200/50 dark:border-dark-700/50 focus:border-primary-500 focus:ring-primary-500',
    minimal: 'bg-transparent border-b border-light-300 dark:border-dark-600 rounded-none px-0 focus:border-primary-500 focus:ring-0',
  };
  
  const handleChange = (e) => {
    if (maxLength && e.target.value.length > maxLength) {
      e.target.value = e.target.value.slice(0, maxLength);
    }
    
    setCharCount(e.target.value.length);
    
    if (props.onChange) {
      props.onChange(e);
    }
  };

  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1.5 flex items-center">
          {label}
          {required && <span className="ml-1 text-accent-500">*</span>}
        </label>
      )}
      
      <div className="relative">
        <textarea
          id={id}
          rows={rows}
          className={`
            w-full rounded-lg px-4 py-3
            text-dark-900 dark:text-white placeholder-dark-500 dark:placeholder-dark-400
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-opacity-50
            ${error ? 'border-red-500 focus:ring-red-500' : variantClasses[variant]}
            ${className}
          `}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={handleChange}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${id}-error` : helpText ? `${id}-description` : undefined}
          maxLength={maxLength}
          required={required}
          {...props}
        />
        
        {showCount && maxLength && (
          <div className={`absolute bottom-2 right-2 text-xs ${
            charCount >= maxLength ? 'text-red-500' : 'text-dark-500 dark:text-dark-400'
          }`}>
            {charCount}/{maxLength}
          </div>
        )}
      </div>
      
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-500 flex items-center">
          <svg className="w-4 h-4 mr-1.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      ) : helpText && (
        <p id={`${id}-description`} className="mt-1.5 text-sm text-dark-500 dark:text-dark-400">
          {helpText}
        </p>
      )}
    </div>
  );
};

export default TextArea;