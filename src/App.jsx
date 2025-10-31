import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUserFromStorage, logout } from './store/slices/authSlice';
import Orchids from './assets/combonents/Orchids';
import OrchidDetail from './assets/combonents/OrchidDetail';
import Contact from './assets/combonents/Contact';
import About from './assets/combonents/About';
import AboutMe from './assets/combonents/AboutNew';
import Login from './assets/combonents/Auth/Login';

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [showLogin, setShowLogin] = useState(false);

  // Load user from localStorage khi app mount
  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      dispatch(logout());
      alert('✅ Logged out successfully!');
    }
  };

  return (
    <>
      <BrowserRouter>
        <nav className="navbar navbar-expand-lg navbar-light bg-light px-3 shadow-sm">
          <Link className="navbar-brand fw-bold" to="/">🌸 Orchid Gallery</Link>
          
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <div className="navbar-nav me-auto">
              <Link className="nav-link" to="/">Home</Link>
              <Link className="nav-link" to="/contact">Contact</Link>
              <Link className="nav-link" to="/about">About</Link>
              <Link className="nav-link" to="/aboutme">About Me</Link>
            </div>

            {/* Auth Section */}
            <div className="navbar-nav ms-auto">
              {isAuthenticated ? (
                <div className="d-flex align-items-center gap-3">
                  <span className="navbar-text">
                    👋 Hi, <strong>{user?.name}</strong>
                  </span>
                  {user?.picture && (
                    <img 
                      src={user.picture} 
                      alt={user.name}
                      className="rounded-circle"
                      style={{ width: '32px', height: '32px' }}
                    />
                  )}
                  <button 
                    className="btn btn-outline-danger btn-sm"
                    onClick={handleLogout}
                  >
                    🚪 Logout
                  </button>
                </div>
              ) : (
                <button 
                  className="btn btn-primary btn-sm"
                  onClick={() => setShowLogin(true)}
                >
                  🔐 Login with Google
                </button>
              )}
            </div>
          </div>
        </nav>
  
        <Routes>
          <Route path="/" element={<Orchids />} />
          <Route path="/detail/:id" element={<OrchidDetail />} />
          <Route path="/contact" element={<Contact />} /> 
          <Route path="/about" element={<About />} />
          <Route path="/aboutme" element={<AboutMe />} />
        </Routes>
      </BrowserRouter>

      {/* Login Modal */}
      {showLogin && !isAuthenticated && (
        <div 
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{ 
            backgroundColor: 'rgba(0,0,0,0.5)', 
            zIndex: 9999 
          }}
          onClick={() => setShowLogin(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <Login onLoginSuccess={() => setShowLogin(false)} />
          </div>
        </div>
      )}
    </>
  )
}

export default App
