// client/src/pages/DescribePage.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaComment, 
  FaImage, 
  FaClipboard,
  FaCheck,
  FaInfoCircle,
  FaFileAlt,
  FaSearch,
  FaLightbulb
} from 'react-icons/fa';

// Import modern components
import PageHeader from '../components/common/PageHeader';
import FormWrapper from '../components/common/FormWrapper';
import Button from '../components/common/Button';
import FileInput from '../components/common/FileInput';
import Card from '../components/common/Card';
import { useToast } from '../context/ToastContext';
import api from '../services/api';

const DescribePage = () => {
  const { addToast } = useToast();
  
  // File state
  const [imageFile, setImageFile] = useState(null);
  
  // UI state
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  
  // Handle image file change
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };
  
  // Copy description to clipboard
  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text).then(
      () => {
        addToast('Description copied to clipboard!', 'success');
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
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
  
  // Placeholder for empty results section
  const EmptyResults = () => (
    <div className="glass-card flex flex-col items-center justify-center p-8 h-full min-h-[400px] bg-white/70 dark:bg-dark-800/70 backdrop-blur-md border border-light-200/50 dark:border-dark-700/50 rounded-xl">
      <div className="p-6 mb-6 rounded-full bg-primary-500/10 animate-pulse-slow">
        <FaComment size={64} className="text-primary-500/60" />
      </div>
      <h3 className="mb-2 text-xl font-semibold text-dark-900 dark:text-white font-display">
        AI-generated descriptions will appear here
      </h3>
      <p className="max-w-md text-center text-dark-600 dark:text-dark-300">
        Upload an image to get detailed descriptions of its content
      </p>
    </div>
  );
  
  // Loading state component
  const LoadingState = () => (
    <div className="flex flex-col items-center justify-center h-64 glass-card bg-white/70 dark:bg-dark-800/70 backdrop-blur-md border border-light-200/50 dark:border-dark-700/50 rounded-xl">
      <div className="w-16 h-16 mb-4 border-t-4 border-b-4 rounded-full border-primary-500 animate-spin"></div>
      <p className="text-lg text-dark-900 dark:text-white">Analyzing your image...</p>
      <p className="mt-2 text-sm text-dark-600 dark:text-dark-400">AI is examining the content</p>
    </div>
  );
  
  // Results component
  const Results = ({ data, imageUrl }) => {
    if (!data || !data.data || !data.data.descriptions || data.data.descriptions.length === 0) {
      return (
        <div className="p-6 glass-card bg-white/70 dark:bg-dark-800/70 backdrop-blur-md border border-light-200/50 dark:border-dark-700/50 rounded-xl">
          <div className="flex items-center justify-center">
            <FaInfoCircle className="mr-2 text-amber-500" />
            <p className="text-dark-700 dark:text-dark-300">No descriptions were generated for this image.</p>
          </div>
        </div>
      );
    }
    
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="overflow-hidden glass-card bg-white/70 dark:bg-dark-800/70 backdrop-blur-md border border-light-200/50 dark:border-dark-700/50 rounded-xl"
      >
        {imageUrl && (
          <div className="w-full h-48 overflow-hidden border-b border-light-200/50 dark:border-dark-700/50">
            <img 
              src={imageUrl} 
              alt="Uploaded" 
              className="object-cover w-full h-full"
            />
          </div>
        )}
        
        <div className="p-6">
          <h3 className="flex items-center mb-4 text-lg font-semibold text-dark-900 dark:text-white font-display">
            <FaFileAlt className="mr-2 text-primary-600 dark:text-primary-400" />
            Generated Descriptions
          </h3>
          
          <div className="space-y-4">
            {data.data.descriptions.map((description, index) => (
              <div 
                key={index}
                className="relative p-4 rounded-lg bg-light-100/50 dark:bg-dark-800/70 group"
              >
                <p className="text-sm text-dark-700 dark:text-dark-200">
                  {description.text}
                </p>
                
                <div className="absolute top-3 right-3">
                  <Button
                    variant="ghost"
                    size="xs"
                    className="transition-opacity opacity-0 group-hover:opacity-100"
                    onClick={() => copyToClipboard(description.text, index)}
                    icon={copiedIndex === index ? <FaCheck size={12} /> : <FaClipboard size={12} />}
                  >
                    {copiedIndex === index ? 'Copied' : 'Copy'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    );
  };
  
  // Use cases array
  const useCases = [
    {
      title: "Content Creation",
      description: "Generate detailed image descriptions for blog posts, articles, and social media content. Perfect for creating alt text for better accessibility.",
      icon: <FaFileAlt />
    },
    {
      title: "SEO Enhancement",
      description: "Improve image SEO by using AI-generated descriptions as metadata, helping search engines better understand your visual content.",
      icon: <FaSearch />
    },
    {
      title: "Creative Inspiration",
      description: "Get fresh perspectives on images to inspire your writing, design work, or creative projects. Discover elements you might have overlooked.",
      icon: <FaLightbulb />
    }
  ];
  
  return (
    <div className="container px-4 pt-24 pb-16 mx-auto">
      <PageHeader
        title="Describe Image"
        subtitle="Get detailed AI-generated descriptions of any image"
        icon={<FaComment size={30} />}
        badge="AI Analysis"
      />
      
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Form Section */}
        <FormWrapper
          title="Upload an Image"
          subtitle="Get an AI-generated description of your image's content"
          variant="glass"
          icon={<FaImage size={18} />}
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
              <Button 
                type="submit"
                variant="primary"
                size="lg"
                disabled={loading || !imageFile}
                loading={loading}
                className="w-full"
                icon={<FaComment />}
              >
                {loading ? 'Analyzing...' : 'Generate Description'}
              </Button>
            </div>
            
            <div className="p-4 mt-4 border rounded-lg bg-light-50/50 dark:bg-dark-800/50 border-light-200/30 dark:border-dark-700/30">
              <h4 className="flex items-center mb-2 text-sm font-medium text-dark-900 dark:text-white">
                <FaInfoCircle className="mr-2 text-primary-600 dark:text-primary-400" />
                What to expect:
              </h4>
              <ul className="ml-6 space-y-1 text-xs list-disc text-dark-600 dark:text-dark-300">
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
            <LoadingState />
          ) : result ? (
            <Results 
              data={result} 
              imageUrl={imageFile ? URL.createObjectURL(imageFile) : null}
            />
          ) : (
            <EmptyResults />
          )}
        </div>
      </div>
      
      {/* Use Cases Section */}
      <div className="mt-16">
        <div className="flex items-center mb-6">
          <FaInfoCircle className="mr-3 text-primary-500" size={24} />
          <h2 className="text-2xl font-bold text-dark-900 dark:text-white font-display">Use Cases</h2>
        </div>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {useCases.map((useCase, index) => (
            <Card key={index} variant="glass">
              <Card.Body>
                <div className="flex justify-center mb-4">
                  <span className="p-3 rounded-full bg-gradient-to-br from-primary-500/10 to-secondary-500/10 text-primary-600 dark:text-primary-400">
                    {useCase.icon}
                  </span>
                </div>
                <Card.Title className="text-center">{useCase.title}</Card.Title>
                <p className="text-center text-dark-600 dark:text-dark-300">
                  {useCase.description}
                </p>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DescribePage;