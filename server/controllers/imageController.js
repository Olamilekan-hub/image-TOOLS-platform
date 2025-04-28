// server/controllers/imageController.js
import axios from 'axios';
import fs from 'fs';
import FormData from 'form-data';
import path from 'path';

// API Key from environment variables
const API_KEY = process.env.IDEOGRAM_API_KEY || "q9R5hJVrf686PDBaCuZPUqBEB5pM-6AVEJeoAAEFhqFx55cE-pzUtW2lHppBsA7V6loyFVGNmPk_ZhrlATkyyw";

// Base URLs for API endpoints
const BASE_URL = 'https://api.ideogram.ai';
const GENERATE_URL = `${BASE_URL}/generate`;
const EDIT_URL = `${BASE_URL}/edit`;
const REMIX_URL = `${BASE_URL}/remix`;
const UPSCALE_URL = `${BASE_URL}/upscale`;
const DESCRIBE_URL = `${BASE_URL}/describe`;
const REFRAME_URL = `${BASE_URL}/reframe`;

// Headers for API requests
const getHeaders = () => ({
  'Api-Key': API_KEY,
  'Content-Type': 'application/json'
});

// Handle errors consistently
const handleApiError = (error, res) => {
  console.error('API Error:', error.response?.data || error.message);
  
  // Extract error information if available
  const statusCode = error.response?.status || 500;
  const errorMessage = error.response?.data?.message || 'An error occurred with the Ideogram API';
  
  return res.status(statusCode).json({
    success: false,
    message: errorMessage,
    error: error.response?.data || error.message
  });
};

// Generate image from text prompt
export const generateImage = async (req, res) => {
  try {
    const { prompt, model = 'V_2A', style_type = 'REALISTIC', num_images = 1 } = req.body;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: 'Prompt is required'
      });
    }

    const response = await axios.post(
      GENERATE_URL,
      {
        image_request: {
          prompt,
          model,
          style_type,
          num_images: parseInt(num_images, 10)
        }
      },
      { headers: getHeaders() }
    );

    res.status(200).json({
      success: true,
      message: 'Image generated successfully',
      data: response.data,
      prompt // Include the original prompt in response
    });
  } catch (error) {
    handleApiError(error, res);
  }
};

// Edit image with mask and prompt
export const editImage = async (req, res) => {
  try {
    const { prompt, model = 'V_2A' } = req.body;
    
    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: 'Prompt is required'
      });
    }
    
    if (!req.files || !req.files.image_file || !req.files.mask) {
      return res.status(400).json({
        success: false,
        message: 'Image file and mask are required'
      });
    }

    const imageFile = req.files.image_file[0];
    const maskFile = req.files.mask[0];
    
    const formData = new FormData();
    formData.append('image_file', fs.createReadStream(imageFile.path));
    formData.append('mask', fs.createReadStream(maskFile.path));
    formData.append('prompt', prompt);
    formData.append('model', model);
    
    const response = await axios.post(EDIT_URL, formData, {
      headers: {
        ...formData.getHeaders(),
        'Api-Key': API_KEY
      }
    });
    
    // Clean up uploaded files
    fs.unlinkSync(imageFile.path);
    fs.unlinkSync(maskFile.path);
    
    res.status(200).json({
      success: true,
      message: 'Image edited successfully',
      data: response.data,
      prompt // Include the original prompt in response
    });
  } catch (error) {
    handleApiError(error, res);
  }
};

// Remix image with a prompt
export const remixImage = async (req, res) => {
  try {
    const { prompt, model = 'V_2A', aspect_ratio = 'ASPECT_16_9', magic_prompt_option = 'ON' } = req.body;
    
    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: 'Prompt is required'
      });
    }
    
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Image file is required'
      });
    }

    const formData = new FormData();
    formData.append('image_file', fs.createReadStream(req.file.path));
    formData.append('image_request', JSON.stringify({
      prompt,
      model,
      aspect_ratio,
      magic_prompt_option
    }));
    
    const response = await axios.post(REMIX_URL, formData, {
      headers: {
        ...formData.getHeaders(),
        'Api-Key': API_KEY
      }
    });
    
    // Clean up uploaded file
    fs.unlinkSync(req.file.path);
    
    res.status(200).json({
      success: true,
      message: 'Image remixed successfully',
      data: response.data,
      prompt // Include the original prompt in response
    });
  } catch (error) {
    handleApiError(error, res);
  }
};

// Upscale an image
export const upscaleImage = async (req, res) => {
  try {
    const { prompt } = req.body; // Optional prompt
    
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Image file is required'
      });
    }

    const formData = new FormData();
    formData.append('image_file', fs.createReadStream(req.file.path));
    
    // If prompt is provided, add it to form data
    if (prompt) {
      formData.append('image_request', JSON.stringify({ prompt }));
    }
    
    const response = await axios.post(UPSCALE_URL, formData, {
      headers: {
        ...formData.getHeaders(),
        'Api-Key': API_KEY
      }
    });
    
    // Clean up uploaded file
    fs.unlinkSync(req.file.path);
    
    res.status(200).json({
      success: true,
      message: 'Image upscaled successfully',
      data: response.data,
      prompt: prompt || '' // Include the original prompt in response if provided
    });
  } catch (error) {
    handleApiError(error, res);
  }
};

// Describe an image
export const describeImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Image file is required'
      });
    }

    const formData = new FormData();
    formData.append('image_file', fs.createReadStream(req.file.path));
    
    const response = await axios.post(DESCRIBE_URL, formData, {
      headers: {
        ...formData.getHeaders(),
        'Api-Key': API_KEY
      }
    });
    
    // Clean up uploaded file
    fs.unlinkSync(req.file.path);
    
    res.status(200).json({
      success: true,
      message: 'Image described successfully',
      data: response.data,
      descriptions: response.data.descriptions || [] // Include descriptions in response
    });
  } catch (error) {
    handleApiError(error, res);
  }
};

// Reframe an image
export const reframeImage = async (req, res) => {
  try {
    const { resolution = 'RESOLUTION_512_512', model = 'V_2A' } = req.body;
    
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Image file is required'
      });
    }

    const formData = new FormData();
    formData.append('image_file', fs.createReadStream(req.file.path));
    formData.append('resolution', resolution);
    formData.append('model', model);
    
    const response = await axios.post(REFRAME_URL, formData, {
      headers: {
        ...formData.getHeaders(),
        'Api-Key': API_KEY
      }
    });
    
    // Clean up uploaded file
    fs.unlinkSync(req.file.path);
    
    res.status(200).json({
      success: true,
      message: 'Image reframed successfully',
      data: response.data
    });
  } catch (error) {
    handleApiError(error, res);
  }
};