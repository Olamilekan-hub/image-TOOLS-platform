// client/src/components/layout/Footer.jsx
import { FaGithub, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-base-300 text-white py-8 mt-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-white font-bold">I</span>
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                IdeogramAI
              </span>
            </div>
            <p className="text-sm text-gray-400 mt-2">
              Powered by Ideogram API for creating, editing, and remixing images
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row md:space-x-8">
            <div className="mb-4 md:mb-0">
              <h3 className="text-sm font-semibold mb-2 text-accent">Tools</h3>
              <ul className="space-y-1">
                <li><a href="/generate" className="text-sm text-gray-400 hover:text-white">Generate</a></li>
                <li><a href="/edit" className="text-sm text-gray-400 hover:text-white">Edit</a></li>
                <li><a href="/remix" className="text-sm text-gray-400 hover:text-white">Remix</a></li>
                <li><a href="/upscale" className="text-sm text-gray-400 hover:text-white">Upscale</a></li>
                <li><a href="/describe" className="text-sm text-gray-400 hover:text-white">Describe</a></li>
                <li><a href="/reframe" className="text-sm text-gray-400 hover:text-white">Reframe</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold mb-2 text-accent">Connect</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <FaGithub size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <FaTwitter size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} IdeogramAI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;