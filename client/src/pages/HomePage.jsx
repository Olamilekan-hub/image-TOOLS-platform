// client/src/pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaImage, 
  FaPencilAlt, 
  FaMagic, 
  FaExpandArrowsAlt, 
  FaComment, 
  FaCrop,
  FaArrowRight,
  FaStar,
  FaLightbulb,
  FaRocket
} from 'react-icons/fa';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

const HomePage = () => {
  // Define features with detailed info and eye-catching icons
  const features = [
    {
      icon: <FaImage size={24} />,
      title: 'Generate',
      description: 'Create stunning AI images from text prompts with state-of-the-art models.',
      link: '/generate',
      color: 'primary',
      gradient: 'from-primary-500 to-primary-600'
    },
    {
      icon: <FaPencilAlt size={24} />,
      title: 'Edit',
      description: 'Modify existing images with precision by applying masks and text instructions.',
      link: '/edit',
      color: 'secondary',
      gradient: 'from-secondary-500 to-secondary-600'
    },
    {
      icon: <FaMagic size={24} />,
      title: 'Remix',
      description: 'Transform images with creative prompts, styles, and artistic variations.',
      link: '/remix',
      color: 'accent',
      gradient: 'from-accent-500 to-accent-600'
    },
    {
      icon: <FaExpandArrowsAlt size={24} />,
      title: 'Upscale',
      description: 'Enhance resolution and quality while preserving details and textures.',
      link: '/upscale',
      color: 'emerald',
      gradient: 'from-emerald-500 to-emerald-600'
    },
    {
      icon: <FaComment size={24} />,
      title: 'Describe',
      description: 'Extract detailed AI-generated descriptions from any image content.',
      link: '/describe',
      color: 'amber',
      gradient: 'from-amber-500 to-amber-600'
    },
    {
      icon: <FaCrop size={24} />,
      title: 'Reframe',
      description: 'Change aspect ratios intelligently while preserving image context and content.',
      link: '/reframe',
      color: 'rose',
      gradient: 'from-rose-500 to-rose-600'
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 overflow-hidden hero-bg">
        <div className="hero-grid"></div>
        <div className="container relative z-10 px-4 mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Logo Animation */}
              <motion.div 
                className="flex justify-center mb-8"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.2
                }}
              >
                <div className="relative flex items-center justify-center w-20 h-20">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500 rounded-2xl opacity-90 animate-pulse-slow"></div>
                  <span className="relative text-4xl font-bold text-white font-display">I</span>
                  
                  {/* Decorative orbs */}
                  <motion.div 
                    className="absolute w-3 h-3 rounded-full bg-primary-400"
                    animate={{ 
                      x: [0, 10, 0], 
                      y: [0, -10, 0],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                    style={{ left: '-5px', top: '50%' }}
                  />
                  <motion.div 
                    className="absolute w-2 h-2 rounded-full bg-secondary-400"
                    animate={{ 
                      x: [0, -8, 0], 
                      y: [0, 8, 0],
                      opacity: [0.5, 0.8, 0.5]
                    }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    style={{ right: '-3px', bottom: '10px' }}
                  />
                  <motion.div 
                    className="absolute w-2 h-2 rounded-full bg-accent-400"
                    animate={{ 
                      x: [0, 5, 0], 
                      y: [0, 5, 0],
                      opacity: [0.6, 0.9, 0.6]
                    }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                    style={{ top: '10px', right: '5px' }}
                  />
                </div>
              </motion.div>
              
              <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl font-display">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400">
                  Unleash Creative Image Generation
                </span>
              </h1>
              
              <p className="max-w-3xl mx-auto mb-8 text-lg md:text-xl text-dark-300">
                Transform your ideas into stunning visuals with our AI-powered image platform.
                Generate, edit, and enhance images with simple text prompts.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/generate">
                  <Button 
                    variant="primary" 
                    size="lg"
                    className="font-display"
                    icon={<FaRocket />}
                  >
                    Start Creating
                  </Button>
                </Link>
                <a href="#features">
                  <Button 
                    variant="glass" 
                    size="lg"
                    className="font-display"
                  >
                    Explore Tools
                  </Button>
                </a>
              </div>
            </motion.div>
            
            {/* Mockup Floating Visual */}
            <motion.div
              className="relative mx-auto mt-16"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <div className="relative max-w-4xl p-2 mx-auto overflow-hidden border bg-dark-800/50 backdrop-blur-md rounded-2xl border-dark-700/50 shadow-glass-lg">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-500/40 to-transparent"></div>
                
                {/* Mockup image */}
                <div className="relative overflow-hidden rounded-lg bg-dark-900">
                  {/* Replace with actual mockup image */}
                  <div className="flex items-center justify-center aspect-video bg-gradient-to-br from-dark-800 to-dark-900">
                    <div className="px-6 py-12 text-center">
                      <div className="animate-pulse">
                        <div className="flex justify-center mb-4">
                          <FaImage size={64} className="text-primary-500/30" />
                        </div>
                        <div className="w-64 h-4 mx-auto mb-3 rounded bg-dark-700/50"></div>
                        <div className="w-48 h-4 mx-auto rounded bg-dark-700/50"></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Control bar mockup */}
                <div className="flex items-center justify-between px-4 py-3 mt-2 rounded-lg bg-dark-800/70">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="w-32 h-4 rounded bg-dark-700/50"></div>
                </div>
              </div>
              
              {/* Floating elements decoration */}
              <div className="absolute w-20 h-20 rounded-full -top-8 -right-8 bg-primary-500/10 blur-xl"></div>
              <div className="absolute w-32 h-32 rounded-full -bottom-10 -left-10 bg-secondary-500/10 blur-xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-20 bg-dark-950">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container px-4 mx-auto">
          <div className="mb-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-3 px-4 py-1.5 bg-dark-800/80 rounded-full"
            >
              <span className="text-sm font-medium text-transparent bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text">
                Powerful AI Toolkit
              </span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-4 text-3xl font-bold tracking-tight md:text-4xl font-display"
            >
              Everything You Need for AI Imagery
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-2xl mx-auto text-lg text-dark-300"
            >
              Explore our suite of AI-powered tools for image creation, modification, and enhancement
            </motion.p>
          </div>

          <motion.div 
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
              >
                <Link to={feature.link} className="block h-full">
                  <Card
                    variant="glass"
                    className="h-full transition-all group hover:translate-y-[-8px]"
                    hover={true}
                    glow={true}
                  >
                    <Card.Body>
                      <div className={`w-12 h-12 rounded-lg mb-4 flex items-center justify-center text-white bg-gradient-to-br ${feature.gradient} group-hover:scale-110 transition-transform duration-300`}>
                        {feature.icon}
                      </div>
                      <Card.Title>{feature.title}</Card.Title>
                      <p className="transition-colors text-dark-300 group-hover:text-dark-200">{feature.description}</p>
                    </Card.Body>
                    <Card.Footer className="flex justify-end">
                      <div className="flex items-center gap-1 text-sm transition-all text-primary-400 group-hover:gap-2">
                        Try Now <FaArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                      </div>
                    </Card.Footer>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-900 to-dark-950"></div>
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_20%,_rgba(139,92,246,0.4)_0%,_transparent_60%)]"></div>
        <div className="container relative z-10 px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl p-8 mx-auto border glass-container rounded-2xl md:p-12 border-dark-700/30"
          >
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-primary-500/10">
                <FaLightbulb className="w-8 h-8 text-primary-400" />
              </div>
              
              <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl font-display">
                Ready to Create?
              </h2>
              
              <p className="max-w-2xl mx-auto mb-8 text-lg text-dark-300">
                Start with a simple text prompt and watch as AI transforms your ideas into stunning visuals
              </p>
              
              <Link to="/generate">
                <Button 
                  variant="primary" 
                  size="lg"
                  className="shadow-xl shadow-primary-600/20"
                >
                  Get Started Now
                </Button>
              </Link>
              
              <div className="flex flex-wrap justify-center gap-8 mt-8">
                <div className="flex items-center">
                  <FaStar className="mr-2 text-amber-400" />
                  <span className="text-dark-300">State-of-the-art models</span>
                </div>
                <div className="flex items-center">
                  <FaStar className="mr-2 text-amber-400" />
                  <span className="text-dark-300">Fast processing</span>
                </div>
                <div className="flex items-center">
                  <FaStar className="mr-2 text-amber-400" />
                  <span className="text-dark-300">Endless creative possibilities</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;