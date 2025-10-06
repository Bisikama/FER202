import OrchidsFlowerList from './assets/combonents/ListOfOrchids';
import ThemeToggle from './components/ThemeToggle';
import React from 'react';
import { useTheme } from './hooks/useTheme';
import './App.css';

function App() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="App">
      <header className="app-header">
        <div className="container">
          <div className="row align-items-center py-3">
            <div className="col-md-8">
              <h1 className="app-title mb-0">
                <span className="title-icon">🌺</span>
                Orchids Collection
              </h1>
              <p className="app-subtitle mb-0">Discover the beauty of nature's finest flowers</p>
            </div>
            <div className="col-md-4 text-end">
              <ThemeToggle isDarkMode={isDarkMode} onToggle={toggleTheme} />
            </div>
          </div>
        </div>
      </header>
      
      <main>
        <OrchidsFlowerList />
      </main>
      
      <footer className="app-footer mt-5">
        <div className="container">
          <div className="text-center py-4">
            <p className="mb-0">Made with ❤️ for orchid enthusiasts</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
