# IdeogramAI Image Generation Platform

A full-stack web application that leverages the Ideogram API to generate, edit, remix, upscale, describe, and reframe images using AI. Built with React, Vite, Express, and Tailwind CSS.

## Features

- **Generate Images**: Create AI-generated images from text prompts
- **Edit Images**: Modify existing images with masks and text prompts
- **Remix Images**: Transform images based on creative prompts
- **Upscale Images**: Enhance image quality and resolution
- **Describe Images**: Get AI-generated descriptions of image content
- **Reframe Images**: Change aspect ratios while preserving content

## Tech Stack

### Frontend
- React 18
- Vite
- React Router v6
- Tailwind CSS
- Framer Motion
- Axios
- React Icons

### Backend
- Node.js
- Express
- Multer (for file uploads)
- Axios (for API requests)
- CORS
- dotenv

## Prerequisites

- Node.js (v16+)
- npm or yarn
- Ideogram API key (https://ideogram.ai/)

## Project Structure

```
image-ai-platform/
├── client/                  # Frontend React application
│   ├── public/              # Static files
│   ├── src/                 # Source files
│   │   ├── assets/          # Images, fonts, etc.
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   ├── context/         # React context providers
│   │   ├── utils/           # Utility functions
│   │   ├── styles/          # Global styles
│   │   ├── App.jsx          # Main App component
│   │   └── main.jsx         # Entry point
│   ├── index.html           # HTML entry point
│   └── vite.config.js       # Vite configuration
│
├── server/                  # Backend Express server
│   ├── controllers/         # Route controllers
│   ├── routes/              # API routes
│   ├── uploads/             # Temporary uploads directory
│   ├── server.js            # Entry point
│   └── .env                 # Environment variables
│
├── .gitignore               # Git ignore file
├── README.md                # Project documentation
└── package.json             # Root package.json for scripts
```

## Installation & Setup

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/image-ai-platform.git
   cd image-ai-platform
   ```

2. Install dependencies for the entire project
   ```bash
   npm run setup
   ```
   
   This command will install dependencies for the root project, client, and server.

3. Set up environment variables

   **Server (.env file in server directory):**
   ```
   PORT=5000
   IDEOGRAM_API_KEY=your_ideogram_api_key_here
   ```

   **Client (.env file in client directory):**
   ```
   VITE_API_URL=http://localhost:5000/api
   ```

4. Create uploads directory in the server folder
   ```bash
   mkdir -p server/uploads
   ```

## Running the Application

1. Development mode (both client and server concurrently)
   ```bash
   npm run dev
   ```

2. Run only the client
   ```bash
   npm run client
   ```

3. Run only the server
   ```bash
   npm run server
   ```

4. Production build
   ```bash
   npm run build
   ```

## API Endpoints

The backend provides the following API endpoints:

- `POST /api/images/generate` - Generate an image from a text prompt
- `POST /api/images/edit` - Edit an image with a mask and prompt
- `POST /api/images/remix` - Remix an image with a prompt
- `POST /api/images/upscale` - Upscale an image
- `POST /api/images/describe` - Get descriptions of an image
- `POST /api/images/reframe` - Change the aspect ratio of an image

## Usage Guide

### Generate Images

1. Navigate to the Generate page
2. Enter a detailed prompt describing the image you want to create
3. Select the desired model and style
4. Click "Generate Image"
5. Download or copy the generated image

### Edit Images

1. Navigate to the Edit page
2. Upload an image
3. Create a mask by drawing on the image (white areas will be edited)
4. Enter a prompt describing what should appear in the masked area
5. Click "Edit Image"
6. Download the result

### Remix Images

1. Navigate to the Remix page
2. Upload an image
3. Enter a prompt describing how you want to transform the image
4. Select aspect ratio and model options
5. Click "Remix Image"
6. Download the result

### Upscale Images

1. Navigate to the Upscale page
2. Upload an image
3. Optionally, add a prompt to guide the upscaling process
4. Click "Upscale Image"
5. Download the higher-resolution result

### Describe Images

1. Navigate to the Describe page
2. Upload an image
3. Click "Generate Description"
4. View AI-generated descriptions of your image
5. Copy descriptions as needed

### Reframe Images

1. Navigate to the Reframe page
2. Upload an image
3. Select the target resolution and aspect ratio
4. Click "Reframe Image"
5. Download the result

## Best Practices for Prompts

### General Tips

- Be specific and detailed in your prompts
- Include information about style, setting, lighting, and composition
- Mention specific artistic references if desired
- For photorealistic results, include camera details (e.g., "shot with a DSLR camera")

### Examples

**Good prompt:** "A serene tropical beach at sunset, with palm trees silhouetted against an orange and purple sky. Gentle waves lapping at the shore, fine white sand, and a small wooden boat in the distance. Highly detailed digital painting in the style of Thomas Kinkade."

**Basic prompt:** "A beach with trees."

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- This application uses the Ideogram API for AI image generation
- Built with React, Vite, Express, and Tailwind CSS
- Icons provided by React Icons