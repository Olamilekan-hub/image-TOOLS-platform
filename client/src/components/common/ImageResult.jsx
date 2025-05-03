// client/src/components/common/ImageResult.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaDownload, 
  FaClipboard, 
  FaExclamationCircle,
  FaCheck,
  FaExpand,
  FaShareAlt,
  FaTimes
} from 'react-icons/fa';
import Button from './Button';
import Card from './Card';
import { useToast } from '../../context/ToastContext';

const ImageResult = ({ imageData, prompt, onDownload }) => {
  const { addToast } = useToast();
  const [imageUrl, setImageUrl] = useState('');
  const [imageLoadError, setImageLoadError] = useState(false);
  const [imageLoadSuccess, setImageLoadSuccess] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
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
    setIsFullScreen(false);
    
    if (!imageData) {
      console.error('No image data received');
      setImageLoadError(true);
      return;
    }

    // Extract image URL
    let url = extractImageUrl(imageData);
    setImageUrl(url);
    
    if (!url) {
      console.error('No image URL found in the response data');
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
    console.error('Failed to load image from URL');
    setImageLoadError(true);
    setImageLoadSuccess(false);
    addToast('Failed to load the generated image. The image may still be processing.', 'error');
  };
  
  // Handle image load success
  const handleImageLoad = () => {
    setImageLoadSuccess(true);
    setImageLoadError(false);
  };
  
  // Correctly implemented download function
  const handleDownload = () => {
    if (!imageUrl) {
      addToast('No image available to download', 'error');
      return;
    }
    
    // Use custom onDownload if provided
    if (onDownload) {
      onDownload(imageUrl);
      return;
    }
    
    // The correct way to trigger a download directly:
    // 1. Create an invisible anchor element in memory
    const downloadLink = document.createElement('a');
    
    // 2. Set its href to the image URL (this stays internal to the browser)
    downloadLink.href = imageUrl;
    
    // 3. Set download attribute with a filename (forces "Save As" dialog)
    downloadLink.download = `pixy-ai-${Date.now()}.png`;
    
    // 4. Append to document (required for Firefox)
    document.body.appendChild(downloadLink);
    
    // 5. Programmatically click (triggers Save As without navigation)
    downloadLink.click();
    
    // 6. Clean up
    document.body.removeChild(downloadLink);
    
    // 7. Notify user
    addToast('Download started!', 'success');
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

  // Share image
  const handleShare = () => {
    if (navigator.share && imageUrl) {
      navigator.share({
        title: 'AI-generated image',
        text: prompt || 'Check out this AI-generated image',
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
  
  // Toggle fullscreen mode for the image
  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
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
      {/* Fullscreen Image Modal */}
      <AnimatePresence>
        {isFullScreen && imageUrl && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
            onClick={toggleFullScreen}
          >
            <div className="relative max-w-full max-h-full p-4">
              <button 
                className="absolute p-2 text-white rounded-full bg-dark-800/50 top-4 right-4 hover:bg-dark-700"
                onClick={toggleFullScreen}
              >
                <FaTimes size={24} />
              </button>
              <img 
                src={imageUrl} 
                alt={prompt || 'Generated image'} 
                className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
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
              </p>
            </div>
          ) : (
            <div className="relative group">
              {/* Image with click to fullscreen */}
              <div 
                className="w-full overflow-hidden cursor-pointer bg-light-100/30 dark:bg-dark-900/30 rounded-t-xl"
                onClick={toggleFullScreen}
              >
                <img 
                  src={imageUrl} 
                  alt={prompt || 'Generated image'} 
                  className="object-cover w-full h-auto"
                  onError={handleImageError}
                  onLoad={handleImageLoad}
                />
                {/* Fullscreen hint overlay */}
                <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 opacity-0 bg-dark-900/40 group-hover:opacity-100">
                  <div className="p-3 rounded-full bg-dark-800/70">
                    <FaExpand className="text-white" size={20} />
                  </div>
                </div>
              </div>
              
              {/* Action buttons overlay - visible on hover or mobile */}
              {imageLoadSuccess && (
                <div className="absolute bottom-0 flex items-center justify-center w-full p-4 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-dark-900/80 to-transparent group-hover:opacity-100">
                  <div className="flex space-x-3">
                    <Button 
                      variant="glass" 
                      size="sm"
                      className="backdrop-blur-md"
                      onClick={handleDownload}
                      title="Download image"
                      icon={<FaDownload size={14} />}
                    >
                      Download
                    </Button>
                    
                    <Button 
                      variant="glass" 
                      size="sm"
                      className="backdrop-blur-md"
                      onClick={handleShare}
                      title="Share image"
                      icon={<FaShareAlt size={14} />}
                    >
                      Share
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
          
          {/* Download and action buttons for smaller screens */}
          <div className="flex flex-wrap gap-3 pt-4 mt-4 border-t md:hidden border-light-200/50 dark:border-dark-700/50">
            <Button 
              variant="primary" 
              size="sm"
              onClick={handleDownload}
              title="Download image"
              icon={<FaDownload size={14} />}
              className="flex-1"
            >
              Download
            </Button>
            
            <Button 
              variant="secondary" 
              size="sm"
              onClick={toggleFullScreen}
              title="View fullscreen"
              icon={<FaExpand size={14} />}
              className="flex-1"
            >
              Fullscreen
            </Button>
          </div>
        </Card.Body>
      </Card>
    </motion.div>
  );
};

export default ImageResult;