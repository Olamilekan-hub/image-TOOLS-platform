// client/src/components/layout/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaBook } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  // Site sections - only keeping the Image Tools section
  const sections = [
    {
      title: 'Image Tools',
      links: [
        { name: 'Generate', path: '/generate' },
        { name: 'Edit', path: '/edit' },
        { name: 'Remix', path: '/remix' },
        { name: 'Upscale', path: '/upscale' },
        { name: 'Describe', path: '/describe' },
        { name: 'Reframe', path: '/reframe' },
      ]
    }
  ];
  
  // Social links - keeping Email and adding Twitter/X and Docs
  const socialLinks = [
    { icon: <FaXTwitter />, href: 'https://x.com/usePixyAI', label: 'Twitter' },
    { icon: <FaBook />, href: 'https://pixy-ai.gitbook.io/pixy-ai', label: 'Documentation' },
    { icon: <FaEnvelope />, href: 'mailto:info@pixyai.com', label: 'Email' },
  ];

  return (
    <footer className="relative mt-16 overflow-hidden">
      {/* Gradient top border */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-light-300 dark:via-dark-700 to-transparent"></div>
      
      {/* Background with blur effects */}
      <div className="absolute inset-0 bg-white/90 dark:bg-dark-900/90 backdrop-blur-sm -z-10"></div>
      <div className="absolute rounded-full -top-40 -right-40 w-80 h-80 bg-primary-500/5 blur-3xl"></div>
      <div className="absolute rounded-full -bottom-20 -left-20 w-60 h-60 bg-accent-500/5 blur-3xl"></div>
      
      <div className="container px-4 pt-16 pb-8 mx-auto">
        <div className="grid grid-cols-1 gap-8 pb-12 md:grid-cols-2">
          {/* Logo and info */}
          <div>
            <div className="flex items-center mb-4 space-x-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 via-accent-500 to-primary-500">
                <span className="text-xl font-bold text-white font-display">P</span>
              </div>
              <span className="text-xl font-bold text-transparent font-display bg-clip-text bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500">
                Pixy AI
              </span>
            </div>
            <p className="max-w-sm mb-6 text-dark-600 dark:text-dark-300">
              Powerful AI platform for creating, editing, and transforming images with intuitive tools powered by state-of-the-art models.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 transition-colors border rounded-lg text-dark-500 dark:text-dark-400 hover:text-dark-700 dark:hover:text-white bg-light-100 dark:bg-dark-800 hover:bg-light-200 dark:hover:bg-dark-700 border-light-200 dark:border-dark-700"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
          
          {/* Navigation sections - only Image Tools section */}
          {sections.map((section, index) => (
            <div key={index}>
              <h3 className="mb-4 text-base font-semibold font-display text-dark-800 dark:text-white">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      to={link.path} 
                      className="text-sm transition-colors text-dark-500 dark:text-dark-300 hover:text-primary-600 dark:hover:text-primary-400"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Bottom section with copyright and legal links */}
        <div className="flex flex-col items-center justify-between pt-8 border-t border-light-200 dark:border-dark-800 md:flex-row">
          <p className="mb-4 text-sm text-dark-500 dark:text-dark-400 md:mb-0">
            &copy; {currentYear} Pixy AI. All rights reserved.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <a href="#" className="text-xs transition-colors text-dark-500 dark:text-dark-400 hover:text-dark-700 dark:hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="text-xs transition-colors text-dark-500 dark:text-dark-400 hover:text-dark-700 dark:hover:text-white">
              Terms of Service
            </a>
            <a href="#" className="text-xs transition-colors text-dark-500 dark:text-dark-400 hover:text-dark-700 dark:hover:text-white">
              Cookie Policy
            </a>
            <a 
              href="https://pixy-ai.gitbook.io/pixy-ai" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center text-xs transition-colors text-dark-500 dark:text-dark-400 hover:text-primary-600 dark:hover:text-primary-400"
            >
              <FaBook className="mr-1 text-xs" /> Powered by Pixy AI
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;