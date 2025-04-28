// client/src/pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaImage, FaPencilAlt, FaMagic, FaExpandArrowsAlt, FaComment, FaCrop } from 'react-icons/fa';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

const HomePage = () => {
  const features = [
    {
      icon: <FaImage size={24} />,
      title: 'Generate',
      description: 'Create stunning images from text prompts with powerful AI.',
      link: '/generate',
      color: 'from-purple-600 to-indigo-600',
    },
    {
      icon: <FaPencilAlt size={24} />,
      title: 'Edit',
      description: 'Modify existing images by applying masks and describing changes.',
      link: '/edit',
      color: 'from-blue-600 to-cyan-600',
    },
    {
      icon: <FaMagic size={24} />,
      title: 'Remix',
      description: 'Transform images with creative prompts and new styles.',
      link: '/remix',
      color: 'from-pink-600 to-rose-600',
    },
    {
      icon: <FaExpandArrowsAlt size={24} />,
      title: 'Upscale',
      description: 'Enhance image quality and resolution without losing details.',
      link: '/upscale',
      color: 'from-green-600 to-teal-600',
    },
    {
      icon: <FaComment size={24} />,
      title: 'Describe',
      description: 'Extract detailed descriptions from images using AI.',
      link: '/describe',
      color: 'from-yellow-600 to-amber-600',
    },
    {
      icon: <FaCrop size={24} />,
      title: 'Reframe',
      description: 'Change aspect ratios while preserving image content and context.',
      link: '/reframe',
      color: 'from-orange-600 to-red-600',
    },
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 space-background">
        <div className="container mx-auto px-4 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl"
          >
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-white font-bold text-3xl">I</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-accent to-purple-300">
              Unleash Creative Image Generation
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Transform your ideas into stunning visuals with our AI-powered image tools.
              Generate, edit, and enhance images with simple text prompts.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/generate">
                <Button variant="primary" className="text-lg px-8 py-3">
                  Start Creating
                </Button>
              </Link>
              <a href="#features">
                <Button variant="outline" className="text-lg px-8 py-3">
                  Explore Tools
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 grid-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Powerful Image Tools
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-xl text-gray-400 max-w-2xl mx-auto"
            >
              Explore our suite of AI-powered tools for image creation and manipulation
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link to={feature.link}>
                  <Card
                    className="h-full transition-all hover:translate-y-[-8px]"
                    hover={true}
                  >
                    <Card.Body>
                      <div className={`w-12 h-12 rounded-lg mb-4 bg-gradient-to-r ${feature.color} flex items-center justify-center text-white`}>
                        {feature.icon}
                      </div>
                      <Card.Title>{feature.title}</Card.Title>
                      <p className="text-gray-400">{feature.description}</p>
                    </Card.Body>
                    <Card.Footer className="flex justify-end">
                      <Button variant="ghost" className="text-sm">
                        Try Now &rarr;
                      </Button>
                    </Card.Footer>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-base-300 to-base-200">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-sm rounded-xl p-8 md:p-12 max-w-4xl mx-auto border border-primary/30"
          >
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Create?</h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Start with a simple text prompt and watch as AI transforms your ideas into stunning visuals
              </p>
              <Link to="/generate">
                <Button variant="primary" className="text-lg px-8 py-3">
                  Get Started Now
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;