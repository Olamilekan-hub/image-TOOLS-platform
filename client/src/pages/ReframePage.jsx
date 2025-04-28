// client/src/pages/ReframePage.jsx
import React, { useState } from 'react';
import { FaCrop, FaImage } from 'react-icons/fa';
import { motion } from 'framer-motion';
import PageHeader from '../components/common/PageHeader';
import FormWrapper from '../components/common/FormWrapper';
import Button from '../components/common/Button';
import FileInput from '../components/common/FileInput';
import Select from '../components/common/Select';
import ImageResult from '../components/common/ImageResult';
import Loading from '../components/common/Loading';
import Card from '../components/common/Card';
import { useToast } from '../context/ToastContext';
import api from '../services/api';

const ReframePage = () => {
  const { addToast } = useToast();
  
  // Form state
  const [formData, setFormData] = useState({
    resolution: 'RESOLUTION_1024_1024',
    model: 'V_2A'
  });
  
  // File state
  const [imageFile, setImageFile] = useState(null);
  
  // Result state
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Model options based on API documentation
  const modelOptions = [
    { value: 'V_2A', label: 'V2 Turbo (Recommended)' },
    { value: 'V_2', label: 'V2 Standard' }
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
  
  return (
    <div className="container mx-auto px-4 pt-24 pb-16">
      <PageHeader
        title="Reframe Image"
        subtitle="Change the aspect ratio of your image while preserving content"
        icon={<FaCrop size={28} />}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <FormWrapper
          title="Reframe Your Image"
          subtitle="Upload an image and select your desired aspect ratio"
        >
          <form onSubmit={handleSubmit}>
            <FileInput
              label="Upload Image"
              id="image_file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleImageChange}
            />
            
            <div className="mt-4">
              <Select
                label="Target Resolution"
                id="resolution"
                name="resolution"
                options={resolutionOptions}
                value={formData.resolution}
                onChange={handleChange}
              />
              <p className="text-xs text-gray-500 mt-1">
                Select the resolution and aspect ratio you want for the output image
              </p>
            </div>
            
            <div className="mt-4">
              <Select
                label="Model"
                id="model"
                name="model"
                options={modelOptions}
                value={formData.model}
                onChange={handleChange}
              />
            </div>
            
            <div className="mt-6">
              <Button 
                type="submit"
                disabled={loading || !imageFile}
                loading={loading}
                className="w-full"
              >
                <FaCrop className="mr-2" />
                Reframe Image
              </Button>
            </div>
          </form>
        </FormWrapper>
        
        {/* Result Section */}
        <div>
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[300px]">
              <Loading size="lg" />
              <p className="mt-4 text-gray-400">Reframing your image...</p>
            </div>
          ) : result ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <ImageResult 
                imageData={result}
              />
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center bg-base-200 rounded-xl p-8 h-full min-h-[300px] border border-base-300 border-dashed">
              <FaImage size={48} className="text-gray-600 mb-4" />
              <p className="text-gray-400 text-center">
                Your reframed image will appear here
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* About Reframing Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">About Reframing</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <Card.Body>
              <Card.Title>What is Reframing?</Card.Title>
              <p className="text-gray-400">
                Reframing intelligently adapts your image to a new aspect ratio without awkward cropping or distortion. 
                Unlike traditional resizing methods that can cut off important parts or stretch the image unnaturally, 
                AI reframing uses advanced algorithms to preserve the main subject while extending the background or 
                intelligently filling in missing areas as needed.
              </p>
            </Card.Body>
          </Card>
          
          <Card>
            <Card.Body>
              <Card.Title>Common Use Cases</Card.Title>
              <ul className="text-gray-400 space-y-2 list-disc pl-5">
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
    </div>
  );
};

export default ReframePage;