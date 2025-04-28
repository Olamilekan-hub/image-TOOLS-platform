// client/src/pages/RemixPage.jsx
import React, { useState } from 'react';
import { FaMagic, FaRandom } from 'react-icons/fa';
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

const RemixPage = () => {
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
  
  // Model options based on API documentation
  const modelOptions = [
    { value: 'V_2A', label: 'V2 Turbo (Recommended)' },
    { value: 'V_2', label: 'V2 Standard' },
    { value: 'V_1', label: 'V1 Legacy' }
  ];
  
  // Aspect ratio options based on API documentation
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
    <div className="container mx-auto px-4 pt-24 pb-16">
      <PageHeader
        title="Remix Image"
        subtitle="Upload an image and transform it with a creative prompt"
        icon={<FaMagic size={28} />}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <FormWrapper
          title="Remix Your Image"
          subtitle="Upload an image and describe how you want to transform it"
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
                label="Remix Prompt"
                id="prompt"
                name="prompt"
                rows={4}
                placeholder="Describe how you want to transform this image. Add details about style, mood, lighting, etc."
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
                <FaRandom className="mr-2" />
                Remix Image
              </Button>
            </div>
          </form>
        </FormWrapper>
        
        {/* Result Section */}
        <div>
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[300px]">
              <Loading size="lg" />
              <p className="mt-4 text-gray-400">Remixing your image...</p>
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
              <FaMagic size={48} className="text-gray-600 mb-4" />
              <p className="text-gray-400 text-center">
                Your remixed image will appear here
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Remix Ideas Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Remix Ideas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <Card.Body>
              <Card.Title>Style Transfer</Card.Title>
              <p className="text-gray-400 mb-4">
                Transform your image into different artistic styles
              </p>
              <div className="space-y-2">
                <div className="bg-base-300 p-2 rounded-md text-sm">"Convert to watercolor painting style with vibrant colors"</div>
                <div className="bg-base-300 p-2 rounded-md text-sm">"Transform into a neon cyberpunk scene with glowing elements"</div>
                <div className="bg-base-300 p-2 rounded-md text-sm">"Remake in the style of Van Gogh's Starry Night"</div>
              </div>
            </Card.Body>
          </Card>
          
          <Card>
            <Card.Body>
              <Card.Title>Environment Change</Card.Title>
              <p className="text-gray-400 mb-4">
                Place your subject in an entirely different setting
              </p>
              <div className="space-y-2">
                <div className="bg-base-300 p-2 rounded-md text-sm">"Transport to a lush tropical rainforest"</div>
                <div className="bg-base-300 p-2 rounded-md text-sm">"Place in a futuristic city with flying cars"</div>
                <div className="bg-base-300 p-2 rounded-md text-sm">"Move to a serene beach at sunset"</div>
              </div>
            </Card.Body>
          </Card>
          
          <Card>
            <Card.Body>
              <Card.Title>Time & Season</Card.Title>
              <p className="text-gray-400 mb-4">
                Change the time of day or season in your image
              </p>
              <div className="space-y-2">
                <div className="bg-base-300 p-2 rounded-md text-sm">"Convert to nighttime with moonlight"</div>
                <div className="bg-base-300 p-2 rounded-md text-sm">"Transform to winter scene with snow falling"</div>
                <div className="bg-base-300 p-2 rounded-md text-sm">"Change to autumn with golden leaves"</div>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RemixPage;