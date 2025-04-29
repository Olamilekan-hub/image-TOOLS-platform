// client/src/components/common/Select.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Select = ({ 
  label, 
  id, 
  options = [],
  defaultOption = '',
  className = '', 
  variant = 'default',
  error = '',
  helpText = '',
  icon = null,
  required = false,
  ...props 
}) => {
  const [focused, setFocused] = useState(false);
  
  // Define variant styles with proper light/dark mode support
  const variantClasses = {
    default: 'bg-white dark:bg-dark-800 border border-light-300 dark:border-dark-600 focus:border-primary-500 focus:ring-primary-500',
    filled: 'bg-light-100 dark:bg-dark-700 border-0 focus:bg-white dark:focus:bg-dark-800 focus:ring-primary-500',
    glass: 'bg-white/70 dark:bg-dark-800/70 backdrop-blur-sm border border-light-200/50 dark:border-dark-700/50 focus:border-primary-500 focus:ring-primary-500',
    minimal: 'bg-transparent border-b border-light-300 dark:border-dark-600 rounded-none px-0 focus:border-primary-500 focus:ring-0',
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
        {icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-dark-500 dark:text-dark-400">
            {icon}
          </div>
        )}
        
        <select
          id={id}
          className={`
            w-full rounded-lg appearance-none
            ${icon ? 'pl-10' : 'pl-4'} pr-10 py-2.5
            text-dark-900 dark:text-white
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-opacity-50
            ${error ? 'border-red-500 focus:ring-red-500' : variantClasses[variant]}
            ${className}
          `}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${id}-error` : helpText ? `${id}-description` : undefined}
          required={required}
          {...props}
        >
          {defaultOption && (
            <option value="" disabled>
              {defaultOption}
            </option>
          )}
          
          {options.map((option) => (
            <option 
              key={option.value} 
              value={option.value}
              disabled={option.disabled}
              className="bg-white dark:bg-dark-800 text-dark-900 dark:text-white"
            >
              {option.label}
            </option>
          ))}
        </select>
        
        {/* Custom select arrow */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-dark-500 dark:text-dark-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
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

export default Select;