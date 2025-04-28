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
    const response = await api.post('/images/generate', promptData);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// Edit image with mask and prompt
export const editImage = async (formData) => {
  try {
    const response = await api.post('/images/edit', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// Remix image with prompt
export const remixImage = async (formData) => {
  try {
    const response = await api.post('/images/remix', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// Upscale image
export const upscaleImage = async (formData) => {
  try {
    const response = await api.post('/images/upscale', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// Describe image
export const describeImage = async (formData) => {
  try {
    const response = await api.post('/images/describe', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// Reframe image
export const reframeImage = async (formData) => {
  try {
    const response = await api.post('/images/reframe', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// Helper function to handle errors
const handleApiError = (error) => {
  const errorMessage = 
    error.response?.data?.message || 
    error.message || 
    'An error occurred while communicating with the server';
  
  console.error('API Error:', errorMessage);
  
  return {
    message: errorMessage,
    status: error.response?.status,
    data: error.response?.data
  };
};

export default {
  generateImage,
  editImage,
  remixImage,
  upscaleImage,
  describeImage,
  reframeImage
};