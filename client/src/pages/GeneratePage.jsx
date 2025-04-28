// client/src/pages/GeneratePage.jsx
import React, { useState } from 'react';
import { FaImage, FaMagic, FaCrown } from 'react-icons/fa';
import { motion } from 'framer-motion';
import PageHeader from '../components/common/PageHeader';
import FormWrapper from '../components/common/FormWrapper';
import Button from '../components/common/Button';
import TextArea from '../components/common/TextArea';
import Select from '../components/common/Select';
import ImageResult from '../components/common/ImageResult';
import Loading from '../components/common/Loading';
import { useToast } from '../context/ToastContext';
import api from '../services/api';

const GeneratePage = () => {
  const { addToast } = useToast();
  
  // Form state
  const [formData, setFormData] = useState({
    prompt: '',
    model: 'V_2A',
    style_type: 'REALISTIC'
  });
  
  // Result state
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  // Premium notice modal state
  const [showPremiumNotice, setShowPremiumNotice] = useState(false);
  
  // Model options based on API documentation with premium options
  const modelOptions = [
    { value: 'V_2A', label: 'V2 Turbo (Recommended)' },
    { value: 'V_2', label: 'V2 Standard' },
    { value: 'V_3A', label: 'V3 Turbo (Premium) ✨' },
    { value: 'V_3', label: 'V3 Standard (Premium) ✨' }
  ];
  
  // Style options based on API documentation
  const styleOptions = [
    { value: 'REALISTIC', label: 'Realistic' },
    { value: 'ANIME', label: 'Anime' },
    { value: 'AUTO', label: 'Auto' },
    { value: 'DESIGN', label: 'Design' },
    { value: 'GENERAL', label: 'General' },
    { value: 'RENDER_3D', label: 'Render 3D' }
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
    
    // Start loading
    setLoading(true);
    setResult(null);
    
    try {
      // Call API to generate image
      const response = await api.generateImage(formData);
      
      // Set result
      setResult(response);
      
      // Show success message
      addToast('Image generated successfully!', 'success');
    } catch (error) {
      // Show error message
      addToast(error.message || 'Failed to generate image', 'error');
      console.error('Generate error:', error);
    } finally {
      // Stop loading
      setLoading(false);
    }
  };
  
  return (
    <div className="container mx-auto px-4 pt-24 pb-16">
      <PageHeader
        title="Generate Image"
        subtitle="Create stunning AI-generated images from your text prompts"
        icon={<FaImage size={28} />}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <FormWrapper
          title="Enter Your Prompt"
          subtitle="Describe what you want to see in detail. Be specific about style, subject, lighting, etc."
        >
          <form onSubmit={handleSubmit}>
            <TextArea
              label="Prompt"
              id="prompt"
              name="prompt"
              rows={5}
              placeholder="A serene tropical beach scene. Dominating the foreground are tall palm trees with a crystal clear ocean in the background."
              value={formData.prompt}
              onChange={handleChange}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Model"
                id="model"
                name="model"
                options={modelOptions}
                value={formData.model}
                onChange={handleChange}
              />
              
              <Select
                label="Style"
                id="style_type"
                name="style_type"
                options={styleOptions}
                value={formData.style_type}
                onChange={handleChange}
              />
            </div>
            
            <div className="mt-6">
              <Button 
                type="submit"
                disabled={loading || !formData.prompt.trim()}
                loading={loading}
                className="w-full"
              >
                <FaMagic className="mr-2" />
                Generate Image
              </Button>
            </div>
            
            <div className="mt-4 text-xs text-gray-500">
              <p className="mb-1">Tips for better results:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Be specific about the subject, style, lighting, and composition</li>
                <li>Include details about the setting, time of day, and atmosphere</li>
                <li>Specify artistic styles or reference specific artists if desired</li>
                <li>Mention camera angles, lens types for photorealistic images</li>
              </ul>
            </div>
          </form>
        </FormWrapper>
        
        {/* Result Section */}
        <div>
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[300px]">
              <Loading size="lg" />
              <p className="mt-4 text-gray-400">Generating your image...</p>
            </div>
          ) : result ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <ImageResult 
                imageData={result} 
                prompt={formData.prompt}
              />
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center bg-base-200 rounded-xl p-8 h-full min-h-[300px] border border-base-300 border-dashed">
              <FaImage size={48} className="text-gray-600 mb-4" />
              <p className="text-gray-400 text-center">
                Your generated image will appear here
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Examples Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Example Prompts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            "A futuristic cityscape at sunset with flying cars and neon signs, cyberpunk style",
            "A medieval fantasy castle perched on a cliff overlooking a misty valley, digital art",
            "A photorealistic portrait of a wise old man with weathered skin and bright blue eyes",
            "An underwater scene with colorful coral reefs and exotic fish in crystal clear water",
            "A cozy cabin in snowy mountains with smoke coming from the chimney, warm lighting inside",
            "A close-up of a butterfly on a flower with morning dew, macro photography style"
          ].map((example, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className="bg-base-300 p-4 rounded-lg cursor-pointer"
              onClick={() => setFormData({ ...formData, prompt: example })}
            >
              <p className="text-gray-300">{example}</p>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Premium Notice Modal */}
      {showPremiumNotice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-base-200 rounded-xl p-8 max-w-md mx-4"
          >
            <div className="flex justify-center mb-4 text-yellow-400">
              <FaCrown size={48} />
            </div>
            <h3 className="text-xl font-bold text-center mb-4">Premium Feature</h3>
            <p className="text-gray-300 mb-6 text-center">
              V3 models are exclusive to premium users. Our premium subscription will be available soon with enhanced features and faster processing!
            </p>
            <div className="flex justify-center">
              <Button onClick={closePremiumNotice}>
                Continue with Standard Models
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default GeneratePage;