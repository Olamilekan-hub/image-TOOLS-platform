// client/src/components/layout/Navbar.jsx
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaBars, 
  FaTimes, 
  FaImage, 
  FaPencilAlt,
  FaMagic,
  FaExpandArrowsAlt,
  FaComment,
  FaCrop,
  FaMoon,
  FaSun
} from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  const closeMenu = () => {
    setIsOpen(false);
  };
  
  const isActive = (path) => {
    return location.pathname === path;
  };

  const navLinks = [
    { path: '/', label: 'Home', icon: null },
    { path: '/generate', label: 'Generate', icon: <FaImage /> },
    { path: '/edit', label: 'Edit', icon: <FaPencilAlt /> },
    { path: '/remix', label: 'Remix', icon: <FaMagic /> },
    { path: '/upscale', label: 'Upscale', icon: <FaExpandArrowsAlt /> },
    { path: '/describe', label: 'Describe', icon: <FaComment /> },
    { path: '/reframe', label: 'Reframe', icon: <FaCrop /> },
  ];
  
  return (
    <nav 
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'py-2 bg-white/80 dark:bg-dark-900/80 backdrop-blur-md shadow-md' 
          : 'py-4 bg-transparent'
      }`}
    >
      <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group" onClick={closeMenu}>
            <div className="relative flex items-center justify-center w-10 h-10">
              <div className="absolute inset-0 transition-opacity duration-300 rounded-lg bg-gradient-to-br from-primary-500 via-accent-500 to-primary-500 opacity-80 group-hover:opacity-100"></div>
              <span className="relative text-xl font-bold text-white font-display">P</span>
            </div>
            <span className="text-xl font-bold text-transparent transition-all duration-300 bg-clip-text bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500 group-hover:from-primary-400 group-hover:via-accent-400 group-hover:to-primary-400">
              Pixy AI
            </span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="items-center hidden space-x-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-lg flex items-center space-x-1 text-sm font-medium transition-all duration-200 ${
                  isActive(link.path)
                    ? 'bg-light-200/70 dark:bg-dark-700/70 text-light-900 dark:text-white relative before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-full before:bg-gradient-to-r before:from-primary-500 before:to-accent-500'
                    : 'text-light-600 dark:text-dark-300 hover:text-light-900 dark:hover:text-white hover:bg-light-200/40 dark:hover:bg-dark-700/40'
                }`}
              >
                {link.icon && <span className="text-primary-500">{link.icon}</span>}
                <span>{link.label}</span>
              </Link>
            ))}
            
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 transition-colors rounded-lg text-light-600 dark:text-dark-300 hover:text-light-900 dark:hover:text-white hover:bg-light-200/40 dark:hover:bg-dark-700/40"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <FaSun size={18} /> : <FaMoon size={18} />}
            </button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2 md:hidden">
            {/* Mobile Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 transition-colors rounded-lg text-light-600 dark:text-dark-300 hover:text-light-900 dark:hover:text-white hover:bg-light-200/40 dark:hover:bg-dark-700/40"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <FaSun size={18} /> : <FaMoon size={18} />}
            </button>
            
            <button 
              onClick={toggleMenu} 
              className="p-2 transition-colors rounded-lg text-light-900 dark:text-white focus:outline-none hover:bg-light-200/50 dark:hover:bg-dark-800/50"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t shadow-lg md:hidden bg-white/95 dark:bg-dark-900/95 backdrop-blur-md border-light-200 dark:border-dark-700"
          >
            <div className="container px-4 py-3 mx-auto space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                    isActive(link.path)
                      ? 'bg-light-200/70 dark:bg-dark-700/70 text-light-900 dark:text-white'
                      : 'text-light-600 dark:text-dark-300 hover:text-light-900 dark:hover:text-white hover:bg-light-200/40 dark:hover:bg-dark-700/40'
                  }`}
                  onClick={closeMenu}
                >
                  {link.icon ? (
                    <span className={`${isActive(link.path) ? 'text-primary-500' : 'text-light-500 dark:text-dark-400'}`}>
                      {link.icon}
                    </span>
                  ) : (
                    <span className="w-4"></span> // Empty span for alignment
                  )}
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;