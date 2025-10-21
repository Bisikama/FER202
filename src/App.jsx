import { Routes, Route, Router } from 'react-router'
import Home from "./pages/Home";
import AllLessons from './pages/AllLessons';
import CompletedLessons from './pages/CompletedLessons';
import { Nav } from 'react-bootstrap';
import NavigationBar from './combonents/NavigationBar';

function App() {


  return (
    <>
      <NavigationBar/>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/about" element={<About />} /> */}
          <Route path="/all-lessons" element={<AllLessons />} />
          <Route path="/completed-lessons" element={<CompletedLessons />} />
      </Routes>
    
    </>
  )
}

export default App
