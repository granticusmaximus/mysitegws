import logo from './assets/img/logo.png';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio/>} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
