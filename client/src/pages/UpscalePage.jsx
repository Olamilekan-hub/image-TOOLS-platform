// client/src/pages/UpscalePage.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaExpandArrowsAlt, 
  FaImage,
  FaMagic,
  FaInfoCircle,
  FaStar,
  FaArrowUp
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

const UpscalePage = () => {
  const { addToast } = useToast();
  
  // Form state
  const [formData, setFormData] = useState({
    prompt: '',
    model: 'V_2A',
  });
  
  // File and UI state
  const [imageFile, setImageFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Model options (removed premium options)
  const modelOptions = [
    { value: 'V_2A', label: 'V2 Turbo (Recommended)' },
    { value: 'V_2', label: 'V2 Standard' }
  ];
  
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
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
      
      // Add optional prompt and model if provided
      if (formData.prompt.trim()) {
        const imageRequest = {
          prompt: formData.prompt,
          model: formData.model
        };
        apiFormData.append('image_request', JSON.stringify(imageRequest));
      }
      
      // Call API to upscale image
      const response = await api.upscaleImage(apiFormData);
      
      // Set result
      setResult(response);
      
      // Show success message
      addToast('Image upscaled successfully!', 'success');
    } catch (error) {
      // Show error message
      addToast(error.message || 'Failed to upscale image', 'error');
      console.error('Upscale error:', error);
    } finally {
      // Stop loading
      setLoading(false);
    }
  };
  
  // Features for the information cards
  const features = [
    {
      title: "Enhanced Resolution",
      description: "Increase the size and quality of your images without losing details or clarity.",
      icon: <FaExpandArrowsAlt />
    },
    {
      title: "AI-Powered Enhancement",
      description: "Our AI not only enlarges but also improves textures, details, and sharpness.",
      icon: <FaMagic />
    },
    {
      title: "Premium Quality",
      description: "Get professional-grade results suitable for printing, large displays, and marketing materials.",
      icon: <FaStar />
    }
  ];
  
  return (
    <div className="container px-4 pt-24 pb-16 mx-auto">
      <PageHeader
        title="Upscale Image"
        subtitle="Enhance your image quality and resolution with AI"
        icon={<FaExpandArrowsAlt size={30} />}
        badge="AI Enhancement"
      />
      
      {/* Feature highlights */}
      <div className="grid grid-cols-1 gap-6 mb-12 md:grid-cols-3">
        {features.map((feature, index) => (
          <Card 
            key={index} 
            variant="glass" 
            className="border-gradient bg-white/70 dark:bg-dark-800/70 backdrop-blur-md border border-light-200/50 dark:border-dark-700/50 rounded-xl"
          >
            <Card.Body>
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-lg bg-primary-500/10 text-primary-600 dark:text-primary-400">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="mb-2 font-medium text-dark-900 dark:text-white">{feature.title}</h3>
                  <p className="text-sm text-dark-600 dark:text-dark-300">{feature.description}</p>
                </div>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Form Section */}
        <FormWrapper
          title="Upscale Your Image"
          subtitle="Upload an image to enhance its resolution and quality"
          variant="glass"
          icon={<FaExpandArrowsAlt size={18} />}
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
                label="Optional Enhancement Prompt"
                id="prompt"
                name="prompt"
                rows={3}
                placeholder="Add an optional prompt to guide the upscaling process (e.g., 'Enhance details in the face' or 'Improve texture quality')"
                value={formData.prompt}
                onChange={handleChange}
                variant="glass"
                helpText="A prompt is optional for upscaling, but can help guide the enhancement process"
              />
            </div>
            
            <div className="mt-6">
              <Select
                label="AI Model"
                id="model"
                name="model"
                options={modelOptions}
                value={formData.model}
                onChange={handleChange}
                variant="glass"
                icon={<FaMagic size={14} />}
                helpText="Select the model to use for upscaling"
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
                icon={<FaExpandArrowsAlt />}
              >
                {loading ? 'Processing...' : 'Upscale Image'}
              </Button>
            </div>
          </form>
        </FormWrapper>
        
        {/* Result Section */}
        <div>
          {loading ? (
            <div className="flex flex-col items-center justify-center h-64 glass-card bg-white/70 dark:bg-dark-800/70 backdrop-blur-md border border-light-200/50 dark:border-dark-700/50 rounded-xl">
              <div className="w-16 h-16 mb-4 border-t-4 border-b-4 rounded-full border-primary-500 animate-spin"></div>
              <p className="text-lg text-dark-900 dark:text-white">Upscaling your image...</p>
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
                <FaArrowUp size={64} className="text-primary-500/60" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-dark-900 dark:text-white font-display">
                Your upscaled image will appear here
              </h3>
              <p className="max-w-md text-center text-dark-600 dark:text-dark-300">
                Upload an image to enhance its resolution and quality with AI
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Information Section */}
      <div className="mt-16">
        <div className="flex items-center mb-6">
          <FaInfoCircle className="mr-3 text-primary-500" size={24} />
          <h2 className="text-2xl font-bold text-dark-900 dark:text-white font-display">About Upscaling</h2>
        </div>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card variant="glass">
            <Card.Body>
              <Card.Title>What is Upscaling?</Card.Title>
              <p className="text-dark-600 dark:text-dark-300">
                Upscaling uses AI to increase image resolution while enhancing details and sharpness. 
                Unlike traditional resizing which can blur images, AI upscaling intelligently adds detail.
              </p>
            </Card.Body>
          </Card>
          
          <Card variant="glass">
            <Card.Body>
              <Card.Title>Best Practices</Card.Title>
              <ul className="pl-5 space-y-2 list-disc text-dark-600 dark:text-dark-300">
                <li>Start with the highest quality image available</li>
                <li>Images should be clear and well-composed</li>
                <li>Add optional prompts to guide enhancement focus</li>
                <li>For best results, upscale images under 2048px</li>
              </ul>
            </Card.Body>
          </Card>
          
          <Card variant="glass">
            <Card.Body>
              <Card.Title>Use Cases</Card.Title>
              <ul className="pl-5 space-y-2 list-disc text-dark-600 dark:text-dark-300">
                <li>Enhance old or low-resolution photos</li>
                <li>Prepare images for large-format printing</li>
                <li>Improve social media and website visuals</li>
                <li>Rescue blurry or degraded images</li>
              </ul>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UpscalePage;