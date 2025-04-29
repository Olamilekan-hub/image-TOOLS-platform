// client/src/App.jsx
import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Layout components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Page components
import HomePage from './pages/HomePage';
import GeneratePage from './pages/GeneratePage';
import EditPage from './pages/EditPage';
import RemixPage from './pages/RemixPage';
import UpscalePage from './pages/UpscalePage';
import DescribePage from './pages/DescribePage';
import ReframePage from './pages/ReframePage';
import NotFoundPage from './pages/NotFoundPage';

// Context providers
import { ToastProvider } from './context/ToastContext';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate initial loading state for better UX
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-light-50 dark:bg-dark-950">
        <div className="text-center">
          <div className="relative inline-block w-16 h-16 mb-8">
            {/* Logo animation */}
            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary-500 via-accent-500 to-primary-500 opacity-80 animate-pulse"></div>
            <span className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-white font-display">P</span>
          </div>
          <div className="relative w-12 h-1 mx-auto mb-4 overflow-hidden">
            {/* Loading bar */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500"></div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500 animate-loadingBar"></div>
          </div>
          <p className="text-sm text-light-500 dark:text-dark-400">Loading Pixy AI</p>
        </div>
      </div>
    );
  }
  
  return (
    <ThemeProvider>
      <ToastProvider>
        <div className="flex flex-col min-h-screen font-sans bg-light-50 dark:bg-dark-950 text-light-900 dark:text-white">
          <Navbar />
          
          <main className="flex-grow">
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<HomePage />} />
                <Route path="/generate" element={<GeneratePage />} />
                <Route path="/edit" element={<EditPage />} />
                <Route path="/remix" element={<RemixPage />} />
                <Route path="/upscale" element={<UpscalePage />} />
                <Route path="/describe" element={<DescribePage />} />
                <Route path="/reframe" element={<ReframePage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </AnimatePresence>
          </main>
          
          <Footer />
        </div>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;