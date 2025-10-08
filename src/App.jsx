import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Orchids from './assets/combonents/Orchids';
import OrchidDetail from './assets/combonents/OrchidDetail';
import Contact from './assets/combonents/Contact';
import React from 'react';

function App() {
  

  return (
    <>
    <p>hello</p>
      <BrowserRouter>
       <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
        <Link className="navbar-brand" to="/">🌸 Orchid Gallery</Link>
        <div className="navbar-nav">
          <Link className="nav-link" to="/">Home</Link>
          <Link className="nav-link" to="/contact">Contact</Link>
        </div>
      </nav>
  
      <Routes>
     
        <Route path="/" element={<Orchids />} />
        <Route path="/detail/:id" element={<OrchidDetail />} />
        <Route path="/contact" element={<Contact />} /> 
      </Routes>
      </BrowserRouter>
   
 
    </>
  )
}

export default App
