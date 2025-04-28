// client/src/pages/DescribePage.jsx
import React, { useState } from 'react';
import { FaComment, FaImage, FaClipboard } from 'react-icons/fa';
import { motion } from 'framer-motion';
import PageHeader from '../components/common/PageHeader';
import FormWrapper from '../components/common/FormWrapper';
import Button from '../components/common/Button';
import FileInput from '../components/common/FileInput';
import Card from '../components/common/Card';
import Loading from '../components/common/Loading';
import { useToast } from '../context/ToastContext';
import api from '../services/api';

const DescribePage = () => {
  const { addToast } = useToast();
  
  // File state
  const [imageFile, setImageFile] = useState(null);
  
  // Result state
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Handle image file change
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };
  
  // Copy description to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        addToast('Description copied to clipboard!', 'success');
      },
      (err) => {
        addToast('Failed to copy to clipboard', 'error');
        console.error('Copy error:', err);
      }
    );
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
      
      // Call API to describe image
      const response = await api.describeImage(apiFormData);
      
      // Set result
      setResult(response);
      
      // Show success message
      addToast('Image described successfully!', 'success');
    } catch (error) {
      // Show error message
      addToast(error.message || 'Failed to describe image', 'error');
      console.error('Describe error:', error);
    } finally {
      // Stop loading
      setLoading(false);
    }
  };
  
  return (
    <div className="container mx-auto px-4 pt-24 pb-16">
      <PageHeader
        title="Describe Image"
        subtitle="Get detailed AI-generated descriptions of any image"
        icon={<FaComment size={28} />}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <FormWrapper
          title="Upload an Image"
          subtitle="Get an AI-generated description of your image's content"
        >
          <form onSubmit={handleSubmit}>
            <FileInput
              label="Upload Image"
              id="image_file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleImageChange}
            />
            
            <div className="mt-6">
              <Button 
                type="submit"
                disabled={loading || !imageFile}
                loading={loading}
                className="w-full"
              >
                <FaComment className="mr-2" />
                Generate Description
              </Button>
            </div>
            
            <div className="mt-4 text-xs text-gray-500">
              <p className="mb-1">What to expect:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Detailed descriptions of objects, people, and settings in the image</li>
                <li>Visual attributes like colors, textures, and styles</li>
                <li>Context and setting of the image</li>
                <li>Multiple perspectives to capture different aspects</li>
              </ul>
            </div>
          </form>
        </FormWrapper>
        
        {/* Result Section */}
        <div>
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[300px]">
              <Loading size="lg" />
              <p className="mt-4 text-gray-400">Analyzing your image...</p>
            </div>
          ) : result && result.data?.descriptions?.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <div className="bg-base-200 rounded-xl overflow-hidden">
                {imageFile && (
                  <div className="w-full h-48 overflow-hidden">
                    <img 
                      src={URL.createObjectURL(imageFile)} 
                      alt="Uploaded image" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-4">Generated Descriptions</h3>
                  <div className="space-y-4">
                    {result.data.descriptions.map((description, index) => (
                      <div 
                        key={index}
                        className="bg-base-300 p-3 rounded-md relative group"
                      >
                        <p className="text-white mb-2">{description.text}</p>
                        
                        <Button
                          variant="ghost"
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1"
                          onClick={() => copyToClipboard(description.text)}
                          title="Copy to clipboard"
                        >
                          <FaClipboard size={16} />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center bg-base-200 rounded-xl p-8 h-full min-h-[300px] border border-base-300 border-dashed">
              <FaImage size={48} className="text-gray-600 mb-4" />
              <p className="text-gray-400 text-center">
                Descriptions of your image will appear here
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Use Cases Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Use Cases</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <Card.Body>
              <Card.Title>Content Creation</Card.Title>
              <p className="text-gray-400">
                Generate detailed image descriptions for blog posts, articles, and social media content. Perfect for creating alt text for better accessibility.
              </p>
            </Card.Body>
          </Card>
          
          <Card>
            <Card.Body>
              <Card.Title>SEO Enhancement</Card.Title>
              <p className="text-gray-400">
                Improve image SEO by using AI-generated descriptions as metadata, helping search engines better understand your visual content.
              </p>
            </Card.Body>
          </Card>
          
          <Card>
            <Card.Body>
              <Card.Title>Creative Inspiration</Card.Title>
              <p className="text-gray-400">
                Get fresh perspectives on images to inspire your writing, design work, or creative projects. Discover elements you might have overlooked.
              </p>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DescribePage;