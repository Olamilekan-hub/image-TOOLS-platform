// client/src/services/api.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Generate image from text prompt
export const generateImage = async (promptData) => {
  try {
    // Make sure we're only sending the required fields
    const cleanedData = {
      prompt: promptData.prompt,
      model: promptData.model || 'V_2A',
      style_type: promptData.style_type || 'REALISTIC'
    };
    
    console.log('Sending generate request with data:', cleanedData);
    const response = await api.post('/images/generate', cleanedData);
    console.log('Generate response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Generate error details:', error.response || error);
    throw handleApiError(error);
  }
};

// Remix/Edit image with prompt
export const remixImage = async (formData) => {
  try {
    console.log('Sending remix request with formData');
    
    // Ensure we're properly handling the image_request
    if (formData.has('image_request')) {
      try {
        const imageRequestStr = formData.get('image_request');
        if (typeof imageRequestStr === 'string') {
          const imageRequest = JSON.parse(imageRequestStr);
          
          // Clean the image request to only include user prompt and necessary fields
          const cleanedRequest = {
            prompt: imageRequest.prompt,
            model: imageRequest.model || 'V_2A',
            aspect_ratio: imageRequest.aspect_ratio || 'ASPECT_16_9',
            magic_prompt_option: imageRequest.magic_prompt_option || 'ON'
          };
          
          // Replace with cleaned version
          formData.set('image_request', JSON.stringify(cleanedRequest));
        }
      } catch (e) {
        console.error('Error parsing/cleaning image_request:', e);
      }
    }
    
    // Debug the formData content
    if (formData instanceof FormData) {
      for (let [key, value] of formData.entries()) {
        console.log(`FormData entry - ${key}:`, 
          key === 'image_file' ? 'File object' : value);
      }
    }
    
    const response = await api.post('/images/remix', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('Remix response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Remix error details:', error.response || error);
    throw handleApiError(error);
  }
};

// Upscale image
export const upscaleImage = async (formData) => {
  try {
    console.log('Sending upscale request with formData');
    
    // Clean the image_request if present
    if (formData.has('image_request')) {
      try {
        const imageRequestStr = formData.get('image_request');
        if (typeof imageRequestStr === 'string') {
          const imageRequest = JSON.parse(imageRequestStr);
          
          // Only include essential fields
          const cleanedRequest = {
            prompt: imageRequest.prompt,
            model: imageRequest.model || 'V_2A'
          };
          
          // Replace with cleaned version
          formData.set('image_request', JSON.stringify(cleanedRequest));
        }
      } catch (e) {
        console.error('Error parsing/cleaning image_request:', e);
      }
    }
    
    const response = await api.post('/images/upscale', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('Upscale response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Upscale error details:', error.response || error);
    throw handleApiError(error);
  }
};

// Describe image
export const describeImage = async (formData) => {
  try {
    console.log('Sending describe request with formData');
    // No additional parameters needed for describe, just pass the image
    
    const response = await api.post('/images/describe', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('Describe response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Describe error details:', error.response || error);
    throw handleApiError(error);
  }
};

// Reframe image
export const reframeImage = async (formData) => {
  try {
    console.log('Sending reframe request with formData');
    
    // Make sure we're only sending essential parameters
    if (formData.has('model') && formData.has('resolution')) {
      // These fields are already separate form fields and don't need cleaning
    }
    
    const response = await api.post('/images/reframe', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('Reframe response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Reframe error details:', error.response || error);
    throw handleApiError(error);
  }
};

// Helper function to handle errors
const handleApiError = (error) => {
  // Extract relevant error information
  const errorResponse = {
    message: error.response?.data?.message || error.message || 'An error occurred while communicating with the server',
    status: error.response?.status,
    data: error.response?.data
  };
  
  console.error('API Error Response:', errorResponse);
  
  return errorResponse;
};

export default {
  generateImage,
  remixImage,
  upscaleImage,
  describeImage,
  reframeImage
};