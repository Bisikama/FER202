import { useState, useEffect } from 'react';

export const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check if there's a saved theme preference
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  useEffect(() => {
    // Save theme preference to localStorage
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    
    // Apply theme to document body
    if (isDarkMode) {
      document.body.setAttribute('data-theme', 'dark');
      document.body.className = 'dark-theme';
    } else {
      document.body.setAttribute('data-theme', 'light');
      document.body.className = 'light-theme';
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return { isDarkMode, toggleTheme };
};