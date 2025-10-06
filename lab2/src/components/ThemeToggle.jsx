import React from 'react';

export default function ThemeToggle({ isDarkMode, onToggle }) {
  return (
    <div className="theme-toggle-container d-flex align-items-center">
      <span className="me-2">{isDarkMode ? '🌙' : '☀️'}</span>
      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          id="themeToggle"
          checked={isDarkMode}
          onChange={onToggle}
        />
        <label className="form-check-label" htmlFor="themeToggle">
          {isDarkMode ? 'Dark Mode' : 'Light Mode'}
        </label>
      </div>
    </div>
  );
}