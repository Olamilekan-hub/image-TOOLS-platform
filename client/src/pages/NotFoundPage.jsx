// client/src/pages/NotFoundPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome, FaImage, FaSearch, FaExclamationTriangle } from 'react-icons/fa';
import Button from '../components/common/Button';

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen px-4 pt-16">
      <div className="container max-w-4xl px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          {/* 404 Visual */}
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-500/20 via-secondary-500/20 to-accent-500/20 blur-2xl"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-center w-32 h-32 border shadow-xl md:w-40 md:h-40 bg-white dark:bg-dark-800/80 backdrop-blur-sm rounded-3xl border-light-200/50 dark:border-dark-700/50">
                <span className="text-6xl font-bold text-transparent md:text-7xl font-display bg-clip-text bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400">
                  404
                </span>
              </div>
            </div>
          </div>
          
          <div className="p-8 glass-card md:p-12 bg-white/80 dark:bg-dark-800/80 backdrop-blur-md border border-light-200/50 dark:border-dark-700/50 rounded-xl">
            <FaExclamationTriangle size={36} className="mx-auto mb-6 text-amber-500" />
            
            <h1 className="mb-4 text-3xl font-bold text-dark-900 dark:text-white md:text-4xl font-display">
              Page Not Found
            </h1>
            
            <p className="max-w-xl mx-auto mb-8 text-lg text-dark-600 dark:text-dark-300">
              Oops! The page you're looking for doesn't exist or has been moved. Let's get you back on track.
            </p>
            
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link to="/">
                <Button 
                  variant="primary" 
                  size="lg"
                  icon={<FaHome />}
                  className="w-full sm:w-auto"
                >
                  Back to Home
                </Button>
              </Link>
              
              <Link to="/generate">
                <Button 
                  variant="glass" 
                  size="lg"
                  icon={<FaImage />}
                  className="w-full sm:w-auto"
                >
                  Generate Images
                </Button>
              </Link>
            </div>
            
            <div className="pt-8 mt-12 border-t border-light-200/50 dark:border-dark-700/50">
              <p className="mb-4 text-dark-600 dark:text-dark-400">Popular Pages</p>
              <div className="flex flex-wrap justify-center gap-2">
                <Link to="/generate">
                  <span className="inline-flex items-center px-3 py-1 text-xs font-medium transition-colors border rounded-full bg-white dark:bg-dark-800 text-primary-600 dark:text-primary-400 border-light-200 dark:border-dark-700 hover:bg-light-100 dark:hover:bg-dark-700">
                    <FaImage className="mr-1" size={10} /> Generate
                  </span>
                </Link>
                <Link to="/edit">
                  <span className="inline-flex items-center px-3 py-1 text-xs font-medium transition-colors border rounded-full bg-white dark:bg-dark-800 text-secondary-600 dark:text-secondary-400 border-light-200 dark:border-dark-700 hover:bg-light-100 dark:hover:bg-dark-700">
                    <FaImage className="mr-1" size={10} /> Edit
                  </span>
                </Link>
                <Link to="/remix">
                  <span className="inline-flex items-center px-3 py-1 text-xs font-medium transition-colors border rounded-full bg-white dark:bg-dark-800 text-accent-600 dark:text-accent-400 border-light-200 dark:border-dark-700 hover:bg-light-100 dark:hover:bg-dark-700">
                    <FaImage className="mr-1" size={10} /> Remix
                  </span>
                </Link>
                <Link to="/upscale">
                  <span className="inline-flex items-center px-3 py-1 text-xs font-medium transition-colors border rounded-full bg-white dark:bg-dark-800 text-green-600 dark:text-green-400 border-light-200 dark:border-dark-700 hover:bg-light-100 dark:hover:bg-dark-700">
                    <FaImage className="mr-1" size={10} /> Upscale
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFoundPage;