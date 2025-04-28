// client/src/pages/EditPage.jsx
import React, { useState } from 'react';
import { FaPencilAlt, FaCrown } from 'react-icons/fa';
import { motion } from 'framer-motion';
import PageHeader from '../components/common/PageHeader';
import FormWrapper from '../components/common/FormWrapper';
import Button from '../components/common/Button';
import TextArea from '../components/common/TextArea';
import FileInput from '../components/common/FileInput';
import Select from '../components/common/Select';
import ImageResult from '../components/common/ImageResult';
import Loading from '../components/common/Loading';
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
  
  // File state
  const [imageFile, setImageFile] = useState(null);
  
  // Result state
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Modal state for premium notification
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
  
  // Close premium notice modal
  const closePremiumNotice = () => {
    setShowPremiumNotice(false);
  };
  
  return (
    <div className="container mx-auto px-4 pt-24 pb-16">
      <PageHeader
        title="Edit Image"
        subtitle="Upload an image and describe how you want to edit it"
        icon={<FaPencilAlt size={28} />}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <FormWrapper
          title="Upload and Edit"
          subtitle="Choose your image and describe your desired changes"
        >
          <form onSubmit={handleSubmit}>
            <FileInput
              label="Upload Image"
              id="image_file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleImageChange}
            />
            
            <div className="mt-4">
              <TextArea
                label="Edit Prompt"
                id="prompt"
                name="prompt"
                rows={4}
                placeholder="Describe how you want to transform this image. Add details about style, changes, and elements you want to add or modify."
                value={formData.prompt}
                onChange={handleChange}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <Select
                label="Model"
                id="model"
                name="model"
                options={modelOptions}
                value={formData.model}
                onChange={handleChange}
              />
              
              <Select
                label="Aspect Ratio"
                id="aspect_ratio"
                name="aspect_ratio"
                options={aspectRatioOptions}
                value={formData.aspect_ratio}
                onChange={handleChange}
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
              />
              <p className="text-xs text-gray-500 mt-1">
                Magic Prompt enhances your input by adding details to improve image quality
              </p>
            </div>
            
            <div className="mt-6">
              <Button 
                type="submit"
                disabled={loading || !formData.prompt.trim() || !imageFile}
                loading={loading}
                className="w-full"
              >
                <FaPencilAlt className="mr-2" />
                Edit Image
              </Button>
            </div>
          </form>
        </FormWrapper>
        
        {/* Result Section */}
        <div>
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[300px]">
              <Loading size="lg" />
              <p className="mt-4 text-gray-400">Editing your image...</p>
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
              <FaPencilAlt size={48} className="text-gray-600 mb-4" />
              <p className="text-gray-400 text-center">
                Your edited image will appear here
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Instructions Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">How to Edit Images</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <Card.Body>
              <div className="text-accent text-4xl font-bold mb-2">1</div>
              <Card.Title>Upload Your Image</Card.Title>
              <p className="text-gray-400">
                Start by uploading the image you want to edit. Supported formats are JPEG, PNG, and WebP.
              </p>
            </Card.Body>
          </Card>
          
          <Card>
            <Card.Body>
              <div className="text-accent text-4xl font-bold mb-2">2</div>
              <Card.Title>Describe Your Changes</Card.Title>
              <p className="text-gray-400">
                Clearly describe how you want to edit the image. Be specific about what elements to change, add, or modify.
              </p>
            </Card.Body>
          </Card>
          
          <Card>
            <Card.Body>
              <div className="text-accent text-4xl font-bold mb-2">3</div>
              <Card.Title>Choose Settings</Card.Title>
              <p className="text-gray-400">
                Select your preferred model, aspect ratio, and whether to use magic prompt enhancement, then generate your edited image.
              </p>
            </Card.Body>
          </Card>
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

export default EditPage;