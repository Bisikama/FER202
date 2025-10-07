import OrchidsFlowerList from './assets/combonents/ListOfOrchids';
import ThemeToggle from './components/ThemeToggle';
import React from 'react';
import { useTheme } from './hooks/useTheme';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Detail from './pages/Detail';
import Contact from './pages/Contact';
import About from './pages/About';
import Natural from './pages/Natural';
import { Navbar, Nav, Container } from 'react-bootstrap';

function App() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <Router>
      <div className="App">
        <header className="app-header">
          <Navbar bg={isDarkMode ? 'dark' : 'light'} variant={isDarkMode ? 'dark' : 'light'} expand="lg" className="py-3">
            <Container>
              <Navbar.Brand as={Link} to="/">
                <span className="title-icon">🌺</span> Orchids Collection
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="main-navbar" />
              <Navbar.Collapse id="main-navbar">
                <Nav className="me-auto">
                  <Nav.Link as={Link} to="/">Home</Nav.Link>
                  <Nav.Link as={Link} to="/natural">Natural</Nav.Link>
                  <Nav.Link as={Link} to="/about">About</Nav.Link>
                  <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
                </Nav>
                <div className="d-flex align-items-center">
                  <ThemeToggle isDarkMode={isDarkMode} onToggle={toggleTheme} />
                </div>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<OrchidsFlowerList />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/natural" element={<Natural />} />
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
