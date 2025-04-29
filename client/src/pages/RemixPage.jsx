// client/src/pages/RemixPage.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaMagic, 
  FaRandom, 
  FaImage,
  FaLayerGroup,
  FaInfoCircle,
  FaPaintBrush,
  FaLightbulb,
  FaArrowRight
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

const RemixPage = () => {
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
  const [showIdeas, setShowIdeas] = useState(false);
  
  // Model options
  const modelOptions = [
    { value: 'V_2A', label: 'V2 Turbo (Recommended)' },
    { value: 'V_2', label: 'V2 Standard' },
    { value: 'V_1', label: 'V1 Legacy' }
  ];
  
  // Aspect ratio options
  const aspectRatioOptions = [
    { value: 'ASPECT_16_9', label: '16:9 - Landscape' },
    { value: 'ASPECT_9_16', label: '9:16 - Portrait' },
    { value: 'ASPECT_1_1', label: '1:1 - Square' },
    { value: 'ASPECT_4_3', label: '4:3 - Standard' },
    { value: 'ASPECT_3_2', label: '3:2 - Classic Photo' }
  ];
  
  // Magic prompt options
  const magicPromptOptions = [
    { value: 'ON', label: 'Enabled - Enhance input prompt' },
    { value: 'OFF', label: 'Disabled - Use exact prompt' }
  ];
  
  // Remix ideas
  const remixIdeas = {
    "Style Transfer": [
      "Convert to watercolor painting style with vibrant colors",
      "Transform into a neon cyberpunk scene with glowing elements",
      "Remake in the style of Van Gogh's Starry Night"
    ],
    "Environment Change": [
      "Transport to a lush tropical rainforest",
      "Place in a futuristic city with flying cars",
      "Move to a serene beach at sunset"
    ],
    "Time & Season": [
      "Convert to nighttime with moonlight",
      "Transform to winter scene with snow falling",
      "Change to autumn with golden leaves"
    ]
  };
  
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
  
  // Apply remix idea
  const applyRemixIdea = (idea) => {
    setFormData({
      ...formData,
      prompt: idea
    });
    // Focus the textarea
    document.getElementById('prompt').focus();
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
      
      // Call API to remix image
      const response = await api.remixImage(apiFormData);
      
      // Set result
      setResult(response);
      
      // Show success message
      addToast('Image remixed successfully!', 'success');
    } catch (error) {
      // Show error message
      addToast(error.message || 'Failed to remix image', 'error');
      console.error('Remix error:', error);
    } finally {
      // Stop loading
      setLoading(false);
    }
  };
  
  return (
    <div className="container px-4 pt-24 pb-16 mx-auto">
      <PageHeader
        title="Remix Image"
        subtitle="Upload an image and transform it with a creative prompt"
        icon={<FaMagic size={30} />}
        badge="Creative AI"
      />
      
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Form Section */}
        <FormWrapper
          title="Remix Your Image"
          subtitle="Upload an image and describe how you want to transform it"
          variant="glass"
          icon={<FaMagic size={18} />}
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
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="prompt" className="flex items-center block text-sm font-medium text-dark-300">
                  Remix Prompt <span className="ml-1 text-accent-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowIdeas(!showIdeas)}
                  className="flex items-center text-xs transition-colors text-primary-400 hover:text-primary-300"
                >
                  <FaLightbulb className="mr-1" size={12} />
                  <span>Need ideas?</span>
                </button>
              </div>
              
              <TextArea
                id="prompt"
                name="prompt"
                rows={4}
                placeholder="Describe how you want to transform this image. Add details about style, mood, lighting, etc."
                value={formData.prompt}
                onChange={handleChange}
                variant="glass"
                required={true}
                showCount={true}
                maxLength={1000}
              />
            </div>
            
            <AnimatePresence>
              {showIdeas && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-3 mb-6 overflow-hidden"
                >
                  <div className="p-4 border rounded-lg bg-dark-800/50 backdrop-blur-sm border-dark-700/50">
                    <h4 className="mb-3 text-sm font-medium text-white">Remix Ideas:</h4>
                    
                    <div className="space-y-4">
                      {Object.entries(remixIdeas).map(([category, ideas]) => (
                        <div key={category}>
                          <h5 className="mb-2 text-xs font-medium text-primary-400">{category}</h5>
                          <div className="space-y-2">
                            {ideas.map((idea, index) => (
                              <div 
                                key={index}
                                className="flex items-center justify-between p-2 text-sm transition-colors rounded-lg cursor-pointer bg-dark-700/50 hover:bg-dark-700"
                                onClick={() => applyRemixIdea(idea)}
                              >
                                <span className="text-dark-300">{idea}</span>
                                <FaArrowRight size={10} className="text-primary-400" />
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2">
              <Select
                label="Model"
                id="model"
                name="model"
                options={modelOptions}
                value={formData.model}
                onChange={handleChange}
                variant="glass"
                icon={<FaRandom size={14} />}
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
                icon={<FaRandom />}
              >
                {loading ? 'Remixing...' : 'Remix Image'}
              </Button>
            </div>
          </form>
        </FormWrapper>
        
        {/* Result Section */}
        <div>
          {loading ? (
            <div className="flex flex-col items-center justify-center h-64 glass-card">
              <div className="w-16 h-16 mb-4 border-t-4 border-b-4 rounded-full border-primary-500 animate-spin"></div>
              <p className="text-lg text-white">Remixing your image...</p>
              <p className="mt-2 text-sm text-dark-400">This may take a few moments</p>
            </div>
          ) : result ? (
            <ImageResult 
              imageData={result} 
              prompt={formData.prompt}
            />
          ) : (
            <div className="glass-card flex flex-col items-center justify-center p-8 h-full min-h-[400px]">
              <div className="p-6 mb-6 rounded-full bg-secondary-500/10 animate-pulse-slow">
                <FaMagic size={64} className="text-secondary-500/60" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-white font-display">
                Your remixed image will appear here
              </h3>
              <p className="max-w-md text-center text-dark-400">
                Upload an image and add transformation instructions to remix it with AI
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Remix Examples Section */}
      <div className="mt-16">
        <div className="flex items-center mb-6">
          <FaPaintBrush className="mr-3 text-secondary-500" size={24} />
          <h2 className="text-2xl font-bold font-display">What Can You Create?</h2>
        </div>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card variant="glass">
            <Card.Body>
              <div className="mb-4 text-center">
                <span className="inline-block p-3 rounded-full bg-gradient-to-br from-primary-500/20 to-secondary-500/20">
                  <FaPaintBrush size={24} className="text-secondary-400" />
                </span>
              </div>
              <Card.Title className="text-center">Style Transfer</Card.Title>
              <p className="mb-4 text-center text-dark-300">
                Transform your images into different artistic styles, from classic paintings to modern digital art.
              </p>
              <div className="p-2 text-sm text-center rounded-lg bg-dark-700/50">
                "Transform into a watercolor painting with vivid colors"
              </div>
            </Card.Body>
          </Card>
          
          <Card variant="glass">
            <Card.Body>
              <div className="mb-4 text-center">
                <span className="inline-block p-3 rounded-full bg-gradient-to-br from-primary-500/20 to-secondary-500/20">
                  <FaRandom size={24} className="text-secondary-400" />
                </span>
              </div>
              <Card.Title className="text-center">Scene Transformation</Card.Title>
              <p className="mb-4 text-center text-dark-300">
                Change the entire setting or background of your image while maintaining the main subjects.
              </p>
              <div className="p-2 text-sm text-center rounded-lg bg-dark-700/50">
                "Place in a futuristic cyberpunk city at night"
              </div>
            </Card.Body>
          </Card>
          
          <Card variant="glass">
            <Card.Body>
              <div className="mb-4 text-center">
                <span className="inline-block p-3 rounded-full bg-gradient-to-br from-primary-500/20 to-secondary-500/20">
                  <FaMagic size={24} className="text-secondary-400" />
                </span>
              </div>
              <Card.Title className="text-center">Concept Mixing</Card.Title>
              <p className="mb-4 text-center text-dark-300">
                Blend different concepts, themes, or genres to create unique and surprising combinations.
              </p>
              <div className="p-2 text-sm text-center rounded-lg bg-dark-700/50">
                "Blend with steampunk aesthetic and mechanical elements"
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RemixPage;