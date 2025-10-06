import OrchidsFlowerList from './assets/combonents/ListOfOrchids';
import ThemeToggle from './components/ThemeToggle';
import React from 'react';
import { useTheme } from './hooks/useTheme';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Detail from './pages/Detail';
import Contact from './pages/Contact';

function App() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <Router>
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
              <div className="col-md-4 text-end d-flex justify-content-end align-items-center gap-3">
                <nav className="me-3">
                  <Link to="/" className="btn btn-link text-decoration-none">Home</Link>
                  <Link to="/contact" className="btn btn-link text-decoration-none">Contact</Link>
                </nav>
                <ThemeToggle isDarkMode={isDarkMode} onToggle={toggleTheme} />
              </div>
            </div>
          </div>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<OrchidsFlowerList />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        <footer className="app-footer mt-5">
          <div className="container">
            <div className="text-center py-4">
              <p className="mb-0">Made with ❤️ for orchid enthusiasts</p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  )
}

export default App
