// client/src/pages/EditPage.jsx
import React, { useState, useRef } from 'react';
import { FaPencilAlt, FaUpload } from 'react-icons/fa';
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
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [maskPreview, setMaskPreview] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    prompt: '',
    model: 'V_2A',
  });
  
  // File state
  const [imageFile, setImageFile] = useState(null);
  const [maskFile, setMaskFile] = useState(null);
  
  // Result state
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Model options based on API documentation
  const modelOptions = [
    { value: 'V_2A', label: 'V2 Turbo (Recommended)' },
    { value: 'V_2', label: 'V2 Standard' },
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
      
      // Reset mask when image changes
      setMaskFile(null);
      setMaskPreview(null);
    }
  };
  
  // Handle mask file change
  const handleMaskChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setMaskFile(e.target.files[0]);
    }
  };
  
  // Start drawing on canvas
  const startDrawing = (e) => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(
      e.nativeEvent.offsetX, 
      e.nativeEvent.offsetY
    );
    setIsDrawing(true);
  };
  
  // Draw on canvas
  const draw = (e) => {
    if (!isDrawing || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.lineWidth = 30;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'white';
    
    ctx.lineTo(
      e.nativeEvent.offsetX, 
      e.nativeEvent.offsetY
    );
    ctx.stroke();
  };
  
  // Stop drawing on canvas
  const stopDrawing = () => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.closePath();
    setIsDrawing(false);
    
    // Create a blob from the canvas
    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], 'mask.png', { type: 'image/png' });
        setMaskFile(file);
        setMaskPreview(URL.createObjectURL(blob));
      }
    });
  };
  
  // Clear mask canvas
  const clearMask = () => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    setMaskFile(null);
    setMaskPreview(null);
  };
  
  // Initialize canvas when image loads
  const initCanvas = () => {
    if (!canvasRef.current || !imageFile) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    
    // Fill with black (transparent mask)
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
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
    
    if (!maskFile) {
      addToast('Please create or upload a mask', 'error');
      return;
    }
    
    // Start loading
    setLoading(true);
    setResult(null);
    
    try {
      // Prepare form data for API
      const apiFormData = new FormData();
      apiFormData.append('image_file', imageFile);
      apiFormData.append('mask', maskFile);
      apiFormData.append('prompt', formData.prompt);
      apiFormData.append('model', formData.model);
      
      // Call API to edit image
      const response = await api.editImage(apiFormData);
      
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
    <div className="container mx-auto px-4 pt-24 pb-16">
      <PageHeader
        title="Edit Image"
        subtitle="Upload an image, create a mask, and describe how you want to edit it"
        icon={<FaPencilAlt size={28} />}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <FormWrapper
          title="Upload and Edit"
          subtitle="Choose your image, create a mask, and describe your desired changes"
        >
          <form onSubmit={handleSubmit}>
            <FileInput
              label="Upload Image"
              id="image_file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleImageChange}
            />
            
            {imageFile && (
              <>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-200 mb-1">
                    Create Mask
                  </label>
                  <p className="text-xs text-gray-400 mb-2">
                    Draw over the areas you want to change (white). The rest will remain unchanged (black).
                  </p>
                  
                  <div className="border border-base-300 rounded-md overflow-hidden bg-black">
                    <canvas
                      ref={canvasRef}
                      className="w-full h-64 touch-none"
                      onMouseDown={startDrawing}
                      onMouseMove={draw}
                      onMouseUp={stopDrawing}
                      onMouseLeave={stopDrawing}
                      onTouchStart={startDrawing}
                      onTouchMove={draw}
                      onTouchEnd={stopDrawing}
                      onLoad={initCanvas}
                    />
                  </div>
                  
                  <div className="flex justify-between mt-2">
                    <Button 
                      type="button" 
                      variant="secondary" 
                      className="text-sm" 
                      onClick={clearMask}
                    >
                      Clear Mask
                    </Button>
                    
                    <FileInput
                      id="mask_file"
                      accept="image/jpeg,image/png"
                      onChange={handleMaskChange}
                      className="w-auto"
                    >
                      <Button type="button" variant="outline" className="text-sm">
                        <FaUpload className="mr-1" /> Upload Mask
                      </Button>
                    </FileInput>
                  </div>
                </div>
                
                <div className="mt-4">
                  <TextArea
                    label="Describe the Changes"
                    id="prompt"
                    name="prompt"
                    rows={4}
                    placeholder="Describe what you want to appear in the masked area. Be specific about style, colors, etc."
                    value={formData.prompt}
                    onChange={handleChange}
                  />
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
                    disabled={loading || !formData.prompt.trim() || !imageFile || !maskFile}
                    loading={loading}
                    className="w-full"
                  >
                    <FaPencilAlt className="mr-2" />
                    Edit Image
                  </Button>
                </div>
              </>
            )}
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
        <h2 className="text-2xl font-bold mb-6">How to Use the Edit Tool</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <Card.Body>
              <div className="text-accent text-4xl font-bold mb-2">1</div>
              <Card.Title>Upload Your Image</Card.Title>
              <p className="text-gray-400">
                Start by uploading the base image that you want to edit. Supported formats are JPEG, PNG, and WebP.
              </p>
            </Card.Body>
          </Card>
          
          <Card>
            <Card.Body>
              <div className="text-accent text-4xl font-bold mb-2">2</div>
              <Card.Title>Create a Mask</Card.Title>
              <p className="text-gray-400">
                Draw over the areas you want to modify. White areas will be changed, and black areas will remain unchanged.
              </p>
            </Card.Body>
          </Card>
          
          <Card>
            <Card.Body>
              <div className="text-accent text-4xl font-bold mb-2">3</div>
              <Card.Title>Describe Changes</Card.Title>
              <p className="text-gray-400">
                Write a detailed prompt describing what you want to appear in the masked area, then generate your edited image.
              </p>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EditPage;