// client/src/components/layout/GlassNavbar.jsx
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaImage, FaPencilAlt, FaMagic, FaExpandArrowsAlt, FaComment, FaCrop, FaChevronRight, FaChevronLeft } from 'react-icons/fa';

const GlassNavbar = ({ showToolbar = false }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Tool tabs configuration
  const tools = [
    { name: 'Generate', path: '/generate', icon: <FaImage />, color: 'from-purple-600 to-indigo-600' },
    { name: 'Edit', path: '/edit', icon: <FaPencilAlt />, color: 'from-blue-600 to-cyan-600' },
    { name: 'Remix', path: '/remix', icon: <FaMagic />, color: 'from-pink-600 to-rose-600' },
    { name: 'Upscale', path: '/upscale', icon: <FaExpandArrowsAlt />, color: 'from-green-600 to-teal-600' },
    { name: 'Describe', path: '/describe', icon: <FaComment />, color: 'from-yellow-600 to-amber-600' },
    { name: 'Reframe', path: '/reframe', icon: <FaCrop />, color: 'from-orange-600 to-red-600' }
  ];
  
  // Find active tab based on current path
  const getActiveTabIndex = () => {
    const activeToolIndex = tools.findIndex(tool => location.pathname === tool.path);
    return activeToolIndex >= 0 ? activeToolIndex : 0;
  };
  
  const [activeTab, setActiveTab] = useState(getActiveTabIndex());
  
  // Update active tab when location changes
  useEffect(() => {
    setActiveTab(getActiveTabIndex());
  }, [location.pathname]);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigate to tool page when tab is clicked
  const handleTabClick = (index) => {
    setActiveTab(index);
    navigate(tools[index].path);
  };

  // Slide to the next tool
  const slideNext = () => {
    const nextIndex = activeTab === tools.length - 1 ? 0 : activeTab + 1;
    handleTabClick(nextIndex);
  };

  // Slide to the previous tool
  const slidePrev = () => {
    const prevIndex = activeTab === 0 ? tools.length - 1 : activeTab - 1;
    handleTabClick(prevIndex);
  };

  return (
    <>
      {/* Main navbar */}
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'py-2 backdrop-blur-md bg-base-100/70 shadow-lg' : 'py-4 bg-transparent'
        }`}
      >
        <div className="container flex items-center justify-between px-4 mx-auto">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent">
              <span className="text-xl font-bold text-white">S</span>
            </div>
            <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-accent to-purple-300">
              SpectraAI
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="items-center hidden space-x-6 md:flex">
            <Link to="/" className={`text-white hover:text-accent transition-colors ${location.pathname === '/' ? 'text-accent' : ''}`}>
              Home
            </Link>
            <Link to="/generate" className={`text-white hover:text-accent transition-colors ${showToolbar ? 'text-accent' : ''}`}>
              Tools
            </Link>
            <Link to="/gallery" className={`text-white hover:text-accent transition-colors ${location.pathname === '/gallery' ? 'text-accent' : ''}`}>
              Gallery
            </Link>
            <Link to="/about" className={`text-white hover:text-accent transition-colors ${location.pathname === '/about' ? 'text-accent' : ''}`}>
              About
            </Link>
            <button className="px-4 py-2 text-white transition-all rounded-full bg-gradient-to-r from-primary to-accent hover:shadow-lg">
              Try it Free
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="text-white md:hidden focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 pt-20 md:hidden bg-base-100/95 backdrop-blur-md"
          >
            <div className="container flex flex-col items-center px-4 py-6 mx-auto space-y-6">
              <Link 
                to="/" 
                className={`text-white text-lg hover:text-accent transition-colors ${location.pathname === '/' ? 'text-accent' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/generate" 
                className={`text-white text-lg hover:text-accent transition-colors ${showToolbar ? 'text-accent' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Tools
              </Link>
              <Link 
                to="/gallery" 
                className={`text-white text-lg hover:text-accent transition-colors ${location.pathname === '/gallery' ? 'text-accent' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Gallery
              </Link>
              <Link 
                to="/about" 
                className={`text-white text-lg hover:text-accent transition-colors ${location.pathname === '/about' ? 'text-accent' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <button className="w-full px-4 py-3 text-white transition-all rounded-full bg-gradient-to-r from-primary to-accent hover:shadow-lg">
                Try it Free
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tools Tabs Slider - Only visible on tools pages */}
      {showToolbar && (
        <div className="fixed left-0 z-30 w-full shadow-md top-20 backdrop-blur-md bg-base-300/70">
          <div className="container relative px-4 py-1 mx-auto">
            <div className="relative overflow-x-hidden">
              <div className="flex items-center h-16">
                {/* Previous button */}
                <button 
                  onClick={slidePrev}
                  className="absolute left-0 z-10 p-2 text-white rounded-full shadow-lg bg-base-300/80 backdrop-blur-sm"
                >
                  <FaChevronLeft />
                </button>

                {/* Tabs */}
                <div className="flex justify-center w-full">
                  <div className="relative flex space-x-4">
                    {tools.map((tool, index) => {
                      // Calculate visible range for a cleaner UX - show active and adjacent tabs
                      const isVisible = Math.abs(index - activeTab) < 3;
                      
                      return (
                        <motion.button
                          key={index}
                          animate={{ 
                            x: activeTab === 0 ? 0 : activeTab === 1 ? -120 : activeTab === 2 ? -240 : activeTab === 3 ? -360 : activeTab === 4 ? -480 : -600,
                            opacity: isVisible ? 1 : 0.5,
                            scale: activeTab === index ? 1.05 : 1
                          }}
                          transition={{ duration: 0.3 }}
                          onClick={() => handleTabClick(index)}
                          className={`min-w-24 px-4 py-2 rounded-lg flex flex-col items-center justify-center ${
                            activeTab === index 
                              ? `bg-gradient-to-r ${tool.color} text-white shadow-lg` 
                              : 'bg-base-200/50 text-gray-300 hover:bg-base-200/70 hover:text-white'
                          }`}
                        >
                          <div className="mb-1 text-xl">{tool.icon}</div>
                          <div className="text-xs font-medium whitespace-nowrap">{tool.name}</div>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Next button */}
                <button 
                  onClick={slideNext}
                  className="absolute right-0 z-10 p-2 text-white rounded-full shadow-lg bg-base-300/80 backdrop-blur-sm"
                >
                  <FaChevronRight />
                </button>
              </div>
            </div>

            {/* Indicator bar */}
            <div className="w-full h-1 mt-1 rounded-full bg-base-200/50">
              <motion.div 
                className={`h-full rounded-full bg-gradient-to-r ${tools[activeTab].color}`}
                initial={{ width: '0%' }}
                animate={{ width: `${(activeTab + 1) * (100 / tools.length)}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GlassNavbar;