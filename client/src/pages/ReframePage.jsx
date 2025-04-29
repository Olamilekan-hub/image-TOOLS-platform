// client/src/pages/ReframePage.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaCrop, 
  FaImage, 
  FaCrown,
  FaRuler,
  FaInfoCircle,
  FaMobile,
  FaDesktop,
  FaTabletAlt
} from 'react-icons/fa';

// Import modern components
import PageHeader from '../components/common/PageHeader';
import FormWrapper from '../components/common/FormWrapper';
import Button from '../components/common/Button';
import FileInput from '../components/common/FileInput';
import Select from '../components/common/Select';
import ImageResult from '../components/common/ImageResult';
import Card from '../components/common/Card';
import { useToast } from '../context/ToastContext';
import api from '../services/api';

const ReframePage = () => {
  const { addToast } = useToast();
  
  // Form state
  const [formData, setFormData] = useState({
    resolution: 'RESOLUTION_1024_1024',
    model: 'V_2'  // Default to V_2 for reframe
  });
  
  // File and UI state
  const [imageFile, setImageFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPremiumNotice, setShowPremiumNotice] = useState(false);
  
  // Model options - V_2 standard and premium options
  const modelOptions = [
    { value: 'V_2', label: 'V2 Standard' },
    { value: 'V_3', label: 'V3 Standard (Premium) ✨' }
  ];
  
  // Resolution options based on API documentation
  const resolutionOptions = [
    { value: 'RESOLUTION_1024_1024', label: '1024×1024 - Square' },
    { value: 'RESOLUTION_1024_1792', label: '1024×1792 - Portrait' },
    { value: 'RESOLUTION_1792_1024', label: '1792×1024 - Landscape' },
    { value: 'RESOLUTION_1344_768', label: '1344×768 - Widescreen 16:9' },
    { value: 'RESOLUTION_768_1344', label: '768×1344 - Portrait 9:16' },
    { value: 'RESOLUTION_1152_896', label: '1152×896 - Classic 4:3' },
    { value: 'RESOLUTION_896_1152', label: '896×1152 - Portrait 3:4' },
    { value: 'RESOLUTION_1216_832', label: '1216×832 - Cinematic 3:2' },
    { value: 'RESOLUTION_832_1216', label: '832×1216 - Portrait 2:3' }
  ];
  
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Check if premium model is selected
    if (name === 'model' && value === 'V_3') {
      setShowPremiumNotice(true);
      // Set back to non-premium model
      setFormData({
        ...formData,
        model: 'V_2'
      });
      return;
    }
    
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Close premium notice modal
  const closePremiumNotice = () => {
    setShowPremiumNotice(false);
  };
  
  // Handle image file change
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!imageFile) {
      addToast('Please upload an image', 'error');
      return;
    }
    
    // Start loading
    setLoading(true);
    setResult(null);
    
    try {
      // Prepare form data for API
      const apiFormData = new FormData();
      apiFormData.append('image_file', imageFile);
      apiFormData.append('resolution', formData.resolution);
      apiFormData.append('model', formData.model);
      
      // Call API to reframe image
      const response = await api.reframeImage(apiFormData);
      
      // Set result
      setResult(response);
      
      // Show success message
      addToast('Image reframed successfully!', 'success');
    } catch (error) {
      // Show error message
      addToast(error.message || 'Failed to reframe image', 'error');
      console.error('Reframe error:', error);
    } finally {
      // Stop loading
      setLoading(false);
    }
  };
  
  // Device use cases
  const deviceUseCases = [
    {
      title: "Mobile",
      description: "Create vertical 9:16 content perfect for mobile stories, reels, and TikTok videos.",
      icon: <FaMobile size={24} />,
      resolution: "768×1344"
    },
    {
      title: "Desktop",
      description: "Transform images into widescreen formats ideal for website banners and desktop applications.",
      icon: <FaDesktop size={24} />,
      resolution: "1344×768"
    },
    {
      title: "Tablet",
      description: "Optimize your visuals for tablet displays with the perfect 4:3 aspect ratio.",
      icon: <FaTabletAlt size={24} />,
      resolution: "1152×896"
    }
  ];
  
  return (
    <div className="container px-4 pt-24 pb-16 mx-auto">
      <PageHeader
        title="Reframe Image"
        subtitle="Change the aspect ratio of your image while preserving content"
        icon={<FaCrop size={30} />}
        badge="AI Powered"
      />
      
      {/* Device optimization cards */}
      <div className="grid grid-cols-1 gap-6 mb-12 md:grid-cols-3">
        {deviceUseCases.map((device, index) => (
          <Card 
            key={index} 
            variant="glass" 
            hover={true}
            className="border-gradient"
          >
            <Card.Body>
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-lg bg-primary-500/10 text-primary-400">
                  {device.icon}
                </div>
                <div>
                  <h3 className="mb-2 font-medium text-white">{device.title}</h3>
                  <p className="mb-2 text-sm text-dark-300">{device.description}</p>
                  <span className="inline-block px-2 py-1 text-xs rounded bg-dark-700/60">
                    {device.resolution}
                  </span>
                </div>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Form Section */}
        <FormWrapper
          title="Reframe Your Image"
          subtitle="Upload an image and select your desired aspect ratio"
          variant="glass"
          icon={<FaCrop size={18} />}
          loading={loading}
        >
          <form onSubmit={handleSubmit}>
            <FileInput
              label="Upload Image"
              id="image_file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleImageChange}
              variant="glass"
              helpText="Supported formats: JPEG, PNG, WebP (max 10MB)"
              required={true}
              dragDrop={true}
            />
            
            <div className="mt-6">
              <Select
                label="Target Resolution"
                id="resolution"
                name="resolution"
                options={resolutionOptions}
                value={formData.resolution}
                onChange={handleChange}
                variant="glass"
                icon={<FaRuler size={14} />}
                helpText="Select the resolution and aspect ratio you want for the output image"
              />
            </div>
            
            <div className="mt-4">
              <Select
                label="Model"
                id="model"
                name="model"
                options={modelOptions}
                value={formData.model}
                onChange={handleChange}
                variant="glass"
                icon={<FaImage size={14} />}
                helpText="V2 Standard model is recommended for reframing"
              />
            </div>
            
            <div className="mt-6">
              <Button 
                type="submit"
                variant="primary"
                size="lg"
                disabled={loading || !imageFile}
                loading={loading}
                className="w-full"
                icon={<FaCrop />}
              >
                {loading ? 'Processing...' : 'Reframe Image'}
              </Button>
            </div>
          </form>
        </FormWrapper>
        
        {/* Result Section */}
        <div>
          {loading ? (
            <div className="flex flex-col items-center justify-center h-64 glass-card">
              <div className="w-16 h-16 mb-4 border-t-4 border-b-4 rounded-full border-primary-500 animate-spin"></div>
              <p className="text-lg text-white">Reframing your image...</p>
              <p className="mt-2 text-sm text-dark-400">This may take a few moments</p>
            </div>
          ) : result ? (
            <ImageResult 
              imageData={result}
            />
          ) : (
            <div className="glass-card flex flex-col items-center justify-center p-8 h-full min-h-[400px]">
              <div className="p-6 mb-6 rounded-full bg-primary-500/10 animate-pulse-slow">
                <FaCrop size={64} className="text-primary-500/60" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-white font-display">
                Your reframed image will appear here
              </h3>
              <p className="max-w-md text-center text-dark-400">
                Upload an image and select your desired aspect ratio
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* About Reframing Section */}
      <div className="mt-16">
        <div className="flex items-center mb-6">
          <FaInfoCircle className="mr-3 text-primary-500" size={24} />
          <h2 className="text-2xl font-bold font-display">About Reframing</h2>
        </div>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card variant="glass">
            <Card.Body>
              <Card.Title>What is Reframing?</Card.Title>
              <p className="text-dark-300">
                Reframing intelligently adapts your image to a new aspect ratio without awkward cropping or distortion. 
                Unlike traditional resizing methods that can cut off important parts or stretch the image unnaturally, 
                AI reframing uses advanced algorithms to preserve the main subject while extending the background or 
                intelligently filling in missing areas as needed.
              </p>
            </Card.Body>
          </Card>
          
          <Card variant="glass">
            <Card.Body>
              <Card.Title>Common Use Cases</Card.Title>
              <ul className="pl-5 space-y-2 list-disc text-dark-300">
                <li>Convert landscape photos to portrait format for stories or social media</li>
                <li>Adapt images to specific dimensions for websites, ads, or print materials</li>
                <li>Create square versions of rectangular images for Instagram or profile pictures</li>
                <li>Convert vertical videos to horizontal formats (or vice versa)</li>
                <li>Optimize images for different devices and screen sizes</li>
              </ul>
            </Card.Body>
          </Card>
        </div>
      </div>
      
      {/* Premium Notice Modal */}
      <AnimatePresence>
        {showPremiumNotice && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-900/80 backdrop-blur-sm"
            onClick={closePremiumNotice}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="max-w-md p-8 mx-auto shadow-2xl bg-dark-800 rounded-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-center mb-6">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-amber-500/10">
                  <FaCrown size={32} className="text-amber-500" />
                </div>
              </div>
              
              <h3 className="mb-3 text-2xl font-bold text-center font-display">Premium Feature</h3>
              
              <p className="mb-6 text-center text-dark-300">
                V3 models are exclusive to premium users. Our premium subscription will be available soon with enhanced features and faster processing!
              </p>
              
              <div className="flex justify-center">
                <Button 
                  onClick={closePremiumNotice}
                  variant="glass"
                  size="lg"
                >
                  Continue with Standard Models
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReframePage;