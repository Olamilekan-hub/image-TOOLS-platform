// client/src/components/layout/MainLayout.jsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';

const MainLayout = ({ children }) => {
  const location = useLocation();
  const [pageTransition, setPageTransition] = useState(false);
  
  // Use this to determine if we're on the tools page
  const isToolsPage = location.pathname.includes('/generate') || 
                     location.pathname.includes('/edit') ||
                     location.pathname.includes('/remix') ||
                     location.pathname.includes('/upscale') ||
                     location.pathname.includes('/describe') ||
                     location.pathname.includes('/reframe');

  // Handle navigation transitions
  useEffect(() => {
    setPageTransition(true);
    const timer = setTimeout(() => {
      setPageTransition(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="relative flex flex-col min-h-screen text-dark-900 dark:text-white bg-white dark:bg-dark-950">
      {/* Background particle effect */}
      <div className="fixed inset-0 bg-[radial-gradient(circle,rgba(59,130,246,0.03)_0%,rgba(255,255,255,0)_70%)] dark:bg-[radial-gradient(circle,rgba(60,9,108,0.05)_0%,rgba(16,0,43,0.2)_70%)] pointer-events-none"></div>
      
      {/* Noise texture overlay */}
      <div className="fixed inset-0 bg-noise opacity-[0.02] dark:opacity-[0.03] pointer-events-none mix-blend-soft-light"></div>
      
      {/* Navbar */}
      <Navbar />
      
      {/* Page transition and content */}
      <AnimatePresence mode="wait">
        <motion.main 
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="flex-grow"
        >
          {children}
        </motion.main>
      </AnimatePresence>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;