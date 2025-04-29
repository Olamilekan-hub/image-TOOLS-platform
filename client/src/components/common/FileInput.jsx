// client/src/components/common/FileInput.jsx
import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaUpload, FaTimesCircle, FaFile, FaImage } from 'react-icons/fa';

const FileInput = ({ 
  label, 
  id, 
  accept = 'image/*', 
  className = '', 
  error = '',
  helpText = '',
  variant = 'default',
  dragDrop = true,
  showPreview = true,
  required = false,
  onChange,
  ...props 
}) => {
  const [fileName, setFileName] = useState('');
  const [preview, setPreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  // Variant styles
  const variantClasses = {
    default: 'bg-dark-800 border border-dark-600 hover:border-primary-500',
    filled: 'bg-dark-700 border-2 border-dashed border-dark-600 hover:border-primary-500',
    glass: 'bg-dark-800/70 backdrop-blur-sm border border-dark-700/50 hover:border-primary-500',
    minimal: 'bg-transparent border border-dashed border-dark-600 hover:border-primary-500',
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };
  
  const handleFile = (file) => {
    if (file) {
      setFileName(file.name);
      
      // Create preview for images
      if (file.type.startsWith('image/') && showPreview) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setPreview(null);
      }
      
      // Call parent onChange
      if (onChange) {
        const event = { target: { files: [file] } };
        onChange(event);
      }
    }
  };

  const clearFile = () => {
    setFileName('');
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    
    // Call parent onChange with empty file
    if (onChange) {
      const event = { target: { files: [] } };
      onChange(event);
    }
  };
  
  // Drag and drop handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-dark-300 mb-1.5 flex items-center">
          {label}
          {required && <span className="ml-1 text-accent-500">*</span>}
        </label>
      )}

      <div className="flex flex-col">
        {/* File Input Area */}
        <div 
          className={`relative ${dragDrop ? 'cursor-pointer' : ''}`}
          onDragEnter={dragDrop ? handleDrag : null}
        >
          <input
            ref={fileInputRef}
            id={id}
            type="file"
            accept={accept}
            className="sr-only"
            onChange={handleFileChange}
            required={required}
            {...props}
          />
          
          {dragDrop ? (
            <label
              htmlFor={id}
              className={`
                flex flex-col items-center justify-center px-4 py-6 rounded-lg
                transition-all duration-200
                ${dragActive ? 'border-primary-500 bg-primary-500/10' : variantClasses[variant]}
                ${error ? 'border-red-500' : ''}
                ${fileName ? 'pb-3' : 'pb-6'}
                ${className}
              `}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center text-center">
                <div className={`mb-3 p-3 rounded-full ${dragActive ? 'bg-primary-500/20 text-primary-500' : 'bg-dark-700 text-primary-400'}`}>
                  {accept.includes('image') ? (
                    <FaImage className="w-6 h-6" />
                  ) : (
                    <FaFile className="w-6 h-6" />
                  )}
                </div>
                
                <p className="mb-1 text-sm font-medium text-white">
                  {fileName ? fileName : 'Drag & drop file here or click to browse'}
                </p>
                
                {!fileName && (
                  <p className="text-xs text-dark-400">
                    {accept.includes('image') ? 'PNG, JPG, or WebP up to 10MB' : 'Upload a file up to 10MB'}
                  </p>
                )}
              </div>
            </label>
          ) : (
            <div className="flex items-center">
              <label
                htmlFor={id}
                className={`
                  flex-1 px-4 py-2.5 rounded-lg cursor-pointer
                  flex items-center justify-center transition-all duration-200
                  ${variantClasses[variant]}
                  ${error ? 'border-red-500' : ''}
                  ${className}
                `}
              >
                <FaUpload className="mr-2 text-primary-400" />
                {fileName ? fileName : 'Choose a file...'}
              </label>
            </div>
          )}
          
          {fileName && (
            <button
              type="button"
              onClick={clearFile}
              className="absolute p-1 transition-colors rounded-full top-2 right-2 text-dark-400 hover:text-white bg-dark-800/80"
              aria-label="Clear file"
            >
              <FaTimesCircle size={16} />
            </button>
          )}
        </div>
        
        {/* Preview */}
        {preview && showPreview && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="relative mt-3 overflow-hidden rounded-lg shadow-md bg-dark-900/50"
          >
            <img
              src={preview}
              alt="File preview"
              className="object-contain w-full max-h-48"
            />
          </motion.div>
        )}
      </div>
      
      {error ? (
        <p className="mt-1.5 text-sm text-red-500 flex items-center">
          <svg className="w-4 h-4 mr-1.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      ) : helpText && (
        <p className="mt-1.5 text-sm text-dark-400">
          {helpText}
        </p>
      )}
    </div>
  );
};

export default FileInput;