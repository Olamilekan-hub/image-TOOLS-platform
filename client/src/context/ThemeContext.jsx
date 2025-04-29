// client/src/context/ThemeContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

// Create context
const ThemeContext = createContext();

// Custom hook to use the theme context
export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  // Check for user preference in localStorage or default to 'light'
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    
    // Return saved theme if it exists, otherwise check system preference
    if (savedTheme) {
      return savedTheme;
    }
    
    // Check user system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  });
  
  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };
  
  // Set theme explicitly
  const setThemeExplicitly = (newTheme) => {
    if (newTheme === 'light' || newTheme === 'dark') {
      localStorage.setItem('theme', newTheme);
      setTheme(newTheme);
    }
  };
  
  // Apply theme to the document when it changes
  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove both classes first
    root.classList.remove('light');
    root.classList.remove('dark');
    
    // Then add the appropriate class
    root.classList.add(theme);
    
    // Also update for daisyUI
    document.querySelector('html').setAttribute('data-theme', theme);
    
    // Update theme color meta tag
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        'content',
        theme === 'dark' ? '#0f172a' : '#ffffff'
      );
    }
  }, [theme]);
  
  // Listen for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      // Only change theme if user hasn't explicitly set a preference
      if (!localStorage.getItem('theme')) {
        setTheme(mediaQuery.matches ? 'dark' : 'light');
      }
    };
    
    // Add event listener with support for older browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
    }
    
    // Cleanup
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        // Fallback for older browsers
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);
  
  // Theme context value
  const contextValue = {
    theme,
    toggleTheme,
    setTheme: setThemeExplicitly,
    isDark: theme === 'dark',
    isLight: theme === 'light',
  };
  
  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;