// client/src/components/layout/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaTwitter, FaLinkedin, FaEnvelope, FaCode } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  // Site sections
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
    },
    {
      title: 'Resources',
      links: [
        { name: 'Documentation', path: '#' },
        { name: 'API Reference', path: '#' },
        { name: 'Blog', path: '#' },
        { name: 'Examples', path: '#' },
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About', path: '#' },
        { name: 'Privacy Policy', path: '#' },
        { name: 'Terms of Service', path: '#' },
        { name: 'Contact', path: '#' },
      ]
    },
  ];
  
  // Social links
  const socialLinks = [
    { icon: <FaGithub />, href: '#', label: 'GitHub' },
    { icon: <FaTwitter />, href: '#', label: 'Twitter' },
    { icon: <FaLinkedin />, href: '#', label: 'LinkedIn' },
    { icon: <FaEnvelope />, href: 'mailto:info@ideogramAI.com', label: 'Email' },
  ];

  return (
    <footer className="relative mt-16 overflow-hidden">
      {/* Gradient top border */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-dark-700 to-transparent"></div>
      
      {/* Background with blur effects */}
      <div className="absolute inset-0 bg-dark-900/80 backdrop-blur-sm -z-10"></div>
      <div className="absolute rounded-full -top-40 -right-40 w-80 h-80 bg-primary-500/5 blur-3xl"></div>
      <div className="absolute rounded-full -bottom-20 -left-20 w-60 h-60 bg-secondary-500/5 blur-3xl"></div>
      
      <div className="container px-4 pt-16 pb-8 mx-auto">
        <div className="grid grid-cols-1 gap-8 pb-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Logo and info */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4 space-x-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500">
                <span className="text-xl font-bold text-white font-display">I</span>
              </div>
              <span className="text-xl font-bold text-transparent font-display bg-clip-text bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400">
                IdeogramAI
              </span>
            </div>
            <p className="max-w-sm mb-6 text-dark-300">
              Powerful AI platform for creating, editing, and transforming images with intuitive tools powered by state-of-the-art models.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.href}
                  className="flex items-center justify-center w-10 h-10 transition-colors border rounded-lg text-dark-400 hover:text-white bg-dark-800 hover:bg-dark-700 border-dark-700 hover:border-dark-600"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
          
          {/* Navigation sections */}
          {sections.map((section, index) => (
            <div key={index}>
              <h3 className="mb-4 text-base font-semibold text-white font-display">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      to={link.path} 
                      className="text-sm transition-colors text-dark-300 hover:text-primary-400"
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
        <div className="flex flex-col items-center justify-between pt-8 border-t border-dark-800 md:flex-row">
          <p className="mb-4 text-sm text-dark-400 md:mb-0">
            &copy; {currentYear} IdeogramAI. All rights reserved.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <a href="#" className="text-xs transition-colors text-dark-400 hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="text-xs transition-colors text-dark-400 hover:text-white">
              Terms of Service
            </a>
            <a href="#" className="text-xs transition-colors text-dark-400 hover:text-white">
              Cookie Policy
            </a>
            <a 
              href="https://ideogram.ai" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center text-xs transition-colors text-dark-400 hover:text-primary-400"
            >
              <FaCode className="mr-1 text-xs" /> Powered by Ideogram API
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;