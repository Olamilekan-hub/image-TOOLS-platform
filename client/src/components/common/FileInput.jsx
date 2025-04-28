// client/src/components/common/FileInput.jsx
import React, { useRef, useState } from 'react';
import { FaUpload, FaTimesCircle } from 'react-icons/fa';

const FileInput = ({ 
  label, 
  id, 
  accept = 'image/*', 
  className = '', 
  error = '',
  onChange,
  ...props 
}) => {
  const [fileName, setFileName] = useState('');
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      
      // Create preview for images
      if (file.type.startsWith('image/')) {
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
        onChange(e);
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

  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-200 mb-1">
          {label}
        </label>
      )}
      <div className="flex flex-col">
        <div className="flex items-center">
          <label
            htmlFor={id}
            className={`
              flex-1 px-3 py-2 bg-base-300 border border-base-200 rounded-md cursor-pointer
              flex items-center justify-center text-gray-300 hover:bg-base-200
              ${error ? 'border-red-500' : ''}
              ${className}
            `}
          >
            <FaUpload className="mr-2" />
            {fileName ? fileName : 'Choose a file...'}
            <input
              ref={fileInputRef}
              id={id}
              type="file"
              accept={accept}
              className="hidden"
              onChange={handleFileChange}
              {...props}
            />
          </label>
          {fileName && (
            <button
              type="button"
              onClick={clearFile}
              className="ml-2 text-gray-400 hover:text-gray-200"
            >
              <FaTimesCircle size={24} />
            </button>
          )}
        </div>
        
        {preview && (
          <div className="mt-2 relative">
            <img
              src={preview}
              alt="File preview"
              className="rounded-md max-h-48 object-contain"
            />
          </div>
        )}
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default FileInput;