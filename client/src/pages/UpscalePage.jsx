// client/src/pages/UpscalePage.jsx
import React, { useState } from 'react';
import { FaExpandArrowsAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import PageHeader from '../components/common/PageHeader';
import FormWrapper from '../components/common/FormWrapper';
import Button from '../components/common/Button';
import TextArea from '../components/common/TextArea';
import FileInput from '../components/common/FileInput';
import ImageResult from '../components/common/ImageResult';
import Loading from '../components/common/Loading';
import Card from '../components/common/Card';
import { useToast } from '../context/ToastContext';
import api from '../services/api';

const UpscalePage = () => {
  const { addToast } = useToast();
  
  // Form state
  const [formData, setFormData] = useState({
    prompt: '',
  });
  
  // File state
  const [imageFile, setImageFile] = useState(null);
  
  // Result state
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  
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
      
      // Add optional prompt if provided
      if (formData.prompt.trim()) {
        const imageRequest = {
          prompt: formData.prompt,
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
  
  return (
    <div className="container mx-auto px-4 pt-24 pb-16">
      <PageHeader
        title="Upscale Image"
        subtitle="Enhance your image resolution while preserving quality"
        icon={<FaExpandArrowsAlt size={28} />}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <FormWrapper
          title="Upscale Your Image"
          subtitle="Upload an image to enhance its resolution and quality"
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
                label="Optional Prompt (Optional)"
                id="prompt"
                name="prompt"
                rows={3}
                placeholder="Add an optional prompt to guide the upscaling process (e.g., 'Enhance details in the face' or 'Improve texture quality')"
                value={formData.prompt}
                onChange={handleChange}
              />
              <p className="text-xs text-gray-500 mt-1">
                A prompt is optional for upscaling, but can help guide the enhancement process
              </p>
            </div>
            
            <div className="mt-6">
              <Button 
                type="submit"
                disabled={loading || !imageFile}
                loading={loading}
                className="w-full"
              >
                <FaExpandArrowsAlt className="mr-2" />
                Upscale Image
              </Button>
            </div>
          </form>
        </FormWrapper>
        
        {/* Result Section */}
        <div>
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[300px]">
              <Loading size="lg" />
              <p className="mt-4 text-gray-400">Upscaling your image...</p>
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
              <FaExpandArrowsAlt size={48} className="text-gray-600 mb-4" />
              <p className="text-gray-400 text-center">
                Your upscaled image will appear here
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Information Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">About Upscaling</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <Card.Body>
              <Card.Title>What is Upscaling?</Card.Title>
              <p className="text-gray-400">
                Upscaling uses AI to increase image resolution while enhancing details and sharpness. 
                Unlike traditional resizing which can blur images, AI upscaling intelligently adds detail.
              </p>
            </Card.Body>
          </Card>
          
          <Card>
            <Card.Body>
              <Card.Title>Best Practices</Card.Title>
              <ul className="text-gray-400 space-y-2 list-disc pl-5">
                <li>Start with the highest quality image available</li>
                <li>Images should be clear and well-composed</li>
                <li>Add optional prompts to guide enhancement focus</li>
                <li>For best results, upscale images under 2048px</li>
              </ul>
            </Card.Body>
          </Card>
          
          <Card>
            <Card.Body>
              <Card.Title>Use Cases</Card.Title>
              <ul className="text-gray-400 space-y-2 list-disc pl-5">
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