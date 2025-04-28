// client/src/components/layout/Navbar.jsx
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  const closeMenu = () => {
    setIsOpen(false);
  };
  
  const isActive = (path) => {
    return location.pathname === path ? 'bg-primary/20 text-white' : 'text-gray-300 hover:text-white hover:bg-primary/10';
  };
  
  return (
    <nav className="bg-base-300 shadow-md py-3 px-4 sm:px-6 fixed w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2" onClick={closeMenu}>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <span className="text-white font-bold text-xl">I</span>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            IdeogramAI
          </span>
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-1">
          <Link to="/" className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${isActive('/')}`}>
            Home
          </Link>
          <Link to="/generate" className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${isActive('/generate')}`}>
            Generate
          </Link>
          <Link to="/edit" className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${isActive('/edit')}`}>
            Edit
          </Link>
          <Link to="/remix" className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${isActive('/remix')}`}>
            Remix
          </Link>
          <Link to="/upscale" className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${isActive('/upscale')}`}>
            Upscale
          </Link>
          <Link to="/describe" className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${isActive('/describe')}`}>
            Describe
          </Link>
          <Link to="/reframe" className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${isActive('/reframe')}`}>
            Reframe
          </Link>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            onClick={toggleMenu} 
            className="text-white focus:outline-none"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="md:hidden bg-base-300 shadow-lg rounded-b-lg mt-2"
        >
          <div className="px-4 py-2 space-y-1">
            <Link 
              to="/" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/')}`}
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link 
              to="/generate" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/generate')}`}
              onClick={closeMenu}
            >
              Generate
            </Link>
            <Link 
              to="/edit" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/edit')}`}
              onClick={closeMenu}
            >
              Edit
            </Link>
            <Link 
              to="/remix" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/remix')}`}
              onClick={closeMenu}
            >
              Remix
            </Link>
            <Link 
              to="/upscale" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/upscale')}`}
              onClick={closeMenu}
            >
              Upscale
            </Link>
            <Link 
              to="/describe" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/describe')}`}
              onClick={closeMenu}
            >
              Describe
            </Link>
            <Link 
              to="/reframe" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/reframe')}`}
              onClick={closeMenu}
            >
              Reframe
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;