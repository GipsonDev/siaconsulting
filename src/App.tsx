import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Programs from './pages/Programs';
import Training from './pages/Training';
import Insights from './pages/Insights';
import SingleInsight from './pages/SingleInsight';
import CategoryArchive from './pages/CategoryArchive';
import TagArchive from './pages/TagArchive';
import CategoriesIndex from './pages/CategoriesIndex';
import TagsIndex from './pages/TagsIndex';
import Contact from './pages/Contact';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/training" element={<Training />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/insights/:slug" element={<SingleInsight />} />
            <Route path="/insights/category/:categorySlug" element={<CategoryArchive />} />
            <Route path="/insights/tag/:tagSlug" element={<TagArchive />} />
            <Route path="/insights/categories" element={<CategoriesIndex />} />
            <Route path="/insights/tags" element={<TagsIndex />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
