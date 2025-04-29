// // client/src/pages/GeneratePage.jsx
// import React, { useState } from 'react';
// import { FaImage, FaMagic, FaCrown } from 'react-icons/fa';
// import { motion } from 'framer-motion';
// import PageHeader from '../components/common/PageHeader';
// import FormWrapper from '../components/common/FormWrapper';
// import Button from '../components/common/Button';
// import TextArea from '../components/common/TextArea';
// import Select from '../components/common/Select';
// import ImageResult from '../components/common/ImageResult';
// import Loading from '../components/common/Loading';
// import { useToast } from '../context/ToastContext';
// import api from '../services/api';

// const GeneratePage = () => {
//   const { addToast } = useToast();
  
//   // Form state
//   const [formData, setFormData] = useState({
//     prompt: '',
//     model: 'V_2A',
//     style_type: 'REALISTIC'
//   });
  
//   // Result state
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);
//   // Premium notice modal state
//   const [showPremiumNotice, setShowPremiumNotice] = useState(false);
  
//   // Model options based on API documentation with premium options
//   const modelOptions = [
//     { value: 'V_2A', label: 'V2 Turbo (Recommended)' },
//     { value: 'V_2', label: 'V2 Standard' },
//     { value: 'V_3A', label: 'V3 Turbo (Premium) ✨' },
//     { value: 'V_3', label: 'V3 Standard (Premium) ✨' }
//   ];
  
//   // Style options based on API documentation
//   const styleOptions = [
//     { value: 'REALISTIC', label: 'Realistic' },
//     { value: 'ANIME', label: 'Anime' },
//     { value: 'AUTO', label: 'Auto' },
//     { value: 'DESIGN', label: 'Design' },
//     { value: 'GENERAL', label: 'General' },
//     { value: 'RENDER_3D', label: 'Render 3D' }
//   ];
  
//   // Handle form input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
    
//     // Check if premium model is selected
//     if (name === 'model' && (value === 'V_3A' || value === 'V_3')) {
//       setShowPremiumNotice(true);
//       // Set back to a non-premium model
//       setFormData({
//         ...formData,
//         model: 'V_2A'
//       });
//       return;
//     }
    
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };
  
//   // Close premium notice modal
//   const closePremiumNotice = () => {
//     setShowPremiumNotice(false);
//   };
  
//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Validate form
//     if (!formData.prompt.trim()) {
//       addToast('Please enter a prompt', 'error');
//       return;
//     }
    
//     // Start loading
//     setLoading(true);
//     setResult(null);
    
//     try {
//       // Call API to generate image
//       const response = await api.generateImage(formData);
      
//       // Set result
//       setResult(response);
      
//       // Show success message
//       addToast('Image generated successfully!', 'success');
//     } catch (error) {
//       // Show error message
//       addToast(error.message || 'Failed to generate image', 'error');
//       console.error('Generate error:', error);
//     } finally {
//       // Stop loading
//       setLoading(false);
//     }
//   };
  
//   return (
//     <div className="container px-4 pt-24 pb-16 mx-auto">
//       <PageHeader
//         title="Generate Image"
//         subtitle="Create stunning AI-generated images from your text prompts"
//         icon={<FaImage size={28} />}
//       />
      
//       <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
//         {/* Form Section */}
//         <FormWrapper
//           title="Enter Your Prompt"
//           subtitle="Describe what you want to see in detail. Be specific about style, subject, lighting, etc."
//         >
//           <form onSubmit={handleSubmit}>
//             <TextArea
//               label="Prompt"
//               id="prompt"
//               name="prompt"
//               rows={5}
//               placeholder="A serene tropical beach scene. Dominating the foreground are tall palm trees with a crystal clear ocean in the background."
//               value={formData.prompt}
//               onChange={handleChange}
//             />
            
//             <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//               <Select
//                 label="Model"
//                 id="model"
//                 name="model"
//                 options={modelOptions}
//                 value={formData.model}
//                 onChange={handleChange}
//               />
              
//               <Select
//                 label="Style"
//                 id="style_type"
//                 name="style_type"
//                 options={styleOptions}
//                 value={formData.style_type}
//                 onChange={handleChange}
//               />
//             </div>
            
//             <div className="mt-6">
//               <Button 
//                 type="submit"
//                 disabled={loading || !formData.prompt.trim()}
//                 loading={loading}
//                 className="w-full"
//               >
//                 <FaMagic className="mr-2" />
//                 Generate Image
//               </Button>
//             </div>
            
//             <div className="mt-4 text-xs text-gray-500">
//               <p className="mb-1">Tips for better results:</p>
//               <ul className="pl-5 space-y-1 list-disc">
//                 <li>Be specific about the subject, style, lighting, and composition</li>
//                 <li>Include details about the setting, time of day, and atmosphere</li>
//                 <li>Specify artistic styles or reference specific artists if desired</li>
//                 <li>Mention camera angles, lens types for photorealistic images</li>
//               </ul>
//             </div>
//           </form>
//         </FormWrapper>
        
//         {/* Result Section */}
//         <div>
//           {loading ? (
//             <div className="flex flex-col items-center justify-center h-full min-h-[300px]">
//               <Loading size="lg" />
//               <p className="mt-4 text-gray-400">Generating your image...</p>
//             </div>
//           ) : result ? (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.5 }}
//             >
//               <ImageResult 
//                 imageData={result} 
//                 prompt={formData.prompt}
//               />
//             </motion.div>
//           ) : (
//             <div className="flex flex-col items-center justify-center bg-base-200 rounded-xl p-8 h-full min-h-[300px] border border-base-300 border-dashed">
//               <FaImage size={48} className="mb-4 text-gray-600" />
//               <p className="text-center text-gray-400">
//                 Your generated image will appear here
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
      
//       {/* Examples Section */}
//       <div className="mt-16">
//         <h2 className="mb-6 text-2xl font-bold">Example Prompts</h2>
//         <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
//           {[
//             "A futuristic cityscape at sunset with flying cars and neon signs, cyberpunk style",
//             "A medieval fantasy castle perched on a cliff overlooking a misty valley, digital art",
//             "A photorealistic portrait of a wise old man with weathered skin and bright blue eyes",
//             "An underwater scene with colorful coral reefs and exotic fish in crystal clear water",
//             "A cozy cabin in snowy mountains with smoke coming from the chimney, warm lighting inside",
//             "A close-up of a butterfly on a flower with morning dew, macro photography style"
//           ].map((example, index) => (
//             <motion.div
//               key={index}
//               whileHover={{ scale: 1.02 }}
//               className="p-4 rounded-lg cursor-pointer bg-base-300"
//               onClick={() => setFormData({ ...formData, prompt: example })}
//             >
//               <p className="text-gray-300">{example}</p>
//             </motion.div>
//           ))}
//         </div>
//       </div>
      
//       {/* Premium Notice Modal */}
//       {showPremiumNotice && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//           <motion.div 
//             initial={{ scale: 0.9, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             className="max-w-md p-8 mx-4 bg-base-200 rounded-xl"
//           >
//             <div className="flex justify-center mb-4 text-yellow-400">
//               <FaCrown size={48} />
//             </div>
//             <h3 className="mb-4 text-xl font-bold text-center">Premium Feature</h3>
//             <p className="mb-6 text-center text-gray-300">
//               V3 models are exclusive to premium users. Our premium subscription will be available soon with enhanced features and faster processing!
//             </p>
//             <div className="flex justify-center">
//               <Button onClick={closePremiumNotice}>
//                 Continue with Standard Models
//               </Button>
//             </div>
//           </motion.div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default GeneratePage;



// client/src/pages/GeneratePage.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaImage, 
  FaMagic, 
  FaCrown, 
  FaBolt,
  FaLightbulb,
  FaArrowRight,
  FaRandom,
  FaInfoCircle
} from 'react-icons/fa';

// Import our modern components
import PageHeader from '../components/common/PageHeader';
import FormWrapper from '../components/common/FormWrapper';
import Button from '../components/common/Button';
import TextArea from '../components/common/TextArea';
import Select from '../components/common/Select';
import ImageResult from '../components/common/ImageResult';
import Card from '../components/common/Card';
import { useToast } from '../context/ToastContext';
import api from '../services/api';

const GeneratePage = () => {
  const { addToast } = useToast();
  
  // Form state
  const [formData, setFormData] = useState({
    prompt: '',
    model: 'V_2A',
    style_type: 'REALISTIC'
  });
  
  // UI state
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPremiumNotice, setShowPremiumNotice] = useState(false);
  const [showTips, setShowTips] = useState(false);
  
  // Model options with premium options
  const modelOptions = [
    { value: 'V_2A', label: 'V2 Turbo (Recommended)' },
    { value: 'V_2', label: 'V2 Standard' },
    { value: 'V_3A', label: 'V3 Turbo (Premium) ✨' },
    { value: 'V_3', label: 'V3 Standard (Premium) ✨' }
  ];
  
  // Style options
  const styleOptions = [
    { value: 'REALISTIC', label: 'Realistic' },
    { value: 'ANIME', label: 'Anime' },
    { value: 'AUTO', label: 'Auto' },
    { value: 'DESIGN', label: 'Design' },
    { value: 'GENERAL', label: 'General' },
    { value: 'RENDER_3D', label: 'Render 3D' }
  ];
  
  // Example prompts
  const examplePrompts = [
    {
      title: "Futuristic City",
      prompt: "A futuristic cityscape at sunset with flying cars and neon signs, cyberpunk style",
      category: "Landscapes"
    },
    {
      title: "Fantasy Castle",
      prompt: "A medieval fantasy castle perched on a cliff overlooking a misty valley, digital art",
      category: "Fantasy"
    },
    {
      title: "Portrait",
      prompt: "A photorealistic portrait of a wise old man with weathered skin and bright blue eyes",
      category: "People"
    },
    {
      title: "Underwater Scene",
      prompt: "An underwater scene with colorful coral reefs and exotic fish in crystal clear water",
      category: "Nature"
    },
    {
      title: "Cozy Cabin",
      prompt: "A cozy cabin in snowy mountains with smoke coming from the chimney, warm lighting inside",
      category: "Places"
    },
    {
      title: "Macro Photography",
      prompt: "A close-up of a butterfly on a flower with morning dew, macro photography style",
      category: "Nature"
    }
  ];
  
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Check if premium model is selected
    if (name === 'model' && (value === 'V_3A' || value === 'V_3')) {
      setShowPremiumNotice(true);
      // Set back to a non-premium model
      setFormData({
        ...formData,
        model: 'V_2A'
      });
      return;
    }
    
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Set example prompt
  const setExamplePrompt = (prompt) => {
    setFormData({ ...formData, prompt });
    // Auto-scroll to the prompt textarea
    document.getElementById('prompt').scrollIntoView({ behavior: 'smooth' });
  };
  
  // Close premium notice modal
  const closePremiumNotice = () => {
    setShowPremiumNotice(false);
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.prompt.trim()) {
      addToast('Please enter a prompt', 'error');
      return;
    }
    
    // Start loading
    setLoading(true);
    setResult(null);
    
    try {
      // Call API to generate image
      const response = await api.generateImage(formData);
      
      // Set result
      setResult(response);
      
      // Show success message
      addToast('Image generated successfully!', 'success');
    } catch (error) {
      // Show error message
      addToast(error.message || 'Failed to generate image', 'error');
      console.error('Generate error:', error);
    } finally {
      // Stop loading
      setLoading(false);
    }
  };
  
  return (
    <div className="container px-4 pt-24 pb-16 mx-auto">
      <PageHeader
        title="Generate Image"
        subtitle="Create stunning AI-generated images from your text prompts"
        icon={<FaImage size={30} />}
        badge="AI Powered"
      />
      
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Form Section */}
        <FormWrapper
          title="Create Your Image"
          subtitle="Describe what you want to see in detail for best results"
          variant="glass"
          icon={<FaMagic size={18} />}
          loading={loading}
        >
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <TextArea
                label="Prompt"
                id="prompt"
                name="prompt"
                rows={5}
                placeholder="A serene tropical beach scene. Dominating the foreground are tall palm trees with a crystal clear ocean in the background."
                value={formData.prompt}
                onChange={handleChange}
                variant="glass"
                helpText="Be specific about style, subject, lighting, and composition for best results."
                required={true}
              />

              <div className="flex items-center justify-between mt-1">
                <button
                  type="button"
                  onClick={() => setShowTips(!showTips)}
                  className="flex items-center text-xs transition-colors text-primary-400 hover:text-primary-300"
                >
                  <FaLightbulb className="mr-1" size={12} />
                  <span>{showTips ? 'Hide Tips' : 'Show Tips'}</span>
                </button>
                
                <span className="text-xs text-dark-400">
                  {formData.prompt.length} characters
                </span>
              </div>
              
              <AnimatePresence>
                {showTips && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-3 overflow-hidden"
                  >
                    <div className="p-3 border rounded-lg bg-dark-800/50 backdrop-blur-sm border-dark-700/50">
                      <h4 className="mb-2 text-sm font-medium text-primary-400">Tips for Better Results:</h4>
                      <ul className="ml-4 space-y-1 text-xs list-disc text-dark-300">
                        <li>Include subject, setting, lighting, colors, and mood</li>
                        <li>Specify artistic style (e.g., "oil painting", "digital art")</li>
                        <li>Add camera details for photorealistic results (e.g., "shot with DSLR camera, 85mm lens")</li>
                        <li>Include time of day and weather if relevant</li>
                        <li>Mention materials, textures, and surfaces</li>
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-2">
              <Select
                label="Model"
                id="model"
                name="model"
                options={modelOptions}
                value={formData.model}
                onChange={handleChange}
                variant="glass"
                icon={<FaBolt size={14} />}
              />
              
              <Select
                label="Style"
                id="style_type"
                name="style_type"
                options={styleOptions}
                value={formData.style_type}
                onChange={handleChange}
                variant="glass"
                icon={<FaRandom size={14} />}
              />
            </div>
            
            <Button 
              type="submit"
              variant="primary"
              size="lg"
              disabled={loading || !formData.prompt.trim()}
              loading={loading}
              className="w-full"
              icon={<FaMagic />}
            >
              {loading ? 'Generating...' : 'Generate Image'}
            </Button>
          </form>
        </FormWrapper>
        
        {/* Result Section */}
        <div>
          {loading ? (
            <div className="flex flex-col items-center justify-center h-64 glass-card">
              <div className="w-16 h-16 mb-4 border-t-4 border-b-4 rounded-full border-primary-500 animate-spin"></div>
              <p className="text-lg text-white">Creating your masterpiece...</p>
              <p className="mt-2 text-sm text-dark-400">This may take a few moments</p>
            </div>
          ) : result ? (
            <ImageResult 
              imageData={result} 
              prompt={formData.prompt}
            />
          ) : (
            <div className="glass-card flex flex-col items-center justify-center p-8 h-full min-h-[400px]">
              <div className="p-6 mb-6 rounded-full bg-primary-500/10 animate-pulse-slow">
                <FaImage size={64} className="text-primary-500/60" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-white font-display">
                Your image will appear here
              </h3>
              <p className="max-w-md text-center text-dark-400">
                Enter a prompt and click "Generate Image" to create your AI artwork
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Example Prompts Section */}
      <div className="mt-16">
        <div className="flex items-center mb-6">
          <FaLightbulb className="mr-3 text-primary-500" size={24} />
          <h2 className="text-2xl font-bold font-display">Example Prompts</h2>
        </div>
        
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {examplePrompts.map((example, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="transition-shadow cursor-pointer glass-card hover:shadow-lg"
              onClick={() => setExamplePrompt(example.prompt)}
            >
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-white">{example.title}</h3>
                  <Card.Badge color="primary">{example.category}</Card.Badge>
                </div>
                <p className="text-sm text-dark-300">{example.prompt}</p>
              </div>
              <div className="flex justify-end px-4 py-2 border-t border-dark-800/50">
                <button className="flex items-center text-xs text-primary-400 hover:text-primary-300">
                  Use this prompt <FaArrowRight className="ml-1" size={10} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Premium Notice Modal */}
      <AnimatePresence>
        {showPremiumNotice && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-900/80 backdrop-blur-sm"
            onClick={closePremiumNotice}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="max-w-md p-8 mx-auto shadow-2xl bg-dark-800 rounded-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-center mb-6">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-amber-500/10">
                  <FaCrown size={32} className="text-amber-500" />
                </div>
              </div>
              
              <h3 className="mb-3 text-2xl font-bold text-center font-display">Premium Feature</h3>
              
              <p className="mb-6 text-center text-dark-300">
                V3 models are exclusive to premium users. Our premium subscription will be available soon with enhanced features and faster processing!
              </p>
              
              <div className="flex justify-center">
                <Button 
                  onClick={closePremiumNotice}
                  variant="glass"
                  size="lg"
                >
                  Continue with Standard Models
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GeneratePage;