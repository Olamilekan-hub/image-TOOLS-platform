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
  
  useEffect(() => {
    // Reset states when new data comes in
    setImageLoadError(false);
    setImageLoadSuccess(false);
    
    // Extract image URL from response data with fallback paths
    if (imageData && imageData.data && imageData.data.length > 0) {
      const url = imageData.data[0].url || '';
      setImageUrl(url);
      
      if (!url) {
        console.error('No image URL found in the response data:', imageData);
        setImageLoadError(true);
        addToast('No image URL found in the API response', 'error');
      }
    } else if (imageData && imageData.error) {
      console.error('API returned an error:', imageData.error);
      setImageLoadError(true);
      addToast(`API Error: ${imageData.message || 'Unknown error'}`, 'error');
    } else if (!imageData) {
      console.error('No image data received');
      setImageLoadError(true);
    }
  }, [imageData, addToast]);
  
  // Handle image load error
  const handleImageError = () => {
    console.error('Failed to load image from URL:', imageUrl);
    setImageLoadError(true);
    setImageLoadSuccess(false);
    addToast('Failed to load the generated image. The image link may have expired or be invalid.', 'error');
  };
  
  // Handle image load success
  const handleImageLoad = () => {
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
      // Check if we can fetch the image (CORS might prevent this)
      fetch(imageUrl, { method: 'HEAD' })
        .then(response => {
          if (!response.ok) {
            throw new Error(`Failed to fetch image: ${response.statusText}`);
          }
          
          // Create download link and trigger download
          const link = document.createElement('a');
          link.href = imageUrl;
          link.download = `ideogram-${Date.now()}.jpg`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          
          addToast('Image downloaded successfully', 'success');
        })
        .catch(error => {
          console.error('Download error:', error);
          
          // Fallback: Open in new tab if direct download fails
          window.open(imageUrl, '_blank');
          addToast('Direct download failed. Image opened in new tab instead.', 'info');
        });
    } catch (error) {
      console.error('Download error:', error);
      addToast('Failed to download image. Please try opening in a new tab instead.', 'error');
      
      // Fallback: Open in new tab
      window.open(imageUrl, '_blank');
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

  // If no data or URL, don't render
  if (!imageData || (!imageUrl && !imageLoadError)) {
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
          {imageLoadError ? (
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
            {imageData?.data?.[0]?.resolution && (
              <span className="bg-base-300 px-2 py-1 rounded-md text-xs">
                {imageData.data[0].resolution}
              </span>
            )}
            {imageData?.data?.[0]?.style_type && (
              <span className="bg-base-300 px-2 py-1 rounded-md text-xs">
                {imageData.data[0].style_type}
              </span>
            )}
            {imageData?.data?.[0]?.seed && (
              <span className="bg-base-300 px-2 py-1 rounded-md text-xs">
                Seed: {imageData.data[0].seed}
              </span>
            )}
            {imageData?.data?.[0]?.is_image_safe === true && (
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