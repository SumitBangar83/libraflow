import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Catalog from './pages/Catalog';
import BookDetail from './pages/BookDetail';
import QRCheckIn from './pages/QRCheckIn';
import Payments from './pages/Payments';
import { AuthProvider, useAuth } from './context/AuthContext';
import './App.css';
import Login from './pages/Login';
import Signup from './pages/SIgnup';
import { useSelector } from 'react-redux';

// Loading component


function App() {
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector((state) => state.user.value)

  const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#84C18B]"></div>
    </div>
  );

  // Protected Route component
  const ProtectedRoute = ({ children, adminOnly = false }) => {



    if (!user) {
      return (
        <div className="flex justify-center items-center h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[#16212A] mb-4">Access Denied</h2>
            <p className="text-[#0F4C5C]">Please log in to access this page.</p>
          </div>
        </div>
      );
    }

    if (adminOnly && user.role !== 'admin') {
      return (
        <div className="flex justify-center items-center h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[#16212A] mb-4">Admin Access Required</h2>
            <p className="text-[#0F4C5C]">You don't have permission to access this page.</p>
          </div>
        </div>
      );
    }

    return children;
  };

  // Simulate loading
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <AuthProvider>
      <Router>
        <div className="App min-h-screen bg-[#F7FBF8] flex flex-col">
          {/* Don't show header on auth pages */}
          {!window.location.pathname.includes('/login') &&
            !window.location.pathname.includes('/signup') && <Header />}

          <main className="flex-grow">
            <AnimatePresence mode="wait">
              <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* Existing routes... */}
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/book/:id" element={<BookDetail />} />

                {/* Protected Routes */}
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <UserDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/qr-checkin" element={
                  <ProtectedRoute>
                    <QRCheckIn />
                  </ProtectedRoute>
                } />
                <Route path="/payments" element={
                  <ProtectedRoute>
                    <Payments />
                  </ProtectedRoute>
                } />
                <Route path="/admin/*" element={
                  <ProtectedRoute adminOnly={true}>
                    <AdminDashboard />
                  </ProtectedRoute>
                } />
              </Routes>
            </AnimatePresence>
          </main>

          {/* Don't show footer on auth pages */}
          {!window.location.pathname.includes('/login') &&
            !window.location.pathname.includes('/signup') && <Footer />}
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;