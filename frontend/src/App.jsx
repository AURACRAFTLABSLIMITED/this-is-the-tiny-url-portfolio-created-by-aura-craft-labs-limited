import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Plans from './pages/Plans';
import Features from './pages/Features';
import Domains from './pages/Domains';
import Resources from './pages/Resources';
import ResourceDetail from './pages/ResourceDetail';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NotFound from './pages/NotFound';

/**
 * ScrollToTop helper component
 * Scrolls window to top whenever the router location changes.
 */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

/**
 * Main Application Component
 * Sets up routing, layout headers, and footers for the TinyURL recreation.
 */
export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-[#00a651] selection:text-white">
        
        {/* Persistent Top Navigation Bar */}
        <Navbar />

        {/* Dynamic Route Pages */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/plans" element={<Plans />} />
            <Route path="/features" element={<Features />} />
            <Route path="/domains" element={<Domains />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/resources/:slug" element={<ResourceDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {/* Persistent Dark Navy Footer */}
        <Footer />

      </div>
    </Router>
  );
}
