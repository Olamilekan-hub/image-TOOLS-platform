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
    console.log('Sending generate request with data:', promptData);
    const response = await api.post('/images/generate', promptData);
    console.log('Generate response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Generate error details:', error.response || error);
    throw handleApiError(error);
  }
};

// Edit image with mask and prompt
export const editImage = async (formData) => {
  try {
    console.log('Sending edit request with formData');
    const response = await api.post('/images/edit', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('Edit response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Edit error details:', error.response || error);
    throw handleApiError(error);
  }
};

// Remix image with prompt
export const remixImage = async (formData) => {
  try {
    console.log('Sending remix request with formData');
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
  editImage,
  remixImage,
  upscaleImage,
  describeImage,
  reframeImage
};