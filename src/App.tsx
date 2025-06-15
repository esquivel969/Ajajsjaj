import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/puertas" element={<CategoryPage />} />
                <Route path="/portones" element={<CategoryPage />} />
                <Route path="/gondolas" element={<CategoryPage />} />
                <Route path="/estanterias" element={<CategoryPage />} />
                <Route path="/rejas" element={<CategoryPage />} />
                <Route path="/escaleras" element={<CategoryPage />} />
                <Route path="/muebles" element={<CategoryPage />} />
                <Route path="/accesorios" element={<CategoryPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;