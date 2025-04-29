// client/src/components/common/ImageResult.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaDownload, 
  FaExternalLinkAlt, 
  FaClipboard, 
  FaExclamationCircle,
  FaInfoCircle,
  FaCode,
  FaCheck,
  FaImage,
  FaShareAlt
} from 'react-icons/fa';
import Button from './Button';
import Card from './Card';
import { useToast } from '../../context/ToastContext';

const ImageResult = ({ imageData, prompt, onDownload }) => {
  const { addToast } = useToast();
  const [imageUrl, setImageUrl] = useState('');
  const [imageLoadError, setImageLoadError] = useState(false);
  const [imageLoadSuccess, setImageLoadSuccess] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
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
    setIsCopied(false);
    
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
      }
      // Normal array format: { data: [{ url: '...' }] }
      else if (Array.isArray(data.data) && data.data.length > 0) {
        url = data.data[0]?.url || null;
      } 
      // Images array format: { data: { images: [{ url: '...' }] } }
      else if (data.data && data.data.images && Array.isArray(data.data.images) && data.data.images.length > 0) {
        url = data.data.images[0]?.url || null;
      } 
      // Direct URL format: { data: { url: '...' } }
      else if (data.data && typeof data.data === 'object' && data.data.url) {
        url = data.data.url;
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
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      },
      (err) => {
        console.error('Copy error:', err);
        addToast('Failed to copy prompt to clipboard', 'error');
      }
    );
  };

  // Share image (mock functionality)
  const handleShare = () => {
    if (navigator.share && imageUrl) {
      navigator.share({
        title: 'Check out this AI-generated image',
        text: prompt || 'AI-generated image',
        url: imageUrl
      }).then(() => {
        addToast('Image shared successfully!', 'success');
      }).catch(err => {
        console.error('Share error:', err);
        addToast('Failed to share image', 'error');
      });
    } else {
      // Fallback for browsers that don't support navigator.share
      copyPromptToClipboard();
    }
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
      className="relative"
    >
      <Card 
        variant="glass" 
        className="overflow-hidden"
        glow={imageLoadSuccess}
      >
        <div className="relative">
          {imageLoadError || !imageUrl ? (
            <div className="flex flex-col items-center justify-center w-full h-64 p-6 bg-light-100/70 dark:bg-dark-800/70 backdrop-blur-sm">
              <div className="p-4 mb-4 rounded-full bg-red-500/10">
                <FaExclamationCircle size={36} className="text-red-500" />
              </div>
              <p className="mb-2 font-medium text-center text-dark-900 dark:text-white">
                Failed to load or display the generated image
              </p>
              <p className="max-w-md text-sm text-center text-dark-600 dark:text-dark-400">
                The image may still be processing or the link may have expired.
                Try checking the API response details below.
              </p>
            </div>
          ) : (
            <div className="relative group">
              {/* Image */}
              <div className="w-full overflow-hidden bg-light-100/30 dark:bg-dark-900/30 rounded-t-xl">
                <img 
                  src={imageUrl} 
                  alt={prompt || 'Generated image'} 
                  className="object-cover w-full h-auto"
                  onError={handleImageError}
                  onLoad={handleImageLoad}
                />
              </div>
              
              {/* Action buttons overlay - visible on hover or mobile */}
              {imageLoadSuccess && (
                <div className="absolute top-0 left-0 flex flex-col justify-between w-full h-full p-4 transition-opacity duration-300 opacity-0 bg-gradient-to-b from-light-900/60 dark:from-dark-900/60 via-transparent to-light-900/60 dark:to-dark-900/60 group-hover:opacity-100">
                  {/* Top actions row */}
                  <div className="flex justify-end space-x-2">
                    <Button 
                      variant="glass" 
                      size="sm"
                      className="!p-2 rounded-lg backdrop-blur-md"
                      onClick={() => window.open(imageUrl, '_blank')}
                      title="Open in new tab"
                    >
                      <FaExternalLinkAlt size={14} />
                    </Button>
                    <Button 
                      variant="glass" 
                      size="sm"
                      className="!p-2 rounded-lg backdrop-blur-md"
                      onClick={handleShare}
                      title="Share image"
                    >
                      <FaShareAlt size={14} />
                    </Button>
                  </div>
                  
                  {/* Bottom actions row */}
                  <div className="flex justify-center space-x-2">
                    <Button 
                      variant="primary" 
                      size="sm"
                      className="shadow-lg backdrop-blur-md"
                      onClick={handleDownload}
                      title="Download image"
                      icon={<FaDownload size={14} />}
                    >
                      Download
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        
        <Card.Body>
          {/* Prompt Section */}
          {prompt && (
            <div className="mb-5">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-dark-600 dark:text-dark-300">Prompt</h3>
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={copyPromptToClipboard}
                  title="Copy prompt to clipboard"
                  className="text-dark-500 dark:text-dark-400 hover:text-dark-700 dark:hover:text-white"
                  icon={isCopied ? <FaCheck size={12} /> : <FaClipboard size={12} />}
                >
                  {isCopied ? 'Copied' : 'Copy'}
                </Button>
              </div>
              <div className="relative p-3 rounded-lg bg-light-100/70 dark:bg-dark-800/70 group">
                <p className="text-sm text-dark-800 dark:text-white">{prompt}</p>
              </div>
            </div>
          )}
          
          {/* Image Metadata */}
          <div className="flex flex-wrap gap-2 mb-4">
            {metadata.resolution && (
              <Card.Badge color="primary">
                {metadata.resolution}
              </Card.Badge>
            )}
            {metadata.style_type && (
              <Card.Badge color="secondary">
                Style: {metadata.style_type}
              </Card.Badge>
            )}
            {metadata.seed && (
              <Card.Badge color="info">
                Seed: {metadata.seed}
              </Card.Badge>
            )}
            {metadata.is_image_safe === true && (
              <Card.Badge color="success">
                Safe Content
              </Card.Badge>
            )}
          </div>
          
          {/* API Response Details (Collapsible) */}
          <div className="mt-2">
            <Button
              variant="ghost"
              size="xs"
              className="justify-between w-full text-dark-500 dark:text-dark-400 hover:text-dark-700 dark:hover:text-white"
              onClick={() => setShowDetails(!showDetails)}
              icon={<FaCode size={12} />}
              iconPosition="left"
            >
              <span>API Response Details</span>
              <svg 
                className={`w-4 h-4 transition-transform duration-300 ${showDetails ? 'rotate-180' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Button>
            
            <AnimatePresence>
              {showDetails && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-3 mt-2 overflow-auto text-xs border rounded-lg bg-light-50/70 dark:bg-dark-900/70 max-h-48 border-light-300 dark:border-dark-700">
                    <pre className="font-mono text-xs text-dark-600 dark:text-dark-300">
                      {JSON.stringify(imageData, null, 2)}
                    </pre>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Card.Body>
      </Card>
    </motion.div>
  );
};

export default ImageResult;