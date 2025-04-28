// client/src/utils/errorHandler.js

/**
 * Categorizes and provides user-friendly error messages based on different error types
 */
export const categorizeError = (error) => {
    // Network errors - connection issues
    if (!navigator.onLine || error.message === 'Network Error' || error.message?.includes('Failed to fetch')) {
      return {
        type: 'network',
        title: 'Network Error',
        message: 'Please check your internet connection and try again.',
        details: error.message || 'Unable to connect to the server'
      };
    }
    
    // API key errors
    if (error.status === 401 || 
        error.message?.includes('Unauthorized') || 
        error.message?.includes('invalid api key') ||
        error.message?.includes('API key')) {
      return {
        type: 'auth',
        title: 'API Key Error',
        message: 'There was an issue with the API authentication. Please check your API key.',
        details: error.message || 'Unauthorized request'
      };
    }
    
    // Rate limiting or too many requests
    if (error.status === 429 || 
        error.message?.includes('Too Many Requests') || 
        error.message?.includes('rate limit')) {
      return {
        type: 'rate_limit',
        title: 'Rate Limit Exceeded',
        message: 'You have exceeded the API rate limit. Please wait a moment and try again.',
        details: error.message || 'Too many requests'
      };
    }
    
    // Content policy violations
    if (error.status === 403 || 
        error.message?.includes('content policy') ||
        error.message?.includes('forbidden') ||
        error.message?.includes('inappropriate') ||
        error.message?.includes('prohibited')) {
      return {
        type: 'content_policy',
        title: 'Content Policy Violation',
        message: 'Your request was rejected due to content policy restrictions. Please modify your prompt to comply with content guidelines.',
        details: error.message || 'Content policy violation'
      };
    }
    
    // Bad requests - often due to prompt issues
    if (error.status === 400 || error.message?.includes('Bad Request')) {
      return {
        type: 'prompt',
        title: 'Invalid Request',
        message: 'There was an issue with your request. Please check your prompt and other parameters.',
        details: error.message || 'Bad request'
      };
    }
    
    // File upload errors
    if (error.message?.includes('file') || 
        error.message?.includes('image') && 
        error.message?.includes('upload')) {
      return {
        type: 'file',
        title: 'File Upload Error',
        message: 'There was an issue with your uploaded file. Please ensure it\'s a valid image in JPG, PNG, or WebP format and under the size limit.',
        details: error.message || 'File upload issue'
      };
    }
    
    // Server errors
    if (error.status >= 500 || error.message?.includes('server error')) {
      return {
        type: 'server',
        title: 'Server Error',
        message: 'The server encountered an error. Please try again later.',
        details: error.message || 'Internal server error'
      };
    }
    
    // Process errors specific to image generation
    if (error.message?.includes('process') || 
        error.message?.includes('generate') || 
        error.message?.includes('generation')) {
      return {
        type: 'processing',
        title: 'Image Processing Error',
        message: 'There was an error processing your image. This could be due to high demand or complexity of the request.',
        details: error.message || 'Image processing failed'
      };
    }
    
    // Unprocessable entity - often due to invalid parameters
    if (error.status === 422 || error.message?.includes('Unprocessable')) {
      return {
        type: 'parameters',
        title: 'Invalid Parameters',
        message: 'Some parameters in your request were invalid. Please check your inputs and try again.',
        details: error.message || 'Unprocessable entity'
      };
    }
    
    // Default/unknown errors
    return {
      type: 'unknown',
      title: 'Unexpected Error',
      message: 'An unexpected error occurred. Please try again or contact support if the issue persists.',
      details: error.message || 'Unknown error'
    };
  };
  
  /**
   * Logs error details to console with consistent formatting
   */
  export const logError = (error, source = 'Application') => {
    const errorDetails = {
      timestamp: new Date().toISOString(),
      source: source,
      message: error.message || 'Unknown error',
      status: error.status || error.statusCode,
      data: error.response?.data || error.data,
      stack: error.stack
    };
    
    console.error(`[${errorDetails.timestamp}] [${source}] Error:`, errorDetails);
    return errorDetails;
  };
  
  /**
   * Processes API errors and provides structured response
   */
  export const handleApiError = (error, source = 'API') => {
    // Log the error with details
    logError(error, source);
    
    // Extract status and message
    const status = error.response?.status || error.status || 500;
    let message = error.response?.data?.message || 
                  error.message || 
                  'An unexpected error occurred';
                  
    // Get categorized error
    const categorized = categorizeError(error);
    
    return {
      error: true,
      status,
      type: categorized.type,
      title: categorized.title,
      message: categorized.message,
      details: categorized.details,
      timestamp: new Date().toISOString()
    };
  };
  
  export default {
    categorizeError,
    logError,
    handleApiError
  };