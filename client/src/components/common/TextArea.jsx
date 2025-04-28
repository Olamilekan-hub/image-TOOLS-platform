// client/src/components/common/TextArea.jsx
import React from 'react';

const TextArea = ({ 
  label, 
  id, 
  className = '', 
  error = '', 
  rows = 4, 
  ...props 
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-200 mb-1">
          {label}
        </label>
      )}
      <textarea
        id={id}
        rows={rows}
        className={`
          w-full px-3 py-2 bg-base-300 border border-base-200 rounded-md
          text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent
          ${error ? 'border-red-500 focus:ring-red-500' : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default TextArea;