// client/src/components/common/ImageResult.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaDownload, FaExternalLinkAlt, FaClipboard, FaExclamationCircle } from 'react-icons/fa';
import Button from './Button';
import Card from './Card';
import { useToast } from '../../context/ToastContext';

const ImageResult = ({ imageData, prompt, onDownload }) => {
  const { addToast } = useToast();
  const [imageUrl, setImageUrl] = useState('');
  const [imageLoadError, setImageLoadError] = useState(false);
  const [imageLoadSuccess, setImageLoadSuccess] = useState(false);
  const [metadata, setMetadata] = useState({
    resolution: null,
    style_type: null,
    seed: null,
    is_image_safe: null
  });
  
  useEffect(() => {
    // Reset states when new data comes in
    setImageLoadError(false);
    setImageLoadSuccess(false);
    
    console.log('ImageResult received data:', imageData);
    
    if (!imageData) {
      console.error('No image data received');
      setImageLoadError(true);
      return;
    }

    // Extract image URL
    let url = extractImageUrl(imageData);
    setImageUrl(url);
    
    if (!url) {
      console.error('No image URL found in the response data:', imageData);
      setImageLoadError(true);
      addToast('No image URL found in the API response', 'error');
    }
    
    // Extract metadata
    const extractedMetadata = extractMetadata(imageData);
    setMetadata(extractedMetadata);
    
  }, [imageData, addToast]);
  
  // Extract URL from various response formats
  const extractImageUrl = (data) => {
    let url = null;
    
    try {
      // Special case for the specific structure we found:
      // { data: { data: [{ url: '...' }] } }
      if (data.data && data.data.data && Array.isArray(data.data.data) && data.data.data.length > 0) {
        url = data.data.data[0]?.url || null;
        console.log('Found URL in data.data[0].url:', url);
      }
      // Normal array format: { data: [{ url: '...' }] }
      else if (Array.isArray(data.data) && data.data.length > 0) {
        url = data.data[0]?.url || null;
        console.log('Found URL in data[0].url:', url);
      } 
      // Images array format: { data: { images: [{ url: '...' }] } }
      else if (data.data && data.data.images && Array.isArray(data.data.images) && data.data.images.length > 0) {
        url = data.data.images[0]?.url || null;
        console.log('Found URL in data.images[0].url:', url);
      } 
      // Direct URL format: { data: { url: '...' } }
      else if (data.data && typeof data.data === 'object' && data.data.url) {
        url = data.data.url;
        console.log('Found URL in data.url:', url);
      }
    } catch (e) {
      console.error('Error extracting URL:', e);
    }
    
    return url;
  };
  
  // Extract metadata from response
  const extractMetadata = (data) => {
    let meta = {
      resolution: null,
      style_type: null,
      seed: null,
      is_image_safe: null
    };
    
    try {
      // Check if data.data[0] exists (our specific case)
      if (data.data && data.data.data && data.data.data[0]) {
        const imageInfo = data.data.data[0];
        meta.resolution = imageInfo.resolution || null;
        meta.style_type = imageInfo.style_type || null;
        meta.seed = imageInfo.seed || null;
        meta.is_image_safe = imageInfo.is_image_safe !== undefined ? imageInfo.is_image_safe : null;
      }
    } catch (e) {
      console.error('Error extracting metadata:', e);
    }
    
    return meta;
  };
  
  // Handle image load error
  const handleImageError = () => {
    console.error('Failed to load image from URL:', imageUrl);
    setImageLoadError(true);
    setImageLoadSuccess(false);
    addToast('Failed to load the generated image. The image link may have expired or be invalid.', 'error');
  };
  
  // Handle image load success
  const handleImageLoad = () => {
    console.log('Image loaded successfully');
    setImageLoadSuccess(true);
    setImageLoadError(false);
  };
  
  // Handle download button click with error handling
  const handleDownload = () => {
    if (!imageUrl) {
      addToast('No image available to download', 'error');
      return;
    }
    
    if (onDownload) {
      onDownload(imageUrl);
      return;
    }
    
    try {
      // Create download link and trigger download
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = `ideogram-${Date.now()}.png`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      addToast('Image downloaded successfully', 'success');
    } catch (error) {
      console.error('Download error:', error);
      // Fallback: Open in new tab
      window.open(imageUrl, '_blank');
      addToast('Direct download failed. Image opened in new tab instead.', 'info');
    }
  };
  
  // Copy prompt to clipboard
  const copyPromptToClipboard = () => {
    if (!prompt) {
      addToast('No prompt available to copy', 'error');
      return;
    }
    
    navigator.clipboard.writeText(prompt).then(
      () => {
        addToast('Prompt copied to clipboard!', 'success');
      },
      (err) => {
        console.error('Copy error:', err);
        addToast('Failed to copy prompt to clipboard', 'error');
      }
    );
  };

  // If no data, don't render
  if (!imageData) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden">
        <div className="relative">
          {imageLoadError || !imageUrl ? (
            <div className="w-full h-64 bg-base-300 flex flex-col items-center justify-center p-6">
              <FaExclamationCircle size={48} className="text-red-500 mb-4" />
              <p className="text-center text-gray-300 mb-2">
                Failed to load or display the generated image.
              </p>
              <p className="text-center text-gray-400 text-sm">
                The image may still be processing or the link may have expired.
                Try checking the API response details below.
              </p>
            </div>
          ) : (
            <div className="relative">
              <img 
                src={imageUrl} 
                alt={prompt || 'Generated image'} 
                className="w-full h-auto object-cover"
                onError={handleImageError}
                onLoad={handleImageLoad}
              />
              {imageLoadSuccess && (
                <div className="absolute top-2 right-2 flex space-x-2">
                  <Button 
                    variant="primary" 
                    className="p-2 rounded-full"
                    onClick={handleDownload}
                    title="Download image"
                  >
                    <FaDownload />
                  </Button>
                  <Button 
                    variant="secondary" 
                    className="p-2 rounded-full"
                    onClick={() => window.open(imageUrl, '_blank')}
                    title="Open in new tab"
                  >
                    <FaExternalLinkAlt />
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
        
        <Card.Body>
          <h3 className="text-lg font-semibold mb-2">Result</h3>
          
          {/* Prompt Section */}
          {prompt && (
            <div className="bg-base-300 p-3 rounded-md relative group mb-4">
              <p className="text-sm text-gray-300 mb-1">Prompt:</p>
              <p className="text-white pr-8">{prompt}</p>
              
              <Button
                variant="ghost"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1"
                onClick={copyPromptToClipboard}
                title="Copy prompt to clipboard"
              >
                <FaClipboard size={16} />
              </Button>
            </div>
          )}
          
          {/* Image Metadata */}
          <div className="mt-4 flex flex-wrap gap-2">
            {metadata.resolution && (
              <span className="bg-base-300 px-2 py-1 rounded-md text-xs">
                {metadata.resolution}
              </span>
            )}
            {metadata.style_type && (
              <span className="bg-base-300 px-2 py-1 rounded-md text-xs">
                {metadata.style_type}
              </span>
            )}
            {metadata.seed && (
              <span className="bg-base-300 px-2 py-1 rounded-md text-xs">
                Seed: {metadata.seed}
              </span>
            )}
            {metadata.is_image_safe === true && (
              <span className="bg-green-900 px-2 py-1 rounded-md text-xs text-green-100">
                Safe Content
              </span>
            )}
          </div>
          
          {/* API Response Details (Collapsible) */}
          <details className="mt-4 bg-base-300 p-3 rounded-md">
            <summary className="cursor-pointer font-medium">API Response Details</summary>
            <div className="mt-2 bg-base-200 p-2 rounded-md overflow-auto max-h-48">
              <pre className="text-xs text-gray-300 whitespace-pre-wrap">
                {JSON.stringify(imageData, null, 2)}
              </pre>
            </div>
          </details>
        </Card.Body>
      </Card>
    </motion.div>
  );
};

export default ImageResult;