// client/src/pages/EditPage.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaPencilAlt, 
  FaCrown, 
  FaImage,
  FaMagic,
  FaInfoCircle,
  FaLayerGroup
} from 'react-icons/fa';

// Import modern components
import PageHeader from '../components/common/PageHeader';
import FormWrapper from '../components/common/FormWrapper';
import Button from '../components/common/Button';
import TextArea from '../components/common/TextArea';
import FileInput from '../components/common/FileInput';
import Select from '../components/common/Select';
import ImageResult from '../components/common/ImageResult';
import Card from '../components/common/Card';
import { useToast } from '../context/ToastContext';
import api from '../services/api';

const EditPage = () => {
  const { addToast } = useToast();
  
  // Form state
  const [formData, setFormData] = useState({
    prompt: '',
    model: 'V_2A',
    aspect_ratio: 'ASPECT_16_9',
    magic_prompt_option: 'ON'
  });
  
  // File and UI state
  const [imageFile, setImageFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPremiumNotice, setShowPremiumNotice] = useState(false);
  
  // Model options
  const modelOptions = [
    { value: 'V_2A', label: 'V2 Turbo (Recommended)' },
    { value: 'V_2', label: 'V2 Standard' },
    { value: 'V_3A', label: 'V3 Turbo (Premium) ✨' },
    { value: 'V_3', label: 'V3 Standard (Premium) ✨' }
  ];
  
  // Aspect ratio options
  const aspectRatioOptions = [
    { value: 'ASPECT_16_9', label: '16:9 - Landscape' },
    { value: 'ASPECT_9_16', label: '9:16 - Portrait' },
    { value: 'ASPECT_1_1', label: '1:1 - Square' },
    { value: 'ASPECT_4_3', label: '4:3 - Standard' },
    { value: 'ASPECT_3_2', label: '3:2 - Classic Photo' },
    { value: 'ASPECT_2_3', label: '2:3 - Portrait' },
    { value: 'ASPECT_16_10', label: '16:10 - Widescreen' },
    { value: 'ASPECT_10_16', label: '10:16 - Vertical' },
    { value: 'ASPECT_3_1', label: '3:1 - Panorama' },
    { value: 'ASPECT_1_3', label: '1:3 - Vertical Panorama' },
    { value: 'ASPECT_3_4', label: '3:4 - Reverse Standard' }
  ];
  
  // Magic prompt options
  const magicPromptOptions = [
    { value: 'ON', label: 'Enabled - Enhance prompt' },
    { value: 'OFF', label: 'Disabled - Use exact prompt' },
    { value: 'AUTO', label: 'Auto - System decides' }
  ];
  
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Check if premium model is selected
    if (name === 'model' && (value === 'V_3A' || value === 'V_3')) {
      setShowPremiumNotice(true);
      // Set back to a non-premium model
      setFormData({
        ...formData,
        model: 'V_2A'
      });
      return;
    }
    
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Handle image file change
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };
  
  // Close premium notice modal
  const closePremiumNotice = () => {
    setShowPremiumNotice(false);
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.prompt.trim()) {
      addToast('Please enter a prompt', 'error');
      return;
    }
    
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
      
      // Create the image_request object
      const imageRequest = {
        prompt: formData.prompt,
        model: formData.model,
        aspect_ratio: formData.aspect_ratio,
        magic_prompt_option: formData.magic_prompt_option
      };
      
      apiFormData.append('image_request', JSON.stringify(imageRequest));
      
      // Call remix API to edit image
      const response = await api.remixImage(apiFormData);
      
      // Set result
      setResult(response);
      
      // Show success message
      addToast('Image edited successfully!', 'success');
    } catch (error) {
      // Show error message
      addToast(error.message || 'Failed to edit image', 'error');
      console.error('Edit error:', error);
    } finally {
      // Stop loading
      setLoading(false);
    }
  };
  
  return (
    <div className="container px-4 pt-24 pb-16 mx-auto">
      <PageHeader
        title="Edit Image"
        subtitle="Upload an image and describe how you want to edit it"
        icon={<FaPencilAlt size={30} />}
        badge="AI Powered"
      />
      
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Form Section */}
        <FormWrapper
          title="Upload & Edit"
          subtitle="Choose your image and describe your desired changes"
          variant="glass"
          icon={<FaPencilAlt size={18} />}
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
              <TextArea
                label="Edit Instructions"
                id="prompt"
                name="prompt"
                rows={4}
                placeholder="Describe how you want to transform this image. Add details about style, changes, and elements you want to add or modify."
                value={formData.prompt}
                onChange={handleChange}
                variant="glass"
                required={true}
                showCount={true}
                maxLength={1000}
              />
            </div>
            
            <div className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-2">
              <Select
                label="Model"
                id="model"
                name="model"
                options={modelOptions}
                value={formData.model}
                onChange={handleChange}
                variant="glass"
                icon={<FaMagic size={14} />}
              />
              
              <Select
                label="Aspect Ratio"
                id="aspect_ratio"
                name="aspect_ratio"
                options={aspectRatioOptions}
                value={formData.aspect_ratio}
                onChange={handleChange}
                variant="glass"
                icon={<FaLayerGroup size={14} />}
              />
            </div>
            
            <div className="mt-4">
              <Select
                label="Magic Prompt"
                id="magic_prompt_option"
                name="magic_prompt_option"
                options={magicPromptOptions}
                value={formData.magic_prompt_option}
                onChange={handleChange}
                variant="glass"
                icon={<FaInfoCircle size={14} />}
                helpText="Magic Prompt enhances your input by adding details to improve image quality"
              />
            </div>
            
            <div className="mt-6">
              <Button 
                type="submit"
                variant="primary"
                size="lg"
                disabled={loading || !formData.prompt.trim() || !imageFile}
                loading={loading}
                className="w-full"
                icon={<FaPencilAlt />}
              >
                {loading ? 'Editing...' : 'Edit Image'}
              </Button>
            </div>
          </form>
        </FormWrapper>
        
        {/* Result Section */}
        <div>
          {loading ? (
            <div className="flex flex-col items-center justify-center h-64 glass-card bg-white/70 dark:bg-dark-800/70 backdrop-blur-md border border-light-200/50 dark:border-dark-700/50 rounded-xl">
              <div className="w-16 h-16 mb-4 border-t-4 border-b-4 rounded-full border-primary-500 animate-spin"></div>
              <p className="text-lg text-dark-900 dark:text-white">Editing your image...</p>
              <p className="mt-2 text-sm text-dark-600 dark:text-dark-400">This may take a few moments</p>
            </div>
          ) : result ? (
            <ImageResult 
              imageData={result} 
              prompt={formData.prompt}
            />
          ) : (
            <div className="glass-card flex flex-col items-center justify-center p-8 h-full min-h-[400px] bg-white/70 dark:bg-dark-800/70 backdrop-blur-md border border-light-200/50 dark:border-dark-700/50 rounded-xl">
              <div className="p-6 mb-6 rounded-full bg-primary-500/10 animate-pulse-slow">
                <FaImage size={64} className="text-primary-500/60" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-dark-900 dark:text-white font-display">
                Your edited image will appear here
              </h3>
              <p className="max-w-md text-center text-dark-600 dark:text-dark-300">
                Upload an image and add edit instructions to transform it with AI
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* How-to Instructions Section */}
      <div className="mt-16">
        <div className="flex items-center mb-6">
          <FaInfoCircle className="mr-3 text-primary-500" size={24} />
          <h2 className="text-2xl font-bold text-dark-900 dark:text-white font-display">How to Edit Images</h2>
        </div>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card variant="glass">
            <Card.Body>
              <div className="flex justify-center mb-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary-500/10">
                  <span className="text-xl font-bold text-primary-600 dark:text-primary-400">1</span>
                </div>
              </div>
              <Card.Title className="text-center">Upload Your Image</Card.Title>
              <p className="text-center text-dark-600 dark:text-dark-300">
                Start by uploading the image you want to edit. Supported formats are JPEG, PNG, and WebP.
              </p>
            </Card.Body>
          </Card>
          
          <Card variant="glass">
            <Card.Body>
              <div className="flex justify-center mb-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-secondary-500/10">
                  <span className="text-xl font-bold text-secondary-600 dark:text-secondary-400">2</span>
                </div>
              </div>
              <Card.Title className="text-center">Describe Your Changes</Card.Title>
              <p className="text-center text-dark-600 dark:text-dark-300">
                Clearly describe how you want to edit the image. Be specific about what elements to change, add, or modify.
              </p>
            </Card.Body>
          </Card>
          
          <Card variant="glass">
            <Card.Body>
              <div className="flex justify-center mb-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent-500/10">
                  <span className="text-xl font-bold text-accent-600 dark:text-accent-400">3</span>
                </div>
              </div>
              <Card.Title className="text-center">Choose Settings</Card.Title>
              <p className="text-center text-dark-600 dark:text-dark-300">
                Select your preferred model, aspect ratio, and whether to use magic prompt enhancement, then generate your edited image.
              </p>
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-light-900/30 dark:bg-dark-900/80 backdrop-blur-sm"
            onClick={closePremiumNotice}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="max-w-md p-8 mx-auto shadow-2xl bg-white dark:bg-dark-800 rounded-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-center mb-6">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-amber-500/10">
                  <FaCrown size={32} className="text-amber-500" />
                </div>
              </div>
              
              <h3 className="mb-3 text-2xl font-bold text-center text-dark-900 dark:text-white font-display">Premium Feature</h3>
              
              <p className="mb-6 text-center text-dark-600 dark:text-dark-300">
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

export default EditPage;