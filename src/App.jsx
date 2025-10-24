import { Routes, Route, Router } from 'react-router'
import Home from "./pages/Home";
import AllLessons from './pages/AllLessons';
import CompletedLessons from './pages/CompletedLessons';
import AddLessons from './pages/AddLessons';
import Detail from './pages/Detail';
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
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/add-lessons" element={<AddLessons />} />
      </Routes>
    
    </>
  )
}

export default App
